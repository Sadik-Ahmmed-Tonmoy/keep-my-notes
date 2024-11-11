/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import NoteCard from "@/components/NoteCard/NoteCard";
import { NoteFormWithVanishEffect } from "@/components/ui/NoteFormWithVanishEffect/NoteFormWithVanishEffect";
import { motion } from "framer-motion";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";

const page = () => {
  const placeholders = [
    "Your title...", // Keeps it concise and to the point
    "Summarize your idea...", // Suggests summarizing the content
    "Enter a catchy title...", // Encourages creativity in the title
    "Name this thought...", // Makes it personal
    "Title your note...", // Directs the user to give it a name
  ];
  const placeholdersForTextArea = [
    "Write down your thoughts here...", // Initial prompt
    "Add more details or notes...", // Encourages further information
    "Describe your idea in detail...", // Suggests a more elaborate description
    "Expand on this idea...", // Prompts for further detail
    "What’s the background or context?", // Asks for additional context
    "List your main points or ideas...", // Suggests a structured format
    "Write any important reminders...", // Encourages writing reminders
    "Capture all your thoughts here...", // Keeps it open-ended
    "Any additional information?", // Prompts for final additions
    "Summarize or recap the key points...", // Guides toward a summary
  ];

  const handleChange = (e: any) => {
    console.log("Input changed:", e.target.value);
  };

  const handleSubmit = (e: any) => {
    console.log(e);
    toast("Note has been saved", {
      icon: <IoCheckmarkCircleOutline size={25} />,
    });
  };

  return (
    <div className="">
      <Toaster position="top-right" duration={3000} />
      <div className=" px-2 pt-3 md:pt-10 pb-5">
        <NoteFormWithVanishEffect
          placeholders={placeholders}
          placeholdersForTextArea={placeholdersForTextArea}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        {/* <SearchWithVanishEffect
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={handleSubmit}
      /> */}
      </div>
    
      <div className="flex flex-1 w-full group h-full">
        <div className="p-2 md:p-10 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Array.from({ length: 50 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }} // Start off-screen below
                animate={{ opacity: 1, y: 0 }} // Final state
                transition={{
                  duration: 0.3,
                  delay: index * 0.1, // Stagger animation by 0.1s for each item
                }}
                className=" rounded-md overflow-hidden group relative cursor-pointer"
              >
                <NoteCard />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
