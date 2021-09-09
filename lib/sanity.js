import sanityClient from "@sanity/client";

const options = {
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET_NAME,
	apiVersion: process.env.SANITY_API_VERSION,
	useCdn: process.env.NODE_ENV === "production",
};
console.log(options);
export default sanityClient(options);
