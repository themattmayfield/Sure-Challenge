import React, { useState } from "react";
import Layout from "components/Layout";
import States from "lib/States";
import { useQuote } from "lib/quote";

export default function Ratings() {
  const { createQuoteHandler, setPremium, info } = useQuote();
  setPremium(null);
  const [state, setState] = useState(
    info || {
      first_name: "",
      last_name: "",
      address: {
        line_1: "",
        line_2: "",
        city: "",
        region: "",
        postal: "",
      },
    }
  );

  const submitData = async (e) => {
    e.preventDefault();
    try {
      createQuoteHandler(state);
    } catch (error) {
      console.log(`im in error: ${error}`);
    }
  };

  const handleAddressChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setState((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="flex justify-center mb-1">
          <p
            onClick={() =>
              setState({
                first_name: "Prairie",
                last_name: "Johnson",
                address: {
                  line_1: "123 Mulberry Lane",
                  line_2: "3B",
                  city: "Brooklyn",
                  region: "NY",
                  postal: "11211",
                },
              })
            }
            className="animate-bounce hover:underline cursor-pointer text-gray-600 dark:text-gray-400/90"
          >
            Testing? Click me to autofill this data 🚀 😊
          </p>
        </div>
        <InfoFrost>
          <form
            onSubmit={submitData}
            className="space-y-8 divide-y divide-gray-400/50 dark:divide-gray-700"
          >
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-600">
                    Personal Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
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
                      value={state.first_name}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          first_name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <CustomInput
                      label="Last name"
                      htmlFor="last_name"
                      type="text"
                      name="last_name"
                      id="last_name"
                      value={state.last_name}
                      onChange={(e) =>
                        setState((prevState) => ({
                          ...prevState,
                          last_name: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <CustomInput
                      label="Street Address"
                      htmlFor="line_1"
                      type="text"
                      name="line_1"
                      id="line_1"
                      value={state.address.line_1}
                      onChange={handleAddressChange}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <CustomInput
                      label="Apartment / Unit / Suite"
                      htmlFor="line_2"
                      type="text"
                      name="line_2"
                      id="line_2"
                      value={state.address.line_2}
                      onChange={handleAddressChange}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <CustomInput
                      label="City"
                      htmlFor="city"
                      type="text"
                      name="city"
                      id="city"
                      value={state.address.city}
                      onChange={handleAddressChange}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <CustomSelect
                      value={state.address.region}
                      onChange={handleAddressChange}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <CustomInput
                      label="ZIP / Postal code"
                      htmlFor="postal"
                      type="text"
                      name="postal"
                      id="postal"
                      value={state.address.postal}
                      onChange={() => handleAddressChange()}
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
        </InfoFrost>
      </div>
    </Layout>
  );
}

const CustomInput = (props) => (
  <>
    <label
      htmlFor={props.htmlFor}
      className="block text-sm font-medium text-gray-700 dark:text-gray-500"
    >
      {props.label}
    </label>
    <div className="mt-1">
      <input
        {...props}
        className="dark:bg-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-sureGray rounded-md"
      />
    </div>
  </>
);

const CustomSelect = ({ value, onChange }) => (
  <>
    <label
      htmlFor="country"
      className="block text-sm font-medium text-gray-700 "
    >
      State
    </label>
    <div className="mt-1">
      <select
        id="region"
        name="region"
        className="dark:bg-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-sureGray rounded-md"
        value={value}
        onChange={onChange}
      >
        {States.map((state) => (
          <option key={state.abbreviation}>{state.abbreviation}</option>
        ))}
      </select>
    </div>
  </>
);

const InfoFrost = ({ children }) => (
  <div className="backdrop-blur-[1.5px] bg-gray-400/30 dark:bg-gray-900/30  bg-clip-padding w-full px-2 xs:px-8 sm:px-12 py-12 rounded-xl h-full flex flex-col justify-center shadow-2xl overflow-hidden">
    {children}
  </div>
);
