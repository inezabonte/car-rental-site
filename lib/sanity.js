import sanityClient from "@sanity/client";

const options = {
	projectId: "cwoumfnf",
	dataset: "production",
	apiVersion: "2022-02-25",
	useCdn: process.env.NODE_ENV === "production",
};

export default sanityClient(options);
