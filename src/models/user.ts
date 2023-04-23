import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new Schema({
  nickName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your email"],
    minLength: [6, "Password must be atleast 6 characters long"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["user", "admin"],
    },
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});
// ENCTYPTION
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = models.User || model("User", UserSchema);
export default User;
