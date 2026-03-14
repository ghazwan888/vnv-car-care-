import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'en' | 'ar';

interface LanguageContextType {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  toggle: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  'nav.home': { en: 'Home', ar: 'الرئيسية' },
  'nav.services': { en: 'Services', ar: 'الخدمات' },
  'nav.booking': { en: 'Book Now', ar: 'احجز الآن' },
  'nav.gallery': { en: 'Gallery', ar: 'المعرض' },
  'nav.contact': { en: 'Contact', ar: 'اتصل بنا' },
  'hero.headline': { en: 'Your Car Deserves Perfection', ar: 'سيارتك تستحق الكمال' },
  'hero.sub': { en: 'Luxury Protection. Perfect Finish.', ar: 'حماية فاخرة. لمسة نهائية مثالية.' },
  'hero.book': { en: 'Book Appointment', ar: 'احجز موعد' },
  'hero.explore': { en: 'Explore Services', ar: 'استكشف خدماتنا' },
  'trust.title': { en: 'Why Choose VNV?', ar: 'لماذا تختار VNV؟' },
  'trust.equipment': { en: 'Premium Equipment', ar: 'معدات متميزة' },
  'trust.equipment.desc': { en: 'State-of-the-art tools and materials from world-leading brands', ar: 'أدوات ومواد متطورة من أفضل العلامات التجارية العالمية' },
  'trust.certified': { en: 'Certified Films', ar: 'أفلام معتمدة' },
  'trust.certified.desc': { en: 'Authorized installer of premium protection films with full warranty', ar: 'مُركّب معتمد لأفلام الحماية المتميزة مع ضمان كامل' },
  'trust.experts': { en: 'Expert Technicians', ar: 'فنيون خبراء' },
  'trust.experts.desc': { en: 'Highly trained professionals with years of detailing experience', ar: 'محترفون مدربون بخبرة سنوات في العناية بالسيارات' },
  'trust.warranty': { en: 'Full Warranty', ar: 'ضمان شامل' },
  'trust.warranty.desc': { en: 'Complete peace of mind with our comprehensive service warranty', ar: 'راحة بال تامة مع ضمان الخدمة الشامل' },
  'services.title': { en: 'Our Premium Services', ar: 'خدماتنا المتميزة' },
  'services.ppf': { en: 'Paint Protection Film', ar: 'فيلم حماية الطلاء' },
  'services.ppf.desc': { en: 'Invisible armor for your paint. Self-healing, ultra-clear protection.', ar: 'درع غير مرئي لطلاء سيارتك. حماية ذاتية الشفاء فائقة الوضوح.' },
  'services.ceramic': { en: 'Ceramic Coating', ar: 'طلاء سيراميك' },
  'services.ceramic.desc': { en: 'Diamond-hard coating for unmatched gloss and hydrophobic protection.', ar: 'طلاء صلب كالألماس لمعان لا مثيل له وحماية مقاومة للماء.' },
  'services.tint': { en: 'Window Tint', ar: 'تظليل النوافذ' },
  'services.tint.desc': { en: 'Premium nano-ceramic tint for UV protection and privacy.', ar: 'تظليل نانو سيراميك متميز للحماية من الأشعة فوق البنفسجية والخصوصية.' },
  'services.correction': { en: 'Paint Correction', ar: 'تصحيح الطلاء' },
  'services.correction.desc': { en: 'Multi-stage polishing to remove swirls, scratches, and oxidation.', ar: 'تلميع متعدد المراحل لإزالة الخدوش والأكسدة.' },
  'services.interior': { en: 'Interior Detailing', ar: 'تنظيف داخلي' },
  'services.interior.desc': { en: 'Deep cleaning and conditioning for a showroom-fresh interior.', ar: 'تنظيف عميق وتكييف لداخلية بمظهر صالة العرض.' },
  'services.exterior': { en: 'Exterior Detailing', ar: 'تنظيف خارجي' },
  'services.exterior.desc': { en: 'Complete exterior restoration to a mirror-like finish.', ar: 'استعادة كاملة للمظهر الخارجي بلمعان كالمرآة.' },
  'services.polish': { en: 'Polishing', ar: 'تلميع' },
  'services.polish.desc': { en: 'Professional machine polishing for deep gloss enhancement.', ar: 'تلميع آلي احترافي لتعزيز اللمعان العميق.' },
  'services.scratch': { en: 'Scratch Removal', ar: 'إزالة الخدوش' },
  'services.scratch.desc': { en: 'Advanced techniques to eliminate surface imperfections.', ar: 'تقنيات متقدمة للقضاء على عيوب السطح.' },
  'services.headlight': { en: 'Headlight Restoration', ar: 'ترميم المصابيح' },
  'services.headlight.desc': { en: 'Crystal-clear headlight restoration for better visibility.', ar: 'ترميم المصابيح لوضوح كريستالي ورؤية أفضل.' },
  'services.deep': { en: 'Deep Cleaning', ar: 'تنظيف عميق' },
  'services.deep.desc': { en: 'Thorough decontamination and sanitization of every surface.', ar: 'تطهير شامل وتعقيم لكل سطح.' },
  'services.bookNow': { en: 'Book Now', ar: 'احجز الآن' },
  'beforeAfter.title': { en: 'See The Difference', ar: 'شاهد الفرق' },
  'reviews.title': { en: 'What Our Clients Say', ar: 'ماذا يقول عملاؤنا' },
  'packages.title': { en: 'Premium Packages', ar: 'الباقات المتميزة' },
  'packages.bronze': { en: 'Bronze', ar: 'برونزي' },
  'packages.silver': { en: 'Silver', ar: 'فضي' },
  'packages.gold': { en: 'Gold', ar: 'ذهبي' },
  'packages.vip': { en: 'VIP', ar: 'VIP' },
  'cta.title': { en: 'Book Your Appointment Now', ar: 'احجز موعدك الآن' },
  'cta.sub': { en: 'Experience the VNV difference. Your car deserves the best.', ar: 'اختبر فرق VNV. سيارتك تستحق الأفضل.' },
  'booking.title': { en: 'Book Your Appointment', ar: 'احجز موعدك' },
  'booking.service': { en: 'Select Service', ar: 'اختر الخدمة' },
  'booking.package': { en: 'Select Package', ar: 'اختر الباقة' },
  'booking.date': { en: 'Select Date', ar: 'اختر التاريخ' },
  'booking.time': { en: 'Select Time', ar: 'اختر الوقت' },
  'booking.car': { en: 'Car Model', ar: 'موديل السيارة' },
  'booking.name': { en: 'Full Name', ar: 'الاسم الكامل' },
  'booking.phone': { en: 'Phone Number', ar: 'رقم الهاتف' },
  'booking.notes': { en: 'Additional Notes', ar: 'ملاحظات إضافية' },
  'booking.confirm': { en: 'Confirm Booking', ar: 'تأكيد الحجز' },
  'booking.success': { en: 'Booking Confirmed!', ar: 'تم تأكيد الحجز!' },
  'booking.successMsg': { en: 'We will contact you shortly to confirm your appointment.', ar: 'سنتواصل معك قريباً لتأكيد موعدك.' },
  'footer.rights': { en: '© 2026 VNV Car Care. All rights reserved.', ar: '© 2026 VNV Car Care. جميع الحقوق محفوظة.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('vnv-lang') as Lang) || 'en';
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('vnv-lang', lang);
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  const toggle = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <LanguageContext.Provider value={{ lang, dir, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
