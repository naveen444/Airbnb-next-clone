"use client";

import Link from "next/link"
import { categoryItems } from "../lib/categoryItems"
import Image from "next/image"
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

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
		<div className="flex justify-between gap-x-8 mt-4 w-full overflow-x-scroll no-scrollbar">
			{
				categoryItems.map((item, i) => 
					(
						<Link 
							key={item.id} 
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
					)
				)
			}
		</div>
	)
}