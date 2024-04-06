import React, { useState } from 'react'
import { Button } from '@/components/Button';
import { IThemePaletteElem } from '@/network/theme/themePalette/templatePalette.entity';

interface ICardBackgroundColor {
    name: string;
    backgroundColor: string;
    textColor: string;
    setPaletteOrder: () => void;
}

function CardBackgroundColor(props: ICardBackgroundColor) {
    return (
        <section
            style={{ color: props.textColor, backgroundColor: props.backgroundColor }}
            key={`bg-color-${props.name}`}
            onClick={props.setPaletteOrder}
            className={`p-5 cursor-pointer rounded h-20`}>
            <p>{props.name}</p>
        </section>
    )
}

const textNameArr = [
    "aa", "bb", "cc", "dd"
];

interface IChangeBackground {
    setPaletteOrder: (orderIndex: number) => void;
    themePaletteOrder: number;
    palette: IThemePaletteElem[];
}

function ChangeBackground(props: IChangeBackground) {
    const [open, setOpen] = useState(false);

    let currentPalette = props.palette[props.themePaletteOrder];

    return (
        <section>
            <div className='flex flex-color justify-between pb-2'>
                <p>Colors</p>
                <Button onClick={() => setOpen(old => !old)}>Change</Button>
            </div>
            <div className='flex flex-col gap-2'>
                {open ?
                    props.palette.map((s, i) =>
                        <CardBackgroundColor
                            setPaletteOrder={() => {
                                props.setPaletteOrder(s.order);
                                setOpen(old => !old);
                            }}
                            name={textNameArr[i]}
                            textColor={s.textColor}
                            backgroundColor={s.bgColor}
                        />)
                    :
                    <CardBackgroundColor
                        setPaletteOrder={() => { }}
                        name={"current color"}
                        backgroundColor={currentPalette.bgColor}
                        textColor={currentPalette.textColor}
                    />
                }
            </div>
        </section>
    )
}

export default ChangeBackground