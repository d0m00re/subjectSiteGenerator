import React, { useState } from 'react';
import ModalEditSection from './ModalEditSection';
import ModalCreateSection from './ModalCreateSection/ModalCreateSection';
import { Button } from '@/components/ui/button';
import { I_WebsiteSection } from '@/network/generateWebsite/generateWebsite.entity';
import * as networkGenerateWeb from "@/network/generateWebsite/generateWebsite.network";
import ContainerSectionActionBar from '@/components/WebsiteSection/SectionActionBar';
import useCurrentWebsite from "./currentWebsite.zustand.store";
import { useSession } from 'next-auth/react';
import useTemplateGroup from '@/store/templateGroup.zustand.store';
import parseTemplateConfigStringToJSON from './ModalCreateSection/Components/parser';

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

interface IRenderButton {
  text : string;
}

function RenderButton(props : IRenderButton) {
  return <Button>{props.text}</Button>
}

interface IRenderTypography {
  text : string
}

function RenderTypography(props : IRenderTypography) {
  return <p>{props.text}</p>
}

function RenderWithConfig(props : {section : I_WebsiteSection}) {
  // get back config
  const templateGroupStore = useTemplateGroup();

  // find config
  let config = templateGroupStore.templateVariant.find(e => e.id === props.section.configTemplateId);

  if (config === undefined) return <p>error retrieve template variant id {props.section.id}</p>

  let configParse = parseTemplateConfigStringToJSON(config.config); //JSON.parse(config.config.replaceAll("'", '"'));

  return (<section className='flex flex-col gap-2'>
    {
      configParse.map(e => {
        if (e.kind === "text") {
          // find typo - order for the moment but later base on other things
          let elemTypo = props.section.typographies.find(typo => typo.order === e.order);
          return <RenderTypography text={elemTypo?.text ?? ""} />
        } else if (e.kind === "button") {
          let elemButton = props.section.buttons.find(but => but.order === e.order)
          return <RenderButton text={elemButton?.label ?? ""} />
        }
        return <p>unknown</p>
      })
    }
  </section>)
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

  const onSwitchWebsitePositionTop = () => {
    networkGenerateWeb.switchPosWebsiteSection({
      dir : "top",
      sectionId : props.section.id,
      accessToken :  session?.backendTokens?.accessToken ?? ""
    })
    .then(resp => {
      currentWebsite.sectionOrderSwitch(resp);
    })
    .catch((err : any) => {
      console.log(err)
    })
  }

  const onSwitchWebsitePositionBottom = () => {
    networkGenerateWeb.switchPosWebsiteSection({
      dir : "bottom",
      sectionId : props.section.id,
      accessToken :  session?.backendTokens?.accessToken ?? ""
    })
    .then(resp => {
      currentWebsite.sectionOrderSwitch(resp);
    })
    .catch((err : any) => {
      console.log(err)
    })
  }

  const onDuplicate = () => {
      console.log("onDuplicate");
      networkGenerateWeb.duplicateWebsiteSection({
        sectionId : props.section.id,
        accessToken : session?.backendTokens?.accessToken ?? ""
      })
      .then(resp => {
        currentWebsite.resetWtData(resp);
      })
      .catch(err => {
        console.log(err);
      })
  }

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
        className='flex flex-col hover:border-2 p-4 hover:border-indigo-600 gap-2 hover:cursor-pointer'>

        <ContainerSectionActionBar
            onOpenEdit = {() => {setModalEdit(true)}}
            onOpenDelete = {onDeleteSection}
            onOpenDuplicate = {onDuplicate}
            onMooveTop = {onSwitchWebsitePositionTop}
            onMooveBottom = {onSwitchWebsitePositionBottom}
        /> 
   
        <RenderWithConfig
          section={props.section}
        />

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