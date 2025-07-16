export interface Movie {
  translations: Translations;
  id: number;
  title: string;
  release_date: string;
  original_language: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  runtime: number;
  genres: Genre[];
}

interface Translations {
  translation: string[];
}

interface Genre {
  id: number;
  name: string;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export interface TvShow {
  id: number;
  name: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre: Genre[];
  number_of_seasons: number;
  first_air_date: string | number;
  in_production: boolean;
  last_episode_to_air: LastEpisode[];
}

interface LastEpisode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  runtime: number;
  air_date: string;
}

export interface TMDBTvShowResponse {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}
