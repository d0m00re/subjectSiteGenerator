import React from 'react'
import { Plus } from 'lucide-react';
import { Button } from '@/components/Button';

type Props = {
    onClick : () => void;
}

function ButtonCreate(props: Props) {
    return (
        <Button onClick={props.onClick}>
            <div className='flex gap-1'>
                Create
                <Plus />
            </div>
        </Button>
    )
}

export default ButtonCreate