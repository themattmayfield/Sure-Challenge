import RenderCurrentThemeChanger from "components/RenderCurrentThemeChanger";
import { useQuote } from "lib/quote";
import numeral from "numeral";
const Header = () => {
  const { premium, loadingPremium } = useQuote();
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 px-4 sm:px-6 lg:px-8 flex items-center h-16 bg-white dark:bg-black border-b border-gray-200 dark:border-sureGray justify-between">
      <div>
        🚀 <span className="ml-2 font-bold">Rocket Insurance</span>
      </div>
      <div className="min-w-0 pl-4">
        <h1
          className={`${
            loadingPremium ? "blur-sm" : ""
          } transition duration-300 ease-in-out text-lg font-medium leading-6 text-gray-900 dark:text-white sm:truncate`}
        >
          {premium ? `Premium: ${numeral(premium).format("$0,0.00")}` : null}
        </h1>
      </div>
      <div>{RenderCurrentThemeChanger()}</div>
    </div>
  );
};

export default Header;
