import { ILibrary } from '@/network/library/library.entity';
import { URL_IMAGE, getAllMyLibrary } from '@/network/library/library.network';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'

type Props = {
    currentImg : string;
    setCurrentImg : (url : string) => void;
}

function Library(props: Props) {
    const [libItems, setLibItems] = useState<ILibrary[]>([]);

    useEffect(() => {
        getAllMyLibrary()
            .then(resp => {
                setLibItems(resp);
            })
    }, [])
    if (!libItems || !(libItems.length))
        return <></>;

    return (
        <section className='flex flex-row flex-wrap gap-2 justify-center'>
            {libItems.map((elem, index) => {
                let urlImage = URL_IMAGE(elem.filename);
                return <section
                    className='cursor-pointer'
                    onClick={() => props.setCurrentImg(urlImage)}
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