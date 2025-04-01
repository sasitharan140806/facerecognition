function FaceScanner() {
  return (
    <div className="p-6 border rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold">Live Face Recognition</h2>
      <video id="video" className="border mt-4 w-full"></video>
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Start Scan</button>
    </div>
  );
}

export default FaceScanner;
