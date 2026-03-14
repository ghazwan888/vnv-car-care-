import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Calendar, Users, Settings, Image, Star, FileText, ChevronRight, Clock, DollarSign, TrendingUp } from 'lucide-react';

type Tab = 'dashboard' | 'appointments' | 'customers' | 'services' | 'gallery' | 'reviews' | 'content';

const mockAppointments = [
  { id: 1, name: 'Ahmed K.', car: 'BMW X5', service: 'Ceramic Coating', date: '2026-03-15', time: '10:00', status: 'pending' },
  { id: 2, name: 'Sarah M.', car: 'Mercedes GLE', service: 'PPF', date: '2026-03-15', time: '14:00', status: 'approved' },
  { id: 3, name: 'Khalid R.', car: 'Porsche 911', service: 'Interior Detailing', date: '2026-03-16', time: '09:00', status: 'pending' },
  { id: 4, name: 'Omar S.', car: 'Range Rover', service: 'Window Tint', date: '2026-03-16', time: '11:00', status: 'completed' },
];

const Admin = () => {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [appointments, setAppointments] = useState(mockAppointments);

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { key: 'appointments', label: 'Appointments', icon: Calendar },
    { key: 'customers', label: 'Customers', icon: Users },
    { key: 'services', label: 'Services', icon: Settings },
    { key: 'gallery', label: 'Gallery', icon: Image },
    { key: 'reviews', label: 'Reviews', icon: Star },
    { key: 'content', label: 'Content', icon: FileText },
  ];

  const updateStatus = (id: number, status: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-border bg-card p-6 md:block">
        <h2 className="mb-8 text-xl font-bold uppercase tracking-wider text-primary" style={{ fontFamily: 'Orbitron' }}>
          VNV Admin
        </h2>
        <nav className="space-y-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                tab === t.key ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile tabs */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-border bg-card md:hidden">
        {tabs.slice(0, 5).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex flex-1 flex-col items-center gap-1 py-2 text-xs ${
              tab === t.key ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 pb-20 md:p-10 md:pb-10">
        {tab === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="mb-8 text-2xl font-bold text-foreground" style={{ fontFamily: 'Orbitron' }}>Dashboard</h1>
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Total Bookings', value: '247', icon: Calendar, color: 'text-primary' },
                { label: 'Today', value: '8', icon: Clock, color: 'text-primary' },
                { label: 'Revenue', value: '$45,200', icon: DollarSign, color: 'text-primary' },
                { label: 'Growth', value: '+23%', icon: TrendingUp, color: 'text-primary' },
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-xl p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="glass-card rounded-xl p-6">
              <h3 className="mb-4 font-semibold text-foreground">Popular Services</h3>
              <div className="space-y-3">
                {['Ceramic Coating', 'PPF', 'Interior Detailing', 'Window Tint'].map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${90 - i * 15}%` }} />
                    </div>
                    <span className="w-36 text-sm text-muted-foreground">{s}</span>
                    <span className="text-sm font-medium text-foreground">{90 - i * 15}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'appointments' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="mb-8 text-2xl font-bold text-foreground" style={{ fontFamily: 'Orbitron' }}>Appointments</h1>
            <div className="space-y-3">
              {appointments.map(a => (
                <div key={a.id} className="glass-card flex flex-wrap items-center gap-4 rounded-xl p-4">
                  <div className="flex-1 min-w-[200px]">
                    <p className="font-medium text-foreground">{a.name}</p>
                    <p className="text-sm text-muted-foreground">{a.car} · {a.service}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{a.date} at {a.time}</div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${
                    a.status === 'approved' ? 'bg-primary/10 text-primary' :
                    a.status === 'completed' ? 'bg-muted text-muted-foreground' :
                    'bg-accent text-accent-foreground'
                  }`}>
                    {a.status}
                  </span>
                  {a.status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(a.id, 'approved')} className="rounded-md bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20">Approve</button>
                      <button onClick={() => updateStatus(a.id, 'rejected')} className="rounded-md bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive hover:bg-destructive/20">Reject</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'customers' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="mb-8 text-2xl font-bold text-foreground" style={{ fontFamily: 'Orbitron' }}>Customers</h1>
            <div className="space-y-3">
              {[
                { name: 'Ahmed K.', phone: '+971 50 123 4567', bookings: 5, lastVisit: '2026-03-10' },
                { name: 'Sarah M.', phone: '+971 55 987 6543', bookings: 3, lastVisit: '2026-03-12' },
                { name: 'Khalid R.', phone: '+971 52 456 7890', bookings: 8, lastVisit: '2026-03-14' },
              ].map((c, i) => (
                <div key={i} className="glass-card flex flex-wrap items-center gap-4 rounded-xl p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">{c.name[0]}</div>
                  <div className="flex-1 min-w-[150px]">
                    <p className="font-medium text-foreground">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.phone}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{c.bookings} bookings</span>
                  <span className="text-sm text-muted-foreground">Last: {c.lastVisit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'services' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="mb-8 text-2xl font-bold text-foreground" style={{ fontFamily: 'Orbitron' }}>Service Management</h1>
            <div className="space-y-3">
              {[
                { name: 'Paint Protection Film', price: '$1,500 - $5,000', active: true },
                { name: 'Ceramic Coating', price: '$800 - $2,000', active: true },
                { name: 'Window Tint', price: '$300 - $600', active: true },
                { name: 'Paint Correction', price: '$500 - $1,500', active: true },
                { name: 'Interior Detailing', price: '$200 - $500', active: true },
              ].map((s, i) => (
                <div key={i} className="glass-card flex items-center gap-4 rounded-xl p-4">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{s.name}</p>
                    <p className="text-sm text-primary">{s.price}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Active</span>
                  <button className="text-sm text-muted-foreground hover:text-foreground">Edit</button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {(tab === 'gallery' || tab === 'reviews' || tab === 'content') && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="mb-8 text-2xl font-bold text-foreground" style={{ fontFamily: 'Orbitron' }}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Management
            </h1>
            <div className="glass-card rounded-xl p-10 text-center">
              <p className="text-muted-foreground">Connect a backend to enable {tab} management.</p>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Admin;
