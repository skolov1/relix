"use client";

import { useState } from "react";
import Image from "next/image";

interface MediaEmbedProps {
	id: string;
	mediaType: "movie" | "tv";
}

const embedOptions = [
	{
		id: "warezcdn",
		name: "WarezCDN",
		icon: "/icons/warezcdn.svg",
		embedUrl: (id: string, mediaType: "movie" | "tv") =>
			mediaType === "movie"
				? `https://embed.warezcdn.com/filme/${id}`
				: `https://embed.warezcdn.com/serie/${id}`,
	},
	{
		id: "superflix",
		name: "Superflix",
		icon: "/icons/superflixapi.png",
		embedUrl: (id: string, mediaType: "movie" | "tv") =>
			mediaType === "movie"
				? `https://superflixapi.digital/filme/${id}`
				: `https://superflixapi.digital/serie/${id}`,
	},
	{
		id: "embedder",
		name: "Embedder",
		icon: "/icons/embedderapi.png",
		embedUrl: (id: string, mediaType: "movie" | "tv") =>
			mediaType === "movie"
				? `https://embedder.net/e/${id}/1/1`
				: `https://embedder.net/e/${id}/1/1`,
	},
	{
		id: "vidsrc",
		name: "VidSrc",
		icon: "/icons/vidsrc-logo-light.svg",
		embedUrl: (id: string, mediaType: "movie" | "tv") =>
			mediaType === "movie"
				? `https://vidsrc.xyz/embed/movie/${id}`
				: `https://vidsrc.xyz/embed/tv/${id}`,
	},
	{
		id: "embed-api",
		name: "Embed-API",
		icon: "/icons/vidsrc-logo-light.svg",
		embedUrl: (id: string, mediaType: "movie" | "tv") =>
			mediaType === "movie"
				? `https://player.embed-api.stream/?id=${id}`
				: `https://player.embed-api.stream/?id=${id}&s=1&e=1`,
	},
];

export function EmbedSelector({ id, mediaType }: MediaEmbedProps) {
	const [selectedProvider, setSelectedProvider] = useState(
		embedOptions[0].id,
	);

	const selectedEmbed = embedOptions.find(
		(opt) => opt.id === selectedProvider,
	);

	return (
		<div className="w-full">
			<div className="aspect-video mb-4">
				{selectedEmbed && (
					<iframe
						src={selectedEmbed.embedUrl(id, mediaType)}
						title={`Assistir ${
							mediaType === "movie" ? "filme" : "série"
						}`}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="w-full h-full rounded-lg"
					/>
				)}
			</div>

			<div className="grid grid-cols-5 justify-center gap-3">
				{embedOptions.map((provider) => (
					<button
						key={provider.id}
						onClick={() => setSelectedProvider(provider.id)}
						className={`flex flex-col items-center p-2 rounded-lg transition-all ${
							selectedProvider === provider.id
								? "bg-blue-600 border-2 border-blue-400"
								: "bg-gray-800 hover:bg-gray-700 border-2 border-transparent"
						}`}>
						<Image
							src={provider.icon}
							alt={provider.name}
							width={60}
							height={60}
							className="w-12 h-12 object-contain bg-background/25 p-2 rounded-full"
						/>
						<span className="text-xs mt-1 text-white/80">
							{provider.name}
						</span>
					</button>
				))}
			</div>
		</div>
	);
}
