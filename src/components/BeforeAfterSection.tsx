import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const BeforeAfterSection = () => {
  const { t } = useLanguage();
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section id="gallery" className="py-24">
      <div className="mx-auto max-w-4xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-3xl font-bold uppercase tracking-wider md:text-4xl"
        >
          <span className="metallic-text">{t('beforeAfter.title')}</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto aspect-video max-w-3xl overflow-hidden rounded-xl border border-border"
        >
          {/* Before (dark/dull) */}
          <div className="absolute inset-0 bg-secondary flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-2">🚗</div>
              <span className="text-muted-foreground text-sm uppercase tracking-wider">Before</span>
            </div>
          </div>

          {/* After (glossy/clean) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/20 via-card to-primary/10 flex items-center justify-center"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div className="text-center">
              <div className="text-6xl mb-2">✨</div>
              <span className="text-primary text-sm uppercase tracking-wider font-semibold">After</span>
            </div>
          </div>

          {/* Slider */}
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPos}
            onChange={e => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 z-10 h-full w-full cursor-ew-resize opacity-0"
          />
          <div
            className="pointer-events-none absolute top-0 bottom-0 z-10 w-0.5 bg-primary"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary p-2 shadow-lg">
              <span className="text-primary-foreground text-xs">↔</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
