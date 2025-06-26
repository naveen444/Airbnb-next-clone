import { Suspense } from "react";
import CategoryFilterItems from "./components/CategoryFilterItems";
import { ListingCard } from "./components/ListingCard";
import prisma from "./lib/db";
import SkeletonCard from "./components/SkeletonCard";
import NoCardItems from "./components/NoCardItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Footer } from "./components/Footer";
import { unstable_noStore as noStore } from "next/cache";

async function getData({
	searchParams,
	userId,
}: {
	searchParams?: Promise<{
		filter?: string;
		country?: string;
		guest?: string;
		room?: string;
		bathroom?: string;
	}>,
	userId: string | undefined
}) {
	noStore();
	const search = await searchParams;
	const data = await prisma.home.findMany({
		where: {
			addedCategory: true,
			addedDescription: true,
			addedLocation: true,
			categoryName: search?.filter ?? undefined,
			country: search?.country ?? undefined,
			guests: search?.guest ?? undefined,
			bedrooms: search?.room ?? undefined,
			bathrooms: search?.bathroom ?? undefined,
			isActive: true
		},
		select: {
			photo: true,
			id: true,
			price: true,
			description: true,
			country: true,
			Favourite: {
				where: {
					userId: userId ?? undefined,
				}
			}
		}
	});

	return data;
}

export default async function Home({
	searchParams
}: {
	searchParams?: Promise<{
		filter?: string;
		country?: string;
		guest?: string;
		room?: string;
		bathroom?: string;
	}>
}) {
	const search = await searchParams;
  return (
    <div className="container mx-auto px-5 lg:px-10 pb-12">

			<Suspense fallback={null}>
      	<CategoryFilterItems />
			</Suspense>

			<Suspense key={search?.filter} fallback={<SkeletonLoading />}>
				<ShowItems searchParams={searchParams} />
			</Suspense>

			<Footer />
    </div>
  );
}

async function ShowItems({
	searchParams
}: {
	searchParams?: Promise<{
		filter?: string;
		country?: string;
		guest?: string;
		room?: string;
		bathroom?: string;
	}>
}) {
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	const data = await getData({searchParams: searchParams, userId: user?.id});

	return (
		<>
			{data.length === 0 ? (
					<NoCardItems 
						title="Sorry, no listings found for this category..."
						description="Please check other categories!"
					/>
				): (
					<div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
						{
							data.map((item) => (
								<ListingCard 
									key={item.id} 
									description={item.description as string} 
									imagePath={item.photo as string} 
									location={item.country as string}
									price={item.price as number}
									userId={user?.id}
									favouriteId={item.Favourite[0]?.id}
									isInFavourites={item.Favourite.length > 0 ? true : false}
									homeId={item.id}
									pathname="/"
									cardLink={`/home/${item.id}`}
								/>
							))
						}
					</div>
				)
			}
		</>
	)
}

function SkeletonLoading() {
	return (
		<div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</div>
	)
}