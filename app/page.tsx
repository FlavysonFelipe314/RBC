import Header from "@/components/header";
import HeroSlider from "@/components/hero-slider";
import PresentationSection from "@/components/presentation-section";
import BenefitsSection from "@/components/benefits-section";
import SectionDivider from "@/components/section-divider";
import ServicesSection from "@/components/services-section";
import SectorsSection from "@/components/sectors-section";
import HowItWorksSection from "@/components/how-it-works-section";
import CredibilitySection from "@/components/credibility-section";
import TestimonialsSection from "@/components/testimonials-section";
import FAQSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSlider />
      
      <PresentationSection />
      
      <BenefitsSection />
      
      <ServicesSection />
      
      <SectorsSection />
      
      <HowItWorksSection />
      
      <CredibilitySection />
      
      <TestimonialsSection />
      
      <FAQSection />
      
      <ContactSection />
      
      <CTASection />
      
      <Footer />
    </main>
  );
}
