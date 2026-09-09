import { redirect } from "next/navigation";

// Fallback in case middleware doesn't catch the root path.
// The middleware should redirect / → /en, but this ensures it works regardless.
export default function RootPage() {
  redirect("/en");
}
