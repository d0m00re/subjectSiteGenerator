## template variant : 
define by different field
* id : pk
* name : name 
* description : description
* preview url  : url preview
* config : all the logic are here


## config exemple
```json
    [{'order':0,'kind':'img','label':'pictureOfYou', 'filter':'','radius':10,'animation':'','url':''}]

[{'order':0,'kind':'text','label':'title','formVariant':'line','text':'','size' : 'big','variant':'normal','path':'','animation' : '','decorator':''},{'order':1,'kind':'button','label':'cta','text' :'','size':'medium','variant':'solid','shape':'square','actionType':'external','path':'','animation':'unimplemented'},{'order':2,'kind':'img','label':'pictureOfYou', 'filter':'','radius':10,'animation':'','url':''}]

[{'order':0,'kind':'text','label':'title','formVariant':'line','text':'','size' : 'big','variant':'normal','path':'','animation' : '','decorator':''},{'order':1,'kind':'button','label':'cta','text' :'','size':'medium','variant':'solid','shape':'square','actionType':'external','path':'','animation':'unimplemented'}]

[{'order':0,'kind':'text','label':'title','formVariant':'line','text':'','size' : 'big','variant':'normal','path':'','animation' : '','decorator':''},{'order':1,'kind':'text','label':'description','formVariant':'multiline','text' : '','size':'medium','variant':'normal','path':'','animation':'','decorator':''}]
```

We use config for generate form on the frontend

## Possible elements : 
### Text
```json
{'order':0,'kind':'text','label':'title','text':'','size' : 'big','variant':'normal','path':'','animation' : '','decorator':'', 'formVariant' : 'line'}
```

* formVariant : line | multiline

### Button
```json
{'order':1,'kind':'button','label':'cta','text' :'','size':'medium','variant':'solid','shape':'square','actionType':'external','path':'','animation':'unimplemented'}
```

### Img
```json
{'order':2,'kind':'img','label':'pictureOfYou', 'filter':'','radius':10,'animation':'','url':''}
```

## path zod parser
`generator/src/network/configTemplate/configTemplate.entity.ts`