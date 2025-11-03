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
        width={40}
        height={40}
        className="w-8 h-8 md:w-10 md:h-10"
        priority
      />
    </Link>
  );
}

