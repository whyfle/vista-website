import React, { useState } from 'react';
import { Download, Copy, Check, Terminal, ExternalLink, ShieldCheck } from 'lucide-react';

export const Installation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'curl' | 'fedora' | 'debian' | 'arch' | 'cargo'>('curl');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const installMethods = {
    curl: {
      name: 'Universal Shell (curl)',
      tag: 'Recommended for quick install',
      description: 'Auto-detects your Linux distribution and installs the native package or release binary into /usr/local/bin.',
      code: `# Run universal installer script:
curl -fsSL https://raw.githubusercontent.com/whyfle/vista/main/install.sh | sudo bash

# Verify installation:
vista sys-info`,
    },
    fedora: {
      name: 'Fedora / RHEL',
      tag: 'Universal script / binary',
      description: 'Install via the universal detection script or extract pre-compiled static release binary.',
      code: `# Run universal installer script:
curl -fsSL https://raw.githubusercontent.com/whyfle/vista/main/install.sh | sudo bash

# Verify:
vista --version`,
    },
    debian: {
      name: 'Debian / Ubuntu',
      tag: 'Native .deb package',
      description: 'Install the native Debian package directly or use the automated installation script.',
      code: `# Download latest release .deb package:
wget https://github.com/whyfle/vista/releases/download/1/vista_0.1.0-1_amd64.deb

# Install with APT (resolves dependencies automatically):
sudo apt install ./vista_0.1.0-1_amd64.deb

# Verify:
vista sys-info`,
    },
    arch: {
      name: 'Arch Linux',
      tag: 'Arch / Pacman',
      description: 'Compile from source via Cargo or install the native Arch package.',
      code: `# Install via Rust Cargo:
cargo install --git https://github.com/whyfle/vista.git

# Or install the native Arch package:
wget https://github.com/whyfle/vista/releases/download/1/vista-0.1.0-1-x86_64.pkg.tar.zst
sudo pacman -U ./vista-0.1.0-1-x86_64.pkg.tar.zst`,
    },
    cargo: {
      name: 'Rust Cargo / Source',
      tag: 'Source compilation',
      description: 'Compiles the lightweight ~3.7MB release binary directly using Rust 2021 toolchain.',
      code: `# Build and install with Cargo:
cargo install --git https://github.com/whyfle/vista.git

# Or clone and build manually:
git clone https://github.com/whyfle/vista.git
cd vista
cargo build --release
sudo install -m 755 target/release/vista /usr/local/bin/`,
    },
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const activeMethod = installMethods[activeTab];

  return (
    <section id="installation" className="py-20 border-b border-neutral-800 bg-[#090a0d]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-2">
            Multi-Platform Distribution
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Installation Guide
          </h2>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed font-normal">
            Install Vista via your preferred method. Whether you use the universal curl script, standalone binary, or Cargo from source,
            you receive a single self-contained binary with zero external runtime dependencies.
          </p>
        </div>

        {/* Square Grid Method Tabs */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-neutral-800">
          {(Object.keys(installMethods) as Array<keyof typeof installMethods>).map((key) => {
            const method = installMethods[key];
            return (
              <button
                key={key}
                id={`install-tab-${key}`}
                onClick={() => setActiveTab(key)}
                className={`p-4 border-r border-b border-neutral-800 text-left transition-colors cursor-pointer ${
                  activeTab === key
                    ? 'bg-neutral-900 border-b-2 border-b-white'
                    : 'bg-neutral-950/60 hover:bg-neutral-900/40'
                }`}
              >
                <div className="font-mono text-xs font-bold text-white">
                  {method.name.split(' (')[0]}
                </div>
                <div className="text-[11px] font-mono text-neutral-400 mt-1">
                  {method.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Code Block Container */}
        <div className="border border-neutral-800 bg-neutral-950 mt-6">
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-900/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">{activeMethod.name}</span>
                <span className="font-mono text-[10px] text-neutral-300 px-1.5 py-0.5 border border-neutral-700 bg-neutral-800">
                  {activeMethod.tag}
                </span>
              </div>
              <p className="text-xs text-neutral-300 mt-1 font-sans">
                {activeMethod.description}
              </p>
            </div>

            <button
              id={`install-copy-code-${activeTab}`}
              onClick={() => handleCopy(activeMethod.code, activeTab)}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-mono text-xs transition-colors cursor-pointer shrink-0"
            >
              {copiedKey === activeTab ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span className="text-white">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 sm:p-6 bg-[#06070a] overflow-x-auto">
            <pre className="font-mono text-xs text-neutral-300 leading-relaxed">
              {activeMethod.code}
            </pre>
          </div>
        </div>

        {/* Practical Example Section: "How to Install and Use a Package with Vista" */}
        <div className="mt-14 border border-neutral-800 bg-neutral-950 p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Terminal className="w-4 h-4 text-white" />
            <h3 className="font-mono text-sm uppercase tracking-wider text-white font-bold">
              Example: Installing & Using Your First Package
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mb-6">
            Here is a practical workflow showing how simple package management is with Vista:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 font-mono text-xs">
            {/* Step A */}
            <div className="p-4 border border-neutral-800 bg-neutral-900/50 flex flex-col justify-between">
              <div>
                <span className="text-neutral-500 block mb-1">Step 1 • Install</span>
                <div className="text-white font-bold mb-2">$ vista install sharkdp/bat</div>
                <p className="text-neutral-300 text-[11px] font-sans leading-relaxed">
                  Directly resolves the <code className="text-neutral-200">bat</code> syntax highlighter from GitHub Releases,
                  verifies the host architecture, and installs the binary.
                </p>
              </div>
            </div>

            {/* Step B */}
            <div className="p-4 border border-neutral-800 bg-neutral-900/50 flex flex-col justify-between">
              <div>
                <span className="text-neutral-500 block mb-1">Step 2 • Use</span>
                <div className="text-white font-bold mb-2">$ bat ~/.config/vista/config.toml</div>
                <p className="text-neutral-300 text-[11px] font-sans leading-relaxed">
                  The installed binary is immediately available in your <code className="text-neutral-200">$PATH</code>. No
                  aliases, flatpak wrappers, or container permissions required.
                </p>
              </div>
            </div>

            {/* Step C */}
            <div className="p-4 border border-neutral-800 bg-neutral-900/50 flex flex-col justify-between">
              <div>
                <span className="text-neutral-500 block mb-1">Step 3 • Manage</span>
                <div className="text-emerald-400 font-bold mb-2">$ vista info bat</div>
                <p className="text-neutral-300 text-[11px] font-sans leading-relaxed">
                  Check resolution provenance, installed version, checksum signature, and native binary paths.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
