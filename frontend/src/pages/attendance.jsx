import { useState, useRef, useEffect } from 'react';
import { markAttendance } from '../utils/api';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

export default function Attendance() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, scanning, success, error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });
      videoRef.current.srcObject = mediaStream;
      setStream(mediaStream);
      setStatus('idle');
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const captureAndSend = async () => {
    

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = canvas.toDataURL('image/jpeg');

    try {
      setStatus('scanning');
      const response = await markAttendance(imageData);
      setResult(response);
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000); // Reset after 3 seconds
    } catch (err) {
      console.error('Error marking attendance:', err);
      setStatus('error');
      setError(err.message || 'Failed to recognize face');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Take Attendance</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="relative bg-gray-200 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-auto"
              />
              <canvas
                ref={canvasRef}
                className="hidden"
              />
              {status === 'scanning' && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-white text-xl font-semibold">
                    Scanning face...
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-center">
              <button
                onClick={captureAndSend}
                disabled={status !== 'idle'}
                className={`px-4 py-2 rounded-md text-white ${
                  status !== 'idle'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {status === 'idle' ? 'Capture & Mark Attendance' : 'Processing...'}
              </button>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Attendance Status</h3>
              
              {status === 'idle' && (
                <div className="text-gray-500">
                  Camera is ready. Position your face in the frame and click the button to mark attendance.
                </div>
              )}
              
              {status === 'success' && result && (
                <div className="space-y-2">
                  <div className="flex items-center text-green-600">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    <span className="font-medium">Attendance Marked Successfully!</span>
                  </div>
                  <div className="pl-7">
                    <p><span className="font-medium">Name:</span> {result.student.name}</p>
                    <p><span className="font-medium">ID:</span> {result.student.id}</p>
                    <p><span className="font-medium">Time:</span> {new Date(result.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              )}
              
              {status === 'error' && (
                <div className="flex items-center text-red-600">
                  <XCircleIcon className="h-5 w-5 mr-2" />
                  <span>{error || 'Face not recognized. Please try again.'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}