import React, { useEffect, useState } from "react"
import styled, { css, keyframes } from "styled-components"

import { usePrevious } from "hooks/usePrevious"

export type DamageAnimationProps = {
  damage: number
  destroyed: boolean
  duration: number
}

type DamageAnimationContainerProps = {
  damage: number
  duration: number
}

const ANIMATION_KEYFRAMES = keyframes`
  0% { opacity: 0.0 }
  50% { opacity: 0.7 }
  100% { opacity: 0.0 }
`

function getAnimation({ damage, duration }: DamageAnimationContainerProps) {
  if (damage === 0) {
    return "paused"
  }

  return css`
    ${ANIMATION_KEYFRAMES} ${duration}s forwards
  `
}

function getAnimationColor({ damage }: DamageAnimationContainerProps) {
  return damage > 0 ? "red" : "green"
}

const DamageAnimationContainer = styled.div`
  animation: ${getAnimation};
  background-color: ${getAnimationColor};
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

const DamageAnimation = ({
  damage,
  destroyed,
  duration,
}: DamageAnimationProps) => {
  const [damageAnimation, setDamageAnimation] = useState(0)

  const previousDamage = usePrevious(damage)

  useEffect(() => {
    if (
      previousDamage !== undefined &&
      previousDamage !== damage &&
      !destroyed
    ) {
      setDamageAnimation(damage - previousDamage)
    }
  }, [damage, destroyed, previousDamage, setDamageAnimation])

  return (
    <DamageAnimationContainer
      damage={damageAnimation}
      duration={duration}
      onAnimationEnd={() => setDamageAnimation(0)}
    />
  )
}

export default DamageAnimation
