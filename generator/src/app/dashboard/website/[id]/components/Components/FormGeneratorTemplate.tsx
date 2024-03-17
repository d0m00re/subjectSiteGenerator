/*
** components use for create or update a section (mode)
*/

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';

import * as entity from "@/network/configTemplate/configTemplate.entity";
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { ICreateWebsiteSectionV2 } from '@/network/generateWebsite/generateWebsite.network';
import useCurrentWebsiteStore from './../store/currentWebsite.zustand.store';
import parseTemplateConfigStringToJSON from '../utils/parser';
import * as entityWebsite from '@/network/website/website.entity';
import { ICreateWebsiteSectionV3, createWebsiteSectionV3, updateSectionV2 } from '@/network/website/website.network';
import { UpdateDataV3Dico } from '@/network/website/website.entity';
import useTemplateGroup from '@/store/templateGroup.zustand.store';

interface IFormGeneratorTemplate {
  selectedTemplate: entity.A_I_TemplateVariant | undefined
  setSelectedTemplate: React.Dispatch<React.SetStateAction<entity.A_I_TemplateVariant | undefined>>
  websiteId: number;
  order: number;
  setOpen: (val: boolean) => void;

  defaultData?: any; // default json data

  mode: "create" | "edit";
}

function FormGeneratorTemplate(props: IFormGeneratorTemplate) {
  // config
  const config = parseTemplateConfigStringToJSON(props.selectedTemplate?.config ?? "{}");
  const [dataForm, setDataForm] = useState<any>({});
  const [dataFormV2, setDataFormV2] = useState<UpdateDataV3Dico>({})
  const { data: session } = useSession();
  const websiteStore = useCurrentWebsiteStore();
  const templateGroup = useTemplateGroup();


  useEffect(() => {

    if (props.mode === "edit") {
      // alert(`update data : ${JSON.stringify(props.defaultData)}`)
      console.log("default data : ")
      let currSection = websiteStore.website?.websiteSection.find(e => e.websiteSectionOrder.order === props.order);

      if (!currSection) {
        console.log("section not found")
        return ;
      }

      // get back template
      let currTemplate = templateGroup.templateVariant.find(e => e.id === currSection?.configTemplateId);

      if (!currTemplate) {
        console.log("template not found")
        return ;
      }

      let templateGParse = parseTemplateConfigStringToJSON(currTemplate.config);

      console.log("section : ")
      console.log(currSection);
      console.log(templateGParse);

      const dataJsonEdit : UpdateDataV3Dico = {};

      for (let i = 0; i < templateGParse.length; i++) {
        let currTemplate = templateGParse[i];

        if (currTemplate.kind === "text") {
          //
          let elemTypo = currSection.typographies.find(e => e.order === currTemplate.order);
          if (elemTypo) {
            dataJsonEdit[currTemplate.label] = {
              kind : "typography",
              ...elemTypo
            }
          }
        
        } else if (currTemplate.kind === "button") {
          let elemButton = currSection.buttons.find(e => e.order === currTemplate.order);
          if (elemButton) {
            dataJsonEdit[currTemplate.label] = {
              kind : "button",
              ...elemButton
            }
          }
        }
      }
      console.log("data json edit")
      console.log(dataJsonEdit);
      setDataFormV2(dataJsonEdit);
  //    setDataForm(props.defaultData);
      // fix edit here
    } else {
      let defaultObjJSON: UpdateDataV3Dico = {};
      // generate some default data
      for (let i = 0; i < config.length; i++) {
        let curr = config[i];
        if (curr.kind === "text") {
          let encodeeObjTypo: entityWebsite.IUpdateV3Typography = {
            kind: "typography",
            order: curr.order,
            text: "",
            size: curr.size,
            variant: "normal",
            animation: curr.animation ?? "",
            decorator: curr.decorator ?? "",
            path: curr.path ?? ""
          }
          defaultObjJSON[curr.label] = encodeeObjTypo;
        } else if (curr.kind === "button") {
          let encodeObjButton: entityWebsite.IUpdateV3Button = {
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
          defaultObjJSON[curr.label] = encodeObjButton;
        }
      }
      setDataFormV2(defaultObjJSON);
    }
  }, [])

  const submitFormCreate = () => {
    let dataSubmit: ICreateWebsiteSectionV3 = {
      data: dataFormV2,
      order: props.order,
      websiteId: props.websiteId,
      templateId: props.selectedTemplate?.id ?? -1,
      accessToken: session?.backendTokens?.accessToken ?? ""
    }
 
    createWebsiteSectionV3(dataSubmit)
      .then((resp: any) => {
        websiteStore.resetWtData(resp);
        props.setOpen(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const submitFormEdit = () => {
    // find section with order
    let currentSection = websiteStore.website?.websiteSection.find(e => e.websiteSectionOrder.order === props.order);

    if (!currentSection) {
      console.error("website section not found with order : ", props.order);
      return;
    }

    let dataSubmit: entityWebsite.IUpdateSectionV2 = {
      data: dataForm,
      sectionId: currentSection.id,
      accessToken: session?.backendTokens?.accessToken ?? ""
    }

    updateSectionV2(dataSubmit)
      .then((resp: any) => {
        // websiteStore.resetWtData(resp);
        props.setOpen(false);
        websiteStore.updateSection(resp);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const submitForm = (e: any) => {
    console.log("final data : ")
    console.log(dataFormV2);

    e.preventDefault();

    if (props.mode === "create") {
      submitFormCreate();
    }
    else if (props.mode === "edit") {
      submitFormEdit();
    }
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setDataForm((old: any) => ({ ...old, [name]: value }));
    
    let currElem = {...dataFormV2[name]};
    if (!currElem) return ;
    currElem.text = value; 
    setDataFormV2((old : any) => ({
      ...old, [name] : currElem
    }))
  }

  return (
    <section className='flex flex-col gap-2'>
      <Button onClick={() => props.setSelectedTemplate(undefined)}>
        Return
      </Button>

      <form
        onSubmit={submitForm}
        className='flex flex-col gap-2'>
        {
          config.map(elem => {
            if (elem.kind === "text") {
              return <section className='flex flex-col gap-1'>
                <p>{elem.label}</p>
                <Input
                  name={elem.label}
                  onChange={handleChange}
                  type="text"
                  value={(dataFormV2 && dataFormV2[elem.label]) ? dataFormV2[elem.label].text : ""}
                />
              </section>
            } else if (elem.kind === "button") {
              return <section className='flex flex-col gap-1'>
                <p>{elem.label}</p>
                <Input
                  name={elem.label}
                  onChange={handleChange}
                  type="text"
                  value={(dataFormV2 && dataFormV2[elem.label]) ? dataFormV2[elem.label].text : ""}
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