import { Button, VariantType } from '@/components/Button';
import IconLoaderSpin from '@/components/CustomIcon/IconLoaderSpin';
import React from 'react'

type Props = {
    children : string;
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