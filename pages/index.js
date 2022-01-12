import React, { useState } from "react";
import Layout from "components/Layout";
import States from "lib/States";
import { CreateQuote, UpdateQuote } from "lib/actions";
import { useQuote } from "lib/quote";
import { useRouter } from "next/router";
export default function Ratings() {
  const { setQuote, quote } = useQuote();
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    address: {
      line_1: "",
      line_2: "",
      city: "",
      region: "",
      postal: "",
    },
  });
  const router = useRouter();

  const submitData = async () => {
    const body = {
      first_name: "Prairie",
      last_name: "Johnson",
      address: {
        line_1: "123 Mulberry Lane",
        line_2: "3B",
        city: "Brooklyn",
        region: "NY",
        postal: "11211",
      },
    };
    try {
      const { data } = await CreateQuote(body);
      setQuote(data.quote);
      router.push("/quote");
      console.log(data.quote);
    } catch (error) {
      console.log(`im in error: ${error}`);
    }
  };

  return (
    <Layout>
      {JSON.stringify(quote)}
      <button
        onClick={() => submitData()}
        className="bg-indigo-600 text-white rounded px-4 py-2"
      >
        Click me Post
      </button>

      <div className="min-h-full flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="w-full bg-white px-2 xs:px-8 sm:px-12 py-12 rounded-xl h-full flex flex-col justify-center shadow-xl overflow-hidden">
          <form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Personal Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Use a permanent address where you can receive mail.
                  </p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <CustomInput
                      label="First name"
                      htmlFor="first_name"
                      type="text"
                      name="first_name"
                      id="first_name"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <CustomInput
                      label="Last name"
                      htmlFor="last_name"
                      type="text"
                      name="last_name"
                      id="last_name"
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <CustomInput
                      label="Street Address"
                      htmlFor="line_1"
                      type="text"
                      name="line_1"
                      id="line_1"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <CustomInput
                      label="Apartment / Unit / Suite"
                      htmlFor="line_2"
                      type="text"
                      name="line_2"
                      id="line_2"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <CustomInput
                      label="City"
                      htmlFor="city"
                      type="text"
                      name="city"
                      id="city"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <CustomSelect />
                  </div>

                  <div className="sm:col-span-2">
                    <CustomInput
                      label="ZIP / Postal code"
                      htmlFor="postal"
                      type="text"
                      name="postal"
                      id="postal"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

const CustomInput = (props) => (
  <>
    <label
      htmlFor={props.htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {props.label}
    </label>
    <div className="mt-1">
      <input
        {...props}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  </>
);

const CustomSelect = () => (
  <>
    <label
      htmlFor="country"
      className="block text-sm font-medium text-gray-700"
    >
      State
    </label>
    <div className="mt-1">
      <select
        id="country"
        name="country"
        autoComplete="country-name"
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      >
        {States.map((state) => (
          <option key={state.abbreviation}>{state.abbreviation}</option>
        ))}
      </select>
    </div>
  </>
);
