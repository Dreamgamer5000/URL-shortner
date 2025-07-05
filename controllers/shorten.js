const Url = require("../models/Url");
const { nanoid } = require("nanoid");

exports.shorten = async (req, res) => {
  try {
    const { url } = req.body;
    console.log("Incoming request to /shorten with URL:", url);

    if (!url) {
      console.log("❌ URL not provided");
      return res.status(400).json({ error: "URL is required" });
    }

    const shortId = nanoid(6);
    const shortUrl = `${req.headers.host}/${shortId}`;
    console.log("Generated short ID:", shortId);

    const newUrl = await Url.create({
      originalUrl: url,
      shortUrl: shortId,
    });

    console.log("✅ Saved to DB:", newUrl);

    return res.status(200).json({ shortUrl });
  } catch (err) {
    console.error("❌ Error in /shorten controller:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.redirect = async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const url = await Url.findOne({ shortUrl: shortId });
    if (url) {
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).send("Short URL not found");
    }
  } catch (err) {
    console.error("Error in redirect:", err);
    res.status(500).send("Server Error");
  }
};
