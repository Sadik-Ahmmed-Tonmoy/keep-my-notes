/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Tooltip, message, Form } from "antd";
import { IconCategory, IconFolder, IconHeart, IconStar, IconHistory, IconShare, IconArchive, IconTrash } from "@tabler/icons-react";
import { MdPersonAddAlt } from "react-icons/md";
import { motion } from "framer-motion";
import FileUploadDropzone from "../FileUploadDropzone/FileUploadDropzone";
import { CategoriesModal, FileListModal, SharedFilesModal, PeopleModal } from "./ModalComponents";

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  dateModified: string;
  category: string;
  isFavorite: boolean;
  isStarred: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  sharedWith: string[];
  owner: string;
}

interface Person {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
}

export default function BottomBar({ inputValue }: { inputValue: string }) {
  // Modal states
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = React.useState(false);
  const [isMyFilesModalOpen, setIsMyFilesModalOpen] = React.useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = React.useState(false);
  const [isStarredModalOpen, setIsStarredModalOpen] = React.useState(false);
  const [isRecentModalOpen, setIsRecentModalOpen] = React.useState(false);
  const [isSharedModalOpen, setIsSharedModalOpen] = React.useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = React.useState(false);
  const [isTrashModalOpen, setIsTrashModalOpen] = React.useState(false);
  const [isPersonModalOpen, setIsPersonModalOpen] = React.useState(false);

  // Forms
  const [personForm] = Form.useForm();

  // Sample data
  const [files, setFiles] = React.useState<FileItem[]>([
    {
      id: "1",
      name: "Project_Proposal.pdf",
      type: "PDF",
      size: "2.5 MB",
      dateModified: "2024-01-15",
      category: "Documents",
      isFavorite: true,
      isStarred: false,
      isArchived: false,
      isDeleted: false,
      sharedWith: ["john@company.com", "sarah@company.com"],
      owner: "current_user",
    },
    {
      id: "2",
      name: "Budget_Analysis.xlsx",
      type: "Excel",
      size: "1.8 MB",
      dateModified: "2024-01-14",
      category: "Finance",
      isFavorite: false,
      isStarred: true,
      isArchived: false,
      isDeleted: false,
      sharedWith: ["finance@company.com"],
      owner: "current_user",
    },
    {
      id: "3",
      name: "Meeting_Notes.docx",
      type: "Word",
      size: "856 KB",
      dateModified: "2024-01-10",
      category: "Documents",
      isFavorite: false,
      isStarred: false,
      isArchived: true,
      isDeleted: false,
      sharedWith: [],
      owner: "current_user",
    },
    {
      id: "4",
      name: "Old_Report.pdf",
      type: "PDF",
      size: "3.2 MB",
      dateModified: "2024-01-05",
      category: "Reports",
      isFavorite: false,
      isStarred: false,
      isArchived: false,
      isDeleted: true,
      sharedWith: [],
      owner: "current_user",
    },
  ]);

  const [people, setPeople] = React.useState<Person[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@company.com",
      role: "Project Manager",
      department: "Operations",
      joinDate: "2023-06-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "Senior Developer",
      department: "Engineering",
      joinDate: "2023-03-20",
    },
  ]);

  const [categories] = React.useState(["Documents", "Finance", "Reports", "Projects", "Marketing", "HR", "Legal", "Operations"]);

  // File operations
  const toggleFavorite = (fileId: string) => {
    setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, isFavorite: !file.isFavorite } : file)));
    message.success("File favorite status updated");
  };

  const toggleStar = (fileId: string) => {
    setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, isStarred: !file.isStarred } : file)));
    message.success("File star status updated");
  };

  const moveToTrash = (fileId: string) => {
    setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, isDeleted: true } : file)));
    message.success("File moved to trash");
  };

  const restoreFile = (fileId: string) => {
    setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, isDeleted: false } : file)));
    message.success("File restored");
  };

  const deleteFilePermanently = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
    message.success("File permanently deleted");
  };

  const archiveFile = (fileId: string) => {
    setFiles((prev) => prev.map((file) => (file.id === fileId ? { ...file, isArchived: !file.isArchived } : file)));
    message.success("File archive status updated");
  };

  // File lists
  const myFiles = files.filter((file) => !file.isDeleted);
  const favoriteFiles = files.filter((file) => file.isFavorite && !file.isDeleted);
  const starredFiles = files.filter((file) => file.isStarred && !file.isDeleted);
  const recentFiles = files
    .filter((file) => !file.isDeleted)
    .sort((a, b) => new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime())
    .slice(0, 10);
  const sharedFiles = files.filter((file) => file.sharedWith.length > 0 && !file.isDeleted);
  const archivedFiles = files.filter((file) => file.isArchived && !file.isDeleted);
  const trashedFiles = files.filter((file) => file.isDeleted);

  // File actions object
  const fileActions = {
    onToggleFavorite: toggleFavorite,
    onToggleStar: toggleStar,
    onArchiveFile: archiveFile,
    onMoveToTrash: moveToTrash,
    onRestoreFile: restoreFile,
    onDeletePermanently: deleteFilePermanently,
  };

  // Handlers for each action
  const handleCategoriesClick = () => setIsCategoriesModalOpen(true);
  const handleMyFilesClick = () => setIsMyFilesModalOpen(true);
  const handleFavoritesClick = () => setIsFavoritesModalOpen(true);
  const handleStarredClick = () => setIsStarredModalOpen(true);
  const handleRecentClick = () => setIsRecentModalOpen(true);
  const handleSharedClick = () => setIsSharedModalOpen(true);
  const handleArchiveClick = () => setIsArchiveModalOpen(true);
  const handleTrashClick = () => setIsTrashModalOpen(true);
  const handleAddPersonClick = () => setIsPersonModalOpen(true);

  const handleSubmit = () => {
    if (inputValue) {
      message.success(`Submitted: ${inputValue}`);
    }
  };

  const handleAddPerson = (values: any) => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name: values.name,
      email: values.email,
      role: values.role,
      department: values.department,
      joinDate: values.joinDate.format("YYYY-MM-DD"),
    };
    setPeople((prev) => [...prev, newPerson]);
    message.success("Person added successfully!");
    setIsPersonModalOpen(false);
    personForm.resetFields();
  };

  const removePerson = (personId: string) => {
    setPeople((prev) => prev.filter((person) => person.id !== personId));
    message.success("Person removed successfully!");
  };

  return (
    <>
      <div className="flex items-center justify-between flex-wrap px-4">
        <div className="flex items-center gap-5 flex-wrap">
          <FileUploadDropzone />

          <Tooltip title="Categories">
            <IconCategory size={22} className="cursor-pointer hover:text-blue-500 transition-colors" onClick={handleCategoriesClick} />
          </Tooltip>

          <Tooltip title="My Files">
            <IconFolder size={22} className="cursor-pointer hover:text-blue-500 transition-colors" onClick={handleMyFilesClick} />
          </Tooltip>

          <Tooltip title="Favorites">
            <IconHeart size={22} className="cursor-pointer hover:text-red-500 transition-colors" onClick={handleFavoritesClick} />
          </Tooltip>

          <Tooltip title="Starred">
            <IconStar size={22} className="cursor-pointer hover:text-yellow-500 transition-colors" onClick={handleStarredClick} />
          </Tooltip>

          <Tooltip title="Recent">
            <IconHistory size={22} className="cursor-pointer hover:text-green-500 transition-colors" onClick={handleRecentClick} />
          </Tooltip>

          <Tooltip title="Shared">
            <IconShare size={22} className="cursor-pointer hover:text-purple-500 transition-colors" onClick={handleSharedClick} />
          </Tooltip>

          <Tooltip title="Archive">
            <IconArchive size={22} className="cursor-pointer hover:text-orange-500 transition-colors" onClick={handleArchiveClick} />
          </Tooltip>

          <Tooltip title="Trash">
            <IconTrash size={22} className="cursor-pointer hover:text-red-500 transition-colors" onClick={handleTrashClick} />
          </Tooltip>

          <Tooltip title="Manage People">
            <MdPersonAddAlt size={22} className="cursor-pointer hover:text-blue-500 transition-colors" onClick={handleAddPersonClick} />
          </Tooltip>
        </div>

        <Tooltip title="Submit">
          <button
            disabled={!inputValue}
            type="button"
            onClick={handleSubmit}
            className="z-50 h-8 w-8 rounded-full disabled:bg-gray-100 bg-black dark:bg-zinc-900 dark:disabled:bg-zinc-800 transition duration-200 flex items-center justify-center hover:scale-105"
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
                initial={{ strokeDasharray: "50%", strokeDashoffset: "50%" }}
                animate={{ strokeDashoffset: inputValue ? 0 : "50%" }}
                transition={{ duration: 0.3, ease: "linear" }}
              />
              <path d="M13 18l6 -6" />
              <path d="M13 6l6 6" />
            </motion.svg>
          </button>
        </Tooltip>
      </div>

      {/* Modal Components */}
      <CategoriesModal isOpen={isCategoriesModalOpen} onClose={() => setIsCategoriesModalOpen(false)} categories={categories} files={files} />

      <FileListModal
        isOpen={isMyFilesModalOpen}
        onClose={() => setIsMyFilesModalOpen(false)}
        title="My Files"
        files={myFiles}
        fileActions={fileActions}
      />

      <FileListModal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        title="Favorite Files"
        files={favoriteFiles}
        fileActions={fileActions}
      />

      <FileListModal
        isOpen={isStarredModalOpen}
        onClose={() => setIsStarredModalOpen(false)}
        title="Starred Files"
        files={starredFiles}
        fileActions={fileActions}
      />

      <FileListModal
        isOpen={isRecentModalOpen}
        onClose={() => setIsRecentModalOpen(false)}
        title="Recent Files"
        files={recentFiles}
        fileActions={fileActions}
      />

      <SharedFilesModal isOpen={isSharedModalOpen} onClose={() => setIsSharedModalOpen(false)} files={sharedFiles} fileActions={fileActions} />

      <FileListModal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        title="Archived Files"
        files={archivedFiles}
        fileActions={fileActions}
      />

      <FileListModal
        isOpen={isTrashModalOpen}
        onClose={() => setIsTrashModalOpen(false)}
        title="Trash"
        files={trashedFiles}
        fileActions={fileActions}
      />

      <PeopleModal
        isOpen={isPersonModalOpen}
        onClose={() => setIsPersonModalOpen(false)}
        people={people}
        onAddPerson={handleAddPerson}
        onRemovePerson={removePerson}
        form={personForm}
      />
    </>
  );
}
