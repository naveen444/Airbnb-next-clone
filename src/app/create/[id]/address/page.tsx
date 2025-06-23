"use client";

import { useCountries } from "@/app/lib/getCountries";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import dynamic from "next/dynamic";
import { memo, useMemo, useState } from "react";
import { Skeleton } from '@/components/ui/skeleton';
import { CreateBottomBar } from "@/app/components/CreateBottomBar";
import { createLocation } from "@/app/actions";
import { useParams } from "next/navigation";

type Country = {
  value: string;
  label: string;
  flag: string;
  latLang: number[];
  region: string;
};

const CountryItem = memo(({ item }: {item: Country}) => (
  <SelectItem key={item.value} value={item.value}>
    {item.flag} {item.label} / {item.region}
  </SelectItem>
));

export default function AddressPage() {
	const { id } = useParams();
	const { getAllCountries } = useCountries();
	const [locationValue, setLocationValue] = useState("");

	// Memoize countries to prevent re-rendering
  const countries = useMemo(() => getAllCountries(), [getAllCountries]);

	const LazyMap = dynamic(() => import('@/app/components/Map'), {
		ssr: false,
		loading: () => <Skeleton className="h-[50vh] w-full" />
	})

	return (
		<>
			<div className="container mx-auto mt-4 sm:mt-5 mb-5">
				<h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">Where is your home located?</h2>
			</div>

			<form action={createLocation}>
				<input type="hidden" name="homeId" value={id} />
				<input type="hidden" name="countryValue" value={locationValue} />
				<div className="container mx-auto mt-4 sm:mt-5 mb-5">
					<div className="max-w-[800px] mx-auto">
						<div className="mb-5">
							<Select required onValueChange={(value) => setLocationValue(value)}>
								<SelectTrigger className="w-full cursor-pointer">
									<SelectValue placeholder="Select a Country" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Countries</SelectLabel>
										{
											countries.map((item) => (
												<CountryItem key={item.value} item={item} />
											))
										}
									</SelectGroup>
								</SelectContent>
							</Select>
							{/* <select required className="w-full bg-black border no-scrollbar py-2 px-2 rounded ">
								<option value="" disabled selected>Select a Country</option>
								{
									countries.map((item) => (
										<option className="py-1 border-none" key={item.value} value={item.value}>
											{item.flag} {item.label} / {item.region}
										</option>
									))
								}
							</select> */}
						</div>

						<LazyMap locationValue={locationValue} />
					</div>
				</div>

				<CreateBottomBar />
			</form>
		</>
	)
}