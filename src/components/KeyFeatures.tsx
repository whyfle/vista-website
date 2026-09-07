import React from 'react';
import { Zap, Command, Layers, GitBranch, ShieldCheck, Terminal, ArrowDownToLine, RefreshCw } from 'lucide-react';

export const KeyFeatures: React.FC = () => {
  const features = [
    {
      id: 'feature-speed',
      icon: Zap,
      title: 'High-Performance Rust Core',
      metric: '< 4ms startup',
      description:
        'Engineered in modern Rust as a single, lightweight ~3.7MB binary. Zero heavy runtimes, zero garbage collection, and instant CLI command execution.',
      benefit: 'Speed',
    },
    {
      id: 'feature-simplicity',
      icon: Command,
      title: 'Unified CLI Simplicity',
      metric: 'One syntax everywhere',
      description:
        'One consistent, intuitive CLI across any Linux system. Forget switching between dnf, apt, pacman, and flatpak flags—Vista maps your command to the right system action.',
      benefit: 'Simplicity',
    },
    {
      id: 'feature-resolver',
      icon: Layers,
      title: 'Native-First Resolution Engine',
      metric: 'Native Priority',
      description:
        'Vista matches candidate packages with priority given to native RPM/DEB/Arch builds. It matches your exact CPU architecture and prevents incompatible packaging formats.',
      benefit: 'Unique USP',
    },
    {
      id: 'feature-github',
      icon: GitBranch,
      title: 'Upstream GitHub Releases',
      metric: 'user@repo syntax',
      description:
        'Directly target modern developer tools published on GitHub. Vista automatically parses release assets, picks the matching binary, and handles installation.',
      benefit: 'Unique USP',
    },
    {
      id: 'feature-compatibility',
      icon: RefreshCw,
      title: 'Automatic Flathub Fallback',
      metric: 'Zero Dead Ends',
      description:
        'When an upstream package has no native build for your distribution, Vista automatically checks verified Flathub AppStream metadata as an intelligent fallback.',
      benefit: 'Compatibility',
    },
    {
      id: 'feature-security',
      icon: ShieldCheck,
      title: 'Automated SHA256 Auditing',
      metric: 'Integrity by default',
      description:
        'Downloads are checked against official upstream checksum manifests. Corrupted or unverified binaries are rejected before any system modification occurs.',
      benefit: 'Security',
    },
  ];

  return (
    <section id="features" className="py-20 border-b border-neutral-800 bg-[#090a0d] square-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-2">
            Engineered For Developers
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Key Features
          </h2>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed font-normal">
            Every component of Vista is built around speed, ergonomic simplicity, and deep respect for the host Linux
            operating system.
          </p>
        </div>

        {/* Square Grid 3x2 Layout */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-neutral-800">
          {features.map((feat) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={feat.id}
                id={feat.id}
                className="p-6 sm:p-7 border-r border-b border-neutral-800 bg-neutral-950/70 hover:bg-neutral-900/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Icon & Benefit Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 border border-neutral-800 bg-neutral-900 text-white">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 px-2 py-0.5 border border-neutral-800 bg-neutral-900">
                      {feat.benefit}
                    </span>
                  </div>

                  {/* Title & Metric */}
                  <h3 className="text-base font-bold text-white font-mono tracking-tight">
                    {feat.title}
                  </h3>
                  <div className="font-mono text-xs text-neutral-300 mt-1 font-semibold">
                    {feat.metric}
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Highlight Box: Resolution Priority Rules */}
        <div className="mt-8 p-5 sm:p-6 border border-neutral-800 bg-neutral-950 font-mono text-xs">
          <div className="text-neutral-400 uppercase tracking-widest text-[11px] font-semibold mb-3">
            Resolution Priority Pipeline (Rust Core)
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-neutral-300">
            <div className="p-3 border border-neutral-800/80 bg-neutral-900/40">
              <span className="text-white font-bold block text-sm">Stage 1</span>
              <span className="text-neutral-400 text-[11px]">Native Host Package (RPM/DEB)</span>
            </div>
            <div className="p-3 border border-neutral-800/80 bg-neutral-900/40">
              <span className="text-white font-bold block text-sm">Stage 2</span>
              <span className="text-neutral-400 text-[11px]">Upstream GitHub Release</span>
            </div>
            <div className="p-3 border border-neutral-800/80 bg-neutral-900/40">
              <span className="text-white font-bold block text-sm">Stage 3</span>
              <span className="text-neutral-400 text-[11px]">Flathub Desktop Fallback</span>
            </div>
            <div className="p-3 border border-neutral-800/80 bg-neutral-900/40">
              <span className="text-neutral-300 font-bold block text-sm">Safety Filter</span>
              <span className="text-neutral-400 text-[11px]">Rejects Incompatible Binaries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
