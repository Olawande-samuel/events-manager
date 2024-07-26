import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Evently",
	description: "World best event management system",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ReactQueryProvider>
					{children}
					<Toaster
						duration={3500}
						position="top-right"
						toastOptions={{
							classNames: {
								error: "bg-red-500 text-white",
								success: "bg-green-400 text-white",
								warning: "text-yellow-400",
								info: "bg-blue-400",
							},
						}}
					/>
				</ReactQueryProvider>
			</body>
		</html>
	);
}
