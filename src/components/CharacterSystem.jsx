import React from 'react';
import { motion } from 'framer-motion';

const Tom = ({ mood }) => (
    <motion.div
        animate={{
            y: mood === 'sleepy' ? [0, 10, 0] : [0, -20, 0],
            scaleX: mood === 'sleepy' ? [1, 1.05, 1] : [1, 0.95, 1],
            scaleY: mood === 'sleepy' ? [1, 0.95, 1] : [1, 1.1, 1],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
    >
        <img src="https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG10.png" alt="Tom" className="w-36 h-36 object-contain drop-shadow-[6px_6px_0px_rgba(0,0,0,0.2)]" />
        {mood === 'sleepy' && (
            <motion.div
                animate={{
                    opacity: [0, 1, 0],
                    y: [0, -40, -80],
                    x: [20, 40, 60],
                    scale: [0.5, 1.5, 2]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-0 text-slate-400 font-cartoon text-5xl select-none"
            >
                Zzz
            </motion.div>
        )}
    </motion.div>
);

const Jerry = ({ mood }) => (
    <motion.div
        animate={{
            scaleX: mood === 'celebrating' ? [1, 1.2, 0.8, 1.1, 1] : [1, 1.05, 1],
            scaleY: mood === 'celebrating' ? [1, 0.8, 1.2, 0.9, 1] : [1, 1.05, 1],
            y: mood === 'celebrating' ? [0, -40, 0] : [0, -10, 0],
            rotate: mood === 'celebrating' ? [0, 15, -15, 0] : [0, 5, -5, 0]
        }}
        transition={{ duration: mood === 'celebrating' ? 1.5 : 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
    >
        <img src="https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG3.png" alt="Jerry" className="w-52 h-52 object-contain drop-shadow-[6px_6px_0px_rgba(0,0,0,0.2)]" />
        {mood === 'celebrating' && (
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [1, 1.5, 1], rotate: [0, 360] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -top-10 -right-10 text-5xl"
            >
                🧀
            </motion.div>
        )}
    </motion.div>
);

export const CharacterReaction = ({ score }) => {
    let Character = Tom;
    let mood = 'happy';
    let message = "Doing Great!";
    let colorClass = "text-brand-primary";

    if (score < 20) {
        Character = Tom;
        mood = 'sleepy';
        const messages = ["Tom is resting!", "Tom nap time!", "Quiet... Tom's asleep!"];
        message = messages[Math.floor(Date.now() / 3600000) % messages.length];
        colorClass = "text-slate-500";
    } else if (score >= 20) {
        Character = Jerry;
        mood = score >= 60 ? 'celebrating' : 'happy';
        message = score >= 60 ? "JERRY FOUND THE STASH! 🧀" : "Jerry's on the hunt!";
        colorClass = "text-brand-secondary";
    } else {
        Character = Tom;
        mood = 'happy';
        message = "Tom's cheering you on!";
        colorClass = "text-brand-primary";
    }

    return (
        <div className="flex flex-col items-center gap-4 p-6 glass rounded-3xl border-white/80 overflow-hidden relative group" style={{ isolation: 'isolate' }}>
            <div className="absolute top-0 left-0 w-full h-3 vibrant-gradient" />

            {/* Comic Punch Starburst */}
            <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-10 pointer-events-none"
                style={{
                    background: 'conic-gradient(from 0deg, #fab005 0%, transparent 10%, #fab005 20%, transparent 30%, #fab005 40%, transparent 50%, #fab005 60%, transparent 70%, #fab005 80%, transparent 90%, #fab005 100%)',
                    maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
                }}
            />

            <div className="relative z-10">
                <Character mood={mood} progress={score} />
            </div>
            <div className="text-center relative z-10">
                <h3 className={`text-xl font-cartoon leading-none mb-2 ${colorClass}`}>{message}</h3>
                <div className="flex items-center justify-center gap-2">
                    <div className="h-2.5 w-32 bg-slate-200 rounded-full overflow-hidden border-2 border-black">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${score}%` }}
                            className="h-full cheese-gradient"
                        />
                    </div>
                    <p className="text-black text-sm font-cartoon">{score}%</p>
                </div>
            </div>
        </div>
    );
};

export const SmallReaction = ({ score }) => {
    if (score >= 50) return <img src="https://pngimg.com/uploads/cheese/cheese_PNG10.png" alt="Cheese" className="w-10 h-10 animate-bounce drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]" />;
    return <img src="https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG10.png" alt="Tom" className="w-12 h-12 opacity-40 grayscale" />;
};
