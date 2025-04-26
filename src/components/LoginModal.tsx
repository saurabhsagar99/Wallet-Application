"use client";

import {
  Modal,
  ModalBody,
  ModalTrigger,
  ModalContent,
} from "@/components/ui/animated-modal";
import { FaGoogle } from "react-icons/fa";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { handleGoogleSignIn } from "@/lib/googleSignin";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { ReactNode, useMemo } from "react";
import { auth } from "@/lib/auth";
import useCreateWallet from "@/hooks/useCreateWallet";

interface LoginModalProps {
  children: string;
  defaultOpen?: boolean;
}

export default function LoginModal({ children }: LoginModalProps) {
  function Button() {
    return (
      <div>
        {children === "Login" ? (
          <ModalTrigger className="flex relative overflow-hidden px-8 py-2.5 rounded-xl border text-black dark:text-white flex justify-center group/modal-btn hover:shadow-md transition-all duration-300 ease-in-out">
            <span className="group-hover/modal-btn:translate-x-32 text-center transition-transform duration-500 text-sm font-medium tracking-wide">
              {children}
            </span>
            <div className="-translate-x-32 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition-transform duration-500">
              <FaGoogle className="text-black" size={20} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 dark:via-gray-500/10 to-transparent group-hover/modal-btn:opacity-100 opacity-0 transition-opacity duration-500 blur-xl" />
          </ModalTrigger>
        ) : (
          <ModalTrigger className="flex relative overflow-hidden px-8 py-2.5 rounded-xl border text-black dark:text-white flex justify-center group/modal-btn hover:shadow-md transition-all duration-300 ease-in-out">
            <span className=" text-center transition-transform duration-500 text-sm font-medium tracking-wide">
              {children}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/20 dark:via-gray-500/10 to-transparent group-hover/modal-btn:opacity-100 opacity-0 transition-opacity duration-500 blur-xl" />
          </ModalTrigger>
        )}
      </div>
    );
  }

  return (
    <Modal>
      <Button />
      <ModalBody>
        <ModalContent>
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-black-400">
                Choose your preferred login method
              </p>
            </div>
            <div className="space-y-4 flex flex-col items-center justify-center">
              <button
                className="w-1/2 flex items-center justify-center py-4 px-6 rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors duration-300 font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
                onClick={() => {
                  handleGoogleSignIn();
                }}
              >
                <FaGoogle className="mr-3 text-black" size={20} />
                Continue with Google
              </button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative bg-white px-4 text-sm text-black">
                  Or
                </div>
              </div>

              <div className="wallet-adapter-button-wrapper">
                <WalletMultiButton className="!w-full !py-3 !rounded-full !bg-gradient-to-r !from-purple-500 !to-indigo-600 hover:!from-purple-600 hover:!to-indigo-700 !transition-all !duration-300 !text-base !font-medium !shadow-md hover:!shadow-lg !transform hover:!scale-105" />
              </div>
            </div>

            <p className="text-center text-gray-400 text-sm">
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
}
