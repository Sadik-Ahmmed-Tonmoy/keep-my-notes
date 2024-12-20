/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdPersonAddAlt } from "react-icons/md";
import FileUploadDropzone from "../FileUploadDropzone/FileUploadDropzone";

export function NoteFormWithVanishEffect({
  placeholders,
  placeholdersForTextArea,
  onChange,
  onSubmit,
}: {
  placeholders: string[];
  placeholdersForTextArea: string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (values: { inputValue: string; textAreaValue: string }) => void;
}) {
  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      placeholdersForTextArea={placeholdersForTextArea}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export function PlaceholdersAndVanishInput({
  placeholders,
  placeholdersForTextArea,
  onChange,
  onSubmit,
}: {
  placeholders: string[];
  placeholdersForTextArea: string[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (values: { inputValue: string; textAreaValue: string }) => void;
}) {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [currentPlaceholderForTextArea, setCurrentPlaceholderForTextArea] =
    useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRefForTextArea = useRef<HTMLCanvasElement>(null);
  const newDataRef = useRef<any[]>([]);
  const newDataRefForTextArea = useRef<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [animating, setAnimating] = useState(false);
  const [animatingTextArea, setAnimatingTextArea] = useState(false);
  const [isAnimationRunning, setIsAnimationRunning] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [opacityDuration, setOpacityDuration] = useState(false);

  useEffect(() => {

    if (inputValue.length < 1) {
      setOpacity(0);
      setTimeout(() => {
        setOpacityDuration(false); 
      }, 400); 
    } else {
      setOpacity(1);
        setOpacityDuration(true);
    }
  }, [inputValue]);
  

  const startAnimation = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 3000);
  };
  const startAnimationForTextArea = () => {
    intervalRef.current = setInterval(() => {
      setCurrentPlaceholderForTextArea(
        (prev) => (prev + 1) % placeholdersForTextArea.length
      );
    }, 3000);
  };
  const handleVisibilityChange = () => {
    if (document.visibilityState !== "visible" && intervalRef.current) {
      clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
      intervalRef.current = null;
    } else if (document.visibilityState === "visible") {
      startAnimation(); // Restart the interval when the tab becomes visible
      startAnimationForTextArea();
    }
  };

  useEffect(() => {
    startAnimation();
    startAnimationForTextArea();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [placeholders, placeholdersForTextArea]);

  const draw = useCallback(() => {
    if (!inputRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(inputRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(inputValue, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: any[] = [];

    for (let t = 0; t < 800; t++) {
      const i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        const e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [inputValue]);

  const drawTextArea = useCallback(() => {
    if (!textAreaRef.current) return;
    const canvas = canvasRefForTextArea.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 800;
    ctx.clearRect(0, 0, 800, 800);
    const computedStyles = getComputedStyle(textAreaRef.current);

    const fontSize = parseFloat(computedStyles.getPropertyValue("font-size"));
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`;
    ctx.fillStyle = "#FFF";
    ctx.fillText(textAreaValue, 16, 40);

    const imageData = ctx.getImageData(0, 0, 800, 800);
    const pixelData = imageData.data;
    const newData: any[] = [];

    for (let t = 0; t < 800; t++) {
      const i = 4 * t * 800;
      for (let n = 0; n < 800; n++) {
        const e = i + 4 * n;
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          });
        }
      }
    }

    newDataRefForTextArea.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }));
  }, [textAreaValue]);

  const vanishAndSubmit = () => {
    if (isAnimationRunning) return;

    setIsAnimationRunning(true);
    setAnimating(true);
    setAnimatingTextArea(true);
    draw();
    drawTextArea();

    const input = inputRef.current?.value || "";
    if (input && inputRef.current) {
      const maxX = newDataRef.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animate(maxX);
    }

    const textArea = textAreaRef.current?.value || "";
    if (textArea && textAreaRef.current) {
      const maxX = newDataRefForTextArea.current.reduce(
        (prev, current) => (current.x > prev ? current.x : prev),
        0
      );
      animateForTextArea(maxX);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    vanishAndSubmit();
    if (onSubmit) {
      onSubmit({
        inputValue,
        textAreaValue,
      });
    }

    // Reset the textarea height after submission
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height to default
    }

    setTextAreaValue("");
    setOpacity(0);
  };

  const animate = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRef.current = newArr;
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setInputValue("");
          setAnimating(false);
          setIsAnimationRunning(false);
        }
      });
    };
    animateFrame(start);
  };

  const animateForTextArea = (start: number) => {
    const animateFrame = (pos: number = 0) => {
      requestAnimationFrame(() => {
        const newArr = [];
        for (let i = 0; i < newDataRefForTextArea.current.length; i++) {
          const current = newDataRefForTextArea.current[i];
          if (current.x < pos) {
            newArr.push(current);
          } else {
            if (current.r <= 0) {
              current.r = 0;
              continue;
            }
            current.x += Math.random() > 0.5 ? 1 : -1;
            current.y += Math.random() > 0.5 ? 1 : -1;
            current.r -= 0.05 * Math.random();
            newArr.push(current);
          }
        }
        newDataRefForTextArea.current = newArr;
        const ctx = canvasRefForTextArea.current?.getContext("2d");
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800);
          newDataRefForTextArea.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t;
            if (n > pos) {
              ctx.beginPath();
              ctx.rect(n, i, s, s);
              ctx.fillStyle = color;
              ctx.strokeStyle = color;
              ctx.stroke();
            }
          });
        }
        if (newDataRefForTextArea.current.length > 0) {
          animateFrame(pos - 8);
        } else {
          setTextAreaValue("");
          setAnimatingTextArea(false);
          setIsAnimationRunning(false);
        }
      });
    };
    animateFrame(start);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input Field */}
      <div
        className={cn(
          "w-full relative max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-12 border-b-1 border-neutral-200 dark:border-neutral-700 overflow-hidden shadow transition duration-200",
          inputValue && "bg-gray-50"
        )}
      >
        <canvas
          className={cn(
            "absolute pointer-events-none transform scale-50 top-[20%] left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
            !animating ? "opacity-0" : "opacity-100"
          )}
          ref={canvasRef}
        />
        <input
          onChange={(e) => {
            if (!animating) {
              setInputValue(e.target.value);
              if (onChange) {
                onChange(e);
              }
            }
          }}
          // onKeyDown={handleKeyDown}
          ref={inputRef}
          value={inputValue}
          type="text"
          className={cn(
            "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-full focus:outline-none focus:ring-0 pl-4 sm:pl-10 pr-20",
            animating && "text-transparent dark:text-transparent"
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
      <>
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Start off-screen below
          animate={{ opacity: opacity, y: opacity ? 0 : 50 }} // Toggle opacity
          exit={{ opacity: 0, y: 50 }} // Exit animation
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          className={cn(
            "w-full relative max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-full overflow-hidden shadow transition duration-200 mb-2",
            textAreaValue && "bg-gray-50 ",
            opacityDuration  ? "block" : "hidden"
          )}
        >
          <div>
            <canvas
              className={cn(
                "absolute pointer-events-none transform scale-50 top-0 left-2 sm:left-8 origin-top-left filter invert dark:invert-0 pr-20",
                !animatingTextArea ? "opacity-0" : "opacity-100"
              )}
              // ref={canvasRefForTextArea}
            />
            <textarea
              onChange={(e) => {
                if (!animatingTextArea) {
                  setTextAreaValue(e.target.value);
                  if (onChange) {
                    onChange(e);
                  }
                }
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto"; // Reset height to recalculate
                target.style.height = `${Math.min(target.scrollHeight, 800)}px`; // Set height to scrollHeight, with a max
              }}
              ref={textAreaRef}
              value={textAreaValue}
              rows={2} // Minimum rows
              className={cn(
                "w-full relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black  focus:outline-none focus:ring-0 pl-4 pt-4 mb-10 sm:pl-10 pr-20 resize-none overflow-hidden",
                animatingTextArea && "text-transparent dark:text-transparent"
              )}
              style={{
                height: "auto",
                minHeight: "3rem", // Ensures a minimum height
                maxHeight: "100%", // Set maximum height constraint
              }}
            />

            {/* Submit Button */}
            <button
              disabled={!inputValue}
              type="submit"
              className="absolute right-2 bottom-4 z-50 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-300 h-4 w-4"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <motion.path
                  d="M5 12l14 0"
                  initial={{
                    strokeDasharray: "50%",
                    strokeDashoffset: "50%",
                  }}
                  animate={{ strokeDashoffset: inputValue ? 0 : "50%" }}
                  transition={{ duration: 0.3, ease: "linear" }}
                />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </motion.svg>
            </button>
            <div className="absolute bottom-2 left-10 flex items-center gap-7">
           <FileUploadDropzone/>
            <MdPersonAddAlt size={22}  className="cursor-pointer"/>
      </div>
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
    </form>
  );
}
