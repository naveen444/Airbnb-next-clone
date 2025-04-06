"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Ban, Heart, Loader2 } from "lucide-react";

export function SubmitButtons() {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button disabled className="cursor-pointer" title="loading...">
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Please wait
				</Button>
			) : (
				<Button type="submit" className="cursor-pointer" title="Next">
					Next
				</Button>
			)}
		</>
	)
}

export function AddToFavouriteButton() {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button
					disabled
					variant="secondary" 
					size="icon" 
					className="bg-secondary"
					title="loading..."
				>
					<Loader2 className="h-4 w-4 animate-spin" />
				</Button>
			) : (
				<Button variant="secondary" size="icon" className="bg-secondary cursor-pointer" title="Add to favourites" type="submit" >
					<Heart className="w-4 h-4" />
				</Button>
			)}
		</>
	)
}

export function RemoveFromFavouriteButton() {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button
					disabled
					variant="secondary" 
					size="icon" 
					className="bg-secondary"
					title="loading..."
				>
					<Loader2 className="h-4 w-4 animate-spin" />
				</Button>
			) : (
				<Button variant="secondary" size="icon" className="bg-secondary cursor-pointer" title="Remove from favourites" type="submit" >
					<Heart className="w-4 h-4 text-primary" fill="#E21C49" />
				</Button>
			)}
		</>
	)
}

export function ReservationsSubmitButton({isDisabled}: {isDisabled: boolean}) {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button className="w-full" title="loading..." disabled>
					<Loader2 className="h-4 w-4 animate-spin mr-2" /> Please wait...
				</Button>
			) : (
				isDisabled ?
				<div title="You cannot make reservations on this property because the owner has unlisted it">
					<Button className="w-full cursor-pointer" title="Make a Reservation" type="submit" disabled>
						Make a Reservation!
					</Button>
				</div>
				:
				<Button className="w-full cursor-pointer" title="Make a Reservation" type="submit">
					Make a Reservation!
				</Button>
			)}
		</>
	)
}

export function ReservationsCancelButton({isDisabled}: {isDisabled: boolean}) {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button className="w-full" title="loading..." disabled>
					<Loader2 className="h-4 w-4 animate-spin mr-2" /> Please wait...
				</Button>
			) : (
				isDisabled ?
				<div title="Reservation is already cancelled...">
					<Button className="w-full cursor-pointer" title="Cancel this Reservation" type="submit" disabled>
						Reservation cancelled!
					</Button>
				</div>
				:
				<Button className="w-full cursor-pointer" title="Cancel this Reservation" type="submit">
					Cancel this Reservation!
				</Button>
			)}
		</>
	)
}

export function UnlistButton({isDisabled}: {isDisabled: boolean}) {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button
					disabled
					variant="secondary" 
					size="icon" 
					className="bg-secondary"
					title="loading..."
				>
					<Loader2 className="h-4 w-4 animate-spin" />
				</Button>
			) : (
				isDisabled ?
				<div title="You can't unlist this property because it has pending reservations.">
					<Button variant="secondary" title="Unlist property" size="icon" className="bg-secondary cursor-pointer" type="submit" disabled >
						<Ban className="w-4 h-4" />
					</Button>
				</div>
				:
				<Button variant="secondary" title="Unlist property" size="icon" className="bg-secondary cursor-pointer" type="submit" >
					<Ban className="w-4 h-4" />
				</Button>
			)}
		</>
	)
}

export function AddToListButton() {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button
					disabled
					variant="secondary" 
					size="icon" 
					className="bg-secondary"
					title="loading..."
				>
					<Loader2 className="h-4 w-4 animate-spin" />
				</Button>
			) : (
				<Button variant="secondary" title="Activate this properties" size="icon" className="bg-secondary cursor-pointer" type="submit" >
					<Ban className="w-4 h-4" stroke="#3a86ff" />
				</Button>
			)}
		</>
	)
}