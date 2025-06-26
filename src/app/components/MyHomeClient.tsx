"use client"

import { MoveRight } from "lucide-react"
import HomeMap from "./HomeMap"
import { Separator } from "@/components/ui/separator"
import CategoryShowcase from "./CategoryShowcase"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useEffect } from "react"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"

type ReservationWithUser = {
  id: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  status: "confirmed" | "canceled" | "expired";
  User?: {
    profileImage?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  } | null;
};

type HomeData = {
  id?: string  | null;
  photo: string | null;
  guests: string | null;
  bathrooms: string | null;
  bedrooms: string | null;
  title: string | null;
  description: string | null;
  categoryName: string | null;
  price: number | null;
  country: string | null;
  createdAt: Date | null;
  reservation?: ReservationWithUser[];
  User?: {
    firstName: string | null;
    profileImage: string | null;
  } | null;
} | null;

type Country = {
  label: string;
  latLang: [number, number];
  region: string;
  value: string;
  flag: string;
};

export default function MyHomeClient({ id, data, country }: {id: string, data: HomeData, country: Country }) {
	const searchParams = useSearchParams();

	useEffect(() => {
    if (searchParams?.get("updated")) {
      toast.success('Home updated successfully!');

      // Remove query param from URL
      const url = new URL(window.location.href);
      url.searchParams.delete('updated');
      window.history.replaceState(null, '', url.toString());
    }
		if (searchParams?.get("created")) {
      toast.success('Home created successfully!');

      // Remove query param from URL
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      window.history.replaceState(null, '', url.toString());
    }
  }, [searchParams]);

	return (
		<>
			<div className="flex justify-between items-center mb-5">
				<h1 className="font-medium text-2xl mb-0">{data?.title}</h1>
				<Link href={`/edit/${id}/structure`} >
					<Button className="cursor-pointer">Edit Home</Button>
				</Link>
			</div>
			<div className="relative h-[360px] sm:h-[450px] mb-6">
				<Image 
					src={`https://vtilkrpezfgpguifkvrk.supabase.co/storage/v1/object/public/images/${data?.photo}`} 
					alt="Image of Home"
					fill
					className="rounded-lg h-full object-cover w-full"
				/>
			</div>
				
				
			<div className="flex flex-wrap md:flex-nowrap justify-between items-start gap-x-10 gap-y-4 md:gap-y-0 mt-4 md:mt-8">
				<div className="w-full lg:w-3/5">
					<h3 className="">{country?.flag} {country?.label} / {country?.region}</h3>

					<div className="w-full flex items-center justify-start gap-x-2 text-muted-foreground">
						<p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> * <p>{data?.bathrooms} Bathrooms</p>
					</div>

					<div className="flex items-center mt-3 md:mt-6">
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

					<Separator className="bg-foreground text-background opacity-30 my-3 sm:my-6" />

					<CategoryShowcase categoryName={data?.categoryName as string} />

					<Separator className="bg-foreground text-background opacity-30 my-3 sm:my-6" />

					<p className="text-muted-foreground leading-[1.5] tracking-wide">{data?.description}</p>

					<Separator className="bg-foreground text-background opacity-30 my-3 sm:my-6" />

					<HomeMap locationValue={country?.value as string} />

				</div>

				<div className="w-full lg:w-2/5 flex flex-col items-start justify-start gap-4">
					<h2 className="text-lg font-semibold">Reservations</h2>
					{ (data?.reservation ?? []).length > 0 ?
						data?.reservation?.map((res: ReservationWithUser) => (
							<div className="w-full flex flex-col items-start justify-start gap-4 mb-2 p-4 border rounded-md" key={res.id}>
								<div className="w-full flex items-center justify-between">
									<div className="flex items-center">
										<img 
											className="w-11 h-11 rounded-full"
											src={
												res.User?.profileImage ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFRPx77U9mERU_T1zyHcz9BOxbDQrL4Dvtg&s"
											} 
											alt="User Image"
										/>
										<div className="flex flex-col ml-3">
											<h3 className="font-medium">Booked by {res.User?.firstName} {res.User?.lastName}</h3>
											<p className="text-sm text-muted-foreground mb-0">Booked on {res?.createdAt ? res.createdAt.toISOString().split("T")[0] : "Unknown"}</p>
										</div>
									</div>

									<div className="flex flex-col ml-3 text-right">
										<h3 className="font-medium">Status</h3>
										<p className={`text-sm text-muted-foreground px-2 rounded-sm mb-0 ${res.status === "confirmed" ? "bg-green-900" : "bg-red-900"}`}>{res.status}</p>
									</div>
								</div>
								<div className="w-full flex justify-between items-center" key={res.id}>
									<p className="w-full">
										{new Date(res.startDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", })} (IST)
									</p>
									<MoveRight size={32} strokeWidth={4} absoluteStrokeWidth />
									<p className="w-full text-right">
										{new Date(res.endDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", })} (IST)
									</p>
								</div>
							</div>
						))
						: 
						<div className="w-full flex items-center">
							<p className="">No reservations yet.</p>
						</div> 
					}
				</div>
			</div>
		</>
	)
}