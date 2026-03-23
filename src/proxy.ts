import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const publicRoutes = ["/", "/registro"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isPublic = publicRoutes.includes(req.nextUrl.pathname);

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Solo admins pueden entrar a /gestion
  if (req.nextUrl.pathname.startsWith("/gestion")) {
    const role = req.auth?.user?.role;
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/temas", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};