import { NextRequest, NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_READ_TOKEN;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { message: "O parâmetro 'query' é obrigatório." },
      { status: 400 },
    );
  }

  try {
    const url = `${TMDB_BASE_URL}/search/multi?language=pt-BR&query=${encodeURIComponent(query)}&page=1&include_adult=false`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erro na API do TMDB:", response.status, errorData);
      throw new Error(`Erro na API do TMDB: ${response.statusText}`);
    }

    const data = await response.json();

    const results = data.results
      .filter(
        (item: any) =>
          (item.media_type === "movie" || item.media_type === "tv") &&
          (item.title || item.name) &&
          item.poster_path,
      )
      .map((item: any) => ({
        id: item.id,
        title: item.title || item.name,
        mediaType: item.media_type,
        release_date: item.release_date,
        first_air_date: item.first_air_date,
        poster_path: item.poster_path,
      }));

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Erro na rota de busca:", error);
    return NextResponse.json(
      { message: "Erro interno no servidor." },
      { status: 500 },
    );
  }
}
