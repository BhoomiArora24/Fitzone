import Hero from '../components/HomePage/Hero'
import AcademyImpact from '../components/HomePage/AcademyImpact'
import CoachesSection from '../components/HomePage/Coach/CoachesSection'
import GallerySection from '../components/HomePage/GallerySection'
import Teams from '../components/HomePage/Teams'
import JoinAcademy from '../components/HomePage/JoinAcademy'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AcademyImpact />
      <CoachesSection />
      <GallerySection />
      <Teams />
      <JoinAcademy />
    </>
  )
}
