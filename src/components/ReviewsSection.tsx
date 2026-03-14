import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star } from 'lucide-react';

const reviews = [
  { name: 'Ahmed K.', nameAr: 'أحمد ك.', rating: 5, text: 'Incredible work on my Mercedes. The ceramic coating is flawless!', textAr: 'عمل مذهل على مرسيدس الخاصة بي. طلاء السيراميك لا تشوبه شائبة!' },
  { name: 'Sarah M.', nameAr: 'سارة م.', rating: 5, text: 'Best PPF installation I have ever seen. VNV is truly premium.', textAr: 'أفضل تركيب فيلم حماية رأيته على الإطلاق. VNV فعلاً متميز.' },
  { name: 'Khalid R.', nameAr: 'خالد ر.', rating: 5, text: 'My BMW looks better than when I bought it. Amazing detailing!', textAr: 'BMW الخاصة بي تبدو أفضل من يوم شرائها. تفصيل مذهل!' },
];

const ReviewsSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-3xl font-bold uppercase tracking-wider md:text-4xl"
        >
          <span className="metallic-text">{t('reviews.title')}</span>
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="mb-3 flex gap-1">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="mb-4 text-sm text-muted-foreground italic">"{lang === 'ar' ? r.textAr : r.text}"</p>
              <p className="text-sm font-semibold text-foreground">{lang === 'ar' ? r.nameAr : r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
