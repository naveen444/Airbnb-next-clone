import countries from 'world-countries';

const countriesFormatted = countries
	.map((item) => ({
		value: item.cca2,
		label: item.name.common,
		flag: item.flag,
		latLang: item.latlng,
		region: item.region
	})
);

export const getAllCountries = () => countriesFormatted;

export const getCountryByValue = (value: string) => {
  return countriesFormatted.find((item) => item.value === value);
};

// export const useCountries = () => {
// 	const getAllCountries = () => countriesFormatted

// 	const getCountyByValue = (value: string) => {
// 		return countriesFormatted.find((item) => item.value === value);
// 	};

// 	return {
// 		getAllCountries,
// 		getCountyByValue
// 	}
// }