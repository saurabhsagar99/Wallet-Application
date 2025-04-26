"use client";

import NavigationBar from "@/components/NavigationBar";
import CryptoNotifications from "@/components/landing/CryptoNotifications";
import FAQSection from "@/components/landing/FAQSection";
import FeaturesOverview from "@/components/landing/FeaturesOverview";
import HeroSection from "@/components/landing/HeroSection";
import TokenOrbit from "@/components/landing/TokenOrbit";
import Newsletter from "@/components/landing/Newsletter";
import SponsorTicker from "@/components/landing/SponsorTicker";
import CreateWallet from "@/components/CreateWallet";

function FooterCredit() {
  return (
    <div className="hidden md:block fixed bottom-0 right-0 mb-6 mr-8 text-sm sm:text-base text-black dark:text-white">
      <a
        href="https://github.com/SmoggyOwO"
        target="_blank"
        rel="noopener noreferrer"
      >
        Made with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by Aditya
      </a>
    </div>
  );
}

export default function () {
  return (
    <div className="px-4 md:px-0">
      <NavigationBar />

      <section id="about">
        <HeroSection />
      </section>

      <section id="features">
        <FeaturesOverview />
      </section>

      <div className="flex flex-col items-center mt-20 w-full">
        <div className="text-xl text-center sm:text-4xl dark:text-white text-black">
          Works across all Blockchains
        </div>
        {/* <div className="grid grid-cols-2 w-full"> */}
        <div className="w-full flex flex-col justify-between max-w-[70rem] md:flex-row">
          <div className="hidden w-[500px] h-[500px] md:block">
            <TokenOrbit />
          </div>
          <div className="">
            <CryptoNotifications />
          </div>
        </div>
      </div>

      <section id="faq">
        <FAQSection />
      </section>

      <SponsorTicker />

      <section id="contact">
        <Newsletter />
      </section>
      <FooterCredit />
      <CreateWallet />
    </div>
  );
}
