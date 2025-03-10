import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { CalendarClock, Image as ImageIcon } from "lucide-react";

interface PostContentPanelProps {
  postImage?: string;
  textContent?: string;
  timestamp?: string;
}

const PostContentPanel = ({
  postImage = "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80",
  textContent = "This is a sample tweet content. Twitter Post Scraper extracts the actual content from real tweets when you provide a valid URL.",
  timestamp = "2:30 PM · May 15, 2023",
}: PostContentPanelProps) => {
  return (
    <Card className="w-full bg-white shadow-md overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800">
          Post Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {postImage && (
          <div className="relative w-full h-64 rounded-md overflow-hidden bg-gray-100">
            <img
              src={postImage}
              alt="Tweet image"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80";
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50">
              <ImageIcon className="w-10 h-10 text-white" />
            </div>
          </div>
        )}

        <div className="text-content">
          <p className="text-gray-700 text-base whitespace-pre-wrap">
            {textContent}
          </p>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          <CalendarClock className="w-4 h-4 mr-2" />
          <span>{timestamp}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostContentPanel;
