import React from 'react';
import useTemplateGroup from '@/store/templateGroup.zustand.store';
import { I_WebsiteSection, TSizeThemeSectionSpacing } from '@/network/generateWebsite/generateWebsite.entity';
import RenderTypography from '@/components/WebsiteSection/Render/RenderTypography/RenderTypography';
import RenderButton from '@/components/WebsiteSection/Render/RenderButton/RenderButton';
import { IThemePaletteElem } from '@/network/theme/themePalette/templatePalette.entity';
import RenderImg from './RenderImg/RenderImg';
import MainLayout from './MainLayout/MainLayout';
import useCurrentWebsiteStore from '@/app/dashboard/website/[id]/components/store/currentWebsite.zustand.store';

//
interface IRecordSpacing {
  margin: string;
}

const RSizeThemeSectionSpacing: Record<TSizeThemeSectionSpacing, IRecordSpacing> = {
  "none": { margin: "0px" },
  "small": { margin: "48px" },
  "medium": { margin: "80px" },
  "big": { margin: "128px" },

}
//

interface IRenderSectionWtConfig {
  section: I_WebsiteSection;
  themePalette: IThemePaletteElem;
}

function RenderSectionWtConfig(props: IRenderSectionWtConfig) {
  // get back config
  const templateGroupStore = useTemplateGroup();

  // find config
  let templateV = templateGroupStore.templateVariant.find(e => e.id === props.section.configTemplateId);
  let storeWebsite = useCurrentWebsiteStore();

  if (!storeWebsite || !storeWebsite.website) return <></>

  const currentThemePaletteElem = storeWebsite.website.themePalette.themePaletteElems[props.section.themePaletteOrder];
  /*
  const currentThemePaletteElem = props.section.themePalette.themePaletteElems[props.section.themePaletteOrder];
  console.log("current theme palette elem : ")
  console.log(currentThemePaletteElem)
  */
  if (templateV === undefined) return <p>error retrieve template variant id {props.section.id}</p>
  if (!props.section.ThemeSectionSpacing) return <></>;
  let config = templateV.config;
  let marginTop = RSizeThemeSectionSpacing[props.section.ThemeSectionSpacing.top];
  let marginBottom = RSizeThemeSectionSpacing[props.section.ThemeSectionSpacing.top];

  console.log("let s go")
  console.log(props.section)
  
  return (<MainLayout
    style={{ backgroundColor: currentThemePaletteElem.bgColor, marginBottom : marginBottom, marginTop : marginTop }}
    >
    <>
      {
        config?.map(e => {
          if (e.kind === "text") {
            // find typo - order for the moment but later base on other things
            let elemTypo = props.section.typographies.find(typo => typo.order === e.order);
            //           let themeElem = palette[props.section.]
            return <RenderTypography
              key={`renderTypo-${props.section.id}-${elemTypo?.id}`}
              color={currentThemePaletteElem.textColor}
              text={elemTypo?.text ?? ""}
              size={elemTypo?.size ?? "medium"} />
          } else if (e.kind === "button") {
            let elemButton = props.section.buttons.find(but => but.order === e.order)
            return <RenderButton
              key={`renderButton-${props.section.id}-${elemButton?.id}`}
              text={elemButton?.text ?? ""}
              size={elemButton?.size ?? "medium"}
              rounded={true}
            />
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
    </>
  </MainLayout>)
}

export default RenderSectionWtConfig;