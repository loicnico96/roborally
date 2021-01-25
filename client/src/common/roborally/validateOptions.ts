import {
  validateArray,
  validateEnum,
  validateNumber,
  validateObject,
} from "common/utils/validation"

import { BoardId, getMaxCheckpoints } from "./model/BoardData"
import { RoborallyOptions } from "./model/RoborallyOptions"

export function validateOptions(options: unknown): RoborallyOptions {
  const typedOptions = validateObject({
    checkpoints: validateNumber({
      integer: true,
      min: 1,
    }),
    boardIds: validateArray(validateEnum(BoardId), {
      minSize: 1,
      maxSize: 4,
    }),
  })(options)

  if (typedOptions.checkpoints > getMaxCheckpoints(typedOptions.boardIds)) {
    throw Error("Too many checkpoints")
  }

  return typedOptions
}
