import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubmitButtons } from "./SubmitButtons";

export function CreateBottomBar() {
	return (
		<div className="fixed w-full bottom-0 z-10 bg-black border-t h-24">
			<div className="flex justify-between items-center mx-auto px-5 lg:px-10 h-full">
				<Button className="cursor-pointer" variant="secondary" asChild>
					<Link href="/">Cancel</Link>
				</Button>
				<SubmitButtons />
			</div>
		</div>
	)
}