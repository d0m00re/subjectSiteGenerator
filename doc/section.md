# section
section system allow to create and edit section
when we create one, we use the default style
when we update one we could update default style of the local section

## create

## update
```
/**
 * prepare v3 update / create
 */
interface IUpdateTypography {
    kind : "typography"
    order : number;

    text : string;
    size : string;
    variant : string;
    path : string;
    animation : string;
    decorator : string;
}

interface IUpdateButton {
    kind : "button",
    order : number;

    text : string;
    size : string;
    variant : string;
    shape : string;
    actionType : string;
    path : string;
    animation : string;
}

interface IUpdateV3 {
    data : (IUpdateTypography | IUpdateButton)[],
    sectionId : number;
}
```