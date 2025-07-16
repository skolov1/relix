import { getMovieDetails } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const movieId = params.id;
  const movie = await getMovieDetails(movieId);

  if (!movie) {
    notFound();
  }

  const trailer = movie.videos?.results.find(
    (video: any) => video.site === "YouTube" && video.type === "Trailer",
  );
  const trailerKey = trailer?.key;

  const watchProviders = movie["watch/providers"]?.results?.BR;
  const streamingServices = watchProviders?.flatrate || [];

  const rating = movie.vote_average.toFixed(1);

  return (
    <main className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={`Pôster de fundo do filme ${movie.title}`}
          fill
          className="opacity-30 blur-md object-cover"
        />
        <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col items-center lg:items-start gap-8">
          <div className="w-full max-w-[300px] md:max-w-[350px]">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`Pôster do filme ${movie.title}`}
              width={500}
              height={750}
              className="rounded-lg shadow-2xl shadow-blue-500/20 w-full h-auto"
            />
          </div>

          <div className="w-full flex flex-col gap-4 text-white text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-lg italic text-neutral-400">
                &quot;{movie.tagline}&quot;
              </p>
            )}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <Badge variant="secondary" className="text-base gap-1">
                <Star className="fill-amber-400 stroke-amber-400 w-4 h-4" />{" "}
                {rating}
              </Badge>
              <span className="text-neutral-300">
                {movie.release_date.split("-")[0]}
              </span>
              <span className="text-neutral-300">{`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`}</span>
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-2">
              {movie.genres.map((genre: any) => (
                <Badge
                  key={genre.id}
                  variant="outline"
                  className="border-blue-500/50 text-blue-300"
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
            <h2 className="text-2xl font-semibold mt-6 border-b-2 border-blue-500/50 pb-2 w-1/5 mx-auto lg:mx-0">
              Sinopse
            </h2>
            <p className="text-neutral-300 text-lg leading-relaxed w-4/5 mx-auto lg:mx-0">
              {movie.overview}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {trailerKey && (
            <div>
              <h2 className="flex w-1/4 mx-auto text-2xl font-semibold mb-4 border-b-2 border-blue-500/50 pb-2 justify-center">
                Trailer Oficial
              </h2>
              <div className="aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Trailer do filme"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
          )}

          {streamingServices.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-500/50 pb-2">
                Onde Assistir (Assinatura)
              </h2>
              <div className="flex flex-wrap gap-4">
                {streamingServices.map((provider: any) => (
                  <a
                    key={provider.provider_id}
                    href={watchProviders?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                      alt={provider.provider_name}
                      width={80}
                      height={80}
                      className="rounded-xl transition-transform duration-200 group-hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
