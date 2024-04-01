import CustomSelect from '@/components/atoms/Select/CustomSelect';
import { ISelectSizeElem } from '@/components/atoms/Select/CustomSelect/CustomSelect.d';
import useTemplatePalette from '@/store/templatePalette.zustand.store';
import React, { useState, useEffect } from 'react'
import { ITmpTheme } from '../SheetTheme.entity';
import CardConfigPalette from '@/components/Card/CardConfigPalette';

interface IConfigPalette {
    theme : ITmpTheme;
    setTheme :  React.Dispatch<React.SetStateAction<ITmpTheme>>;
}

function ConfigPalette(props : IConfigPalette) {
    const storeTemplatePalette = useTemplatePalette();
    const [currentKey, setCurrentKey] = useState<string>("");

    useEffect(() => {
        if (storeTemplatePalette.templateGroups && storeTemplatePalette.templateGroups.length) {
            setCurrentKey(storeTemplatePalette.templateGroups[0].name);
        }
    }, [storeTemplatePalette.templateGroups])

    if (!storeTemplatePalette.templateGroups || !storeTemplatePalette.templateGroups.length)
        return <></>;

    // encode options
    let options: ISelectSizeElem[] = storeTemplatePalette.templateGroups.map(e => {
        return {
            key: e.name,
            value: e.name,
            name: e.name
        }
    })

    // find current theme
    const currentTheme = storeTemplatePalette
        .templateGroups.find(e => e.name === currentKey)

    return (
        <section className='flex flex-col gap-2'>
            <CustomSelect
                label={currentKey}
                value={currentKey}
                options={options}
                onChange={(e) => { setCurrentKey(e) }}
            />
            {
                currentTheme ? currentTheme.themePalettes.map(palette => {
                    return <CardConfigPalette
                        key={`config-palette-${palette.id}`}
                        themePalette={palette}
                        themeSelectId={props.theme.themeId}
                        onClick={(i : number) => {props.setTheme(old => ({...old, themeId : i}))}}
                    />
                }) : <></>
            }
        </section>
    )
}

export default ConfigPalette