import React from 'react';
import useTemplateGroup from '@/store/templateGroup.zustand.store';
import { I_WebsiteSection } from '@/network/generateWebsite/generateWebsite.entity';
import RenderTypography from '@/components/WebsiteSection/Render/RenderTypography/RenderTypography';
import RenderButton from '@/components/WebsiteSection/Render/RenderButton/RenderButton';
import RenderImg from './RenderImg/RenderImg';

function RenderSectionWtConfig(props: { section: I_WebsiteSection }) {
  // get back config
  const templateGroupStore = useTemplateGroup();

  // find config
  let templateV = templateGroupStore.templateVariant.find(e => e.id === props.section.configTemplateId);

  if (templateV === undefined) return <p>error retrieve template variant id {props.section.id}</p>

  let config = templateV.config;

  return (<section className='flex flex-col gap-2'>
    {
      config?.map(e => {
        if (e.kind === "text") {
          // find typo - order for the moment but later base on other things
          let elemTypo = props.section.typographies.find(typo => typo.order === e.order);
          return <RenderTypography
            key={`renderTypo-${props.section.id}-${elemTypo?.id}`}
            text={elemTypo?.text ?? ""}
            size={elemTypo?.size ?? "medium"} />
        } else if (e.kind === "button") {
          let elemButton = props.section.buttons.find(but => but.order === e.order)
          return <RenderButton
            key={`renderButton-${props.section.id}-${elemButton?.id}`}
            text={elemButton?.text ?? ""}
            size={elemButton?.size ?? "medium"} />
        } else if (e.kind === "img") {
          let elemImg = props.section.images.find(img => img.order === e.order);
          if (!elemImg) return <></>
          return <RenderImg
            key={`renderImg-${props.section.id}-${elemImg?.id}`}
            url={elemImg.url}
            alt="" />
        }
        return <p>unknown</p>
      })
    }
  </section>)
}

export default RenderSectionWtConfig;