const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 border-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full animate-spin"></div>
        <span className="absolute text-blue-600 font-semibold text-sm">• • •</span>
      </div>
    </div>
  );
};

export default Loader;
