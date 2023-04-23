import { sign, verify } from "jsonwebtoken";

interface TokenPayload {
  exp: number;
  _id: string;
  iat: number;
}
export const createJWT = (_id: string) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  const token = sign({ exp: exp, _id: _id }, process.env.JWT_SECRET as string);
  return token;
};

export const validateJWT = async (jwt: any) => {
  const data = await verify(jwt, process.env.JWT_SECRET as string);
  const { _id } = data as TokenPayload;
  return _id;
};
