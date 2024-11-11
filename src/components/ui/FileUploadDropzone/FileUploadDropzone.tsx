'use client';

// import {
//   FileUploader,
//   FileInput,
//   FileUploaderContent,
//   FileUploaderItem,
// } from '@/components/file-upload';
import { Paperclip, Upload } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { DropzoneOptions } from 'react-dropzone';
import {   FileUploader,
      FileInput,
      FileUploaderContent,
      FileUploaderItem,
     } from '../file-upload';
import { GrGallery } from 'react-icons/gr';

const FileUploadDropzone = () => {
  const [files, setFiles] = useState<File[] | null>([]);
  const [message, setMessage] = useState('');

  const dropzone = {
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    multiple: true,
    maxFiles: 4,
    maxSize: 1 * 1024 * 1024,
  } satisfies DropzoneOptions;

  return (
    <div
      className={`${
        files?.length == 0 && 'flex gap-0'
      } relative  bg-background rounded-md   p-2 mx-auto`}
    >
      <FileUploader
        value={files}
        orientation='vertical'
        onValueChange={setFiles}
        className='w-fit pr-3'
        dropzoneOptions={dropzone}
      >
        {files?.length === 0 ? (
          // Layout when no files are present
          <div className='flex items-center gap-2'>
            <FileInput
              className='  text-background rounded-md w-fit'
              parentclass='w-fit'
            >
            <GrGallery size={18} className="cursor-pointer"/>
              <span className='sr-only'>Select your files</span>
            </FileInput>
          </div>
        ) : (
          // Layout when files are present
          <div className='flex flex-col gap-2 mb-2'>
            <div className='flex items-center gap-2 '>
              <FileInput
                className=' border-primary/20 border h-10 w-10 rounded-md flex justify-center items-center'
                parentclass='w-fit'
              >
          
              <GrGallery size={30} className=""/>
              </FileInput>
              <FileUploaderContent className='flex items-start flex-row gap-1'>
                {files?.map((file, i) => (
                  <FileUploaderItem
                    key={i}
                    index={i}
                    className='size-12 w-fit p-0 rounded-md overflow-hidden border'
                    aria-roledescription={`file ${i + 1} containing ${
                      file.name
                    }`}
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      height={80}
                      width={80}
                      className='size-12 rounded-md object-cover bg-primary'
                    />
                  </FileUploaderItem>
                ))}
              </FileUploaderContent>
            </div>
          </div>
        )}
      </FileUploader>
    
    </div>
  );
};

export default FileUploadDropzone;
