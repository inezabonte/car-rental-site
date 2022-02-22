import Layout from "@/components/Layout";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import { getSingleRentCar, getCarsSlugs } from "lib/api";
import { useState } from "react";
import { Badge } from "@chakra-ui/react";
import Header from "@/components/Header";
import { RiInformationFill } from "react-icons/ri";

export default function carDetails({ fallback }) {
	const router = useRouter();
	const { slug } = router.query;

	if (router.isFallback) {
		return <Loading />;
	}

	const [currentImage, setCurrentImage] = useState(0);

	const fetcher = async () => {
		const data = await getSingleRentCar(slug);

		return data[0];
	};

	function useSingleCars() {
		const { data, error } = useSWR(
			slug ? `/api/get-cars?slug=${slug}` : null,
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
		<SWRConfig vlaue={fallback}>
			<Layout>
				<Header title={car.name} />
				<main className="m-auto max-w-7xl space-y-6 p-2">
					<div className="grid grid-cols-1 md:grid-cols-2 place-content-center gap-6 bg-white p-4 md:p-6">
						<div className="space-y-6">
							<h1 className="text-3xl font-bold">{car.name}</h1>
							<div>
								<Image
									src={car.images[currentImage]}
									width={1040}
									height={780}
								/>
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
									<div className="flex ">
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
								<div>
									<span className="text-lg font-bold ">Features</span>
									<div className="flex flex-col">
										<div className="flex items-center space-x-2">
											<span>Seats: </span>
											<span className="font-medium text-black">
												{car.seats}
											</span>
										</div>
										<div className="flex items-center space-x-2">
											<span>Fuel: </span>
											<span className="font-medium text-black capitalize">
												{car.fuel}
											</span>
										</div>
										<div className="flex items-center space-x-2">
											<span>Transmission: </span>
											<span className="font-medium text-black capitalize">
												{car.transmission}
											</span>
										</div>
									</div>
								</div>
								<div className="space-y-2 bg-blue-100 rounded p-2">
									<div className="flex text-blue-600 items-center">
										<RiInformationFill className="w-5 h-5" />
										<span className="font-bold text-sm">Caution Fee</span>
									</div>
									<div className="flex space-x-4">
										<div className="flex flex-col">
											<span className="font-medium text-gray-600 text-sm">
												1 day
											</span>
											<span className="font-semibold">$100.00</span>
										</div>
										<div className="flex flex-col">
											<span className="font-medium text-sm text-gray-600">
												More days
											</span>
											<span className="font-semibold">$200.00</span>
										</div>
									</div>
								</div>
								<div className="flex flex-wrap">
									<p className="mr-2">For more info contact us on </p>
									<a href="tel:+250787811900" className="font-semibold">
										{" "}
										(999) 999-9999
									</a>
								</div>
							</div>
						</div>
					</div>
				</main>
			</Layout>
		</SWRConfig>
	);
}

export async function getStaticProps({ params }) {
	const car = await getSingleRentCar(params.slug);

	return {
		props: {
			fallback: {
				[`/api/get-cars?slug=${params.slug}`]: car,
			},
		},
		revalidate: 1,
	};
}

export async function getStaticPaths() {
	const paths = await getCarsSlugs();

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: true,
	};
}
