import Image from "next/image";
import dasilvaLogo from "public/images/logo-black.png";

export default function Loading() {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="w-72">
				<Image src={dasilvaLogo} width={484} height={61} />
			</div>
		</div>
	);
}
