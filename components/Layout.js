import React, { useState } from "react";
import Header from "./Header";
import Head from "next/head";
import { bgStyle } from "styles/backgroundStyle";
import { useTheme } from "next-themes";
const Layout = ({ children, className, pageTitle }) => {
  const { systemTheme, setTheme, theme } = useTheme();
  return (
    <>
      {/* <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <div
        style={{
          backgroundColor: theme === "dark" ? "white" : "black",
          ...bgStyle,
        }}
        className={`${className} min-h-full`}
      >
        {/* Main column */}

        <Header />
        <main className="flex-1 ">{children}</main>
      </div>
    </>
  );
};

export default Layout;
