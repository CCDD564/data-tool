import User from "@/models/user";
import { validateJWT } from "@/utils/auth";
import { connectToMongoDB } from "@/utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToMongoDB();
  if (req.method === "GET") {
    const _id = await validateJWT(
      req.cookies[process.env.COOKIE_NAME as string]
    );
    const user = await User.findOne({ _id: _id });
    console.log(user);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      nickName: user.nickName,
      role: user.role,
    });
  }
  res.status(400).json({ message: "not ok" });
};

export default handler;
