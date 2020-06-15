import { Profile } from './profile.model';

export interface Article {
  _id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: number;
  favoritesCount: number;
  author: Profile;
  image: string,
  video: string,
  adminChecked:string
}
