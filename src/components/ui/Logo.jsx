import { Link } from 'react-router-dom'

export default function Logo({ size = 'md', showTagline = true, variant = 'default' }) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-3xl',
  }

  const iconSizeClasses = {
    sm: 'w-6 h-6 text-sm rounded',
    md: 'w-8 h-8 text-base rounded-lg',
    lg: 'w-10 h-10 text-xl rounded-xl',
  }

  const colorClass = variant === 'white' ? 'text-white' : 'text-primary'
  const taglineColorClass = variant === 'white' ? 'text-white/60' : 'text-gray-500'

  return (
    <Link to="/" className="flex items-center gap-2 group select-none decoration-none">
      <div className={`${iconSizeClasses[size] || iconSizeClasses.md} bg-primary flex items-center justify-center text-white font-bold font-heading shrink-0 shadow-md shadow-primary/20 group-hover:scale-105 transition-transform duration-300`}>
        iJ
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-heading font-extrabold tracking-tight ${sizeClasses[size] || sizeClasses.md} ${colorClass}`}>
          iJamaat
        </span>
        {showTagline && (
          <span className={`text-[9px] uppercase tracking-wider font-semibold ${taglineColorClass} mt-0.5`}>
            by Fakhri
          </span>
        )}
      </div>
    </Link>
  )
}
