"use client";

import React, { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { Eye, EyeOff, X } from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";

export default function ViewModal() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  const openDetailsModal = () => setIsDetailsModalOpen(true);
  const closeDetailsModal = () => setIsDetailsModalOpen(false);

  const handlePasswordSubmit = () => {
    closePasswordModal();
    openDetailsModal();
  };

  return (
    <>
      <Tooltip
        placement="top"
        content="View"
        classNames={{
          base: ["before:bg-neutral-400 dark:before:bg-white"],
          content: [
            "py-2 px-4 shadow-xl",
            "text-black bg-gradient-to-br from-white to-neutral-400",
          ],
        }}
      >
        <button onClick={openPasswordModal}>
          <Eye size={20} />
        </button>
      </Tooltip>

      {/* Password Modal */}
      <Modal isOpen={isPasswordModalOpen} hideCloseButton>
        <ModalContent className="relative">
          {/* ✅ Only ONE custom close X on top-right */}
          <button
            onClick={closePasswordModal}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>

          <ModalHeader>
            Enter Password
          </ModalHeader>

          <ModalBody>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closePasswordModal}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
              >
                Submit
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Details Modal */}
      <Modal isOpen={isDetailsModalOpen} onClose={closeDetailsModal} hideCloseButton>
        <ModalContent className="relative">
          {/* ✅ Only ONE custom close X on top-right */}
          <button
            onClick={closeDetailsModal}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
          >
            <X size={20} />
          </button>

          <ModalHeader>
            Full Details
          </ModalHeader>

          <ModalBody>
            <p>Here are the full details!</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeDetailsModal}
                className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
