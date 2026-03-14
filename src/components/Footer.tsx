import { useLanguage } from '@/contexts/LanguageContext';
import vnvLogo from '@/assets/vnv-logo.png';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4">
        <img src={vnvLogo} alt="VNV" className="h-12 w-auto" />
        <p className="text-sm text-muted-foreground">{t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;
