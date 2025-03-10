import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import TwitterScraper from "./TwitterScraper";
import { Button } from "./ui/button";
import { Settings, Twitter } from "lucide-react";
import ApiKeySetupModal from "./ApiKeySetupModal";

const Home: React.FC = () => {
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);
  const [hasCredentials, setHasCredentials] = useState<boolean>(false);

  // Check for saved credentials on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem("xBearerToken");
    setHasCredentials(Boolean(savedToken));
  }, []);

  const handleSaveCredentials = (credentials: { bearerToken: string }) => {
    localStorage.setItem("xBearerToken", credentials.bearerToken);
    setHasCredentials(true);
    // Reload the page to apply the new credentials
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Twitter Post Data Extractor</title>
        <meta
          name="description"
          content="Extract and display key information from Twitter post URLs using the X Developer API"
        />
      </Helmet>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Twitter className="w-6 h-6 mr-2 text-blue-500" />
            Twitter Post Data Extractor
          </h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setApiKeyModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Settings className="h-4 w-4" />
            {hasCredentials ? "Change API Credentials" : "Set API Credentials"}
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="rounded-lg">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Extract Twitter Post Data
              </h2>
              <p className="text-gray-600">
                Enter a Twitter post URL to extract key information including
                post content, account metadata, and tweet statistics.
                {!hasCredentials && (
                  <span className="text-amber-600 ml-1">
                    (Using mock data - set up X Developer API credentials for
                    real data)
                  </span>
                )}
              </p>
              <div className="mt-2 text-sm text-gray-500">
                <strong>Note:</strong> This application requires a proxy server
                to work with the X API. Make sure the proxy server is running at{" "}
                {import.meta.env.VITE_API_PROXY_URL ||
                  "http://localhost:3001/api"}
                .
              </div>
            </div>

            <TwitterScraper />

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                How It Works
              </h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                <li>Paste a valid Twitter post URL in the input field above</li>
                <li>
                  Click the "Extract Tweet Data" button to fetch data using the
                  X API
                </li>
                <li>
                  View the extracted post content, account information, and
                  tweet statistics
                </li>
                <li>Enter a new URL to fetch data for another Twitter post</li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-inner mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Twitter Post Data Extractor &copy; {new Date().getFullYear()} - For
            educational purposes only
          </p>
        </div>
      </footer>

      <ApiKeySetupModal
        open={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
        onSave={handleSaveCredentials}
      />
    </div>
  );
};

export default Home;
