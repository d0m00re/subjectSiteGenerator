/*
** components use for create or update a section (mode)
*/

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react';

import * as entity from "@/network/configTemplate/configTemplate.entity";
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { ICreateWebsiteSectionV2, createWebsiteSectionV2 } from '@/network/generateWebsite/generateWebsite.network';
import useCurrentWebsiteStore from './../store/currentWebsite.zustand.store';
import parseTemplateConfigStringToJSON from '../utils/parser';
import * as entityWebsite from '@/network/website/website.entity';
import { updateSectionV2 } from '@/network/website/website.network';
import { UpdateDataV3Dico } from '@/network/website/website.entity';

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

  useEffect(() => {

    if (props.defaultData) {
      // alert(`update data : ${JSON.stringify(props.defaultData)}`)
      setDataForm(props.defaultData);
    } else {
      let defaultObjJSON: UpdateDataV3Dico = {};
      // generate some default data
      for (let i = 0; i < config.length; i++) {
        let curr = config[i];
        console.log("turn")
        console.log(curr);
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
      console.log("default data form v2")
      console.log(dataFormV2)
    }
  }, [])

  const submitFormCreate = () => {
    let dataSubmit: ICreateWebsiteSectionV2 = {
      data: dataForm,
      order: props.order,
      websiteId: props.websiteId,
      templateId: props.selectedTemplate?.id ?? -1,
      accessToken: session?.backendTokens?.accessToken ?? ""
    }

    createWebsiteSectionV2(dataSubmit)
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
                  value={(dataForm && dataForm[elem.label]) ? dataForm[elem.label] : ""}
                />
              </section>
            } else if (elem.kind === "button") {
              return <section className='flex flex-col gap-1'>
                <p>{elem.label}</p>
                <Input
                  name={elem.label}
                  onChange={handleChange}
                  type="text"
                  value={(dataForm && dataForm[elem.label]) ? dataForm[elem.label] : ""}
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