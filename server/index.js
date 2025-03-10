const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for your frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use(express.json());

// Proxy endpoint for Twitter API
app.get("/api/tweets/:id", async (req, res) => {
  try {
    const tweetId = req.params.id;
    const bearerToken = process.env.X_BEARER_TOKEN;

    if (!bearerToken) {
      return res
        .status(401)
        .json({ error: "API credentials not configured on the server" });
    }

    // Define the tweet fields we want to retrieve
    const tweetFields = [
      "created_at",
      "text",
      "public_metrics",
      "attachments",
      "entities",
      "author_id",
    ].join(",");

    // Define the expansions we want (media, author)
    const expansions = ["author_id", "attachments.media_keys"].join(",");

    // Define the user fields we want
    const userFields = [
      "profile_image_url",
      "username",
      "name",
      "created_at",
      "public_metrics",
    ].join(",");

    // Define the media fields we want
    const mediaFields = ["url", "preview_image_url", "type"].join(",");

    // Make the API request to Twitter
    const response = await axios.get(
      `https://api.twitter.com/2/tweets/${tweetId}`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        params: {
          "tweet.fields": tweetFields,
          expansions: expansions,
          "user.fields": userFields,
          "media.fields": mediaFields,
        },
      },
    );

    // Return the Twitter API response to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error proxying request to Twitter API:", error);

    // Forward error details to the client
    if (error.response) {
      return res.status(error.response.status).json({
        error: `Twitter API error: ${error.response.data?.detail || error.message}`,
        details: error.response.data,
      });
    }

    res.status(500).json({ error: "Failed to fetch tweet data" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
