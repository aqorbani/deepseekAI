import React, { useEffect, useState } from "react";
import Main from "../components/Main/Main";
import Splash from "../components/Splash/Splash";

export default function Home() {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    const splashDelay = setTimeout(() => {
      setSplash(false);
    }, 3000);

    return () => clearTimeout(splashDelay);
  });
  return <>{splash ? <Splash /> : <Main />}</>;
}
