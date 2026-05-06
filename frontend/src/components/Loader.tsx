const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/70">
      <div className="flex justify-center items-center space-x-3 h-screen dark:invert">
        <div className="bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s] w-6 h-6"></div>
        <div className="bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s] w-6 h-6"></div>
        <div className="bg-gray-600 rounded-full animate-bounce w-6 h-6"></div>
      </div>
    </div>
  );
};

export default Loader;
