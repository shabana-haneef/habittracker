import React, { useState, useEffect, useMemo } from 'react';
import { Plus, LayoutDashboard, Calendar as CalendarIcon, Settings as SettingsIcon, X, ChevronLeft, ChevronRight, Sparkles, CheckCircle, BarChart3, Map, Briefcase, Activity, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from './hooks/useLocalStorage';
import { formatDate, getMonthName, getDaysInMonth } from './utils/dateUtils';
import { CharacterReaction } from './components/CharacterSystem';
import HabitList from './components/HabitList';
import Analytics from './components/Analytics';
import Journey from './components/Journey';
import Settings from './components/Settings';

function App() {
  const [habits, setHabits] = useLocalStorage('habits', []);
  const [completions, setCompletions] = useLocalStorage('completions', {});
  const [activeTab, setActiveTab] = useState('tracking');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(2026);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitTime, setNewHabitTime] = useState('');
  const [newHabitDuration, setNewHabitDuration] = useState('all');

  const [fontTheme, setFontTheme] = useLocalStorage('fontTheme', 'clean');

  useEffect(() => {
    if (fontTheme === 'clean') {
      document.body.classList.add('font-clean');
    } else {
      document.body.classList.remove('font-clean');
    }
  }, [fontTheme]);

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      habits.forEach(habit => {
        if (habit.reminderTime === currentTime) {
          new Notification('Habit Reminder! 🧀', {
            body: `Time to focus on: ${habit.name}`,
            icon: 'https://pngimg.com/uploads/cheese/cheese_PNG10.png'
          });
        }
      });
    };

    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [habits]);

  const currentMonthDays = useMemo(() => {
    const days = getDaysInMonth(selectedYear, selectedMonth);
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(selectedYear, selectedMonth, i + 1);
      return formatDate(date);
    });
  }, [selectedMonth, selectedYear]);

  const toggleHabit = (habitId, date) => {
    setCompletions(prev => {
      const dayCompletions = prev[date] || [];
      const isCompleted = dayCompletions.includes(habitId);
      const newDayCompletions = isCompleted
        ? dayCompletions.filter(id => id !== habitId)
        : [...dayCompletions, habitId];

      return { ...prev, [date]: newDayCompletions };
    });
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    const today = new Date();
    const newHabit = {
      id: Date.now().toString(),
      name: newHabitName,
      reminderTime: newHabitTime,
      duration: newHabitDuration,
      startDate: formatDate(today),
      createdAt: today.toISOString(),
    };
    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setNewHabitTime('');
    setNewHabitDuration('all');
    setIsModalOpen(false);
  };

  const deleteHabit = (id) => {
    if (confirm('Are you sure you want to delete this habit?')) {
      setHabits(habits.filter(h => h.id !== id));
    }
  };

  const resetBoard = () => {
    if (confirm('CLEAN EVERYTHING? This will delete all your cheese progress and mission data!')) {
      setHabits([]);
      setCompletions({});
      setSelectedMonth(new Date().getMonth());
      setSelectedYear(2026);
      alert('The board is clean! 🧹 Time for a new hunt!');
    }
  };

  const monthlyCompletionRate = useMemo(() => {
    if (habits.length === 0) return 0;
    let totalPossible = habits.length * currentMonthDays.length;
    let totalCompleted = 0;
    currentMonthDays.forEach(date => {
      const currentHabitIds = (completions[date] || []);
      totalCompleted += currentHabitIds.filter(id => habits.some(h => h.id === id)).length;
    });
    return Math.round((totalCompleted / totalPossible) * 100);
  }, [habits, completions, currentMonthDays]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'tracking':
        return (
          <div className="glass p-4 rounded-2xl border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,0.1)] h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-400 p-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000]">
                <Plus className="text-black" size={18} />
              </div>
              <h3 className="text-2xl text-slate-900 tracking-tightest uppercase">DAILY MISSIONS</h3>
            </div>
            <HabitList
              habits={habits}
              completions={completions}
              currentMonthDays={currentMonthDays}
              toggleHabit={toggleHabit}
              deleteHabit={deleteHabit}
            />
          </div>
        );
      case 'analytics':
        return <Analytics habits={habits} completions={completions} currentMonthDays={currentMonthDays} />;
      case 'journey':
        return <Journey habits={habits} completions={completions} />;
      case 'settings':
        return <Settings habits={habits} deleteHabit={deleteHabit} onAddClick={() => setIsModalOpen(true)} onReset={resetBoard} fontTheme={fontTheme} setFontTheme={setFontTheme} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen lg:h-screen overflow-y-auto lg:overflow-hidden selection:bg-brand-primary/20 p-2 md:p-4 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:overflow-hidden">
        {/* Header - Compact and Neat */}
        <header className="flex justify-between items-center mb-4 shrink-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="bg-white/60 p-1.5 rounded-xl border-4 border-black shadow-[4px_4px_0px_#000] backdrop-blur-sm">
              <img src="https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG3.png" alt="Logo" className="w-16 h-16 object-contain" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl text-slate-900 tracking-tighter leading-none font-bold">
                Habit<span className="text-brand-secondary">Joy</span>
              </h1>
              <div className="text-[10px] text-brand-primary bg-white/80 px-2 py-0.5 rounded-xl border border-black shadow-[2px_2px_0px_#000]">
                TOM & JERRY EDITION 🧀
              </div>
            </div>
          </motion.div>
        </header>

        {/* Content Area - Row Aligned */}
        <div className="flex-1 lg:min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 pb-20 lg:pb-0">
          <main className="lg:col-span-9 flex flex-col lg:overflow-hidden relative z-1100">
            <div className="lg:flex-1 lg:overflow-y-auto no-scrollbar pb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {renderActiveTab()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>

          <aside className="lg:col-span-3 flex flex-col gap-4 overflow-hidden relative z-1100">
            <div style={{ animationDelay: '0.5s' }}>
              <CharacterReaction score={monthlyCompletionRate} />
            </div>

            <div className="glass p-4 rounded-2xl border-2 border-black shadow-[6px_6px_0px_#000] flex-1 overflow-hidden relative group">
              <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-20 transition-all rotate-12 scale-110">
                <img src="/assets/jerry.png" alt="" className="w-24 clean-image" />
              </div>

              <h4 className="font-cartoon text-slate-400 text-[10px] uppercase tracking-widest mb-4">MISSION PROGRESS</h4>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-slate-800">
                  <span className="font-cartoon text-sm uppercase">TOTAL GOALS</span>
                  <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-cartoon text-lg border-2 border-black shadow-[2px_2px_0px_#000]">{habits.length}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-slate-800">
                    <span className="font-cartoon text-sm uppercase">FLOW RATE</span>
                    <div className="flex items-center gap-1 font-cartoon text-brand-primary text-xl">
                      <img src="/assets/jerry.png" alt="" className="w-4 h-4 clean-image" />
                      {monthlyCompletionRate}%
                    </div>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full border-2 border-black overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${monthlyCompletionRate}%` }}
                      className="h-full cheese-gradient"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-dashed border-slate-100">
                  <p className="font-cartoon text-[10px] text-slate-500 italic leading-tight text-center">
                    "SCRAM! KEEP THE STREAK ALIVE!"
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Navigation - Fixed but Compact */}
        <footer className="fixed bottom-0 left-0 right-0 p-2 lg:static lg:p-0 z-[2000] lg:z-auto lg:mt-4 lg:shrink-0">
          <div className="max-w-xl mx-auto glass p-1.5 rounded-2xl flex justify-between gap-1 shadow-[4px_4px_0px_#000] border-2 border-black">
            {[
              { id: 'tracking', icon: Activity, label: 'TRACK' },
              { id: 'analytics', icon: BarChart3, label: 'STATS' },
              { id: 'journey', icon: Map, label: 'PATH' },
              { id: 'settings', icon: Plus, label: 'ADD' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-1.5 rounded-xl transition-all flex flex-col items-center gap-1 border-2 ${activeTab === tab.id
                  ? 'bg-brand-primary text-white border-black scale-105 z-10 shadow-[2px_2px_0px_#000]'
                  : 'bg-white text-slate-400 border-transparent hover:bg-slate-50'
                  }`}
              >
                <tab.icon size={18} />
                <span className="font-cartoon text-[9px] uppercase tracking-widest">{tab.label}</span>
              </button>
            ))}
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative bg-white p-5 md:p-8 rounded-3xl border-4 border-black shadow-[15px_15px_0px_#000] w-full max-w-sm md:max-w-md overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-3 vibrant-gradient" />
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl text-slate-900 leading-none">NEW MISSION</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 bg-slate-100 rounded-full border-2 border-black hover:bg-black hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={addHabit} className="space-y-6">
                <div>
                  <label className="block font-cartoon text-slate-400 text-xs uppercase tracking-widest mb-2">MISSION NAME</label>
                  <input
                    type="text"
                    autoFocus
                    required
                    value={newHabitName}
                    onChange={(e) => setNewHabitName(e.target.value)}
                    placeholder="E.G. CHASE THE CHEESE"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-black focus:border-brand-primary focus:bg-white focus:outline-none transition-all font-cartoon text-lg"
                  />
                </div>
                <div>
                  <label className="block font-cartoon text-slate-400 text-xs uppercase tracking-widest mb-2">ALARM TIME</label>
                  <input
                    type="time"
                    value={newHabitTime}
                    onChange={(e) => setNewHabitTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border-2 border-black focus:border-brand-primary focus:bg-white focus:outline-none transition-all font-cartoon text-lg"
                  />
                </div>
                <div>
                  <label className="block font-cartoon text-slate-400 text-xs uppercase tracking-widest mb-2">MISSION DURATION</label>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { value: '7', label: '7D', desc: '1 Week' },
                      { value: '14', label: '14D', desc: '2 Weeks' },
                      { value: '21', label: '21D', desc: '3 Weeks' },
                      { value: '30', label: '30D', desc: 'Month' },
                      { value: 'all', label: 'ALL', desc: 'Full Month' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setNewHabitDuration(opt.value)}
                        className={`flex-1 min-w-[60px] py-2 px-3 rounded-xl font-cartoon text-sm border-2 transition-all ${newHabitDuration === opt.value
                          ? 'bg-brand-primary text-white border-black shadow-[2px_2px_0px_#000] scale-105'
                          : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-brand-primary'
                          }`}
                      >
                        <div className="leading-none">{opt.label}</div>
                        <div className="text-[8px] opacity-70 mt-0.5">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-brand-primary text-white font-cartoon text-xl border-2 border-black shadow-[4px_4px_0px_#000] hover:scale-105 transition-all"
                >
                  START HUNT! 🧀
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="body-character-tom z-[1002]" />
      <div className="body-character-jerry z-[1002]" />
    </div>
  );
}

export default App;
