"use client";

import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Upload, Modal } from "antd";
import type { UploadFileStatus } from "antd/es/upload/interface";
import Image from "next/image";
import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export interface MyFormFileUploadDropzoneProps {
  name: string;
  maxFiles?: number;
  label?: string;
}

const MyFormFileUploadDropzone = ({
  name,
  maxFiles = 5,
  label,
}: MyFormFileUploadDropzoneProps) => {
  const { control, setValue } = useFormContext();
  const files = useWatch({ control, name }) || [];

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <div className="w-full">
          {label && (
            <p className="ps-1 mb-2 text-[#101828] text-base font-normal leading-6">
              {label}
            </p>
          )}

          <Upload
            listType="picture-card"
            accept="image/*"
            fileList={files}
            onPreview={handlePreview}
            onChange={({ fileList: newFileList }) => {
              // ✅ force status to "done"
              const processed = newFileList.map((file) => ({
                ...file,
                status: "done" as UploadFileStatus,
              }));
              onChange(processed);
              setValue(name, processed, { shouldValidate: true });
            }}
            onRemove={(file) => {
              const updated = files.filter((f: UploadFile) => f.uid !== file.uid);
              onChange(updated);
              setValue(name, updated, { shouldValidate: true });
            }}
          >
            {files.length >= maxFiles ? null : (
              <button
                style={{ border: 0, background: "none" }}
                className="dark:text-white"
                type="button"
              >
                <PlusOutlined />
                <div style={{ marginTop: 4 }}>Image</div>
              </button>
            )}
          </Upload>

          <Modal
            open={previewOpen}
            title="Image Preview"
            footer={null}
            onCancel={() => setPreviewOpen(false)}
            bodyStyle={{
              padding: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {previewImage && (
              <Image
                alt="Preview"
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
        </div>
      )}
    />
  );
};

export default MyFormFileUploadDropzone;
