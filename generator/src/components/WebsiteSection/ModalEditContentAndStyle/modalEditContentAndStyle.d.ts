import { I_TemplateElemTypography } from '@/network/website/websiteSection/templateElemTypography/templateElemTypography.entity';
import { I_TemplateElemButton } from '@/network/website/websiteSection/templateElemButton/templateElemButton.entity';
import { I_TemplateElemImage } from '@/network/website/websiteSection/templateElemImage/templateElemImage.entity';


export interface I_TemplateElemTypography_kind extends I_TemplateElemTypography { kind: "typography" }
export interface I_TemplateElemButton_kind extends I_TemplateElemButton { kind: "button" }
export interface I_TemplateElemImg_kind extends I_TemplateElemImage { kind : "img" }
export type I_TemplateGen = (I_TemplateElemTypography_kind | I_TemplateElemButton_kind | I_TemplateElemImg_kind )[];
 