import { ChevronDown, ChevronUp, Copy, FilePenLine, Pencil, Trash2 } from 'lucide-react'
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
const hoverStyle = "hover:stroke-blue-800";

function SectionActionBar(props: Props) {
    return (
        <div className='flex flex-row gap-2 bg-white rounded-lg border border-gray-500 hover:border-blue-800 shadow-md p-4'>
            <div className='flex flex-row gap-2'>
                <div className='flex flex-row gap-1' onClick={props.onOpenEdit}>
                    <Pencil className={hoverStyle} />
                    <p className=' hover:text-blue-800'>Edit</p>
                </div>
                <VerticalSeparator />
                <Trash2
                    className={hoverStyle}
                    onClick={props.onOpenDelete}
                />
                <Copy
                    className={hoverStyle}
                    onClick={props.onOpenDuplicate}
                />
                <VerticalSeparator />
                <ChevronUp
                    className={hoverStyle}
                    onClick={props.onMooveTop}
                />
                <ChevronDown
                    className={hoverStyle}
                    onClick={props.onMooveBottom}
                />
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