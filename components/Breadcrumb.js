import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/solid";

const Breadcrumb = () => {
  const router = useRouter();
  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white dark:bg-black/90 border-b dark:border-sureGray"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-start">
        <a
          onClick={() => router.back()}
          href="#"
          className="-ml-1 inline-flex items-center space-x-3 text-sm font-medium hover:text-indigo-500 transition duration-300 ease-in-out"
        >
          <ChevronLeftIcon
            className="h-5 w-5 text-blue-gray-100"
            aria-hidden="true"
          />
          Back
        </a>
      </div>
    </nav>
  );
};

export default Breadcrumb;
