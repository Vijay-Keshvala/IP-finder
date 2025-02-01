import { useState } from "react";

function App() {
  const [ipAddress, setIpAddress] = useState("");
  const [geoInfo, setGeoInfo] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setIpAddress(e.target.value);
  };

  const fetchIPInfo = async () => {
    if (!ipAddress) {
      setError("Please enter a valid IP address");
      return;
    }
    setError("");

    try {
      const resp = await fetch(`https://ipinfo.io/${ipAddress}/json?token=cec917bcb168cf`);
      if (!resp.ok) throw new Error("Failed to fetch data");
      const data = await resp.json();
      setGeoInfo(data);
    } catch (error) {
      setError("Could not fetch location details");
      setGeoInfo(null);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">IP Locator</h2>
        <input
          type="text"
          value={ipAddress}
          onChange={handleInputChange}
          placeholder="Enter IP Address"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchIPInfo}
          className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Get Location
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {geoInfo && (
          <div className="mt-5 p-4 bg-gray-50 border border-gray-300 rounded-lg">
            <p className="text-lg"><strong>IP:</strong> {geoInfo.ip}</p>
            <p><strong>City:</strong> {geoInfo.city}</p>
            <p><strong>Region:</strong> {geoInfo.region}</p>
            <p><strong>Country:</strong> {geoInfo.country}</p>
            <p><strong>Coordinates:</strong> {geoInfo.loc}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
