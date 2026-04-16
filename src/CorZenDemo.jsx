import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    slug: 'agents/build-case-study',
    image: '/images/step1.png',
    altText: 'CorZen weekly focus kanban board showing Build Case Study task in the In Progress column',
    title: 'Step 1',
    description: 'Your weekly focus board surfaces the right task — Build Case Study is ready to run.',
    hotspot: { top: '52%', left: '62%', align: 'center' },
  },
  {
    slug: 'agents/build-case-study/detail',
    image: '/images/step2.png',
    altText: 'Build Case Study task detail modal showing description and Run agent button',
    title: 'Step 2',
    description: 'Open the task to review the brief, then click Run agent to hand it off to AI.',
    hotspot: { top: '57%', left: '78%', align: 'right' },
  },
  {
    slug: 'agents/build-case-study/running',
    image: '/images/step3.png',
    altText: 'Build Case Study agent running autonomously with progress bar and working status indicator',
    title: 'Step 3',
    description: 'The agent works autonomously — no prompting required. Watch the progress in real time.',
    hotspot: { top: '65%', left: '50%', align: 'center' },
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

const Callout = ({ step, onClick }) => {
  if (!step.hotspot) return null;

  const xOffset = step.hotspot.align === 'right' ? '-82%' : '-50%';

  return (
    <motion.button
      key={step.slug}
      onClick={onClick}
      style={{
        position: 'absolute',
        top: step.hotspot.top,
        left: step.hotspot.left,
        transform: `translate(${xOffset}, -100%)`,
        marginTop: '-14px',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
        textAlign: 'left',
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{
        opacity: 1,
        y: [0, -5, 0],
      }}
      transition={{
        opacity: { duration: 0.3 },
        y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
      }}
      aria-label="Click to advance to the next step"
    >
      {/* Callout card */}
      <motion.div
        animate={{
          boxShadow: [
            '0 4px 16px rgba(59,130,246,0.12), 0 1px 4px rgba(0,0,0,0.06)',
            '0 8px 28px rgba(59,130,246,0.28), 0 2px 8px rgba(0,0,0,0.08)',
            '0 4px 16px rgba(59,130,246,0.12), 0 1px 4px rgba(0,0,0,0.06)',
          ],
        }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '12px 16px',
          width: '220px',
        }}
      >
        <p style={{ fontSize: '12px', lineHeight: '1.5', color: '#334155', margin: 0 }}>
          {step.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '8px' }}>
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
            <circle cx="3" cy="3" r="3" fill="#3b82f6" />
          </svg>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#3b82f6' }}>
            Click to continue
          </span>
          <span style={{ fontSize: '11px', color: '#3b82f6' }}>→</span>
        </div>
      </motion.div>

      {/* Arrow tip pointing down */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderTop: '7px solid white',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          filter: 'drop-shadow(0 1px 0 #e2e8f0)',
          marginLeft: step.hotspot.align === 'right' ? 'calc(82% - 7px)' : 'auto',
        }}
      />

      {/* Anchor dot at hotspot */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#3b82f6',
          boxShadow: '0 0 0 3px rgba(59,130,246,0.25)',
          margin: '0 auto',
          marginLeft: step.hotspot.align === 'right' ? 'calc(82% - 5px)' : 'auto',
        }}
      />
    </motion.button>
  );
};

const CorZenDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((p) => p + 1);
  };

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

        <AnimatePresence mode="wait">
          <Callout key={`callout-${currentStep}`} step={step} onClick={nextStep} />
        </AnimatePresence>

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

        <div className="flex items-center gap-2 shrink-0">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
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
