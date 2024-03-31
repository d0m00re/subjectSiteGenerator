import CustomSelect from '@/components/atoms/Select/CustomSelect';
import { ISelectSizeElem } from '@/components/atoms/Select/CustomSelect/CustomSelect.d';
import { IThemePalette } from '@/network/templettePalette/templatePalette.entity';
import useTemplatePalette from '@/store/templatePalette.zustand.store';
import React, { useState, useEffect } from 'react'

type TCardConfigPalette = {
    themePalette: IThemePalette
}

function CardConfigPalette(props: TCardConfigPalette) {
    return <section className='flex flex-row rounded-2xl h-24 border-cyan-100 border overflow-hidden'>
        {
            props.themePalette.themePaletteElems.map(color => {
                return <div
                    key={`CardConfigPalette-${color.id}`}
                    className='flex flex-grow align-bottom p-4 cursor-pointer'
                    style={{
                        backgroundColor: color.bgColor,
                        color: color.textColor
                    }}>
                    <div className='flex items-end'>
                        <div className='flex flex-row items-baseline gap-1'>
                            <div style={{ backgroundColor: color.textColor }} className={` h-2 w-2 rounded`}></div>
                            <span
                                style={{
                                    backgroundColor: color.bgColor,
                                    color: color.textColor
                                }}>
                                {color.key}
                            </span>
                        </div>
                    </div>
                </div>
            })
        }
    </section>
}

function ConfigPalette() {
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
                    return <CardConfigPalette key={`config-palette-${palette.id}`} themePalette={palette} />
                }) : <></>
            }
        </section>
    )
}

export default ConfigPalette