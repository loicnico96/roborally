import React, { useCallback } from "react"
import styled from "styled-components"

import {
  BuildingSize,
  DistrictId,
  getBuildingSize,
  getDistrictPosition,
  isAdjacent,
} from "common/metropolys/model/constants"
import { getHighestBid } from "common/metropolys/model/MetropolysState"
import { useAuthContext } from "firestore/auth/AuthContext"
import { styledDivWithProps } from "utils/styles"

import { useMetropolysContext } from "./hooks/useMetropolysContext"
import { useMetropolysState } from "./hooks/useMetropolysState"
import MetropolysBuilding from "./MetropolysBuilding"
import MetropolysToken from "./MetropolysToken"

export type MetropolysDistrictProps = {
  district: DistrictId
}

const DISTRICT_SIZE = 40
const BUILDING_WIDTH = 24
const BUILDING_HEIGHT = {
  [BuildingSize.SMALL]: BUILDING_WIDTH * 1.0,
  [BuildingSize.MEDIUM]: BUILDING_WIDTH * 1.5,
  [BuildingSize.LARGE]: BUILDING_WIDTH * 2.0,
}

type PositionedProps = {
  h: number
  w: number
  x: number
  y: number
}

function Positioned<P>(Component: React.ComponentType<P>) {
  return styled(Component)`
    position: absolute;
    top: ${({ y }: PositionedProps) => y}%;
    left: ${({ x }: PositionedProps) => x}%;
    margin-top: -${({ h }) => h / 2}px;
    margin-left: -${({ w }) => w / 2}px;
    height: ${({ h }) => h}px;
    width: ${({ w }) => w}px;
  `
}

const BoardToken = styled(Positioned(MetropolysToken))`
  background-color: white;
  border-color: black;
  border-radius: 50%;
  border-style: solid;
  border-width: ${(props: { isSelectable: boolean; isSelected: boolean }) =>
    props.isSelected ? 3 : 1}px;
  box-sizing: border-box;
  cursor: ${props => (props.isSelectable ? "pointer" : "not-allowed")};
  font-weight: ${props => (props.isSelected ? "bold" : "normal")};
  opacity: ${props => (props.isSelectable ? 1.0 : 0.6)};
`

const BoardBuilding = Positioned(MetropolysBuilding)

const BoardDistrict = Positioned(styledDivWithProps<{
  isSelectable: boolean
  isSelected: boolean
}>()`
  align-items: center;
  background-color: white;
  border-color: black;
  border-radius: 50%;
  border-style: solid;
  border-width: ${props => (props.isSelected ? 3 : 1)}px;
  box-sizing: border-box;
  color: black;
  cursor: ${props => (props.isSelectable ? "pointer" : "not-allowed")};
  display: flex;
  font-weight: ${props => (props.isSelected ? "bold" : "normal")};
  justify-content: center;
  opacity: ${props => (props.isSelectable ? 0.8 : 0.4)};
`)

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

  return (
    <>
      {building === undefined && bid === undefined && token === undefined && (
        <BoardDistrict
          isSelectable={isSelectable}
          isSelected={isSelected}
          onClick={onClick}
          h={DISTRICT_SIZE}
          w={DISTRICT_SIZE}
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
          h={DISTRICT_SIZE}
          w={DISTRICT_SIZE}
          x={x}
          y={y}
        />
      )}
      {building !== undefined && (
        <BoardBuilding
          height={building.height}
          playerId={building.playerId}
          showHeight={false}
          h={BUILDING_HEIGHT[getBuildingSize(building.height)]}
          w={BUILDING_WIDTH}
          x={x}
          y={y}
        />
      )}
      {bid !== undefined && (
        <BoardBuilding
          height={bid.height}
          playerId={bid.playerId}
          h={BUILDING_HEIGHT[getBuildingSize(bid.height)]}
          w={BUILDING_WIDTH}
          x={x}
          y={y}
        />
      )}
    </>
  )
}

export default MetropolysDistrict
