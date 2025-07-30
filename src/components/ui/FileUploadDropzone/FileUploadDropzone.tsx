/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Upload, Modal } from "antd";
import type { UploadFileStatus } from "antd/es/upload/interface";
import Image from "next/image";
import { useEffect, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export interface FileUploadDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

const FileUploadDropzone = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);

  // Pass selected files up when they change
  // useEffect(() => {
  //   onFilesSelected(files);
  // }, [files, onFilesSelected]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      className="dark:text-white"
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 4 }}>Image</div>
    </button>
  );

  useEffect(() => {
    const selectedFiles = fileList.map((file, index) => ({
      uid: index.toString(),
      name: file.name,
      status: "done" as UploadFileStatus,
      url: file.originFileObj
        ? URL.createObjectURL(file.originFileObj as File)
        : undefined,
      originFileObj: file.originFileObj ?? file,
    }));

    setFiles(selectedFiles);
  }, [fileList]);

  return (
    <>
      <Upload
        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"

        listType="picture-card"
        accept="image/*"
        fileList={files}
        onRemove={(file) => {
          setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
          setFiles((prev) => prev.filter((f) => f.name !== file.name));
        }}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title="Image Preview"
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        // width="80vw"
        // style={{ maxWidth: '90vw' }}
        bodyStyle={{ 
          padding: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {previewImage && (
          <Image
            alt=""
            src={previewImage}
            width={600}
            height={400}
            style={{
              maxWidth: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default FileUploadDropzone;