const mongoose = require("mongoose");
const ExcelJS = require("exceljs");
const fetch = require("node-fetch");
const path = require("path");
require("dotenv").config();

const connectDB = require("../src/config/db");
const Location = require("../src/models/Location");

// ------------------ GOOGLE PLACES FETCH ------------------ //
const getPlaceDetails = async (rawName) => {
  const cleanedName = String(rawName)
    .replace(/[’]/g, "'")
    .replace(/[^\w\s&]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const query = `${cleanedName} Chicago IL`;
  const apiKey = process.env.GOOGLE_API_KEY;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query
  )}&location=41.8781,-87.6298&radius=15000&key=${apiKey}`;

  console.log(`🔍 Querying: "${query}"`);

  const response = await fetch(url);
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    console.warn(`⚠️ No results found for "${query}"`);
    return null;
  }

  const place = data.results[0];
  console.log(place)
  return {
    place_id: place.place_id,
    formatted_address: place.formatted_address,
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng,
  };
};

// ------------------ MAIN SCRIPT ------------------ //
const importExcel = async () => {
  await connectDB();

  const workbook = new ExcelJS.Workbook();
  const filePath = path.join(__dirname, "..", "locations.xlsx");
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(1);

  const headerRow = worksheet.getRow(1).values.slice(1); // remove Excel's offset
  const data = [];

  for (let i = 2; i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i);
    const values = row.values.slice(1);
    const doc = {};

    headerRow.forEach((key, idx) => {
      doc[key] = values[idx];
    });

    if (!doc.name) {
      console.warn(`⚠️ Row ${i} skipped: missing 'name' column`);
      continue;
    }

    const placeInfo = await getPlaceDetails(doc.name);
    if (!placeInfo) {
      console.warn(`⚠️ Row ${i} skipped: no Google result for "${doc.name}"`);
      continue;
    }

    Object.assign(doc, placeInfo);
    console.log(`✅ Row ${i}: Added → ${doc.name} (${placeInfo.place_id})`);
    data.push(doc);
  }

  if (data.length === 0) {
    console.warn("❌ No valid locations to import. Check logs for issues.");
    process.exit(1);
  }

  await Location.deleteMany();
  console.log("✅ Deleted existing locations from MongoDB");

  await Location.insertMany(data);
  console.log(`🚀 Successfully imported ${data.length} locations to MongoDB`);

  // ---------- OVERWRITE ORIGINAL FILE ----------
  const overwriteWorkbook = new ExcelJS.Workbook();
  const overwriteSheet = overwriteWorkbook.addWorksheet("Locations");
  overwriteSheet.addRow([
    ...headerRow,
    "place_id",
    "formatted_address",
    "latitude",
    "longitude",
  ]);

  data.forEach((doc) => {
    overwriteSheet.addRow(
      headerRow
        .map((h) => doc[h])
        .concat([
          doc.place_id,
          doc.formatted_address,
          doc.latitude,
          doc.longitude,
        ])
    );
  });

  await overwriteWorkbook.xlsx.writeFile(filePath);
  console.log(
    "✏️ Original 'locations.xlsx' successfully overwritten with enriched data"
  );

  process.exit(0);
};

importExcel();
