/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import MyFormInputAceternity from "../ui/MyForm/MyFormInputAceternity/MyFormInputAceternity";
import MyFormWrapper from "../ui/MyForm/MyFormWrapper/MyFormWrapper";

const placeholdersForSearchBar = [
    "Search your notes...",
    "Looking for something specific?",
    "Type keywords to find notes...",
    "Filter notes by title or content...",
    "Find a note by topic or keyword...",
    "Browse through your saved notes...",
    "Quickly access your saved ideas...",
  ];
 
  
const SearchBar = () => {
  const [currentPlaceholderForSearchArea, setCurrentPlaceholderForSearchArea] =
    useState(0);
  const [searchValue, setSearchValue] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startAnimationForTextArea = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholderForSearchArea(
        (prev) => (prev + 1) % placeholdersForSearchBar.length
      );
    }, 3500);
  };

  console.log(searchValue);
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimationForTextArea();
    }
  };

  useEffect(() => {
    startAnimationForTextArea();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholdersForSearchBar]);

  const handleSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <div>
      <MyFormWrapper
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mt-8 mb-4 "
      >
        <div className="w-full max-w-2xl mx-auto relative">
          <MyFormInputAceternity
            inputClassName={"bg-white dark:bg-neutral-900 shadow"}
            onValueChange={setSearchValue}
            name="search"
          />
          <IoSearchSharp
            size={20}
            className="absolute right-4 bottom-[11px] text-neutral-600 dark:text-neutral-500 cursor-pointer"
          />
          {/* Placeholder Animation for Text Area */}
          <div className="absolute top-[10px] left-4 inset-0 flex items-start pt- rounded-full pointer-events-none">
            <AnimatePresence mode="wait">
              {!searchValue && (
                <motion.p
                  initial={{ y: 5, opacity: 0 }}
                  key={`current-placeholder-${currentPlaceholderForSearchArea}`}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                  className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 text-left w-[calc(100%-2rem)] truncate"
                >
                  {placeholdersForSearchBar[currentPlaceholderForSearchArea]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-2 h-[1px] w-full" />
      </MyFormWrapper>
    </div>
  );
};

export default SearchBar;
