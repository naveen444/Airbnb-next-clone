import { createCategoryPage } from "@/app/actions";
import { CreateBottomBar } from "@/app/components/CreateBottomBar";
import SelectCategory from "@/app/components/SelectCategory";

export default async function StructureRoute({params}: {params: Promise<{id: string}>}) {
	const { id } = await params;

	return (
		<>
			<div className="container mx-auto mt-5 mb-5">
				<h2 className="w-full text-xl text-left sm:text-3xl font-semibold tracking-tight transition-colors">Which of these best describe your home?</h2>
			</div>
			<form action={createCategoryPage} className="pb-30">
				<input type="hidden" name="homeId" value={id} />
				<SelectCategory category="" />
				<CreateBottomBar />
			</form>
		</>
	)
}