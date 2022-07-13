import React from "react"
//import { useDaoStore } from "../../../../stores/useDaoStore"
import { walletSnippet } from "utils/helpers"

// pull 
const DaoMemberPill = ({ addr }: any) => {
    return (
        <div className="border border-2 border-black w-20 h-8 rounded-2xl mr-1">
            { walletSnippet(addr) }
        </div>
    )
}

const DaoCard = ({ addr }: any) => {
  return (
    <div className="my-3 flex flex-col text-center rounded-xl bg-slate-200 p-3 w-72 h-48">
        <div className="border border-2 border-black h-1/4">
            <h1>{ walletSnippet(addr)}</h1>
        </div>

        <div className="flex flex-row border border-2 border-black h-2/4 p-1">
            <DaoMemberPill addr="0xA699720418F612558E2827Bf68631686e9d1095e" />
            <DaoMemberPill />
            <DaoMemberPill />
        </div>
    </div>
  )
}

export default DaoCard