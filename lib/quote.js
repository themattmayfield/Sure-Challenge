import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";

const quoteContext = createContext();

export function QuoteProvider({ children }) {
  const quote = useProvideQuote();
  return (
    <quoteContext.Provider value={quote}>{children}</quoteContext.Provider>
  );
}

export const useQuote = () => {
  return useContext(quoteContext);
};

function useProvideQuote() {
  const [quote, setQuote] = useState({});
  const [premium, setPremium] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const signinWithEmail = () => {
    console.log("hello");
  };

  //   useEffect(() => {
  //     const unsubscribe = onIdTokenChanged(auth, handleUser);

  //     Router.events.on("routeChangeComplete", (url) => {
  //       setError(null);
  //     });

  //     return () => {
  //       Router.events.off("routeChangeComplete", (url) => {
  //         setError(null);
  //       });
  //       unsubscribe();
  //     };
  //   }, []);

  return {
    quote,
    setQuote,
    signinWithEmail,
    premium,
    setPremium,
  };
}
