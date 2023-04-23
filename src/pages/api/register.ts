import User from "@/models/user";
import { createJWT } from "@/utils/auth";
import { connectToMongoDB } from "@/utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToMongoDB();

  if (req.method === "POST") {
    const user = await User.create(req.body);
    if (!user) res.status(402).send(null);

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

    res.status(201);
    res.json({ message: "success" });
  } else {
    res.status(402);
    res.end();
  }
};

export default handler;
