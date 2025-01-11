import type { JWTPayloadSpec } from "@elysiajs/jwt";

export interface IJWT {
  sign(payload: JWTPayloadSpec): Promise<string>;
  verify(token: string): Promise<JWTPayloadSpec | false>;
}