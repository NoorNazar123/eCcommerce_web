const LoadingSkeleton = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6">
      <div className="flex justify-center mt-6">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin">
          loading.....
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
