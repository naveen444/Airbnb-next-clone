"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState, useTransition } from "react";
import NoCardItems from "./NoCardItems";
import HomeList from "./HomeList";
import { getActiveHomeData, getInactiveHomeData } from "../actions";
import SkeletonCard from "./SkeletonCard";

export default function MyHomesContent({ userId }: { userId: string }) {
	const [activeHomes, setActiveHomes] = useState<any[]>([]);
	const [inactiveHomes, setInactiveHomes] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [isPending, startTransition] = useTransition();

	const fetchHomes = (value: string) => {
		setLoading(true);
		startTransition(async () => {
			const data = value === "active" ? await getActiveHomeData(userId) : await getInactiveHomeData(userId);
			value === "active" ? setActiveHomes(data) : setInactiveHomes(data);
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