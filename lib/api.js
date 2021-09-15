import Client from "./sanity";

const homeData = `
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

const singleCarData = `
${homeData},
"images": images[].asset->url
`;

export async function getHomeData() {
	const results = await Client.fetch(`*[_type == "cars"]{${homeData}}`);

	return results;
}

export async function getSingleCar(slug) {
	const results = await Client.fetch(
		`*[_type == 'cars' && slug.current == '${slug}' ]{${singleCarData}}`
	);

	return results;
}
