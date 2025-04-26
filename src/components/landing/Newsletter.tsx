"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function Newsletter() {
	const placeholders = [
		"What's the first rule of Fight Club?",
		"What’s the current price of Ethereum?",
		"Follow SmoggyOwO on github ;)",
		"Securely manage your crypto with just a Google account",
		"Ready to explore the crypto world?",
	];

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
	};
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("submitted");
	};
	return (
		<div className="h-[13rem] md:h-[20rem] flex flex-col justify-center  items-center">
			<h2 className="mb-10 sm:mb-16 text-xl text-center sm:text-4xl dark:text-white text-black">
				Sign up for our newsletter
			</h2>
			<PlaceholdersAndVanishInput
				placeholders={placeholders}
				onChange={handleChange}
				onSubmit={onSubmit}
			/>
		</div>
	);
}
