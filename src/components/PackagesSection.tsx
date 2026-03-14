import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const PackagesSection = () => {
  const { t, lang } = useLanguage();

  const packages = [
    {
      key: 'bronze',
      price: '299',
      features: lang === 'ar'
        ? ['غسيل خارجي', 'تلميع يدوي', 'تنظيف داخلي بسيط', 'تعطير']
        : ['Exterior wash', 'Hand polish', 'Basic interior clean', 'Air freshener'],
    },
    {
      key: 'silver',
      price: '599',
      features: lang === 'ar'
        ? ['كل ما في البرونزي', 'تصحيح طلاء خفيف', 'طلاء سيراميك سريع', 'تنظيف محرك']
        : ['Everything in Bronze', 'Light paint correction', 'Express ceramic coat', 'Engine cleaning'],
    },
    {
      key: 'gold',
      price: '999',
      popular: true,
      features: lang === 'ar'
        ? ['كل ما في الفضي', 'تصحيح طلاء كامل', 'طلاء سيراميك متقدم', 'تنظيف داخلي عميق', 'ترميم مصابيح']
        : ['Everything in Silver', 'Full paint correction', 'Advanced ceramic coat', 'Deep interior detail', 'Headlight restoration'],
    },
    {
      key: 'vip',
      price: '1,999',
      features: lang === 'ar'
        ? ['كل ما في الذهبي', 'فيلم حماية طلاء كامل', 'تظليل نوافذ', 'حماية جلد', 'ضمان سنة كاملة']
        : ['Everything in Gold', 'Full PPF coverage', 'Window tint', 'Leather protection', '1-year warranty'],
    },
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
          <span className="metallic-text">{t('packages.title')}</span>
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card relative flex flex-col rounded-xl p-6 ${pkg.popular ? 'glow-red-border border-primary' : ''}`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase text-primary-foreground">
                  {lang === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                </span>
              )}
              <h3 className="mb-1 text-center text-lg font-bold uppercase tracking-wider text-foreground">
                {t(`packages.${pkg.key}`)}
              </h3>
              <p className="mb-6 text-center">
                <span className="text-3xl font-black text-primary">${pkg.price}</span>
              </p>
              <ul className="mb-6 flex-1 space-y-2">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-0.5 text-primary">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/booking"
                className={`rounded-md py-3 text-center text-sm font-bold uppercase tracking-wider transition-all ${
                  pkg.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-border text-foreground hover:border-primary hover:text-primary'
                }`}
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

export default PackagesSection;
