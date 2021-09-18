import Layout from "@/components/Layout";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getSingleSaleCar } from "lib/api";
import { useState } from "react";
import Header from "@/components/Header";
import { IoMdMail, IoIosCall } from "react-icons/io";

export default function carDetails() {
	const router = useRouter();
	const { slug } = router.query;

	const [currentImage, setCurrentImage] = useState(0);

	const fetcher = async () => {
		const data = await getSingleSaleCar(slug);

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

	const currencyFormatter = new Intl.NumberFormat(`en-US`, {
		style: "currency",
		currency: "FRW",
	});

	return (
		<Layout>
			<Header title={car.name} />
			<main className="m-auto max-w-7xl space-y-6 p-2">
				<div className="grid grid-cols-1 md:grid-cols-2 place-content-center gap-6 bg-white p-4 md:p-6">
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
								<div className="flex ">
									<span className="font-black text-2xl">
										{currencyFormatter.format(car.sellingPrice)}
									</span>
								</div>
							</div>

							<div>
								<span className="text-lg font-bold ">Features</span>
								<div className="flex flex-col divide-y lg:flex-row lg:divide-y-0 lg:divide-x ">
									<div className="flex lg:flex-col justify-between p-2">
										<span className="font-semibold text-gray-500">Year</span>
										<span className="font-bold">{car.year}</span>
									</div>
									<div className="flex lg:flex-col justify-between p-2">
										<span className="font-semibold text-gray-500">Fuel</span>
										<span className="font-bold capitalize">{car.fuel}</span>
									</div>
									<div className="flex lg:flex-col justify-between p-2">
										<span className="font-semibold text-gray-500">
											Transmission
										</span>
										<span className="font-bold capitalize">
											{car.transmission}
										</span>
									</div>
								</div>
							</div>

							<div className="">
								<p className="mr-2">For more info contact us on </p>
								<div className="flex flex-col">
									<div className="flex space-x-2 items-center">
										<IoIosCall className="w-5 h-5" />
										<a href="tel:+250787811900" className="font-semibold">
											+250 787 811 900
										</a>
									</div>
									<div className="flex space-x-2 items-center">
										<IoMdMail className="w-5 h-5" />
										<a
											href="mailto:dasilvacarsrw@gmail.com"
											className="font-semibold"
										>
											dasilvacarsrw@gmail.com
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
}
