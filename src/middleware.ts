export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/api/create-blog", "/create-blog"]
};
