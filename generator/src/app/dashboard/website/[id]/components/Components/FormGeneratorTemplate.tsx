import React, { useState } from 'react'
import { useSession } from 'next-auth/react';

import * as entity from "@/network/configTemplate/configTemplate.entity";
import { Button } from '@/components/Button';
import { Input } from '@/components/ui/input';
import { ICreateWebsiteSectionV2, createWebsiteSectionV2 } from '@/network/generateWebsite/generateWebsite.network';
import useCurrentWebsiteStore from './../store/currentWebsite.zustand.store';
import parseTemplateConfigStringToJSON from '../utils/parser';

interface IFormGeneratorTemplate {
  selectedTemplate: entity.A_I_TemplateVariant | undefined
  setSelectedTemplate: React.Dispatch<React.SetStateAction<entity.A_I_TemplateVariant | undefined>>
  websiteId : number;
  order : number;
  setOpen: (val: boolean) => void;
}

function FormGeneratorTemplate(props: IFormGeneratorTemplate) {
  // config
  const config = parseTemplateConfigStringToJSON(props.selectedTemplate?.config ?? "{}");
  const [dataForm, setDataForm] = useState<any>({});
  const { data: session } = useSession();
  const websiteStore = useCurrentWebsiteStore();

  const submitForm = (e : any) => {
    e.preventDefault();

    let dataSubmit : ICreateWebsiteSectionV2 = {
      data : dataForm,
      order : props.order,
      websiteId : props.websiteId,
      templateId : props.selectedTemplate?.id ?? -1,
      accessToken: session?.backendTokens?.accessToken ?? ""
    }

    createWebsiteSectionV2(dataSubmit)
    .then((resp : any) => {
      websiteStore.resetWtData(resp);
      props.setOpen(false);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setDataForm((old : any) => ({...old, [name] : value}));
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
                  type="text" />
              </section>
            } else if (elem.kind === "button") {
              return <section className='flex flex-col gap-1'>
                <p>{elem.label}</p>
                <Input
                  name={elem.label}
                  onChange={handleChange}
                  type="text" />
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