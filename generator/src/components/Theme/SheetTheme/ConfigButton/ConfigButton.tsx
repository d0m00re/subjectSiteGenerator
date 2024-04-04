import { cloneDeep } from 'lodash';
import React from 'react'

import RenderButton from '@/components/WebsiteSection/Render/RenderButton/RenderButton';
import CustomSelect from '@/components/atoms/Select/CustomSelect';
import { ISelectSizeElem } from '@/components/atoms/Select/CustomSelect/CustomSelect.d';
import { Separator } from '@/components/ui/separator';
import { IThemeButton, IThemeButtonElem } from '@/network/website/website.entity';

import { ScrollArea } from "@/components/ui/scroll-area"
interface ICardConfigButton {
  buttonConfig: IThemeButtonElem;
  setThemeButtonElem: (data: IThemeButtonElem, index: number) => void;
  index: number;
}

let optionsVariant: ISelectSizeElem[] = [
  { key: "solid", value: "solid", name: "solid" },
  { key: "outline", value: "outline", name: "outline" }
];

let optionsShape: ISelectSizeElem[] = [
  { key: "square", value: "square", name: "square" },
  { key: "round", value: "rounded", name: "round" }
];

const CardConfigButton = (props: ICardConfigButton) => {
  return <section className='flex flex-col gap-2'>
      <Separator className="mt-2" />
      <h2 className='text-xl font-semibold'>Style {props.buttonConfig.name}</h2>
      <h5>{props.buttonConfig.shape}</h5>
      <CustomSelect
        label={"shape"}
        value={props.buttonConfig.shape}
        options={optionsShape}
        onChange={(e) => {
          let tmp = cloneDeep(props.buttonConfig);
          tmp.shape = e;
          props.setThemeButtonElem(tmp, props.index);
        }}
      />

      <h5>{props.buttonConfig.variant}</h5>
      <CustomSelect
        label={"variant"}
        value={props.buttonConfig.variant}
        options={optionsVariant}
        onChange={(e) => {
          let tmp = cloneDeep(props.buttonConfig);
          tmp.variant = e;
          props.setThemeButtonElem(tmp, props.index);
        }} />

      <h3 className="text-xl font-semibold">Preview</h3>
      <RenderButton
        text={"hoola"}
        size="medium"
        variant={(props.buttonConfig.variant !== "outline") ? "default" : "outline"}
        rounded={props.buttonConfig.shape === "rounded"}
      />
    </section>
}

type IConfigButton = {
  buttonConfig?: IThemeButton;
  setThemeButton: (themeButton: IThemeButton) => void
}

function ConfigButton(props: IConfigButton) {
  if (!props.buttonConfig)
    return <></>;

  const setThemeButtonElem = (data: IThemeButtonElem, index: number) => {
    let tmp = cloneDeep(props.buttonConfig);

    if (!tmp) return;

    tmp.themeButtonArr[index] = data;
    props.setThemeButton(tmp);
  }

  return (
    <section>
      {
        props.buttonConfig.themeButtonArr.map((elem, index) => {
          return <CardConfigButton
            buttonConfig={elem}
            index={index}
            setThemeButtonElem={setThemeButtonElem}
          />
        })
      }
    </section>
  )
}

export default ConfigButton