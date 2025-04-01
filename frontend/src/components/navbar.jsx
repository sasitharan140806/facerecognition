import { useAuth } from './context/AuthContext';
import { LogoutIcon, UserCircleIcon } from '@heroicons/react/outline';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-4 py-3">
        <h1 className="text-xl font-semibold text-gray-800">Attendance System</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <UserCircleIcon className="h-6 w-6 text-gray-500" />
              <span className="ml-2 text-sm font-medium text-gray-700">
                {user.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center text-sm text-red-600 hover:text-red-800"
            >
              <LogoutIcon className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}