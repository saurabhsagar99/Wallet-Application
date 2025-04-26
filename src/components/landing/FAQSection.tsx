import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
	return (
		<div className="pt-10">
			<div className="flex justify-center">
				<div className="text-xl text-center sm:text-4xl dark:text-white text-black">
					Frequently Asked Questions
				</div>
			</div>
			<div className="lg:max-w-[1050px] mx-auto pt-16">
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1">
						<AccordionTrigger>
							How can I create a crypto wallet using your platform?
						</AccordionTrigger>
						<AccordionContent>
							You can easily create a crypto wallet by signing in with your
							Google account. Our platform streamlines the process, so you can
							start using your wallet instantly without needing to set up a
							separate account.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>
							Can I connect my existing crypto wallet?
						</AccordionTrigger>
						<AccordionContent>
							Yes, our platform allows you to connect an existing crypto wallet
							if you already have one. This gives you flexibility in managing
							your funds through a wallet of your choice.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>
							How do I transfer and receive cryptocurrency?
						</AccordionTrigger>
						<AccordionContent>
							You can transfer cryptocurrency by selecting your wallet, entering
							the recipient's address, and specifying the amount. To receive
							crypto, simply share your wallet address with the sender.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-4">
						<AccordionTrigger>
							How can I view my crypto balance?
						</AccordionTrigger>
						<AccordionContent>
							You can view your crypto balance directly within your account
							dashboard. The interface shows a clear breakdown of your holdings
							across different cryptocurrencies.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-5">
						<AccordionTrigger>
							Is my wallet secure on this platform?
						</AccordionTrigger>
						<AccordionContent>
							Yes, security is our top priority. We use robust encryption and
							security measures to protect your wallet and transactions,
							ensuring that your crypto assets are safe.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	);
}
