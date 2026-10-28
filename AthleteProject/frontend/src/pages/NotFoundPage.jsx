import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center bg-cream px-6 py-28 text-center">
      <p className="font-display text-8xl font-bold tracking-tight text-stone-300 sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-ink sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-mute">
        The workout page or route you are looking for does not exist or has been relocated.
      </p>
      <Link
        to="/"
        className="btn btn-lg mt-8 inline-flex items-center gap-2 rounded-sm bg-olive px-6 py-3.5 text-white transition-colors hover:bg-olive-dark"
      >
        <ArrowLeft size={16} />
        Back To FitZone
      </Link>
    </section>
  )
}
