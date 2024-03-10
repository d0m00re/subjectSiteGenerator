import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import OpenAIApi from 'openai';
import { ChatCompletion, ChatCompletionMessageParam } from 'openai/resources';
import * as prompts from "./prompt/prompt";

export interface ICreateCompletion {
    title: string;
    subject: string;
}

export type TSectionKind = "mainSection" | "subSection";

export interface ICreateWebsiteSectionElem {
    kind: TSectionKind,
    title: string;
    description: string;
    backgroundImage: string;
}

@Injectable()
export class OpenAIService {
    private openai: OpenAIApi;

    constructor() {
        this.openai = new OpenAIApi({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    // todo : add zod data control verification
    async createCompletion(props: ICreateCompletion): Promise<ICreateWebsiteSectionElem[]> {
        const chatCompletion = await this.openai.chat.completions.create({
            messages: [
                { role: "user", content: JSON.stringify(prompts.promptV1)},
                { role: "user", content: JSON.stringify(props) }],
            model: 'gpt-3.5-turbo'
        });


        // parse and return content
        let dataGenerateStringJsonArr = chatCompletion.choices[0].message.content;

        return JSON.parse(dataGenerateStringJsonArr);
    }
}