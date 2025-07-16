import { Movie, TMDBResponse, TMDBTvShowResponse, TvShow } from "./types";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// --- movies section ---

export const getTrendingMovies = async (): Promise<Movie[]> => {
  const url = `${TMDB_BASE_URL}/trending/movie/week?language=pt-BR`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_TOKEN}`,
    },
    next: {
      revalidate: 86400,
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: TMDBResponse = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Erro ao buscar filmes em alta:", err);
    return [];
  }
};

export const getTopRatedMovies = async (): Promise<Movie[]> => {
  const url = `${TMDB_BASE_URL}/movie/top_rated?language=pt-BR&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_TOKEN}`,
    },
    next: {
      revalidate: 86400,
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data: TMDBResponse = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("erro ao buscar filmes mais bem avaliados:", err);
    return [];
  }
};

export const getPopularInBrazil = async (): Promise<Movie[]> => {
  const url = `${TMDB_BASE_URL}/movie/popular?language=pt-BR&page=1&region=br`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_TOKEN}`,
    },
    next: {
      revalidate: 86400,
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data: TMDBResponse = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("error ao buscar filmes mais populares nessa região:", err);
    return [];
  }
};

export const getUpcoming = async (): Promise<Movie[]> => {
  const url = `${TMDB_BASE_URL}/movie/upcoming?language=pt-BR&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_TOKEN}`,
    },
    next: {
      revalidate: 86400,
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data: TMDBResponse = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("erro ao buscar filmes em lançamento: ", err);
    return [];
  }
};

/**
 * buscar detalhes de um filme especifico
 * @param movieId = id do filme a ser buscado
 * @returns uma promise que resolve os dados detalhados dos filmes
 */
export async function getMovieDetails(movieId: string | number) {
  const url = `${TMDB_BASE_URL}/movie/${movieId}`;

  const params = new URLSearchParams({
    language: "pt-BR",
    append_to_response: "videos,translations,watch/providers",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_TOKEN}`,
    },
    next: {
      revalidate: 86400,
    },
  };

  try {
    const res = await fetch(`${url}?${params}`, options);
    if (!res.ok)
      throw new Error(
        "falha ao buscar detalhes deste filme, tente novamente mais tarde!",
      );
    const data = res.json();
    return data;
  } catch (err) {
    console.error("tivemos um erro inesperado na API, tente novamente!", err);
    return [];
  }
}

// --- series section ---

export const getTopRatedTvShows = async (): Promise<TvShow[]> => {
  const url = `${TMDB_BASE_URL}/tv/top_rated?language=pt-BR&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_TOKEN}`,
    },
    next: {
      revalidate: 86400,
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data: TMDBTvShowResponse = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("erro ao buscar series mais bem avaliadas:", err);
    return [];
  }
};

/**
 * buscar detalhes de uma serie especifica por id
 * @param TvShowId = id da serie a ser buscada
 * @returns uma promise que resolve os dados detalhados da serie
 */
export async function getTvShowDetails(TvShowId: string | number) {
  const url = `${TMDB_BASE_URL}/tv/${TvShowId}`;

  const params = new URLSearchParams({
    language: "pt-BR",
    append_to_response: "videos,translations,watch/providers",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_TOKEN}`,
    },
    next: {
      revalidate: 86400,
    },
  };

  try {
    const res = await fetch(`${url}?${params}`, options);
    if (!res.ok)
      throw new Error(
        "falha ao buscar detalhes deste filme, tente novamente mais tarde!",
      );
    const data = res.json();
    return data;
  } catch (err) {
    console.error("tivemos um erro inesperado na API, tente novamente!", err);
    return [];
  }
}

export const getTrendingTvShow = async (): Promise<TvShow[]> => {
  const url = `${TMDB_BASE_URL}/trending/tv/week?language=pt-BR&region=br`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_TOKEN}`,
    },
    next: {
      revalidate: 86400,
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: TMDBTvShowResponse = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Erro ao buscar filmes em alta:", err);
    return [];
  }
};

export const getPopularTvShow = async (): Promise<TvShow[]> => {
  const url = `${TMDB_BASE_URL}/tv/popular?language=pt-BR&page=1&region=br`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_READ_TOKEN}`,
    },
    next: {
      revalidate: 86400,
    },
  };

  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: TMDBTvShowResponse = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("Erro ao buscar filmes em alta:", err);
    return [];
  }
};
