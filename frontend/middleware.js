import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode("my-secret-key");

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ Paths that don’t need auth
  const publicPaths = ["/login", "/register", "/about", "/contact", "/"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // ✅ Get token from cookies
  const token = req.cookies.get("token")?.value;
  if (!token) {
    console.warn("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // ✅ Verify token using jose
    const { payload } = await jwtVerify(token, SECRET);

    console.log("Decoded JWT:", payload);
    console.log("IsAdmin:", payload.admin);

    // ✅ Protect /dashboard for admins only
    if (pathname.startsWith("/dashboard") && !payload.admin) {
      console.warn("Non-admin tried to access dashboard");
      return NextResponse.redire.urlct(new URL("/login-admin", req));
    }

    // ✅ Forward decoded user info via headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-data", JSON.stringify(payload));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/appointments/:path*", "/dashboard/:path*"],
};
