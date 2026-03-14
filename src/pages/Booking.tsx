import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { CheckCircle } from 'lucide-react';

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

const bookedSlots: Record<string, string[]> = {
  '2026-03-15': ['10:00', '14:00'],
  '2026-03-16': ['09:00', '11:00', '15:00'],
};

const Booking = () => {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [service, setService] = useState('');
  const [pkg, setPkg] = useState('');
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState('');
  const [car, setCar] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const services = [
    { id: 'ppf', label: t('services.ppf') },
    { id: 'ceramic', label: t('services.ceramic') },
    { id: 'tint', label: t('services.tint') },
    { id: 'correction', label: t('services.correction') },
    { id: 'interior', label: t('services.interior') },
    { id: 'exterior', label: t('services.exterior') },
    { id: 'polish', label: t('services.polish') },
    { id: 'scratch', label: t('services.scratch') },
    { id: 'headlight', label: t('services.headlight') },
    { id: 'deep', label: t('services.deep') },
  ];

  const packages = [
    { id: 'bronze', label: t('packages.bronze'), price: '$299' },
    { id: 'silver', label: t('packages.silver'), price: '$599' },
    { id: 'gold', label: t('packages.gold'), price: '$999' },
    { id: 'vip', label: t('packages.vip'), price: '$1,999' },
  ];

  const dateKey = date?.toISOString().split('T')[0] || '';
  const unavailable = bookedSlots[dateKey] || [];
  const availableSlots = timeSlots.filter(s => !unavailable.includes(s));

  const handleSubmit = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card glow-red-border mx-4 max-w-md rounded-2xl p-10 text-center"
          >
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
            <h2 className="mb-2 text-2xl font-bold text-foreground">{t('booking.success')}</h2>
            <p className="text-muted-foreground">{t('booking.successMsg')}</p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-28">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center text-3xl font-bold uppercase tracking-wider"
        >
          <span className="metallic-text">{t('booking.title')}</span>
        </motion.h1>

        {/* Progress */}
        <div className="mb-10 flex justify-center gap-2">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`h-1.5 w-12 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="mb-4 text-lg font-semibold text-foreground">{t('booking.service')}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setService(s.id)}
                    className={`rounded-lg border p-4 text-start text-sm transition-all ${
                      service === s.id ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <h3 className="mb-4 mt-8 text-lg font-semibold text-foreground">{t('booking.package')}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {packages.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPkg(p.id)}
                    className={`rounded-lg border p-4 text-start text-sm transition-all ${
                      pkg === p.id ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'
                    }`}
                  >
                    <span className="font-semibold">{p.label}</span>
                    <span className="ml-2 text-primary">{p.price}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => service && setStep(2)}
                disabled={!service}
                className="mt-8 w-full rounded-md bg-primary py-3 text-sm font-bold uppercase text-primary-foreground disabled:opacity-50"
              >
                {lang === 'ar' ? 'التالي' : 'Next'}
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="mb-4 text-lg font-semibold text-foreground">{t('booking.date')}</h3>
              <div className="mb-6 flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date()}
                  className="rounded-xl border border-border"
                />
              </div>
              {date && (
                <>
                  <h3 className="mb-4 text-lg font-semibold text-foreground">{t('booking.time')}</h3>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                    {timeSlots.map(slot => {
                      const available = !unavailable.includes(slot);
                      return (
                        <button
                          key={slot}
                          disabled={!available}
                          onClick={() => setTime(slot)}
                          className={`rounded-lg border py-2 text-sm transition-all ${
                            time === slot
                              ? 'border-primary bg-primary/10 text-primary'
                              : available
                              ? 'border-border text-muted-foreground hover:border-primary/50'
                              : 'cursor-not-allowed border-border/50 text-muted-foreground/30 line-through'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
              <div className="mt-8 flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 rounded-md border border-border py-3 text-sm font-bold uppercase text-foreground">
                  {lang === 'ar' ? 'السابق' : 'Back'}
                </button>
                <button
                  onClick={() => date && time && setStep(3)}
                  disabled={!date || !time}
                  className="flex-1 rounded-md bg-primary py-3 text-sm font-bold uppercase text-primary-foreground disabled:opacity-50"
                >
                  {lang === 'ar' ? 'التالي' : 'Next'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">{t('booking.car')}</label>
                <Input value={car} onChange={e => setCar(e.target.value)} placeholder="e.g. BMW X5 2024" className="bg-secondary border-border" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">{t('booking.name')}</label>
                <Input value={name} onChange={e => setName(e.target.value)} className="bg-secondary border-border" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">{t('booking.phone')}</label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="bg-secondary border-border" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">{t('booking.notes')}</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(2)} className="flex-1 rounded-md border border-border py-3 text-sm font-bold uppercase text-foreground">
                  {lang === 'ar' ? 'السابق' : 'Back'}
                </button>
                <button
                  onClick={() => name && phone && car && setStep(4)}
                  disabled={!name || !phone || !car}
                  className="flex-1 rounded-md bg-primary py-3 text-sm font-bold uppercase text-primary-foreground disabled:opacity-50"
                >
                  {lang === 'ar' ? 'مراجعة' : 'Review'}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="glass-card rounded-xl p-6 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t('booking.service')}</span><span className="text-foreground font-medium">{services.find(s => s.id === service)?.label}</span></div>
                {pkg && <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t('booking.package')}</span><span className="text-foreground font-medium">{packages.find(p => p.id === pkg)?.label}</span></div>}
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t('booking.date')}</span><span className="text-foreground font-medium">{date?.toLocaleDateString()}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t('booking.time')}</span><span className="text-foreground font-medium">{time}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t('booking.car')}</span><span className="text-foreground font-medium">{car}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t('booking.name')}</span><span className="text-foreground font-medium">{name}</span></div>
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t('booking.phone')}</span><span className="text-foreground font-medium">{phone}</span></div>
                {notes && <div className="flex justify-between text-sm"><span className="text-muted-foreground">{t('booking.notes')}</span><span className="text-foreground font-medium">{notes}</span></div>}
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep(3)} className="flex-1 rounded-md border border-border py-3 text-sm font-bold uppercase text-foreground">
                  {lang === 'ar' ? 'السابق' : 'Back'}
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 rounded-md bg-primary py-3 text-sm font-bold uppercase text-primary-foreground glow-red"
                >
                  {t('booking.confirm')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default Booking;
