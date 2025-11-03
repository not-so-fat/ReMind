import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  href?: string;
  className?: string;
}

export default function Logo({ href = '/', className = '' }: LogoProps) {
  return (
    <Link href={href} className={`inline-block ${className}`}>
      <Image
        src="/remind-logo.svg"
        alt="ReMind Logo"
        width={80}
        height={80}
        className="w-12 h-12 md:w-16 md:h-16"
        priority
      />
    </Link>
  );
}

