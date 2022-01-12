import React, { useState } from "react";
import Layout from "components/Layout";
import { UpdateQuote } from "lib/actions";
import { useQuote } from "lib/quote";
import { useRouter } from "next/router";

export default function Ratings() {
  const { setQuote, quote } = useQuote();
  const [state, setState] = useState(quote?.variable_selections);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const router = useRouter();

  const updateData = async () => {
    try {
      const data = {
        quote: {
          quoteId: "UP4561034",
          rating_address: {
            line_1: "123 Mulberry Lane",
            line_2: "3B",
            city: "Brooklyn",
            region: "NY",
            postal: "11211",
          },
          policy_holder: {
            first_name: "Prairie",
            last_name: "Johnson",
          },
          variable_selections: {
            deductible: 2000,
            asteroid_collision: 1000000,
          },
        },
      };
      const response = await UpdateQuote("UP4561034", data);
      console.log(response);
    } catch (error) {
      console.log(`im in error: ${error}`);
    }
  };
  return (
    <Layout>
      {/* {JSON.stringify(quote, null, 2)} */}
      <div className="max-w-4xl mx-auto py-12 px-4 bg-white sm:px-6 lg:px-8">
        {/* Tiers */}
        {quote.variable_options ? (
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
                    <CustomSelect
                      label="something"
                      options={quoteData?.values}
                    />
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
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  </>
);
