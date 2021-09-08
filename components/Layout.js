import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
	return (
		<div className="m-auto flex flex-col min-h-screen bg-gray-100">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}
