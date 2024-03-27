import { RiSendPlaneFill } from "react-icons/ri";

export default function Button({ title, functionHandler }) {
  return (
    <button
      onClick={functionHandler}
      class="inline-flex items-center justify-center h-16 px-10 py-0 text-xl font-semibold text-center text-gray-400 no-underline align-middle transition-all duration-300 ease-in-out bg-transparent border-2 border-gray-400 border-solid rounded-full cursor-pointer select-none hover:text-gray-900 hover:border-gray-900 focus:shadow-xs focus:no-underline"
    >
      <p className="m-1">{title}</p>
      <RiSendPlaneFill className="m-1" />
    </button>
  );
}
