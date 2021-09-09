import sanityClient from "@sanity/client";

const options = {
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_DATASET_NAME,
	apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
	useCdn: process.env.NODE_ENV === "production",
};

export default sanityClient(options);
