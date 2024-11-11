import React, { useState } from "react";

import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
import Swal from "sweetalert2";
import { FaRegStar } from "react-icons/fa";

const NoteCard = () => {
  const [showArticle, setShowArticle] = useState(false);

  const text =
    "lorem ipsum dolor sit amet, consectetur adip non non pro id lob SDFGSD WAFSDFSDF SDFSDF SDFASFDSA lorem ipsum dolor sit amet, consectetur adip non non pro id lob SDFGSD WAFSDFSDF SDFSDF SDFASFDSA lorem ipsum dolor sit amet, consectetur adip non non pro id lob SDFGSD WAFSDFSDF SDFSDF SDFASFDSA lorem ipsum dolor sit amet, consectetur adip non non pro id lob SDFGSD WAFSDFSDF SDFSDF SDFASFDSA lorem ipsum dolor sit amet, consectetur adip non non pro id lob SDFGSD WAFSDFSDF SDFSDF SDFASFDSA lorem ipsum dolor sit amet, consectetur adip non non pro id lob SDFGSD WAFSDFSDF SDFSDF SDFASFDSA ";

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const handleEdit = () => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Edited!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div
      className="relative min-h-24 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 overflow-hidden cursor-pointer"
      onMouseEnter={() => setShowArticle(true)}
      onMouseLeave={() => setShowArticle(false)}
    >
      <h3 className="text-xl font-bold border-b-2 px-4 py-3">Title</h3>
      <div className="px-4 py-3 text-sm">
        {text?.length > 160 ? `${text.substring(0, 160)}...` : text}
      </div>

      <article
        className={`p-4 space-y-2 absolute bottom-0 transition-all duration-300 w-full bg-gradient-to-b from-transparent to-black bg-opacity-75 transform ${
          showArticle
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        }`}
      >
        <div className="text-base text-white font-normal pt-8 flex gap-1 transition-all duration-300">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <Tooltip
             
                placement="top"
                content="Edit"
                classNames={{
                  base: [
                    // arrow color
                    "before:bg-neutral-400 dark:before:bg-white",
                  ],
                  content: [
                    "py-2 px-4 shadow-xl",
                    "text-black bg-gradient-to-br from-white to-neutral-400",
                  ],
                }}
              >
                <TbEdit size={20} onClick={handleEdit} />
              </Tooltip>
              <Tooltip
              
                placement="top"
                content="Delete"
                classNames={{
                  base: [
                    // arrow color
                    "before:bg-neutral-400 dark:before:bg-white",
                  ],
                  content: [
                    "py-2 px-4 shadow-xl",
                    "text-black bg-gradient-to-br from-white to-neutral-400",
                  ],
                }}
              >
                <MdOutlineDelete size={20} onClick={handleDelete} />
              </Tooltip>
            </div>

            <div>
              <FaRegStar />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NoteCard;
