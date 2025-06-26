import { useCountries } from "@/app/lib/getCountries";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getReservationHomeData } from "@/app/actions";
import MyReservationClient from "@/app/components/MyReservationClient";

export default async function ReservationHomePage({
	params
}: { 
	params: Promise<{ id : string }>
}) {
	const { getCountyByValue } = useCountries();
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	const { id } = await params;
	const data = await getReservationHomeData(user.id, id);
	const country = getCountyByValue(data?.country as string);

	if (!country) {
		return <div className="container mx-auto mt-5 mb-10 pb-10">
			<div className="text-center py-20">Country not found</div>
		</div>
	}

	return (
		<div className="container mx-auto mt-5 mb-10 pb-10">
			<h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
			
			<MyReservationClient id={id} data={data} country={country} user={user} />
		</div>
	)
}