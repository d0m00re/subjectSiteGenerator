import CustomSelect from "@/components/atoms/Select/CustomSelect";
import { ISelectSizeElem } from "@/components/atoms/Select/CustomSelect/CustomSelect.d";
import { IThemeSectionSpacing, TSizeThemeSectionSpacing } from "@/network/generateWebsite/generateWebsite.entity";

//
let optionsSize: ISelectSizeElem[] = [
    { key: "none", value: "none", name: "none" },
    { key: "small", value: "small", name: "small"},
    { key: "medium", value: "medium", name: "medium"},
    { key: "big", value: "big", name: "big"}
  ];

let optionsHoriAlignment : ISelectSizeElem[] = [
    { key : "none", value : "none", name : "none"},
    { key : "left", value : "left", name : "left"},
    { key : "center", value : "center", name : "center"},
    { key : "right", value : "right", name : "right"},
];

type IChangeSpacing = {
    themeSpacing : IThemeSectionSpacing;
    setThemeSpacing : (data: Partial<IThemeSectionSpacing>) => void;
}

function ChangeSpacing(props: IChangeSpacing) {
    console.log("why mtf ???????")
    console.log(props.themeSpacing)
  return (
    <section className='flex flex-col gap-2'>
        <h2 className='text-xl'>change spacing</h2>
        <p>change top</p>
        <CustomSelect
            label="Change top"
            value={props.themeSpacing.top}
            options={optionsSize}
            onChange={(e : any) => {props.setThemeSpacing({top : e})}}
        />
        <p>change bottom</p>
        <CustomSelect
            label="Change bottom"
            value={props.themeSpacing.bottom}
            options={optionsSize}
            onChange={(e : any) => {props.setThemeSpacing({bottom : e})}}
        />
        <p>change alignment</p>
        <CustomSelect
            label="Change alignment"
            value={props.themeSpacing.horizontalAlign}
            options={optionsHoriAlignment}
            onChange={(e : any) => {props.setThemeSpacing({horizontalAlign : e})}}
        />
    </section>
  )
}

export default ChangeSpacing;