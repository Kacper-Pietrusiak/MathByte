import { Hero } from "@/components/landing/Hero";
import { WhyMathbyte } from "@/components/landing/WhyMathbyte";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
export default function Home() {
  return (
    <>
      <Hero />
      <WhyMathbyte />
      <HowItWorks />
      <Pricing  />
      <Testimonials />
      <FAQ />
    </>
  );
}
