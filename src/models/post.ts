import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
