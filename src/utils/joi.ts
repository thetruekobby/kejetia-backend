import Joi, { AnySchema } from "joi"
import { capitalize } from "."

export const validate = (schema: AnySchema, payload: any) => {
  const { value: _, error } = schema.validate(payload, { abortEarly: true })
  if (!error) return null
  return capitalize(error.details?.[0]?.message?.replaceAll('"', ""))
}
