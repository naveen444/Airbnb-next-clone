import Image from "next/image";
import Link from "next/link";
import { useCountries } from "../lib/getCountries";
import { AddToFavouriteButton, AddToListButton, RemoveFromFavouriteButton, UnlistButton } from "./SubmitButtons";
import { addtoFavourite, removeFromFavourite, userSetHomeActive, userSetHomeInactive } from "../actions";

interface iAppProps {
	imagePath: string;
	description: string;
	location: string;
	price: number;
	userId: string | undefined;
	isInFavourites: boolean;
	favouriteId: string | undefined;
	homeId: string;
	pathname: string;
	cardLink: string;
}

export function ListingCard({
	description, 
	imagePath, 
	location, 
	price,
	userId,
	favouriteId,
	isInFavourites,
	homeId,
	pathname,
	cardLink,
} : iAppProps) {
	const {getCountyByValue} = useCountries();
	const country = getCountyByValue(location);

	return (
		<div className="flex flex-col">
			<div className="relative h-72">
				<Image 
					src={`https://vtilkrpezfgpguifkvrk.supabase.co/storage/v1/object/public/images/${imagePath}`} 
					alt="Image of House" 
					fill 
					className="rounded-lg h-full object-cover" 
				/>
				{userId && (
					<>
						<div className="z-10 absolute top-2 right-2">
							{isInFavourites ? (
								<form action={removeFromFavourite}>
									<input type="hidden" name="favouriteId" value={favouriteId} />
									<input type="hidden" name="userId" value={userId} />
									<input type="hidden" name="pathname" value={pathname} />
									<RemoveFromFavouriteButton />
								</form>
							) : (
								<form action={addtoFavourite}>
									<input type="hidden" name="homeId" value={homeId} />
									<input type="hidden" name="userId" value={userId} />
									<input type="hidden" name="pathname" value={pathname} />
									<AddToFavouriteButton />
								</form>
							)}
						</div>
					</>
				)}
			</div>
			<Link href={cardLink} className="mt-1" >
				<h3 className="font-medium text-base">{country?.flag} {country?.label} / {country?.region}</h3>
				<p className="text-muted-foreground line-clamp-2">{description}</p>
				<p className="pt-2 ">
					<span className="font-medium">&#8377; {price} </span>
					<span className=" text-muted-foreground"> / Night</span>
				</p>
			</Link>
		</div>
	)
}