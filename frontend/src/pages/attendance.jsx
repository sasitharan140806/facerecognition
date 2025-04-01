import FaceScanner from "../components/FaceScanner";

function Attendance() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Attendance Tracking</h2>
      <FaceScanner />
    </div>
  );
}

export default Attendance;
