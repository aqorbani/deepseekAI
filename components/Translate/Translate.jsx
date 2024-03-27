import styles from "../../styles/Pages.module.css";
import { useEffect, useRef, useState } from "react";
import { TbBrandTelegram, TbMobiledata } from "react-icons/tb";
import { GoCopy } from "react-icons/go";
import { IoClose } from "react-icons/io5";
// import Lottie from "lottie-react";
// import normal from "../../public/lottie/normal.json";
// import loading from "../../public/lottie/loading.json";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { TelegramShareButton } from "next-share";
import { useRouter } from "next/router";
import { getCurrentUrl } from "../../utils/getPath";
import axios from "axios";
import { getAxiosConfig } from "../../utils/getAxiosConfig";

export default function Main({ setLoader }) {
  const router = useRouter();

  // The Place To Define Variables and States
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [btnStatus, setBtnStatus] = useState("english");
  const [btnStatusRes, setBtnStatusRes] = useState("persian");
  const [autoDetect, setAutoDetect] = useState("");
  const active =
    "bg-gray-800 text-white rounded-full p-2 text-sm font-semibold";
  const disable = "bg-gray-200 p-2 text-sm font-semibold rounded-full";

  useEffect(() => {
    fillState();
  });

  const fillState = () => {
    if (router.query.text) {
      setText(router.query.text);
    } else {
    }
    if (router.query.ori) {
      setBtnStatus(router.query.ori);
    } else {
    }
    if (router.query.des) {
      setBtnStatusRes(router.query.des);
    } else {
    }
  };

  useEffect(() => {
    const delayonChange = setTimeout(() => {
      autoDetectLanguage();
      translateHandler();
    }, 2000);

    return () => clearTimeout(delayonChange);
  }, [text, btnStatus, btnStatusRes]);

  // Function to Fill State
  const onChangeHandler = (e) => {
    setText(e.target.value);
    router.query.text = e.target.value;
    router.query.ori = btnStatus;
    router.query.des = btnStatusRes;
    router.push(router);
    // if (e.target.value !== "") {
    //   translateHandler();
    // }
  };

  // Function to Create Clean Data for Translate
  const updatedContent = async (operation) => {
    if (operation === "translate") {
      let basicText =
        "translate below text {" +
        btnStatus +
        "} to {" +
        btnStatusRes +
        "}:" +
        "\n```text\n" +
        text +
        "\n```";

      return basicText;
    } else if (operation === "languageDetection") {
      let basicText =
        "answer with one word without dot that what is language of below text:" +
        "\n```text\n" +
        text +
        "\n```";

      return basicText;
    } else {
      return;
    }
  };

  // Function to Get Translated Data From API
  const translateHandler = async () => {
    setLoader(true);
    if (text === "") {
      setResponse("");
      setAutoDetect("");
      setLoader(false);
      return;
    }

    // Preparing Final Data to Search
    const finalContent = await updatedContent("translate");

    // ____________________________________________________

    try {
      const response = await axios(getAxiosConfig(finalContent));
      setResponse(JSON.stringify(response.data.choices[0].message.content));
    } catch (error) {
      toast.info("No response is received from the server", {
        position: "top-center",
        hideProgressBar: true,
        icon: false,
      });
    }
    setLoader(false);
  };

  const autoDetectLanguage = async () => {
    if (text === "") {
      setResponse("");
      setAutoDetect("");
      setLoader(false);
      return;
    }

    // Preparing Final Data to Language Detection
    const finalContent = await updatedContent("languageDetection");

    const res = await fetch(process.env.DEEPSEEK, {
      method: "POST",
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: finalContent }],
      }),
      headers: {
        Authorization: "Bearer " + process.env.KEY,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    const clearedData = data.choices[0].message.content;
    if (clearedData.includes("English")) {
      setAutoDetect("English");
    } else if (clearedData.includes("Persian")) {
      setAutoDetect("Persian");
    } else if (clearedData.includes("German")) {
      setAutoDetect("German");
    } else {
      setAutoDetect("I have not been trained");
    }
  };

  // Toggle Lang and content changer
  const toggleLanguage = () => {
    var temp = btnStatus;
    changeButtonHandler(btnStatusRes, "origin");
    changeButtonHandler(temp, "destiniation");

    if (text != "" && response != "") {
      setText(response);
      router.query.text = response;
      router.push(router);
    }
  };

  // copy to clipboard function
  const copyHandler = (content) => {
    copy(content.trim());
    toast.info("copied!", {
      position: "top-center",
      hideProgressBar: true,
      icon: false,
    });
  };

  const changeButtonHandler = (lang, target) => {
    if (target === "origin") {
      setBtnStatus(lang);
      router.query.ori = lang;
      router.push(router);
    } else if (target === "destiniation") {
      setBtnStatusRes(lang);
      router.query.des = lang;
      router.push(router);
    }
  };

  const emptyText = () => {
    router.query.text = "";
    router.push(router);
    setText("");
  };

  return (
    <div className="flex flex-col">
      <div className="flex p-3">
        <div className="w-full">
          <div className="w-full">
            {/* ____________________________________________________ GET INPUT SECTION */}
            <div className="flex w-fit m-2 bg-gray-200 rounded-full">
              <button
                className={btnStatus === "english" ? active : disable}
                onClick={() => changeButtonHandler("english", "origin")}
              >
                English
              </button>
              <button
                className={btnStatus === "persian" ? active : disable}
                onClick={() => changeButtonHandler("persian", "origin")}
              >
                Persian
              </button>
              <button
                className={btnStatus === "german" ? active : disable}
                onClick={() => changeButtonHandler("german", "origin")}
              >
                German
              </button>
            </div>
            <div className="flex w-fit m-2 text-sm text-gray-400">
              {autoDetect === "" && text === "" ? (
                ""
              ) : autoDetect === "" ? (
                ""
              ) : (
                <p>Detected language : {autoDetect}</p>
              )}
            </div>
            <div className="flex w-full justify-center items-center m-4">
              <div className="flex w-full">
                <textarea
                  name="text"
                  placeholder="Enter Text"
                  className={`m-0 p-2 rounded textarea-c`}
                  value={text}
                  onChange={(e) => onChangeHandler(e)}
                ></textarea>
                {text != "" && (
                  <div className="flex flex-col justify-center items-center m-3">
                    <GoCopy
                      onClick={() => copyHandler(text)}
                      className="text-gray-400 hover:text-gray-800 cursor-pointer duration-300 text-lg m-2"
                    />
                    <IoClose
                      onClick={() => emptyText()}
                      className="text-gray-400 hover:text-gray-800 cursor-pointer duration-300 text-lg m-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* _____________________________________________________ SHOW OUTPUT SECTION */}
          <div className="w-full">
            <h2 className="flex w-full justify-center mt-3 mb-3 p-1 m-1 text-xl font-bold">
              <TbMobiledata
                onClick={() => toggleLanguage()}
                className="cursor-pointer"
              />
            </h2>
            <div className="flex w-fit m-2 bg-gray-200 rounded-full">
              <button
                className={btnStatusRes === "persian" ? active : disable}
                onClick={() => changeButtonHandler("persian", "destiniation")}
              >
                Persian
              </button>
              <button
                className={btnStatusRes === "english" ? active : disable}
                onClick={() => changeButtonHandler("english", "destiniation")}
              >
                English
              </button>
              <button
                className={btnStatusRes === "german" ? active : disable}
                onClick={() => changeButtonHandler("german", "destiniation")}
              >
                German
              </button>
            </div>
            <div className="flex w-full justify-center items-center m-4">
              <div className="flex w-full">
                <textarea
                  className={`m-0 p-2 rounded textarea-c`}
                  value={response}
                  rows="20"
                  dir="rtl"
                  readOnly
                ></textarea>
                {response != "" && (
                  <div className="flex flex-col justify-center items-center m-3">
                    <GoCopy
                      onClick={() => copyHandler(response)}
                      className="text-gray-400 hover:text-gray-800 cursor-pointer duration-300 m-3 text-lg"
                    />
                    <TelegramShareButton
                      url={getCurrentUrl()}
                      title={"Share it to your friend..."}
                      hashtag={"#nextshare"}
                    >
                      <TbBrandTelegram className="text-gray-400 hover:text-gray-800 cursor-pointer duration-300 text-lg m-2" />
                    </TelegramShareButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-full">
          <div
            className="w-1/3 h-auto m-auto"
            onClick={() => translateHandler()}
          >
            <Lottie
              animationData={loader ? loading : normal}
              loop={true}
              className="cursor-pointer"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
