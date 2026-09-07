import React from 'react';
import { AlertCircle, CheckCircle2, XCircle, ArrowRight, ShieldCheck, Cpu, Layers, HardDrive } from 'lucide-react';

export const WhyVista: React.FC = () => {
  const painPoints = [
    {
      title: 'Distro Fragmentation',
      problem: 'Every distribution demands a different CLI syntax, repository structure, and update model. Switching between Fedora (DNF), Ubuntu (APT), and Arch (Pacman) creates constant cognitive friction.',
      solution: 'Vista gives you one unified command set: vista install, vista search, vista update. Vista maps your intent directly to the host distribution.',
    },
    {
      title: 'The Outdated Repository Trap',
      problem: 'LTS distributions freeze repositories for stability, leaving modern developer utilities (like fastfetch, ripgrep, bat, or zellij) months or years behind upstream releases.',
      solution: 'Vista queries upstream GitHub Releases directly, resolving latest release tags with zero manual PPA or third-party repo configuration.',
    },
    {
      title: 'The Flatpak & Snap Bloat Tax',
      problem: 'Universal container formats bundle massive GNOME, KDE, or Mesa runtimes (often 1GB+ per tool), resulting in slow cold starts, disk bloat, and broken CLI integrations.',
      solution: 'Native-first priority. Vista strictly prefers native RPM/DEB packages that link against host libraries, falling back to Flathub only when no native package exists.',
    },
    {
      title: 'Manual GitHub Release Chores',
      problem: 'When a tool is only on GitHub, developers must navigate releases, guess their CPU architecture, curl tarballs, verify hashes manually, chmod +x, and manage /usr/local/bin symlinks.',
      solution: 'Run vista install user@repo. Vista parses release manifests, matches compatible architectures, audits SHA256 hashes, and installs the binary in one step.',
    },
  ];

  const comparison = [
    {
      attribute: 'Primary Philosophy',
      vista: 'Native-first with intelligent fallback',
      native: 'Host repository only',
      flatpak: 'Isolated sandbox container',
      snap: 'Squashfs loop-mounted container',
    },
    {
      attribute: 'Unified Command Syntax',
      vista: 'Yes (Identical across distros)',
      native: 'No (Fragmented across dnf/apt/pacman)',
      flatpak: 'Yes (Flatpak only)',
      snap: 'Yes (Snap only)',
    },
    {
      attribute: 'Upstream GitHub Resolver',
      vista: 'Native first-class resolver',
      native: 'None (Manual compilation)',
      flatpak: 'None (Manifest required)',
      snap: 'None (Snapcraft required)',
    },
    {
      attribute: 'Disk Footprint',
      vista: 'Minimal (Shared host libraries)',
      native: 'Minimal (Shared host libraries)',
      flatpak: 'High (Duplicated SDKs & runtimes)',
      snap: 'High (Duplicated base snaps)',
    },
    {
      attribute: 'Startup Latency',
      vista: '< 4ms (Bare-metal Rust)',
      native: 'Fast (Native binary)',
      flatpak: 'Medium (Container initialization)',
      snap: 'Slow (Loop mount overhead)',
    },
    {
      attribute: 'CLI & $PATH Integration',
      vista: 'Direct host environment access',
      native: 'Direct host environment access',
      flatpak: 'Requires wrapper aliases',
      snap: 'Strict confinement limits',
    },
    {
      attribute: 'Integrity Verification',
      vista: 'Automatic SHA256 audit against manifests',
      native: 'Repository GPG signatures',
      flatpak: 'OSTree commit validation',
      snap: 'Snap Store assertions',
    },
  ];

  return (
    <section id="why-vista" className="py-20 border-b border-neutral-800 bg-[#0c0d10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-2">
            The Problem & The Solution
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Vista?
          </h2>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed font-normal">
            Linux package management is caught between two extremes: stale distribution repositories that freeze your
            tooling, and heavy containerized runtimes that consume gigabytes of disk space for a 5MB CLI tool. Vista is
            built to break this dilemma.
          </p>
        </div>

        {/* 4 Square Grid Problem vs Solution Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 border-t border-l border-neutral-800">
          {painPoints.map((item, idx) => (
            <div key={idx} className="p-6 sm:p-8 border-r border-b border-neutral-800 bg-neutral-950/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-bold text-neutral-400">0{idx + 1}</span>
                  <span className="font-mono text-xs text-neutral-600">/</span>
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wide">
                    {item.title}
                  </h3>
                </div>

                <div className="space-y-4 text-xs sm:text-sm font-sans">
                  <div className="p-3 bg-neutral-900/60 border border-neutral-800/80 text-neutral-400 leading-relaxed">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 font-semibold block mb-1">
                      The Problem
                    </span>
                    {item.problem}
                  </div>

                  <div className="p-3 bg-neutral-900 border border-neutral-700 text-neutral-200 leading-relaxed">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white font-semibold block mb-1">
                      Vista's Approach
                    </span>
                    {item.solution}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Matrix Header */}
        <div className="mt-16 mb-6">
          <h3 className="text-xl font-bold text-white font-mono">
            Direct Tooling Comparison
          </h3>
          <p className="text-xs text-neutral-400 mt-1 font-mono">
            How Vista compares with traditional package managers and containerized sandboxes.
          </p>
        </div>

        {/* Square Grid Comparison Table */}
        <div className="border border-neutral-800 overflow-x-auto bg-neutral-950">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-900 text-neutral-300 border-b border-neutral-800">
                <th className="p-3 sm:p-4 font-semibold text-neutral-200">Feature / Metric</th>
                <th className="p-3 sm:p-4 text-white bg-neutral-800 border-l border-r border-neutral-700 font-bold">
                  Vista
                </th>
                <th className="p-3 sm:p-4 text-neutral-400">Native (DNF / APT)</th>
                <th className="p-3 sm:p-4 text-neutral-400">Flatpak</th>
                <th className="p-3 sm:p-4 text-neutral-400">Snap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/70 text-neutral-300">
              {comparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-neutral-900/40 transition-colors">
                  <td className="p-3 sm:p-4 font-semibold text-neutral-200 border-r border-neutral-800/60">
                    {row.attribute}
                  </td>
                  <td className="p-3 sm:p-4 bg-neutral-900/60 text-white font-medium border-l border-r border-neutral-800">
                    {row.vista}
                  </td>
                  <td className="p-3 sm:p-4 text-neutral-400 border-r border-neutral-800/60">
                    {row.native}
                  </td>
                  <td className="p-3 sm:p-4 text-neutral-400 border-r border-neutral-800/60">
                    {row.flatpak}
                  </td>
                  <td className="p-3 sm:p-4 text-neutral-400">
                    {row.snap}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
