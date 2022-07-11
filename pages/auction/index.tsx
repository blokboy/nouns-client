import React from "react"
import { ethers } from "ethers"
import { createClient, OperationResult } from "urql"
import { useAuctionStore } from "stores/useAuctionStore"
import { useLayoutStore } from "stores/useLayoutStore"
import NOUNS_ABI from "ABI/nouns.json"
import { BidProps } from "typings/auction"

const Auction = () => {
  /*

    import store

   */
  const { currentAuction, setCurrentAuction, setNounsContract, nounsContract } = useAuctionStore()
  const { signer } = useLayoutStore()

  /*

     Initialize nounsGraph Client

  */
  const nounsGraph = "https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph"
  const client = createClient({ url: nounsGraph })

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

      Construct Nouns Data from the Graph

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

  /*

      Save Noun Data to Store

   */
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

  const bids = React.useMemo<BidProps[] | undefined>(() => {
    if (!currentAuction) return

    return currentAuction.bids.reduce(
      (acc: BidProps[] = [], cv: { bidder: { id: string }; amount: string; id: string }) => {
        acc.push({
          bidder: cv.bidder,
          amount: cv.amount,
          id: cv.id,
        })

        return acc
      },
      []
    )
  }, [currentAuction])

  return (
    <div className="w-full max-w-[1440px] mx-auto">
      {!!currentAuction && (
        <div>
          <div>Noun {currentAuction?.id}</div>
          <div>
            <div>Current Bid:</div>
            <div>Ξ {ethers.utils.formatEther(currentAuction.amount)}</div>
          </div>
          <div>
            <div>Auction Ends In:</div>
            <div>{currentAuction.endTime}</div>
          </div>
          {!!bids && (
            <div>
              <div>Current Bids</div>
              {bids.map((bid, i) => (
                <div key={bid.id}>
                  <div>{bid.bidder.id}</div>
                  <div>Ξ {bid.amount}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Auction
