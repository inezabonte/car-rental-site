import Layout from "@/components/Layout";
import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import Loading from "@/components/Loading";
import Link from "next/link";
import Header from "@/components/Header";

export default function Buy() {
	const fetcher = async () => {
		const { data } = await axios.get("api/get-cars?q=buy");

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

	const currencyFormatter = new Intl.NumberFormat(`en-US`, {
		style: "currency",
		currency: "FRW",
	});

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
								</div>

								<div className="flex flex-col ">
									<div className="space-x-2">
										<span className="font-semibold text-gray-500">Year</span>
										<span className="font-bold">{car.year}</span>
									</div>
									<div className="space-x-2">
										<span className="font-semibold text-gray-500">Fuel</span>
										<span className="font-bold capitalize">{car.fuel}</span>
									</div>
									<div className="space-x-2">
										<span className="font-semibold text-gray-500">
											Transmission
										</span>
										<span className="font-bold capitalize">
											{car.transmission}
										</span>
									</div>
								</div>

								<div className="flex justify-between items-center">
									<div className="flex flex-col">
										<span className="font-bold text-xl text-blue-600">
											{currencyFormatter.format(car.sellingPrice)}
										</span>
									</div>
								</div>
							</div>
							<Link href={`/buy-car/${car.slug}`}>
								<a className="bg-blue-600 text-white p-4 text-sm font-black flex justify-center uppercase">
									Details
								</a>
							</Link>
						</div>
					))}
				</div>
			</main>
		</Layout>
	);
}
