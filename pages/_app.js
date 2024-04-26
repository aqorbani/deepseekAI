import { useEffect } from "react";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  // useEffect(() => {
  //   document.title = "PANA - AI assistant";
  // }, []);
  return (
    <>
      <Head>
        <title>PANA - AI assistant</title>
      </Head>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
