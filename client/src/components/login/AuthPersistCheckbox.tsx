import React, { useCallback } from "react"
import styled from "styled-components"

export type AuthPersistCheckboxProps = {
  isPersistEnabled: boolean
  setPersistEnabled: (enabled: boolean) => void
}

const AuthPersistCheckboxContainer = styled.div`
  align-items: center;
  display: flex;
  padding-top: 8px;
`

const AuthPersistCheckboxInput = styled.input`
  margin-right: 8px;
`

const AuthPersistCheckboxLabel = styled.span``

const AuthPersistCheckbox = ({
  isPersistEnabled,
  setPersistEnabled,
}: AuthPersistCheckboxProps) => {
  const onToggle = useCallback(() => {
    setPersistEnabled(!isPersistEnabled)
  }, [isPersistEnabled, setPersistEnabled])

  return (
    <AuthPersistCheckboxContainer>
      <AuthPersistCheckboxInput
        checked={isPersistEnabled}
        name="Remember me"
        onChange={onToggle}
        type="checkbox"
      />
      <AuthPersistCheckboxLabel>Remember me</AuthPersistCheckboxLabel>
    </AuthPersistCheckboxContainer>
  )
}

export default AuthPersistCheckbox
