import { MyHomesListingCard } from "./MyHomesListingCard";
import NoCardItems from "./NoCardItems";

type Home = {
	id: string;
	description: string | null;
	country: string | null;
	photo: string | null;
	price: number | null;
	Favourite: {
			userId: string | null;
			id: string;
			createdAt: Date;
			homeId: string | null;
	}[];
	hasFutureReservations: boolean;
};

export default function HomeList({ items, userId, active, fetchHomes }: { items: Home[], userId: string, active: boolean, fetchHomes: () => void }) {
	return (
		<div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-4">
			{items.length === 0 ? 
				(
					<NoCardItems 
						title="You don't have any homes listed"
						description="Please list a home on airbnb so that you can see it here"
					/>
				) : 
				items.map((item) => (
					<MyHomesListingCard 
						key={item.id}
						imagePath={item.photo as string}
						homeId={item.id}
						price={item.price as number}
						description={item.description as string}
						location={item.country as string}
						userId={userId}
						pathname="/my-homes"
						favouriteId={item.Favourite[0]?.id}
						isInFavourites={item.Favourite.length > 0 ? true : false}
						ownerListing={true}
						active={active}
						fetchHomes={fetchHomes}
						hasFutureReservations={item.hasFutureReservations}
					/>
				))
			}
		</div>
	)
}