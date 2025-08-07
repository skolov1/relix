"use client";

import Link from "next/link";
import SearchBar from "./SearchBar.component";

export default function Header() {
	return (
		<nav className="h-16 border-b border-b-zinc-800 flex items-center sticky top-0 z-50 bg-background">
			<div className="grid grid-cols-3 px-4 xl:container xl:mx-auto w-full">
				<div className="w-28">
					<Link href={"/"}>
						<img
							className="h-16"
							src="/images/RELI2.svg"
							alt="Logo"
						/>
					</Link>
				</div>
				<div className="flex justify-evenly items-center">
					<Link
						className="hover:text-primary transition-colors"
						href="/">
						Filmes
					</Link>
					<Link
						className="hover:text-primary transition-colors"
						href="/series">
						Series
					</Link>
					<Link
						className="hover:text-primary transition-colors"
						href="/iptv">
						TV
					</Link>
				</div>
				<SearchBar />
			</div>
		</nav>
	);
}
