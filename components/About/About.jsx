import { BsTranslate } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";
import { TbMessageQuestion } from "react-icons/tb";

export default function About() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-2">
      <div className="w-full flex flex-col justify-center items-center text-center">
        <h2 className="logo">PANA</h2>
        <h2 className="text-[3vw] font-bold">Hi, welcome my friend.</h2>
        <p className="text-[2vw] md:text-[1.1vw] font-medium">
          This website is created for you to use artificial intelligence
          knowledge easily. In the following, we will explain the features of
          this website to you. The current version uses DeepSeek AI.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-around mt-5 md:mt-20">
        <div className="flex flex-col w-full md:w-[30%] mt-5">
          <div className="flex justify-center text-[3.5vw] font-bold text-gray-600">
            <TbMessageQuestion />
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <h2 className="text-[2vw] font-semibold">Question</h2>
            <p className="text-center">
              You can ask this AI any question about any topic and see the
              answer.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full md:md:w-[30%] mt-5">
          <div className="flex justify-center text-[3.5vw] font-bold text-gray-600">
            <BsTranslate />
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <h2 className="text-[2vw] font-semibold">Translate</h2>
            <p className="text-center">
              You can easily translate the desired text by AI and use it
              anywhere.
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-[30%] mt-5">
          <div className="flex justify-center text-[3.5vw] font-bold ml-1 text-gray-600">
            <HiPencilAlt />
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <h2 className="text-[2vw] font-semibold">Write</h2>
            <p className="text-center">
              You can generate the text you want. Just give a brief description
              of the desired text and AI will generate it for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
