import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { destinations, tripTypes } from "@/data/mockReviews";
import { ReviewFilter } from "@/types/review";

interface ReviewsFilterProps {
  onFilterChange: (filters: ReviewFilter) => void;
}

const ReviewsFilter = ({ onFilterChange }: ReviewsFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<ReviewFilter>({
    rating: undefined,
    destination: undefined,
    tripType: undefined,
    sortBy: "recent",
  });

  const handleFilterChange = (key: keyof ReviewFilter, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleRatingChange = (value: number[]) => {
    handleFilterChange("rating", value[0]);
  };

  const clearFilters = () => {
    const newFilters = {
      rating: undefined,
      destination: undefined,
      tripType: undefined,
      sortBy: "recent",
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.rating) count++;
    if (filters.destination) count++;
    if (filters.tripType) count++;
    return count;
  };

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select
            value={filters.sortBy || "recent"}
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Plus récents</SelectItem>
              <SelectItem value="popular">Plus populaires</SelectItem>
              <SelectItem value="highest">Meilleures notes</SelectItem>
              <SelectItem value="lowest">Notes les plus basses</SelectItem>
            </SelectContent>
          </Select>

          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filtres</span>
                {getActiveFiltersCount() > 0 && (
                  <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                    {getActiveFiltersCount()}
                  </span>
                )}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <Card className="border-0 shadow-none">
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Note minimum</h3>
                    <div className="flex items-center gap-4">
                      <Slider
                        defaultValue={[filters.rating || 0]}
                        max={5}
                        step={1}
                        onValueChange={handleRatingChange}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-8 text-center">
                        {filters.rating || 0}/5
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Destination</h3>
                    <Select
                      value={filters.destination}
                      onValueChange={(value) =>
                        handleFilterChange("destination", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Toutes les destinations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">
                          Toutes les destinations
                        </SelectItem>
                        {destinations.map((destination) => (
                          <SelectItem key={destination} value={destination}>
                            {destination}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Type de voyage</h3>
                    <Select
                      value={filters.tripType}
                      onValueChange={(value) =>
                        handleFilterChange("tripType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous les types</SelectItem>
                        {tripTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between pt-2 border-t">
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Réinitialiser
                    </Button>
                    <Button size="sm" onClick={() => setIsOpen(false)}>
                      Appliquer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default ReviewsFilter;
