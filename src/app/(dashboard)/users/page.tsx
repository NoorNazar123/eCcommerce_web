import Link from 'next/link';

const Users = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3 },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', orders: 8 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Users Management
      </h1>

      {/* Users List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Orders</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.orders}</td>
                <td className="p-4">
                  <Link href={`/users/${user.id}`}>
                    <span className="text-blue-500 hover:underline cursor-pointer">
                      View
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
