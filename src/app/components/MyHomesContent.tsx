"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState, useTransition } from "react";
import NoCardItems from "./NoCardItems";
import HomeList from "./HomeList";
import { getActiveHomeData, getInactiveHomeData } from "../actions";
import SkeletonCard from "./SkeletonCard";

type Home = {
	hasFutureReservations: boolean;
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
	
};

export default function MyHomesContent({ userId }: { userId: string }) {
	const [activeHomes, setActiveHomes] = useState<Home[]>([]);
	const [inactiveHomes, setInactiveHomes] = useState<Home[]>([]);
	const [loading, setLoading] = useState(true);
	const [isPending, startTransition] = useTransition();

	const fetchHomes = (value: string) => {
		setLoading(true);
		startTransition(async () => {
			const data = value === "active" ? await getActiveHomeData(userId) : await getInactiveHomeData(userId);
			if (value === "active") {
				setActiveHomes(data);
			} else {
				setInactiveHomes(data);
			}
			setLoading(false);
		});
	};

	useEffect(() => {
		startTransition(async () => {
			const data = await getActiveHomeData(userId);
			setActiveHomes(data);
			setLoading(false);
		});
	}, [userId]);

	return (
		<Tabs defaultValue="active" className="w-full mt-4" onValueChange={fetchHomes}>
			<TabsList className="grid w-full grid-cols-2">
				<TabsTrigger className="cursor-pointer" value="active">Active</TabsTrigger>
				<TabsTrigger className="cursor-pointer" value="inactive">Inactive</TabsTrigger>
			</TabsList>
			<TabsContent value="active">
				{loading || isPending ? (
					<SkeletonLoading />
				) : activeHomes.length === 0 ? (
					<NoCardItems title="No active homes" description="List a home to see it here." />
				) : (
					<HomeList items={activeHomes} userId={userId} active={true} fetchHomes={() => fetchHomes("active")} />
				)}
			</TabsContent>
			<TabsContent value="inactive">
				{loading || isPending ? (
					<SkeletonLoading />
				) : inactiveHomes.length === 0 ? (
					<NoCardItems title="No inactive homes" description="Inactive homes will appear here." />
				) : (
					<HomeList items={inactiveHomes} userId={userId} active={false} fetchHomes={() => fetchHomes("inactive")} />
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