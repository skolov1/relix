import { TvShow } from "@/lib/types";
import { Star, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/*  const languageFlags: { [key: string]: string } = {
  en: "🇺🇸",
  pt: "🇧🇷",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  ja: "🇯🇵",
  ko: "🇰🇷",
  zh: "🇨🇳",
  hi: "🇮🇳",
}; */

export const TvShowCard = ({ tvshow }: { tvshow: TvShow }) => {
  if (!tvshow.backdrop_path) {
    return null;
  }

  const cardData = {
    title: tvshow.name,
    description: tvshow.overview,
    rating: tvshow.vote_average.toFixed(1),
    releaseYear: tvshow.first_air_date
      ? new Date(tvshow.release_date).getFullYear()
      : "N/A",
  };

  return (
    <Link
      href={`/series/${tvshow.id}`}
      className="group block rounded-xl dark:bg-zinc-950 bg-zinc-100 overflow-hidden border border-zinc-800/50 shadow-md hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video">
        <Image
          fill
          className="object-cover transition-transform duration-300"
          src={`https://image.tmdb.org/t/p/w780${tvshow.backdrop_path}`}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
          alt={`Pôster do filme ${cardData.title}`}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle className="w-16 h-16 text-white/80 mb-4" />
          <h3 className="font-bold text-xl text-white drop-shadow-lg">
            {cardData.title}
          </h3>
          <span className="mt-4 px-4 py-2 rounded-full bg-blue-600 text-white font-semibold text-sm">
            Ver Detalhes
          </span>
        </div>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-bold tracking-tight text-gray-900 dark:text-gray-100 overflow-hidden truncate">
            {cardData.title}
          </h3>
          <div className="flex items-center gap-x-2 flex-shrink-0">
            <p className="flex font-bold text-gray-900 dark:text-gray-100">
              {cardData.rating}
            </p>
            <Star className="fill-amber-400 text-amber-400 w-5 h-5" />
          </div>
        </div>
        <hr className="my-2 border-zinc-300 dark:border-zinc-800" />
        <p className="text-xs leading-5 line-clamp-3 text-gray-700 dark:text-gray-400">
          {cardData.description}
        </p>
      </div>
    </Link>
  );
};
