"use client";

import {
	getOnAirTvShow,
	getPopularTvShow,
	getTopRatedTvShows,
	getTrendingTvShow,
} from "@/lib/api";
import { useEffect, useState } from "react";
import { TvShow } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { TvShowCard } from "../ui-components/TvShowCard.component";
import TvShowCarousel from "../ui-components/TvShowCarousel.component";

export default function Home() {
	const [topRatedTvShows, setTopRatedTvShow] = useState<TvShow[]>([]);
	const [trendingTvShow, setTrendingTvShow] = useState<TvShow[]>([]);
	const [popularTvShow, setPopularTvShow] = useState<TvShow[]>([]);
	const [onAirTvShow, setOnAirTvShow] = useState<TvShow[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTvShows = async () => {
			try {
				const [topRatedShow, trending, popular, onTheAir] =
					await Promise.all([
						getTopRatedTvShows(),
						getTrendingTvShow(),
						getPopularTvShow(),
						getOnAirTvShow(),
					]);

				setTrendingTvShow(trending.slice(0, 8));
				setTopRatedTvShow(topRatedShow.slice(0, 8));
				setPopularTvShow(popular.slice(0, 8));
				setOnAirTvShow(onTheAir.slice(0, 8));
			} catch (err) {
				console.error(err, "obtivemos um erro.");
			} finally {
				setIsLoading(false);
			}
		};
		fetchTvShows();
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
		<main className="bg-background text-foreground pb-12">
			<div className="py-4 px-2 xl:container xl:mx-auto xl:w-full">
				<TvShowCarousel tvshow={trendingTvShow} />
			</div>
			<hr className="border-zinc-800 mx-12" />
			<div className="mx-12">
				<div className="py-4">
					<h1 className="text-3xl text-foreground font-bold">
						🏆 | Mais Bem Avaliados
					</h1>
				</div>
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-5 space-y-4">
					{topRatedTvShows.map((tvshow) => (
						<TvShowCard
							key={tvshow.id}
							tvshow={tvshow}
						/>
					))}
				</div>
				<hr className="border-zinc-800 mt-5" />
				<div className="py-4">
					<h1 className="text-3xl text-foreground font-bold">
						🇧🇷 | Mais Populares no Brasil
					</h1>
				</div>
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-5">
					{popularTvShow.map((tvshow) => (
						<TvShowCard
							key={tvshow.id}
							tvshow={tvshow}
						/>
					))}
				</div>
				<hr className="border-zinc-800 mt-5" />
				<div className="py-4">
					<h1 className="text-3xl text-foreground font-bold">
						🇧🇷 | No Ar Atualmente
					</h1>
				</div>
				<div className="grid grid-cols-3 2xl:grid-cols-4 gap-5">
					{onAirTvShow.map((tvshow) => (
						<TvShowCard
							key={tvshow.id}
							tvshow={tvshow}
						/>
					))}
				</div>
			</div>
		</main>
	);
}
