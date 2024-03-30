import { Button } from '@/components/Button';
import React, { useState } from 'react'


//  should not be here moove that inside another repertory
interface IStyleChangeBackgroundElem {
    name: string;
    bgColor: string;
}

const stylesChangeBackgroundElem: IStyleChangeBackgroundElem[] = [
    {
        name: "white",
        bgColor: "bg-white"
    },
    {
        name: "basic",
        bgColor: "bg-orange-100"
    }, {
        name: "basic2",
        bgColor: "bg-orange-200"
    }, {
        name: "basic3",
        bgColor: "bg-orange-300"
    }
];

interface IChangeBackground {
    backgroundColor: string;
    setBackgroundColor: (newBgColor: string) => void;
}

interface ICardBackgroundColor {
    name: string;
    backgroundColor: string;
    onClick: (s: string) => void;
}

function CardBackgroundColor(props: ICardBackgroundColor) {
    return (
        <section
            key={`bg-color-${props.name}`}
            onClick={() => props.onClick(props.backgroundColor)}
            className={`p-5 ${props.backgroundColor} cursor-pointer rounded h-20`}>
            <p>{props.name}</p>
        </section>
    )
}

function ChangeBackground(props: IChangeBackground) {
    const [open, setOpen] = useState(false);

    return (
        <section>
            <div className='flex flex-color justify-between'>
                <p>Colors</p>
                <Button onClick={() => setOpen(old => !old)}>Change</Button>
            </div>
            <div className='flex flex-col gap-2'>
                {open ?
                    stylesChangeBackgroundElem.map(s =>
                        <CardBackgroundColor
                            onClick={() => {
                                props.setBackgroundColor(s.bgColor);
                                setOpen(old => !old);
                            }}
                            name={s.name}
                            backgroundColor={s.bgColor}
                        />)
                    :
                    <CardBackgroundColor
                        onClick={() => {}}
                        name={props.backgroundColor}
                        backgroundColor={props.backgroundColor}
                    />
                }
            </div>
        </section>
    )
}

export default ChangeBackground