import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertCircle, Key } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface ApiKeySetupModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (credentials: { bearerToken: string }) => void;
}

const ApiKeySetupModal: React.FC<ApiKeySetupModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const [bearerToken, setBearerToken] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Load saved credentials when modal opens
  useEffect(() => {
    if (open) {
      const savedToken = localStorage.getItem("xBearerToken");
      if (savedToken) {
        setBearerToken(savedToken);
      }
    }
  }, [open]);

  const handleSave = () => {
    if (!bearerToken.trim()) {
      setError("Please enter a valid Bearer Token");
      return;
    }

    // Save the credentials
    onSave({ bearerToken });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-blue-500" />
            Set Up X Developer API Credentials
          </DialogTitle>
          <DialogDescription>
            To use the Twitter Post Scraper with the official X API, you need to
            provide your X Developer API credentials.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="bearer-token">Bearer Token</Label>
            <Input
              id="bearer-token"
              type="password"
              placeholder="Enter your X API Bearer Token"
              value={bearerToken}
              onChange={(e) => {
                setBearerToken(e.target.value);
                setError("");
              }}
            />
            {error && (
              <Alert variant="destructive" className="py-2 mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="text-sm text-gray-500">
            <p>
              Don't have X Developer API credentials? You can apply for access
              at{" "}
              <a
                href="https://developer.twitter.com/en/portal/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                X Developer Portal
              </a>
              .
            </p>
            <p className="mt-2">To get your Bearer Token:</p>
            <ol className="list-decimal pl-5 mt-1 space-y-1">
              <li>Create a project and app in the X Developer Portal</li>
              <li>Navigate to the "Keys and Tokens" tab</li>
              <li>Generate or copy your Bearer Token</li>
            </ol>
            <p className="mt-2">
              Note: Without API credentials, the application will use mock data
              for demonstration purposes.
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save Credentials
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeySetupModal;
