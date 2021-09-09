import Head from "next/head";

export default function Header({ title }) {
	return (
		<Head>
			<title>{title ? title : "Da Silva Cars"}</title>
		</Head>
	);
}
