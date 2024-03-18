import { Button } from '@/components/Button';
import React, {useState} from 'react'


//  should not be here moove that inside another repertory
interface IStyleChangeBackgroundElem {
    name : string;
    bgColor : string;
}

const stylesChangeBackgroundElem : IStyleChangeBackgroundElem[] = [
    {
        name :"white",
        bgColor : "bg-white"
    },
    {
        name : "basic",
        bgColor : "bg-orange-100"
    }, {
        name : "basic2",
        bgColor : "bg-orange-200"
    }, {
        name : "basic3",
        bgColor : "bg-orange-300"
    }
];

interface IChangeBackground {
    backgroundColor : string;
    setBackgroundColor : (newBgColor : string) => void;
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
                <section key={`bg-color-${s.name}`} onClick={() => props.setBackgroundColor(s.bgColor)} className={`p-5 ${s.bgColor} cursor-pointer ${(s.bgColor === props.backgroundColor) ? "border-4 border-indigo-500/100" : "border border-black" } rounded h-20`}>
                    <p>{s.name}</p>
                </section>)
                :
                <></>
        }
        </div>
    </section>
  )
}

export default ChangeBackground