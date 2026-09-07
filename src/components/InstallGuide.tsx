import React, { useState } from 'react';
import { Download, Terminal, Check, Copy, ExternalLink, ShieldCheck, Box, Github } from 'lucide-react';

export const InstallGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'script' | 'debian' | 'cargo' | 'manual'>('script');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const installSnippets = {
    script: `# Quick universal installer for Debian, Ubuntu, Arch, and Fedora:
curl -fsSL https://raw.githubusercontent.com/whyfle/vista/main/install.sh | sudo bash

# Test installation:
vista --version`,
    debian: `# Install native .deb package on Debian / Ubuntu / Mint:
wget https://github.com/whyfle/vista/releases/download/1/vista_0.1.0-1_amd64.deb
sudo apt install ./vista_0.1.0-1_amd64.deb

# Verify installation:
vista sys-info`,
    cargo: `# Install directly via Rust Cargo:
cargo install --git https://github.com/whyfle/vista

# Or clone and compile high-efficiency release binary:
git clone https://github.com/whyfle/vista.git
cd vista
cargo build --release
sudo cp target/release/vista /usr/local/bin/

# Verify single static binary (~3.7MB):
vista sys-info`,
    manual: `# Direct per-distro downloads from Release 1
# (https://github.com/whyfle/vista/releases/tag/1):

# Fedora / RHEL / openSUSE:
wget https://github.com/whyfle/vista/releases/download/1/vista-0.1.0-1.fc44.x86_64.rpm
sudo dnf install ./vista-0.1.0-1.fc44.x86_64.rpm

# Arch / Manjaro:
wget https://github.com/whyfle/vista/releases/download/1/vista-0.1.0-1-x86_64.pkg.tar.zst
sudo pacman -U ./vista-0.1.0-1-x86_64.pkg.tar.zst

# Verify checksum first (recommended):
wget https://github.com/whyfle/vista/releases/download/1/checksums.txt
sha256sum -c --ignore-missing checksums.txt

# Download hiccup (GitHub CDN 5xx)? Just re-run — install.sh retries
# with backoff and resolves a fresh CDN URL automatically.

# Run self-test:
vista sys-info`,
  };

  return (
    <section id="install-section" className="py-20 bg-[#07090e] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/50 text-xs font-mono text-emerald-300 mb-3">
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Deployment & Installation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Install Vista on Your Linux Machine
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Get up and running in seconds via native repository packages, universal script, or Cargo.
          </p>
        </div>

        {/* Installation Card */}
        <div className="max-w-4xl mx-auto bg-[#0c101a] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center overflow-x-auto border-b border-slate-800/90 bg-[#0a0d14] px-4 pt-3 gap-2">
            <button
              id="install-tab-script"
              onClick={() => setActiveTab('script')}
              className={`px-4 py-2.5 rounded-t-lg text-xs font-mono font-medium transition-colors border-t-2 ${
                activeTab === 'script'
                  ? 'bg-[#0c101a] text-white border-white'
                  : 'text-slate-400 hover:text-slate-200 border-transparent'
              }`}
            >
              Universal Shell
            </button>
            <button
              id="install-tab-debian"
              onClick={() => setActiveTab('debian')}
              className={`px-4 py-2.5 rounded-t-lg text-xs font-mono font-medium transition-colors border-t-2 ${
                activeTab === 'debian'
                  ? 'bg-[#0c101a] text-white border-white'
                  : 'text-slate-400 hover:text-slate-200 border-transparent'
              }`}
            >
              Debian / Ubuntu (.deb)
            </button>
            <button
              id="install-tab-cargo"
              onClick={() => setActiveTab('cargo')}
              className={`px-4 py-2.5 rounded-t-lg text-xs font-mono font-medium transition-colors border-t-2 ${
                activeTab === 'cargo'
                  ? 'bg-[#0c101a] text-white border-white'
                  : 'text-slate-400 hover:text-slate-200 border-transparent'
              }`}
            >
              Rust Cargo / Source
            </button>
            <button
              id="install-tab-manual"
              onClick={() => setActiveTab('manual')}
              className={`px-4 py-2.5 rounded-t-lg text-xs font-mono font-medium transition-colors border-t-2 ${
                activeTab === 'manual'
                  ? 'bg-[#0c101a] text-white border-white'
                  : 'text-slate-400 hover:text-slate-200 border-transparent'
              }`}
            >
              Standalone Tarball
            </button>
          </div>

          {/* Tab Content Box */}
          <div className="p-6">
            <div className="flex items-center justify-between pb-3 mb-3 border-slate-800/80">
              <span className="text-xs font-mono text-slate-400">
                {activeTab === 'script' && 'Universal script with auto-distro detection (Arch, Debian, Ubuntu, Fedora)'}
                {activeTab === 'debian' && 'Native .deb package with automated dependency resolution'}
                {activeTab === 'cargo' && 'Single binary (~3.7MB) compiled from git repository'}
                {activeTab === 'manual' && 'Direct .rpm / .deb / .pkg.tar.zst downloads + checksums'}
              </span>

              <button
                id="install-copy-command-btn"
                onClick={() => handleCopy(installSnippets[activeTab], activeTab)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors border border-slate-700"
              >
                {copiedKey === activeTab ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedKey === activeTab ? 'Copied' : 'Copy Commands'}</span>
              </button>
            </div>

            <div className="bg-[#05070c] rounded-xl border border-slate-800 p-4 font-mono text-xs text-neutral-200 overflow-x-auto leading-relaxed">
              <pre>{installSnippets[activeTab]}</pre>
            </div>
          </div>

          {/* Post-Install Quick Verification Box */}
          <div className="bg-[#080b12] px-6 py-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verify your setup with:</span>
              <code className="px-2 py-0.5 rounded bg-slate-900 text-emerald-300 font-bold">
                vista sys-info
              </code>
            </div>
            <a
              href="https://github.com/vista-cli/vista"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white font-mono"
            >
              <Github className="w-3.5 h-3.5" />
              <span>View releases on GitHub</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
