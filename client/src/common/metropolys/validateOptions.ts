import { validateObject } from "common/utils/validation"

import { MetropolysOptions } from "./model/MetropolysOptions"

export function validateOptions(options: unknown): MetropolysOptions {
  const typedOptions = validateObject({})(options)
  return typedOptions
}
