import { redirect } from "next/navigation";

export default function IndexBusinessPage() {
  // Server-side redirect
  redirect("/");

  // This part won't be executed due to the redirect, but Next.js expects a component to be returned
  return null;
}
