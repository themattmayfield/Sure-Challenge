import { useRouter } from "next/router";

export default function EmptyQuote() {
  const router = useRouter();
  return (
    <div className="text-center pt-24">
      <div className="text-8xl animate-bounce">🚀</div>
      <h3 className="mt-2 text-base font-medium text-gray-900 dark:text-gray-400">
        You do not have any quotes for Rocket Insurance.
      </h3>

      <div className="mt-6">
        <button
          onClick={() => router.push("/")}
          type="button"
          className="inline-flex transition duration-300 ease-in-out items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none "
        >
          Get started!
        </button>
      </div>
    </div>
  );
}
