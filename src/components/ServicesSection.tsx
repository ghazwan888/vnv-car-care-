import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { Paintbrush, Shield, Sun, Sparkles, Car, Droplets, Gem, Eraser, Lightbulb, Waves } from 'lucide-react';

const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    { icon: Shield, key: 'ppf', duration: '4-8 hrs' },
    { icon: Gem, key: 'ceramic', duration: '3-5 hrs' },
    { icon: Sun, key: 'tint', duration: '2-3 hrs' },
    { icon: Paintbrush, key: 'correction', duration: '6-10 hrs' },
    { icon: Car, key: 'interior', duration: '3-5 hrs' },
    { icon: Sparkles, key: 'exterior', duration: '2-4 hrs' },
    { icon: Droplets, key: 'polish', duration: '2-4 hrs' },
    { icon: Eraser, key: 'scratch', duration: '1-3 hrs' },
    { icon: Lightbulb, key: 'headlight', duration: '1-2 hrs' },
    { icon: Waves, key: 'deep', duration: '3-5 hrs' },
  ];

  return (
    <section id="services" className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-3xl font-bold uppercase tracking-wider md:text-4xl"
        >
          <span className="metallic-text">{t('services.title')}</span>
        </motion.h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card group flex flex-col rounded-xl p-5 transition-all hover:glow-red-border"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-foreground">{t(`services.${s.key}`)}</h3>
              <p className="mb-3 flex-1 text-xs text-muted-foreground">{t(`services.${s.key}.desc`)}</p>
              <div className="mb-3 text-xs text-muted-foreground">⏱ {s.duration}</div>
              <Link
                to="/booking"
                className="rounded-md bg-primary/10 px-3 py-1.5 text-center text-xs font-semibold uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {t('services.bookNow')}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
