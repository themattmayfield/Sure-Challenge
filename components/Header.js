import RenderCurrentThemeChanger from "components/RenderCurrentThemeChanger";
import { useQuote } from "lib/quote";
import numeral from "numeral";

const Header = ({ dashboard }) => {
  const { loadingPremium, quote } = useQuote();
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 px-4 sm:px-6 lg:px-8 flex items-center h-16 bg-white dark:bg-black border-b border-gray-200 dark:border-sureGray justify-evenly">
      <div className="w-full inline-flex items-center">
        <p>🚀</p>
        <p className="ml-4 text-sm sm:text-base font-bold">Rocket Insurance</p>
      </div>
      <div className="text-center w-full">
        <h1
          className={`${
            loadingPremium ? "blur-sm" : ""
          } transition duration-300 ease-in-out text-base sm:text-lg font-medium leading-6 text-gray-900 dark:text-white sm:truncate`}
        >
          {quote.premium && dashboard !== true
            ? `Premium: ${numeral(quote.premium).format("$0,0.00")}`
            : null}
        </h1>
      </div>
      <div className="flex justify-end w-full">
        {RenderCurrentThemeChanger()}
      </div>
    </div>
  );
};

export default Header;
