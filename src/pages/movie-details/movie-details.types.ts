export interface Genres {
  id: number;
  name: string;
}

export interface Cast {
  name: string;
  character: string;
  profile_path: string;
}

export interface Media {
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}
