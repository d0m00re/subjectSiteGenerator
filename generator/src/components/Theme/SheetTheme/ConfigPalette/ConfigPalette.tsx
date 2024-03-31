import CustomSelect from '@/components/atoms/Select/CustomSelect';
import { ISelectSizeElem } from '@/components/atoms/Select/CustomSelect/CustomSelect.d';
import useTemplatePalette from '@/store/templatePalette.zustand.store';
import React, {useState, useEffect } from 'react'

type Props = {}

function ConfigPalette({}: Props) {
    const storeTemplatePalette = useTemplatePalette();
    const [currentKey, setCurrentKey] = useState<string>("");

    useEffect(() => {
        if (storeTemplatePalette.templateGroups && storeTemplatePalette.templateGroups.length)
        {
            setCurrentKey(storeTemplatePalette.templateGroups[0].name);
        }
    }, [storeTemplatePalette.templateGroups])

    if (!storeTemplatePalette.templateGroups || !storeTemplatePalette.templateGroups.length)
        return <></>;

        // encode options
    let options : ISelectSizeElem[] = storeTemplatePalette.templateGroups.map(e => {
        return {
            key : e.name,
            value : e.name,
            name : e.name
        }
    })

    
  return (
    <section>
        <CustomSelect
            label={currentKey}
            value={currentKey}
            options={options}
            onChange={(e) => {setCurrentKey(e)}}
        />
        {
            storeTemplatePalette.templateGroups.map(e => {
                return <p>{e.name} : {e.themePalettes.length}</p>
            })
        }
    </section>
  )
}

export default ConfigPalette