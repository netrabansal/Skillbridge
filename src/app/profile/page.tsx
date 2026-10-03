import type { Metadata } from "next";
import { ProfileView } from "./profile-view";

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-12 pb-20 sm:px-6 sm:pt-16">
      <ProfileView />
    </div>
  );
}
