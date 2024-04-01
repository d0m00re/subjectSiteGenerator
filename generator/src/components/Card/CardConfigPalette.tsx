import React, { useState, useEffect } from 'react'
import { IThemePalette } from '@/network/templettePalette/templatePalette.entity';

type TCardConfigPalette = {
    themePalette: IThemePalette;
    onClick : (i : number) => void;
    themeSelectId : number;
}

const orderKey = [
    "aa",
    "bb",
    "cc",
    "dd"
];

const borderGen = (state : boolean) => (!state) ? "border-cyan-100 border hover:border-blue-500" : "border-blue-800 border-2"; 

function CardConfigPalette(props: TCardConfigPalette) {  
    return <section
        onClick={() => props.onClick(props.themePalette.id)}
        className={`flex flex-row rounded-2xl h-24 ${borderGen(props.themePalette.id === props.themeSelectId)} overflow-hidden`}>

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
                                {orderKey[color.order]}
                            </span>
                        </div>
                    </div>
                </div>
            })
        }
    </section>
}

export default CardConfigPalette;