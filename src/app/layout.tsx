import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui-components/Header.component";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Relix | Your Favorite Movie WebSite",
	description: "Relix, where you find the best movies at the moment!"
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<body className={`${inter.className} scrollbar-hide`}>
				<ThemeProvider
					attribute={"class"}
					defaultTheme="dark"
					enableSystem={false}
					disableTransitionOnChange>
					<Header />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

