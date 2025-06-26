import { useCountries } from "@/app/lib/getCountries";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getMyHomeData } from "@/app/actions";
import MyHomeClient from "@/app/components/MyHomeClient";

export default async function MySingleHomePage({
	params
}: { 
	params: Promise<{ id : string }>,
}) {
	const { getCountyByValue } = useCountries();
	const { id } = await params;
	const data = await getMyHomeData(id);
	const country = getCountyByValue(data?.country as string);
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!country) {
		return <div className="container mx-auto mt-5 mb-10">
			<div className="text-center py-20">Country not found</div>
		</div>
	}

	return (
		<div className="container mx-auto mt-5 mb-10 pb-10">
			<MyHomeClient id={id} data={data} country={country} />
		</div>
	)
}