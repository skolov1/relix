import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SearchResult } from "@/lib/types";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchBar() {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const searchRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const router = useRouter();

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setSearchResults([]);
				setIsFocused(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		if (!searchTerm.trim()) {
			setSearchResults([]);
			return;
		}

		const search = async () => {
			setIsSearching(true);
			try {
				const response = await fetch(
					`/api/search?query=${encodeURIComponent(searchTerm)}`,
				);
				const data = await response.json();
				setSearchResults(data.results.slice(0, 5));
			} catch (error) {
				console.error("Erro na busca:", error);
				setSearchResults([]);
			} finally {
				setIsSearching(false);
			}
		};

		const timer = setTimeout(search, 500);
		return () => clearTimeout(timer);
	}, [searchTerm]);

	const clearSearch = () => {
		setSearchTerm("");
		setSearchResults([]);
		inputRef.current?.focus();
	};

	const handleSearchSubmit = () => {
		if (searchTerm.trim()) {
			router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
			setSearchResults([]);
			setIsFocused(false);
		}
	};

	return (
		<div
			className="ml-auto flex items-center"
			ref={searchRef}>
			<motion.div
				className="flex items-center relative"
				animate={{
					width: isFocused ? "16rem" : "10rem",
				}}
				transition={{ duration: 0.2, ease: "easeOut" }}>
				<div className="relative flex items-center w-full">
					<Input
						ref={inputRef}
						type="search"
						placeholder="Buscar..."
						className="w-full bg-background/50 border-border pr-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						onFocus={() => setIsFocused(true)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSearchSubmit();
							}
						}}
					/>

					{searchTerm && (
						<button
							className="absolute right-10 text-muted-foreground hover:text-foreground"
							onClick={clearSearch}>
							<X className="h-4 w-4" />
						</button>
					)}

					<Button
						variant="ghost"
						size="icon"
						className="absolute right-0"
						onClick={handleSearchSubmit}
						disabled={!searchTerm.trim()}>
						<Search className="h-4 w-4" />
					</Button>
				</div>

				{isFocused && (searchResults.length > 0 || isSearching) && (
					<div className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-lg z-50 px-4 py-2">
						{isSearching ? (
							<div className="px-4 py-2 text-center">
								Buscando...
							</div>
						) : (
							<div className="space-y-2">
								{searchResults.map((result) => (
									<Link
										key={result.id}
										href={`/${
											result.mediaType === "movie"
												? "movie"
												: "series"
										}/${result.id}`}
										className="flex items-center px-4 py-4 bg-border/5 hover:bg-accent rounded-lg"
										onClick={() => {
											setIsFocused(false);
											clearSearch();
										}}>
										{result.poster_path ? (
											<img
												src={`https://image.tmdb.org/t/p/w45${result.poster_path}`}
												alt={result.title}
												className="w-8 h-12 object-cover rounded mr-2"
											/>
										) : (
											<div className="w-8 h-12 bg-gray-700 rounded mr-2 flex items-center justify-center">
												<span className="text-xs">
													?
												</span>
											</div>
										)}
										<div className="flex-1 min-w-0">
											<p className="truncate text-sm font-medium">
												{result.title}
											</p>
											<p className="text-xs text-muted-foreground">
												{result.mediaType === "movie"
													? result.release_date?.split(
															"-",
													  )[0] || "Filme"
													: result.first_air_date?.split(
															"-",
													  )[0] || "Série"}
											</p>
										</div>
									</Link>
								))}
								<div className="pt-2 border-t border-border">
									<Button
										variant="link"
										className="w-full text-center"
										onClick={handleSearchSubmit}>
										Ver todos os resultados
									</Button>
								</div>
							</div>
						)}
					</div>
				)}
			</motion.div>
		</div>
	);
}
