import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Copy,
  Check,
  Terminal,
  Cpu,
  ShieldCheck,
  Layers,
  Settings,
  Package,
  Github,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sliders,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { PageTab } from '../types';
import { VistaLogo } from './VistaLogo';
import { ScoringVisualizer } from './ScoringVisualizer';
import { ConfigGuide } from './ConfigGuide';

interface DocsPageProps {
  onNavigate: (page: PageTab, subSection?: string) => void;
  initialSection?: string;
}

interface DocSection {
  id: string;
  category: string;
  title: string;
  summary: string;
  badge?: string;
}

export const DocsPage: React.FC<DocsPageProps> = ({ onNavigate, initialSection = 'overview' }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(initialSection);
  const [searchFilter, setSearchFilter] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialSection) {
      setActiveSectionId(initialSection);
    }
  }, [initialSection]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sections: DocSection[] = [
    // Getting Started
    { id: 'overview', category: 'Getting Started', title: 'Overview & Core Architecture', summary: 'Philosophy, native-first pipeline, and design principles.' },
    { id: 'installation-docs', category: 'Getting Started', title: 'Installation & Packages', summary: 'Universal script, Debian .deb, Tarball, and Cargo installation methods.' },
    { id: 'sys-info-docs', category: 'Getting Started', title: 'Host Detection Diagnostics', summary: 'How Vista detects your Linux kernel, native tools, and CPU architecture.' },

    // Resolver Engine
    { id: 'resolver-architecture', category: 'Resolution Engine', title: 'Resolution Pipeline', summary: 'Three-stage evaluation: Native -> GitHub -> Flathub Fallback.' },
    { id: 'scoring-matrix', category: 'Resolution Engine', title: 'Asset Selection Rules', summary: 'Deterministic selection: native format, arch match, and safety filters.' },
    { id: 'interactive-simulator', category: 'Resolution Engine', title: 'Interactive Resolution Simulator', summary: 'Live sandbox testing resolution against real-world package assets.', badge: 'Interactive' },

    // CLI Reference
    { id: 'cli-commands', category: 'CLI Reference', title: 'Command Reference & Syntax', summary: 'Complete catalog of all Vista commands, flags, and arguments.', badge: 'Catalog' },
    { id: 'cli-flags', category: 'CLI Reference', title: 'Global Flags & Options', summary: '--dry-run, --yes, --github, --default, and verbosity flags.' },

    // Configuration
    { id: 'config-reference', category: 'Configuration', title: 'config.toml Schema', summary: 'Declarative configuration in ~/.config/vista/config.toml.' },
    { id: 'config-generator', category: 'Configuration', title: 'Interactive Config Builder', summary: 'Live generator for building custom configuration files.', badge: 'Interactive' },

    // Distribution Adapters
    { id: 'distro-adapters', category: 'Distro Adapters', title: 'Distro Toolchain Adapters', summary: 'Fedora DNF/RPM, Debian APT, and Arch Pacman execution drivers.' },
    { id: 'flathub-adapter', category: 'Distro Adapters', title: 'Flathub Fallback Adapter', summary: 'AppStream metadata indexing and Flatpak CLI orchestration.' },

    // GitHub Releases
    { id: 'github-upstream', category: 'Upstream Releases', title: 'GitHub Direct (user@repo)', summary: 'Asset discovery, SemVer tagging, and rate limiting authentication.' },

    // Security
    { id: 'security-integrity', category: 'Security & Audit', title: 'SHA256 & Provenance Audit', summary: 'Automated checksum verification against release manifests.' },

    // Troubleshooting
    { id: 'troubleshooting-faq', category: 'Support', title: 'Troubleshooting & FAQ', summary: 'Solving permission issues, GitHub rate limits, and cache resets.' },
  ];

  const filteredSections = useMemo(() => {
    if (!searchFilter.trim()) return sections;
    const q = searchFilter.toLowerCase();
    return sections.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
    );
  }, [sections, searchFilter]);

  const categories = useMemo(() => {
    const map: { [cat: string]: DocSection[] } = {};
    for (const sec of filteredSections) {
      if (!map[sec.category]) map[sec.category] = [];
      map[sec.category].push(sec);
    }
    return map;
  }, [filteredSections]);

  const activeDoc = sections.find((s) => s.id === activeSectionId) || sections[0];

  return (
    <div id="docs-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Top Header & Search Bar (High Density) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => onNavigate('home')}
            className="text-neutral-400 hover:text-white cursor-pointer"
          >
            Vista
          </button>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-300">Docs</span>
          <span className="text-neutral-600">/</span>
          <span className="text-white font-bold">{activeDoc.title}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter topics..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 pl-8 pr-2.5 py-1 text-xs font-mono text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-500"
            />
          </div>

          <button
            onClick={() => onNavigate('quickstart')}
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-white cursor-pointer shrink-0"
          >
            <span>Quick Start →</span>
          </button>
        </div>
      </div>

      {/* Main Docs Grid: Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Sticky Sidebar (High Density) */}
        <aside className="lg:col-span-1 border border-neutral-800 bg-neutral-950 p-2 sm:sticky sm:top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold px-2 py-1 mb-1 border-b border-neutral-800">
            Table of Contents
          </div>

          <div className="space-y-4 pt-1">
            {Object.keys(categories).map((cat) => (
              <div key={cat} className="space-y-0.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 px-2 pt-1 font-semibold">
                  {cat}
                </div>
                {categories[cat].map((sec) => (
                  <button
                    key={sec.id}
                    id={`docs-nav-${sec.id}`}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`w-full text-left px-2 py-1.5 text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                      activeSectionId === sec.id
                        ? 'bg-neutral-900 text-white font-bold border-l-2 border-l-white'
                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40'
                    }`}
                  >
                    <span className="truncate">{sec.title}</span>
                    {sec.badge && (
                      <span className="text-[9px] px-1 py-0.2 bg-neutral-900 border border-neutral-700 text-white ml-1 shrink-0">
                        {sec.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </aside>

        {/* Right Content Panel (High Density) */}
        <div className="lg:col-span-3 space-y-6">
          {/* SECTION: Overview */}
          {activeSectionId === 'overview' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-3.5 mb-2">
                  <div className="p-1 border border-neutral-800 bg-black shrink-0">
                    <VistaLogo size={32} />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                      Getting Started
                    </span>
                    <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-0.5">
                      Overview & Core Architecture
                    </h1>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  Vista is a native-first, deterministic package manager for Linux designed to bridge the gap between distribution repositories, upstream GitHub releases, and Flathub.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                  <div className="text-white font-bold mb-1">1. Native First (+100)</div>
                  <p className="text-neutral-400 text-[11px] font-sans">
                    Prefers RPM on Fedora, DEB on Debian/Ubuntu, and Pacman packages on Arch. Zero container bloat.
                  </p>
                </div>
                <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                  <div className="text-white font-bold mb-1">2. Upstream Direct</div>
                  <p className="text-neutral-400 text-[11px] font-sans">
                    Queries GitHub Releases for latest developer tools with SemVer release matching.
                  </p>
                </div>
                <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                  <div className="text-white font-bold mb-1">3. Flathub Fallback</div>
                  <p className="text-neutral-400 text-[11px] font-sans">
                    Safety net for GUI apps when no native build exists for the host distribution.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-neutral-300 leading-relaxed font-sans">
                <h3 className="text-sm font-bold font-mono text-white">Execution Pipeline</h3>
                <p>
                  When you run <code className="font-mono text-neutral-200">vista install &lt;package&gt;</code>, the internal engine executes the following phases in sequence:
                </p>
                <ol className="list-decimal list-inside space-y-1.5 pl-1 font-mono text-xs text-neutral-300">
                  <li><strong className="text-white">Host Introspection:</strong> Resolves host distro, native package manager binary path, and CPU architecture via <code className="text-neutral-200">/etc/os-release</code>.</li>
                  <li><strong className="text-white">Concurrent Discovery:</strong> Queries local repository caches, GitHub Releases API, and Flathub AppStream metadata simultaneously.</li>
                  <li><strong className="text-white">Deterministic Evaluation:</strong> Evaluates candidate assets based on architecture, native packaging format, and release stability.</li>
                  <li><strong className="text-white">Integrity Auditing:</strong> Fetches and parses release checksum manifests (SHA256) before executing any binaries.</li>
                  <li><strong className="text-white">Host Delegation:</strong> Hands off installation to your distribution tool (<code className="text-neutral-200">dnf</code>, <code className="text-neutral-200">apt</code>, or <code className="text-neutral-200">pacman</code>) for proper dependency tracking.</li>
                </ol>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveSectionId('resolver-architecture')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:underline cursor-pointer"
                >
                  <span>Explore the Resolution Pipeline →</span>
                </button>
              </div>
            </div>
          )}

          {/* SECTION: Installation */}
          {activeSectionId === 'installation-docs' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Getting Started
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  Installation & Distro Packages
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  Choose the official installation channel suited to your Linux distribution.
                </p>
              </div>

              <div className="space-y-4">
                {/* Method 1: Universal Shell Installer */}
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 font-mono text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Universal Shell Installer (Recommended)</span>
                    <button
                      onClick={() => handleCopy('curl -fsSL https://raw.githubusercontent.com/whyfle/vista/main/install.sh | sudo bash', 'script')}
                      className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-[11px] cursor-pointer"
                    >
                      {copiedKey === 'script' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="bg-[#06070a] p-2.5 border border-neutral-800 text-neutral-200 select-all overflow-x-auto">
                    curl -fsSL https://raw.githubusercontent.com/whyfle/vista/main/install.sh | sudo bash
                  </pre>
                  <p className="text-[11px] text-neutral-400 font-sans mt-2">
                    Auto-detects distribution (Fedora, Debian, Ubuntu, Arch, openSUSE) and CPU architecture, installing Vista to <code className="text-neutral-300">/usr/local/bin/vista</code>.
                  </p>
                </div>

                {/* Method 2: Debian / Ubuntu .deb */}
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 font-mono text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Debian / Ubuntu (.deb Standalone)</span>
                    <button
                      onClick={() => handleCopy('wget https://github.com/whyfle/vista/releases/latest/download/vista-linux-amd64.deb && sudo apt install ./vista-linux-amd64.deb', 'deb')}
                      className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-[11px] cursor-pointer"
                    >
                      {copiedKey === 'deb' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="bg-[#06070a] p-2.5 border border-neutral-800 text-neutral-200 select-all overflow-x-auto">
                    wget https://github.com/whyfle/vista/releases/latest/download/vista-linux-amd64.deb && sudo apt install ./vista-linux-amd64.deb
                  </pre>
                  <p className="text-[11px] text-neutral-400 font-sans mt-2">
                    Pre-compiled Debian package containing stripped binary and manpages.
                  </p>
                </div>

                {/* Method 3: Standalone Tarball */}
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 font-mono text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Standalone Binary Tarball (Fedora / Arch / General Linux)</span>
                    <button
                      onClick={() => handleCopy('wget https://github.com/whyfle/vista/releases/latest/download/vista-linux-x86_64.tar.gz && tar -xzf vista-linux-x86_64.tar.gz && sudo install -m 755 vista /usr/local/bin/vista', 'tarball')}
                      className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-[11px] cursor-pointer"
                    >
                      {copiedKey === 'tarball' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="bg-[#06070a] p-2.5 border border-neutral-800 text-neutral-200 select-all overflow-x-auto">
                    wget https://github.com/whyfle/vista/releases/latest/download/vista-linux-x86_64.tar.gz && tar -xzf vista-linux-x86_64.tar.gz && sudo install -m 755 vista /usr/local/bin/vista
                  </pre>
                  <p className="text-[11px] text-neutral-400 font-sans mt-2">
                    Pre-compiled static binary tarball. Works on any modern Linux distribution without dependencies.
                  </p>
                </div>

                {/* Method 4: Cargo */}
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 font-mono text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white">Rust Toolchain (Cargo)</span>
                    <button
                      onClick={() => handleCopy('cargo install --git https://github.com/whyfle/vista.git', 'cargo')}
                      className="px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-[11px] cursor-pointer"
                    >
                      {copiedKey === 'cargo' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="bg-[#06070a] p-2.5 border border-neutral-800 text-neutral-200 select-all overflow-x-auto">
                    cargo install --git https://github.com/whyfle/vista.git
                  </pre>
                  <p className="text-[11px] text-neutral-400 font-sans mt-2">
                    Compiles directly from the latest commit using your local Rust toolchain (Rust 1.75+ required).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Host Detection */}
          {activeSectionId === 'sys-info-docs' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Getting Started
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  Host Detection Diagnostics (<code className="text-neutral-200">vista sys-info</code>)
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  Vista dynamically inspects the host Linux environment on every invocation.
                </p>
              </div>

              <div className="font-mono text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Sample Terminal Diagnostic Output:</span>
                  <button
                    onClick={() => handleCopy('vista sys-info', 'sysinfo')}
                    className="text-xs text-white hover:underline cursor-pointer"
                  >
                    {copiedKey === 'sysinfo' ? 'Copied command' : 'Copy vista sys-info'}
                  </button>
                </div>

                <pre className="bg-[#06070a] p-4 border border-neutral-800 text-neutral-300 leading-relaxed overflow-x-auto">
{`vista v0.1.0 (Rust 2021 edition)
[host-detection]
  Distribution: Fedora Linux 41 (Workstation Edition)
  ID / Like:    fedora / [rhel, centos]
  Native Tool:  /usr/bin/dnf (RPM format)
  Architecture: x86_64 (Linux 6.12.9-200.fc41)
  Flatpak SDK:  Installed (/var/lib/flatpak)
  Cache Path:   ~/.cache/vista/registry (size: 420 KB)
[status] All providers operational.`}
                </pre>
              </div>

              <div className="border border-neutral-800 bg-neutral-900/40 p-4 font-mono text-xs space-y-2">
                <h4 className="font-bold text-white">How Host Detection Works</h4>
                <ul className="list-disc list-inside text-neutral-300 text-[11px] space-y-1 font-sans">
                  <li><strong className="text-white font-mono">/etc/os-release:</strong> Parses <code className="text-neutral-200">ID</code>, <code className="text-neutral-200">ID_LIKE</code>, and <code className="text-neutral-200">VERSION_ID</code> without invoking external shell scripts.</li>
                  <li><strong className="text-white font-mono">Binary Lookup:</strong> Scans <code className="text-neutral-200">$PATH</code> for verified paths (<code className="text-neutral-300">/usr/bin/dnf</code>, <code className="text-neutral-300">/usr/bin/apt</code>, <code className="text-neutral-300">/usr/bin/pacman</code>).</li>
                  <li><strong className="text-white font-mono">Architecture Normalization:</strong> Normalizes <code className="text-neutral-200">uname -m</code> (<code className="text-neutral-300">amd64 -&gt; x86_64</code>, <code className="text-neutral-300">arm64 -&gt; aarch64</code>) to match upstream naming conventions.</li>
                </ul>
              </div>
            </div>
          )}

          {/* SECTION: Resolver Architecture */}
          {activeSectionId === 'resolver-architecture' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Resolution Engine
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  Resolution Pipeline Architecture
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  Understanding how Vista avoids container bloat while maintaining seamless fallback protection.
                </p>
              </div>

              <div className="border border-neutral-800 bg-neutral-900/40 p-4 font-mono text-xs">
                <div className="text-white font-bold mb-2">Priority Ladder</div>
                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-emerald-900/60 text-emerald-300">
                    <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-400 font-bold">STAGE 1</span>
                    <span>Host Native Package (DNF RPM / APT DEB / Pacman) • <strong>Direct OS Integration</strong></span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-neutral-800 text-neutral-200">
                    <span className="px-1.5 py-0.5 bg-neutral-900 text-white font-bold">STAGE 2</span>
                    <span>Upstream GitHub Release Binary (Pre-compiled musl / glibc) • <strong>Zero Sandbox Bloat</strong></span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-neutral-800 text-neutral-300">
                    <span className="px-1.5 py-0.5 bg-neutral-900 text-neutral-400 font-bold">STAGE 3</span>
                    <span>Flathub AppStream Fallback • <strong>Guarantees no dead ends for GUI software</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Scoring Matrix / Selection Rules */}
          {activeSectionId === 'scoring-matrix' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Resolution Engine
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  Package Selection Rules & Priorities
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  Every candidate asset is evaluated using deterministic criteria to select the ideal native or precompiled package.
                </p>
              </div>

              <div className="border border-neutral-800 bg-neutral-950 overflow-x-auto">
                <table className="w-full text-left font-mono text-xs border-collapse">
                  <thead>
                    <tr className="bg-neutral-900 border-b border-neutral-800 text-neutral-300">
                      <th className="p-2.5 sm:p-3 font-semibold text-neutral-200">Evaluation Criterion</th>
                      <th className="p-2.5 sm:p-3 font-semibold text-white">Resolution Priority</th>
                      <th className="p-2.5 sm:p-3 font-semibold text-neutral-200">Technical Justification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/80 text-neutral-300">
                    <tr className="hover:bg-neutral-900/40">
                      <td className="p-2.5 sm:p-3 text-white font-bold">Native Package Format Match</td>
                      <td className="p-2.5 sm:p-3 text-emerald-400 font-bold">Primary Target (Selected)</td>
                      <td className="p-2.5 sm:p-3 text-neutral-400 font-sans text-[11px]">Matches host package format (.rpm on Fedora, .deb on Ubuntu, .pkg.tar.zst on Arch).</td>
                    </tr>
                    <tr className="hover:bg-neutral-900/40">
                      <td className="p-2.5 sm:p-3 text-white font-bold">Exact Architecture Match</td>
                      <td className="p-2.5 sm:p-3 text-emerald-400 font-bold">Mandatory Match</td>
                      <td className="p-2.5 sm:p-3 text-neutral-400 font-sans text-[11px]">Binary targets host CPU instruction set (e.g. x86_64, aarch64).</td>
                    </tr>
                    <tr className="hover:bg-neutral-900/40">
                      <td className="p-2.5 sm:p-3 text-white font-bold">Stable Tagged Release</td>
                      <td className="p-2.5 sm:p-3 text-neutral-200 font-bold">Preferred Target</td>
                      <td className="p-2.5 sm:p-3 text-neutral-400 font-sans text-[11px]">Excludes release candidates, alpha, and beta tags.</td>
                    </tr>
                    <tr className="hover:bg-neutral-900/40">
                      <td className="p-2.5 sm:p-3 text-white font-bold">Official GitHub Release Manifest</td>
                      <td className="p-2.5 sm:p-3 text-neutral-200 font-bold">Verified Origin</td>
                      <td className="p-2.5 sm:p-3 text-neutral-400 font-sans text-[11px]">Asset originates directly from author's verified GitHub tag.</td>
                    </tr>
                    <tr className="hover:bg-neutral-900/40">
                      <td className="p-2.5 sm:p-3 text-white font-bold">Foreign Distro Format</td>
                      <td className="p-2.5 sm:p-3 text-rose-400 font-bold">Filtered (Incompatible)</td>
                      <td className="p-2.5 sm:p-3 text-neutral-400 font-sans text-[11px]">Rejects incompatible package formats (e.g. .deb asset on Fedora, .rpm on Debian).</td>
                    </tr>
                    <tr className="hover:bg-neutral-900/40">
                      <td className="p-2.5 sm:p-3 text-white font-bold">Architecture Mismatch</td>
                      <td className="p-2.5 sm:p-3 text-rose-500 font-bold">Disqualified (Filtered)</td>
                      <td className="p-2.5 sm:p-3 text-neutral-400 font-sans text-[11px]">Prevents attempting to execute aarch64 binary on x86_64 host.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveSectionId('interactive-simulator')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:underline cursor-pointer"
                >
                  <span>Open Interactive Resolution Simulator →</span>
                </button>
              </div>
            </div>
          )}

          {/* SECTION: Interactive Simulator */}
          {activeSectionId === 'interactive-simulator' && (
            <div className="space-y-4">
              <div className="border border-neutral-800 bg-neutral-950 p-4">
                <h2 className="text-base font-bold font-mono text-white">
                  Live Resolution Simulator
                </h2>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">
                  Simulate candidate asset evaluation against Fedora, Ubuntu, and Arch host environments.
                </p>
              </div>
              <ScoringVisualizer />
            </div>
          )}

          {/* SECTION: CLI Commands */}
          {activeSectionId === 'cli-commands' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  CLI Reference
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  Command Reference & Syntax
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  Unified command interface across all supported Linux distributions.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {/* install */}
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">vista install &lt;package&gt; | &lt;user@repo&gt;</span>
                    <span className="text-neutral-400 text-[11px]">Alias: vista add</span>
                  </div>
                  <p className="text-neutral-300 font-sans text-xs">
                    Resolves candidate packages with native priority and Flathub fallback.
                  </p>
                  <pre className="bg-[#06070a] p-2 border border-neutral-800 text-neutral-200 overflow-x-auto">
                    vista install fastfetch-cli@fastfetch --dry-run
                  </pre>
                </div>

                {/* search */}
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">vista search &lt;query&gt;</span>
                    <span className="text-neutral-400 text-[11px]">Alias: vista find</span>
                  </div>
                  <p className="text-neutral-300 font-sans text-xs">
                    Searches distribution repositories, GitHub releases, and Flathub simultaneously.
                  </p>
                  <pre className="bg-[#06070a] p-2 border border-neutral-800 text-neutral-200 overflow-x-auto">
                    vista search ripgrep
                  </pre>
                </div>

                {/* sys-info */}
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">vista sys-info</span>
                    <span className="text-neutral-400 text-[11px]">Alias: vista status</span>
                  </div>
                  <p className="text-neutral-300 font-sans text-xs">
                    Outputs host distribution, native package manager binary path, and architecture.
                  </p>
                </div>

                {/* info */}
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">vista info &lt;package&gt;</span>
                    <span className="text-neutral-400 text-[11px]">Alias: vista inspect</span>
                  </div>
                  <p className="text-neutral-300 font-sans text-xs">
                    Displays package details, SHA256 integrity status, and upstream release metadata.
                  </p>
                </div>

                {/* maintenance */}
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">vista update && vista upgrade</span>
                    <span className="text-neutral-400 text-[11px]">Alias: vista refresh</span>
                  </div>
                  <p className="text-neutral-300 font-sans text-xs">
                    Refreshes registry caches and upgrades packages to the latest verified versions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: CLI Flags */}
          {activeSectionId === 'cli-flags' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  CLI Reference
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  Global Flags & Options
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  Command-line flags controlling resolution behavior and output formatting.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                  <span className="text-white font-bold">--dry-run</span>
                  <p className="text-neutral-300 font-sans text-xs mt-1">
                    Simulates package evaluation and logs candidate selection without executing system installers.
                  </p>
                </div>
                <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                  <span className="text-white font-bold">-y, --yes</span>
                  <p className="text-neutral-300 font-sans text-xs mt-1">
                    Accepts confirmation prompts automatically for CI/CD runners and scripts.
                  </p>
                </div>
                <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                  <span className="text-white font-bold">--github</span>
                  <p className="text-neutral-300 font-sans text-xs mt-1">
                    Forces resolution to prioritize upstream GitHub release assets over distro packages.
                  </p>
                </div>
                <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                  <span className="text-white font-bold">--default &lt;SOURCE&gt;</span>
                  <p className="text-neutral-300 font-sans text-xs mt-1">
                    Chooses what provider or target you want to use for the installation (e.g. choose between native package manager, upstream GitHub binary, or Flathub) instead of automatic resolution.
                  </p>
                </div>
                <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                  <span className="text-white font-bold">-v, --verbose</span>
                  <p className="text-neutral-300 font-sans text-xs mt-1">
                    Enables diagnostic debug logging including HTTP headers and candidate evaluation logs.
                  </p>
                </div>
                <div className="p-3 bg-neutral-900/60 border border-neutral-800">
                  <span className="text-white font-bold">--json</span>
                  <p className="text-neutral-300 font-sans text-xs mt-1">
                    Formats search results and package inspection data as structured JSON for automation.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Config Reference */}
          {activeSectionId === 'config-reference' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Configuration
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  config.toml Specification
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  Customizing resolver thresholds, cache durations, and provider settings in <code className="text-neutral-200 font-mono">~/.config/vista/config.toml</code>.
                </p>
              </div>

              <pre className="bg-[#06070a] p-4 border border-neutral-800 font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto select-all">
{`# ~/.config/vista/config.toml

[resolver]
prefer_native = true         # Bias towards native RPM/DEB/Arch builds
allow_flatpak = true         # Enable Flathub fallback when native is absent
allow_snap = false           # Keep false to prevent snapd invocation
prefer_stable = true         # Exclude pre-releases and RC tags

[security]
verify_checksums = true      # Verify SHA256 before invoking installer
require_confirmation = true  # Prompt before root elevation

[cache]
enabled = true
ttl_seconds = 3600           # 1 hour cache duration for repo metadata

[github]
api_url = "https://api.github.com"
rate_limit_warn = true`}
              </pre>

              <div className="pt-2">
                <button
                  onClick={() => setActiveSectionId('config-generator')}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:underline cursor-pointer"
                >
                  <span>Launch Interactive Config Generator →</span>
                </button>
              </div>
            </div>
          )}

          {/* SECTION: Config Generator */}
          {activeSectionId === 'config-generator' && (
            <div className="space-y-4">
              <div className="border border-neutral-800 bg-neutral-950 p-4">
                <h2 className="text-base font-bold font-mono text-white">
                  Interactive Config Builder
                </h2>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">
                  Toggle parameters to generate a custom <code className="text-neutral-200 font-mono">~/.config/vista/config.toml</code> file.
                </p>
              </div>
              <ConfigGuide />
            </div>
          )}

          {/* SECTION: Distro Adapters */}
          {activeSectionId === 'distro-adapters' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Distro Adapters
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  Native Distro Toolchain Adapters
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  Vista wraps native Linux package managers rather than replacing them, maintaining OS stability and dependency tracking.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-neutral-900/60 border border-neutral-800">
                  <div className="text-white font-bold mb-1">Fedora / RHEL / CentOS Adapter (DNF)</div>
                  <p className="text-neutral-300 font-sans text-xs">
                    Executes <code className="text-neutral-200">/usr/bin/dnf</code> with RPM file targets. Maintains transaction history in <code className="text-neutral-300">dnf history</code>.
                  </p>
                </div>
                <div className="p-4 bg-neutral-900/60 border border-neutral-800">
                  <div className="text-white font-bold mb-1">Debian / Ubuntu Adapter (APT)</div>
                  <p className="text-neutral-300 font-sans text-xs">
                    Executes <code className="text-neutral-200">/usr/bin/apt</code> with .deb file targets. Automatically resolves transitive dependencies.
                  </p>
                </div>
                <div className="p-4 bg-neutral-900/60 border border-neutral-800">
                  <div className="text-white font-bold mb-1">Arch Linux Adapter (Pacman)</div>
                  <p className="text-neutral-300 font-sans text-xs">
                    Executes <code className="text-neutral-200">/usr/bin/pacman -U</code> for native packages or installs musl release binaries to <code className="text-neutral-300">/usr/local/bin</code>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Flathub Adapter */}
          {activeSectionId === 'flathub-adapter' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Distro Adapters
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  Flathub Fallback Adapter
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  When upstream provides no native build for your distribution, Vista triggers Flathub as a safety net.
                </p>
              </div>

              <div className="border border-neutral-800 bg-neutral-900/40 p-4 font-mono text-xs space-y-3">
                <div className="text-white font-bold">Fallback Decision Tree:</div>
                <p className="text-neutral-300 font-sans text-xs leading-relaxed">
                  1. Vista checks native repos and GitHub releases for valid candidate assets.<br />
                  2. If none exist (or format compatibility is 0), Vista queries Flathub's AppStream catalog.<br />
                  3. If a match is found, Vista delegates installation to <code className="text-neutral-200">flatpak install flathub &lt;app_id&gt;</code>.<br />
                  4. Application desktop entries and icons are registered automatically.
                </p>
              </div>
            </div>
          )}

          {/* SECTION: GitHub Upstream */}
          {activeSectionId === 'github-upstream' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Upstream Releases
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  GitHub Direct (<code className="text-neutral-200">user@repo</code>)
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  Direct targeting of upstream developer releases without waiting for distribution packaging cycles.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <span className="font-bold text-white">Syntax Format:</span>
                  <pre className="bg-[#06070a] p-2 border border-neutral-800 text-neutral-200 overflow-x-auto">
                    vista install sharkdp/bat
                  </pre>
                  <p className="text-neutral-300 font-sans text-xs">
                    Vista parses the repository tag, downloads release assets, evaluates architectures, and installs to <code className="text-neutral-200">/usr/local/bin</code>.
                  </p>
                </div>

                <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <span className="font-bold text-white">GitHub API Rate Limit Handling:</span>
                  <p className="text-neutral-300 font-sans text-xs">
                    Unauthenticated requests to the GitHub API are rate-limited to 60 requests/hour. To raise this to 5,000 requests/hour, set your personal access token:
                  </p>
                  <pre className="bg-[#06070a] p-2 border border-neutral-800 text-neutral-200 overflow-x-auto">
                    export VISTA_GITHUB_TOKEN="ghp_yourPersonalAccessToken"
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Security */}
          {activeSectionId === 'security-integrity' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Security & Audit
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  SHA256 & Provenance Verification
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  Ensuring zero tampering or unverified binary execution.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Automated Checksum Verification</span>
                  </div>
                  <p className="text-neutral-300 font-sans text-xs">
                    When downloading upstream release assets, Vista automatically looks for checksum files (<code className="text-neutral-200">SHA256SUMS</code>, <code className="text-neutral-200">checksums.txt</code>) attached to the release. It computes the SHA256 hash of the downloaded file and rejects corrupted or modified binaries before execution.
                  </p>
                </div>

                <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="text-white font-bold flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" />
                    <span>Privilege Isolation</span>
                  </div>
                  <p className="text-neutral-300 font-sans text-xs">
                    Vista runs as an unprivileged user for all network fetching, candidate evaluation, and checksum auditing. Elevation via <code className="text-neutral-200">sudo</code> is invoked exclusively during the final package manager delegation step.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: Troubleshooting & FAQ */}
          {activeSectionId === 'troubleshooting-faq' && (
            <div className="border border-neutral-800 bg-neutral-950 p-5 sm:p-6 space-y-5">
              <div className="border-b border-neutral-800 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-white font-bold">
                  Support
                </span>
                <h1 className="text-xl sm:text-2xl font-bold font-mono text-white mt-1">
                  Troubleshooting & Frequently Asked Questions
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans mt-1">
                  Common solutions and diagnostic commands for Vista.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="text-white font-bold">Q: How do I clear the local package registry cache?</div>
                  <p className="text-neutral-300 font-sans text-xs">
                    Run <code className="text-neutral-200 font-mono">vista clean</code> or delete the cache directory:
                  </p>
                  <pre className="bg-[#06070a] p-2 border border-neutral-800 text-neutral-200 overflow-x-auto">
                    vista clean --all
                  </pre>
                </div>

                <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="text-white font-bold">Q: How do I test what Vista would install without touching my system?</div>
                  <p className="text-neutral-300 font-sans text-xs">
                    Append the <code className="text-neutral-200 font-mono">--dry-run</code> flag to any install command:
                  </p>
                  <pre className="bg-[#06070a] p-2 border border-neutral-800 text-neutral-200 overflow-x-auto">
                    vista install fastfetch-cli@fastfetch --dry-run
                  </pre>
                </div>

                <div className="p-4 bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <div className="text-white font-bold">Q: I'm getting GitHub API rate limit errors (403 Forbidden).</div>
                  <p className="text-neutral-300 font-sans text-xs">
                    Set a GitHub personal access token in your environment or <code className="text-neutral-200">~/.bashrc</code>:
                  </p>
                  <pre className="bg-[#06070a] p-2 border border-neutral-800 text-neutral-200 overflow-x-auto">
                    export VISTA_GITHUB_TOKEN="ghp_yourTokenHere"
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
