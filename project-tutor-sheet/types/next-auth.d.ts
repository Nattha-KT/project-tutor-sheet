// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;
type SellerId = string;

declare module "next-auth" {
    interface Session extends DefaulSession {
      user: User & {
        id: UserId;
        role: Role;
        sid: SellerId;
      } & DefaultSession["user"]
    }
  }

  declare module "next-auth/jwt" {
    interface JWT extends DefaulJWT {
      id: UserId;
      sid: SellerId;
      role: Role;
    }
  }