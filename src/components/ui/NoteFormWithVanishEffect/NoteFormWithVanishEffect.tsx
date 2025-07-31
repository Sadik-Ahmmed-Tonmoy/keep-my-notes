/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import MyFormWrapper from "../MyForm/MyFormWrapper/MyFormWrapper";
import BottomBar from "./BottomBar";
import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface FormData {
  inputValue?: string;
  textAreaValue?: string;
}

export function NoteFormWithVanishEffect({
  placeholders,
  placeholdersForTextArea,
}: {
  placeholders: string[];
  placeholdersForTextArea: string[];
}) {
  return (
    <MyFormWrapper<FormData>
      onSubmit={(data, reset) => {
        console.log("Submitted data:", data);
        // reset();
      }}
    >
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        placeholdersForTextArea={placeholdersForTextArea}
      />
    </MyFormWrapper>
  );
}

function PlaceholdersAndVanishInput({
  placeholders,
  placeholdersForTextArea,
}: {
  placeholders: string[];
  placeholdersForTextArea: string[];
}) {
  const {
    control,
    formState: { isSubmitting },
    watch,
  } = useFormContext<FormData>();

  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [currentPlaceholderForTextArea, setCurrentPlaceholderForTextArea] = useState(0);

  const inputIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const textAreaIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [opacity, setOpacity] = useState(0);
  const [showTextArea, setShowTextArea] = useState(false);

  const inputValue = watch("inputValue") || "";
  const textAreaValue = watch("textAreaValue") || "";

  useEffect(() => {
    if (inputValue.length < 1) {
      setOpacity(0);
      setTimeout(() => {
        setShowTextArea(false);
      }, 400);
    } else {
      setOpacity(1);
      setShowTextArea(true);
    }
  }, [inputValue]);

  const startInputAnimation = () => {
    inputIntervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };

  const startTextAreaAnimation = () => {
    textAreaIntervalRef.current = setInterval(() => {
      setCurrentPlaceholderForTextArea(
        (prev) => (prev + 1) % placeholdersForTextArea.length
      );
    }, 3000);
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible") {
      if (inputIntervalRef.current) clearInterval(inputIntervalRef.current);
      if (textAreaIntervalRef.current) clearInterval(textAreaIntervalRef.current);
    } else {
      startInputAnimation();
      startTextAreaAnimation();
    }
  };

  useEffect(() => {
    startInputAnimation();
    startTextAreaAnimation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (inputIntervalRef.current) clearInterval(inputIntervalRef.current);
      if (textAreaIntervalRef.current) clearInterval(textAreaIntervalRef.current);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders, placeholdersForTextArea]);

  return (
    <>
      {/* Input Field */}
      <div
        className={cn(
          "w-full relative max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-12 border-b border-neutral-200 dark:border-neutral-700 overflow-hidden shadow transition duration-200",
          inputValue && "bg-gray-50"
        )}
      >
        <Controller
          name="inputValue"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              disabled={isSubmitting}
              aria-label="Note title"
              className={cn(
                "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20"
              )}
              size="large"
            />
          )}
        />

        {/* Placeholder Animation */}
        <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
          <AnimatePresence mode="wait">
            {!inputValue && (
              <motion.p
                initial={{ y: 5, opacity: 0 }}
                key={`current-placeholder-${currentPlaceholder}`}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3, ease: "linear" }}
                className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
              >
                {placeholders[currentPlaceholder]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Text Area */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: opacity, y: opacity ? 0 : 50 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
        }}
        className={cn(
          "w-full relative max-w-5xl mx-auto bg-white dark:bg-neutral-900 overflow-hidden shadow transition duration-200 mb-2",
          textAreaValue && "bg-gray-50",
          showTextArea ? "block" : "hidden"
        )}
      >
        <div>
          <Controller
            name="textAreaValue"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                disabled={isSubmitting}
                autoSize={{ minRows: 2, maxRows: 8 }}
                aria-label="Note details"
                className={cn(
                  "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black focus:outline-none focus:ring-0 pl-4 pt-4 mb-10 sm:pl-10 pr-20 resize-none overflow-hidden"
                )}
              />
            )}
          />

          <BottomBar inputValue={inputValue} />

          {/* Placeholder Animation for Text Area */}
          <div className="absolute inset-0 flex items-start pt-4 rounded-full pointer-events-none">
            <AnimatePresence mode="wait">
              {!textAreaValue && (
                <motion.p
                  initial={{ y: 5, opacity: 0 }}
                  key={`current-placeholder-${currentPlaceholderForTextArea}`}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "linear" }}
                  className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 sm:pl-12 text-left w-[calc(100%-2rem)] truncate"
                >
                  {placeholdersForTextArea[currentPlaceholderForTextArea]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
}
