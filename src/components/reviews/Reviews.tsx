import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import ReviewsFilter from "./ReviewsFilter";
import { mockReviews } from "@/data/mockReviews";
import { Review, ReviewFilter, ReviewFormData } from "@/types/review";

interface ReviewsProps {
  className?: string;
}

const Reviews = ({ className = "" }: ReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(mockReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const handleLike = (id: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === id
          ? {
              ...review,
              liked: !review.liked,
              likes: review.liked ? review.likes - 1 : review.likes + 1,
            }
          : review,
      ),
    );
  };

  const handleAddReview = (formData: ReviewFormData) => {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      userId: "current-user", // In a real app, this would be the actual user ID
      userName: "Vous", // In a real app, this would be the actual user name
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      rating: formData.rating,
      text: formData.text,
      likes: 0,
      createdAt: new Date().toISOString(),
      destination: formData.destination,
      tripType: formData.tripType,
      // In a real app, we would upload the images and get URLs
      images: formData.images
        ? Array(formData.images.length).fill(
            "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80",
          )
        : undefined,
    };

    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
  };

  const handleFilterChange = (filters: ReviewFilter) => {
    let filtered = [...reviews];

    // Filter by rating
    if (filters.rating) {
      filtered = filtered.filter((review) => review.rating >= filters.rating!);
    }

    // Filter by destination
    if (filters.destination) {
      filtered = filtered.filter(
        (review) => review.destination === filters.destination,
      );
    }

    // Filter by trip type
    if (filters.tripType) {
      filtered = filtered.filter(
        (review) => review.tripType === filters.tripType,
      );
    }

    // Sort reviews
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "recent":
          filtered.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          );
          break;
        case "popular":
          filtered.sort((a, b) => b.likes - a.likes);
          break;
        case "highest":
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "lowest":
          filtered.sort((a, b) => a.rating - b.rating);
          break;
      }
    }

    setFilteredReviews(filtered);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "all") {
      setFilteredReviews(reviews);
    } else if (value === "highest") {
      setFilteredReviews([...reviews].sort((a, b) => b.rating - a.rating));
    } else if (value === "recent") {
      setFilteredReviews(
        [...reviews].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        ),
      );
    }
  };

  // Update filtered reviews when reviews change
  useEffect(() => {
    handleTabChange(activeTab);
  }, [reviews]);

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Avis des voyageurs</h2>
        <Button
          onClick={() => setShowReviewForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter un avis
        </Button>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={handleTabChange}
        className="mb-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Tous les avis</TabsTrigger>
          <TabsTrigger value="highest">Meilleures notes</TabsTrigger>
          <TabsTrigger value="recent">Plus récents</TabsTrigger>
        </TabsList>
      </Tabs>

      <ReviewsFilter onFilterChange={handleFilterChange} />

      <AnimatePresence>
        <div className="space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ReviewCard review={review} onLike={handleLike} />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                Aucun avis ne correspond à vos critères.
              </p>
            </div>
          )}
        </div>
      </AnimatePresence>

      <Dialog open={showReviewForm} onOpenChange={setShowReviewForm}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Partagez votre expérience</DialogTitle>
          </DialogHeader>
          <ReviewForm
            onSubmit={handleAddReview}
            onCancel={() => setShowReviewForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reviews;
