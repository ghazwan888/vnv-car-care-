import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Award, Users, BadgeCheck } from 'lucide-react';

const TrustSection = () => {
  const { t } = useLanguage();

  const items = [
    { icon: Shield, title: t('trust.equipment'), desc: t('trust.equipment.desc') },
    { icon: Award, title: t('trust.certified'), desc: t('trust.certified.desc') },
    { icon: Users, title: t('trust.experts'), desc: t('trust.experts.desc') },
    { icon: BadgeCheck, title: t('trust.warranty'), desc: t('trust.warranty.desc') },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-3xl font-bold uppercase tracking-wider md:text-4xl"
        >
          <span className="metallic-text">{t('trust.title')}</span>
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card group rounded-xl p-6 text-center transition-all hover:glow-red-border"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
