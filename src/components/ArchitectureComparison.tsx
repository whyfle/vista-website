import React from 'react';
import { Layers, ShieldCheck, Check, X, Minus, Sparkles, Cpu, Zap } from 'lucide-react';

export const ArchitectureComparison: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Native RPM/DEB/Arch Priority',
      vista: 'Always First (+100)',
      traditional: 'Yes (Repo only)',
      flatpak: 'No (Sandboxed)',
      snap: 'No (Loop-mounted)',
    },
    {
      feature: 'Upstream GitHub Releases Resolver',
      vista: 'Built-in (Automated)',
      traditional: 'Manual Wget / Build',
      flatpak: 'No',
      snap: 'No',
    },
    {
      feature: 'Automatic Flathub Fallback',
      vista: 'Intelligent Fallback',
      traditional: 'Manual Command',
      flatpak: 'Primary Only',
      snap: 'No',
    },
    {
      feature: 'Startup Latency & Overhead',
      vista: '< 4ms (Rust Native)',
      traditional: 'Fast (Native)',
      flatpak: 'Medium (Sandbox overhead)',
      snap: 'Slow (Squashfs mount)',
    },
    {
      feature: 'Disk Footprint (Runtimes)',
      vista: 'Zero Redundant SDKs',
      traditional: 'Shared system libs',
      flatpak: 'Duplicated SDKs (GBs)',
      snap: 'Duplicated core snaps',
    },
    {
      feature: 'CLI Tool & System Integration',
      vista: 'First-Class ($PATH, man)',
      traditional: 'First-Class',
      flatpak: 'Complex alias wrapping',
      snap: 'Isolated confinement',
    },
    {
      feature: 'Binary Integrity Audit (SHA256)',
      vista: 'Automatic verification',
      traditional: 'GPG keys required',
      flatpak: 'OSTree commit signatures',
      snap: 'Snap store assertions',
    },
  ];

  return (
    <section id="architecture-section" className="py-20 bg-[#090b10] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-950/60 border border-teal-800/50 text-xs font-mono text-teal-300 mb-3">
            <Layers className="w-3.5 h-3.5 text-teal-400" />
            <span>Architectural Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Native Focus Matters
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
            Linux users shouldn't have to choose between stale distro repositories and 2GB containerized runtimes.
            Vista bridges both worlds with intelligent native-first resolution.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-[#0c101a] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-mono border-collapse">
              <thead>
                <tr className="bg-[#0a0d14] border-b border-slate-800 text-slate-400">
                  <th className="p-4 sm:p-5 font-sans font-semibold text-slate-300">Capability / Feature</th>
                  <th className="p-4 sm:p-5 bg-neutral-900 text-white font-bold border-l border-r border-neutral-700">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-white" />
                      <span>Vista (Native Focus)</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 text-slate-300">Native Managers (DNF/APT)</th>
                  <th className="p-4 sm:p-5 text-slate-300">Flatpak / Flathub</th>
                  <th className="p-4 sm:p-5 text-slate-300">Snapcraft</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                    <td className="p-4 sm:p-5 font-sans font-medium text-slate-200">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 bg-neutral-900/40 text-white font-semibold border-l border-r border-neutral-800">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-white shrink-0" />
                        <span>{row.vista}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-400">{row.traditional}</td>
                    <td className="p-4 sm:p-5 text-slate-400">{row.flatpak}</td>
                    <td className="p-4 sm:p-5 text-slate-400">{row.snap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3 Core Principles */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-neutral-800 text-white flex items-center justify-center text-xs font-mono">1</span>
              Native Integration First
            </h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans">
              Native RPM and DEB packages share your system's dynamic linkers, themes, GPU drivers, and fonts with zero
              isolation impedance.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-neutral-800 text-white flex items-center justify-center text-xs font-mono">2</span>
              Flathub as Safety Net
            </h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans">
              When an upstream project doesn't ship a distro package, Vista gracefully falls back to verified Flathub
              AppStream bundles instead of failing.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-neutral-800 text-white flex items-center justify-center text-xs font-mono">3</span>
              Upstream Provenance
            </h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans">
              Directly resolve GitHub Releases via <code className="text-white font-mono">user@repo</code> syntax with automatic
              checksum verification against official release manifests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
