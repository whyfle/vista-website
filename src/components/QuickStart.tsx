import React, { useState } from 'react';
import { Terminal, Play, Copy, Check, Info, ArrowRight } from 'lucide-react';

interface QuickStartStep {
  step: string;
  command: string;
  title: string;
  explanation: string;
  output: string;
}

export const QuickStart: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const steps: QuickStartStep[] = [
    {
      step: '01',
      command: 'vista sys-info',
      title: 'Inspect System Architecture',
      explanation:
        'Verify your host environment. Vista detects your distribution, native package manager (DNF, APT, or Pacman), and host CPU architecture.',
      output: `vista v0.1.0 (Rust 2021 edition)
[host-detection]
  Distribution: Fedora Linux 41 (Workstation Edition)
  Native Tool:  /usr/bin/dnf (RPM)
  Architecture: x86_64 (Linux 6.12.9)
  Flathub SDK:  Enabled (/var/lib/flatpak)
  Cache Path:   ~/.cache/vista/registry
[status] System ready for native-first resolution.`,
    },
    {
      step: '02',
      command: 'vista search fastfetch',
      title: 'Search Across Ecosystems',
      explanation:
        'Vista queries upstream GitHub releases, distribution repositories, and Flathub concurrently in single sub-second query.',
      output: `Searching providers for query: "fastfetch"...

  NAME               VERSION   PROVIDER   FORMAT    STATUS
  fastfetch          2.38.0    native     rpm       Official Fedora 41 Repo
  fastfetch-cli      2.38.0    github     rpm/deb   Upstream GitHub Releases
  org.fastfetch      2.38.0    flathub    flatpak   Flathub AppStream verified

Tip: Run 'vista install fastfetch-cli@fastfetch' to evaluate package resolution.`,
    },
    {
      step: '03',
      command: 'vista install fastfetch-cli@fastfetch',
      title: 'Install with Native Priority',
      explanation:
        'Vista evaluates candidate assets, matches your native RPM format and x86_64 architecture, audits SHA256 checksums, and installs directly into your system.',
      output: `Resolving package 'fastfetch-cli@fastfetch'...
  [1/3] Fetching upstream release assets (tag: 2.38.0)
  [2/3] Evaluating candidate targets for Fedora Linux (x86_64):
        * fastfetch-2.38.0-linux-amd64.deb    [Filtered - Foreign format (.deb)]
        * fastfetch-2.38.0-linux-amd64.rpm    [SELECTED - Native RPM / x86_64]
        * fastfetch-2.38.0-linux-arm64.rpm    [Disqualified - Arch mismatch: aarch64]
  [3/3] Auditing SHA256 against release manifest... OK (verified)
==> Invoking host installer: sudo dnf install /tmp/vista/fastfetch-2.38.0.rpm
Complete! fastfetch is now available in your $PATH.`,
    },
    {
      step: '04',
      command: 'vista install discord',
      title: 'Seamless Flathub Fallback',
      explanation:
        'When an upstream package does not provide a native package for your OS, Vista automatically installs the verified Flathub package without failing.',
      output: `Resolving package 'discord'...
  [1/2] Checking upstream releases: No native .rpm provided by vendor.
  [2/2] Checking fallback providers: Found Flathub package 'com.discordapp.Discord'.
==> Automatic fallback triggered (config: allow_flathub = true)
==> Invoking: flatpak install flathub com.discordapp.Discord -y
Installing: com.discordapp.Discord/x86_64/stable
Complete! Desktop application launcher registered.`,
    },
  ];

  const currentStep = steps[activeStepIndex];

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quick-start" className="py-20 border-b border-neutral-800 bg-[#0c0d10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-2">
            Get Up & Running In 60 Seconds
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Quick Start Guide
          </h2>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed font-normal">
            Experience how Vista operates in practice. Click through each step below to inspect real commands and their
            simulated outputs.
          </p>
        </div>

        {/* Square Grid Step Selector */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 border-t border-l border-neutral-800">
          {steps.map((step, idx) => (
            <button
              key={idx}
              id={`quick-step-btn-${idx}`}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-4 sm:p-5 border-r border-b border-neutral-800 text-left transition-colors cursor-pointer ${
                activeStepIndex === idx
                  ? 'bg-neutral-900 border-b-2 border-b-white'
                  : 'bg-neutral-950/50 hover:bg-neutral-900/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-white">{step.step}</span>
                {activeStepIndex === idx && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                )}
              </div>
              <div className="font-mono text-xs font-bold text-white mt-2 truncate">
                {step.command}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1 font-sans line-clamp-1">
                {step.title}
              </div>
            </button>
          ))}
        </div>

        {/* Step Detail + Terminal Output */}
        <div className="mt-6 border border-neutral-800 bg-neutral-950">
          {/* Action Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-900/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-neutral-400">Step {currentStep.step}:</span>
                <span className="font-mono text-xs text-white font-bold">{currentStep.title}</span>
              </div>
              <p className="text-xs text-neutral-300 mt-1 font-sans max-w-2xl">
                {currentStep.explanation}
              </p>
            </div>

            <button
              id="quickstart-copy-cmd-btn"
              onClick={() => handleCopy(currentStep.command)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-mono text-xs transition-colors cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Command</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Box */}
          <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm">
            {/* Prompt */}
            <div className="flex items-center gap-2 text-neutral-300 mb-3 select-all">
              <span className="text-white font-bold">$</span>
              <span className="text-white font-semibold">{currentStep.command}</span>
            </div>

            {/* Simulated Raw Terminal Output */}
            <pre className="text-neutral-300 bg-[#06070a] p-4 border border-neutral-800/80 overflow-x-auto leading-relaxed text-xs">
              {currentStep.output}
            </pre>
          </div>

          {/* Bottom navigation */}
          <div className="px-4 py-3 border-t border-neutral-800/80 bg-neutral-900/40 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Step {activeStepIndex + 1} of {steps.length}</span>
            <div className="flex items-center gap-3">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="hover:text-white disabled:opacity-30 disabled:hover:text-neutral-400 cursor-pointer disabled:cursor-not-allowed"
              >
                ← Previous
              </button>
              <button
                disabled={activeStepIndex === steps.length - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                className="text-white hover:text-neutral-300 disabled:opacity-30 disabled:hover:text-neutral-400 font-semibold cursor-pointer disabled:cursor-not-allowed"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
