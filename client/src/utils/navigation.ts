const separator = "/"
const route = (...paths: string[]): string =>
  `${separator}${paths.join(separator)}`

const PREFIX_ROOM = "room"
const PREFIX_ROOM_LIST = "rooms"

export const ROUTES = {
  home: () => route(),
  room: (roomId: string) => route(PREFIX_ROOM, roomId),
  roomList: () => route(PREFIX_ROOM_LIST),
}
