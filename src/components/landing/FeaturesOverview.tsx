import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import {
	FaGoogle,
	FaWallet,
	FaExchangeAlt,
	FaEye,
	FaShieldAlt,
} from "react-icons/fa";

export default function FeaturesOverview() {
	const features = [
		{
			Icon: FaGoogle, // Google icon
			name: "Sign Up with Google",
			description:
				"Create a crypto wallet effortlessly with just your Google Account. No complex setup, just quick and secure access.",
			href: "/",
			cta: "Learn more",
			background: "",
			className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
		},
		{
			Icon: FaWallet, // Wallet icon
			name: "Connect Your Existing Wallet",
			description:
				"Already have a wallet? Simply connect it to our platform and manage your crypto with ease.",
			href: "/",
			cta: "Learn more",
			background: <img className="absolute -right-20 -top-20 opacity-60" />,
			className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
		},
		{
			Icon: FaExchangeAlt, // Transfer icon
			name: "Transfer and Receive Crypto",
			description:
				"Send and receive cryptocurrency easily and securely, all from within our platform.",
			href: "/",
			cta: "Learn more",
			background: "",
			className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
		},
		{
			Icon: FaEye, // View balance icon
			name: "View Balance",
			description:
				"Keep track of your crypto assets in real time, with a clear and user-friendly interface.",
			href: "/",
			cta: "Learn more",
			background: <img className="absolute -right-20 -top-20 opacity-60" />,
			className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
		},
		{
			Icon: FaShieldAlt, // Security icon
			name: "Secure and Reliable",
			description:
				"Your security is our top priority. With encryption and privacy at the core, manage your crypto confidently.",
			href: "/",
			cta: "Learn more",
			background: <img className="absolute -right-20 -top-20 opacity-60" />,
			className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
		},
	];

	return (
		<div className="mt-28  max-w-[1000px] mx-auto">
			<div className="flex justify-center">
				<div className="text-xl text-center sm:text-4xl dark:text-white text-black">
					Explore the Core Features of Our Tool!
				</div>
			</div>

			<BentoGrid className="lg:grid-rows-3 mt-10">
				{features.map((feature) => (
					<BentoCard  key={feature.name} {...feature} />
				))}
			</BentoGrid>
		</div>
	);
}
