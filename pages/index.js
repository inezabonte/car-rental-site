import Layout from "@/components/Layout";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import { Badge } from "@chakra-ui/react";
import { BiGasPump } from "react-icons/bi";
import { HiOutlineUserGroup } from "react-icons/hi";
import Loading from "@/components/Loading";
import Link from "next/link";

export default function Home() {
	const fetcher = async () => {
		const { data } = await axios.get("api/getCars");

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
			<main className="p-4 max-w-md md:max-w-7xl  m-auto">
				<div className="grid grid-cols-1 md:grid-cols-3  gap-6 place-content-center">
					{cars.map((car) => (
						<div key={car.slug} className="bg-white rounded shadow">
							<div>
								<Image src={car.coverImage} width={1040} height={780} />
							</div>
							<div className="p-4 space-y-4">
								<div>
									<h2 className="text-lg font-bold">{car.name}</h2>
									<Badge colorScheme={car.available ? "green" : "orange"}>
										{car.available ? "Available" : "Rented"}
									</Badge>
								</div>
								<div className="text-gray-500">
									<span className="text-xs font-medium ">Features</span>
									<div className="flex space-x-4">
										<div className="flex items-center space-x-2">
											<HiOutlineUserGroup />
											<span className="text-xs font-medium text-black">
												{car.seats}
											</span>
										</div>
										<div className="flex items-center space-x-2">
											<BiGasPump />
											<span className="text-xs font-medium text-black capitalize">
												{car.fuel}
											</span>
										</div>
									</div>
								</div>
								<div className="flex justify-between">
									<div className="flex flex-col">
										<span className="font-bold text-lg">
											${car.price.toFixed(2)}
										</span>
										<span className="text-xs text-gray-500">per day</span>
									</div>
									<Link href={`/car/${car.slug}`}>
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
