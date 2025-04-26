"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSession } from "next-auth/react";
import ShinyButton from "@/components/ui/shiny-button";
import LoginButton from "@/components/LoginModal";
import HeroImage from "@public/assets/heroimage.jpg";
import HeroImage1 from "@public/assets/heroimage1.png";
import Image from "next/image";
import LoginModal from "@/components/LoginModal";
import Link from "next/link";

export default function HeroSection() {
  const { data: session, status } = useSession();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.25, 0.5], [1, 0.5, 0]);

  return (
    <div ref={containerRef} className="relative">
      <div className="z-10 flex lg:min-h-[10rem] md:min-h-[7rem] min-h-[5rem] items-center justify-center">
        <div className="mt-16 max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ShinyButton>Version 1.0 is here</ShinyButton>
            </motion.div>
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              The Crypto of Tomorrow, Today
            </motion.h1>
            <motion.p
              className="md:text-lg lg:text-xl font-medium text-center mt-5 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Connect your wallet or create one effortlessly with just your
              Google Account
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {status === "loading" ? (
                <div className="animate-pulse bg-gray-200 h-10 w-32 rounded-xl" />
              ) : status === "authenticated" ? (
                <Link href="/c/portfolio">
                  <div className="relative overflow-hidden px-8 py-2.5 rounded-xl border text-black dark:text-white justify-center group/modal-btn hover:shadow-md transition-all duration-300 ease-in-out text-center text-sm font-medium tracking-wide cursor-pointer">
                    Go to Dashboard
                  </div>
                </Link>
              ) : (
                <LoginModal>Get Started</LoginModal>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="relative mt-10 mx-auto max-w-5xl"
        style={{ opacity: imageOpacity }}
      >
        <div className="relative w-full pt-[60%] bg-gray-800 rounded-t-xl overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-2 bg-gray-700 rounded-b-lg"></div>
          <motion.div
            className="absolute inset-2 rounded-lg h-1/2 bg-white"
            style={{ scale: imageScale, paddingTop: `${(680/1020)*100}%` }}
          >
            <Image
              src={HeroImage1}
              alt="Crypto Network Visualization"
              layout="fill"
        objectFit="cover"
        priority
            />
          </motion.div>
        </div>
        <div className="h-4 bg-gray-800 rounded-b-xl"></div>
      </motion.div>
    </div>
  );
}
