import styles from "../../styles/Pages.module.css";
import { useState } from "react";
import { GoCopy } from "react-icons/go";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

export default function Main({ setLoader }) {
  // The Place To Define Variables and States
  const [text, setText] = useState("");
  const [lenght, setLength] = useState("auto");
  const [format, setFormat] = useState("auto");
  const [output, setOutput] = useState("english");
  const [response, setResponse] = useState("");

  const active =
    "bg-gray-500 text-white rounded-full m-1 pr-2 pl-2 text-xs font-normal";
  const disable =
    "bg-gray-200 rounded-full m-1 pr-2 pl-2 text-xs font-normalmal";

  let basicText =
    "Please rewrite below text in length " +
    lenght +
    " and format " +
    format +
    " in " +
    output +
    ":\n ```text \n" +
    text +
    "\n```";

  // Function to Get Generated DATA
  const generateHandler = async () => {
    setLoader(true);
    if (text === "") {
      setResponse("");
      setLoader(false);
      return;
    }
    const res = await fetch(process.env.DEEPSEEK, {
      method: "POST",
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: basicText }],
      }),
      headers: {
        Authorization: "Bearer " + process.env.KEY,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setResponse(data.choices[0].message.content);
    setLoader(false);
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

  return (
    <div className="flex flex-col">
      <div className="flex p-3">
        <div className="w-full ">
          <div className="w-full">
            {/* ________________________________________________________ GET INPUT SECTION */}
            <p className="text-black w-fit p-2 text-xs font-normal">
              Write about :
            </p>

            <div className="flex w-full justify-center items-center m-4">
              <div className="flex w-full">
                <textarea
                  name="write"
                  placeholder="Enter Text"
                  className={`m-0 p-2 rounded textarea-c`}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows="20"
                ></textarea>
                {text != "" && (
                  <div className="flex flex-col justify-center items-center m-3">
                    <GoCopy
                      onClick={() => copyHandler(text)}
                      className="text-gray-400 hover:text-gray-800 cursor-pointer duration-300 text-lg m-2"
                    />
                    <IoClose
                      onClick={() => setText("")}
                      className="text-gray-400 hover:text-gray-800 cursor-pointer duration-300 text-lg m-2"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* ________________________________________________________ GET SETTING SECTION */}
            {/* _________________________________________________________ GET LENGTH SECTION */}
            <div className="flex w-fit m-2">
              <h3 className="text-black w-fit p-2 m-1 text-xs font-normal">
                Lenght :
              </h3>
              <button
                onClick={() => setLength("auto")}
                className={lenght === "auto" ? active : disable}
              >
                Auto
              </button>
              <button
                onClick={() => setLength("short")}
                className={lenght === "short" ? active : disable}
              >
                Short
              </button>
              <button
                onClick={() => setLength("medium")}
                className={lenght === "medium" ? active : disable}
              >
                Medium
              </button>
              <button
                onClick={() => setLength("long")}
                className={lenght === "long" ? active : disable}
              >
                Long
              </button>
            </div>
            {/* ________________________________________________________ GET FORMAT SECTION */}
            <div className="flex w-fit m-2">
              <h3 className="text-black w-fit p-2 m-1 text-xs font-normal">
                Format :
              </h3>
              <button
                onClick={() => setFormat("auto")}
                className={format === "auto" ? active : disable}
              >
                Auto
              </button>
              <button
                onClick={() => setFormat("email")}
                className={format === "email" ? active : disable}
              >
                Email
              </button>
              <button
                onClick={() => setFormat("message")}
                className={format === "message" ? active : disable}
              >
                Message
              </button>
            </div>
            {/* ____________________________________________________ GET OUTPUT LANGUAGE SECTION */}
            <div className="flex w-fit m-2">
              <h3 className="text-black w-fit p-2 m-1 text-xs font-normal">
                Output Language :
              </h3>
              <select
                onChange={(e) => setOutput(e.target.value)}
                className="bg-gray-200 rounded-full m-1 pr-2 pl-2 text-xs
              font-normal"
              >
                <option value="english">English</option>
                <option value="persian">Persian</option>
              </select>
            </div>
            {/* ________________________________________________________ GENERATE BUTTON SECTION */}
            <div className="flex w-ull m-2">
              <button
                onClick={generateHandler}
                className="w-full bg-black text-white font-semibold rounded-full p-1"
              >
                Generate
              </button>
            </div>
            {/* _____________________________________________________________ SHOW INPUT SECTION */}
            <div className="flex w-full justify-center items-center m-4">
              <div className="flex w-full">
                <textarea
                  name="response"
                  value={response}
                  className={`m-0 p-2 rounded textarea-c`}
                  rows="20"
                  readOnly
                ></textarea>
                {response != "" && (
                  <div className="flex flex-col justify-center items-center m-3">
                    <GoCopy
                      onClick={() => copyHandler(response)}
                      className="text-gray-400 hover:text-gray-800 cursor-pointer duration-300 m-3 text-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
