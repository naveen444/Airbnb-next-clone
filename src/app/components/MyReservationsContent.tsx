"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState, useTransition } from "react";
import NoCardItems from "./NoCardItems";
import { getReservationsData } from "../actions";
import SkeletonCard from "./SkeletonCard";
import ReservationsList from "./ReservationsList";

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

export default function MyReservationsContent({ userId }: { userId: string }) {
	const [reservationsData, setReservationsData] = useState<ReservationType[]>([]);
	const [loading, setLoading] = useState(true);
	const [isPending, startTransition] = useTransition();

	const fetchReservations = (value: string) => {
		setLoading(true);
		startTransition(async () => {
			getReservationsData(userId, value).then((data) => {
				setReservationsData(data);
				setLoading(false);
			}).catch(() => setLoading(false));
		});
	};

	useEffect(() => {
		startTransition(async () => {
			const data = await getReservationsData(userId, "confirmed");
			setReservationsData(data);
			setLoading(false);
		});
	}, [userId]);

	return (
		<Tabs defaultValue="confirmed" className="w-full mt-4" onValueChange={fetchReservations}>
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger className="cursor-pointer" value="confirmed">Confirmed</TabsTrigger>
				<TabsTrigger className="cursor-pointer" value="canceled">Cancelled</TabsTrigger>
				<TabsTrigger className="cursor-pointer" value="expired">Expired</TabsTrigger>
			</TabsList>
			<TabsContent value="confirmed">
				{loading || isPending ? (
					<SkeletonLoading />
				) : reservationsData.length === 0 ? (
					<NoCardItems title="No active reservations" description="Please add a reservation to see it here..." />
				) : (
					<ReservationsList items={reservationsData} userId={userId} />
				)}
			</TabsContent>
			<TabsContent value="canceled">
				{loading || isPending ? (
					<SkeletonLoading />
				) : reservationsData.length === 0 ? (
					<NoCardItems title="No canceled reservations" description="Your canceled reservations will appear here..." />
				) : (
					<ReservationsList items={reservationsData} userId={userId} />
				)}
			</TabsContent>
			<TabsContent value="expired">
				{loading || isPending ? (
					<SkeletonLoading />
				) : reservationsData.length === 0 ? (
					<NoCardItems title="No expired reservations" description="Your expired reservations will appear here..." />
				) : (
					<ReservationsList items={reservationsData} userId={userId} />
				)}
			</TabsContent>
		</Tabs>
	)
}

function SkeletonLoading() {
	return (
		<div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</div>
	)
}