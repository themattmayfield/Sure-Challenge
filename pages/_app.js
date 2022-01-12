import "styles/globals.css";
import { ThemeProvider } from "next-themes";
import { QuoteProvider } from "lib/quote";
function MyApp({ Component, pageProps }) {
  return (
    <QuoteProvider>
      <ThemeProvider enableSystem attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </QuoteProvider>
  );
}

export default MyApp;
