import styles from "../../styles/Pages.module.css";
import { useState } from "react";
import { GoCopy } from "react-icons/go";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

export default function Question({ setLoader }) {
  // The Place To Define Variables and States
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

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
        messages: [{ role: "user", content: text }],
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
              Please write your question :
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

            {/* ________________________________________________________ GENERATE BUTTON SECTION */}
            <div className="flex w-ull m-2">
              <button
                onClick={generateHandler}
                className="w-full bg-black text-white font-semibold rounded-full p-1"
              >
                send
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
