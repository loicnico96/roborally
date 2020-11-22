const SEPARATOR = "/"
const PREFIX_LOGIN = "login"
const PREFIX_ROOM = "room"
const PREFIX_ROOM_LIST = "rooms"

export function route(...paths: string[]): string {
  return `${SEPARATOR}${paths.join(SEPARATOR)}`
}

export function withSearchParams<T extends Record<string, string>>(
  path: string,
  params: T
): string {
  const search = new URLSearchParams(params).toString()
  return search === "" ? path : `${path}?${search}`
}

export const ROUTES = {
  home: () => route(),
  login: () => route(PREFIX_LOGIN),
  room: (roomId: string) => route(PREFIX_ROOM, roomId),
  roomList: () => route(PREFIX_ROOM_LIST),
}
