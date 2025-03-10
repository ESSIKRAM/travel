import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AlertCircle, ArrowRight, Twitter } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { cn } from "@/lib/utils";

interface UrlInputFormProps {
  onSubmit?: (url: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({
  onSubmit = () => {},
  isLoading = false,
  error = null,
}) => {
  const [url, setUrl] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateUrl = (input: string): boolean => {
    // Basic Twitter URL validation
    const twitterUrlPattern =
      /^https?:\/\/(www\.)?(twitter|x)\.com\/[a-zA-Z0-9_]+\/status\/[0-9]+/i;
    return twitterUrlPattern.test(input);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      setValidationError("Please enter a Twitter post URL");
      return;
    }

    if (!validateUrl(url)) {
      setValidationError("Please enter a valid Twitter post URL");
      return;
    }

    setValidationError(null);
    onSubmit(url);
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <Twitter className="h-5 w-5 text-blue-500" />
          Twitter Post Scraper
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Paste Twitter post URL here (e.g., https://twitter.com/username/status/123456789)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={cn(
                  "pr-12 focus:border-blue-500",
                  validationError || error ? "border-red-500" : "",
                )}
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Twitter className="h-5 w-5 text-gray-400" />
              </div>
            </div>

            {(validationError || error) && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationError || error}</AlertDescription>
              </Alert>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Scraping...
              </>
            ) : (
              <>
                Extract Tweet Data
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UrlInputForm;
