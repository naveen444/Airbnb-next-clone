"use client";

import Link from "next/link"
import { categoryItems } from "../lib/categoryItems"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CategoryFilterItems() {
	const searchParams = useSearchParams()
	const search = searchParams.get("filter");
	const pathName = usePathname()

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString())

			params.set(name, value);

			return params.toString();
		}, [searchParams]
	)

	return (
		<div className="flex justify-between gap-x-8 mt-4 w-full overflow-hidden">
			{/* overflow-x-scroll no-scrollbar */}
			<Carousel
				className="w-full relative"
				opts={{
					align: "start",
					loop: true,
				}}
			>
				<CarouselContent>
					{
						categoryItems.map((item) => 
							(
								<CarouselItem key={item.id} className={`basis-1/4 sm:basis-1/6 md:basis-1/8 lg:basis-1/12`} >
									<Link 
										href={pathName + "?" + createQueryString('filter', item.name)} 
										className={cn(
											search === item.name ? "border-b-2 border-white pb-2 flex-shrink-0" : "opacity-50 flex-shrink-0", "flex flex-col gap-y-2 items-center"
										)}
									>
										<div className="relative w-6 h-6">
											<Image src={item.imageUrl} alt="category image" className="w-6 h-6 invert-theme" width={24} height={24} />
										</div>
										<p className="text-xs font-medium">{item.title}</p>
									</Link>
								</CarouselItem>
							)
						)
					}
					</CarouselContent>
				<CarouselPrevious className="absolute top-1/2 left-0 translate-y-[-50%] cursor-pointer" />
				<CarouselNext className="absolute top-1/2 right-0 translate-y-[-50%] cursor-pointer" />
			</Carousel>
		</div>
	)
}