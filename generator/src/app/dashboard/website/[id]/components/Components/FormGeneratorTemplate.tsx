/*
** components use for create or update a section (mode)
*/
import React, { useState, useEffect } from 'react'
import * as entity from "@/network/configTemplate/configTemplate.entity";
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import useCurrentWebsiteStore from './../store/currentWebsite.zustand.store';
import * as entityWebsite from '@/network/website/website.entity';
import { ICreateWebsiteSectionV4, createWebsiteSectionV4, updateSectionV4 } from '@/network/website/website.network';
import useTemplateGroup from '@/store/templateGroup.zustand.store';
import { cloneDeep } from 'lodash';
import FileUpload from '@/components/File/FileUpload';
import { ModalMediaSelector } from '@/components/Library';
import Image from 'next/image';
import IconLoaderSpin from '@/components/CustomIcon/IconLoaderSpin';
import { Textarea } from '@/components/ui/textarea';

interface IFormGeneratorTemplate {
  selectedTemplate: entity.ParsedTemplateVariant | undefined
  setSelectedTemplate: React.Dispatch<React.SetStateAction<entity.ParsedTemplateVariant | undefined>>
  websiteId: number;
  order: number;
  setOpen: (val: boolean) => void;
  defaultData?: any; // default json data
  mode: "create" | "edit";
}

function FormGeneratorTemplate(props: IFormGeneratorTemplate) {
  // config
  const [onLoad, setOnLoad] = useState(false);
  const templateConfig = props.selectedTemplate?.config;
  const [dataFormV4, setDataFormV4] = useState<entityWebsite.TUpdateDataV4[]>([]);
  const storeWebsite = useCurrentWebsiteStore();
  const storeTemplate = useTemplateGroup();
  // const currentSection = storeWebsite.website?.websiteSection.find(e => e.websiteSectionOrder.order === props.order);

  useEffect(() => {
    const dataUpdateSection: entityWebsite.TUpdateDataV4[] = [];

    console.log("MODE : ", props.mode)
    if (props.mode === "edit") {
      // alert(`update data : ${JSON.stringify(props.defaultData)}`)
      let currSection = storeWebsite.website?.websiteSection.find(e => e.websiteSectionOrder.order === props.order);

      if (!currSection) {
        console.log("section not found")
        return;
      }

      // get back template
      let currTemplate = storeTemplate.templateVariant.find(e => e.id === currSection?.configTemplateId);

      if (!currTemplate) {
        console.log("template not found")
        return;
      }

      let config = currTemplate.config; //entity.parseTemplateConfigStringToJSON(currTemplate.config);

      for (let i = 0; i < config.length; i++) {
        let currTemplate = config[i];

        if (currTemplate.kind === "text") {
          let elemTypo = currSection.typographies.find(e => e.order === currTemplate.order);
          if (elemTypo) {
            dataUpdateSection.push({
              kind: "typography",
              ...elemTypo
            })
          }
        } else if (currTemplate.kind === "button") {
          let elemButton = currSection.buttons.find(e => e.order === currTemplate.order);
          if (elemButton) {
            dataUpdateSection.push({
              kind: "button",
              ...elemButton
            });
          }
        } else if (currTemplate.kind === "img") {
          let elemImg = currSection.images.find(e => e.order === currTemplate.order);
          if (elemImg) {
            dataUpdateSection.push({
              kind: "img",
              ...elemImg
            })
          }
        }
      }
      setDataFormV4(dataUpdateSection);
    } else {
      // dataUpdateSection
      let dataUpdateSection: entityWebsite.TUpdateDataV4[] = [];
      // generate some default data
      for (let i = 0; templateConfig && i < templateConfig.length; i++) {
        let curr = templateConfig[i];
        if (curr.kind === "text") {
          let encodeeObjTypo: entityWebsite.IUpdateTypography = {
            kind: "typography",
            order: curr.order,
            text: "",
            size: curr.size,
            variant: "normal",
            animation: curr.animation ?? "",
            decorator: curr.decorator ?? "",
            path: curr.path ?? ""
          }
          dataUpdateSection.push(encodeeObjTypo);
        } else if (curr.kind === "button") {
          let encodeObjButton: entityWebsite.IUpdateButton = {
            kind: "button",
            order: curr.order,
            text: "",
            size: curr?.size ?? "",
            variant: curr?.variant ?? "",
            actionType: curr?.actionType ?? "",
            shape: curr?.shape ?? "",
            path: curr?.path ?? "",
            animation: curr.animation ?? ""
          }
          dataUpdateSection.push(encodeObjButton);
        }
        else if (curr.kind === "img") {
          let encodeObjImg: entityWebsite.IUpdateImg = {
            kind: "img",
            order: curr.order,
            url: "",
            filter: curr.filter,
            radius: curr.radius,
            animation: ""
          }

          dataUpdateSection.push(encodeObjImg);
        }

      }
      setDataFormV4(dataUpdateSection);
    }
  }, [])

  const submitFormCreate = () => {

    let dataSubmit: ICreateWebsiteSectionV4 = {
      data: dataFormV4,
      order: props.order,
      websiteId: props.websiteId,
      templateId: props.selectedTemplate?.id ?? -1,
    }
    setOnLoad(true);
    createWebsiteSectionV4(dataSubmit)
      .then((resp: any) => {
        storeWebsite.resetWtData(resp);
      })
      .catch(err => { console.log(err); })
      .finally(() => {
        props.setOpen(false);
        setOnLoad(false);
      })
  }

  const submitFormEdit = () => {
    // find section with order
    let currentSection = storeWebsite.website?.websiteSection.find(e => e.websiteSectionOrder.order === props.order);

    if (!currentSection) {
      console.error("website section not found with order : ", props.order);
      return;
    }

    setOnLoad(true);

    updateSectionV4({
      data: dataFormV4,//dataFormV2,
      layout: { themePaletteOrder : currentSection.themePaletteOrder },
      sectionId: currentSection.id,
    })
      .then((resp: any) => {
        // websiteStore.resetWtData(resp);
        storeWebsite.updateSection(resp);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        props.setOpen(false);
        setOnLoad(false);
      })
  }

  const submitForm = (e: any) => {
    e.preventDefault();
    if (props.mode === "create") submitFormCreate();
    else if (props.mode === "edit") submitFormEdit();
  }

  const handleChange = (event: any, index: number) => {

    let dataDup = cloneDeep(dataFormV4);
    let elem = dataDup[index];
    if (elem.kind === "typography" || elem.kind === "button") {
      const { name, value } = event.target;
      elem.text = value;
      dataDup[index] = elem;//{ ...dataDup[index], text: value };
    }
    else if (elem.kind === "img") {
      elem.url = event;
    }
    setDataFormV4(dataDup);
  }

  if (!templateConfig)
    return <></>

  return (
    <section className='flex flex-col gap-2'>
      {props.mode === "create" ?
        <Button onClick={() => props.setSelectedTemplate(undefined)}>
          Return
        </Button> : <></>
      }
      <form
        className='flex flex-col gap-2'>
        {
          templateConfig?.map((templateElem, index) => {
            let currElem = dataFormV4[index];
            if (dataFormV4.length !== templateConfig.length) {
              return <></>
            }
            // switch (currElem.kind) {
            if (currElem.kind === "typography" && templateElem.kind === "text") {
              return <section
                key={`formgeneratortemplate-typo-${templateElem.label}`}
                className='flex flex-col gap-1'>
                <p>{templateElem.label}</p>
                {templateElem.formVariant === "line" ?
                  <Input
                    name={templateElem.label}
                    onChange={(e) => handleChange(e, index)}
                    type="text"
                    value={(currElem) ? (currElem.text) : ""}
                  /> :
                  <Textarea
                    name={templateElem.label}
                    onChange={(e) => handleChange(e, index)}
                    value={(currElem) ? (currElem.text) : ""}
                  />
                }
              </section>
            }
            else if (currElem.kind === "button" && templateElem.kind === "button") {
              return <section
              key={`formgeneratortemplate-button-${templateElem.label}`}
              className='flex flex-col gap-1'>
                <p>{templateElem.label}</p>
                <Input
                  name={templateElem.label}
                  onChange={(e) => handleChange(e, index)}
                  type="text"
                  value={(currElem) ? (currElem.text) : ""}
                />
              </section>
            }
            else if (currElem.kind === "img" && templateElem.kind === "img") {
              return <section
                key={`formgeneratortemplate-img-${templateElem.label}`}
                className='flex flex-col gap-1 justify-center items-center'>
                <p>{templateElem.label}</p>
                {
                  (currElem.url && currElem.url.length) ?
                    <Image
                      className='object-contain h-[150px] w-[150px]'
                      src={currElem.url}
                      width={500}
                      height={500}
                      alt="elem"
                    />
                    :
                    <></>
                }
                <ModalMediaSelector
                  url={currElem.url}
                  setUrl={(s: string) => {
                    handleChange(s, index);
                  }}
                />
              </section>
            }
          })}
        
        <Button onClick={submitForm} className='mt-4'>{
          (onLoad) ? <IconLoaderSpin /> : <>Save</>
        }</Button>
      </form>
    </section>
  )
}

export default FormGeneratorTemplate;