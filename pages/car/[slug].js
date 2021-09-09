import Layout from "@/components/Layout";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getSingleCar } from "lib/api";
import { useState } from "react";
import { Badge } from "@chakra-ui/react";
import { BiGasPump } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import Link from "next/link";
import Header from "@/components/Header";

export default function carDetails() {
	const router = useRouter();
	const { slug } = router.query;

	const [currentImage, setCurrentImage] = useState(0);

	const fetcher = async () => {
		const data = await getSingleCar(slug);

		return data[0];
	};

	function useSingleCars() {
		const { data, error } = useSWR(
			slug ? `/api/getCars?slug=${slug}` : null,
			fetcher
		);
		return {
			car: data,
			isLoading: !error && !data,
			isError: error,
		};
	}

	const { car, isLoading } = useSingleCars();

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Layout>
			<Header title={car.name} />
			<main className="m-auto max-w-7xl space-y-6 p-2">
				<Link href="/">
					<a className="text-blue-600 underline">← Home</a>
				</Link>

				<div className="grid grid-cols-1 md:grid-cols-2 place-content-center gap-6 bg-white p-6">
					<div className="space-y-6">
						<h1 className="text-3xl font-bold">{car.name}</h1>
						<div>
							<Image src={car.images[currentImage]} width={1040} height={780} />
						</div>
						<div className="flex flex-wrap">
							{car.images.map((image, index) => (
								<div
									key={index}
									className={`w-16 h-16  md:w-24 md:h-24 ${
										index === currentImage
											? "opacity-100 border-2 border-blue-400"
											: "opacity-70"
									} m-2 `}
								>
									<Image
										src={image}
										width={100}
										height={100}
										className="object-cover"
										onClick={() => setCurrentImage(index)}
									/>
								</div>
							))}
						</div>
					</div>
					<div>
						<div className="space-y-4">
							<div>
								<div className="flex">
									<span className="font-black text-2xl">
										${car.price.toFixed(2)}/
									</span>

									<span className="text-2xl text-gray-500 font-bold">
										per day
									</span>
								</div>
							</div>
							<div>
								<Badge colorScheme={car.available ? "green" : "orange"}>
									{car.available ? "Available" : "Rented"}
								</Badge>
							</div>
							<div className="text-gray-500">
								<span className="text-xl font-bold ">Features</span>
								<div className="flex space-x-4">
									<div className="flex items-center space-x-2">
										<HiOutlineUserGroup className="w-6 h-6" />
										<span className="text-lg font-medium text-black">
											{car.seats}
										</span>
									</div>
									<div className="flex items-center space-x-2">
										<BiGasPump className="w-6 h-6" />
										<span className="text-lg font-medium text-black capitalize">
											{car.fuel}
										</span>
									</div>
								</div>
							</div>
							<div>
								<p className="font-bold text-lg text-red-700">
									For more details contact us on: +250 787 811 900
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
}
