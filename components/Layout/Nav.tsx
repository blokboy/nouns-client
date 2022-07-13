import React from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

type Props = {}

const Nav = (props: Props) => {
  return (
    <div className="flex justify-center items-center w-full p-4">
      <div className="w-12 h-12 mr-4">
        <img src="/nouns-icon.png"></img>
      </div>
      <ConnectButton />
    </div>
  )
}

export default Nav
