import React from 'react';
import { VistaLogo } from './VistaLogo';
import { Github, ExternalLink, Cpu } from 'lucide-react';
import { PageTab } from '../types';

interface FooterProps {
  onNavigate: (page: PageTab, subSection?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-[#08090c] border-t border-neutral-800 text-neutral-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-2.5">
            <div className="flex items-center gap-2.5 text-white">
              <div className="p-0.5 border border-neutral-800 bg-neutral-900 text-white shrink-0">
                <VistaLogo size={26} />
              </div>
              <span className="font-bold text-sm tracking-tight">vista</span>
              <span className="text-[10px] text-neutral-400 px-1 py-0.2 border border-neutral-800 bg-neutral-900">
                v0.1.0
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-sans max-w-sm leading-relaxed">
              Universal Linux package manager with native focus. Evaluates native RPM/DEB packages first, resolves
              upstream release assets, and falls back to Flathub automatically.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                id="footer-github-repo-link"
                href="https://github.com/vista-cli/vista"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-colors text-xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs">
                <Cpu className="w-3.5 h-3.5 text-neutral-500" />
                <span>Rust 2021</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-neutral-300 uppercase tracking-widest text-[10px] font-bold">
              Pages
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Overview (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quickstart')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Quick Start Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('docs', 'overview')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Full Documentation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('docs', 'cli-commands')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  CLI Reference
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('docs', 'resolver-architecture')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Resolution Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Repository Links */}
          <div className="space-y-2">
            <div className="text-neutral-300 uppercase tracking-widest text-[10px] font-bold">
              Upstream Resources
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a
                  href="https://github.com/vista-cli/vista/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>README.md</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vista-cli/vista/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>GitHub Releases</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vista-cli/vista/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Issue Tracker</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://flathub.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Flathub Registry</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-500 text-[11px]">
          <div>
            Open-source under the <span className="text-neutral-300 font-semibold">MIT License</span>. Developed by the Vista community and contributors.
          </div>
          <div className="text-neutral-500">
            High-density architecture • Native Linux focus
          </div>
        </div>
      </div>
    </footer>
  );
};
