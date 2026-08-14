import HeroParallax from "@/components/ui/hero-parallax";
import AboutPreview from "@/components/sections/home/AboutPreview";
import WhatWeDo from "@/components/sections/home/WhatWeDo";
import ServicesPreview from "@/components/sections/home/ServicesPreview";
import ProjectsPreview from "@/components/sections/home/ProjectsPreview";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import TestimonialsPreview from "@/components/sections/home/TestimonialsPreview";
import LocationPreview from "@/components/sections/home/LocationPreview";
import ContactCTA from "@/components/sections/home/ContactCTA";

function Home() {
  return (
    <main>
      <HeroParallax />
      <AboutPreview />
      <WhatWeDo />
      <ServicesPreview />
      <ProjectsPreview />
      <WhyChooseUs />
      <TestimonialsPreview />
      <LocationPreview />
      <ContactCTA />
    </main>
  );
}

export default Home;