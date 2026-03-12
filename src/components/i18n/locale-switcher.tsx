'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('locale');

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          title={t('switch')}
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">{t('switch')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => switchLocale('en')}
          className={locale === 'en' ? 'bg-primary/10' : ''}
        >
          {t('en')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLocale('pt')}
          className={locale === 'pt' ? 'bg-primary/10' : ''}
        >
          {t('pt')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
