import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import { getAttendance } from '../utils/api';
import { format } from 'date-fns';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { user } = useAuth();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAttendance();
        setAttendance(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching attendance:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  // Prepare data for chart
  const chartData = {
    labels: attendance.map((item) => format(new Date(item.date), 'MMM dd')),
    datasets: [
      {
        label: 'Present Students',
        data: attendance.map((item) => item.presentCount),
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
      },
      {
        label: 'Total Students',
        data: attendance.map((item) => item.totalStudents),
        backgroundColor: 'rgba(209, 213, 219, 0.7)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Recent Attendance',
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Welcome, {user?.name}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Today's Attendance</h3>
          <p className="text-3xl font-bold mt-2">
            {attendance[0]?.presentCount || 0}/{attendance[0]?.totalStudents || 0}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Last Attendance</h3>
          <p className="text-3xl font-bold mt-2">
            {attendance[1]?.presentCount || 0}/{attendance[1]?.totalStudents || 0}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {attendance[1]?.date ? format(new Date(attendance[1].date), 'MMM dd, yyyy') : 'N/A'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Average Attendance</h3>
          <p className="text-3xl font-bold mt-2">
            {attendance.length > 0
              ? Math.round(
                  (attendance.reduce((sum, item) => sum + item.presentCount, 0) /
                    (attendance.reduce((sum, item) => sum + item.totalStudents, 0) || 1)) *
                    100
                )
              : 0}
            %
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
}