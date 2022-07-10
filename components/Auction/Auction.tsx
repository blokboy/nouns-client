import React from 'react'
import { createClient, OperationResult } from "urql"
import { useAuctionStore } from "stores/useAuctionStore"


const Auction = () => {
  /*  initialize nounsGraph Client */
  const nounsGraph = "https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph"
  const client = createClient({ url: nounsGraph, })
  const [currentAuction, setCurrentAuction] = React.useState()

  const nounsAuctions = React.useMemo(async () => {
    const data: OperationResult<any, {}> = await client
      .query(`{
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
  }`)
      .toPromise()

    // setCurrentAuction(data.data.auctions[0])
    console.log('a', await data.data.auctions[0])
    return { currentAuction: await data.data.auctions[0] }

  }, [client])

  React.useMemo(async () => {
    const nouns = await nounsAuctions
    const current = await nouns.currentAuction
    // setCurrentAuction(current)
    {console.log('c', current)}

  },[nounsAuctions])


  return (
    <div>
    </div>
  )
}

export default Auction
