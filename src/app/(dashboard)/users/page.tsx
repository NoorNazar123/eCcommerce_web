import Link from 'next/link';

const Users = () => {
  const users = [
    { id: 1, fname: 'Hammad', dec: 'He is a programmer' },
    { id: 2, fname: 'Noor', dec: 'He is a designer' },
    { id: 3, fname: 'Nazar', dec: 'He is a web dev' },
  ];
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {users &&
        users.map((user) => (
          <ul
            key={user.id}
            className="bg-white shadow-md rounded-lg p-6 w-80 space-y-4"
          >
            <li className="text-lg font-medium text-blue-600 hover:underline">
              <Link href={`/dashboard/users/${user.id}`}>{user.fname}</Link>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default Users;
