import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card glow-red-border rounded-2xl p-12 md:p-16"
        >
          <h2 className="mb-4 text-3xl font-bold uppercase tracking-wider md:text-4xl">
            <span className="glow-red-text text-primary">{t('cta.title')}</span>
          </h2>
          <p className="mb-8 text-muted-foreground">{t('cta.sub')}</p>
          <Link
            to="/booking"
            className="glow-red inline-block rounded-md bg-primary px-10 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:scale-105"
          >
            {t('hero.book')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
