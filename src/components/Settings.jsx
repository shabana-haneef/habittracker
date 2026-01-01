import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, RefreshCcw, Wrench, Sparkles } from 'lucide-react';

const Settings = ({ habits, deleteHabit, onAddClick, onReset, fontTheme, setFontTheme }) => {
    return (
        <div className="space-y-10 selection:bg-brand-primary/20 pb-20">
            {/* Workshop Board */}
            <div className="glass p-6 rounded-3xl border-6 border-[#8b4513] shadow-[10px_10px_0px_rgba(0,0,0,0.1)] relative overflow-hidden">
                {/* Wood Texture */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-center mb-8 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border-2 border-[#8b4513]/30">
                        <div className="flex items-center gap-4">
                            <div className="bg-brand-primary p-3 rounded-xl border-3 border-black text-white shadow-[3px_3px_0px_#000]">
                                <Wrench size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl md:text-3xl text-[#5d4037] tracking-tightest leading-none">THE WORKSHOP</h2>
                                <p className="font-cartoon text-[#8b4513] text-[10px] md:text-xs uppercase tracking-widest mt-0.5">Add & Manage Goals</p>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onAddClick}
                            className="bg-brand-primary text-white px-3 py-2 md:px-5 md:py-3 rounded-2xl border-3 border-black shadow-[4px_4px_0px_#000] group flex items-center gap-2"
                        >
                            <Plus size={20} />
                            <span className="font-cartoon text-xs md:text-sm hidden sm:inline">ADD NEW</span>
                        </motion.button>
                    </div>

                    <div className="space-y-8">
                        <section>
                            <div className="bg-white/40 p-4 rounded-2xl border-2 border-[#8b4513]/20 backdrop-blur-sm flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-brand-primary p-2 rounded-lg border-2 border-black text-white shadow-[2px_2px_0px_#000]">
                                        <Sparkles size={16} />
                                    </div>
                                    <div>
                                        <h4 className="font-cartoon text-[#5d4037] text-sm md:text-base leading-none">CARTOON MODE</h4>
                                        <p className="font-cartoon text-[#8b4513]/60 text-[10px] uppercase tracking-wider">Use Fun Fonts</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setFontTheme(fontTheme === 'cartoon' ? 'clean' : 'cartoon')}
                                    className={`relative w-12 h-7 rounded-full transition-all duration-200 border-2 border-black shadow-[2px_2px_0px_#000] ${fontTheme === 'cartoon' ? 'bg-brand-primary' : 'bg-slate-200'
                                        }`}
                                >
                                    <span
                                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full border-2 border-black transition-transform duration-200 ${fontTheme === 'cartoon' ? 'translate-x-5' : 'translate-x-0'
                                            }`}
                                    />
                                </button>
                            </div>
                        </section>

                        <h3 className="font-cartoon text-[#5d4037]/60 uppercase tracking-widest">CURRENT PROJECTS</h3>
                        {habits.length === 0 ? (
                            <div className="p-16 text-center bg-white/20 rounded-4xl border-4 border-dashed border-[#8b4513]/40">
                                <p className="font-cartoon text-[#8b4513] text-2xl">THE TOOLBOX IS EMPTY! 🧰</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {habits.map(habit => (
                                    <div key={habit.id} className="paper-note flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                                        <div>
                                            <p className="text-xl text-slate-800 leading-none mb-1 uppercase tracking-tight break-all">{habit.name}</p>
                                            <p className="font-cartoon text-[10px] text-brand-primary">ALARM AT {habit.reminderTime || 'NONE'}</p>
                                        </div>
                                        <button
                                            onClick={() => deleteHabit(habit.id)}
                                            className="self-end sm:self-auto p-3 md:p-4 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border-2 border-transparent hover:border-red-200"
                                        >
                                            <Trash2 size={24} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-16 pt-10 border-t-4 border-dashed border-[#8b4513]/20 flex flex-wrap gap-10 items-center justify-between">
                        <div className="max-w-md">
                            <h4 className="font-cartoon text-[#5d4037] text-xl mb-2 uppercase">DANGER ZONE</h4>
                            <p className="font-cartoon text-[#8b4513]/60 text-sm">Clear the board and start the chase from zero.</p>
                        </div>
                        <button
                            onClick={onReset}
                            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-cartoon text-lg transition-transform hover:scale-105 active:scale-95 shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
                        >
                            <RefreshCcw size={20} />
                            <span>CLEAN BOARD</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Watermark */}
            <div className="flex justify-center items-center py-10 opacity-40">
                <img src="https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG61.png" alt="" className="w-48 filter sepia" />
                <div className="ml-10">
                    <p className="font-cartoon text-slate-500 uppercase tracking-[0.2em] mb-4">Version 2.0 • Studio Edition</p>
                    <p className="font-cartoon text-xs text-slate-400">© 1940-2026 CARTOON CHASE SYSTEMS</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
