// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname)
    // console.log(request.nextauth.token)

    //     if (!request.nextauth?.token) {
    //       // นำทางผู้ใช้ไปยังหน้า /login แทน
    //       const url = new URL(`/login`,request.url)
    //       url.searchParams.set('callbackUrl', request.nextUrl.pathname)
    //       return NextResponse.redirect(url);
    //   }

    if (
      request.nextUrl.pathname.startsWith("/seller") &&
      !((request.nextauth.token?.role === "SELLER") || (request.nextauth.token?.role === "ADMIN"))
    ) {
      return NextResponse.rewrite(
        new URL("/seller/register-seller", request.url)
      );
    }

    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "ADMIN"
    ) {
      return NextResponse.rewrite(new URL("/login", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/seller/:path*", "/admin/:path*", "/help/:path*"],
};
