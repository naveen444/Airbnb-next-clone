import { Skeleton } from "@/components/ui/skeleton";

export default function HomePageLoading() {
	return (
		<div className="container mx-auto mt-5 mb-10">
			<div className="w-full flex items-center justify-between">
				<Skeleton className="h-4 w-1/3"/>
				<Skeleton className="h-8 w-24"/>
			</div>
			<Skeleton className="w-full h-[480px] mt-5" />

			<div className="w-full flex flex-wrap sm:flex-nowrap justify-between items-start gap-x-12 mt-8">
				<div className="w-full sm:w-[80%]">
					<div className="w-2/3">
						<Skeleton className="h-4 w-1/3" />
						<Skeleton className="h-4 w-1/3 mt-3" />
					</div>
					<div className="w-full flex items-center mt-6">
						<Skeleton className="h-8 w-8 rounded-full" />
						<div className="w-1/3 flex flex-col ml-4">
							<Skeleton className="h-4 w-1/3" />
							<Skeleton className="h-4 w-1/3 mt-3" />
						</div>
					</div>
				</div>

				<div className="min-w-full w-full sm:min-w-[300px] sm:w-auto">
					<Skeleton className="w-full h-72" />
				</div>
			</div>
		</div>
	)
}