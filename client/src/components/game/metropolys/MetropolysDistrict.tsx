import React, { useCallback } from "react"
import styled from "styled-components"

import {
  DistrictColor,
  getDistrictColor,
  getDistrictPosition,
  isAdjacent,
} from "common/metropolys/model/constants"
import { getHighestBid } from "common/metropolys/model/MetropolysState"
import { useAuthContext } from "firestore/auth/AuthContext"

import { useMetropolysContext } from "./hooks/useMetropolysContext"
import { useMetropolysState } from "./hooks/useMetropolysState"
import MetropolysToken from "./images/MetropolysToken"
import MetropolysBuilding from "./MetropolysBuilding"
import { Positioned } from "./utils/Positioned"
import { Selectable } from "./utils/Selectable"

export type MetropolysDistrictProps = {
  district: number
}

const DISTRICT_SIZE = 40

const BoardBuilding = Positioned(MetropolysBuilding)

const BoardDistrict = styled(Selectable(Positioned("div")))`
  background-color: white;
  border-color: black;
  border-radius: 50%;
  border-style: solid;
  height: ${DISTRICT_SIZE}px;
  opacity: ${props => (props.isSelectable ? 0.8 : 0.4)};
  width: ${DISTRICT_SIZE}px;
`

const BoardToken = styled(Selectable(Positioned(MetropolysToken)))`
  background-color: white;
  border-color: black;
  border-radius: 50%;
  border-style: solid;
  height: ${DISTRICT_SIZE}px;
  opacity: ${props => (props.isSelectable ? 1.0 : 0.6)};
  width: ${DISTRICT_SIZE}px;
`

const MetropolysDistrict = ({ district }: MetropolysDistrictProps) => {
  const { building, token } = useMetropolysState(
    state => state.districts[district]
  )

  const bid = useMetropolysState(state =>
    state.bids.find(item => item.district === district)
  )

  const highestBid = useMetropolysState(getHighestBid)

  const currentPlayerId = useMetropolysState(state => state.currentPlayer)
  const { userId } = useAuthContext()
  const { selectDistrict, selectedDistrict } = useMetropolysContext()
  const [x, y] = getDistrictPosition(district)

  const isSelected = district === selectedDistrict
  const isSelectable =
    userId === currentPlayerId &&
    (highestBid === undefined || isAdjacent(district, highestBid.district))

  const onClick = useCallback(() => {
    if (isSelectable) {
      selectDistrict(district)
    }
  }, [district, isSelectable, selectDistrict])

  const colorLabel = {
    [DistrictColor.BLUE]: "Administration",
    [DistrictColor.GRAY]: "Industrial",
    [DistrictColor.GREEN]: "Lodgings",
    [DistrictColor.ORANGE]: "Park",
    [DistrictColor.RED]: "Mall",
  }[getDistrictColor(district)]

  return (
    <>
      {building === undefined && bid === undefined && token === undefined && (
        <BoardDistrict
          isSelectable={isSelectable}
          isSelected={isSelected}
          onClick={onClick}
          title={colorLabel}
          x={x}
          y={y}
        />
      )}
      {token !== undefined && (
        <BoardToken
          token={token}
          isSelectable={isSelectable}
          isSelected={isSelected}
          onClick={onClick}
          x={x}
          y={y}
        />
      )}
      {building !== undefined && (
        <BoardBuilding
          height={building.height}
          playerId={building.playerId}
          showHeight={false}
          x={x}
          y={y}
        />
      )}
      {bid !== undefined && (
        <BoardBuilding
          height={bid.height}
          playerId={bid.playerId}
          x={x}
          y={y}
        />
      )}
    </>
  )
}

export default MetropolysDistrict
