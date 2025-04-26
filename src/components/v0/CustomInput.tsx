import { useState } from "react";
import useGetMnemonic from "@/hooks/useMnemonic";
import { Alert, Tooltip } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";

function CustomInput() {
	const mnemonic = useGetMnemonic((state) => state.mnemonic);
	const updateMnemonic = useGetMnemonic((state) => state.updateMnemonic);
	const generateMnemonic = useGetMnemonic((state) => state.generateMnemonic);
	const [copyStatus, setCopyStatus] = useState(false);
	const [inputValue, setInputValue] = useState(mnemonic);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		updateMnemonic(e.target.value);
	};

	const onCopyText = () => {
		setCopyStatus(true);
		setTimeout(() => setCopyStatus(false), 2000);
	};

	const onRegenerate = () => {
		generateMnemonic();
		setInputValue(mnemonic);
	};

	return (
		<div className="w-full">
			<div
				className={`overflow-hidden transition-all duration-200 ease-in-out ${
					copyStatus ? "mb-4 h-12" : "h-0"
				}`}
			>
				{copyStatus && (
					<Alert
						severity="success"
						className="animate-fade-in bg-green-50 text-green-700 border rounded-xl border-green-200"
					>
						Your phrase was copied to the clipboard.
					</Alert>
				)}
			</div>
			<div className="flex w-full items-center gap-2">
				<Tooltip title={""}>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						onClick={onRegenerate}
						className="group relative p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
					>
						{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
						<span className="sr-only">Regenerate</span>
						<span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs rounded-lg px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
							Regenerate
						</span>
					</button>
				</Tooltip>
				<input
					type="text"
					placeholder="Enter your mnemonic or generate one"
					className="flex-1 text-lg px-4 py-3 bg-slate-50 text-slate-900 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none rounded-lg transition-all duration-200"
					value={inputValue}
					onChange={handleInputChange}
				/>
				<CopyToClipboard text={inputValue} onCopy={onCopyText}>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button className="group relative p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
						{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
							/>
						</svg>
						<span className="sr-only">Copy</span>
						<span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs rounded-lg px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
							Copy
						</span>
					</button>
				</CopyToClipboard>
			</div>
		</div>
	);
}

export default CustomInput;
