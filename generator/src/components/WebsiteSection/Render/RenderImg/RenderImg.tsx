import Image from 'next/image';
import React from 'react'

type Props = {
  url: string;
  alt: string;
}

function RenderImg(props: Props) {
  return (
      <div className=" w-[400px] h-[300px] rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={props.url}
          alt="Description of the image"
          style={{
            width : "100%",
            height : "100%"
          }}
          className='object-cover'
        />
      </div>
  )
}

/*
function RenderImg(props: Props) {
  return (
    <div>
      <Image
        width={500}
        height={500}
      //  layout='fill'
        src={props.url}
        alt={props.alt}
      />
      <div className="w-75 h-100 rounded-lg overflow-hidden flex items-center justify-center">
        <Image
          src={props.url}
          alt="Description of the image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  )
}
*/

export default RenderImg