import React from 'react';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  // const { id } = React.use(params);

  const users = [
    { id: 1, fname: 'Hammad', dec: 'He is a programmer' },
    { id: 2, fname: 'Noor', dec: 'He is a designer' },
    { id: 3, fname: 'Nazar', dec: 'He is a web dev' },
  ];

  const filteredUsers = users.filter((user) => user.id === Number(id));

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {filteredUsers.length > 0 ? (
        filteredUsers.map((userDetails) => (
          <div
            key={userDetails.id}
            className="bg-white shadow-md rounded-lg p-6 w-80 text-center"
          >
            <h1 className="text-xl font-bold text-gray-800 mb-2">
              {userDetails.fname}
            </h1>
            <p className="text-gray-600">{userDetails.dec}</p>
          </div>
        ))
      ) : (
        <p className="text-red-500 text-lg font-semibold">No user found</p>
      )}
    </div>
  );
};

export default Page;
