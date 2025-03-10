import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { destinations, tripTypes } from "@/data/mockReviews";
import { ReviewFormData } from "@/types/review";

interface ReviewFormProps {
  onSubmit: (data: ReviewFormData) => void;
  onCancel?: () => void;
}

const formSchema = z.object({
  rating: z.number().min(1, "Veuillez attribuer une note").max(5),
  text: z.string().min(10, "Votre avis doit contenir au moins 10 caractères"),
  destination: z.string().optional(),
  tripType: z.string().optional(),
});

const ReviewForm = ({ onSubmit, onCancel }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      text: "",
      destination: undefined,
      tripType: undefined,
    },
  });

  const handleRatingChange = (value: number) => {
    setRating(value);
    form.setValue("rating", value, { shouldValidate: true });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newImages = [...images, ...newFiles].slice(0, 5); // Limit to 5 images
      setImages(newImages);

      // Create preview URLs
      const newPreviewUrls = newImages.map((file) => URL.createObjectURL(file));
      setImagePreviewUrls(newPreviewUrls);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviewUrls = [...imagePreviewUrls];
    URL.revokeObjectURL(newPreviewUrls[index]); // Clean up URL object
    newPreviewUrls.splice(index, 1);
    setImagePreviewUrls(newPreviewUrls);
  };

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const formData: ReviewFormData = {
      ...values,
      images: images.length > 0 ? images : undefined,
    };
    onSubmit(formData);
    form.reset();
    setRating(0);
    setImages([]);
    setImagePreviewUrls([]);
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Partagez votre expérience
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-6">
            {/* Rating Stars */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Votre note</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-8 w-8 ${(hoveredRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Text */}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Votre avis</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Partagez votre expérience en détail..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Décrivez ce que vous avez aimé ou non, et aidez les autres
                    voyageurs à faire leur choix.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Destination */}
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une destination" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {destinations.map((destination) => (
                        <SelectItem key={destination} value={destination}>
                          {destination}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Trip Type */}
            <FormField
              control={form.control}
              name="tripType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de voyage</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type de voyage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {tripTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <div className="space-y-2">
              <FormLabel>Photos (optionnel)</FormLabel>
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded-md overflow-hidden border border-gray-200"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-70"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {images.length < 5 && (
                  <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="mt-1 text-xs text-gray-500">Ajouter</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Vous pouvez ajouter jusqu'à 5 photos
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-6">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
            )}
            <Button
              type="submit"
              className="ml-auto bg-blue-600 hover:bg-blue-700"
            >
              Publier mon avis
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ReviewForm;
