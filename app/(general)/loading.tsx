import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full flex flex-col items-center justify-center bg-white">
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 border-4 border-gray-100 border-t-red-600 rounded-full animate-spin"></div>
        {/* Inner Spinner */}
        <div className="absolute inset-0 flex items-center justify-center">
          <FaSpinner className="text-red-600 animate-pulse" size={24} />
        </div>
      </div>
      <p className="mt-6 text-gray-500 font-bold uppercase tracking-widest text-xs animate-pulse">
        Loading content...
      </p>
    </div>
  );
}
