import { Star } from 'lucide-react'
import { images, hero } from '../../data/siteContent'

export default function SocialProof() {
  return (
    <div className="mt-6">
      <p className="mb-2 text-[9px] uppercase tracking-[.14em] text-[#B8B6AD]">{hero.proof.label}</p>
      <div className="flex items-center gap-3">
        <div className="flex">
          {images.clientAvatars.slice(0, 4).map((src, i) => (
            <img key={i} src={src} alt="" width="22" height="22" className="-ml-1.5 h-[22px] w-[22px] rounded-full border-[1.5px] border-[#1B1C16] object-cover first:ml-0" />
          ))}
        </div>
        <div className="flex items-center gap-0.5 text-star" aria-label={`Rated ${hero.proof.rating}`}>
          {[0, 1, 2, 3, 4].map(i => <Star key={i} size={11} fill="currentColor" strokeWidth={0} />)}
          <strong className="ml-1.5 text-[11px] font-bold text-[#F3F0E9]">{hero.proof.rating}</strong>
        </div>
      </div>
    </div>
  )
}
