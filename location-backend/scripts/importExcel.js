const mongoose = require("mongoose");
const ExcelJS = require("exceljs");
const fetch = require("node-fetch");
require("dotenv").config();

const connectDB = require("../config/db");
const Location = require("../models/Location");

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

  return {
    name: place.name,
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
  await workbook.xlsx.readFile("locations.xlsx");
  const worksheet = workbook.getWorksheet(1);

  const data = [];

  for (let i = 2; i <= worksheet.rowCount; i++) {
    const row = worksheet.getRow(i);
    const [rawName, type] = row.values.slice(1);

    if (!rawName || !type) {
      console.warn(`⚠️ Row ${i} skipped: missing name or type`);
      continue;
    }

    console.log(`📄 Row ${i}: Raw = "${rawName}", Type = "${type}"`);

    const placeInfo = await getPlaceDetails(rawName);
    if (!placeInfo) {
      console.warn(`⚠️ Row ${i} skipped: no Google result for "${rawName}"`);
      continue;
    }

    const doc = {
      name: placeInfo.name,
      type,
      place_id: placeInfo.place_id,
      formatted_address: placeInfo.formatted_address,
      latitude: placeInfo.latitude,
      longitude: placeInfo.longitude,
    };

    console.log(`✅ Row ${i}: Added → ${doc.name} (${doc.place_id})`);
    data.push(doc);
  }

  if (data.length === 0) {
    console.warn("❌ No valid locations to import. Check logs for issues.");
    process.exit(1);
  }

  await Location.deleteMany();
  await Location.insertMany(data);
  console.log(`🚀 Successfully imported ${data.length} locations to MongoDB`);

  // ---------- OVERWRITE ORIGINAL FILE ----------
  const overwriteWorkbook = new ExcelJS.Workbook();
  const overwriteSheet = overwriteWorkbook.addWorksheet("Locations");

  // Header row
  overwriteSheet.addRow([
    "name",
    "type",
    "place_id",
    "formatted_address",
    "latitude",
    "longitude",
  ]);

  // Data rows
  data.forEach((location) => {
    overwriteSheet.addRow([
      location.name,
      location.type,
      location.place_id,
      location.formatted_address,
      location.latitude,
      location.longitude,
    ]);
  });

  // Overwrite original file
  await overwriteWorkbook.xlsx.writeFile("locations.xlsx");

  console.log(
    "✏️ Original 'locations.xlsx' successfully overwritten with enriched data"
  );

  process.exit(0);
};

importExcel();
