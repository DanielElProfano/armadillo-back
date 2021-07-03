const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rssSchema = new Schema(
  {
    title: { type: String },
    link: { type: String},
    guid: { type: String},
    pubDate: [{ type: String}],
    contentSnippet: { type: String },
    user: {type: mongoose.Types.ObjectId,
      ref: 'users' },
  },
  {
    timestamps: true,
  }
);

const Rss = mongoose.model("Rss", rssSchema);

module.exports = Rss;
