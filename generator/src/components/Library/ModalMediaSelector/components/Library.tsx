import { ILibrary } from '@/network/library/library.entity';
import { URL_IMAGE, getAllMyLibrary } from '@/network/library/library.network';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'

type Props = {}

function Library({ }: Props) {
    const [libItems, setLibItems] = useState<ILibrary[]>([]);

    useEffect(() => {
        getAllMyLibrary()
            .then(resp => {
                console.log("all")
                console.log(resp)
                setLibItems(resp);
            })
    }, [])
    if (!libItems || !(libItems.length))
        return <></>;
    //                {elem.filename} - {elem.path} - {elem.size}

    return (
        <section className='flex flex-row flex-wrap gap-2 justify-center'>
            {libItems.map((elem, index) => {
                return <section
                    className='cursor-pointer'
                    onClick={() => alert(`client on ${index}`)}
                    key={`library-item-${elem.id}`}>
                    <Image
                        src={URL_IMAGE(elem.filename)}
                        alt="..."
                        width={200}
                        height={140}
                    />
                </section>
            })

            }
        </section>
    )
}

export default Library;