import type { NextPage } from "next"
import Image from "next/image"
import { motion } from "framer-motion"
import Auction from "components/Auction/Auction"
import { useNounsAuctions } from "hooks/useNounsAuctions"

const Home: NextPage = () => {
  const { currentAuction } = useNounsAuctions()

  return (
    <div className="flex justify-center items-center h-screen">
      {(!!currentAuction && <Auction />) || (
        <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity }}>
          <Image src="/nouns-icon.png" alt="nouns" height="100px" width="100px" />
        </motion.div>
      )}
    </div>
  )
}

export default Home
