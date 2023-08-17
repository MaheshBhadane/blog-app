export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/write", "/api/author/blog"]
};
