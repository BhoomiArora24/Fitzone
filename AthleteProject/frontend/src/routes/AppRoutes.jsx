import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ProgramsPage from '../pages/ProgramsPage'
import ContactPage from '../pages/ContactPage'
import FreePassPage from '../pages/FreePassPage'
import NotFoundPage from '../pages/NotFoundPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Main landing / home page */}
        <Route index element={<HomePage />} />

        {/* About Us page */}
        <Route path="about" element={<AboutPage />} />

        {/* Explore Programs page */}
        <Route path="programs" element={<ProgramsPage />} />

        {/* Contact Us page */}
        <Route path="contact" element={<ContactPage />} />

        {/* Free Workout Pass page */}
        <Route path="free-pass" element={<FreePassPage />} />
        <Route path="claim-pass" element={<FreePassPage />} />

        {/* 404 catch-all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
