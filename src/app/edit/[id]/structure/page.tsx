import { editCategoryPage, getMyHomeData } from "@/app/actions";
import { CreateBottomBar } from "@/app/components/CreateBottomBar";
import SelectCategory from "@/app/components/SelectCategory";

export default async function EditStructureRoute({params}: {params: Promise<{id: string}>}) {
	const { id } = await params;
	const data = await getMyHomeData(id);

	return (
		<>
			<div className="w-3/5 mx-auto">
				<h2 className="text-3xl font-semibold tracking-tight transition-colors">Which of these best describe your home?</h2>
			</div>
			<form action={editCategoryPage}>
				<input type="hidden" name="homeId" value={id} />
				<SelectCategory category={data?.categoryName as string} />
				<CreateBottomBar />
			</form>
		</>
	)
}