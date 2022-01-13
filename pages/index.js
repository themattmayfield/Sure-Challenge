import React, { useState } from "react";
import Layout from "components/Layout";
import States from "lib/States";
import { useQuote } from "lib/quote";
import { Formik, Form, Field, getIn } from "formik";
import useValidator from "lib/validator";
import { toast } from "react-toastify";
import _ from "lodash";
import { CgSpinner } from "react-icons/cg";

export default function Ratings() {
  const { createQuoteHandler, info } = useQuote();
  const { validateAlpha, validatePostal, validate } = useValidator();

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
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <Layout dashboard>
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
          <Formik
            enableReinitialize
            initialValues={state}
            onSubmit={async (values) => {
              setSubmitting(true);
              try {
                createQuoteHandler(values);
              } catch (error) {
                toast["error"](error, {
                  position: "top-right",
                  closeButton: false,
                  autoClose: 1000,
                });
              }
            }}
          >
            {({ errors, touched, isValid, values, handleChange }) => (
              <Form className="space-y-8 divide-y divide-gray-400/50 dark:divide-gray-700">
                <div className="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">
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
                          value={values.first_name}
                          onChange={handleChange}
                          validate={validateAlpha}
                          error={
                            errors.first_name &&
                            touched.first_name &&
                            errors.first_name
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
                          value={values.last_name}
                          onChange={handleChange}
                          validate={validateAlpha}
                          error={
                            errors.last_name &&
                            touched.last_name &&
                            errors.last_name
                          }
                        />
                      </div>

                      <div className="sm:col-span-4">
                        <CustomInput
                          label="Street Address"
                          htmlFor="line_1"
                          type="text"
                          name="address.line_1"
                          id="line_1"
                          value={values.address.line_1}
                          onChange={handleChange}
                          validate={validate}
                          error={
                            getIn(errors, "address.line_1") &&
                            getIn(touched, "address.line_1") &&
                            getIn(errors, "address.line_1")
                          }
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <CustomInput
                          label="Apartment / Unit / Suite"
                          htmlFor="line_2"
                          type="text"
                          name="address.line_2"
                          id="line_2"
                          value={values.address.line_2}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <CustomInput
                          label="City"
                          htmlFor="city"
                          type="text"
                          name="address.city"
                          id="city"
                          value={values.address.city}
                          onChange={handleChange}
                          validate={validateAlpha}
                          error={
                            getIn(errors, "address.city") &&
                            getIn(touched, "address.city") &&
                            getIn(errors, "address.city")
                          }
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <CustomSelect
                          id="region"
                          name="address.region"
                          value={values.address.region}
                          onChange={handleChange}
                          validate={validateAlpha}
                          error={
                            getIn(errors, "address.region") &&
                            getIn(touched, "address.region") &&
                            getIn(errors, "address.region")
                          }
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <CustomInput
                          label="ZIP / Postal code"
                          htmlFor="postal"
                          type="text"
                          name="address.postal"
                          id="city"
                          value={values.address.postal}
                          onChange={handleChange}
                          validate={validatePostal}
                          error={
                            getIn(errors, "address.postal") &&
                            getIn(touched, "address.postal") &&
                            getIn(errors, "address.postal")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${
                        !isValid || isSubmitting
                          ? "cursor-not-allowed bg-opacity-50"
                          : ""
                      } ml-3 inline-flex items-center transition duration-300 ease-in-out justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none `}
                    >
                      {isSubmitting ? (
                        <CgSpinner className="mr-1 text-lg animate-spin" />
                      ) : null}
                      <span>Next</span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
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
      <Field
        {...props}
        className={`${
          props.error ? "border-red-500" : ""
        } dark:bg-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-sureGray rounded-md`}
      />
    </div>
    <p className="text-xs text-red-600">{props.error}</p>
  </>
);

const CustomSelect = (props) => (
  <>
    <label
      htmlFor="country"
      className="block text-sm font-medium text-gray-700 "
    >
      State
    </label>
    <div className="mt-1">
      <Field
        {...props}
        as="select"
        className={`${props.error ? "border-red-500" : ""} ${
          props.value ? "" : "text-gray-400 dark:text-gray-500"
        } dark:bg-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 dark:border-sureGray rounded-md`}
      >
        <option value="" label="-- select an option --" />
        {States.map((state) => (
          <option key={state.abbreviation}>{state.abbreviation}</option>
        ))}
      </Field>
    </div>
    <p className="text-xs text-red-600">{props.error}</p>
  </>
);

const InfoFrost = ({ children }) => (
  <div className="backdrop-blur-[1.5px] bg-gray-400/30 dark:bg-gray-900/30  bg-clip-padding w-full px-6 sm:px-8 py-7 sm:py-12 rounded-xl h-full flex flex-col justify-center shadow-2xl overflow-hidden">
    {children}
  </div>
);
