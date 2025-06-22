import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ListingCard } from "../components/ListingCard";
import NoCardItems from "../components/NoCardItems";
import { redirect } from "next/navigation";
import MyReservationsContent from "../components/MyReservationsContent";

export default async function ReservationsPage() {
	const { getUser } = getKindeServerSession()
	const user = await getUser();
	
	if(!user) return redirect('/');

	return (
		<section className="container mx-auto mt-10 mb-10">
			<h2 className="text-3xl font-semibold tracking-tight">Your Reservations</h2>

			<MyReservationsContent userId={user.id} />
		</section>
	)
}