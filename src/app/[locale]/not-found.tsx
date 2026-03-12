import { Link } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-foreground/80">Page not found</p>
        <Link href="/" className="mt-6 inline-block text-primary hover:underline">
          Return Home
        </Link>
      </div>
    </div>
  );
}
