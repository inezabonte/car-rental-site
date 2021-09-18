import { getRentCar, getSaleCar } from "lib/api";

export default async (req, res) => {
	const { q } = req.query;

	if (q === "rent") {
		const data = await getRentCar();
		return res.status(200).json(data);
	}

	if (q === "buy") {
		const data = await getSaleCar();
		return res.status(200).json(data);
	}

	return res
		.status(400)
		.json({ statusCode: 400, message: "`q` parameter missing" });
};
