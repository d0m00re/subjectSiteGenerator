## CMS SPEC ###
template magement 
templacde describe by a json file

###
template_engine_v : {
  version : template engine version
}

template_variant : {
  name : string;
  kind : string;
  config : {config info structure}
}
template_group : {
  kind : "hero" | "header" | "footer"
}

## create flow with user manual creation: 
* select type of template group
* then select a possible template vairnat
* modal form with different field
* send it to backend
* save it and save inside back and front
* view page

## template type : 
* gallerie
* hero section
* single image
* single text
* layout

## website
website
websiteSection
websiteSectionELem


## template table

## poc
* fichier de config basic
* 

## config file exemple 
## basic title - desc
template_variant : {
  name : string;
  kind : string;
  config : {
  {
    order : 0,
    kind : "typography",
    label : "title",
    path : ""
  }, {
    order : 1,
    kind : "typography",
    label : "description"
    path : ""
  },
   {
    order : 2,
    kind : "button",
    label : "cta",
    actionType : "externalRedirection",
    path : ""
   }
}
}


### route api : 
createTemplateEngineVersion
createTemplateGroup
createTemplateVariant

update ....

getAllTemplateVariantFromGroup
getAllTemplateGroup
get