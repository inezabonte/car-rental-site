import Layout from "@/components/Layout";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import { Badge } from "@chakra-ui/react";
import { RiInformationFill } from "react-icons/ri";
import Loading from "@/components/Loading";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
	const fetcher = async () => {
		const { data } = await axios.get("api/get-cars?q=rent");

		return data;
	};

	function useCars() {
		const { data, error } = useSWR("homedata", fetcher);
		return {
			cars: data,
			isLoading: !error && !data,
			isError: error,
		};
	}

	const { cars, isLoading, isError } = useCars();

	if (isError) return <div>{isError}</div>;

	if (isLoading) return <Loading />;

	return (
		<Layout>
			<Header />
			<main className="p-4 max-w-md md:max-w-7xl  mx-auto mt-6">
				<div className="grid grid-cols-1 md:grid-cols-3  gap-6 place-content-center">
					{cars.map((car) => (
						<div key={car.slug} className="bg-white rounded shadow">
							<div>
								<Image src={car.coverImage} width={1040} height={780} />
							</div>
							<div className="p-4 space-y-4">
								<div>
									<h2 className="text-lg font-semibold">{car.name}</h2>
									<Badge colorScheme={car.available ? "green" : "orange"}>
										{car.available ? "Available" : "Rented"}
									</Badge>
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
								<div className="flex justify-between">
									<div className="flex flex-col">
										<span className="font-bold text-xl">
											${car.price.toFixed(2)}
										</span>
										<span className="text-sm text-gray-600 font-bold">
											per day
										</span>
									</div>
									<Link href={`/rent-car/${car.slug}`}>
										<a className="bg-red-600 px-2 rounded text-white text-sm font-black flex items-center uppercase">
											Book Now
										</a>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</main>
		</Layout>
	);
}
