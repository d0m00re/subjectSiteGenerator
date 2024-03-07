## CMS SPEC ###
template magement 
templacde describe by a json file

###
## maybe later
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
* select it from front (group : basic, 2 typo and 1 button)


## config file exemple 
## basic title - desc
template-group : {
  kind : "basic",
  desc : "basic elements"
}

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

----
dbdiagramio

// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs
```
Table User {
  id integer [primary key]
  email string
  name string
  password string
}

Table Website {
  id integer [primary key]
  title string
  subject string
}

Table WebsiteSection {
  id integer [primary key]
}

Table WebsiteSectionOrder {
  id integer [primary key]
}

Table TemplateVariant {
  id integer [primary key]
}

Table TemplateGroup {
  id integer [primary key]
}

Table TemplateElemTypography {
  id integer [primary key]

}

Table TemplateElemButton {
  id integer [primary key]
}
/*
Table follows {
  following_user_id integer
  followed_user_id integer
  created_at timestamp 
}

Table users {
  id integer [primary key]
  username varchar
  role varchar
  created_at timestamp
}
*/
/*
Table posts {
  id integer [primary key]
  title varchar
  body text [note: 'Content of the post']
  user_id integer
  status varchar
  created_at timestamp
}
*/
//Ref: posts.user_id > users.id // many-to-one

//Ref: users.id < follows.following_user_id

//Ref: users.id < follows.followed_user_id

```