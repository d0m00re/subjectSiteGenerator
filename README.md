# Website generator
* cms for generate a website with ia or not and publish it

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