/*
** components use for create or update a section (mode)
*/

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';

import * as entity from "@/network/configTemplate/configTemplate.entity";
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import useCurrentWebsiteStore from './../store/currentWebsite.zustand.store';
import * as entityWebsite from '@/network/website/website.entity';
import { ICreateWebsiteSectionV4, createWebsiteSectionV4, updateSectionV4 } from '@/network/website/website.network';
import useTemplateGroup from '@/store/templateGroup.zustand.store';
import { cloneDeep } from 'lodash';

interface IFormGeneratorTemplate {
  selectedTemplate: entity.I_TemplateVariant_parse | undefined
  setSelectedTemplate: React.Dispatch<React.SetStateAction<entity.I_TemplateVariant_parse | undefined>>
  websiteId: number;
  order: number;
  setOpen: (val: boolean) => void;

  defaultData?: any; // default json data

  mode: "create" | "edit";
} 

function FormGeneratorTemplate(props: IFormGeneratorTemplate) {
  // config
  const templateConfig = props.selectedTemplate?.config;
  const [dataFormV4, setDataFormV4] = useState<entityWebsite.TUpdateDataV4[]>([]);
  const { data: session } = useSession();
  const storeWebsite = useCurrentWebsiteStore();
  const storeTemplate = useTemplateGroup();
  const currentSection = storeWebsite.website?.websiteSection.find(e => e.websiteSectionOrder.order === props.order);

  useEffect(() => {

    if (props.mode === "edit") {
      // alert(`update data : ${JSON.stringify(props.defaultData)}`)
      let currSection = storeWebsite.website?.websiteSection.find(e => e.websiteSectionOrder.order === props.order);

      if (!currSection) {
        console.log("section not found")
        return ;
      }

      // get back template
      let currTemplate = storeTemplate.templateVariant.find(e => e.id === currSection?.configTemplateId);

      if (!currTemplate) {
        console.log("template not found")
        return ;
      }

      let templateConfig = currTemplate.config; //entity.parseTemplateConfigStringToJSON(currTemplate.config);

      const dataUpdateSection : entityWebsite.TUpdateDataV4[] = [];

      for (let i = 0; i < templateConfig.length; i++) {
        let currTemplate = templateConfig[i];

        if (currTemplate.kind === "text") {
          //
          let elemTypo = currSection.typographies.find(e => e.order === currTemplate.order);
          if (elemTypo) {
            dataUpdateSection.push({
              kind : "typography",
              ...elemTypo
            })
          }
        
        } else if (currTemplate.kind === "button") {
          let elemButton = currSection.buttons.find(e => e.order === currTemplate.order);
          if (elemButton) {
            dataUpdateSection.push({
              kind : "button",
              ...elemButton
            });
          }
        }
      }
      setDataFormV4(dataUpdateSection);
      // fix edit here
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
      accessToken: session?.backendTokens?.accessToken ?? ""
    }
 
    createWebsiteSectionV4(dataSubmit)
      .then((resp: any) => {
        storeWebsite.resetWtData(resp);
        props.setOpen(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const submitFormEdit = () => {
    // find section with order
    let currentSection = storeWebsite.website?.websiteSection.find(e => e.websiteSectionOrder.order === props.order);

    if (!currentSection) {
      console.error("website section not found with order : ", props.order);
      return;
    }

    updateSectionV4({
      data: dataFormV4,//dataFormV2,
      layout : {},
      sectionId: currentSection.id,
      accessToken: session?.backendTokens?.accessToken ?? ""
    })
      .then((resp: any) => {
        // websiteStore.resetWtData(resp);
        props.setOpen(false);
        storeWebsite.updateSection(resp);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const submitForm = (e: any) => {
    console.log("final data : ")
    console.log(dataFormV4);

    e.preventDefault();

    if (props.mode === "create") {
      submitFormCreate();
    }
    else if (props.mode === "edit") {
      submitFormEdit();
    }
  }

  const handleChange = (event: any, index : number) => {
    const { name, value } = event.target;

    //
    let dataDup = cloneDeep(dataFormV4);
    dataDup[index] = {...dataDup[index], text : value};
    setDataFormV4(dataDup);
  }

  if (!templateConfig)
    return <></>

  return (
    <section className='flex flex-col gap-2'>
      <Button onClick={() => props.setSelectedTemplate(undefined)}>
        Return
      </Button>

      <form
        onSubmit={submitForm}
        className='flex flex-col gap-2'>
        {
          templateConfig?.map((elem, index) => {
            if (elem.kind === "text") {
              return <section className='flex flex-col gap-1'>
                <p>{elem.label}</p>
                <Input
                  name={elem.label}
                  onChange={(e) => handleChange(e, index)}
                  type="text"
                  value={(dataFormV4[index]) ? (dataFormV4[index].text) : ""}
                />
              </section>
            } else if (elem.kind === "button") {
              return <section className='flex flex-col gap-1'>
                <p>{elem.label}</p>
                <Input
                  name={elem.label}
                  onChange={(e) => handleChange(e, index)}
                  type="text"
                  value={(dataFormV4[index]) ? (dataFormV4[index].text) : ""}
                />
              </section>
            }
            return <></>
          })
        }
        <Button type="submit" className='mt-4'>Save</Button>
      </form>
    </section>
  )
}

export default FormGeneratorTemplate;