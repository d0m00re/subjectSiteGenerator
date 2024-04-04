import { Button, VariantType } from '@/components/Button';
import IconLoaderSpin from '@/components/CustomIcon/IconLoaderSpin';
import { LucideIcon } from 'lucide-react';
import React from 'react'

type Props = {
    children : string | React.JSX.Element;
    onClick : () => void;
    onLoad : boolean;
    variant ?: VariantType;
}

function ButtonLoader(props: Props) {
  return (
    <Button onClick={props.onClick} variant={props.variant}>
        {
            props.onLoad ?
            <IconLoaderSpin /> :
            <>{props.children}</>
        }
    </Button>
  )
}

export default ButtonLoader;