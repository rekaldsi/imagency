import Link from 'next/link'

export interface Creator {
  id: string
  firstName: string
  lastInitial: string
  ageRange: string
  voiceType: string
  availableUses: string[]
  totalEarnings?: number
  avatarSeed: number
  skinTone?: string
  accent?: string
}

interface CreatorCardProps {
  creator: Creator
  showLicense?: boolean
}

export default function CreatorCard({ creator, showLicense = false }: CreatorCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-warm-border overflow-hidden hover:shadow-md transition-shadow">
      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden bg-warm-cream">
        <img
          src={`https://i.pravatar.cc/400?img=${creator.avatarSeed}`}
          alt={`${creator.firstName} ${creator.lastInitial}.`}
          className="w-full h-full object-cover"
        />
        {creator.totalEarnings !== undefined && creator.totalEarnings > 0 && (
          <div className="absolute top-3 right-3 bg-gold text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            ${(creator.totalEarnings / 1000).toFixed(1)}k earned
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="font-semibold text-charcoal">
              {creator.firstName} {creator.lastInitial}.
            </div>
            <div className="text-sm text-charcoal-muted">
              {creator.ageRange} · {creator.voiceType}
            </div>
          </div>
        </div>

        {/* Use Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {creator.availableUses.slice(0, 3).map((use) => (
            <span key={use} className="text-xs bg-warm-cream text-charcoal-muted px-2 py-0.5 rounded-full">
              {use}
            </span>
          ))}
          {creator.availableUses.length > 3 && (
            <span className="text-xs text-charcoal-light">+{creator.availableUses.length - 3}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/buyer/profile/${creator.id}`}
            className="flex-1 text-center text-sm py-2 border border-warm-border rounded-lg text-charcoal hover:bg-warm-cream transition-colors"
          >
            Preview
          </Link>
          {showLicense && (
            <Link
              href={`/buyer/license?creatorId=${creator.id}`}
              className="flex-1 text-center text-sm py-2 bg-charcoal text-warm-white rounded-lg hover:bg-charcoal/90 transition-colors"
            >
              License
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
