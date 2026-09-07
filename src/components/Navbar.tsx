import React, { useState } from 'react';
import { VistaLogo } from './VistaLogo';
import { Github, Copy, Check, ExternalLink, Menu, X, BookOpen, Terminal, Layers } from 'lucide-react';
import { PageTab } from '../types';

interface NavbarProps {
  currentPage: PageTab;
  onNavigate: (page: PageTab, subSection?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const quickCmd = 'curl -fsSL https://raw.githubusercontent.com/whyfle/vista/main/install.sh | sudo bash';

  const handleCopy = () => {
    navigator.clipboard.writeText(quickCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems: { id: PageTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Overview', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'quickstart', label: 'Quick Start', icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'docs', label: 'Documentation', icon: <BookOpen className="w-3.5 h-3.5" /> },
  ];

  return (
    <header
      id="main-navbar"
      className="sticky top-0 z-50 w-full bg-[#0c0d10]/95 backdrop-blur-sm border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            id="nav-brand-button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-neutral-100 hover:text-white transition-colors cursor-pointer group"
          >
            <div className="w-7 h-7 flex items-center justify-center transition-transform group-hover:scale-105 shrink-0">
              <VistaLogo size={26} />
            </div>
            <span className="font-mono font-bold text-sm tracking-tight text-white">
              vista
            </span>
            <span className="text-[10px] font-mono text-neutral-400 px-1.5 py-0.5 border border-neutral-800 rounded bg-neutral-900">
              v0.1.0
            </span>
          </button>

          {/* Navigation links (Tabs) */}
          <nav id="nav-desktop-links" className="hidden sm:flex items-center gap-1 text-xs font-mono">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer ${
                  currentPage === item.id
                    ? 'bg-neutral-900 text-white font-bold border-b-2 border-b-white'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick install copy snippet */}
          <button
            id="nav-quick-copy-button"
            onClick={handleCopy}
            title="Copy universal install command"
            className="hidden lg:flex items-center gap-2 px-2.5 py-1 text-xs font-mono text-neutral-300 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer"
          >
            <span className="text-white font-bold">$</span>
            <span className="text-neutral-400 text-[11px] truncate max-w-[130px]">curl ... | bash</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-neutral-500 ml-1" />
            )}
          </button>

          {/* GitHub link */}
          <a
            id="nav-github-link"
            href="https://github.com/whyfle/vista"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-colors"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
            <ExternalLink className="w-3 h-3 text-neutral-500" />
          </a>

          {/* Mobile menu button */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="sm:hidden p-1.5 text-neutral-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div id="nav-mobile-menu" className="sm:hidden border-t border-neutral-800 bg-[#0c0d10] px-4 py-2 space-y-1 font-mono text-xs">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileOpen(false);
              }}
              className={`flex items-center gap-2 w-full text-left py-2 px-2 transition-colors ${
                currentPage === item.id
                  ? 'bg-neutral-900 text-white font-bold border-l-2 border-l-white'
                  : 'text-neutral-300'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-neutral-800">
            <button
              onClick={handleCopy}
              className="flex items-center justify-between w-full py-2 px-2 text-xs font-mono text-neutral-400"
            >
              <span>{copied ? 'Copied install script' : 'Copy install script'}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
