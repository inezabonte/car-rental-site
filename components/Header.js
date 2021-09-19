import Head from "next/head";

const coverImage =
	"https://res.cloudinary.com/tizzertuna/image/upload/v1632051031/Web_1280_1_2x_y1uoqb.png";
const description = "Buy or rent cars at an affordable price in Rwanda";

export default function Header({ title }) {
	return (
		<Head>
			<title>{title ? title : "Da Silva Cars"}</title>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
			<meta property="og:title" content={title ? title : "Da Silva Cars"} />
			<meta property="og:image" content={coverImage} />
			<meta property="og:description" content={description} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={coverImage} />
			<meta name="twitter:image:alt" content="Da Silva Cars" />
		</Head>
	);
}
