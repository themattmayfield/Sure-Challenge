import React, { useState, useContext, createContext } from "react";
import { useRouter } from "next/router";
import { CreateQuote, UpdateQuote } from "lib/actions";
import { toast } from "react-toastify";

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

  const [loadingPremium, setLoadingPremium] = useState(false);
  const [info, setInfo] = useState(null);

  const createQuoteHandler = async (body) => {
    try {
      const { data } = await CreateQuote(body);
      setInfo(body);
      setQuote(data.quote);
      router.push("/quote");
    } catch (error) {
      toast["error"](`"An unexpected error happened:", ${error}`, {
        position: "top-right",
        closeButton: false,
        autoClose: 1000,
      });
    }
  };

  const updatePremiumHandler = async (e) => {
    try {
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

      const { data } = await UpdateQuote(quote.quoteId, body);

      setQuote(data.quote);
    } catch (error) {
      toast["error"](`"An unexpected error happened:", ${error}`, {
        position: "top-right",
        closeButton: false,
        autoClose: 1000,
      });
    } finally {
      setLoadingPremium(false);
    }
  };

  return {
    createQuoteHandler,
    quote,
    setQuote,
    updatePremiumHandler,
    loadingPremium,
    info,
  };
}
