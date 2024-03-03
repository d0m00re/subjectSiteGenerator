import { ChevronDown, ChevronUp, Copy, Pencil, Trash2 } from 'lucide-react'
import React from 'react'

type Props = {
    onOpenEdit: () => void;
    onOpenDelete: () => void;
    onOpenDuplicate: () => void;
    onMooveTop: () => void;
    onMooveBottom: () => void;
}

const VerticalSeparator = () => {
    return <div style={{ width: "1px" }} className=' bg-slate-500 h-full'></div>
}

/**
 * pencil : edit
 * trash2 : delete
 * chevronUp : moove section on the top
 * chevronDown : moove section on bottom
 */
function SectionActionBar(props: Props) {
    return (
        <div className='flex flex-row gap-2 bg-cyan-300 rounded-lg border border-gray-300 shadow-md w-60 p-2'>
            <div className='flex flex-row gap-2'>
                <div className='flex flex-row gap-1' onClick={props.onOpenEdit}>
                    <Pencil />
                    Edit
                </div>
                <VerticalSeparator />
                <Trash2 onClick={props.onOpenDelete} />
                <Copy onClick={props.onOpenDuplicate}/>
                <VerticalSeparator />
                <ChevronUp onClick={props.onMooveTop} />
                <ChevronDown onClick={props.onMooveBottom} />
            </div>
        </div>
    )
}

const ContainerSectionActionBar = (props: Props) => {
    return (
        <span className='flex justify-end sticky top-2'>
            <SectionActionBar {...props} />
        </span>
    )
}

export default ContainerSectionActionBar;