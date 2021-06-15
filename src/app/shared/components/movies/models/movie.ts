export interface Movie {
    poster_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: string;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path: string;
    popularity: string;
    vote_count: string;
    video: boolean;
    vote_average: number;
    favourite: boolean;
}

export interface MovieAPIResult {
    page: number;
    results: Movie[];
    total_results: number;
    total_pages: number
}