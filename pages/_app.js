import "styles/globals.css";
import { ThemeProvider } from "next-themes";
import { QuoteProvider } from "lib/quote";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <QuoteProvider>
      <ThemeProvider enableSystem attribute="class">
        <Component {...pageProps} />
        <ToastContainer />
      </ThemeProvider>
    </QuoteProvider>
  );
}

export default MyApp;
