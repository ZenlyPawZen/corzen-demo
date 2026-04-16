import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    slug: 'agents/build-case-study',
    image: '/images/step1.png',
    altText: 'CorZen weekly focus kanban board showing Build Case Study task in the In Progress column',
    title: 'Step 1',
    description: 'Your weekly focus board surfaces the right task — Build Case Study is ready to run.',
    hotspot: { top: '52%', left: '62%' },
  },
  {
    slug: 'agents/build-case-study/detail',
    image: '/images/step2.png',
    altText: 'Build Case Study task detail modal showing description and Run agent button',
    title: 'Step 2',
    description: 'Open the task to review the brief, then click Run agent to hand it off to AI.',
    hotspot: { top: '59%', left: '80%' },
  },
  {
    slug: 'agents/build-case-study/running',
    image: '/images/step3.png',
    altText: 'Build Case Study agent running autonomously with progress bar and working status indicator',
    title: 'Step 3',
    description: 'The agent works autonomously — no prompting required. Watch the progress in real time.',
    hotspot: { top: '70%', left: '50%' },
  },
  {
    slug: 'agents/build-case-study/output',
    image: '/images/step4.png',
    altText: 'Completed case study output with two-liner summary, social media story version, and full situation summary',
    title: 'Step 4',
    description: 'Done. Your case study ships in three formats: two-liner, story version, and full write-up.',
    hotspot: null,
  },
];

const CorZenDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToStep = (index) => setCurrentStep(index);

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden max-w-4xl mx-auto font-sans">
      {/* Browser Chrome */}
      <div className="bg-slate-50 border-b border-slate-200 p-3 flex items-center gap-3">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="mx-auto bg-white border border-slate-200 rounded-md px-4 py-1 text-xs text-slate-400 w-2/3 text-center truncate">
          corzenhub.com/{step.slug}
        </div>
      </div>

      {/* Main Stage */}
      <div className="relative aspect-video bg-slate-100 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentStep}
            src={step.image}
            alt={step.altText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover object-top"
          />
        </AnimatePresence>

        {/* Hotspot */}
        {step.hotspot && (
          <button
            onClick={nextStep}
            style={{ top: step.hotspot.top, left: step.hotspot.left }}
            className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer focus:outline-none"
            aria-label="Click to advance to the next step"
          >
            <span className="absolute inset-0 rounded-full bg-blue-500/20 border-2 border-blue-500 animate-ping" />
            <span className="absolute inset-2 rounded-full bg-blue-500/40" />
          </button>
        )}

        {/* Last step — restart prompt */}
        {isLast && (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => setCurrentStep(0)}
            className="absolute bottom-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm transition-colors"
          >
            Restart demo
          </motion.button>
        )}
      </div>

      {/* Footer */}
      <div className="p-5 bg-white flex items-center justify-between gap-4 border-t border-slate-100">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
          <p className="text-sm text-slate-500 mt-0.5 leading-snug">{step.description}</p>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-2 shrink-0">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => goToStep(i)}
              aria-label={`Go to step ${i + 1}`}
              className={`rounded-full transition-all duration-200 focus:outline-none ${
                i === currentStep
                  ? 'w-5 h-2 bg-blue-500'
                  : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        <div className="text-xs font-mono text-slate-400 shrink-0">
          {currentStep + 1} / {steps.length}
        </div>
      </div>
    </div>
  );
};

export default CorZenDemo;
