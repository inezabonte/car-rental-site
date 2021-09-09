import logo from "public/images/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
	return (
		<div className="flex justify-center">
			<Link href="/">
				<a>
					<Image src={logo} width={80} height={80} className="text-white" />
				</a>
			</Link>
		</div>
	);
}
