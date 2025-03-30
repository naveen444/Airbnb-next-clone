"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";

export function SubmitButtons() {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button disabled className="cursor-pointer">
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Please wait
				</Button>
			) : (
				<Button type="submit" className="cursor-pointer">
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
				>
					<Loader2 className="h-4 w-4 animate-spin" />
				</Button>
			) : (
				<Button variant="secondary" size="icon" className="bg-secondary cursor-pointer" type="submit" >
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
				>
					<Loader2 className="h-4 w-4 animate-spin" />
				</Button>
			) : (
				<Button variant="secondary" size="icon" className="bg-secondary cursor-pointer" type="submit" >
					<Heart className="w-4 h-4 text-primary" fill="#E21C49" />
				</Button>
			)}
		</>
	)
}

export function ReservationsSubmitButton() {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button className="w-full" disabled>
					<Loader2 className="h-4 w-4 animate-spin mr-2" /> Please wait...
				</Button>
			) : (
				<Button className="w-full cursor-pointer" type="submit">
					Make a Reservation!
				</Button>
			)}
		</>
	)
}