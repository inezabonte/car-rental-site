import Image from "next/image";
import dasilvaLogo from "public/images/logo.svg";

export default function Loading() {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<Image src={dasilvaLogo} width={300} height={300} />
		</div>
	);
}
