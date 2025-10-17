// This is a Netlify serverless function.
// It handles fetching and saving user link data to Netlify Blob Storage.

const { getStore } = require("@netlify/blobs");

const handler = async (event, context) => {
  // Ensure the user is authenticated.
  const { identity, user } = context.clientContext;
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Unauthorized" }),
    };
  }
  
  const userId = user.sub;
  const linksStore = getStore("links");

  // Handle GET request to fetch data
  if (event.httpMethod === "GET") {
    try {
      const data = await linksStore.get(userId, { type: "json" });
      if (!data) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "No data found for user." }),
        };
      }
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to retrieve data." }),
      };
    }
  }

  // Handle POST request to save data
  if (event.httpMethod === "POST") {
    try {
      const data = JSON.parse(event.body);
      await linksStore.setJSON(userId, data);
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } catch (error) {
       console.error("Error saving data:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Failed to save data." }),
      };
    }
  }

  // Handle other methods
  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method Not Allowed" }),
  };
};

module.exports = { handler };