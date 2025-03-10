export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  text: string;
  images?: string[];
  likes: number;
  liked?: boolean;
  createdAt: string;
  destination?: string;
  tripType?: string;
}

export type ReviewFormData = {
  rating: number;
  text: string;
  images?: File[];
  destination?: string;
  tripType?: string;
};

export type ReviewFilter = {
  rating?: number;
  destination?: string;
  tripType?: string;
  sortBy?: "recent" | "popular" | "highest" | "lowest";
};
