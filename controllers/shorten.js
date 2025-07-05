const Url = require("../models/Url");
const { nanoid } = require("nanoid");

exports.shorten = async (req, res) => {
  const shortId = nanoid(6);
  const newUrl = new Url({ shortId, originalUrl: req.body.url });
  await newUrl.save();
  res.json({ shortUrl: `${req.headers.host}/${shortId}` });
};

exports.redirect = async (req, res) => {
  const entry = await Url.findOne({ shortId: req.params.shortId });
  if (!entry) return res.sendStatus(404);
  entry.hitCount++;
  await entry.save();
  res.redirect(entry.originalUrl);
};
