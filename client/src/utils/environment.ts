const { NODE_ENV } = process.env

export function isEnv(env: typeof NODE_ENV) {
  return NODE_ENV === env
}

export function hasVar(key: string): boolean {
  return key in process.env
}

export function getVar(key: string): string | undefined {
  return process.env[key]
}

export function toInt(value: unknown): number | undefined {
  switch (typeof value) {
    case "number": {
      const intValue = Math.trunc(value)
      return Number.isInteger(intValue) ? intValue : undefined
    }

    case "string": {
      const intValue = Number.parseInt(value, 10)
      return Number.isInteger(intValue) ? intValue : undefined
    }

    default:
      return undefined
  }
}
