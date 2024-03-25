import Image from 'next/image';
import React from 'react'

type Props = {
    url : string;
    alt : string;
}

function RenderImg(props: Props) {
  return (
    <Image
        width={500}
        height={500}
        src={props.url}
        alt={props.alt}
    />
  )
}

export default RenderImg