"use client"

import { BACKEND_URL } from '@/lib/constants';
import React, { useState } from 'react';
import * as libraryNetwork from "@/network/library/library.network";
import { Button } from '../ui/button';

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

    let resp = await libraryNetwork.saveFile({
        formData : formData
    })

    console.log("resp")
    console.log(resp)
  }; 

  return (
    <div className='p-5 flex justify-center gap-2'>
      <input type="file" onChange={onFileChange} />
      <Button type="button" onClick={onFileUpload}>Upload</Button>
    </div>
  );
};

export default FileUpload;