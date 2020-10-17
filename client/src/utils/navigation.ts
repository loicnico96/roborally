const separator = '/'
const route = (...paths: string[]): string =>
  `${separator}${paths.join(separator)}`

const ROOM_PREFIX = 'room'

export const ROUTES = {
  home: () => route(),
  room: (roomId: string) => route(ROOM_PREFIX, roomId),
}
