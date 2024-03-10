import React, { useState } from 'react'
import * as entity from "@/network/configTemplate/configTemplate.entity";
import { Button } from '@/components/Button';
import z from "zod";
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import useCurrentWebsite from "./../../currentWebsite.zustand.store";
import { ICreateWebsiteSectionV2, createWebsiteSectionV2 } from '@/network/generateWebsite/generateWebsite.network';

// form parser
const TypographyValidator = z.object({
  order: z.number(),
  kind: z.literal("text"),
  label: z.string(),
  path: z.string()
});

const ButtonValidator = z.object({
  order: z.number(),
  kind: z.literal("button"),
  label: z.string(),
  actionType: z.string(),
  path: z.string()
});

const TemplateValidator = z.union([TypographyValidator, ButtonValidator]);
const TemplateValidatorArray = z.array(TemplateValidator);
//

// parse json config
const parseTemplateConfigStringToJSON = (json: string) => {
  // todo : find a better way for that
  const parsedArray = JSON.parse(json.replaceAll("'", '"'));
  return TemplateValidatorArray.parse(parsedArray);
}

//<SquareChevronLeft />
interface IFormGeneratorTemplate {
  selectedTemplate: entity.A_I_TemplateVariant | undefined
  setSelectedTemplate: React.Dispatch<React.SetStateAction<entity.A_I_TemplateVariant | undefined>>

  websiteId : number;
  order : number;
}

function FormGeneratorTemplate(props: IFormGeneratorTemplate) {
  // config
  const config = parseTemplateConfigStringToJSON(props.selectedTemplate?.config ?? "{}");
  const [dataForm, setDataForm] = useState<any>({});
  const { data: session } = useSession();
  const currentWebsite = useCurrentWebsite();

  console.log("config")
  console.log(config)

  const submitForm = (e : any) => {
    e.preventDefault();
    console.log("submit form")
    console.log(dataForm);

    let dataSubmit : ICreateWebsiteSectionV2 = {
      data : dataForm,
      order : props.order,
      websiteId : props.websiteId,
      templateId : props.selectedTemplate?.id ?? -1,
      accessToken: session?.backendTokens?.accessToken ?? ""
    }

    console.log("data submit : ");
    console.log(dataSubmit);

    createWebsiteSectionV2(dataSubmit)
    .then((resp : any) => {
      console.log("success create new section with template");
      console.log(resp);
    })
    .catch(err => {
      console.log("error create new section with template");
      console.log(err);
    })
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    console.log("handle change data : ");
    console.log(event);
    setDataForm((old : any) => ({...old, [name] : value}));
  }

  return (
    <section className='flex flex-col gap-2'>
      <Button onClick={() => props.setSelectedTemplate(undefined)}>
        Return
      </Button>

      <p>
        {props.selectedTemplate?.config}
      </p>
      form generator : {props.selectedTemplate?.name}
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