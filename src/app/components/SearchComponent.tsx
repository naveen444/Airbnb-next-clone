"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchIcon } from 'lucide-react';
import { memo, useMemo, useState, useEffect } from 'react';
import { getCountryByValue, getAllCountries } from '../lib/getCountries';
import HomeMap from './HomeMap';
import { Button } from '@/components/ui/button';
import { SubmitButtons } from './SubmitButtons';
import { Card, CardHeader } from '@/components/ui/card';
import { Counter } from './Counter';
import { useSearchParams } from "next/navigation";

type Country = {
	value: string;
	label: string;
	flag: string;
	latLang: number[];
	region: string;
};

const CountryItem = memo(function CountryItem({ item }: {item: Country}) {
	return <SelectItem key={item.value} value={item.value}>
		{item.flag} {item.label} / {item.region}
	</SelectItem>
});

export function SearchComponent() {
	const [step, setStep] = useState(1);
	const [locationValue, setLocationValue] = useState('');
	const searchParams = useSearchParams();
	const countryParam = searchParams.get('country');
	const [filters, setFilters] = useState<{
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  }>({});

	useEffect(() => {
		const country = countryParam ? getCountryByValue(countryParam) : null;
		setFilters({
      country: country?.label ?? undefined,
      guest: searchParams.get('guest') ?? undefined,
      room: searchParams.get('room') ?? undefined,
      bathroom: searchParams.get('bathroom') ?? undefined,
    });
	}, [searchParams]);

	// Memoize countries to prevent re-rendering
	const countries = useMemo(() => getAllCountries(), [getAllCountries]);

	function SubmitButtonLocal() {
		if (step === 1) {
			return (
				<Button className='cursor-pointer' onClick={() => setStep(step + 1)} type='submit'>
					Next
				</Button>
			)
		} else if (step === 2) {
			return (
				<SubmitButtons  />
			)
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className="rounded-full py-1 px-2 sm:py-2 sm:px-5 border flex items-center cursor-pointer">
					<div className='h-full divide-x font-medium hidden sm:flex'>
						<p className='px-2 sm:px-4'>
							<span className='flex items-center gap-2'>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-4 h-4 fill-foreground bg-background'>
									<path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
								</svg>
								{ filters.country ? filters?.country : 'Anywhere' }
							</span>
						</p>
						<p className='px-2 sm:px-4'>
							<span className='flex items-center gap-2'>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className='w-5 h-5 fill-foreground bg-background'>
									<path d="M432 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM347.7 200.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1 22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54 19.3-65.5 9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L505 232.7l-15.3-36.8C472.5 154.8 432.3 128 387.7 128c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-32.9 14.6-58.1 42.4-69.4 76.5l-2.6 7.8c-5.6 16.8 3.5 34.9 20.2 40.5s34.9-3.5 40.5-20.2l2.6-7.8c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5zm-30 135.1l-25 62.4-59.4 59.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L340.3 441c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6zM256 274.1c-7.7-4.4-17.4-1.8-21.9 5.9l-32 55.4L147.7 304c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c1.5-2.6 2.6-5.2 3.3-8L261.9 296c4.4-7.7 1.8-17.4-5.9-21.9z"/>
								</svg>
								{ filters.guest ? `${filters?.guest} guests` : 'Add Guests'}
							</span>
						</p>
						<p className='px-2 sm:px-4'>
							{ filters.room && filters.bathroom ? 
								<span className='flex gap-4 items-center'>
									<span className='flex items-center gap-1'>
										{filters.room}
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className='w-5 h-6 fill-foreground bg-background'>
											<path d="M32 32c17.7 0 32 14.3 32 32l0 256 224 0 0-160c0-17.7 14.3-32 32-32l224 0c53 0 96 43 96 96l0 224c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-32-224 0-32 0L64 416l0 32c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/>
										</svg>
									</span>
									<span className='flex items-center gap-1'>
										{filters?.bathroom}
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-5 h-4 fill-foreground bg-background'>
											<path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3L32 256c-17.7 0-32 14.3-32 32s14.3 32 32 32l448 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 256 96 77.3zM32 352l0 16c0 28.4 12.4 54 32 71.6L64 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-16 256 0 0 16c0 17.7 14.3 32 32 32s32-14.3 32-32l0-40.4c19.6-17.6 32-43.1 32-71.6l0-16L32 352z"/>
										</svg>
									</span>
								</span>
								:
								<span className='flex items-center gap-2'>
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-5 h-4 fill-foreground bg-background'>
										<path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/>
									</svg>
									Any Week
								</span>
							}
						</p>
					</div>

					<div className='block sm:hidden'>
						<p className='px-2 sm:px-4'>Search</p>
					</div>

					<SearchIcon 
						className="bg-primary text-white p-1 h-6 w-6 sm:h-8 sm:w-8 rounded-full"
					/>
				</div>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px] '>
				<form className='flex flex-col gap-4'>
					<input type='hidden' name="country" value={locationValue} />
					{step===1 ? (
						<>
							<DialogHeader>
								<DialogTitle>Select a country</DialogTitle>
								<DialogDescription>Please choose a country where you want to do reservation.</DialogDescription>
							</DialogHeader>
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
							<HomeMap locationValue={locationValue} />
						</>
					) : (
						<>
							<DialogHeader>
								<DialogTitle>Select your requirements</DialogTitle>
								<DialogDescription>Please choose the requirements you need.</DialogDescription>
							</DialogHeader>
							<Card>
								<CardHeader className="flex flex-col gap-y-5">
									<div className="w-full flex items-center justify-between">
										<div className="flex flex-col">
											<h3 className="underline font-medium">Guests</h3>
											<p className="text-muted-foreground text-sm">How many guests do you want?</p>
										</div>
										<Counter name="guest" defaultAmount={0} />
									</div>
									<div className="w-full flex items-center justify-between">
										<div className="flex flex-col">
											<h3 className="underline font-medium">Rooms</h3>
											<p className="text-muted-foreground text-sm">How many rooms do you have?</p>
										</div>
										<Counter name="room" defaultAmount={0} />
									</div>
									<div className="w-full flex items-center justify-between">
										<div className="flex flex-col">
											<h3 className="underline font-medium">Bathrooms</h3>
											<p className="text-muted-foreground text-sm">How many bathrooms do you have?</p>
										</div>
										<Counter name="bathroom" defaultAmount={0} />
									</div>
								</CardHeader>
							</Card>
						</>
					)}

					<DialogFooter>
						<SubmitButtonLocal />
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}