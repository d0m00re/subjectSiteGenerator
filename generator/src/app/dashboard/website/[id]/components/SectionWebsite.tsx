import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import { I_WebsiteSection } from '@/network/generateWebsite/generateWebsite.entity';
import * as networkGenerateWeb from "@/network/generateWebsite/generateWebsite.network";

import ContainerSectionActionBar from '@/components/WebsiteSection/SectionActionBar';

import useCurrentWebsite from "./store/currentWebsite.zustand.store";
import ModalCreateSection from './modal/ModalCreateSection';
import RenderSectionWtConfig from '@/components/WebsiteSection/Render/RenderSectionWtConfig';
import ModalEditContentAndStyle from '@/components/WebsiteSection/ModalEditContentAndStyle/ModalEditContentAndStyle';

type ISectionWebsite = {
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

interface IModalEditSectionStyle {
  index: number;
  open: boolean;
}

const resetModalCreateSection = (): IModalCreateSection => ({
  index: -1,
  open: false
});

const resetModalSectionEditStyle = (): IModalEditSectionStyle => ({
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

function SectionWebsite(props: ISectionWebsite) {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalEditSectionStyle, setModalEditSectionStyle] = useState<IModalEditSectionStyle>(resetModalSectionEditStyle());
  const [modalAddSection, setModalAddSection] = useState<IModalCreateSection>(resetModalCreateSection())
  const [isHovered, setIsHovered] = useState(false);
  const currentWebsite = useCurrentWebsite();

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
    networkGenerateWeb.deleteWebsiteSection({
      sectionId: props.section.id
    })
      .then(res => {
        currentWebsite.deleteWebsiteSection(props.section.id);
      })
      .catch(err => {
        console.info("error delete website section : ", err);
      })
  }

  const onSwitchWebsitePositionTop = () => {
    networkGenerateWeb.switchPosWebsiteSection({
      dir: "top",
      sectionId: props.section.id
    })
      .then(resp => {
        currentWebsite.sectionOrderSwitch(resp);
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const onSwitchWebsitePositionBottom = () => {
    networkGenerateWeb.switchPosWebsiteSection({
      dir: "bottom",
      sectionId: props.section.id
    })
      .then(resp => {
        currentWebsite.sectionOrderSwitch(resp);
      })
      .catch((err: any) => {
        console.log(err)
      })
  }

  const onDuplicate = () => {
    networkGenerateWeb.duplicateWebsiteSection({
      sectionId: props.section.id
    })
      .then(resp => {
        currentWebsite.resetWtData(resp);
      })
      .catch(err => {
        console.log(err);
      })
  }

  console.log("section palette : ");
  console.log(props.section.themePaletteOrder)

  return (
      <>
        <ButtonAddSection
          show={props.index === 0}
          onOpenModalAddSection={onOpenModalAddSection}
          index={props.index}
        />
        <section
          onPointerEnter={handleHover}
          onPointerLeave={handleHover}
          className={`w-full flex flex-col hover:border-2 p-4 hover:border-indigo-600 gap-2 hover:cursor-pointer ${props.section.backgroundColor}`}>
 
          <ContainerSectionActionBar
            onOpenEdit={() => { setModalEdit(true) }}
            onOpenDelete={onDeleteSection}
            onOpenDuplicate={onDuplicate}
            onMooveTop={onSwitchWebsitePositionTop}
            onMooveBottom={onSwitchWebsitePositionBottom}
          />

          <RenderSectionWtConfig
            section={props.section}
          />

          {modalEdit ?
            <ModalEditContentAndStyle
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