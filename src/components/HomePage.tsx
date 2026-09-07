import React, { useState } from 'react';
import { VistaLogo } from './VistaLogo';
import {
  Copy,
  Check,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Zap,
  Layers,
  Cpu,
  RefreshCw,
  GitBranch,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { PageTab, LinuxDistroId } from '../types';

interface HomePageProps {
  onNavigate: (page: PageTab, subSection?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [demoDistro, setDemoDistro] = useState<LinuxDistroId>('fedora');
  const [selectedDemoPackage, setSelectedDemoPackage] = useState<'fastfetch' | 'bat' | 'discord'>('fastfetch');

  const installCmd = 'curl -fsSL https://raw.githubusercontent.com/whyfle/vista/main/install.sh | sudo bash';

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const demoScenarios = {
    fastfetch: {
      title: 'fastfetch-cli@fastfetch',
      type: 'Native RPM/DEB Package',
      description: 'Upstream provides both .rpm and .deb. Vista automatically picks your native format and verifies SHA256.',
      resolution: {
        fedora: {
          asset: 'fastfetch-linux-amd64.rpm',
          format: 'RPM (Native)',
          decision: 'Native RPM selected for Fedora 44',
          tool: 'sudo dnf5 install ~/.cache/vista/downloads/fastfetch-linux-amd64.rpm',
          isNative: true,
        },
        ubuntu: {
          asset: 'fastfetch-linux-amd64.deb',
          format: 'DEB (Native)',
          decision: 'Native DEB selected for Ubuntu',
          tool: 'sudo apt install /tmp/vista/fastfetch.deb',
          isNative: true,
        },
        arch: {
          asset: 'fastfetch-linux-amd64.tar.gz',
          format: 'Static Binary',
          decision: 'Static Linux binary selected for Arch',
          tool: 'tar -xzf /tmp/vista/fastfetch.tar.gz -> /usr/local/bin',
          isNative: false,
        },
        debian: {
          asset: 'fastfetch-linux-amd64.deb',
          format: 'DEB (Native)',
          decision: 'Native DEB selected for Debian',
          tool: 'sudo apt install /tmp/vista/fastfetch.deb',
          isNative: true,
        },
        opensuse: {
          asset: 'fastfetch-linux-amd64.rpm',
          format: 'RPM (Native)',
          decision: 'Native RPM selected for openSUSE',
          tool: 'sudo zypper install /tmp/vista/fastfetch.rpm',
          isNative: true,
        },
      },
    },
    bat: {
      title: 'sharkdp/bat',
      type: 'Upstream GitHub Direct',
      description: 'Developer CLI tool with pre-built musl tarballs. Vista unpacks and registers binary in /usr/local/bin.',
      resolution: {
        fedora: {
          asset: 'bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz',
          format: 'tar.gz Archive',
          decision: 'x86_64 musl archive inspected (manual install recommended)',
          tool: 'tar -xzf bat.tar.gz -> ~/.local/bin/bat',
          isNative: false,
        },
        ubuntu: {
          asset: 'bat_0.26.1_amd64.deb',
          format: 'DEB (Native)',
          decision: 'Native DEB release asset prioritized',
          tool: 'sudo apt install /tmp/vista/bat.deb',
          isNative: true,
        },
        arch: {
          asset: 'bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz',
          format: 'tar.gz Archive',
          decision: 'x86_64 musl archive inspected',
          tool: 'tar -xzf bat.tar.gz -> ~/.local/bin/bat',
          isNative: false,
        },
        debian: {
          asset: 'bat_0.26.1_amd64.deb',
          format: 'DEB (Native)',
          decision: 'Native DEB release asset prioritized',
          tool: 'sudo apt install /tmp/vista/bat.deb',
          isNative: true,
        },
        opensuse: {
          asset: 'bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz',
          format: 'tar.gz Archive',
          decision: 'x86_64 musl archive inspected',
          tool: 'tar -xzf bat.tar.gz -> ~/.local/bin/bat',
          isNative: false,
        },
      },
    },
    discord: {
      title: 'discord',
      type: 'Desktop App (Fallback)',
      description: 'No official RPM or generic tarball. Vista gracefully falls back to Flathub automatically.',
      resolution: {
        fedora: {
          asset: 'com.discordapp.Discord (Flathub)',
          format: 'Flatpak (Fallback)',
          decision: 'Flathub Fallback Triggered (No native RPM)',
          tool: 'flatpak install flathub com.discordapp.Discord -y',
          isNative: false,
        },
        ubuntu: {
          asset: 'discord-0.0.60.deb',
          format: 'DEB (Native)',
          decision: 'Vendor upstream .deb prioritized',
          tool: 'sudo apt install /tmp/vista/discord.deb',
          isNative: true,
        },
        arch: {
          asset: 'com.discordapp.Discord (Flathub)',
          format: 'Flatpak (Fallback)',
          decision: 'Flathub Fallback Triggered',
          tool: 'flatpak install flathub com.discordapp.Discord -y',
          isNative: false,
        },
        debian: {
          asset: 'discord-0.0.60.deb',
          format: 'DEB (Native)',
          decision: 'Vendor upstream .deb prioritized',
          tool: 'sudo apt install /tmp/vista/discord.deb',
          isNative: true,
        },
        opensuse: {
          asset: 'com.discordapp.Discord (Flathub)',
          format: 'Flatpak (Fallback)',
          decision: 'Flathub Fallback Triggered',
          tool: 'flatpak install flathub com.discordapp.Discord -y',
          isNative: false,
        },
      },
    },
  };

  const activeRes = demoScenarios[selectedDemoPackage].resolution[demoDistro];

  return (
    <div id="home-page">
      {/* High Density Hero Section with Prominent Official Logo Showcase */}
      <section id="hero-section" className="relative border-b border-neutral-800 square-grid py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              {/* Eye Logo & Title Tag */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-1 border border-neutral-800 bg-neutral-950">
                  <VistaLogo size={32} />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 block">
                    Universal Linux Package Manager
                  </span>
                  <span className="font-mono text-xs text-neutral-300">
                    Written in Rust • Native Focus
                  </span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-mono">
                Tell Vista what you want.{' '}
                <span className="text-neutral-300 block mt-1 font-semibold">
                  Vista figures out how your Linux system installs it.
                </span>
              </h1>

              {/* Value Proposition */}
              <p className="mt-4 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
                A native-first package manager for Linux. It searches native distro packages first (RPM/DEB),
                resolves upstream GitHub release assets, and falls back to Flathub automatically when no native build exists.
              </p>

              {/* Copyable Install Box */}
              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-xl">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-[#06070a] border border-neutral-800 font-mono text-xs text-neutral-200 select-all overflow-x-auto">
                  <span className="text-white font-bold select-none">$</span>
                  <span className="whitespace-nowrap">{installCmd}</span>
                </div>
                <button
                  id="hero-copy-install-btn"
                  onClick={handleCopy}
                  className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-100 hover:text-white border border-neutral-800 font-mono text-xs flex items-center justify-center gap-2 transition-colors shrink-0 cursor-pointer"
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

              {/* Action Buttons */}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-mono">
                <button
                  id="hero-nav-quickstart-btn"
                  onClick={() => onNavigate('quickstart')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-semibold transition-colors cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Quick Start Guide (2 mins)</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  id="hero-nav-docs-btn"
                  onClick={() => onNavigate('docs')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Documentation</span>
                </button>
                <a
                  href="https://github.com/vista-cli/vista"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  <span>GitHub ↗</span>
                </a>
              </div>
            </div>

            {/* Right Column: Prominent Official Logo Emblem Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm border border-neutral-800 bg-[#090a0d] p-6 flex flex-col items-center text-center relative shadow-2xl">
                {/* Header Tag */}
                <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-neutral-800/80 font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-white font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Official Emblem
                  </span>
                  <span className="px-1.5 py-0.5 border border-neutral-800 bg-neutral-900 text-neutral-300">
                    v0.1.0
                  </span>
                </div>

                {/* The Prominent Eye Logo */}
                <div className="relative group my-2">
                  <div className="p-3 border border-neutral-700 bg-black rounded shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
                    <VistaLogo size={192} className="rounded" />
                  </div>
                </div>

                {/* Identity Metadata */}
                <div className="mt-4 space-y-1">
                  <div className="font-mono text-base font-bold text-white tracking-wider">
                    VISTA LINUX
                  </div>
                  <p className="text-[11px] font-sans text-neutral-400 max-w-xs leading-relaxed">
                    Native-First Distro Resolution & Binary Integrity
                  </p>
                </div>

                {/* Technical Badges */}
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

          {/* High Density Metric Strip */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 border-t border-l border-neutral-800">
            <div className="p-3.5 sm:p-4 border-r border-b border-neutral-800 bg-neutral-950/60">
              <div className="font-mono text-lg sm:text-xl font-bold text-white">&lt; 4 ms</div>
              <div className="font-mono text-xs text-neutral-400 mt-0.5">Startup Latency</div>
              <p className="text-[11px] text-neutral-400 mt-0.5">Zero runtime or Electron overhead</p>
            </div>

            <div className="p-3.5 sm:p-4 border-r border-b border-neutral-800 bg-neutral-950/60">
              <div className="font-mono text-lg sm:text-xl font-bold text-white">~3.7 MB</div>
              <div className="font-mono text-xs text-neutral-400 mt-0.5">Stripped Rust Binary</div>
              <p className="text-[11px] text-neutral-400 mt-0.5">Self-contained native executable</p>
            </div>

            <div className="p-3.5 sm:p-4 border-r border-b border-neutral-800 bg-neutral-950/60">
              <div className="font-mono text-lg sm:text-xl font-bold text-white">Native First</div>
              <div className="font-mono text-xs text-neutral-400 mt-0.5">Host Package Priority</div>
              <p className="text-[11px] text-neutral-400 mt-0.5">Prioritizes host RPM/DEB/Pacman</p>
            </div>

            <div className="p-3.5 sm:p-4 border-r border-b border-neutral-800 bg-neutral-950/60">
              <div className="font-mono text-lg sm:text-xl font-bold text-neutral-200">SHA256</div>
              <div className="font-mono text-xs text-neutral-400 mt-0.5">Automated Audit</div>
              <p className="text-[11px] text-neutral-400 mt-0.5">Verified before any file execution</p>
            </div>
          </div>
        </div>
      </section>

      {/* High Density "Why Vista" Section */}
      <section id="why-section" className="py-12 border-b border-neutral-800 bg-[#090b0e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                The Problem & The Solution
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
                Why Linux Needs Vista
              </h2>
            </div>
            <button
              onClick={() => onNavigate('docs', 'resolver-architecture')}
              className="text-xs font-mono text-neutral-300 hover:text-white hover:underline inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>Read Architecture Deep-Dive →</span>
            </button>
          </div>

          {/* 4 Problem/Solution High-Density Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-neutral-800">
            <div className="p-4 sm:p-5 border-r border-b border-neutral-800 bg-neutral-950/70">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                <span className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 text-neutral-300 font-bold">
                  Problem
                </span>
                <span className="text-white font-bold">Distro Fragmentation</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Fedora uses <code className="text-neutral-200">dnf</code>, Debian uses <code className="text-neutral-200">apt</code>, and Arch uses <code className="text-neutral-200">pacman</code>. Scripting and mental models break across machines.
              </p>
              <div className="mt-3 pt-3 border-t border-neutral-800/80 font-mono text-xs text-neutral-200 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-300" />
                <span>Unified CLI syntax that resolves to the correct native toolchain automatically.</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-r border-b border-neutral-800 bg-neutral-950/70">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                <span className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 text-neutral-300 font-bold">
                  Problem
                </span>
                <span className="text-white font-bold">Outdated LTS Repos</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Distribution package repositories are often months or years behind upstream releases, forcing users to compile or manually download binaries.
              </p>
              <div className="mt-3 pt-3 border-t border-neutral-800/80 font-mono text-xs text-neutral-200 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-300" />
                <span>Direct upstream GitHub Releases (<code className="text-neutral-200">user@repo</code>) with automatic SemVer evaluation.</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-r border-b border-neutral-800 bg-neutral-950/70">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                <span className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 text-neutral-300 font-bold">
                  Problem
                </span>
                <span className="text-white font-bold">Containerized Bloat</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Flatpak and Snap bundle whole runtime environments. A simple CLI utility can consume 1.2GB of disk space and introduce noticeable cold-start latency.
              </p>
              <div className="mt-3 pt-3 border-t border-neutral-800/80 font-mono text-xs text-neutral-200 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-300" />
                <span>Native-first resolution uses shared host libraries; Flatpak is reserved strictly as a fallback.</span>
              </div>
            </div>

            <div className="p-4 sm:p-5 border-r border-b border-neutral-800 bg-neutral-950/70">
              <div className="flex items-center gap-2 mb-2 font-mono text-xs">
                <span className="px-1.5 py-0.5 bg-neutral-800 border border-neutral-700 text-neutral-300 font-bold">
                  Problem
                </span>
                <span className="text-white font-bold">Manual GitHub Friction</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Downloading tarballs manually requires checking CPU architecture, extracting files, symlinking to PATH, and computing sha256 checksums by hand.
              </p>
              <div className="mt-3 pt-3 border-t border-neutral-800/80 font-mono text-xs text-neutral-200 flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-300" />
                <span>Vista resolves release assets, verifies upstream checksums, and installs with one command.</span>
              </div>
            </div>
          </div>

          {/* High Density Comparison Table */}
          <div className="mt-8 border border-neutral-800 bg-neutral-950 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="bg-neutral-900 border-b border-neutral-800 text-neutral-300">
                  <th className="p-2.5 sm:p-3 font-semibold text-neutral-200">Feature</th>
                  <th className="p-2.5 sm:p-3 font-semibold text-white bg-neutral-800 border-b-2 border-b-white">Vista</th>
                  <th className="p-2.5 sm:p-3 font-semibold text-neutral-200">Native (DNF/APT)</th>
                  <th className="p-2.5 sm:p-3 font-semibold text-neutral-200">Flatpak</th>
                  <th className="p-2.5 sm:p-3 font-semibold text-neutral-200">Snapcraft</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80 text-neutral-300">
                <tr className="hover:bg-neutral-900/40">
                  <td className="p-2.5 sm:p-3 font-semibold text-white">Startup Latency</td>
                  <td className="p-2.5 sm:p-3 text-white bg-neutral-900/50 font-bold">&lt; 4 ms (Native)</td>
                  <td className="p-2.5 sm:p-3 text-neutral-200">&lt; 5 ms (Native)</td>
                  <td className="p-2.5 sm:p-3 text-neutral-400">100 - 450 ms</td>
                  <td className="p-2.5 sm:p-3 text-neutral-400">300 - 1200 ms</td>
                </tr>
                <tr className="hover:bg-neutral-900/40">
                  <td className="p-2.5 sm:p-3 font-semibold text-white">Disk Overhead</td>
                  <td className="p-2.5 sm:p-3 text-white bg-neutral-900/50 font-bold">Zero runtime duplication</td>
                  <td className="p-2.5 sm:p-3 text-neutral-200">Zero duplication</td>
                  <td className="p-2.5 sm:p-3 text-neutral-400">~1.2 GB (GNOME/KDE SDK)</td>
                  <td className="p-2.5 sm:p-3 text-neutral-400">~800 MB (core22 base)</td>
                </tr>
                <tr className="hover:bg-neutral-900/40">
                  <td className="p-2.5 sm:p-3 font-semibold text-white">GitHub Direct Install</td>
                  <td className="p-2.5 sm:p-3 text-white bg-neutral-900/50 font-bold">Yes (user@repo syntax)</td>
                  <td className="p-2.5 sm:p-3 text-neutral-400">No (Manual download)</td>
                  <td className="p-2.5 sm:p-3 text-neutral-400">No (Flathub only)</td>
                  <td className="p-2.5 sm:p-3 text-neutral-400">No (Snap Store only)</td>
                </tr>
                <tr className="hover:bg-neutral-900/40">
                  <td className="p-2.5 sm:p-3 font-semibold text-white">Cross-Distro Unified</td>
                  <td className="p-2.5 sm:p-3 text-white bg-neutral-900/50 font-bold">Yes (Fedora, Debian, Arch)</td>
                  <td className="p-2.5 sm:p-3 text-neutral-400">No (Distro-specific)</td>
                  <td className="p-2.5 sm:p-3 text-neutral-300">Yes</td>
                  <td className="p-2.5 sm:p-3 text-neutral-300">Yes</td>
                </tr>
                <tr className="hover:bg-neutral-900/40">
                  <td className="p-2.5 sm:p-3 font-semibold text-white">Fallback Protection</td>
                  <td className="p-2.5 sm:p-3 text-white bg-neutral-900/50 font-bold">Auto-fallback to Flathub</td>
                  <td className="p-2.5 sm:p-3 text-neutral-400">Error: Package not found</td>
                  <td className="p-2.5 sm:p-3 text-neutral-400">N/A</td>
                  <td className="p-2.5 sm:p-3 text-neutral-400">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive Live Resolution Sandbox (High Density) */}
      <section id="demo-section" className="py-12 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
                Interactive Engine Demo
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
                See How Vista Resolves Packages Live
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-400">Select Host OS:</span>
              <div className="flex items-center border border-neutral-800 bg-neutral-950 font-mono text-xs">
                {(['fedora', 'ubuntu', 'arch'] as LinuxDistroId[]).map((distro) => (
                  <button
                    key={distro}
                    onClick={() => setDemoDistro(distro)}
                    className={`px-2.5 py-1 capitalize cursor-pointer transition-colors ${
                      demoDistro === distro
                        ? 'bg-neutral-800 text-white font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {distro}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Sandbox Box */}
          <div className="border border-neutral-800 bg-neutral-950">
            {/* Package selector tabs */}
            <div className="grid grid-cols-3 border-b border-neutral-800 bg-neutral-900/60 font-mono text-xs">
              {(Object.keys(demoScenarios) as Array<keyof typeof demoScenarios>).map((pkg) => (
                <button
                  key={pkg}
                  onClick={() => setSelectedDemoPackage(pkg)}
                  className={`p-3 text-left border-r border-neutral-800 last:border-r-0 cursor-pointer transition-colors ${
                    selectedDemoPackage === pkg
                      ? 'bg-neutral-950 text-white font-bold border-b-2 border-b-white'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <div className="font-bold">{demoScenarios[pkg].title}</div>
                  <div className="text-[10px] text-neutral-400 font-normal">{demoScenarios[pkg].type}</div>
                </button>
              ))}
            </div>

            {/* Resolution outcome */}
            <div className="p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-800/80">
                <div>
                  <div className="text-xs font-mono text-neutral-300">
                    Host: <span className="text-white font-bold capitalize">{demoDistro} Linux (x86_64)</span> • Query: <code className="text-neutral-200">{demoScenarios[selectedDemoPackage].title}</code>
                  </div>
                  <p className="text-xs text-neutral-400 font-sans mt-0.5">
                    {demoScenarios[selectedDemoPackage].description}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs px-2 py-0.5 bg-neutral-900 border border-neutral-800 text-neutral-300">
                    Format: <strong className="text-white">{activeRes.format}</strong>
                  </span>
                  <span className={`font-mono text-xs px-2 py-0.5 border ${
                    activeRes.isNative
                      ? 'bg-neutral-800 border-neutral-700 text-white font-semibold'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                  }`}>
                    {activeRes.isNative ? 'Native Target' : 'Fallback / Binary'}
                  </span>
                </div>
              </div>

              {/* Resolution Decision Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 font-mono text-xs">
                <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                  <div className="text-[11px] text-neutral-400 mb-1">SELECTED CANDIDATE</div>
                  <div className="text-white font-bold truncate">{activeRes.asset}</div>
                  <div className="text-neutral-300 text-[11px] mt-1">{activeRes.decision}</div>
                </div>

                <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                  <div className="text-[11px] text-neutral-400 mb-1">EXECUTED INSTALLER ACTION</div>
                  <div className="text-neutral-200 font-bold truncate">$ {activeRes.tool}</div>
                  <div className="text-neutral-400 text-[11px] mt-1">SHA256 verified against upstream checksums</div>
                </div>
              </div>

              <div className="text-right">
                <button
                  onClick={() => onNavigate('docs', 'resolution-pipeline')}
                  className="text-xs font-mono text-neutral-300 hover:text-white hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Inspect package resolution pipeline in Docs →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards into QuickStart & Docs */}
      <section className="py-12 bg-[#0c0d10]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quick Start Card */}
            <div
              onClick={() => onNavigate('quickstart')}
              className="p-5 border border-neutral-800 bg-neutral-950 hover:border-neutral-600 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-white">
                  <Terminal className="w-4 h-4 text-white" />
                  <span>QUICK START GUIDE</span>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                Step-by-step setup walkthrough for Fedora, Debian, Ubuntu, and Arch. Inspect host detection, install your first package, and learn essential flags.
              </p>
              <span className="font-mono text-xs text-neutral-300 group-hover:text-white font-semibold group-hover:underline">
                Get started in 2 minutes →
              </span>
            </div>

            {/* Documentation Card */}
            <div
              onClick={() => onNavigate('docs')}
              className="p-5 border border-neutral-800 bg-neutral-950 hover:border-neutral-600 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-white">
                  <BookOpen className="w-4 h-4 text-white" />
                  <span>COMPLETE DOCUMENTATION</span>
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                Full CLI reference, resolution pipeline breakdown, configuration schema (<code className="text-neutral-300">config.toml</code>), distro adapters, and security model.
              </p>
              <span className="font-mono text-xs text-neutral-300 group-hover:text-white font-semibold group-hover:underline">
                Explore documentation reference →
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
