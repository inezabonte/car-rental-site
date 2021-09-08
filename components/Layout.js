import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
	return (
		<div className="m-auto flex flex-col min-h-screen bg-gray-100">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
