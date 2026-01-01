import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Calendar, Map } from 'lucide-react';

const Journey = ({ habits, completions }) => {
    // Simplified calculation for "Journey"
    const totalCheese = Object.values(completions).flat().length;
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    return (
        <div className="space-y-10 selection:bg-brand-primary/20 pb-20">
            <div className="paper-note p-6 border-3 border-[#d2b48c] shadow-[10px_10px_30px_rgba(0,0,0,0.1)] relative overflow-hidden">
                {/* Hand-drawn map texture overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-6 mb-12">
                        <div className="bg-[#8b4513] p-3 rounded-full border-3 border-black text-white">
                            <Map size={32} />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl text-slate-900 tracking-tightest leading-none">THE ADVENTURE MAP</h2>
                            <p className="font-cartoon text-[#8b4513] text-xs md:text-sm tracking-widest uppercase mt-1">CHASING CHEESE ACROSS 2026</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                        <div className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl border-3 border-dashed border-[#8b4513] text-center transform transition-transform hover:scale-105">
                            <Trophy className="text-[#ffc107] mx-auto mb-2" size={32} />
                            <p className="font-cartoon text-slate-500 uppercase tracking-widest text-[10px] mb-1">TREASURE FOUND</p>
                            <p className="text-2xl md:text-3xl bangers-header text-slate-900 tracking-wider">{totalCheese} SLICES</p>
                        </div>
                        <div className="bg-white/40 backdrop-blur-sm p-6 rounded-3xl border-3 border-dashed border-[#8b4513] text-center transform transition-transform hover:scale-105">
                            <Calendar className="text-brand-primary mx-auto mb-2" size={32} />
                            <p className="font-cartoon text-slate-500 uppercase tracking-widest text-[10px] mb-1">ACTIVE MISSIONS</p>
                            <p className="text-2xl md:text-3xl bangers-header text-slate-900 tracking-wider">{habits.length} GOALS</p>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <h3 className="font-cartoon text-[#8b4513] text-2xl uppercase tracking-[0.3em] text-center">MONTHLY CHECKPOINTS</h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            {months.map((m, i) => (
                                <motion.div
                                    key={m}
                                    whileHover={{ scale: 1.1 }}
                                    className={`w-20 h-28 rounded-2xl border-2 border-black flex flex-col items-center justify-center shadow-[4px_4px_0px_#8b4513] transition-all relative overflow-hidden ${i <= new Date().getMonth() ? 'bg-white' : 'bg-[#eee] opacity-40 grayscale'}`}
                                >
                                    {i === new Date().getMonth() && (
                                        <div className="absolute top-0 left-0 w-full h-2 bg-[#ffc107]" />
                                    )}
                                    <span className="font-cartoon text-[8px] text-slate-400 mb-1">2026</span>
                                    <span className="text-2xl bangers-header text-slate-800 tracking-wider whitespace-nowrap px-2">{m}</span>
                                    {i <= new Date().getMonth() && (
                                        <div className="mt-4 flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-[#ffc107]" />
                                            <div className="w-2 h-2 rounded-full bg-[#ffc107]" />
                                            <div className="w-2 h-2 rounded-full bg-[#ffc107]" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center py-6 opacity-60">
                <img src="https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG61.png" alt="" className="w-24 mr-6" />
                <div className="max-w-xs">
                    <p className="font-cartoon text-xl text-[#5d4037] uppercase leading-tight">
                        "EACH SLICE OF CHEESE BRINGS YOU CLOSER TO MASTERY!"
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Journey;
