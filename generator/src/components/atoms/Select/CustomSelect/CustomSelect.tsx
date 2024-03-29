import React from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import * as entityCustomSelect from "./CustomSelect.d";

interface ICustomSelect {
    label: string;
    value: string;
    options: entityCustomSelect.ISelectSizeElem[];
    onChange: (size: string) => void;
}

const CustomSelect = (props: ICustomSelect) => {
    return <Select defaultValue={props.value} onValueChange={props.onChange}>
        <SelectTrigger>
            <SelectValue placeholder="select a size" />
        </SelectTrigger>
        <SelectContent
            className='flex flex-col gap-2'>
            <SelectGroup>
                <SelectLabel>{props.label}</SelectLabel>
                {
                    props.options.map(elem => <SelectItem
                        key={elem.key}
                        value={elem.value}>
                        {elem.name}
                    </SelectItem>)
                }
            </SelectGroup>
        </SelectContent>
    </Select>
}

export default CustomSelect;