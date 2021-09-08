import logo from "public/images/logo.svg";
import Image from "next/image";

export default function Navbar() {
	return (
		<div className="flex justify-center">
			<Image src={logo} width={80} height={80} className="text-white" />
		</div>
	);
}
