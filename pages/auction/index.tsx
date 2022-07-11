import React from "react"
import { ethers } from "ethers"
import { createClient, OperationResult } from "urql"
import { useAuctionStore } from "stores/useAuctionStore"
import { useLayoutStore } from "stores/useLayoutStore"
import NOUNS_ABI from "ABI/nouns.json"

const Auction = () => {
  /*

     Initialize nounsGraph Client

  */
  const nounsGraph = "https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph"
  const client = createClient({ url: nounsGraph })
  const { currentAuction, setCurrentAuction, setNounsContract, nounsContract } = useAuctionStore()
  const { signer } = useLayoutStore()

  /*

  Initialize Nouns Contract

  */
  const nounsContractAddress = "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03"
  React.useMemo(async () => {
    if (!signer) return
    try {
      setNounsContract(new ethers.Contract(nounsContractAddress || "", NOUNS_ABI, signer))
      return
    } catch (err) {
      console.log("err", err)
    }
  }, [signer])

  /*

      Get all Nouns Data from the Graph

  */
  const nounsAuctions = React.useMemo(async () => {
    try {
      if (!client) return
      const data: OperationResult<any, {}> = await client
        .query(
          `{
  auctions(orderBy: startTime, orderDirection: desc, first: 1000) {
    id
    amount
    settled
    bidder {
      id
      __typename
    }
    startTime
    endTime
    noun {
      id
      owner {
        id
        __typename
      }
      __typename
    }
    bids {
      id
      amount
      blockNumber
      blockTimestamp
      txIndex
      bidder {
        id
        __typename
      }
      __typename
    }
    __typename
  }
  }`
        )
        .toPromise()

      return { currentAuction: await data.data.auctions[0] }
    } catch (err) {
      console.log("err", err)
    }
  }, [])

  React.useMemo(async () => {
    try {
      if (!nounsAuctions) return

      const nouns = await nounsAuctions
      const current = nouns?.currentAuction
      setCurrentAuction(current)
    } catch (err) {
      console.log("err", err)
    }
  }, [nounsAuctions])

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      <div>{currentAuction?.id}</div>
    </div>
  )
}

export default Auction
