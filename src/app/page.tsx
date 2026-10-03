import { CareerPicker } from "@/components/landing/career-picker";
import { ClosingCta } from "@/components/landing/closing-cta";
import { HowItWorks } from "@/components/landing/how-it-works";
import { WelcomeBack } from "@/components/landing/welcome-back";

export default function Home() {
  return (
    <>
      <WelcomeBack />
      <CareerPicker />
      <HowItWorks />
      <ClosingCta />
    </>
  );
}
