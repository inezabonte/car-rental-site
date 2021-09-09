import Layout from "@/components/Layout";
import Image from "next/image";
import axios from "axios";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getSingleCar } from "lib/api";

import { useState } from "react";

export default function carDetails() {
	const router = useRouter();
	const { slug } = router.query;

	const [currentImage, setCurrentImage] = useState(0);

	const fetcher = async () => {
		const data = await getSingleCar(slug);
		console.log(data);

		return data;
	};

	function useSingleCars() {
		const { data, error } = useSWR(
			slug ? `/api/getCars?slug=${slug}` : null,
			fetcher
		);
		return {
			cars: data,
			isLoading: !error && !data,
			isError: error,
		};
	}

	const { cars, isLoading, isError } = useSingleCars();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Layout>
			<main>
				<div className="grid grid-cols-1 md:grid-cols-2">
					<div>
						<div></div>
						<div></div>
					</div>
					<div></div>
				</div>
			</main>
		</Layout>
	);
}
