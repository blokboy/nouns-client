import React from 'react'
import {ethers} from 'ethers'
import { createClient, OperationResult } from "urql"
import { useAuctionStore } from "stores/useAuctionStore"
import { useLayoutStore } from "stores/useLayoutStore"
import NOUNS_ABI from 'ABI/nouns.json'



const Auction = () => {
  /*  initialize nounsGraph Client */
  const nounsGraph = "https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph"
  const client = createClient({ url: nounsGraph, })
  const {currentAuction, setCurrentAuction} = useAuctionStore()
  const {signer} = useLayoutStore()

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

    return { currentAuction: await data.data.auctions[0] }

  }, [client])

  React.useMemo(async () => {
    const nouns = await nounsAuctions
    const current = await nouns.currentAuction
    // setCurrentAuction(current)
    {console.log('c', current)}
    console.log('n', nounsContract)

  },[nounsAuctions])


  /*

  Initialize Nouns Contract

*/
  const nounsContractAddress = '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03'
  const nounsContract = React.useMemo(async () => {
    if (!signer) return
    try {
      return new ethers.Contract(nounsContractAddress || '', NOUNS_ABI, signer)
    } catch (err) {
      console.log('err', err)
    }
  }, [signer])



  return (
    <div>
    </div>
  )
}

export default Auction
