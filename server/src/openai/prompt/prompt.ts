const promptV1 = {
    role: "user",
    content: `{
    "title": "Website Section Creation",
    "subject": "Website Section Generation",
    "description": "As an agent capable of website creation, you're tasked with generating sections for a given topic. Each submission includes a title and subject. The structure follows:",
    "dataFormat": {
    "title": "Title of the Website",
    "subject": "Subject of the Website"
    },
    "mainSectionFormat": {
    "kind": "mainSection",
    "title": "Title of the Main Section",
    "description": "Brief description of the Main Section",
    "backgroundImage": "URL to the background image"
    },
    "subSectionFormat": {
    "kind": "subSection",
    "title": "Title of the Subsection",
    "description": "Description of the Subsection",
    "backgroundImage": "URL to the background image"
    },
    "instructionsDetail": "The main section requires a background image, title, and brief description. Additionally, five subsections are needed, starting with general information followed by other relevant facts.",
    "examplePrompt": {
    "title": "Example Title",
    "subject": "Example Subject",
    "backgroundImage": "URL to the background image"
    },
    "exampleMainSection": {
    "kind": "mainSection",
    "title": "Main Section Title",
    "description": "Main Section Description",
    "backgroundImage": "URL to the background image"
    },
    "exampleSubSection": {
    "kind": "subSection",
    "title": "Subsection Title",
    "description": "Subsection Description",
    "backgroundImage": "URL to the background image"
}
    }
    Output : json array object`
}

export {
    promptV1
}