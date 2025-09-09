// /middleware.ts

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Paths that require admin authentication
const protectedRoutes = ["/private"];

export async function middleware(req: NextRequest) {
  console.log("middleware: ", req);
  // const token = await getToken({
  //   req,
  //   secret: process.env.NEXTAUTH_SECRET || "Secrete key 1234567890",
  // });
  // console.log({ token: token?.accessToken });

  // const isAvalableToken: SessionExpire = await checkIfTokenIsValid(
  //   token?.accessToken
  // );
  // console.log({ isAvalableToken });
  // if (!req.nextUrl.pathname.endsWith("login")) {
  //   if (isAvalableToken === SessionExpire.EXPIRE) {
  //     const loginUrl = new URL("/public/login", req.url);
  //     // Supprimer le cookie d'authentification côté serveur

  //     // Au lieu d'appeler signOut() qui nécessite window,
  //     // et on peut éventuellement supprimer le cookie côté serveur
  //     const response = NextResponse.redirect(loginUrl);
  //     response.cookies.set("next-auth.session-token", "", {
  //       maxAge: -1,
  //       path: "/",
  //     });

  //     return response;
  //   }
  // }

  // // Check if the path is protected
  // const isProtected = protectedRoutes.some((path) =>
  //   req.nextUrl.pathname.startsWith(path)
  // );

  // if (isProtected) {
  //   if (!token || (token && token.role !== "admin")) {
  //     const loginUrl = new URL("/public/profil", req.url);
  //     return NextResponse.redirect(loginUrl);
  //   }
  // }

  // // If not protected or authenticated, continue
  // return NextResponse.next();
}

// Only run middleware on these routes
export const config = {
  matcher: ["/private/:path*", "/public/:path*"],
};
