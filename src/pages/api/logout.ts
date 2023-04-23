import User from "@/models/user";
import { createJWT } from "@/utils/auth";
import { connectToMongoDB } from "@/utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import bcrypt from "bcrypt";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {};
