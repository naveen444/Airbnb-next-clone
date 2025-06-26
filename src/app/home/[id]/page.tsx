import prisma from "@/app/lib/db"
import { useCountries } from "@/app/lib/getCountries";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import CategoryShowcase from "@/app/components/CategoryShowcase";
import HomeMap from "@/app/components/HomeMap";
import { SelectCalendar } from "@/app/components/SelectCalendar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createReservation } from "@/app/actions";
import { ReservationsSubmitButton } from "@/app/components/SubmitButtons";

async function getData(homeId: string) {
	const data = await prisma.home.findUnique({
		where: {
			id: homeId
		},
		select: {
			photo: true,
			guests: true,
			bathrooms: true,
			bedrooms: true,
			title: true,
			description: true,
			categoryName: true,
			price: true,
			country: true,
			createdAt: true,
			isActive: true,
			reservation: {
				where: {
					homeId: homeId
				},
			},
			User: {
				select: {
					firstName: true,
					profileImage: true,
				}
			}
		}
	});

	return data
}

export default async function HomePage({
	params
}: { 
	params: Promise<{ id : string }>
}) {
	const { getCountyByValue } = useCountries();
	const { id } = await params;
	const data = await getData(id);
	const country = getCountyByValue(data?.country as string);
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	return (
		<div className="container mx-auto mt-5 mb-10 pb-10">
			<h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
			<div className="relative w-full h-[360px] sm:h-[450px] mb-6">
				<Image 
					src={`https://vtilkrpezfgpguifkvrk.supabase.co/storage/v1/object/public/images/${data?.photo}`} 
					alt="Image of Home"
					fill
					className="rounded-lg h-full object-cover w-full"
				/>
			</div>
				
				
			<div className="w-full flex flex-wrap sm:flex-nowrap justify-between items-start gap-x-12 mt-8">
				<div className="w-full sm:w-[80%]">
					<h3 className="">{country?.flag} {country?.label} / {country?.region}</h3>

					<div className="w-full flex items-center justify-start gap-x-2 text-muted-foreground">
						<p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> * <p>{data?.bathrooms} Bathrooms</p>
					</div>

					<div className="flex items-center mt-6">
						<img 
							className="w-11 h-11 rounded-full"
							src={
								data?.User?.profileImage ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s"
							} 
							alt="User Image"
						/>
						<div className="flex flex-col ml-4">
							<h3 className="font-medium">Hosted by {data?.User?.firstName}</h3>
							<p className="text-sm text-muted-foreground">Host since {data?.createdAt ? data.createdAt.toISOString().split("T")[0] : "Unknown"}</p>
						</div>
					</div>

					<Separator className="bg-foreground text-background opacity-30 my-6" />

					<CategoryShowcase categoryName={data?.categoryName as string} />

					<Separator className="bg-foreground text-background opacity-30 my-6" />

					<p className="text-muted-foreground leading-[1.5] tracking-wide">{data?.description}</p>

					<Separator className="bg-foreground text-background opacity-30 my-6" />

					<HomeMap locationValue={country?.value as string} />

				</div>

				<form className="min-w-full w-full sm:min-w-[300px] sm:w-auto" action={createReservation}>
					<input type='hidden' name='userId' value={user?.id} />
					<input type='hidden' name='homeId' value={id} />
					<SelectCalendar 
						reservation={data?.reservation}
					/>

					{user?.id ? (
						<ReservationsSubmitButton isDisabled={data?.isActive ? false : true} />
					) : (
						<Button className="w-full cursor-pointer" asChild>
							<Link href="/api/auth/login">Make a Reservation</Link>
						</Button>
					)}
				</form>
			</div>
		</div>
	)
}