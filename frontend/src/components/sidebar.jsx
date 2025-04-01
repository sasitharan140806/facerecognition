import { NavLink } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import {
  ChartBarIcon,
  ClockIcon,
  DocumentReportIcon,
} from '@heroicons/react/outline';

export default function Sidebar() {
  const { user } = useAuth();

    

  const navItems = [
    {
      name: 'Dashboard',
      icon: ChartBarIcon,
      path: '/',
    },
    {
      name: 'Take Attendance',
      icon: ClockIcon,
      path: '/attendance',
    },
    {
      name: 'Reports',
      icon: DocumentReportIcon,
      path: '/reports',
    },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-indigo-700">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h2 className="text-white text-xl font-semibold">Attendance Pro</h2>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive
                        ? 'bg-indigo-800 text-white'
                        : 'text-indigo-100 hover:bg-indigo-600 hover:bg-opacity-75'
                    }`
                  }
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}