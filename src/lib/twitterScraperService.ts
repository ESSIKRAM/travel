import axios from "axios";

// Define the response types
export interface TwitterScrapedData {
  postData: {
    postImage: string;
    textContent: string;
    timestamp: string;
  };
  accountData: {
    profilePicture: string;
    username: string;
    accountAge: string;
    followerCount: number;
  };
  statsData: {
    retweetCount: number;
    likeCount: number;
    replyCount: number;
    tweetCount: number;
  };
}

// X (Twitter) API credentials
const API_KEY = import.meta.env.VITE_X_API_KEY || "";
const API_SECRET = import.meta.env.VITE_X_API_SECRET || "";
const BEARER_TOKEN = import.meta.env.VITE_X_BEARER_TOKEN || "";

// API endpoints - use local proxy server to avoid CORS issues
const API_BASE_URL =
  import.meta.env.VITE_API_PROXY_URL || "http://localhost:3001/api";

/**
 * Check if X API credentials are configured
 * @returns Boolean indicating if credentials are available
 */
const areCredentialsConfigured = (): boolean => {
  // For the proxy approach, we only need to check if the proxy server is configured
  // The actual bearer token is stored on the server
  return Boolean(localStorage.getItem("xBearerToken"));
};

/**
 * Extract tweet ID from a Twitter URL
 * @param url - Twitter URL
 * @returns Tweet ID or null if not found
 */
const extractTweetId = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");

    // Twitter URLs follow the pattern: twitter.com/username/status/tweetId
    // or x.com/username/status/tweetId
    if (
      (urlObj.hostname === "twitter.com" ||
        urlObj.hostname === "www.twitter.com" ||
        urlObj.hostname === "x.com" ||
        urlObj.hostname === "www.x.com") &&
      pathParts.length >= 4 &&
      pathParts[2] === "status"
    ) {
      return pathParts[3].split("?")[0]; // Remove any query parameters
    }
    return null;
  } catch (e) {
    console.error("Error parsing URL for tweet ID:", e);
    return null;
  }
};

/**
 * Extract username from a Twitter URL
 * @param url - Twitter URL
 * @returns Username or null if not found
 */
const extractUsername = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");

    if (pathParts.length >= 2 && pathParts[1]) {
      return pathParts[1];
    }
    return null;
  } catch (e) {
    console.error("Error parsing URL for username:", e);
    return null;
  }
};

/**
 * Fetch tweet data using proxy server to avoid CORS issues
 * @param tweetId - The ID of the tweet to fetch
 * @returns Promise with the tweet data
 */
const fetchTweetFromApi = async (tweetId: string): Promise<any> => {
  if (!areCredentialsConfigured()) {
    throw new Error(
      "X API credentials not configured. Please set up your API credentials.",
    );
  }

  try {
    // Make the API request to our proxy server instead of directly to Twitter
    console.log(`Fetching tweet ${tweetId} via proxy server...`);
    const response = await axios.get(`${API_BASE_URL}/tweets/${tweetId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tweet from proxy server:", error);

    // Handle different error scenarios
    if (axios.isAxiosError(error)) {
      // Network error (proxy server not running)
      if (!error.response) {
        throw new Error(
          "Cannot connect to proxy server. Make sure the server is running.",
        );
      }

      // Proxy server returned an error
      const status = error.response.status;
      const errorData = error.response.data;

      if (status === 401) {
        throw new Error("Unauthorized: Please check your X API credentials.");
      } else if (status === 404) {
        throw new Error(
          "Tweet not found. It may have been deleted or is private.",
        );
      } else if (status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      } else {
        throw new Error(
          `API error (${status}): ${errorData?.error || error.message}`,
        );
      }
    }

    throw new Error("Failed to fetch tweet data. Please try again.");
  }
};

/**
 * Parse X API response into our data structure
 * @param apiResponse - The response from the X API
 * @returns Parsed Twitter data
 */
const parseApiResponse = (apiResponse: any): TwitterScrapedData => {
  const tweet = apiResponse.data;
  const user = apiResponse.includes?.users?.[0] || {};
  const media = apiResponse.includes?.media || [];

  // Get the first media item that is a photo
  const photoMedia = media.find((m: any) => m.type === "photo");
  const photoUrl = photoMedia?.url || photoMedia?.preview_image_url || "";

  // Format the timestamp
  let timestamp = "";
  if (tweet.created_at) {
    try {
      timestamp = new Date(tweet.created_at).toLocaleString();
    } catch (e) {
      console.error("Error parsing timestamp:", e);
      timestamp = new Date().toLocaleString();
    }
  } else {
    timestamp = new Date().toLocaleString();
  }

  // Calculate account age
  let accountAge = "";
  if (user.created_at) {
    try {
      const createdDate = new Date(user.created_at);
      const now = new Date();
      const yearDiff = now.getFullYear() - createdDate.getFullYear();
      accountAge = `${yearDiff} years`;
    } catch (e) {
      console.error("Error calculating account age:", e);
      accountAge = "Unknown";
    }
  } else {
    accountAge = "Unknown";
  }

  return {
    postData: {
      postImage:
        photoUrl ||
        "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80",
      textContent: tweet.text || "",
      timestamp: timestamp,
    },
    accountData: {
      profilePicture:
        user.profile_image_url ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=@${user.username || "user"}`,
      username: `@${user.username || "user"}`,
      accountAge: accountAge,
      followerCount: user.public_metrics?.followers_count || 0,
    },
    statsData: {
      retweetCount: tweet.public_metrics?.retweet_count || 0,
      likeCount: tweet.public_metrics?.like_count || 0,
      replyCount: tweet.public_metrics?.reply_count || 0,
      tweetCount: user.public_metrics?.tweet_count || 0,
    },
  };
};

/**
 * Create enhanced mock data that tries to be more realistic
 * @param tweetUrl - The URL of the tweet
 * @param username - The username extracted from the URL
 * @returns Enhanced mock Twitter data
 */
const createEnhancedMockData = (
  tweetUrl: string,
  username: string,
): TwitterScrapedData => {
  // Generate a more realistic tweet text based on the username
  const topics = [
    "the latest tech trends",
    "climate change initiatives",
    "a new product launch",
    "the upcoming election",
    "a recent sports event",
    "an interesting book I just read",
    "a movie recommendation",
    "a coding challenge",
    "a travel experience",
  ];

  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  const textContent = `Just shared my thoughts on ${randomTopic}. What do you think? #discussion #${randomTopic.replace(/\s+/g, "")}`;

  // Generate a timestamp within the last week
  const now = new Date();
  const pastDate = new Date(
    now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000,
  );
  const timestamp = pastDate.toLocaleString();

  // Select a more appropriate image based on the topic
  let postImage =
    "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80";
  if (randomTopic.includes("tech")) {
    postImage =
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80";
  } else if (randomTopic.includes("climate")) {
    postImage =
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80";
  } else if (randomTopic.includes("product")) {
    postImage =
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80";
  } else if (randomTopic.includes("election")) {
    postImage =
      "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80";
  } else if (randomTopic.includes("sports")) {
    postImage =
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80";
  } else if (randomTopic.includes("book")) {
    postImage =
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80";
  } else if (randomTopic.includes("movie")) {
    postImage =
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80";
  } else if (randomTopic.includes("coding")) {
    postImage =
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80";
  } else if (randomTopic.includes("travel")) {
    postImage =
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80";
  }

  // Generate more realistic stats based on the username popularity
  // Extract the username without @ to use as a seed for random numbers
  const usernameWithoutAt = username.replace("@", "");
  const seed = usernameWithoutAt
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Use the seed to generate somewhat consistent numbers for the same username
  const random = (max: number, min: number = 0) => {
    const x = Math.sin(seed + max) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min) + min);
  };

  const followerCount = random(100000, 1000);
  const tweetCount = random(20000, 100);
  const retweetCount = random(followerCount * 0.1, 5);
  const likeCount = random(followerCount * 0.3, 10);
  const replyCount = random(retweetCount * 0.5, 2);

  return {
    postData: {
      postImage,
      textContent,
      timestamp,
    },
    accountData: {
      profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=@${username}`,
      username: `@${username}`,
      accountAge: `${random(10, 1)} years`,
      followerCount,
    },
    statsData: {
      retweetCount,
      likeCount,
      replyCount,
      tweetCount,
    },
  };
};

// Test mode flag - when true, always use mock data
let testMode = false;

/**
 * Set test mode status
 * @param enabled - Whether test mode should be enabled
 */
export const setTestMode = (enabled: boolean): void => {
  testMode = enabled;
  console.log(`Test mode ${enabled ? "enabled" : "disabled"}`);
};

/**
 * Get current test mode status
 * @returns Boolean indicating if test mode is enabled
 */
export const getTestMode = (): boolean => {
  return testMode;
};

/**
 * Main function to fetch tweet data
 * @param tweetUrl - The URL of the tweet to fetch
 * @returns Promise with the tweet data
 */
export const fetchTweetData = async (
  tweetUrl: string,
): Promise<TwitterScrapedData> => {
  try {
    // Extract tweet ID from URL
    const tweetId = extractTweetId(tweetUrl);
    const username = extractUsername(tweetUrl);

    if (!tweetId) {
      throw new Error("Invalid Twitter URL. Could not extract tweet ID.");
    }

    if (!username) {
      throw new Error("Could not extract username from URL.");
    }

    // If test mode is enabled, always use mock data
    if (testMode) {
      console.log("Test mode enabled. Using mock data.");
      return createEnhancedMockData(tweetUrl, username);
    }

    // Check if credentials are configured and proxy server is available
    if (areCredentialsConfigured()) {
      try {
        // Fetch data from X API via proxy server
        console.log("Fetching tweet data via proxy server...");
        const apiResponse = await fetchTweetFromApi(tweetId);
        return parseApiResponse(apiResponse);
      } catch (error) {
        console.error("Error fetching from proxy server:", error);

        // Show a more user-friendly error message
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        // If the error contains "proxy server", it's likely a connection issue
        if (errorMessage.includes("proxy server")) {
          throw new Error(
            "Cannot connect to the proxy server. Please make sure the server is running and try again.",
          );
        }

        // If API fails and we have a username, fall back to mock data
        console.log("Falling back to mock data...");
        return createEnhancedMockData(tweetUrl, username);
      }
    } else {
      // No credentials, use mock data
      console.log("No X API credentials configured. Using mock data.");
      return createEnhancedMockData(tweetUrl, username);
    }
  } catch (error) {
    console.error("Error in fetchTweetData:", error);
    throw error;
  }
};

/**
 * Cache for previously fetched tweets to reduce API calls
 */
const tweetCache = new Map<
  string,
  { data: TwitterScrapedData; timestamp: number }
>();
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

/**
 * Get tweet data with caching
 * @param tweetUrl - The URL of the tweet to fetch
 * @returns Promise with the tweet data
 */
export const getTweetData = async (
  tweetUrl: string,
): Promise<TwitterScrapedData> => {
  // Check if we have a cached version that's not expired
  const cached = tweetCache.get(tweetUrl);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_EXPIRY) {
    console.log("Using cached tweet data");
    return cached.data;
  }

  // If not cached or expired, fetch new data
  const data = await fetchTweetData(tweetUrl);

  // Cache the result
  tweetCache.set(tweetUrl, { data, timestamp: now });

  return data;
};
