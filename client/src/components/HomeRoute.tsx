import React from "react"
import { Link } from "react-router-dom"

import { useTrans } from "hooks/useTrans"
import { ROUTES } from "utils/navigation"

import PageHeader from "./PageHeader"

const HomeRoute = () => {
  const t = useTrans("HomePage")
  return (
    <div>
      <PageHeader title={t("pageTitle")} />
      <div>
        <Link to={ROUTES.roomList()}>{t("roomListLink")}</Link>
      </div>
    </div>
  )
}

export default HomeRoute
