import React from "react";
import Layout from "components/Layout";
import { useQuote } from "lib/quote";
import numeral from "numeral";
import Breadcrumb from "components/Breadcrumb";
import EmptyQuote from "components/EmptyQuote";
import _ from "lodash";

export default function Quote() {
  const { quote, updatePremiumHandler } = useQuote();

  if (_.isEmpty(quote)) {
    return (
      <Layout>
        <EmptyQuote />
      </Layout>
    );
  }

  return (
    <Layout>
      <Breadcrumb />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Tiers */}
        {quote?.variable_options ? (
          <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
            {Object.keys(quote.variable_options).map((item, idx) => {
              const quoteData = quote.variable_options[item];
              return (
                <InfoFrost key={quoteData.title}>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-600">
                      {quoteData.title}
                    </h3>

                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                      {quoteData.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 ">
                      {quoteData.title === "Deductible"
                        ? "Deductible"
                        : "Collision Limit"}
                    </label>
                    <div className="mt-1">
                      <select
                        id={item}
                        name={item}
                        value={quote.variable_selections[item]}
                        onChange={updatePremiumHandler}
                        className="dark:bg-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-sureGray rounded-md"
                      >
                        {quoteData?.values.map((option) => (
                          <option key={option} value={option}>
                            {numeral(option).format("$0,0")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </InfoFrost>
              );
            })}
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

const InfoFrost = ({ children }) => (
  <div className="backdrop-blur-[1.5px] bg-gray-400/30 dark:bg-gray-900/30  bg-clip-padding relative p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col">
    {children}
  </div>
);
