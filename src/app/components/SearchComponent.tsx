"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchIcon } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useCountries } from '../lib/getCountries';
import HomeMap from './HomeMap';
import { Button } from '@/components/ui/button';
import { SubmitButtons } from './SubmitButtons';
import { Card, CardHeader } from '@/components/ui/card';
import { Counter } from './Counter';

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

export function SearchComponent() {
	const [step, setStep] = useState(1);
	const [locationValue, setLocationValue] = useState('');
	const { getAllCountries } = useCountries();

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
				<div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
					<div className='flex h-full divide-x font-medium'>
						<p className='px-4'>Anywhere</p>
						<p className='px-4'>Any Week</p>
						<p className='px-4'>Add Guests</p>
					</div>

					<SearchIcon 
						className="bg-primary text-white p-1 h-8 w-8 rounded-full"
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
										<Counter name="guest" />
									</div>
									<div className="w-full flex items-center justify-between">
										<div className="flex flex-col">
											<h3 className="underline font-medium">Rooms</h3>
											<p className="text-muted-foreground text-sm">How many rooms do you have?</p>
										</div>
										<Counter name="room" />
									</div>
									<div className="w-full flex items-center justify-between">
										<div className="flex flex-col">
											<h3 className="underline font-medium">Bathrooms</h3>
											<p className="text-muted-foreground text-sm">How many bathrooms do you have?</p>
										</div>
										<Counter name="bathroom" />
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