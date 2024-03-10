import React from 'react';
import * as entity from "@/network/configTemplate/configTemplate.entity";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface IGroupRender {
    group: entity.I_TemplateGroup,
    onClick: () => void;

    selectedTemplate : entity.A_I_TemplateVariant | undefined
    setSelectedTemplate : React.Dispatch<React.SetStateAction<entity.A_I_TemplateVariant | undefined>>
}

interface ITemplateRenderCard {
    template : entity.A_I_TemplateVariant;
    selectedTemplate : entity.A_I_TemplateVariant | undefined;
    setSelectedTemplate : React.Dispatch<React.SetStateAction<entity.A_I_TemplateVariant | undefined>>;
}

const TemplateRenderCard = (props : ITemplateRenderCard) => {
    return  (<section
            className='cursor-pointer flex flex-row gap-4 border border-slate-500 rounded p-4'
            onClick={() => {console.log("props template crash"); console.log(props.template); props.setSelectedTemplate(props.template)}}
        >
        <div className='flex flex-col gap-2 max-w-64 w-full'>
            <h2>{props.template.name}</h2>
            <p>a description about {props.template.name}</p>    
        </div>
        <div>
            img preview
        </div>
    </section>)
}

const GroupRender = (props: IGroupRender) => {
    return <AccordionItem value={`item-${props.group.id}`}>
        <AccordionTrigger>{props.group.kind}</AccordionTrigger>
        {
            props.group.templateVariant.map(template => <AccordionContent key={`grouprender-${template.id}`}>
                <TemplateRenderCard
                    template={template}
                    selectedTemplate={props.selectedTemplate}
                    setSelectedTemplate={props.setSelectedTemplate}
                />
            </AccordionContent>)
        }
    </AccordionItem>
}

interface IContainerAccordion {
    groupTemplates: entity.I_TemplateGroup[];
    selectedTemplate : entity.A_I_TemplateVariant | undefined
    setSelectedTemplate : React.Dispatch<React.SetStateAction<entity.A_I_TemplateVariant | undefined>>
}

const SelectTemplateAccordion = (props: IContainerAccordion) => {
    return (
        <Accordion type="single" collapsible className='w-full'>
            {
                props.groupTemplates.map(elem => <GroupRender
                    key={`container-accordion-${elem.id}`}
                    group={elem}
                    onClick={() => { }}
                    selectedTemplate={props.selectedTemplate}
                    setSelectedTemplate={props.setSelectedTemplate}
                />)
            }
        </Accordion>
    )
}

export default SelectTemplateAccordion;