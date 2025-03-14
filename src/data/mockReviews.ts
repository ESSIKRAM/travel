import { Review } from "@/types/review";

export const mockReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "Sophie Martin",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    rating: 5,
    text: "Notre séjour à Paris était incroyable! L'hôtel était parfaitement situé près de tous les sites touristiques. Le personnel était très attentionné et les chambres étaient impeccables. Je recommande vivement!",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
    ],
    likes: 24,
    createdAt: "2023-10-15T14:30:00Z",
    destination: "Paris",
    tripType: "Romantique",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Thomas Dubois",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thomas",
    rating: 4,
    text: "Les plages de Nice sont magnifiques! L'eau était parfaite et les restaurants sur la promenade offrent une cuisine délicieuse. Seul bémol, les prix sont un peu élevés en haute saison.",
    images: [
      "https://images.unsplash.com/photo-1533614767277-901a386a3b52?w=600&q=80",
    ],
    likes: 18,
    createdAt: "2023-09-22T10:15:00Z",
    destination: "Nice",
    tripType: "Plage",
  },
  {
    id: "3",
    userId: "user3",
    userName: "Marie Lefevre",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marie",
    rating: 5,
    text: "Les montagnes des Alpes sont à couper le souffle! Notre randonnée était bien organisée et le guide connaissait parfaitement la région. Les chalets où nous avons séjourné étaient charmants et confortables.",
    likes: 32,
    createdAt: "2023-08-05T16:45:00Z",
    destination: "Alpes",
    tripType: "Aventure",
  },
  {
    id: "4",
    userId: "user4",
    userName: "Jean Moreau",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jean",
    rating: 3,
    text: "Bordeaux est une belle ville avec une architecture impressionnante et d'excellents vins. Cependant, notre hôtel n'était pas à la hauteur de nos attentes pour le prix payé.",
    likes: 7,
    createdAt: "2023-11-10T09:20:00Z",
    destination: "Bordeaux",
    tripType: "Culturel",
  },
  {
    id: "5",
    userId: "user5",
    userName: "Claire Petit",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Claire",
    rating: 5,
    text: "La Provence en été est un rêve! Les champs de lavande, les marchés locaux et la cuisine provençale ont rendu notre voyage inoubliable. Notre gîte était parfait pour une famille.",
    images: [
      "https://images.unsplash.com/photo-1595856619767-ab739fa7daae?w=600&q=80",
    ],
    likes: 41,
    createdAt: "2023-07-18T11:30:00Z",
    destination: "Provence",
    tripType: "Famille",
  },
];

export const tripTypes = [
  "Romantique",
  "Aventure",
  "Plage",
  "Culturel",
  "Famille",
  "Affaires",
  "Gastronomique",
];

export const destinations = [
  "Paris",
  "Nice",
  "Alpes",
  "Bordeaux",
  "Provence",
  "Lyon",
  "Strasbourg",
  "Marseille",
  "Corse",
  "Mont Saint-Michel",
];
