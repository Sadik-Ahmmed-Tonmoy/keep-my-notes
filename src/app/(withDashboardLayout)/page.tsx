"use client";

import { SearchWithVanishEffect } from "@/components/ui/placeholders-and-vanish-input";

const page = () => {
  const placeholders = ["Search here...", "Type something...", "Go ahead!"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="my-10">
      <SearchWithVanishEffect
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default page;

// export function ClientInputWrapper({
//     placeholders,
//     onChange,
//     onSubmit,
//   }: {
//     placeholders: string[];
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//   }) {
//     return (
//       <PlaceholdersAndVanishInput
//         placeholders={placeholders}
//         onChange={onChange}
//         onSubmit={onSubmit}
//       />
//     );
//   }
