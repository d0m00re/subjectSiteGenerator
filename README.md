# Website generator
* simple site maker
* create a basic page in few secondes

## Current feature - v0.1
* section v3 : allow styling
* login / register
* create website
* create / update / delete / moove section
* view website list with pagination

## feature v0.2 - next version
* website preview (public url)
* edit element style (button variant, typography size)
* section style (backgroundColor / backgroundRadiant)
* better styling
* better api

## short technical description
* website : composition of section
* template
* templateConfig
* section : 
* sectionSubElem
* sectionSubElemButton : button element
* sectionSubElemTypography : typography element
* sectionSubElemImage : image element
* sectionSubElemConfig : config element

## cookie parser guard
* when an user login, we create a cookie with this following data in it :

## login routes
* if success create a cookie with this following info inside
* cookie name : accessToken
```json
{
    "email" : "user email",
    "id" : "user id ",
    "name" : "user name"
};
```

## backend guard : jwt-cookie-parser.guard.ts
* use on route who require the user is log
```ts
import { JwtCookieParserGuard } from './jwt-cookie-parser.guard';
import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
    @Get("me")
    @UseGuards(JwtCookieParserGuard)
    async me(@Req() request: Request,  @Body() dto : dto.MeDto) {
        // request :
        console.log("me : ")
        // @ts-ignore
        let user = request?.user;
        //let data = await this.authV2Service.me({accessToken : request.cookies.accessToken});
        return user; 
    }

    // jwt guard inject inside request['user'] our data like id or email
```

## get authv2/me
```json
{
    email: "j@j.com",
    id: 12,
    name: "j@j.com"
    exp: 1711924058
​    iat: 1711060058
}
```

## Goal
generate a subWebsite with only one phrase

##################################################
## feature v0.5
* stripe paiement

## feature v0.4
* form
* animation

## feature v0.3
* add moore elements like image, link
* add theme
* api cleaning

## feature v 0.2
* add config file | configure default props and default render of elements
* add typography, button
    * add moore field on it
* create some default config
* 
* add preview url
* rework the design
* default db config loading script

## feature v 0.1
* register/login : done
* profil : nop
* generate website with gpt : not anymore later
* view website : nop

## page available
* static page
* login register
* search website
* search my website
* modal create website
* view website
* edit website

## technology
* nextjs

## feature later
* edit website with ai or custom element


probably moove the request to api because this is like that

# website generator poc 
* create an account
* generate a website with ai
* use multiple template on different section
    * for exemple
        * hero section will propose x styles

        
* 3 type of section : 
    * header
        * {name}
    * hero section
    * basic description
* global theme with different variable (token)



# todo
* mise a jours avec les nouveau field
* reflechir pour gerer le layout
* share l edition / creation modal
* impr style
* replace all email check with id

//[{'order':0,'kind':'text','label':'title','text':'','size' : 'big','variant':'normal','path':'','animation' : '','decorator':''},{'order':1,'kind':'button','label':'cta','text' :'','size':'medium','variant':'solid','shape':'square','actionType':'external','path':'','animation':'unimplemented'}]

## other toto
* hash password directly on the front end

## make a fake cdn
# base path
cdn/website

# path img website
cdn/website/{id}/{filename}.ext

store the fullpath inside db
{
    order : 0,
    filter : "",
    radius : 25,
    animation : ""
}

## file upload components
when we upload a file somewhere we create a ngallery record with image url
when we create a section we get back url and add it inside our new section


## futur rework
* create / update mecanism too messy on front-end
* control access
* entity system

## layout system reflexion
* global layout
* section layout
### monoline layout
[1, 2, 3]
[1, 2, 3, 4, 5]
a layout could have x columns
each elements could take one or multiple column

layoutLength : 5
type : row

sectionLayout : {
    start : 2, end : 3
}

### multiline layout?


#### current dev feature
* button create section rework : done
* profil page profile update with avatar icon update
* website global config management : 
    update title description, custom favicon, custom url
* rework section create ui
* rework website list ui
* improve section render
* add theme config for each website, or use default theme
    * opt 1 : propose only preconfigured theme
    * premium : use specific theme
* reintegrate ia
* add contact form components
    email, phone, message, submit
* ...