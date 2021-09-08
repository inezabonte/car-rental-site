import { getHomeData } from "lib/api";

export default async (req, res) => {
	const data = await getHomeData();
	return res.status(200).json(data);
};
