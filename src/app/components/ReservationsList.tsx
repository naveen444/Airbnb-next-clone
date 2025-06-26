import { ListingCard } from "./ListingCard";
import NoCardItems from "./NoCardItems";

type ReservationType = {
    id: string;
    Home: {
			country: string | null;
			id: string;
			description: string | null;
			photo: string | null;
			price: number | null;
			Favourite: {
					id: string;
					userId: string | null;
					createdAt: Date;
					homeId: string | null;
			}[];
	} | null;
};

export default function ReservationsList({ items, userId }: { items: ReservationType[], userId: string }) {
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
					<ListingCard
						key={item?.id}
						description={item.Home?.description as string}
						location={item.Home?.country as string}
						pathname="/favourites"
						homeId={item.Home?.id as string}
						imagePath={item.Home?.photo as string}
						price={item.Home?.price as number}
						userId={userId}
						favouriteId={item.Home?.Favourite[0]?.id as string}
						isInFavourites={item.Home?.Favourite.length as number > 0 ? true : false}
						cardLink={`/reservations/home/${item.Home?.id}`}
					/>
				))
			}
		</div>
	)
}