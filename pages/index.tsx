import type { NextPage } from "next";
import Image from "next/image";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Image src="/nouns-icon.png" alt="nouns" height="100px" width="100px" />
      </motion.div>
    </div>
  );
};

export default Home;
