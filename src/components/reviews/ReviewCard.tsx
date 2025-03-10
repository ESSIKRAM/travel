import { useState } from "react";
import { Heart, Share2, MessageCircle } from "lucide-react";
import { Review } from "@/types/review";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import StarRating from "./StarRating";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface ReviewCardProps {
  review: Review;
  onLike: (id: string) => void;
}

const ReviewCard = ({ review, onLike }: ReviewCardProps) => {
  const [isLiked, setIsLiked] = useState(review.liked || false);
  const [likeCount, setLikeCount] = useState(review.likes);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));
    onLike(review.id);
  };

  const handleShare = (platform: string) => {
    // In a real app, implement actual sharing functionality
    console.log(`Sharing to ${platform}:`, review);
    setShowShareDialog(false);
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setShowImageDialog(true);
  };

  const timeAgo = formatDistanceToNow(new Date(review.createdAt), {
    addSuffix: true,
    locale: fr,
  });

  return (
    <Card className="w-full overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-gray-200">
              <AvatarImage src={review.userAvatar} alt={review.userName} />
              <AvatarFallback>{review.userName.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{review.userName}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{timeAgo}</span>
                {review.destination && (
                  <>
                    <span>•</span>
                    <span>{review.destination}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <StarRating rating={review.rating} showValue />
        </div>

        <p className="text-gray-700 mb-4">{review.text}</p>

        {review.images && review.images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {review.images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-md overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image}
                  alt={`Photo de voyage ${index + 1}`}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}

        {review.tripType && (
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {review.tripType}
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center gap-4 w-full">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 ${isLiked ? "text-red-500" : "text-gray-600"}`}
                  onClick={handleLike}
                >
                  <Heart
                    className={`h-4 w-4 ${isLiked ? "fill-red-500" : ""}`}
                  />
                  <span>{likeCount}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLiked ? "Je n'aime plus" : "J'aime"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1 text-gray-600"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Partager</span>
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Partager cet avis</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Partager cet avis</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-4 gap-4 py-4">
                {["Facebook", "Twitter", "WhatsApp", "Email"].map(
                  (platform) => (
                    <Button
                      key={platform}
                      variant="outline"
                      className="flex flex-col items-center justify-center h-20"
                      onClick={() => handleShare(platform)}
                    >
                      <span className="text-sm">{platform}</span>
                    </Button>
                  ),
                )}
              </div>
            </DialogContent>
          </Dialog>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-gray-600 ml-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Répondre</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Répondre à cet avis</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardFooter>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="sm:max-w-3xl p-1 bg-black">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Photo agrandie"
              className="max-h-[80vh] max-w-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ReviewCard;
