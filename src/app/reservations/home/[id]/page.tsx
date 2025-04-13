import { useCountries } from "@/app/lib/getCountries";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getReservationHomeData } from "@/app/actions";
import MyReservationClient from "@/app/components/MyReservationClient";

export default async function ReservationHomePage({
	params
}: { 
	params: Promise<{ id : string }>
}) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	const { id } = await params;
	const data = await getReservationHomeData(user.id, id);
	const { getCountyByValue } = useCountries();
	const country = getCountyByValue(data?.country as string);

	return (
		<div className="w-[75%] mx-auto mt-5 mb-10">
			<h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
			
			<MyReservationClient id={id} data={data} country={country} user={user} />
		</div>
	)
}