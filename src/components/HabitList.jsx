import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trash2, Clock, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';

const HabitList = ({ habits, completions, currentMonthDays, toggleHabit, deleteHabit }) => {
    const today = new Date();
    const todayStr = formatDate(today);

    // State for which week to show (0 = current week, -1 = last week, etc.)
    const [weekOffset, setWeekOffset] = useState(0);

    // Get the days of the week names
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Get the current week's dates based on offset
    const getWeekDates = () => {
        const curr = new Date();
        // Adjust to get Monday of current week
        const day = curr.getDay();
        const diff = curr.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        const monday = new Date(curr.setDate(diff));

        // Apply week offset
        monday.setDate(monday.getDate() + (weekOffset * 7));

        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            weekDates.push({
                dateStr: formatDate(date),
                dayNum: date.getDate(),
                month: date.toLocaleDateString('en-US', { month: 'short' }),
                fullDate: date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
                isToday: formatDate(date) === todayStr,
                isFuture: date > today
            });
        }
        return weekDates;
    };

    const weekDates = useMemo(() => getWeekDates(), [weekOffset, todayStr]);

    // Check if habit is completed for a date
    const isCompleted = (habitId, dateStr) => {
        return completions[dateStr]?.includes(habitId) || false;
    };

    if (habits.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 glass rounded-2xl border-2 border-dashed border-brand-primary"
            >
                <div>
                    <img src="https://pngimg.com/uploads/cheese/cheese_PNG10.png" alt="Cheese" className="w-32 h-32 drop-shadow-lg" />
                </div>
                <h3 className="text-2xl text-slate-800 tracking-tighter mt-6 mb-2 bangers-header">No Goals? Tom is Sad!</h3>
                <p className="text-brand-primary font-cartoon text-sm uppercase tracking-widest animate-pulse">Jerry is waiting for his cheese! 🧀</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Minimal Header */}
            <div className="flex items-center justify-between mb-2 px-2">
                <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-brand-primary" />
                    <h2 className="font-cartoon text-slate-800 text-sm uppercase tracking-widest">THIS WEEK</h2>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setWeekOffset(prev => prev - 1)} className="p-1 hover:bg-slate-100 rounded-full transition-all"><ChevronLeft size={16} /></button>
                    <button onClick={() => setWeekOffset(prev => Math.min(prev + 1, 0))} disabled={weekOffset >= 0} className="p-1 hover:bg-slate-100 rounded-full transition-all disabled:opacity-30"><ChevronRight size={16} /></button>
                </div>
            </div>

            <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                    {habits.map((habit) => (
                        <motion.div
                            key={habit.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-slate-100 shadow-sm relative overflow-hidden group hover:border-brand-primary/50 transition-all cursor-default"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 tracking-tight leading-none mb-1">{habit.name}</h3>
                                    <div className="flex items-center gap-2 text-slate-400 font-cartoon text-[10px]">
                                        <Clock size={12} /> {habit.reminderTime || 'ALL DAY'}
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteHabit(habit.id)}
                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Insta-story Style Day Bubbles */}
                            <div className="flex justify-between items-center relative z-10">
                                {weekDates.map((dateInfo, idx) => {
                                    const completed = isCompleted(habit.id, dateInfo.dateStr);
                                    return (
                                        <div key={dateInfo.dateStr} className="flex flex-col items-center gap-2">
                                            <span className={`text-[9px] font-cartoon uppercase tracking-wider ${dateInfo.isToday ? 'text-brand-primary font-bold' : 'text-slate-400'}`}>
                                                {dayNames[idx]}
                                            </span>

                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => toggleHabit(habit.id, dateInfo.dateStr)}
                                                disabled={dateInfo.isFuture}
                                                className={`
                                                    relative w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all
                                                    ${dateInfo.isToday ? 'ring-2 ring-offset-2 ring-brand-primary shadow-lg scale-110' : ''}
                                                    ${dateInfo.isFuture ? 'opacity-30 grayscale cursor-not-allowed' : ''}
                                                `}
                                            >
                                                {/* Background Circle */}
                                                <div
                                                    className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${completed
                                                        ? 'bg-brand-primary border-brand-primary'
                                                        : 'bg-slate-50 border-slate-200 group-hover:border-slate-300'
                                                        }`}
                                                />

                                                {/* Content */}
                                                <span className={`relative z-10 font-bold text-[9px] sm:text-sm ${completed ? 'text-white' : 'text-slate-400'}`}>
                                                    {completed ? <Check size={12} className="sm:w-4 sm:h-4" strokeWidth={3} /> : dateInfo.dayNum}
                                                </span>
                                            </motion.button>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* "Mark Today" Floating Action Button (Only if today is not done) */}
                            {!isCompleted(habit.id, todayStr) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 flex justify-center"
                                >
                                    <button
                                        onClick={() => toggleHabit(habit.id, todayStr)}
                                        className="bg-brand-primary text-white font-cartoon text-sm px-6 py-2 rounded-full shadow-lg shadow-brand-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        <Check size={16} /> MARK TODAY DONE
                                    </button>
                                </motion.div>
                            )}

                            {/* Celebration Message if Today is Done */}
                            {isCompleted(habit.id, todayStr) && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="mt-6 text-center"
                                >
                                    <span className="text-xs font-cartoon text-brand-secondary bg-brand-secondary/10 px-3 py-1 rounded-full uppercase tracking-widest">
                                        NICE WORK! 🧀
                                    </span>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HabitList;
