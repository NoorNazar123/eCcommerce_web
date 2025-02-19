interface LoadingProps {
  size?: string | number; // Now accepts both number and string
}

const Loading: React.FC<LoadingProps> = ({ size }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-gray-900 dark:border-gray-200 ${size}`}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
