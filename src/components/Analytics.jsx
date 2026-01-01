import React, { useMemo } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    Cell, AreaChart, Area
} from 'recharts';
import { motion } from 'framer-motion';
import { formatDate } from '../utils/dateUtils';

const Analytics = ({ habits, completions, currentMonthDays }) => {
    // Helper to get all quest days for a habit based on its duration
    const getHabitQuestDays = (habit) => {
        const startDate = habit.startDate ? new Date(habit.startDate) : new Date(habit.createdAt);
        const duration = habit.duration || 'all';

        if (duration === 'all') {
            return currentMonthDays;
        }

        const durationNum = parseInt(duration, 10);
        const questDays = [];

        for (let i = 0; i < durationNum; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            questDays.push(formatDate(date));
        }

        return questDays;
    };

    const dailyData = useMemo(() => {
        let cumulative = 0;
        return currentMonthDays.map((date) => {
            const dayNum = date.split('-')[2];
            const count = (completions[date] || []).filter(id => habits.some(h => h.id === id)).length;
            cumulative += count;
            const rate = habits.length > 0 ? Math.round((count / habits.length) * 100) : 0;
            return {
                name: dayNum,
                day: dayNum,
                completed: count,
                trend: cumulative,
                rate: rate
            };
        });
    }, [habits, completions, currentMonthDays]);

    const habitSummary = useMemo(() => {
        return habits.map(habit => {
            const questDays = getHabitQuestDays(habit);
            let count = 0;
            questDays.forEach(date => {
                if (completions[date]?.includes(habit.id)) count++;
            });
            const totalDays = questDays.length;
            const durationLabel = habit.duration === 'all' || !habit.duration
                ? 'Full Month'
                : `${habit.duration} Days`;
            return {
                id: habit.id,
                name: habit.name,
                percentage: totalDays > 0 ? Math.round((count / totalDays) * 100) : 0,
                count,
                totalDays,
                durationLabel
            };
        });
    }, [habits, completions, currentMonthDays]);

    const cheeseCount = useMemo(() => {
        let total = 0;
        Object.values(completions).forEach(dayComps => {
            total += dayComps.filter(id => habits.some(h => h.id === id)).length;
        });
        return total;
    }, [completions, habits]);

    const overallScore = useMemo(() => {
        if (habits.length === 0) return 0;
        // Calculate based on each habit's individual duration
        let totalPossible = 0;
        let totalCompleted = 0;
        habits.forEach(habit => {
            const questDays = getHabitQuestDays(habit);
            totalPossible += questDays.length;
            questDays.forEach(date => {
                if (completions[date]?.includes(habit.id)) totalCompleted++;
            });
        });
        return totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;
    }, [habits, completions, currentMonthDays]);


    return (
        <div className="space-y-12 pb-20">
            {/* Scoreboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="chalkboard flex flex-col items-center justify-center p-4">
                    <p className="text-white/60 font-cartoon text-[10px] uppercase mb-1">SCORE</p>
                    <p className="text-3xl md:text-4xl font-cartoon text-brand-primary">{overallScore}%</p>
                </div>
                <div className="chalkboard flex flex-col items-center justify-center p-4">
                    <p className="text-white/60 font-cartoon text-[10px] uppercase mb-1">CHEESE</p>
                    <p className="text-3xl md:text-4xl font-cartoon text-brand-secondary">{cheeseCount}</p>
                </div>
                <div className="chalkboard flex flex-col items-center justify-center p-4">
                    <p className="text-white/60 font-cartoon text-[10px] uppercase mb-1">STATUS</p>
                    <p className="text-xl font-cartoon text-white leading-tight text-center">
                        {overallScore >= 75 ? 'CHASE MASTER' : overallScore >= 40 ? 'Sly Hunter' : 'Just Warmup'}
                    </p>
                </div>
            </div>

            {/* Main Chalkboard Graph */}
            <div className="chalkboard overflow-hidden min-h-[300px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl md:text-2xl text-white font-cartoon tracking-widest uppercase">MONTHLY PERFORMANCE</h3>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-brand-primary" />
                        <p className="text-white/60 font-cartoon text-xs">CHASE RATE</p>
                    </div>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={dailyData}>
                            <defs>
                                <linearGradient id="chalkGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ffc107" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ffc107" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="name"
                                stroke="#ffffff33"
                                tick={{ fill: '#ffffff66', fontSize: 12, fontFamily: 'Luckiest Guy' }}
                            />
                            <YAxis
                                hide
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#2d4a3e', border: '2px solid white', borderRadius: '12px' }}
                                itemStyle={{ color: '#ffc107', fontFamily: 'Luckiest Guy' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="rate"
                                stroke="#ffc107"
                                strokeWidth={4}
                                fill="url(#chalkGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Individual Missions (Paper Notes) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {habitSummary.map((summary, idx) => (
                    <motion.div
                        key={summary.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="paper-note"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-[10px] font-cartoon text-slate-400 uppercase">MISSION PATH</p>
                                <h4 className="text-2xl text-slate-800 uppercase tracking-tighter leading-none">{summary.name}</h4>
                                <p className="text-[9px] font-cartoon text-brand-secondary mt-1 px-2 py-0.5 bg-brand-secondary/10 rounded-md inline-block">{summary.durationLabel}</p>
                            </div>
                            <div className="bg-brand-primary text-white p-2 rounded-lg border-2 border-black">
                                <p className="font-cartoon text-sm leading-none">{summary.percentage}%</p>
                            </div>
                        </div>
                        <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden border-2 border-black">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${summary.percentage}%` }}
                                className="absolute top-0 left-0 h-full cheese-gradient"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none">
                            <img src="https://pngimg.com/uploads/cheese/cheese_PNG10.png" alt="" className="w-32" />
                        </div>
                        <p className="mt-4 font-cartoon text-slate-400 text-xs text-center uppercase">
                            {summary.count} / {summary.totalDays} CHEESE COLLECTED
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Final Mandatory Message Area - Compact and Cute */}
            <div className="flex justify-center items-center py-6 opacity-80">
                <img src="https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG61.png" alt="" className="w-16 drop-shadow-md" />
                <p className="text-xl font-cartoon text-brand-primary uppercase ml-4 tracking-tighter shadow-black">THE CHASE CONTINUES...</p>
                <img src="https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG11.png" alt="" className="w-10 ml-4 drop-shadow-md" />
            </div>
        </div>
    );
};

export default Analytics;
