import { ScrollArea } from '@/components/ui/scroll-area';
import { IThemeFont } from '@/network/theme/themeFont/themeFont.entity';
import useThemeFont from '@/store/themeFont.zustand.store';
import React from 'react'

const borderGen = (state: boolean) => (!state) ? "border-cyan-100 border hover:border-blue-500" : "border-blue-800 border-2";

interface ICardFont {
  themeFont: IThemeFont
  setThemeFont: (id: number) => void;
  isSelect: boolean;
}

function CardFont(props: ICardFont) {
  return <section
    onClick={() => props.setThemeFont(props.themeFont.id)}
    className={`flex flex-col gap-2 border p-4 rounded-xl cursor-pointer ${borderGen(props.isSelect)}`}>
    <h3 style={{ fontFamily: props.themeFont.fontName }} className={props.themeFont.fontName}>{props.themeFont.fontName}</h3>
    <p style={{ fontFamily: props.themeFont.fontName }} className={props.themeFont.fontName} >{props.themeFont.placeholder}</p>
  </section>
}

type Props = {
  currentFontId: number;
  themeFontId: number;
  setThemeFontId: (id: number) => void;
}

function ConfigPolicies(props: Props) {
  const storeThemeFont = useThemeFont();

  return (
      <section className='flex flex-col gap-2'>
        {
          storeThemeFont.themeFont.map(font => <CardFont
            themeFont={font}
            setThemeFont={props.setThemeFontId}
            isSelect={font.id === props.currentFontId}
          />)
        }
      </section>
  )
}

export default ConfigPolicies