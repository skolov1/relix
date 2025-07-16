import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TvShow } from "@/lib/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TvShowCarousel({ tvshow = [] }: { tvshow: TvShow[] }) {
  return (
    <div className="w-full max-w-6xl 2xl:max-w-7xl mx-auto">
      <Carousel className="w-full">
        <CarouselContent>
          {tvshow.map((tvshow) => (
            <CarouselItem key={tvshow.id}>
              <Link href={`/series/${tvshow.id}`}>
                <div className="p-1">
                  <Card className="overflow-hidden">
                    {" "}
                    <CardContent className="relative aspect-video p-0">
                      <Image
                        src={`https://image.tmdb.org/t/p/w1280${tvshow.backdrop_path}`}
                        alt={tvshow.name}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8 bg-gradient-to-r from-zinc-900 to-transparent">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                          {tvshow.name}
                        </h1>
                        <p className="text-sm text-white/80 mt-2 line-clamp-3 max-w-lg drop-shadow-lg">
                          {tvshow.overview}
                        </p>
                        <span className="text-xs text-amber-400 font-semibold mt-4 flex items-center gap-x-2">
                          <Star className="fill-amber-400" />{" "}
                          {tvshow.vote_average.toFixed(1)}
                        </span>
                        <div className="pt-5"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
    </div>
  );
}
