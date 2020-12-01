import { TranslationConfig } from "utils/translations"

const CONFIG: TranslationConfig = {
  BoardName: {
    FloodZone: "Flood Zone",
    Island: "Island",
  },
  GameType: {
    roborally: "Roborally",
  },
  HomePage: {
    pageTitle: "Home",
    roomListLink: "Open rooms",
  },
  LoginPage: {
    pageTitle: "Sign in",
    signedIn: (_, props) => `Signed in as ${props.username}`,
    signInAnonymous: "Sign in as guest",
  },
  PageHeader: {
    signIn: "Sign in",
    signOut: "Sign out",
    userNamePrompt: "Choose your user name",
    userNameTooltip: "Click to change user name",
  },
  RoomListPage: {
    createRoomButton: "Create room",
    pageTitle: "Sign in",
    roomOptions: (t, options) =>
      `${t.RoomOptions("boardLabel")} ${t.BoardName(options.boardId)}`,
    roomPlayers: (_, playerNames) => `Players: ${playerNames.join(", ")}`,
    roomTitle: (t, room) => t.RoomPage("pageTitle", room),
  },
  RoomOptions: {
    boardLabel: "Board:",
    title: "Options",
  },
  RoomPage: {
    closeRoomButton: "Close room",
    enterRoomButton: "Enter room",
    leaveRoomButton: "Leave room",
    pageTitle: (t, room) =>
      `${t.GameType(room.game)} - ${t.RoomStatus(room.status)}`.toUpperCase(),
    startGameButton: "Start game",
  },
  RoomStatus: {
    finished: "Finished",
    ongoing: "Ongoing",
    opened: "Open",
  },
}

export default CONFIG
