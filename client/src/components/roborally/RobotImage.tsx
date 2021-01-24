import React from "react"

import Robot0 from "assets/robots/Robot0.png"
import Robot1 from "assets/robots/Robot1.png"
import Robot2 from "assets/robots/Robot2.png"
import Robot3 from "assets/robots/Robot3.png"
import Robot4 from "assets/robots/Robot4.png"
import Robot5 from "assets/robots/Robot5.png"
import Robot6 from "assets/robots/Robot6.png"
import Robot7 from "assets/robots/Robot7.png"

export const ROBOT_IMAGES = [
  Robot0,
  Robot1,
  Robot2,
  Robot3,
  Robot4,
  Robot5,
  Robot6,
  Robot7,
]

export type RobotImageProps = React.HtmlHTMLAttributes<HTMLImageElement> & {
  playerIndex: number
}

export function getRobotImage(playerIndex: number): string {
  return ROBOT_IMAGES[playerIndex]
}

const RobotImage = ({ playerIndex, ...props }: RobotImageProps) => (
  <img src={getRobotImage(playerIndex)} {...props} />
)

export default RobotImage
