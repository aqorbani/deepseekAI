import styles from "../../styles/Pages.module.css";
import { useState } from "react";
import { BsTranslate } from "react-icons/bs";
import { FaSquarePen } from "react-icons/fa6";
import { GrContactInfo } from "react-icons/gr";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import Translate from "../Translate/Translate";
import Write from "../Write/Write";
import Lottie from "lottie-react";
import normal from "../../public/lottie/normal.json";
import loading from "../../public/lottie/loading.json";

export default function Index({ navigateToPage }) {
  // The Place To Define Variables and States
  const [loader, setLoader] = useState(false);
  const [btnStatus, setBtnStatus] = useState("translate");
  const active =
    "flex flex-col justify-center items-center w-full pt-3 p-2 bg-white text-gray-900 transition-all hover:delay-50 rounded-r-3xl";
  const disable =
    "flex flex-col text-gray-300 justify-center items-center w-full pt-3 p-2";

  const switchComponents = (btnStatus) => {
    switch (btnStatus) {
      case "write":
        return <Write setLoader={setLoader} />;
      case "translate":
        return <Translate setLoader={setLoader} />;
      default:
        return <Translate setLoader={setLoader} />;
    }
  };

  return (
    <main id="main-div" className={`w-full`}>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="flex min-h-screen rounded z-40">
        {/* ________________________________________________________ WORKSPACE SECTION */}
        <div className="w-full min-w-80 rounded-l-md text-gray-800 z-50">
          <div className="w-full">{switchComponents(btnStatus)}</div>
        </div>
        {/* __________________________________________________________ SIDEBAR SECTION */}
        <div className="sm:w-28 md:w-52 lg:w-96 min-w-28 bg-gray-400 rounded-r-md overflow-hidden z-50">
          <div className="mb-14 flex justify-center">
            <h2 className="logo">PANDA</h2>
          </div>
          <button
            onClick={() => setBtnStatus("question")}
            className={btnStatus === "question" ? active : disable}
          >
            <BsFillQuestionSquareFill className="text-[3vw] lg:text-[1.5vw]" />
            <p className="font-semibold text-[2vw] lg:text-[1vw]">Question</p>
          </button>
          <button
            onClick={() => setBtnStatus("translate")}
            className={btnStatus === "translate" ? active : disable}
          >
            <BsTranslate className="text-[3vw] lg:text-[1.5vw]" />
            <p className="font-semibold text-[2vw] lg:text-[1vw]">Translate</p>
          </button>
          <button
            onClick={() => setBtnStatus("write")}
            className={btnStatus === "write" ? active : disable}
          >
            <FaSquarePen className="text-[3vw] lg:text-[1.5vw]" />
            <p className="font-semibold text-[2vw] lg:text-[1vw]">Write</p>
          </button>
          <button
            onClick={() => setBtnStatus("about")}
            className={btnStatus === "about" ? active : disable}
          >
            <GrContactInfo className="text-[3vw] lg:text-[1.5vw]" />
            <p className="font-semibold text-[2vw] lg:text-[1vw]">About</p>
          </button>
          <div className="sticky top-[99vh] w-20 sm:w-20 md:w-28 lg:w-32 min-w-20 m-auto">
            <Lottie animationData={loader ? loading : normal} loop={true} />
          </div>
        </div>
      </div>
    </main>
  );
}
