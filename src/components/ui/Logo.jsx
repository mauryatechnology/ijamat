import { Link } from 'react-router-dom'

export default function Logo({ size = 'md', showTagline = true, variant = 'default' }) {
  const heightClasses = {
    sm: 'h-7',
    md: 'h-9 md:h-11',
    lg: 'h-14 md:h-16',
  }

  const iconSizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  }

  if (variant === 'icon') {
    return (
      <Link to="/" className="inline-flex items-center group select-none decoration-none">
        <img
          src="/favicon.png"
          alt="Jamaat Cloud"
          className={`${iconSizeClasses[size] || iconSizeClasses.md} object-contain transition-transform duration-300 group-hover:scale-105`}
        />
      </Link>
    )
  }

  return (
    <Link to="/" className="inline-flex items-center gap-2 group select-none decoration-none">
      <img
        src="/logo.png"
        alt="Jamaat Cloud - Simplifying Operations"
        className={`${heightClasses[size] || heightClasses.md} object-contain transition-transform duration-300 group-hover:scale-102`}
      />
    </Link>
  )
}
