'use client';
import { useState } from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Button } from './ui/button';

const LogoutButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    setLoggingOut(true);
    setTimeout(() => {
      window.location.href = '/api/auth/signout';
    }, 1000);
  };

  return (
    <div>
      {/* Logout Button */}
      <Button
        onClick={() => setShowModal(true)}
        className="btn btn-outline px-3 py-[22px] text-gray-800 dark:text-[#fff] hover:bg-[#FEB47B]"
      >
        <RiLogoutCircleRLine className="mr-1" />
        <span className="hidden sm:inline">Logout</span>
      </Button>

      {/* Logout Confirmation Modal */}
      {showModal && !loggingOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-semibold dark:text-white">
              Confirm Logout
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Are you sure you want to logout? You may lose unsaved data.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Button
                onClick={() => setShowModal(false)} // Modal close karega
                className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowModal(false); // Modal hide
                  handleLogout(); // Ab logout process start hoga
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                <RiLogoutCircleRLine className="inline-block mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Logging Out Message */}
      {loggingOut && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-xl font-semibold text-green-500">
              Logging out...
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
