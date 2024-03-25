import { BsFillQuestionSquareFill, BsTranslate } from "react-icons/bs";
import { FaSquarePen } from "react-icons/fa6";

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
        <div className="text-[7vw] font-bold mr-5 text-green-800">
          <BsFillQuestionSquareFill />
        </div>
        <div className="flex flex-col justify-around">
          <h2 className="text-[2vw] font-semibold">Question</h2>
          <p>
            You can ask this artificial intelligence any question about any
            topic and see the answer.
          </p>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="text-[7vw] font-bold mr-5 text-purple-800">
          <BsTranslate />
        </div>
        <div className="flex flex-col justify-around">
          <h2 className="text-[2vw] font-semibold">Question</h2>
          <p>
            You can ask this artificial intelligence any question about any
            topic and see the answer.
          </p>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="text-[7vw] font-bold mr-5 text-blue-800">
          <FaSquarePen />
        </div>
        <div className="flex flex-col justify-around">
          <h2 className="text-[2vw] font-semibold">Question</h2>
          <p>
            You can ask this artificial intelligence any question about any
            topic and see the answer.
          </p>
        </div>
      </div>
    </div>
  );
}
