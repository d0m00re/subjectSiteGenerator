import React from 'react'
import cloneDeep from 'lodash/cloneDeep';
import CustomSelect from '@/components/atoms/Select/CustomSelect/CustomSelect';
import { selectSizeArray } from '@/components/atoms/Select/CustomSelect/options';
import { TSizeEnum } from '@/components/atoms/Select/CustomSelect/CustomSelect.d';
import { I_TemplateVariant_parse } from '@/network/configTemplate/configTemplate.entity';
import { I_TemplateGen } from '../ModalEditContentAndStyle/modalEditContentAndStyle';

type IStyleEditing = {
    sectionId: number;
    onClose: () => void;
    dupSection: I_TemplateGen;
    setDupSection: React.Dispatch<React.SetStateAction<I_TemplateGen | undefined>>;
    currentTemplate: I_TemplateVariant_parse
}

function StyleEditing(props: IStyleEditing) {
    return (
        <section className='flex flex-col gap-2 w-full'>
            <p>section style</p>
            {
                props.currentTemplate.config.map((templateElem, index) => {
                    let findElem = props.dupSection.find(e => e.order === templateElem.order);
                    if (templateElem.kind === "text" && findElem?.kind === "typography") {
                        return <section className='flex flex-col gap-2'>
                            <p>typography : {templateElem.label}</p>
                            <CustomSelect
                                options={selectSizeArray}
                                label={"size"}
                                value={findElem.size}
                                onChange={(size: string) => {
                                    let tmp = cloneDeep(props.dupSection);
                                    if (tmp[index].kind === "typography") {
                                        // @ts-ignore
                                        tmp[index].size = size as TSizeEnum;
                                        props.setDupSection(tmp);
                                    }
                                }}
                            />
                        </section>
                    }
                    else if (templateElem.kind === "button" && findElem?.kind === "button") {
                        return <section className='flex flex-col gap-2'>
                            <p>button : {templateElem.label}</p>
                            <CustomSelect
                                options={selectSizeArray}
                                label="size"
                                value={findElem.size}
                                onChange={(size: string) => {
                                    let tmp = cloneDeep(props.dupSection);
                                    if (tmp[index].kind === "button") {
                                        // find a way to remove the ts ignore ....
                                        // @ts-ignore
                                        tmp[index].size = size as TSizeEnum;
                                        props.setDupSection(tmp);
                                    }
                                }}
                            />
                        </section>
                    }
                    return <></>
                })
            }
        </section>
    )
}

export default StyleEditing;