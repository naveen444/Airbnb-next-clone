"use client"

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRange, RangeKeyDict, Range } from 'react-date-range';
import { useState } from 'react';
import { eachDayOfInterval } from 'date-fns';

export function SelectCalendar({
	reservation
}: {
	reservation: {
		startDate: Date,
		endDate: Date,
	}[] | undefined,
}) {
	const [state, setState] = useState<Range[]>([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: "selection"
		}
	]);
	let disabledDates : Date[] = [];
	reservation?.forEach((reservationItem) => {
		const dateRange = eachDayOfInterval({
			start: new Date(reservationItem.startDate),
			end: new Date(reservationItem.endDate)
		});

		disabledDates = [...disabledDates, ...dateRange]
	})

	return (
		<>
			<input type='hidden' name='startDate' value={state[0]?.startDate?.toISOString()} />
			<input type='hidden' name='endDate' value={state[0]?.endDate?.toISOString()} />
			<DateRange 
				className='mx-auto'
				date={new Date()}
				showDateDisplay={false}
				rangeColors={['#FF5A5F']}
				ranges={state}
				onChange={(item: RangeKeyDict) => setState([item.selection])}
				minDate={new Date()}
				direction='vertical'
				disabledDates={disabledDates}
			/>
		</>
	)
}