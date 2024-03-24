import { ILibrary } from '@/network/library/library.entity';
import { getAllMyLibrary } from '@/network/library/library.network';
import React, {useState, useEffect} from 'react'

type Props = {}

function Library({}: Props) {
    const [libItems, setLibItems] = useState<ILibrary[]>([]);
    
    useEffect(() => {
        getAllMyLibrary()
        .then(resp => {
            console.log("all")
            console.log(resp)
            setLibItems(resp);
        })
    }, [])
    
  return (
    <section>
        {libItems.map((elem, index) => {
            return <p
                className='cursor-pointer'
                onClick={() => alert(`client on ${index}`)}
                key={`library-item-${elem.id}`}>
                {elem.filename} - {elem.path} - {elem.size}
            </p>
        })

        }
    </section>
  ) 
}

export default Library;