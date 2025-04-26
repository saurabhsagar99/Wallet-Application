import useGetMnemonic from "@/hooks/useMnemonic";
import { useState } from "react";
import CustomInput from "@/components/v0/CustomInput";
import CustomWallet from "@/components/v0/CustomWallet";

function Wallet() {
	const [showInput, setShowInput] = useState(false);
	const [showSOL, setShowSOL] = useState(false);
	const generateMnemonic = useGetMnemonic((state) => state.generateMnemonic);
	const generateSeed = useGetMnemonic((state) => state.generateSeed);

	const createAccount = () => {
		generateMnemonic();
		setShowInput(true);
	};

	const haveMnemonic = () => {
		setShowInput(true);
	};

	const createSOL = () => {
		generateSeed();
		setShowSOL(true);
	};

	const createETH = () => {};

	return (
		<div className="min-h-screen bg-slate-900 text-white px-4 py-16">
			<div className="container mx-auto max-w-3xl mt-36">
				<div className="text-5xl sm:text-7xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text tracking-tight">
					RuneVault
				</div>
				<div className="text-xl sm:text-3xl text-center mb-14 text-slate-300">
					The Multichain Universal Vault for All Your Digital Assets
				</div>

				<div className="bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-slate-700 p-6 sm:p-8">
					{!showInput ? (
						<div className="flex flex-col sm:flex-row justify-center gap-4">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-3 transition-all duration-200 shadow-lg shadow-blue-500/20"
								onClick={createAccount}
							>
								Create Account
							</button>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-6 py-3 transition-all duration-200 shadow-lg shadow-purple-500/20"
								onClick={haveMnemonic}
							>
								Already have a mnemonic
							</button>
						</div>
					) : (
						<div className="space-y-6">
							<CustomInput />
							<div className="flex flex-col sm:flex-row justify-center gap-4">
								{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
								<button
									className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-6 py-3 transition-all duration-200 shadow-lg shadow-blue-500/20"
									onClick={createSOL}
								>
									Create SOL Wallet
								</button>
								{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
								<button
									className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg px-6 py-3 transition-all duration-200 shadow-lg shadow-purple-500/20"
									onClick={createETH}
								>
									Create ETH Wallet
								</button>
							</div>
							{showSOL && <CustomWallet wallet="SOL" />}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Wallet;
