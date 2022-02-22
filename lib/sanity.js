import sanityClient from "@sanity/client";

const options = {
	projectId: process.env.SANITY_PUBLIC_PROJECT_ID,
	dataset: process.env.SANITY_PUBLIC_DATASET_NAME,
	apiVersion: process.env.SANITY_PUBLIC_API_VERSION,
	useCdn: process.env.NODE_ENV === "production",
};

export default sanityClient(options);
