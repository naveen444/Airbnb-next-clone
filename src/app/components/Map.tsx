"use client"

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCountries } from '../lib/getCountries';
import { icon } from 'leaflet';

const ICON = icon({
	iconUrl: 'https://www.iconbolt.com/iconsets/font-awesome-solid/map-marker-alt.svg',
	iconSize: [50, 50]
})

export default function Map({locationValue}: {locationValue: string}) {
	const {getCountyByValue} = useCountries();
	const latlang = getCountyByValue(locationValue)?.latLang;
	
	return (
		<MapContainer 
			scrollWheelZoom={false} 
			className='h-[50vh] relative z-0 rounded-lg' 
			center={latlang ?? [24.31150924558064, 78.53987866873516]}
			zoom={6}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    		url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={latlang ?? [24.31150924558064, 78.53987866873516]} icon={ICON} />
		</MapContainer>
	)
}