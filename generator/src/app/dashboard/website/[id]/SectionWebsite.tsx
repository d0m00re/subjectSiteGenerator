import { ISection } from '@/network/generateWebsite.network'
import React, {useState} from 'react';
import ModalEditSection from './ModalEditSection';

type Props = ISection;

function SectionWebsite(props: Props) {
  const [modalEdit, setModalEdit] = useState(false);
  return (
    <section
        onClick={() => {if (!modalEdit) setModalEdit(true)}}
        className='flex flex-col gap-2 hover:border-2 hover:border-indigo-600 hover:cursor-pointer'>
          <h2 className='text-xl'>{props.title}</h2>
          <p>{props.description}</p>

          {
            modalEdit ?
                <ModalEditSection
                    open={modalEdit}
                    setOpen={setModalEdit}
                    section={props}
                /> : <></>
          }
        </section>
  )
}

export default SectionWebsite