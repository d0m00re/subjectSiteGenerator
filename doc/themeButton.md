* we want 2 button variant
* property : 
    * textColor : backgroundColor
    * backgroundColor : textColor
    * variant : "solid" | "outline"
    * shape : "square" | "rounded"

// db model
we associate ThemeButton inside website table

ThemeButtonElem {
    textColor : inherit
    backgroundColor : inherit
    variant : string | "solid" | "rounded
    shape : string 
} 

// creation step
when cwe create a website we initilize button with default elem