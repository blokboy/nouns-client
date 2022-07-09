import React from "react"
import Nav from "./Nav"

type Props = {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <Nav />
      {children}
    </React.Fragment>
  )
}

export default Layout
