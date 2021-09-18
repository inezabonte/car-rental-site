import Client from "./sanity";

const rentCar = `
name,
year,
'coverImage': coverImage.asset->url,
'slug': slug.current,
'available': availability,
price,
seats,
transmission,
fuel
`;

const buyCar = `
name,
year,
fuel,
'coverImage': coverImage.asset->url,
'slug': slug.current,
transmission,
sellingPrice
`;

const rentSingleCarData = `
${rentCar},
"images": images[].asset->url
`;

const buySingleCarData = `
${buyCar},
"images": images[].asset->url
`;

export async function getRentCar() {
	const results = await Client.fetch(`*[_type == "cars"]{${rentCar}}`);

	return results;
}

export async function getSingleRentCar(slug) {
	const results = await Client.fetch(
		`*[_type == 'cars' && slug.current == '${slug}' ]{${rentSingleCarData}}`
	);

	return results;
}

export async function getSaleCar() {
	const results = await Client.fetch(`*[_type == "cars"]{${buyCar}}`);

	return results;
}

export async function getSingleSaleCar(slug) {
	const results = await Client.fetch(
		`*[_type == 'cars' && slug.current == '${slug}' ]{${buySingleCarData}}`
	);

	return results;
}
