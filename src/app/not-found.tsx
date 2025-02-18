const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
      <div className="text-center bg-white p-12 rounded-3xl shadow-2xl w-full max-w-lg">
        <h2 className="text-5xl font-extrabold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-xl text-gray-600 mb-6">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 py-3 px-8 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
