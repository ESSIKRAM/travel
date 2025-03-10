import React, { useState, useEffect } from "react";
import UrlInputForm from "./UrlInputForm";
import ScrapedContentDisplay from "./ScrapedContentDisplay";
import {
  getTweetData,
  TwitterScrapedData,
  setTestMode,
  getTestMode,
} from "@/lib/twitterScraperService";
import TestModeToggle from "./TestModeToggle";

interface TwitterScraperProps {
  initialUrl?: string;
}

const TwitterScraper: React.FC<TwitterScraperProps> = ({ initialUrl = "" }) => {
  const [url, setUrl] = useState<string>(initialUrl);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [scrapedData, setScrapedData] = useState<TwitterScrapedData | null>(
    null,
  );
  const [testModeEnabled, setTestModeEnabled] =
    useState<boolean>(getTestMode());

  // Process initial URL if provided
  useEffect(() => {
    if (initialUrl) {
      handleSubmit(initialUrl);
    }
  }, [initialUrl]);

  const handleSubmit = async (tweetUrl: string) => {
    setUrl(tweetUrl);
    setIsLoading(true);
    setError(null);

    try {
      // Call the Twitter scraper service
      const data = await getTweetData(tweetUrl);
      setScrapedData(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch tweet data. Please try again.";
      setError(errorMessage);
      console.error("Error fetching tweet:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestModeToggle = (enabled: boolean) => {
    setTestModeEnabled(enabled);
    setTestMode(enabled);

    // Clear any previous errors when toggling test mode
    if (error) {
      setError(null);
    }

    // If we already have a URL and data, refetch with the new mode
    if (url) {
      handleSubmit(url);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gray-50">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Enter Twitter URL</h3>
          <TestModeToggle
            enabled={testModeEnabled}
            onToggle={handleTestModeToggle}
          />
        </div>

        <UrlInputForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />

        {testModeEnabled && !error && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-sm text-blue-700">
            <p className="font-bold">Test Mode Active</p>
            <p>
              Using mock data instead of real API calls. Toggle off test mode to
              use the real X API.
            </p>
          </div>
        )}

        {(isLoading || scrapedData || error) && (
          <ScrapedContentDisplay
            isLoading={isLoading}
            error={error || ""}
            postData={scrapedData?.postData}
            accountData={scrapedData?.accountData}
            statsData={scrapedData?.statsData}
          />
        )}
      </div>
    </div>
  );
};

export default TwitterScraper;
