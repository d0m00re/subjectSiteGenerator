import React, { useState } from 'react';
import ModalEditSection from './ModalEditSection';
import ModalCreateSection from './ModalCreateSection';
import { Button } from '@/components/ui/button';
import { I_WebsiteSection } from '@/network/generateWebsite/generateWebsite.entity';
import * as networkGenerateWeb from "@/network/generateWebsite/generateWebsite.network";
import SectionActionBar from '@/components/WebsiteSection/SectionActionBar';
import ContainerSectionActionBar from '@/components/WebsiteSection/SectionActionBar';
import useCurrentWebsite from "./currentWebsite.zustand.store";
import { useSession } from 'next-auth/react';


type Props = { 
  section: I_WebsiteSection;
  index: number;
}

interface IButtonAddSection {
  // isHovered: boolean;
  show: boolean;
  index: number;
  onOpenModalAddSection: (index: number) => void;
}

interface IModalCreateSection {
  index: number;
  open: boolean;
}

const resetModalCreateSection = (): IModalCreateSection => ({
  index: -1,
  open: false
});

const ButtonAddSection = (props: IButtonAddSection) => {
  return (
    (props.show) ?
      <span className="relative flex justify-center">
        <Button className='absolute -top-5' onClick={() => props.onOpenModalAddSection(props.index)}>add section</Button>
      </span>
      : <></>
  )
}

function SectionWebsite(props: Props) {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalAddSection, setModalAddSection] = useState<IModalCreateSection>(resetModalCreateSection())
  const [isHovered, setIsHovered] = useState(false);
  const currentWebsite = useCurrentWebsite();
  const { data: session } = useSession();



  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const onOpenModalAddSection = (index: number) => {
    setModalAddSection({
      open: true,
      index: index
    })
  }
  
  const onDeleteSection = () => {
    networkGenerateWeb.deleteWebsiteSection({sectionId : props.section.id, accessToken : session?.backendTokens?.accessToken ?? ""})
    .then(res => {
      currentWebsite.deleteWebsiteSection(props.section.id);
    })
    .catch(err => {
      console.info("error delete website section : ", err);
    })
  }
/*
*/
  return (
    <>
      <ButtonAddSection show={props.index === 0} onOpenModalAddSection={onOpenModalAddSection} index={props.index} />
      <section
        onPointerEnter={handleHover}
        onPointerLeave={handleHover}
        style={{ height: "500px" }}
        className='flex flex-col hover:border-2 p-4 hover:border-indigo-600 gap-2 hover:cursor-pointer'>

        <ContainerSectionActionBar
            onOpenEdit = {() => {setModalEdit(true)}}
            onOpenDelete = {onDeleteSection}
            onOpenDuplicate = {() => {alert("duplicate")}}
            onMooveTop = {() => {alert("moove top")}}
            onMooveBottom = {() => {alert("moove bottom")}}
        />

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
              setOpen={(val: boolean) => {
                //alert("onclick modal add section")
                if (modalEdit === false || val === false)
                  setModalAddSection(old => ({ ...old, open: val }))
              }
              }
            /> :
            <></>
        }
      </section>
      <ButtonAddSection show onOpenModalAddSection={onOpenModalAddSection} index={props.index + 1} />
    </>
  )
}

export default SectionWebsite