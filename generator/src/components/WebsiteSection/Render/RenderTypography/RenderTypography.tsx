import { TSizeTypography } from "@/network/website/websiteSection/templateElemTypography/templateElemTypography.entity";

interface IRenderTypography {
    text : string;
    size : TSizeTypography;
  }
  
  const renderTypographyStyle = {
    size : {
      small : "text-lg",
      medium : "text-2xl",
      big : "scroll-m-20 text-4xl"
    }
  }
  
  function RenderTypography(props : IRenderTypography) {
    return <p className={`${renderTypographyStyle.size[props.size]}`}>{props.text}</p>
  }

  export default RenderTypography;