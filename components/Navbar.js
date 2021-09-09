import logo from "public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { IoIosCall } from "react-icons/io";

export default function Navbar() {
	return (
		<div className="p-4 bg-black">
			<div className="flex items-center justify-center  md:justify-between max-w-7xl m-auto">
				<Link href="/">
					<a className="w-48 ">
						<Image src={logo} width={484} height={61} className="text-white" />
					</a>
				</Link>
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
