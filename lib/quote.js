import React, { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { CreateQuote, UpdateQuote } from "lib/actions";

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
  const router = useRouter();

  const [quote, setQuote] = useState({});
  const [premium, setPremium] = useState(null);
  const [loadingPremium, setLoadingPremium] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  const createQuoteHandler = async (body) => {
    const { data } = await CreateQuote(body);
    setInfo(body);
    setQuote(data.quote);
    router.push("/quote");
  };

  const updatePremiumHandler = async (e) => {
    setLoadingPremium(true);
    const target = e.target;
    const value = target.value;
    const name = target.name;

    // This is to simply update the value of the select box
    // so the user doesnt have to wait for the request to
    // complete to see the change
    setQuote((prevState) => ({
      ...prevState,
      variable_selections: {
        ...prevState.variable_selections,
        [name]: Number(value),
      },
    }));

    const body = {
      quote: {
        quoteId: quote.quoteId,
        rating_address: { ...quote.rating_address },
        policy_holder: { ...quote.policy_holder },
        variable_selections: {
          ...quote.variable_selections,
          [name]: Number(value),
        },
      },
    };
    console.log(body);

    const { data } = await UpdateQuote(quote.quoteId, body);
    console.log(data);
    console.log(data.quote);
    setQuote(data.quote);
    setLoadingPremium(false);
  };

  const formatQuoteUpdate = () => {
    return true;
  };

  return {
    createQuoteHandler,
    quote,
    setQuote,
    premium,
    setPremium,
    formatQuoteUpdate,
    updatePremiumHandler,
    loadingPremium,
    info,
  };
}
