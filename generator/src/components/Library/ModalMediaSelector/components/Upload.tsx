import FileUpload from '@/components/File/FileUpload';
import FileUploadV2 from '@/components/File/FileUploadV2';

import React from 'react'

type Props = {}
//        <FileUpload />

function Upload({}: Props) {
  return (
    <section className='flex justify-center '>
        <FileUploadV2 />
    </section>
  )
}

export default Upload