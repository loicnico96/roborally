import { replace, TranslationConfig } from "./types"

const CONFIG: TranslationConfig = {
  games: {
    metropolys: {
      name: "Metropolys",
    },
    roborally: {
      name: "Roborally",
    },
  },
  gameTile: {
    tooltip: "Click to show rooms",
  },
  home: {
    pageTitle: "Home",
  },
  login: {
    pageTitle: "Login",
    rememberMe: "Remember me",
    signIn: "Sign in",
    signInAnonymous: "Sign in as guest",
    signInWithGoogle: "Sign in with Google",
    signOut: "Sign out",
  },
  roborally: {
    board: {
      ArkhamAsylum: "Arkham Asylum",
      BlastFurnace: "Blast Furnace",
      CanneryRow: "Cannery Row",
      Chasm: "Chasm",
      Chess: "Chess",
      ChopShop: "Chop Shop",
      CircuitTrap: "Circuit Trap",
      Cross: "Cross",
      Exchange: "Exchange",
      FloodZone: "Flood Zone",
      GearBox: "Gear Box",
      Island: "Island",
      LaserMaze: "Laser Maze",
      MachineShop: "Machine Shop",
      Maelstrom: "Maelstrom",
      PitMaze: "Pit Maze",
      SpinZone: "Spin Zone",
      Vault: "Vault",
    },
    options: {
      boards: replace("Boards: {{boardNames}}"),
    },
  },
  room: {
    players: replace("Players: {{playerNames}}"),
    roomTitle: replace("{{gameType}} - {{roomStatus}}"),
    status: {
      finished: "Finished",
      ongoing: "Ongoing",
      opened: "Open",
    },
  },
  roomList: {
    allGames: "All games",
    createRoom: {
      label: "Create room",
      noGameSelected: "You must select a game",
      tooltip: replace("Create a room for {{gameType}}"),
    },
    noRooms: "No rooms are available.",
    pageLoading: "Loading rooms...",
    pageTitle: "Rooms",
  },
}

export default CONFIG
