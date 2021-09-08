import Client from "./sanity";

const homeData = `
name,
year,
'coverImage': coverImage.asset->url,
'slug': slug.current,
'available': availability,
price,
seats,
fuel
`;

export async function getHomeData() {
	const results = await Client.fetch(`*[_type == "cars"]{${homeData}}`);

	return results;
}
