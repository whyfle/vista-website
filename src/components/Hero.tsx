import React, { useState } from 'react';
import { VistaLogo } from './VistaLogo';
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
          <div className="lg:col-span-7">
            {/* Eye Logo & Title Tag */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-1 border border-neutral-800 bg-neutral-950">
                <VistaLogo size={32} />
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
                  Universal Linux Package Manager
                </span>
                <span className="font-mono text-sm text-neutral-300">
                  Built in Rust • Native Focus
                </span>
              </div>
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

          {/* Right Column: Official Logo Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm border border-neutral-800 bg-[#090a0d] p-6 flex flex-col items-center text-center relative shadow-2xl">
              <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-neutral-800/80 font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-white font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Official Emblem
                </span>
                <span className="px-1.5 py-0.5 border border-neutral-800 bg-neutral-900 text-neutral-300">
                  v0.1.0
                </span>
              </div>

              <div className="relative group my-2">
                <div className="p-3 border border-neutral-700 bg-black rounded shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
                  <VistaLogo size={192} className="rounded" />
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <div className="font-mono text-base font-bold text-white tracking-wider">
                  VISTA LINUX
                </div>
                <p className="text-[11px] font-sans text-neutral-400 max-w-xs leading-relaxed">
                  Universal Native-First Distro Resolver
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800/80 w-full grid grid-cols-3 gap-1.5 text-[10px] font-mono text-neutral-400">
                <div className="p-1.5 bg-neutral-950 border border-neutral-800/60">
                  <span className="text-white block font-bold">1024px</span>
                  <span>Master</span>
                </div>
                <div className="p-1.5 bg-neutral-950 border border-neutral-800/60">
                  <span className="text-white block font-bold">Rust</span>
                  <span>Engine</span>
                </div>
                <div className="p-1.5 bg-neutral-950 border border-neutral-800/60">
                  <span className="text-white block font-bold">SHA-256</span>
                  <span>Verified</span>
                </div>
              </div>
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
