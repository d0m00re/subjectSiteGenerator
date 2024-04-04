import { Button } from '@/components/ui/button';
import { TSizeButton } from "@/network/website/websiteSection/templateElemButton/templateElemButton.entity";

interface IRenderButton {
    text : string;
    size : TSizeButton;
    variant ?: "outline" | "default";
  } 
  
  const renderButtonStyle = {
    size : {
      small : "sm" as const,
      medium : "default" as const,
      big : "lg" as const
    }
  }
  
  function RenderButton(props : IRenderButton) {
    return <Button
      size={renderButtonStyle.size[props.size]}
      variant={props.variant ?? "default"}
      >{props.text}</Button>
  }

  export default RenderButton;