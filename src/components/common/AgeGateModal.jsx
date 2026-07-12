import { useState } from 'react';
import { ShieldCheck, Wine, Scale, CheckCircle2 } from 'lucide-react';
import useAuthStore from '../../store/authStore';

function AgeGateModal({ onVerify }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { verifyAge } = useAuthStore();

  const handleVerify = () => {
    setIsAnimating(true);
    localStorage.setItem('ageVerified', 'true');
    verifyAge();
    // Small delay for the animation to complete
    setTimeout(() => {
      onVerify();
    }, 300);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com';
  };

  const checklistItems = [
    { icon: ShieldCheck, text: 'I confirm I am 21 years or older' },
    { icon: Wine, text: 'I will drink responsibly' },
    { icon: Scale, text: 'I agree to follow local laws' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-dark overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-bounce-subtle" />
        <div
          className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-accent/8 blur-3xl animate-bounce-subtle"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary-950/40 blur-3xl"
        />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Modal card */}
      <div
        className={`relative w-full max-w-md mx-4 rounded-2xl bg-dark-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden animate-scale-in ${
          isAnimating ? 'opacity-0 scale-95 transition-all duration-300' : ''
        }`}
      >
        {/* Top glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 rounded-b-full bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="px-8 pt-10 pb-8 flex flex-col items-center text-center">
          {/* Brand logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
              <span className="text-dark-900 font-display font-bold text-lg">
                LH
              </span>
            </div>
            <span className="text-white font-display font-bold text-xl tracking-tight">
              Liquor Hub
            </span>
          </div>

          {/* 21+ Badge with pulse ring */}
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse-ring" />
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent-700 shadow-lg">
              <span className="text-dark-900 font-display font-extrabold text-3xl">
                21+
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-display font-bold text-white mb-2">
            Verify Your Age
          </h1>
          <p className="text-dark-400 text-sm leading-relaxed max-w-xs mb-8">
            This website contains alcohol-related content. You must be of legal
            drinking age (21 years or older) to access this website.
          </p>

          {/* Checklist */}
          <div className="w-full space-y-3 mb-8">
            {checklistItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <item.icon size={16} className="text-primary-400" />
                </div>
                <span className="text-sm text-dark-300 text-left">
                  {item.text}
                </span>
                <CheckCircle2
                  size={16}
                  className="flex-shrink-0 ml-auto text-primary-400"
                />
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="w-full flex flex-col gap-3">
            {/* Primary action */}
            <button
              onClick={handleVerify}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-primary to-primary-700 text-white font-semibold rounded-xl hover:from-primary-800 hover:to-primary-600 active:scale-[0.98] transition-all duration-200 shadow-premium text-sm"
            >
              I am 21 or older — Enter
            </button>

            {/* Reject action */}
            <button
              onClick={handleReject}
              className="w-full py-3.5 px-6 border border-white/10 text-dark-400 font-medium rounded-xl hover:bg-white/5 hover:text-white active:scale-[0.98] transition-all duration-200 text-sm"
            >
              I am under 21
            </button>
          </div>

          {/* Legal disclaimer */}
          <p className="mt-6 text-[11px] text-dark-600 leading-relaxed max-w-xs">
            By entering, you accept our{' '}
            <span className="text-dark-400 underline underline-offset-2 cursor-pointer hover:text-accent transition-colors">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="text-dark-400 underline underline-offset-2 cursor-pointer hover:text-accent transition-colors">
              Privacy Policy
            </span>
            . We never sell alcohol to minors. Please drink responsibly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AgeGateModal;
