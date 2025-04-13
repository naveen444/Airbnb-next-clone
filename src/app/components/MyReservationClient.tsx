"use client"

import { Separator } from "@/components/ui/separator"
import { MoveRight } from "lucide-react"
import Image from "next/image"
import CategoryShowcase from "./CategoryShowcase"
import HomeMap from "./HomeMap"
import { ReservationsCancelButton } from "./SubmitButtons"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cancelReservation } from "@/app/actions";
import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function MyReservationClient({
	id,
	data,
	country,
	user
} : any) {
	const searchParams = useSearchParams();
	
	useEffect(() => {
		if (searchParams?.get("confirmed")) {
			toast.success('Your reservation is confirmed!');

			// Remove query param from URL
			const url = new URL(window.location.href);
			url.searchParams.delete('confirmed');
			window.history.replaceState(null, '', url.toString());
		}
	}, [searchParams]);
	
	return (
		<>
			<div className="relative h-[480px] mb-6">
				<Image 
					src={`https://vtilkrpezfgpguifkvrk.supabase.co/storage/v1/object/public/images/${data?.photo}`} 
					alt="Image of Home"
					fill
					className="rounded-lg h-full object-cover w-full"
				/>
			</div>
				
				
			<div className="w-full flex justify-between items-start gap-x-10 mt-8">
				<div className="w-2/3 shrink-0">
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

					<Separator className="bg-white opacity-30 my-6" />

					<CategoryShowcase categoryName={data?.categoryName as string} />

					<Separator className="bg-white opacity-30 my-6" />

					<p className="text-muted-foreground leading-[1.5] tracking-wide">{data?.description}</p>

					<Separator className="bg-white opacity-30 my-6" />

					<HomeMap locationValue={country?.value as string} />

				</div>

				
				<div className="w-1/3 flex flex-col items-start justify-start gap-4">
					{(data?.reservation ?? []).filter((item: any) => item.status === "confirmed").length > 0 ? 
						<div className="w-full flex flex-col items-start justify-start gap-4">
							<h2 className="text-lg font-semibold">Confirmed Reservations</h2>
							{data?.reservation?.filter((item: any) => item.status === "confirmed").map((res: any) => (
								<form className="w-full p-4 border rounded-md" key={res.id} action={cancelReservation}>
									<input type='hidden' name='reservationId' value={res.id} />
									<input type='hidden' name='pathname' value={`/reservations/home/${id}`} />
	
									<div className="flex justify-between items-center mb-2" key={res.id}>
										<p className="w-full">
											{new Date(res.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", })} (IST)
										</p>
										<MoveRight size={32} strokeWidth={4} absoluteStrokeWidth />
										<p className="w-full text-right">
											{new Date(res.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", })} (IST)
										</p>
									</div>
									{user?.id ? (
										res.status === "confirmed" ? <ReservationsCancelButton isDisabled={false} /> : <ReservationsCancelButton isDisabled={true} />
									) : (
										<Button className="w-full cursor-pointer" asChild>
											<Link href="/api/auth/login">Cancel this Reservation</Link>
										</Button>
									)}
								</form>
							))}
						</div>
						:
						""
					}
					
					{(data?.reservation ?? []).filter((item: any) => item.status === "canceled").length > 0 ? 
						<div className="w-full flex flex-col items-start justify-start gap-4">
							<h2 className="text-lg font-semibold">Canceled Reservations</h2>
							{data?.reservation?.filter((item: any) => item.status === "canceled").map((res: any) => (
								<div className="w-full flex justify-between items-center mb-2 p-4 border rounded-md" key={res.id}>
									<p className="w-full">
										{new Date(res.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", })} (IST)
									</p>
									<MoveRight size={32} strokeWidth={4} absoluteStrokeWidth />
									<p className="w-full text-right">
										{new Date(res.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", })} (IST)
									</p>
								</div>
							))}
						</div>
						:
						""
					}

					{(data?.reservation ?? []).filter((item: any) => item.status === "expired").length > 0 ? 
						<div className="w-full flex flex-col items-start justify-start gap-4">
							<h2 className="text-lg font-semibold">Expired Reservations</h2>
							{data?.reservation?.filter((item: any) => item.status === "expired").map((res: any) => (
								<div className="w-full flex justify-between items-center mb-2 p-4 border rounded-md" key={res.id}>
									<p className="w-full">
										{new Date(res.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", })} (IST)
									</p>
									<MoveRight size={32} strokeWidth={4} absoluteStrokeWidth />
									<p className="w-full text-right">
										{new Date(res.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", })} (IST)
									</p>
								</div>
							))}
						</div>
						:
						""
					}
				</div>
			</div>
		</>
	)
}