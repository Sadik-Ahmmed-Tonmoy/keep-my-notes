/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { message, Form, Input, Select, DatePicker, Tag, Space, List, Button as AntButton, Popconfirm } from "antd";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import {
  IconX,
  IconDownload,
  IconEdit,
  IconEye,
  IconHeart,
  IconStar,
  IconArchive,
  IconTrash,
} from "@tabler/icons-react";
import { Tooltip } from "antd";

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

interface FileActionsProps {
  file: FileItem;
  onToggleFavorite: (fileId: string) => void;
  onToggleStar: (fileId: string) => void;
  onArchiveFile: (fileId: string) => void;
  onMoveToTrash: (fileId: string) => void;
  onRestoreFile: (fileId: string) => void;
  onDeletePermanently: (fileId: string) => void;
}

// File Actions Component
export const FileActions: React.FC<FileActionsProps> = ({
  file,
  onToggleFavorite,
  onToggleStar,
  onArchiveFile,
  onMoveToTrash,
  onRestoreFile,
  onDeletePermanently,
}) => (
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
        onClick={() => onToggleFavorite(file.id)}
      />
    </Tooltip>
    <Tooltip title={file.isStarred ? "Unstar" : "Star"}>
      <IconStar 
        size={16} 
        className={`cursor-pointer ${file.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-500'}`}
        onClick={() => onToggleStar(file.id)}
      />
    </Tooltip>
    {!file.isDeleted && (
      <Tooltip title={file.isArchived ? "Unarchive" : "Archive"}>
        <IconArchive 
          size={16} 
          className={`cursor-pointer ${file.isArchived ? 'text-blue-500' : 'text-gray-500'}`}
          onClick={() => onArchiveFile(file.id)}
        />
      </Tooltip>
    )}
    {file.isDeleted ? (
      <>
        <AntButton size="small" onClick={() => onRestoreFile(file.id)}>Restore</AntButton>
        <Popconfirm
          title="Permanently delete this file?"
          onConfirm={() => onDeletePermanently(file.id)}
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
          onClick={() => onMoveToTrash(file.id)}
        />
      </Tooltip>
    )}
  </Space>
);

// Categories Modal Component
interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  files: FileItem[];
}

export const CategoriesModal: React.FC<CategoriesModalProps> = ({
  isOpen,
  onClose,
  categories,
  files,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="2xl"
    scrollBehavior="inside"
  >
    <ModalContent>
      <ModalHeader>
        <h2 className="text-xl font-semibold">File Categories</h2>
      </ModalHeader>
      <ModalBody>
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
      </ModalBody>
    </ModalContent>
  </Modal>
);

// File List Modal Component
interface FileListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  files: FileItem[];
  fileActions: FileActionsProps;
}

export const FileListModal: React.FC<FileListModalProps> = ({
  isOpen,
  onClose,
  title,
  files,
  fileActions,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="3xl"
    scrollBehavior="inside"
  >
    <ModalContent>
      <ModalHeader>
        <h2 className="text-xl font-semibold">{title} ({files.length})</h2>
      </ModalHeader>
      <ModalBody>
        <List
          dataSource={files}
          renderItem={(file) => (
            <List.Item
              actions={[
                <FileActions 
                  key="actions" 
                  file={file} 
                  onToggleFavorite={fileActions.onToggleFavorite}
                  onToggleStar={fileActions.onToggleStar}
                  onArchiveFile={fileActions.onArchiveFile}
                  onMoveToTrash={fileActions.onMoveToTrash}
                  onRestoreFile={fileActions.onRestoreFile}
                  onDeletePermanently={fileActions.onDeletePermanently}
                />
              ]}
            >
              <List.Item.Meta
                title={
                  <span className={`font-medium ${
                    file.isDeleted ? 'text-red-600 line-through' : 
                    file.isArchived ? 'text-gray-600' : ''
                  }`}>
                    {file.name}
                  </span>
                }
                description={
                  <Space>
                    <Tag color="blue">{file.type}</Tag>
                    <span>{file.size}</span>
                    <span>
                      {file.isDeleted ? 'Deleted' : 'Modified'}: {file.dateModified}
                    </span>
                    <Tag color="green">{file.category}</Tag>
                    {file.sharedWith.length > 0 && (
                      <Tag color="purple">Shared with {file.sharedWith.length}</Tag>
                    )}
                    {file.isArchived && <Tag color="orange">Archived</Tag>}
                    {file.isDeleted && <Tag color="red">Deleted</Tag>}
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </ModalBody>
    </ModalContent>
  </Modal>
);

// Shared Files Modal Component
interface SharedFilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileItem[];
  fileActions: FileActionsProps;
}

export const SharedFilesModal: React.FC<SharedFilesModalProps> = ({
  isOpen,
  onClose,
  files,
  fileActions,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="3xl"
    scrollBehavior="inside"
  >
    <ModalContent>
      <ModalHeader>
        <h2 className="text-xl font-semibold">Shared Files ({files.length})</h2>
      </ModalHeader>
      <ModalBody>
        <List
          dataSource={files}
          renderItem={(file) => (
            <List.Item
              actions={[
                <FileActions 
                  key="actions" 
                  file={file} 
                  onToggleFavorite={fileActions.onToggleFavorite}
                  onToggleStar={fileActions.onToggleStar}
                  onArchiveFile={fileActions.onArchiveFile}
                  onMoveToTrash={fileActions.onMoveToTrash}
                  onRestoreFile={fileActions.onRestoreFile}
                  onDeletePermanently={fileActions.onDeletePermanently}
                />
              ]}
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
      </ModalBody>
    </ModalContent>
  </Modal>
);

// People Management Modal Component
interface PeopleModalProps {
  isOpen: boolean;
  onClose: () => void;
  people: Person[];
  onAddPerson: (values: any) => void;
  onRemovePerson: (personId: string) => void;
  form: any;
}

export const PeopleModal: React.FC<PeopleModalProps> = ({
  isOpen,
  onClose,
  people,
  onAddPerson,
  onRemovePerson,
  form,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    size="3xl"
    scrollBehavior="inside"
  >
    <ModalContent>
      <ModalHeader>
        <h2 className="text-xl font-semibold">Manage People</h2>
      </ModalHeader>
      <ModalBody>
        <div className="space-y-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={onAddPerson}
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
                      onConfirm={() => onRemovePerson(person.id)}
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
      </ModalBody>
    </ModalContent>
  </Modal>
);