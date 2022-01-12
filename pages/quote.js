import React from "react";
import Layout from "components/Layout";
import { useQuote } from "lib/quote";
import numeral from "numeral";
import Breadcrumb from "components/Breadcrumb";

export default function Ratings() {
  const { quote, setPremium, updatePremiumHandler } = useQuote();
  // console.log(quote);
  setPremium(quote?.premium);

  return (
    <Layout>
      <Breadcrumb />
      <div className="max-w-4xl mx-auto py-12 px-4 bg-white sm:px-6 lg:px-8">
        {/* Tiers */}
        {quote?.variable_options ? (
          <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8">
            {Object.keys(quote.variable_options).map((item, idx) => {
              const quoteData = quote.variable_options[item];
              return (
                <div
                  key={quoteData.title}
                  className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col"
                >
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {quoteData.title}
                    </h3>

                    <p className="mt-6 text-gray-500">
                      {quoteData.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700">
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
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      >
                        {quoteData?.values.map((option) => (
                          <option key={option} value={option}>
                            {numeral(option).format("$0,0")}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

const CustomSelect = ({ label, options }) => (
  <>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="mt-1">
      <select
        id="country"
        name="country"
        autoComplete="country-name"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      >
        {options.map((option) => (
          <option key={option}>{numeral(option).format("$0,0")}</option>
        ))}
      </select>
    </div>
  </>
);
