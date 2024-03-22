"use client"

import { BACKEND_URL } from '@/lib/constants';
import React, { useState } from 'react';
import * as fileNetwork from "@/network/file/file.network";

interface IFileUpload {
} 

const FileUpload = (props : IFileUpload) => {
  const [selectedFile, setSelectedFile] = useState<any>();

  const onFileChange = (event : any) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    let resp = await fileNetwork.saveFile({
        formData : formData
    })

    console.log("onFileUpload : ", resp)
  }; 

  return (
    <div className='p-5 flex justify-center gap-2'>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;