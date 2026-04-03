import LenisProvider from '@/components/landing/LenisProvider'
import HeroSection from '@/components/landing/HeroSection'
import ConceptSection from '@/components/landing/ConceptSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import FeaturedPersonasSection from '@/components/landing/FeaturedPersonasSection'
import PricingSection from '@/components/landing/PricingSection'
import DualPathSection from '@/components/landing/DualPathSection'
import SecuritySection from '@/components/landing/SecuritySection'
import FooterSection from '@/components/landing/FooterSection'

export default function HomePage() {
  return (
    <LenisProvider>
      <div style={{ backgroundColor: '#FAFAF8', minHeight: '100vh' }}>
        <HeroSection />
        <ConceptSection />
        <HowItWorksSection />
        <FeaturedPersonasSection />
        <PricingSection />
        <SecuritySection />
        <DualPathSection />
        <FooterSection />
      </div>
    </LenisProvider>
  )
}
