import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { create } from "zustand";

interface MnemonicState {
  mnemonic: string;
  seeds: string[];
  index: number;
  generateMnemonic: () => void;
  generateSeed: () => void;
  updateMnemonic: (newMnemonic: string) => void;
}

const calcSeed = (mnemonic: string, index: number) => {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/501'/${index}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  return Keypair.fromSecretKey(secret).publicKey.toBase58();
};

const useGetMnemonic = create<MnemonicState>((set) => ({
  mnemonic: "",
  seeds: [],
  index: 0,
  generateMnemonic: () =>
    set(() => ({ mnemonic: generateMnemonic(), index: 0 })),
  generateSeed: () =>
    set((state) => {
      const newPublicKey = calcSeed(state.mnemonic, state.index);
      return {
        seeds: [...state.seeds, newPublicKey],
        index: state.index + 1,
      };
    }),
  updateMnemonic: (newMnemonic: string) => set({ mnemonic: newMnemonic }),
}));

export default useGetMnemonic;
