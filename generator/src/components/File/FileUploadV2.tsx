"use client"

import { BACKEND_URL } from '@/lib/constants';
import React, { useState, useRef } from 'react';
import * as libraryNetwork from "@/network/library/library.network";
import { Button } from '../ui/button';
import IconLoaderSpin from '../CustomIcon/IconLoaderSpin';
import { Upload } from 'lucide-react';

interface IFileUpload {
}


const FileUpload = (props: IFileUpload) => {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
     event.preventDefault();
     event.stopPropagation();
  };
 
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
     event.preventDefault();
     event.stopPropagation();
     // Trigger the file input click event to open the file explorer
     fileInputRef.current?.click();
  };
 
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     if (event.target.files) {
       // Handle the selected files
       console.log(event.target.files);
     }
  };

  const onFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);

  };

  const onFileUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    await libraryNetwork.saveFile({
      formData: formData
    })

    setLoading(false);
  };

  {/*
  return (
    <div className='p-5 flex justify-center gap-2'>
      <input type="file" onChange={onFileChange} />
      <Button type="button" onClick={onFileUpload}>{
      (loading) ? <IconLoaderSpin /> : "upload"}</Button>
    </div>
  );



      */}

  return (
    <section
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className='flex p-4 w-3/5 flex-col items-center gap-2 border-4 border-dotted rounded border-indigo-600 hover:bg-slate-200 cursor-pointer'>
      <Upload size={64} />
      <h3>Upload your file here</h3>

      <p>Files supported PNG, JPEG</p>
      <p><strong>OR</strong></p>

      <input
        type="file"
        id="upload"
        accept='*'
        onChange={onFileChange}
        hidden
        ref={fileInputRef}  
      />
      
      <label htmlFor="upload">Choose file</label>
      <Button type="button" onClick={onFileUpload}>{
      (loading) ? <IconLoaderSpin /> : "upload"}</Button>


      <p>Maximum size : 2MB</p>
    </section>
  )
};

export default FileUpload;