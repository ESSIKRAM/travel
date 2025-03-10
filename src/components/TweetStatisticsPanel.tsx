import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Heart, MessageCircle, Repeat, BarChart2 } from "lucide-react";

interface TweetStatisticsPanelProps {
  retweetCount?: number;
  likeCount?: number;
  replyCount?: number;
  tweetCount?: number;
  isLoading?: boolean;
}

const TweetStatisticsPanel: React.FC<TweetStatisticsPanelProps> = ({
  retweetCount = 1248,
  likeCount = 5672,
  replyCount = 342,
  tweetCount = 8976,
  isLoading = false,
}) => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Tweet Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-12">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <Repeat className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Retweets</span>
              </div>
              <span className="text-lg font-bold">
                {retweetCount.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium">Likes</span>
              </div>
              <span className="text-lg font-bold">
                {likeCount.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium">Replies</span>
              </div>
              <span className="text-lg font-bold">
                {replyCount.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1">
                <BarChart2 className="h-5 w-5 text-purple-500" />
                <span className="text-sm font-medium">Tweets</span>
              </div>
              <span className="text-lg font-bold">
                {tweetCount.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TweetStatisticsPanel;
