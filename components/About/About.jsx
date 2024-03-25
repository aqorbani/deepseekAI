import { BsTranslate } from "react-icons/bs";
import { HiPencilAlt } from "react-icons/hi";
import { TbMessageQuestion } from "react-icons/tb";

export default function About() {
  return (
    <div className="p-2">
      <div>
        <h2 className="text-[3vw] font-bold">Hi, wellcome my friend.</h2>
        <p>
          This website is created for you to use artificial intelligence
          knowledge easily. In the following, we will explain the features of
          this website to you.
        </p>
      </div>
      <div className="flex mt-5">
        <div className="text-[7vw] font-bold mr-5 text-orange-600">
          <TbMessageQuestion />
        </div>
        <div className="flex flex-col justify-around">
          <h2 className="text-[2vw] font-semibold">Question</h2>
          <p>
            You can ask this AI any question about any topic and see the answer.
          </p>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="text-[7vw] font-bold mr-5 text-violet-600">
          <BsTranslate />
        </div>
        <div className="flex flex-col justify-around">
          <h2 className="text-[2vw] font-semibold">Translate</h2>
          <p>
            You can easily translate the desired text by AI and use it anywhere
          </p>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="text-[7vw] font-bold mr-5 text-lime-600">
          <HiPencilAlt />
        </div>
        <div className="flex flex-col justify-around">
          <h2 className="text-[2vw] font-semibold">Write</h2>
          <p>
            You can generate the text you want. Just give a brief description of
            the desired text and AI will generate it for you.
          </p>
        </div>
      </div>
    </div>
  );
}
