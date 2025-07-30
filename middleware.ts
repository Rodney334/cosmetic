// /middleware.ts
export { default } from "next-auth/middleware";

export const config = {
  // Applique le middleware uniquement aux routes /private
  matcher: ["/private/:path*"],
};

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   });
//   console.log("token :", token);
//   const isPrivateRoute = request.nextUrl.pathname.startsWith("/private");

//   // Redirection si tentative d'accès à une route privée sans token
//   if (isPrivateRoute && !token) {
//     return NextResponse.redirect(new URL("/public/login", request.url));
//   }

//   // Autoriser l'accès dans les autres cas
//   return NextResponse.next();
// }

// // Configuration des chemins à protéger
// export const config = {
//   matcher: ["/private/:path*"], // Applique le middleware uniquement aux routes /private
// };
