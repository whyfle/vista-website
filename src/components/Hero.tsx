import React, { useState } from 'react';
import { Copy, Check, ArrowRight, Terminal } from 'lucide-react';

interface HeroProps {
  onExploreQuickStart: () => void;
  onExploreInstall: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreQuickStart,
  onExploreInstall,
}) => {
  const [copied, setCopied] = useState(false);
  const installCmd = 'curl -fsSL https://raw.githubusercontent.com/whyfle/vista/main/install.sh | sudo bash';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="hero-section" className="relative border-b border-neutral-800 square-grid py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-12">
            {/* Title Tag */}
            <div className="mb-4">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                Universal Linux Package Manager
              </span>
              <span className="font-mono text-sm text-neutral-300">
                Built in Rust • Native Focus
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Tell Vista what you want.{' '}
              <span className="text-neutral-300 block mt-1 font-semibold">
                Vista figures out how your Linux system installs it.
              </span>
            </h1>

            {/* Value Proposition */}
            <p className="mt-5 text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
              A native-first package manager for Linux. It searches official native packages first, resolves candidate
              upstream GitHub Releases, and falls back to Flathub automatically when no native build exists.
            </p>

            {/* Core Priority Formula */}
            <div className="mt-6 inline-flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-400 bg-neutral-900/90 border border-neutral-800 p-2 sm:px-3 sm:py-2">
              <span className="text-neutral-500">Resolution Order:</span>
              <span className="text-neutral-100 font-semibold">1. Native Package (RPM/DEB)</span>
              <span className="text-neutral-600">→</span>
              <span className="text-neutral-300">2. Flatpak / Flathub Fallback</span>
              <span className="text-neutral-600">→</span>
              <span className="text-neutral-400">3. Clear Error</span>
            </div>

            {/* Copyable Install Box */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl">
              <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-neutral-950 border border-neutral-800 font-mono text-xs text-neutral-200 select-all overflow-x-auto">
                <span className="text-white font-bold select-none">$</span>
                <span className="whitespace-nowrap">{installCmd}</span>
              </div>
              <button
                id="hero-copy-install-btn"
                onClick={handleCopy}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-100 hover:text-white border border-neutral-800 font-mono text-xs flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span className="text-white">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Action Navigation */}
            <div className="mt-6 flex items-center gap-4 text-xs font-mono">
              <button
                id="hero-nav-quickstart-btn"
                onClick={onExploreQuickStart}
                className="inline-flex items-center gap-1.5 text-white hover:text-neutral-300 font-semibold underline underline-offset-4 cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Read Quick Start Guide</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <span className="text-neutral-700">•</span>
              <button
                id="hero-nav-install-btn"
                onClick={onExploreInstall}
                className="text-neutral-400 hover:text-neutral-200 underline underline-offset-4 cursor-pointer"
              >
                View Installation Methods (Script / Cargo)
              </button>
            </div>
          </div>

        </div>

        {/* Square Grid Technical Metric Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-l border-neutral-800">
          <div className="p-4 sm:p-5 border-r border-b border-neutral-800 bg-neutral-900/30">
            <div className="font-mono text-xl sm:text-2xl font-bold text-white">~3.7 MB</div>
            <div className="font-mono text-xs text-neutral-400 mt-1">Single Rust Binary</div>
            <p className="text-[11px] text-neutral-400 mt-1">Zero heavy runtimes or Electron bloat</p>
          </div>

          <div className="p-4 sm:p-5 border-r border-b border-neutral-800 bg-neutral-900/30">
            <div className="font-mono text-xl sm:text-2xl font-bold text-white">&lt; 4 ms</div>
            <div className="font-mono text-xs text-neutral-400 mt-1">Startup Latency</div>
            <p className="text-[11px] text-neutral-400 mt-1">Instant CLI execution and evaluation</p>
          </div>

          <div className="p-4 sm:p-5 border-r border-b border-neutral-800 bg-neutral-900/30">
            <div className="font-mono text-xl sm:text-2xl font-bold text-white">Native First</div>
            <div className="font-mono text-xs text-neutral-400 mt-1">RPM, DEB & Pacman</div>
            <p className="text-[11px] text-neutral-400 mt-1">System libraries instead of gigabyte sandboxes</p>
          </div>

          <div className="p-4 sm:p-5 border-r border-b border-neutral-800 bg-neutral-900/30">
            <div className="font-mono text-xl sm:text-2xl font-bold text-white">SHA256</div>
            <div className="font-mono text-xs text-neutral-400 mt-1">Automatic Integrity</div>
            <p className="text-[11px] text-neutral-400 mt-1">Upstream checksums verified by default</p>
          </div>
        </div>
      </div>
    </section>
  );
};
