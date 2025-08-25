// /middleware.ts
// export { default } from "next-auth/middleware";

// export const config = {
//   // Applique le middleware uniquement aux routes /private
//   matcher: ["/private/:path*"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Paths that require admin authentication
const protectedRoutes = ["/private"];

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || "Secrete key 1234567890",
  });

  // Check if the path is protected
  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtected) {
    if (!token || (token && token.role !== "admin")) {
      const loginUrl = new URL("/public/profil", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If not protected or authenticated, continue
  return NextResponse.next();
}

// Only run middleware on these routes
export const config = {
  matcher: ["/private/:path*"],
};
