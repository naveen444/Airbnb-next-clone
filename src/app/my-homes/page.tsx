import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import MyHomesContent from "../components/MyHomesContent";

export default async function MyHomes() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) {
		return redirect('/');
	}

	return (
		<div className="container mx-auto mt-10 mb-10 pb-10">
			<h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>

			<MyHomesContent userId={user.id} />

		</div>
	)
}