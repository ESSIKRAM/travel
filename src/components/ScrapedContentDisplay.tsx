import React from "react";
import { Card, CardContent } from "./ui/card";
import { AlertCircle } from "lucide-react";
import PostContentPanel from "./PostContentPanel";
import AccountMetadataPanel from "./AccountMetadataPanel";
import TweetStatisticsPanel from "./TweetStatisticsPanel";

interface ScrapedContentDisplayProps {
  isLoading?: boolean;
  error?: string;
  postData?: {
    postImage?: string;
    textContent?: string;
    timestamp?: string;
  };
  accountData?: {
    profilePicture?: string;
    username?: string;
    accountAge?: string;
    followerCount?: number;
  };
  statsData?: {
    retweetCount?: number;
    likeCount?: number;
    replyCount?: number;
    tweetCount?: number;
  };
}

const ScrapedContentDisplay: React.FC<ScrapedContentDisplayProps> = ({
  isLoading = false,
  error = "",
  postData = {
    postImage:
      "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80",
    textContent:
      "This is a sample tweet content. Twitter Post Scraper extracts the actual content from real tweets when you provide a valid URL.",
    timestamp: "2:30 PM · May 15, 2023",
  },
  accountData = {
    profilePicture: "https://api.dicebear.com/7.x/avataaars/svg?seed=twitter",
    username: "@twitteruser",
    accountAge: "2 years",
    followerCount: 1234,
  },
  statsData = {
    retweetCount: 1248,
    likeCount: 5672,
    replyCount: 342,
    tweetCount: 8976,
  },
}) => {
  if (isLoading) {
    return (
      <Card className="w-full bg-white p-6">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 text-lg">Scraping tweet data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full bg-white p-6">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-600 text-lg font-medium mb-2">Error</p>
          <p className="text-gray-600 text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg space-y-6">
      <PostContentPanel
        postImage={postData.postImage}
        textContent={postData.textContent}
        timestamp={postData.timestamp}
      />

      <AccountMetadataPanel
        profilePicture={accountData.profilePicture}
        username={accountData.username}
        accountAge={accountData.accountAge}
        followerCount={accountData.followerCount}
      />

      <TweetStatisticsPanel
        retweetCount={statsData.retweetCount}
        likeCount={statsData.likeCount}
        replyCount={statsData.replyCount}
        tweetCount={statsData.tweetCount}
      />
    </div>
  );
};

export default ScrapedContentDisplay;
