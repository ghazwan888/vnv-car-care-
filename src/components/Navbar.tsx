import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import vnvLogo from '@/assets/vnv-logo.png';

const Navbar = () => {
  const { t, lang, toggle } = useLanguage();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/#services', label: t('nav.services') },
    { to: '/#gallery', label: t('nav.gallery') },
    { to: '/#contact', label: t('nav.contact') },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={vnvLogo} alt="VNV" className="h-10 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/booking"
            className="rounded-md border border-primary bg-primary/10 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground glow-red"
          >
            {t('nav.booking')}
          </Link>
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Globe className="h-4 w-4" />
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="text-foreground md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card border-t border-border/50 md:hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium uppercase tracking-wider text-muted-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="rounded-md bg-primary px-5 py-2 text-center text-sm font-semibold uppercase text-primary-foreground"
              >
                {t('nav.booking')}
              </Link>
              <button
                onClick={() => { toggle(); setOpen(false); }}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Globe className="h-4 w-4" />
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
