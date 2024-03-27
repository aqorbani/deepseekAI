import { useEffect, useState } from "react";
import { GoCopy } from "react-icons/go";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import Button from "../modules/Button";
import { useRouter } from "next/router";
import axios from "axios";

export default function Question({ setLoader, redirect }) {
  const router = useRouter();

  // The Place To Define Variables and States
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (router.query.text || router.query.ori || router.query.des) {
      if (redirect.current != 0) {
        delete router.query.text;
        delete router.query.ori;
        delete router.query.des;
        router.push(router);
      }
    }
  });

  // Function to Get Generated DATA
  const getAnswerHandler = async () => {
    setLoader(true);
    if (text === "") {
      setResponse("");
      setLoader(false);
      return;
    }
    // ____________________________________________________

    let data = JSON.stringify({
      messages: [
        {
          content: text,
          role: "user",
        },
      ],
      model: "deepseek-chat",
      frequency_penalty: 0,
      max_tokens: 2048,
      presence_penalty: 0,
      stop: null,
      stream: false,
      temperature: 1,
      top_p: 1,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: process.env.DEEPSEEK,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + process.env.KEY,
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        setResponse(JSON.stringify(response.data.choices[0].message.content));
      })
      .catch((error) => {
        toast.info("No response is received from the server", {
          position: "top-center",
          hideProgressBar: true,
          icon: false,
        });
      });
    setLoader(false);
    // ____________________________________________________
    // const res = await fetch(process.env.DEEPSEEK, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     model: "deepseek-chat",
    //     messages: [{ role: "user", content: text }],
    //   }),
    //   headers: {
    //     Authorization: "Bearer " + process.env.KEY,
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await res.json();
    // setResponse(data.choices[0].message.content);
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
            <p className="text-black w-fit p-2 text-[2.2vw] md:text-[1vw] font-medium">
              Please write your question :
            </p>

            <div className="flex w-full justify-center items-center m-4">
              <div className="flex w-full">
                <textarea
                  name="write"
                  placeholder="Enter Question"
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
            <div className="flex justify-center w-ull m-2">
              <Button title="Get Answer" functionHandler={getAnswerHandler} />
            </div>
            {/* _____________________________________________________________ SHOW INPUT SECTION */}
            <p className="text-black w-fit p-2 text-[2.2vw] md:text-[1vw] font-medium">
              Answer :
            </p>
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
