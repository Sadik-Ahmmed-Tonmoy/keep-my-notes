/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Tooltip, message, Form, Input, Select, DatePicker, Tag, Space, List, Button as AntButton, Popconfirm, Upload } from "antd";
import {
  Modal,
  Button,
} from "@heroui/react";
import {
  IconCategory,
  IconFolder,
  IconHeart,
  IconStar,
  IconHistory,
  IconShare,
  IconArchive,
  IconTrash,
  IconX,
  IconDownload,
  IconEdit,
  IconEye,
} from "@tabler/icons-react";
import { MdPersonAddAlt } from "react-icons/md";
import { motion } from "framer-motion";
import FileUploadDropzone from "../FileUploadDropzone/FileUploadDropzone";

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
      owner: "current_user"
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
      owner: "current_user"
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
      owner: "current_user"
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
      owner: "current_user"
    }
  ]);

  const [people, setPeople] = React.useState<Person[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@company.com",
      role: "Project Manager",
      department: "Operations",
      joinDate: "2023-06-15"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "Senior Developer",
      department: "Engineering",
      joinDate: "2023-03-20"
    }
  ]);

  const [categories] = React.useState([
    "Documents", "Finance", "Reports", "Projects", "Marketing", "HR", "Legal", "Operations"
  ]);

  // File operations
  const toggleFavorite = (fileId: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, isFavorite: !file.isFavorite } : file
    ));
    message.success("File favorite status updated");
  };

  const toggleStar = (fileId: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, isStarred: !file.isStarred } : file
    ));
    message.success("File star status updated");
  };

  const moveToTrash = (fileId: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, isDeleted: true } : file
    ));
    message.success("File moved to trash");
  };

  const restoreFile = (fileId: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, isDeleted: false } : file
    ));
    message.success("File restored");
  };

  const deleteFilePermanently = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
    message.success("File permanently deleted");
  };

  const archiveFile = (fileId: string) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId ? { ...file, isArchived: !file.isArchived } : file
    ));
    message.success("File archive status updated");
  };

  // File lists
  const myFiles = files.filter(file => !file.isDeleted);
  const favoriteFiles = files.filter(file => file.isFavorite && !file.isDeleted);
  const starredFiles = files.filter(file => file.isStarred && !file.isDeleted);
  const recentFiles = files.filter(file => !file.isDeleted).sort((a, b) => 
    new Date(b.dateModified).getTime() - new Date(a.dateModified).getTime()
  ).slice(0, 10);
  const sharedFiles = files.filter(file => file.sharedWith.length > 0 && !file.isDeleted);
  const archivedFiles = files.filter(file => file.isArchived && !file.isDeleted);
  const trashedFiles = files.filter(file => file.isDeleted);

  // File action component
  const FileActions = ({ file }: { file: FileItem }) => (
    <Space>
      <Tooltip title="View">
        <IconEye size={16} className="cursor-pointer text-blue-500" />
      </Tooltip>
      <Tooltip title="Download">
        <IconDownload size={16} className="cursor-pointer text-green-500" />
      </Tooltip>
      <Tooltip title="Edit">
        <IconEdit size={16} className="cursor-pointer text-orange-500" />
      </Tooltip>
      <Tooltip title={file.isFavorite ? "Remove from favorites" : "Add to favorites"}>
        <IconHeart 
          size={16} 
          className={`cursor-pointer ${file.isFavorite ? 'text-red-500 fill-current' : 'text-gray-500'}`}
          onClick={() => toggleFavorite(file.id)}
        />
      </Tooltip>
      <Tooltip title={file.isStarred ? "Unstar" : "Star"}>
        <IconStar 
          size={16} 
          className={`cursor-pointer ${file.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-500'}`}
          onClick={() => toggleStar(file.id)}
        />
      </Tooltip>
      {!file.isDeleted && (
        <Tooltip title={file.isArchived ? "Unarchive" : "Archive"}>
          <IconArchive 
            size={16} 
            className={`cursor-pointer ${file.isArchived ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={() => archiveFile(file.id)}
          />
        </Tooltip>
      )}
      {file.isDeleted ? (
        <>
          <AntButton size="small" onClick={() => restoreFile(file.id)}>Restore</AntButton>
          <Popconfirm
            title="Permanently delete this file?"
            onConfirm={() => deleteFilePermanently(file.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <AntButton size="small" danger>Delete Forever</AntButton>
          </Popconfirm>
        </>
      ) : (
        <Tooltip title="Move to trash">
          <IconTrash 
            size={16} 
            className="cursor-pointer text-red-500"
            onClick={() => moveToTrash(file.id)}
          />
        </Tooltip>
      )}
    </Space>
  );

  // Handlers for each action
  const handleCategoriesClick = () => {
    setIsCategoriesModalOpen(true);
  };

  const handleMyFilesClick = () => {
    setIsMyFilesModalOpen(true);
  };

  const handleFavoritesClick = () => {
    setIsFavoritesModalOpen(true);
  };

  const handleStarredClick = () => {
    setIsStarredModalOpen(true);
  };

  const handleRecentClick = () => {
    setIsRecentModalOpen(true);
  };

  const handleSharedClick = () => {
    setIsSharedModalOpen(true);
  };

  const handleArchiveClick = () => {
    setIsArchiveModalOpen(true);
  };

  const handleTrashClick = () => {
    setIsTrashModalOpen(true);
  };

  const handleAddPersonClick = () => {
    setIsPersonModalOpen(true);
  };

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
      joinDate: values.joinDate.format('YYYY-MM-DD')
    };
    setPeople(prev => [...prev, newPerson]);
    message.success("Person added successfully!");
    setIsPersonModalOpen(false);
    personForm.resetFields();
  };

  const removePerson = (personId: string) => {
    setPeople(prev => prev.filter(person => person.id !== personId));
    message.success("Person removed successfully!");
  };

  return (
    <>
      <div className="flex items-center justify-between flex-wrap px-4">
        <div className="flex items-center gap-5 flex-wrap">
          <FileUploadDropzone />
          
          <Tooltip title="Categories">
            <IconCategory
              size={22}
              className="cursor-pointer hover:text-blue-500 transition-colors"
              onClick={handleCategoriesClick}
            />
          </Tooltip>

          <Tooltip title="My Files">
            <IconFolder
              size={22}
              className="cursor-pointer hover:text-blue-500 transition-colors"
              onClick={handleMyFilesClick}
            />
          </Tooltip>

          <Tooltip title="Favorites">
            <IconHeart
              size={22}
              className="cursor-pointer hover:text-red-500 transition-colors"
              onClick={handleFavoritesClick}
            />
          </Tooltip>

          <Tooltip title="Starred">
            <IconStar
              size={22}
              className="cursor-pointer hover:text-yellow-500 transition-colors"
              onClick={handleStarredClick}
            />
          </Tooltip>

          <Tooltip title="Recent">
            <IconHistory
              size={22}
              className="cursor-pointer hover:text-green-500 transition-colors"
              onClick={handleRecentClick}
            />
          </Tooltip>

          <Tooltip title="Shared">
            <IconShare
              size={22}
              className="cursor-pointer hover:text-purple-500 transition-colors"
              onClick={handleSharedClick}
            />
          </Tooltip>

          <Tooltip title="Archive">
            <IconArchive
              size={22}
              className="cursor-pointer hover:text-orange-500 transition-colors"
              onClick={handleArchiveClick}
            />
          </Tooltip>

          <Tooltip title="Trash">
            <IconTrash
              size={22}
              className="cursor-pointer hover:text-red-500 transition-colors"
              onClick={handleTrashClick}
            />
          </Tooltip>

          <Tooltip title="Manage People">
            <MdPersonAddAlt
              size={22}
              className="cursor-pointer hover:text-blue-500 transition-colors"
              onClick={handleAddPersonClick}
            />
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

      {/* Categories Modal */}
      <Modal
        isOpen={isCategoriesModalOpen}
        onClose={() => setIsCategoriesModalOpen(false)}
        size="2xl"
        scrollBehavior="inside"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">File Categories</h2>
          <div className="space-y-4">
            {categories.map(category => {
              const categoryFiles = files.filter(file => file.category === category && !file.isDeleted);
              return (
                <div key={category} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{category}</h3>
                    <Tag color="blue">{categoryFiles.length} files</Tag>
                  </div>
                  <div className="text-sm text-gray-600">
                    {categoryFiles.slice(0, 3).map(file => file.name).join(", ")}
                    {categoryFiles.length > 3 && ` and ${categoryFiles.length - 3} more...`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>

      {/* My Files Modal */}
      <Modal
        isOpen={isMyFilesModalOpen}
        onClose={() => setIsMyFilesModalOpen(false)}
        size="3xl"
        scrollBehavior="inside"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">My Files ({myFiles.length})</h2>
          <List
            dataSource={myFiles}
            renderItem={(file) => (
              <List.Item
                actions={[<FileActions key="actions" file={file} />]}
              >
                <List.Item.Meta
                  title={<span className="font-medium">{file.name}</span>}
                  description={
                    <Space>
                      <Tag color="blue">{file.type}</Tag>
                      <span>{file.size}</span>
                      <span>Modified: {file.dateModified}</span>
                      <Tag color="green">{file.category}</Tag>
                      {file.sharedWith.length > 0 && (
                        <Tag color="purple">Shared with {file.sharedWith.length}</Tag>
                      )}
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>

      {/* Favorites Modal */}
      <Modal
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        size="3xl"
        scrollBehavior="inside"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Favorite Files ({favoriteFiles.length})</h2>
          <List
            dataSource={favoriteFiles}
            renderItem={(file) => (
              <List.Item
                actions={[<FileActions key="actions" file={file} />]}
              >
                <List.Item.Meta
                  title={<span className="font-medium">{file.name}</span>}
                  description={
                    <Space>
                      <Tag color="blue">{file.type}</Tag>
                      <span>{file.size}</span>
                      <span>Modified: {file.dateModified}</span>
                      <Tag color="green">{file.category}</Tag>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>

      {/* Starred Modal */}
      <Modal
        isOpen={isStarredModalOpen}
        onClose={() => setIsStarredModalOpen(false)}
        size="3xl"
        scrollBehavior="inside"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Starred Files ({starredFiles.length})</h2>
          <List
            dataSource={starredFiles}
            renderItem={(file) => (
              <List.Item
                actions={[<FileActions key="actions" file={file} />]}
              >
                <List.Item.Meta
                  title={<span className="font-medium">{file.name}</span>}
                  description={
                    <Space>
                      <Tag color="blue">{file.type}</Tag>
                      <span>{file.size}</span>
                      <span>Modified: {file.dateModified}</span>
                      <Tag color="green">{file.category}</Tag>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>

      {/* Recent Modal */}
      <Modal
        isOpen={isRecentModalOpen}
        onClose={() => setIsRecentModalOpen(false)}
        size="3xl"
        scrollBehavior="inside"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Files ({recentFiles.length})</h2>
          <List
            dataSource={recentFiles}
            renderItem={(file) => (
              <List.Item
                actions={[<FileActions key="actions" file={file} />]}
              >
                <List.Item.Meta
                  title={<span className="font-medium">{file.name}</span>}
                  description={
                    <Space>
                      <Tag color="blue">{file.type}</Tag>
                      <span>{file.size}</span>
                      <span>Modified: {file.dateModified}</span>
                      <Tag color="green">{file.category}</Tag>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>

      {/* Shared Modal */}
      <Modal
        isOpen={isSharedModalOpen}
        onClose={() => setIsSharedModalOpen(false)}
        size="3xl"
        scrollBehavior="inside"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Shared Files ({sharedFiles.length})</h2>
          <List
            dataSource={sharedFiles}
            renderItem={(file) => (
              <List.Item
                actions={[<FileActions key="actions" file={file} />]}
              >
                <List.Item.Meta
                  title={<span className="font-medium">{file.name}</span>}
                  description={
                    <Space direction="vertical" size="small">
                      <Space>
                        <Tag color="blue">{file.type}</Tag>
                        <span>{file.size}</span>
                        <span>Modified: {file.dateModified}</span>
                        <Tag color="green">{file.category}</Tag>
                      </Space>
                      <div>
                        <span className="text-sm text-gray-600">Shared with: </span>
                        {file.sharedWith.map(email => (
                          <Tag key={email} color="purple">{email}</Tag>
                        ))}
                      </div>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>

      {/* Archive Modal */}
      <Modal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        size="3xl"
        scrollBehavior="inside"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Archived Files ({archivedFiles.length})</h2>
          <List
            dataSource={archivedFiles}
            renderItem={(file) => (
              <List.Item
                actions={[<FileActions key="actions" file={file} />]}
              >
                <List.Item.Meta
                  title={<span className="font-medium text-gray-600">{file.name}</span>}
                  description={
                    <Space>
                      <Tag color="blue">{file.type}</Tag>
                      <span>{file.size}</span>
                      <span>Modified: {file.dateModified}</span>
                      <Tag color="green">{file.category}</Tag>
                      <Tag color="orange">Archived</Tag>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>

      {/* Trash Modal */}
      <Modal
        isOpen={isTrashModalOpen}
        onClose={() => setIsTrashModalOpen(false)}
        size="3xl"
        scrollBehavior="inside"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Trash ({trashedFiles.length})</h2>
          <List
            dataSource={trashedFiles}
            renderItem={(file) => (
              <List.Item
                actions={[<FileActions key="actions" file={file} />]}
              >
                <List.Item.Meta
                  title={<span className="font-medium text-red-600 line-through">{file.name}</span>}
                  description={
                    <Space>
                      <Tag color="blue">{file.type}</Tag>
                      <span>{file.size}</span>
                      <span>Deleted: {file.dateModified}</span>
                      <Tag color="green">{file.category}</Tag>
                      <Tag color="red">Deleted</Tag>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>

      {/* People Management Modal */}
      <Modal
        isOpen={isPersonModalOpen}
        onClose={() => setIsPersonModalOpen(false)}
        size="3xl"
        scrollBehavior="inside"
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Manage People</h2>
          <div className="space-y-6">
            <Form
              form={personForm}
              layout="vertical"
              onFinish={handleAddPerson}
              className="border rounded-lg p-4 bg-gray-50"
            >
              <h3 className="text-lg font-semibold mb-4">Add New Person</h3>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  label="Full Name"
                  name="name"
                  rules={[{ required: true, message: 'Please enter full name' }]}
                >
                  <Input placeholder="Enter full name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter valid email' }
                  ]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>
                <Form.Item
                  label="Role"
                  name="role"
                  rules={[{ required: true, message: 'Please select role' }]}
                >
                  <Select placeholder="Select role">
                    <Select.Option value="Manager">Manager</Select.Option>
                    <Select.Option value="Developer">Developer</Select.Option>
                    <Select.Option value="Designer">Designer</Select.Option>
                    <Select.Option value="Analyst">Analyst</Select.Option>
                    <Select.Option value="Coordinator">Coordinator</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Department"
                  name="department"
                  rules={[{ required: true, message: 'Please select department' }]}
                >
                  <Select placeholder="Select department">
                    <Select.Option value="Engineering">Engineering</Select.Option>
                    <Select.Option value="Operations">Operations</Select.Option>
                    <Select.Option value="Finance">Finance</Select.Option>
                    <Select.Option value="Marketing">Marketing</Select.Option>
                    <Select.Option value="HR">HR</Select.Option>
                    <Select.Option value="Legal">Legal</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <Form.Item
                label="Join Date"
                name="joinDate"
                rules={[{ required: true, message: 'Please select join date' }]}
              >
                <DatePicker className="w-full" />
              </Form.Item>
              <Form.Item>
                <AntButton type="primary" htmlType="submit" className="w-full">
                  Add Person
                </AntButton>
              </Form.Item>
            </Form>

            <div>
              <h3 className="text-lg font-semibold mb-4">Team Members ({people.length})</h3>
              <List
                dataSource={people}
                renderItem={(person) => (
                  <List.Item
                    actions={[
                      <Popconfirm
                        key="remove"
                        title="Remove this person?"
                        onConfirm={() => removePerson(person.id)}
                        okText="Remove"
                        cancelText="Cancel"
                      >
                        <AntButton size="small" danger type="text">
                          <IconX size={16} />
                        </AntButton>
                      </Popconfirm>
                    ]}
                  >
                    <List.Item.Meta
                      title={<span className="font-medium">{person.name}</span>}
                      description={
                        <Space direction="vertical" size="small">
                          <Space>
                            <span>{person.email}</span>
                            <Tag color="blue">{person.role}</Tag>
                            <Tag color="green">{person.department}</Tag>
                          </Space>
                          <span className="text-sm text-gray-500">
                            Joined: {person.joinDate}
                          </span>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}