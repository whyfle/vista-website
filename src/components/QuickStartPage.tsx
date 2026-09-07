import React, { useState } from 'react';
import { VistaLogo } from './VistaLogo';
import {
  Terminal,
  Check,
  Copy,
  Download,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { PageTab } from '../types';

interface QuickStartPageProps {
  onNavigate: (page: PageTab, subSection?: string) => void;
}

export const QuickStartPage: React.FC<QuickStartPageProps> = ({ onNavigate }) => {
  const [activeInstallTab, setActiveInstallTab] = useState<'curl' | 'fedora' | 'debian' | 'arch' | 'cargo'>('curl');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeScenario, setActiveScenario] = useState<number>(0);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const installSnippets = {
    curl: {
      name: 'Universal Script',
      cmd: 'curl -fsSL https://raw.githubusercontent.com/whyfle/vista/main/install.sh | sudo bash',
      notes: 'Auto-detects distribution, architecture, and installs single binary to /usr/local/bin.',
    },
    debian: {
      name: 'Debian / Ubuntu (.deb)',
      cmd: 'wget https://github.com/whyfle/vista/releases/latest/download/vista-linux-amd64.deb && sudo apt install ./vista-linux-amd64.deb',
      notes: 'Installs native .deb package and resolves system dependencies with APT.',
    },
    tarball: {
      name: 'Standalone Binary',
      cmd: 'wget https://github.com/whyfle/vista/releases/latest/download/vista-linux-x86_64.tar.gz && tar -xzf vista-linux-x86_64.tar.gz && sudo install -m 755 vista /usr/local/bin/vista',
      notes: 'Pre-compiled static binary tarball for Fedora, Arch, openSUSE, and any Linux distro.',
    },
    arch: {
      name: 'Arch Linux',
      cmd: 'cargo install --git https://github.com/whyfle/vista.git',
      notes: 'Compiles native static binary using Rust toolchain or extract release tarball.',
    },
    cargo: {
      name: 'Rust Cargo / Source',
      cmd: 'cargo install --git https://github.com/whyfle/vista.git',
      notes: 'Produces a single stripped ~3.7MB binary in ~/.cargo/bin/vista.',
    },
  };

  const scenarios = [
    {
      title: '01. System Check',
      badge: 'Diagnostics',
      cmd: 'vista sys-info',
      description: 'Verifies distribution detection, native package toolchain (DNF/APT/Pacman), and CPU architecture.',
      output: `  System Information
  ────────────────────────────────────────
    ID: fedora
    Name: Fedora Linux 44 (KDE Plasma Desktop Edition)
    Version: 44 (44 (KDE Plasma Desktop Edition))
    Architecture: x86_64
    Family: rpm
    Native format: rpm
    Like: -

  Available package managers:
    ✓ dnf
    ✓ flatpak`,
    },
    {
      title: '02. Ecosystem Search',
      badge: 'Multi-Repo',
      cmd: 'vista search fastfetch',
      description: 'Queries upstream GitHub releases and Flathub apps simultaneously.',
      output: `vista search 'fastfetch' — fedora x86_64 (rpm)
github:
1. fastfetch-cli/fastfetch ★24548 — A maintained, feature-rich and performance oriented system info tool…
2. sameemul-haque/dotfiles ★899 — ✨ Hyprland + Waybar with Catppuccin theme • Arch Linux
3. vyrx-dev/symphony ★507 — a setup I wish already existed
4. LierB/fastfetch ★429 — Fastfetch config presets
5. ad1822/hyprdots ★424 — 🫟 Awesome Hyprland Dotfiles
flathub:
1. CPU Info (com.kgurgul.cpuinfo) — Information about device hardware and software
2. Embellish (io.github.getnf.embellish) — Install nerd fonts
3. Linux Theme Store (io.github.debasish_patra_1987.linuxthemestore) — Browse desktop themes
4. System Monitoring Center (io.github.hakandundar34coding.system-monitoring-center) — Multi-featured monitor
install: vista install user@repo  (native: rpm)`,
    },
    {
      title: '03. Native RPM/DEB Installation',
      badge: 'Native Package',
      cmd: 'sudo vista install fastfetch',
      description: 'Detects system format, locates the native .rpm/.deb release asset, downloads to cache, and invokes host package manager.',
      output: `  Vista Package Manager

  Detecting system...
  ✓ Fedora Linux 44 (KDE Plasma Desktop Edition) 44
  ✓ x86_64
  Family: rpm  Native: rpm

  Searching GitHub for 'fastfetch'...
  Found 5 repositories, checking releases...
  Checking fastfetch-cli/fastfetch ...
  ✓ Found release 2.68.1

  Analyzing packages...
  ✓ fastfetch-linux-amd64.rpm

  Selected:
    Source: GitHub
    Repository: fastfetch-cli/fastfetch
    Package: fastfetch-linux-amd64.rpm
    Format: rpm
    Architecture: x86_64
    Version: 2.68.1

  Available package managers: dnf, flatpak

  Install this package? [Y/n]: y
  Downloading...
  ✓ Downloaded 1616563 bytes to "~/.cache/vista/downloads/fastfetch-linux-amd64.rpm"
  Verifying package arch/format...

  Installing...
  Running: dnf5 install ~/.cache/vista/downloads/fastfetch-linux-amd64.rpm
  ✓ Successfully installed fastfetch-linux-amd64.rpm`,
    },
    {
      title: '04. Upstream Archive Safety',
      badge: 'Archive Inspection',
      cmd: 'vista install sharkdp/bat',
      description: 'When upstream supplies a tar.gz without a native package, Vista downloads safely without executing unvetted scripts.',
      output: `  Vista Package Manager

  Detecting system...
  ✓ Fedora Linux 44 (KDE Plasma Desktop Edition) 44
  ✓ x86_64
  Family: rpm  Native: rpm

  Searching GitHub...
  ✓ Found release v0.26.1

  Analyzing packages...
  ✓ bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz

  Selected:
    Source: GitHub
    Repository: sharkdp/bat
    Package: bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz
    Format: tar.gz
    Architecture: x86_64
    Version: 0.26.1

  ⚠ Package format 'tar.gz' may require manual installation or script execution. Vista will not run arbitrary install scripts automatically.

  Available package managers: dnf, flatpak

  Downloaded to "~/.cache/vista/downloads/bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz"
  ✗ Unsupported package format tar.gz for direct install via native manager. Please install manually.`,
    },
    {
      title: '05. Flathub Fallback',
      badge: 'Automatic Fallback',
      cmd: 'vista install discord',
      description: 'When upstream supplies no native build for your distribution, Vista triggers Flathub automatically.',
      output: `Resolving package 'discord'...
  [1/2] Checking upstream releases: No native .rpm provided by vendor.
  [2/2] Checking fallback providers: Found Flathub package 'com.discordapp.Discord'.
==> Automatic fallback triggered (config: allow_flathub = true)
==> Invoking: flatpak install flathub com.discordapp.Discord -y
Installing: com.discordapp.Discord/x86_64/stable
Complete! Desktop application launcher registered.`,
    },
  ];

  return (
    <div id="quickstart-page" className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Breadcrumb & Header */}
      <div className="border-b border-neutral-800 pb-6 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-2">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Vista
          </button>
          <span>/</span>
          <span className="text-white font-semibold">Quick Start Guide</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-1 border border-neutral-800 bg-black shrink-0">
              <VistaLogo size={36} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                Quick Start Guide
              </h1>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 font-sans">
                Get up and running with Vista in under two minutes. Covers installation, verification, and first commands.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('docs')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-200 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
              <span>Full Documentation →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step 1: Supported Distros Table (High Density) */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-white font-mono text-xs font-bold">
            01
          </span>
          <h2 className="font-mono text-sm uppercase tracking-wider text-white font-bold">
            Platform Compatibility
          </h2>
        </div>
        <div className="border border-neutral-800 bg-neutral-950 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-900 border-b border-neutral-800 text-neutral-300">
                <th className="p-2.5 sm:p-3 font-semibold text-neutral-200">Distribution</th>
                <th className="p-2.5 sm:p-3 font-semibold text-neutral-200">Native Tool</th>
                <th className="p-2.5 sm:p-3 font-semibold text-neutral-200">Package Format</th>
                <th className="p-2.5 sm:p-3 font-semibold text-neutral-200">Architectures</th>
                <th className="p-2.5 sm:p-3 font-semibold text-neutral-200">Support Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-300">
              <tr className="hover:bg-neutral-900/40">
                <td className="p-2.5 sm:p-3 text-white font-bold">Fedora Linux / RHEL / CentOS</td>
                <td className="p-2.5 sm:p-3 text-neutral-200">/usr/bin/dnf</td>
                <td className="p-2.5 sm:p-3">.rpm / tar</td>
                <td className="p-2.5 sm:p-3">x86_64, aarch64</td>
                <td className="p-2.5 sm:p-3 text-white">Tier 1 (Script / Binary)</td>
              </tr>
              <tr className="hover:bg-neutral-900/40">
                <td className="p-2.5 sm:p-3 text-white font-bold">Debian / Ubuntu / Mint</td>
                <td className="p-2.5 sm:p-3 text-neutral-200">/usr/bin/apt</td>
                <td className="p-2.5 sm:p-3">.deb</td>
                <td className="p-2.5 sm:p-3">x86_64, aarch64</td>
                <td className="p-2.5 sm:p-3 text-white">Tier 1 (Native .deb)</td>
              </tr>
              <tr className="hover:bg-neutral-900/40">
                <td className="p-2.5 sm:p-3 text-white font-bold">Arch Linux / Manjaro</td>
                <td className="p-2.5 sm:p-3 text-neutral-200">/usr/bin/pacman</td>
                <td className="p-2.5 sm:p-3">.pkg.tar.zst</td>
                <td className="p-2.5 sm:p-3">x86_64</td>
                <td className="p-2.5 sm:p-3 text-white">Tier 1 (Cargo / Tar)</td>
              </tr>
              <tr className="hover:bg-neutral-900/40">
                <td className="p-2.5 sm:p-3 text-white font-bold">openSUSE (Tumbleweed/Leap)</td>
                <td className="p-2.5 sm:p-3 text-neutral-200">/usr/bin/zypper</td>
                <td className="p-2.5 sm:p-3">.rpm</td>
                <td className="p-2.5 sm:p-3">x86_64</td>
                <td className="p-2.5 sm:p-3 text-neutral-300">Tier 2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Step 2: High-Density Install Options */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-white font-mono text-xs font-bold">
            02
          </span>
          <h2 className="font-mono text-sm uppercase tracking-wider text-white font-bold">
            Install Vista
          </h2>
        </div>

        {/* Tab Buttons Strip */}
        <div className="border border-neutral-800 bg-neutral-950">
          <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-neutral-800 bg-neutral-900/60 font-mono text-xs">
            {(Object.keys(installSnippets) as Array<keyof typeof installSnippets>).map((tab) => (
              <button
                key={tab}
                id={`qs-install-tab-${tab}`}
                onClick={() => setActiveInstallTab(tab)}
                className={`p-2.5 text-left border-r border-neutral-800 last:border-r-0 transition-colors cursor-pointer ${
                  activeInstallTab === tab
                    ? 'bg-neutral-950 text-white font-bold border-b-2 border-b-white'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40'
                }`}
              >
                {installSnippets[tab].name}
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono text-neutral-400">
                {installSnippets[activeInstallTab].notes}
              </span>
              <button
                id={`qs-copy-btn-${activeInstallTab}`}
                onClick={() => handleCopy(installSnippets[activeInstallTab].cmd, activeInstallTab)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-mono text-xs transition-colors cursor-pointer shrink-0"
              >
                {copiedKey === activeInstallTab ? (
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

            <div className="bg-[#06070a] p-3 border border-neutral-800/80 font-mono text-xs text-neutral-200 overflow-x-auto select-all">
              <span className="text-white font-bold select-none mr-2">$</span>
              <span>{installSnippets[activeInstallTab].cmd}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Interactive Command Exercises (High Density) */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-white font-mono text-xs font-bold">
            03
          </span>
          <h2 className="font-mono text-sm uppercase tracking-wider text-white font-bold">
            Hands-On Workflow Walkthrough
          </h2>
        </div>

        <div className="border border-neutral-800 bg-neutral-950">
          {/* Scenario selector tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 border-b border-neutral-800 bg-neutral-900/60 font-mono text-xs">
            {scenarios.map((sc, idx) => (
              <button
                key={idx}
                id={`scenario-tab-${idx}`}
                onClick={() => setActiveScenario(idx)}
                className={`p-3 text-left border-r border-neutral-800 last:border-r-0 transition-colors cursor-pointer ${
                  activeScenario === idx
                    ? 'bg-neutral-950 text-white font-bold border-b-2 border-b-white'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40'
                }`}
              >
                <div className="truncate">{sc.title}</div>
                <div className="text-[10px] text-neutral-400 font-normal mt-0.5">{sc.badge}</div>
              </button>
            ))}
          </div>

          {/* Scenario Details */}
          <div className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-800/80">
              <div>
                <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <span>{scenarios[activeScenario].title}:</span>
                  <code className="text-white bg-neutral-900 px-1.5 py-0.5 border border-neutral-800">
                    {scenarios[activeScenario].cmd}
                  </code>
                </div>
                <p className="text-xs text-neutral-300 font-sans mt-1">
                  {scenarios[activeScenario].description}
                </p>
              </div>

              <button
                onClick={() => handleCopy(scenarios[activeScenario].cmd, `sc-${activeScenario}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-mono text-xs transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
              >
                {copiedKey === `sc-${activeScenario}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span className="text-white">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                    <span>Copy Command</span>
                  </>
                )}
              </button>
            </div>

            {/* Terminal Output */}
            <pre className="bg-[#06070a] p-3 sm:p-4 border border-neutral-800/80 font-mono text-xs text-neutral-300 overflow-x-auto leading-relaxed">
              {scenarios[activeScenario].output}
            </pre>
          </div>
        </div>
      </section>

      {/* Step 4: Essential Flags (High Density Reference) */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-700 text-white font-mono text-xs font-bold">
            04
          </span>
          <h2 className="font-mono text-sm uppercase tracking-wider text-white font-bold">
            Essential CLI Flags
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-neutral-800">
          <div className="p-3.5 sm:p-4 border-r border-b border-neutral-800 bg-neutral-950/60 font-mono text-xs">
            <div className="text-white font-bold mb-1">--dry-run</div>
            <div className="text-neutral-300 font-semibold text-[11px] mb-1">Simulate Resolution</div>
            <p className="text-neutral-400 text-[11px] font-sans">
              Inspects packages and logs candidate targets without modifying system files.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 border-r border-b border-neutral-800 bg-neutral-950/60 font-mono text-xs">
            <div className="text-white font-bold mb-1">-y, --yes</div>
            <div className="text-neutral-300 font-semibold text-[11px] mb-1">Non-Interactive</div>
            <p className="text-neutral-400 text-[11px] font-sans">
              Automatically accepts installation prompts for automated CI/CD scripts.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 border-r border-b border-neutral-800 bg-neutral-950/60 font-mono text-xs">
            <div className="text-white font-bold mb-1">--github</div>
            <div className="text-neutral-300 font-semibold text-[11px] mb-1">Target Upstream</div>
            <p className="text-neutral-400 text-[11px] font-sans">
              Forces search against GitHub releases even when a distro repo match exists.
            </p>
          </div>

          <div className="p-3.5 sm:p-4 border-r border-b border-neutral-800 bg-neutral-950/60 font-mono text-xs">
            <div className="text-white font-bold mb-1">--default &lt;SOURCE&gt;</div>
            <div className="text-neutral-300 font-semibold text-[11px] mb-1">Choose Install Source</div>
            <p className="text-neutral-400 text-[11px] font-sans">
              Chooses what provider or format you want to use for the install (e.g. native, GitHub upstream, or Flathub).
            </p>
          </div>
        </div>
      </section>

      {/* Next Steps Banner */}
      <div className="border border-neutral-800 bg-neutral-950 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-mono text-sm font-bold text-white">Ready for more?</h3>
          <p className="text-xs text-neutral-400 font-sans mt-0.5">
            Explore complete CLI flag specifications, configuration options in <code className="text-neutral-300 font-mono">config.toml</code>, and packaging adapters.
          </p>
        </div>
        <button
          onClick={() => onNavigate('docs')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-mono text-xs font-semibold transition-colors cursor-pointer shrink-0"
        >
          <span>Open Full Documentation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
