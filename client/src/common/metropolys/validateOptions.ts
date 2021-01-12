import { MetropolysOptions } from "common/metropolys/MetropolysSettings"
import { validateObject } from "common/utils/validation"

export function validateOptions(options: unknown): MetropolysOptions {
  const typedOptions = validateObject({})(options)
  return typedOptions
}
