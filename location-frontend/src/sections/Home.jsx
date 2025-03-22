import Map from "../components/Map.jsx"; // Import the Map component

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header Section */}
      <header className="w-full bg-[#037CB5] text-white py-4 text-center text-3xl font-bold shadow-md">
        Chicago City Map
      </header>

      {/* Main Content Section */}
      <div className="flex flex-grow">
        {/* Left Column - Map (70% width) */}
        <div className="w-[70%] h-screen bg-gray-200 flex items-center justify-center">
          <Map />
        </div>

        {/* Right Column - Mock Text (30% width) */}
        <div className="w-[30%] p-6 bg-white text-gray-800 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
          <p className="text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            condimentum justo eget lacus efficitur, vel vulputate eros
            fringilla. Pellentesque habitant morbi tristique senectus et netus
            et malesuada fames ac turpis egestas. Integer hendrerit dolor ut
            velit elementum, et varius magna convallis.
          </p>
          <p className="mt-4">
            Sed id justo sit amet augue vestibulum ultricies a eget neque.
            Aliquam erat volutpat. Cras eu nisi ut turpis convallis pharetra.
            Quisque ultricies massa nec libero scelerisque, a tincidunt mauris
            suscipit. Mauris feugiat odio id odio hendrerit suscipit.
          </p>
          <p className="mt-4">
            Fusce eget elit id ex viverra sodales. Duis non facilisis nisl.
            Proin eget leo vitae metus varius ullamcorper. Sed sed urna nec
            justo congue pellentesque non sed augue.
          </p>
        </div>
      </div>
    </div>
  );
}
