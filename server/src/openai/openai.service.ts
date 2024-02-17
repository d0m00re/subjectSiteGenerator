import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAIApi from 'openai';
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';

const customPrompts = {
    role : "user",
    content : `{
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
    "desc": "Brief description of the Main Section",
    "backgroundImage": "URL to the background image"
    },
    "subSectionFormat": {
    "kind": "subSection",
    "title": "Title of the Subsection",
    "description": "Description of the Subsection"
    },
    "instructionsDetail": "The main section requires a background image, title, and brief description. Additionally, five subsections are needed, starting with general information followed by other relevant facts.",
    "examplePrompt": {
    "title": "Example Title",
    "subject": "Example Subject"
    },
    "exampleMainSection": {
    "kind": "mainSection",
    "title": "Main Section Title",
    "desc": "Main Section Description",
    "backgroundImage": "URL to the background image"
    },
    "exampleSubSection": {
    "kind": "subSection",
    "title": "Subsection Title",
    "description": "Subsection Description"
    }
    }
    Output : json array object`
}

export interface ICreateCompletion {
    title : string;
    subject : string;
}

@Injectable()
export class OpenAIService {
  private openai: OpenAIApi;

  constructor() {
    this.openai = new OpenAIApi({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createCompletion(props : ICreateCompletion) {
   const chatCompletion = await this.openai.chat.completions.create({
    messages: [
        { role: "user", content: customPrompts.content},
        { role: "user", content: JSON.stringify(props)}],
    model: 'gpt-3.5-turbo'
   });


   // parse and return content
   let dataGenerateStringJsonArr = chatCompletion.choices[0].message.content;

   return JSON.parse(dataGenerateStringJsonArr);
  }
}