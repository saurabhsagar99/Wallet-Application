"use client"
import SparklesText from "@/components/ui/sparkles-text";
import { useModal } from "./ui/animated-modal";
import Link from "next/link";

export default function RuneIcon() {
	const { open, setOpen } = useModal();
	return (
		<Link href={"/"}>
			<div className="cursor-pointer" aria-label="RuneVault Logo" onClick={() => {
			setOpen(true);
			console.log(open);
		}}>
			<SparklesText text="RuneVault" />
		</div>
		</Link>
	);
}
