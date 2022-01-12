import RenderCurrentThemeChanger from "components/RenderCurrentThemeChanger";

const Header = ({ pageTitle, rightSlot }) => {
  return (
    <div className="sticky top-0 z-10 flex-shrink-0 flex items-center h-16 bg-white dark:bg-black border-b border-gray-200 dark:border-sureGray">
      <div className="min-w-0 pl-4 flex-1">
        <h1 className="text-lg font-medium leading-6 text-gray-900 dark:text-white sm:truncate">
          {pageTitle}
        </h1>
      </div>
      <div className="flex items-center space-x-3 px-4 sm:px-6 lg:px-8">
        <div>{rightSlot}</div>
        {RenderCurrentThemeChanger()}
      </div>
    </div>
  );
};

export default Header;
