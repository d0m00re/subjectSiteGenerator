import z from "zod";
// form parser
export const TypographyValidator = z.object({
  order: z.number(),
  kind: z.literal("text"),
  label: z.string(),
  path: z.string()
});

export const ButtonValidator = z.object({
  order: z.number(),
  kind: z.literal("button"),
  label: z.string(),
  actionType: z.string(),
  path: z.string()
});

export const TemplateValidator = z.union([TypographyValidator, ButtonValidator]);
export const TemplateValidatorArray = z.array(TemplateValidator);

/**
 * 
 * @param json string with json array with ' separator
 * @returns json
 */
const parseTemplateConfigStringToJSON = (json: string) => {
  // todo : find a better way for that
  const parsedArray = JSON.parse(json.replaceAll("'", '"'));
  return TemplateValidatorArray.parse(parsedArray);
}

export default parseTemplateConfigStringToJSON;