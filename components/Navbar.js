import logo from "public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { IoIosCall } from "react-icons/io";
import { useRouter } from "next/router";

export default function Navbar() {
	const router = useRouter();

	return (
		<div className="p-4 bg-black">
			<div className="flex flex-col items-center justify-center md:flex-row  md:justify-between max-w-7xl m-auto">
				<Link href="/">
					<a className="w-48 ">
						<Image src={logo} width={484} height={61} className="text-white" />
					</a>
				</Link>
				<div className="flex justify-center  space-x-4">
					<Link href="/">
						<a
							className={` p-2  font-semibold text-white ${
								router.pathname == "/" ? "border-b-2" : ""
							}`}
						>
							Cars for rent
						</a>
					</Link>

					<Link href="/buy-car">
						<a
							className={` p-2  font-semibold text-white ${
								router.pathname == "/buy-car" ? "border-b-2" : ""
							}`}
						>
							Cars for sale
						</a>
					</Link>
				</div>
				<div className="text-white md:flex items-center space-x-2 p hidden">
					<IoIosCall className="w-6 h-6" />
					<a href="tel:+250787811900" className="font-bold">
						+250 787 811 900
					</a>
				</div>
			</div>
		</div>
	);
}
