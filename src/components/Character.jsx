import React from 'react';
import { motion } from 'framer-motion';

const Blob = ({ mood }) => {
    const getColors = () => {
        switch (mood) {
            case 'happy': return ['#6366f1', '#818cf8'];
            case 'sad': return ['#94a3b8', '#cbd5e1'];
            case 'celebrating': return ['#ec4899', '#f472b6'];
            default: return ['#6366f1', '#818cf8'];
        }
    };

    const colors = getColors();

    return (
        <motion.svg
            viewBox="0 0 200 200"
            className="w-32 h-32"
            animate={{
                scale: mood === 'celebrating' ? [1, 1.2, 1] : [1, 1.05, 1],
                rotate: mood === 'celebrating' ? [0, 10, -10, 0] : 0,
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        >
            <defs>
                <linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={colors[0]} />
                    <stop offset="100%" stopColor={colors[1]} />
                </linearGradient>
            </defs>
            <path
                fill="url(#blobGrad)"
                d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.7C85.1,-30,89.2,-15,88.7,-0.3C88.2,14.4,83.1,28.8,75.1,42.1C67.1,55.4,56.1,67.6,42.8,75.5C29.5,83.4,14.7,87.1,-0.4,87.8C-15.5,88.5,-31,86.2,-44.6,78.5C-58.2,70.8,-69.9,57.7,-77.1,43C-84.3,28.3,-87,12.1,-86.3,-4C-85.6,-20.1,-81.4,-36.1,-72.6,-48.5C-63.8,-60.9,-50.3,-69.7,-36.4,-76.6C-22.5,-83.5,-8.3,-88.4,6.7,-91.7C21.7,-95,31.3,-83.6,44.7,-76.4Z"
                transform="translate(100 100)"
            />
            {/* Eyes */}
            <motion.g
                animate={{
                    y: mood === 'sad' ? 5 : 0,
                }}
            >
                <circle cx="70" cy="80" r="8" fill="white" />
                <circle cx="130" cy="80" r="8" fill="white" />
                <circle cx="72" cy="82" r="3" fill="black" />
                <circle cx="132" cy="82" r="3" fill="black" />
            </motion.g>
            {/* Mouth */}
            {mood === 'happy' || mood === 'celebrating' ? (
                <path d="M80 120 Q100 140 120 120" stroke="white" strokeWidth="4" fill="transparent" strokeLinecap="round" />
            ) : (
                <path d="M80 130 Q100 120 120 130" stroke="white" strokeWidth="4" fill="transparent" strokeLinecap="round" />
            )}
        </motion.svg>
    );
};

export const Character = ({ score }) => {
    let mood = 'happy';
    if (score < 30) mood = 'sad';
    else if (score > 80) mood = 'celebrating';

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <Blob mood={mood} />
            <p className="mt-4 font-medium text-slate-600">
                {mood === 'happy' && "You're doing great!"}
                {mood === 'sad' && "A bit sleepy today... let's try one habit?"}
                {mood === 'celebrating' && "Amazing work! Keep it up! ✨"}
            </p>
        </div>
    );
};
