import { NextResponse, type NextRequest } from "next/server";
import { PROJECTS } from "@/data/projects";

const SLUGS = new Set(PROJECTS.map((p) => p.slug));

/**
 * Case studies are read inside a Suspense boundary, so a missing slug would
 * still answer 200 with the not-found UI. Unknown slugs are caught here and
 * rewritten to a route that doesn't exist, which returns a real 404 — so old
 * links (like a removed project) don't look like live pages to search engines.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !SLUGS.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/no-encontrado", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/proyectos/:slug"],
};
