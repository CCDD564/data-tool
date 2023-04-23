import User from "@/models/user";
import { createJWT } from "@/utils/auth";
import { connectToMongoDB } from "@/utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import bcrypt from "bcrypt";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToMongoDB();
  if (req.method == "GET") {
    try {
      const user = await User.findOne({ email: req.body.email });
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        const jwt = await createJWT(user);
        if (!jwt) res.status(402).send(null);

        await user.save();

        res.setHeader(
          "Set-Cookie",
          serialize(process.env.COOKIE_NAME as string, jwt, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          })
        );
      }
    } catch (error) {
      res.status(400).json({ error: error });
    }
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};
