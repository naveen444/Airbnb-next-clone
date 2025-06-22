import { useCountries } from "@/app/lib/getCountries";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getMyHomeData } from "@/app/actions";
import MyHomeClient from "@/app/components/MyHomeClient";

export default async function MySingleHomePage({
	params
}: { 
	params: Promise<{ id : string }>,
}) {
	const { id } = await params;
	const data = await getMyHomeData(id);
	const { getCountyByValue } = useCountries();
	const country = getCountyByValue(data?.country as string);
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	return (
		<div className="container mx-auto mt-5 mb-10">
			<MyHomeClient id={id} data={data} country={country} user={user} />
		</div>
	)
}