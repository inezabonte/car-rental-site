import Image from "next/image";
import dasilvaLogo from "public/images/logo-black.png";
import Header from "./Header";

export default function Loading() {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<Header />
			<div className="w-72">
				<Image src={dasilvaLogo} width={484} height={61} />
			</div>
		</div>
	);
}
