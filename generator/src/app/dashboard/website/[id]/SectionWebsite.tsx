import { ISection } from '@/network/generateWebsite.network'
import React, { useState } from 'react';
import ModalEditSection from './ModalEditSection';
import ModalCreateSection from './ModalCreateSection';
import { Button } from '@/components/ui/button';
import { number, tuple } from 'zod';

type Props = {
  section : ISection
  index : number;
}

interface IButtonAddSection {
 // isHovered: boolean;
  show : boolean;
  index : number;
  onOpenModalAddSection : (index : number) => void;
}

interface IModalCreateSection {
  index : number;
  open : boolean;
}

const resetModalCreateSection = () : IModalCreateSection => ({
  index : -1,
  open : false
});

const ButtonAddSection = (props: IButtonAddSection) => {
  return (
    (props.show) ?
      <span className="relative flex justify-center">
        <Button onClick={() => props.onOpenModalAddSection(props.index)} className='absolute -top-5'>add section</Button>
      </span>
      : <></>

  )
}

function SectionWebsite(props: Props) {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalAddSection, setModalAddSection] = useState<IModalCreateSection>(resetModalCreateSection())
  const [isHovered, setIsHovered] = useState(true);

  const handleHover = () => {
   // setIsHovered(!isHovered);
  };

  const onOpenModalAddSection = (index : number) => {
    setModalAddSection({
      open : true,
      index : index
    })
  }

  return (
    <>
      <ButtonAddSection show={props.index === 0 } onOpenModalAddSection={onOpenModalAddSection} index={props.index} />
      <section
        onClick={() => { if (!modalEdit) setModalEdit(true) }}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        className='flex flex-col hover:border-2 p-4 hover:border-indigo-600 gap-2 hover:cursor-pointer'>
        <h2 className='text-xl'>{props.section.title}</h2>
        <p>{props.section.description}</p>

        {
          modalEdit ?
            <ModalEditSection
              open={modalEdit}
              setOpen={setModalEdit}
              section={props.section}
            /> : <></>
        }
        {
          modalAddSection.open ? 
            <ModalCreateSection
              open={modalAddSection.open}
              order={modalAddSection.index}
              websiteId={props.section.websiteId}
              setOpen={(val : boolean) => setModalAddSection(old => ({...old, open : val}))}
            /> :
            <></>
        }
      </section>
      <ButtonAddSection show onOpenModalAddSection={onOpenModalAddSection} index={props.index + 1}/>
    </>
  )
}

export default SectionWebsite