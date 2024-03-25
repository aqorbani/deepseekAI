export default function Button({ title, functionHandler }) {
  return (
    <button
      onClick={functionHandler}
      className="relative px-5 py-3 md:w-1/4 mt-10 mb-10 overflow-hidden font-medium text-gray-700 bg-gray-300 border border-gray-200 rounded-lg shadow-inner group"
    >
      <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-700 group-hover:w-full ease"></span>
      <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-700 group-hover:w-full ease"></span>
      <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-700 group-hover:h-full ease"></span>
      <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-700 group-hover:h-full ease"></span>
      <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-950 opacity-0 group-hover:opacity-200"></span>
      <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease animate-bounce">
        {title}
      </span>
    </button>
  );
}
