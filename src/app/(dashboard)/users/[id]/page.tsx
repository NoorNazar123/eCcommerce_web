import React from 'react';

const UserPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const users = [
    { id: 1, fname: 'Ali', desc: 'He is a programmer' },
    { id: 2, fname: 'Raza', desc: 'He is a designer' },
    { id: 3, fname: 'Nazar', desc: 'He is a web developer' },
  ];

  // Fix: Convert id to a number for correct comparison
  const filteredUsers = users.filter((user) => user.id === Number(id));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {filteredUsers.length > 0 ? (
        filteredUsers.map((userDetails) => (
          <div
            key={userDetails.id}
            className="bg-white shadow-md rounded-lg p-6 w-80 text-center"
          >
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              {userDetails.fname}
            </h1>
            <p className="text-gray-600">{userDetails.desc}</p>
          </div>
        ))
      ) : (
        <p className="text-red-500 text-lg font-semibold">No user found</p>
      )}
    </div>
  );
};

export default UserPage;
