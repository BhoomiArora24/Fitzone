import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'

// Code-split pages for faster initial load
const OverviewPage = lazy(() => import('../pages/OverviewPage'))
const TrainersPage = lazy(() => import('../pages/TrainersPage'))
const MembersPage = lazy(() => import('../pages/MembersPage'))
const ClubsPage = lazy(() => import('../pages/ClubsPage'))
const InquiriesPage = lazy(() => import('../pages/InquiriesPage'))

function PageFallback() {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#505A3B] border-t-transparent" />
        <span className="text-xs font-semibold uppercase tracking-wider text-[#747167]">
          Loading FitZone Workspace...
        </span>
      </div>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route
          path="/overview"
          element={
            <Suspense fallback={<PageFallback />}>
              <OverviewPage />
            </Suspense>
          }
        />
        <Route
          path="/trainers"
          element={
            <Suspense fallback={<PageFallback />}>
              <TrainersPage />
            </Suspense>
          }
        />
        <Route
          path="/members"
          element={
            <Suspense fallback={<PageFallback />}>
              <MembersPage />
            </Suspense>
          }
        />
        <Route
          path="/clubs"
          element={
            <Suspense fallback={<PageFallback />}>
              <ClubsPage />
            </Suspense>
          }
        />
        <Route
          path="/inquiries"
          element={
            <Suspense fallback={<PageFallback />}>
              <InquiriesPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Route>
    </Routes>
  )
}
