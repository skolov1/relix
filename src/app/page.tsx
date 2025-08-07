"use client";

import {
	getPopularInBrazil,
	getTopRatedMovies,
	getTrendingMovies,
	getUpcoming,
} from "@/lib/api";
import MovieCarousel from "./ui-components/Movie-Carousel.component";
import { MovieCard } from "./ui-components/Movie-Card.component";
import { useEffect, useState } from "react";
import { Movie } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
	const [popularBrazilMovies, setPopularBrazilMovies] = useState<Movie[]>([]);
	const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
	const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
	const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const [localMovies, topRated, trending, upcoming] =
					await Promise.all([
						getPopularInBrazil(),
						getTopRatedMovies(),
						getTrendingMovies(),
						getUpcoming(),
					]);

				setPopularBrazilMovies(localMovies.slice(0, 8));
				setTopRatedMovies(topRated.slice(0, 8));
				setTrendingMovies(trending.slice(0, 8));
				setUpcomingMovies(upcoming.slice(0, 8));
			} catch (err) {
				console.error(err, "obtivemos um erro.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchMovies();
	}, []);

	if (isLoading) {
		return (
			<main className="py-6 px-4">
				<div className="max-w-6xl 2xl:max-w-7xl mx-auto py-6">
					<Skeleton className="w-full h-[500px]" />
				</div>
				<hr className="border-zinc-800 mx-12" />
				<div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6">
					{Array.from({ length: 8 }).map((_, index) => (
						<Skeleton
							key={index}
							className="h-40 w-full rounded-lg"
						/>
					))}
				</div>
			</main>
		);
	}

	return (
		<main className="bg-background text-foreground pb-12 z-0">
			<div className="py-4 px-2 xl:container xl:mx-auto xl:w-full">
				<MovieCarousel movies={trendingMovies} />
			</div>
			<hr className="border-zinc-800 mx-12" />
			<div className="mx-12">
				<div className="py-4">
					<h1 className="text-3xl text-foreground font-bold">
						🏆 | Mais Bem Avaliados
					</h1>
				</div>
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-5">
					{topRatedMovies.map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
						/>
					))}
				</div>
				<hr className="border-zinc-800 mt-5" />

				<div className="py-4">
					<h1 className="text-3xl text-foreground font-bold">
						🇧🇷 | Mais populares no Brasil
					</h1>
				</div>
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-5">
					{popularBrazilMovies.map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
						/>
					))}
				</div>
				<hr className="border-zinc-800 mt-5" />
				<div className="py-4">
					<h1 className="text-3xl text-foreground font-bold">
						| Filmes prestes a serem lançados
					</h1>
				</div>
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-5">
					{upcomingMovies.map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
						/>
					))}
				</div>
				<hr className="border-zinc-800 mt-5" />
			</div>
		</main>
	);
}
