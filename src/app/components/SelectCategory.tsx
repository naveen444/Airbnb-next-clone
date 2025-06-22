"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { categoryItems } from "../lib/categoryItems"
import Image from "next/image"
import { useState } from "react"

export default function SelectCategory({category}: {category: string}) {
	const [selectedCategory, setSelectedCategory] = useState<string | undefined>(category);

	return (
		<div className="container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-8 mt-4 sm:mt-5 mx-auto">
			<input type="hidden" name="categoryName" value={selectedCategory as string} />
			{
				categoryItems.map((item, i) => (
					<div key={item.id} className="cursor-pointer">
						<Card className={`${category === item.name ? "border-green-400" : ""} ${selectedCategory === item.name ? "border-primary" : ""}`} onClick={() => setSelectedCategory(item.name)}>
							<CardHeader>
								<Image src={item.imageUrl} alt={item.name} height={32} width={32} className="w-8 h-8 invert-100" />
								<h3 className="font-medium">{item.title}</h3>
							</CardHeader>
						</Card>
					</div>
				))
			}
		</div>
	)
}