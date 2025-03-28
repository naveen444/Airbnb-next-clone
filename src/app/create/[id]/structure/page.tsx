import { createCategoryPage } from "@/app/actions";
import { CreateBottomBar } from "@/app/components/createBottomBar";
import SelectCategory from "@/app/components/SelectCategory";
import { SubmitButtons } from "@/app/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function StructureRoute({params}: {params: Promise<{id: string}>}) {
	const { id } = await params;

	return (
		<>
			<div className="w-3/5 mx-auto">
				<h2 className="text-3xl font-semibold tracking-tight transition-colors">Which of these best describe your home?</h2>
			</div>
			<form action={createCategoryPage}>
				<input type="hidden" name="homeId" value={id} />
				<SelectCategory />
				<CreateBottomBar />
			</form>
		</>
	)
}