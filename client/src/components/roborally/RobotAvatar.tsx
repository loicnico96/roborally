import React from "react"
import styled from "styled-components"

import { ReactComponent as SleepIcon } from "assets/icons/Sleep.svg"
import { PlayerId } from "common/model/GameStateBasic"
import { EVENT_DURATION_NORMAL } from "components/room/GameProvider"

import DamageAnimation from "./DamageAnimation"
import { useRoborallyPlayer } from "./hooks/useRoborallyPlayer"
import RobotImage from "./RobotImage"
import {
  getPlayerDamage,
  getPlayerDestroyed,
  getPlayerPoweredDown,
  getPlayerVirtual,
} from "./utils/getters"

const VIRTUAL_ROBOT_OPACITY = 0.7
const TRANSITION_DURATION = EVENT_DURATION_NORMAL / 1000

export type RobotAvatarProps = {
  playerId: PlayerId
  playerIndex: number
}

function getOpacity({ virtual }: { virtual: boolean }): number {
  return virtual ? VIRTUAL_ROBOT_OPACITY : 1
}

const AvatarImage = styled(RobotImage)`
  height: 100%;
  opacity: ${getOpacity};
  pointer-events: none;
  user-select: none;
  vertical-align: top;
  width: 100%;
`

const AvatarSleepIcon = styled(SleepIcon)`
  height: 60%;
  position: absolute;
  right: -20%;
  top: -20%;
  width: 60%;
`

const DestroyAnimation = styled.div`
  background-color: black;
  height: 100%;
  left: 0;
  opacity: 0.5;
  position: absolute;
  top: 0;
  width: 100%;
`

const RobotAvatar = ({ playerId, playerIndex }: RobotAvatarProps) => {
  const damage = useRoborallyPlayer(playerId, getPlayerDamage)
  const destroyed = useRoborallyPlayer(playerId, getPlayerDestroyed)
  const poweredDown = useRoborallyPlayer(playerId, getPlayerPoweredDown)
  const virtual = useRoborallyPlayer(playerId, getPlayerVirtual)

  return (
    <>
      <AvatarImage virtual={virtual} playerIndex={playerIndex} />
      {destroyed ? (
        <DestroyAnimation />
      ) : (
        <DamageAnimation damage={damage} duration={TRANSITION_DURATION} />
      )}
      {poweredDown && <AvatarSleepIcon />}
    </>
  )
}

export default RobotAvatar
