import React, { useState, useMemo } from 'react';
import { DistroInfo, LinuxDistroId, CandidateAsset, EvaluationTag } from '../types';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Box, Cpu, Layers, Terminal } from 'lucide-react';

const DISTROS: DistroInfo[] = [
  {
    id: 'fedora',
    name: 'Fedora 44',
    family: 'Red Hat',
    nativeFormat: 'RPM',
    defaultPackageTool: 'dnf',
    logoColor: '#294172',
    version: '44 (KDE / Workstation)',
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu 24.04 LTS',
    family: 'Debian',
    nativeFormat: 'DEB',
    defaultPackageTool: 'apt',
    logoColor: '#e95420',
    version: '24.04 Noble Numbat',
  },
  {
    id: 'arch',
    name: 'Arch Linux',
    family: 'Arch',
    nativeFormat: 'Pacman',
    defaultPackageTool: 'pacman',
    logoColor: '#1793d1',
    version: 'Rolling Release',
  },
];

interface ScenarioPreset {
  id: string;
  name: string;
  query: string;
  repo: string;
  hasFlathub: boolean;
  flathubId?: string;
  flathubName?: string;
  rawAssets: {
    name: string;
    format: 'rpm' | 'deb' | 'tar.gz' | 'checksum' | 'appimage';
    arch: 'x86_64' | 'aarch64' | 'all';
    isStable: boolean;
  }[];
}

const SCENARIOS: ScenarioPreset[] = [
  {
    id: 'fastfetch',
    name: 'fastfetch (CLI System Info)',
    query: 'fastfetch-cli@fastfetch',
    repo: 'fastfetch-cli/fastfetch',
    hasFlathub: false,
    rawAssets: [
      { name: 'fastfetch-linux-amd64.rpm', format: 'rpm', arch: 'x86_64', isStable: true },
      { name: 'fastfetch-linux-amd64.deb', format: 'deb', arch: 'x86_64', isStable: true },
      { name: 'fastfetch-linux-aarch64.rpm', format: 'rpm', arch: 'aarch64', isStable: true },
      { name: 'fastfetch-linux-amd64.tar.gz', format: 'tar.gz', arch: 'x86_64', isStable: true },
      { name: 'fastfetch-source.tar.gz', format: 'tar.gz', arch: 'all', isStable: true },
      { name: 'SHA256SUMS', format: 'checksum', arch: 'all', isStable: true },
    ],
  },
  {
    id: 'discord',
    name: 'Discord (Desktop Voice & Chat)',
    query: 'discord',
    repo: 'flathub/discord',
    hasFlathub: true,
    flathubId: 'com.discordapp.Discord',
    flathubName: 'Discord',
    rawAssets: [
      { name: 'discord-0.0.60.tar.gz', format: 'tar.gz', arch: 'x86_64', isStable: true },
    ],
  },
  {
    id: 'bat',
    name: 'bat (Cat clone with syntax highlighting)',
    query: 'bat',
    repo: 'sharkdp/bat',
    hasFlathub: false,
    rawAssets: [
      { name: 'bat_0.26.1_amd64.deb', format: 'deb', arch: 'x86_64', isStable: true },
      { name: 'bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz', format: 'tar.gz', arch: 'x86_64', isStable: true },
      { name: 'bat-v0.26.1-aarch64-unknown-linux-gnu.tar.gz', format: 'tar.gz', arch: 'aarch64', isStable: true },
      { name: 'bat_0.26.1_arm64.deb', format: 'deb', arch: 'aarch64', isStable: true },
      { name: 'bat-v0.26.1.sha256', format: 'checksum', arch: 'all', isStable: true },
    ],
  },
  {
    id: 'neovim',
    name: 'Neovim (Hyperextensible Editor)',
    query: 'neovim/neovim',
    repo: 'neovim/neovim',
    hasFlathub: true,
    flathubId: 'io.neovim.nvim',
    flathubName: 'Neovim',
    rawAssets: [
      { name: 'nvim-linux-x86_64.appimage', format: 'appimage', arch: 'x86_64', isStable: true },
      { name: 'nvim-linux-x86_64.tar.gz', format: 'tar.gz', arch: 'x86_64', isStable: true },
      { name: 'nvim-linux-arm64.appimage', format: 'appimage', arch: 'aarch64', isStable: true },
      { name: 'nvim.sha256sum', format: 'checksum', arch: 'all', isStable: true },
    ],
  },
];

export const ScoringVisualizer: React.FC = () => {
  const [selectedDistroId, setSelectedDistroId] = useState<LinuxDistroId>('fedora');
  const [selectedArch, setSelectedArch] = useState<'x86_64' | 'aarch64'>('x86_64');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('fastfetch');
  const [preferNative, setPreferNative] = useState<boolean>(true);
  const [allowFlatpak, setAllowFlatpak] = useState<boolean>(true);

  const currentDistro = DISTROS.find((d) => d.id === selectedDistroId) || DISTROS[0];
  const scenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  // Evaluate candidate assets deterministically based on packaging format, architecture, and safety filters
  const computedAssets = useMemo(() => {
    const list: CandidateAsset[] = [];

    // Evaluate GitHub release assets
    scenario.rawAssets.forEach((raw) => {
      const tags: EvaluationTag[] = [];
      let isCompatible = true;
      let isNativeFormat = false;
      let statusLabel = 'Compatible Asset';

      // Filter checksums
      if (raw.format === 'checksum' || raw.name.includes('SHA') || raw.name.endsWith('.sha256')) {
        tags.push({
          label: 'Security Checksum',
          reason: 'Non-installable hash manifest',
          isPositive: false,
        });
        list.push({
          filename: raw.name,
          format: raw.format,
          arch: raw.arch,
          source: 'github',
          isStable: raw.isStable,
          isCompatible: false,
          statusLabel: 'Filtered: Checksum Manifest',
          tags,
        });
        return;
      }

      // Filter source archives
      if (raw.name.includes('source') || raw.name.includes('src')) {
        tags.push({
          label: 'Source Code',
          reason: 'Uncompiled source code archive',
          isPositive: false,
        });
        list.push({
          filename: raw.name,
          format: raw.format,
          arch: raw.arch,
          source: 'github',
          isStable: raw.isStable,
          isCompatible: false,
          statusLabel: 'Filtered: Source Code',
          tags,
        });
        return;
      }

      // 1. Native format check
      isNativeFormat =
        (raw.format === 'rpm' && currentDistro.nativeFormat === 'RPM') ||
        (raw.format === 'deb' && currentDistro.nativeFormat === 'DEB') ||
        ((raw.format as string) === 'pkg.tar.zst' && currentDistro.nativeFormat === 'Pacman');

      if (isNativeFormat) {
        tags.push({
          label: `Native ${currentDistro.nativeFormat}`,
          reason: `Direct ${currentDistro.nativeFormat} installer match`,
          isPositive: true,
        });
        statusLabel = 'Native Match';
      } else {
        // Cross-distro incompatibility check
        if (raw.format === 'rpm' && currentDistro.nativeFormat !== 'RPM') {
          isCompatible = false;
          statusLabel = 'Incompatible Distro Format';
          tags.push({
            label: 'Incompatible Format',
            reason: `RPM binary rejected on ${currentDistro.nativeFormat} system`,
            isPositive: false,
          });
        } else if (raw.format === 'deb' && currentDistro.nativeFormat !== 'DEB') {
          isCompatible = false;
          statusLabel = 'Incompatible Distro Format';
          tags.push({
            label: 'Incompatible Format',
            reason: `DEB binary rejected on ${currentDistro.nativeFormat} system`,
            isPositive: false,
          });
        } else {
          tags.push({
            label: `${raw.format.toUpperCase()} Archive`,
            reason: 'Generic archive format',
            isPositive: true,
          });
        }
      }

      // 2. Architecture match
      if (raw.arch === selectedArch || raw.arch === 'all') {
        tags.push({
          label: `Arch ${selectedArch}`,
          reason: `Matches CPU architecture (${selectedArch})`,
          isPositive: true,
        });
      } else {
        isCompatible = false;
        statusLabel = 'Arch Mismatch';
        tags.push({
          label: `Arch Mismatch (${raw.arch})`,
          reason: `Asset targets ${raw.arch}, host is ${selectedArch}`,
          isPositive: false,
        });
      }

      // 3. Stable release
      if (raw.isStable) {
        tags.push({
          label: 'Stable Release',
          reason: 'Tagged production release',
          isPositive: true,
        });
      }

      // 4. Source origin
      tags.push({
        label: 'GitHub Release',
        reason: 'Upstream release asset verified',
        isPositive: true,
      });

      list.push({
        filename: raw.name,
        format: raw.format,
        arch: raw.arch,
        source: 'github',
        isStable: raw.isStable,
        isCompatible,
        statusLabel,
        tags,
      });
    });

    // 5. Flathub fallback entry if available & allowed
    if (scenario.hasFlathub && allowFlatpak && scenario.flathubId) {
      const tags: EvaluationTag[] = [
        {
          label: 'Flathub Fallback',
          reason: 'Universal sandboxed desktop runtime',
          isPositive: true,
        },
        {
          label: 'AppStream Verified',
          reason: 'Official verified Flathub metadata',
          isPositive: true,
        },
        {
          label: 'Arch Universal',
          reason: `Available for ${selectedArch}`,
          isPositive: true,
        },
      ];

      list.push({
        filename: `${scenario.flathubId} (Flathub)`,
        format: 'flatpak',
        arch: selectedArch,
        source: 'flathub',
        isStable: true,
        isCompatible: true,
        statusLabel: 'Universal Fallback',
        tags,
      });
    }

    // Sort order:
    // 1. Native format compatible first (if preferNative)
    // 2. Generic binary/archive compatible
    // 3. Flathub fallback
    // 4. Incompatible / filtered last
    list.sort((a, b) => {
      const aNative = preferNative && a.isCompatible && (
        (a.format === 'rpm' && currentDistro.nativeFormat === 'RPM') ||
        (a.format === 'deb' && currentDistro.nativeFormat === 'DEB')
      );
      const bNative = preferNative && b.isCompatible && (
        (b.format === 'rpm' && currentDistro.nativeFormat === 'RPM') ||
        (b.format === 'deb' && currentDistro.nativeFormat === 'DEB')
      );

      if (aNative && !bNative) return -1;
      if (!aNative && bNative) return 1;

      if (a.isCompatible && !b.isCompatible) return -1;
      if (!a.isCompatible && b.isCompatible) return 1;

      // Prefer native before flatpak
      if (a.source === 'github' && b.source === 'flathub') return -1;
      if (a.source === 'flathub' && b.source === 'github') return 1;

      return 0;
    });

    // Pick winning resolution
    const winner = list.find((item) => item.isCompatible);
    if (winner) {
      winner.selected = true;
    }

    return list;
  }, [scenario, currentDistro, selectedArch, preferNative, allowFlatpak]);

  const winnerAsset = computedAssets.find((a) => a.selected);

  return (
    <section id="resolver-section" className="py-16 bg-[#07090e] border-t border-b border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-200 mb-3">
            <Cpu className="w-3.5 h-3.5 text-white" />
            <span>Resolution Engine Inspector</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
            How Vista Resolves Packages
          </h2>
          <p className="mt-3 text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
            Vista evaluates candidate assets against your host distribution's native packaging toolchain, architecture,
            and safety policies. Incompatible formats and non-executable files are safely filtered out.
          </p>
        </div>

        {/* Interactive Controls Bar */}
        <div className="bg-[#0e121d] border border-neutral-800 p-4 sm:p-5 shadow-xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* 1. Distro Picker */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-bold">
                1. Target Linux Distribution
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DISTROS.map((d) => (
                  <button
                    key={d.id}
                    id={`distro-picker-btn-${d.id}`}
                    onClick={() => setSelectedDistroId(d.id)}
                    className={`flex flex-col items-center justify-center p-2.5 border text-xs font-mono transition-all cursor-pointer ${
                      selectedDistroId === d.id
                        ? 'bg-neutral-800 border-white text-white font-bold'
                        : 'bg-neutral-900/70 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
                    }`}
                  >
                    <span className="font-bold text-xs">{d.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-white font-semibold">{d.nativeFormat}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Architecture & Scenario */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-bold">
                2. Architecture & Package Test
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  id="arch-picker-x86_64"
                  onClick={() => setSelectedArch('x86_64')}
                  className={`flex-1 py-1.5 px-2 font-mono text-xs border cursor-pointer ${
                    selectedArch === 'x86_64'
                      ? 'bg-neutral-800 text-white border-white font-bold'
                      : 'bg-neutral-900/60 text-neutral-400 border-neutral-800'
                  }`}
                >
                  x86_64 (amd64)
                </button>
                <button
                  id="arch-picker-aarch64"
                  onClick={() => setSelectedArch('aarch64')}
                  className={`flex-1 py-1.5 px-2 font-mono text-xs border cursor-pointer ${
                    selectedArch === 'aarch64'
                      ? 'bg-neutral-800 text-white border-white font-bold'
                      : 'bg-neutral-900/60 text-neutral-400 border-neutral-800'
                  }`}
                >
                  aarch64 (ARM64)
                </button>
              </div>

              {/* Package selector dropdown */}
              <select
                id="scenario-package-dropdown"
                value={selectedScenarioId}
                onChange={(e) => setSelectedScenarioId(e.target.value)}
                className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 text-xs text-neutral-200 font-mono focus:outline-none focus:border-neutral-500 cursor-pointer"
              >
                {SCENARIOS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Resolver Flags & Active Host Status */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2 font-bold">
                3. Resolver Policies
              </label>
              <div className="space-y-2 font-mono text-xs">
                <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                  <input
                    id="policy-prefer-native-toggle"
                    type="checkbox"
                    checked={preferNative}
                    onChange={(e) => setPreferNative(e.target.checked)}
                    className="rounded bg-neutral-900 border-neutral-700 text-white focus:ring-0"
                  />
                  <span>
                    <strong className="text-white">prefer_native = true</strong> (Native priority)
                  </span>
                </label>

                <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                  <input
                    id="policy-allow-flatpak-toggle"
                    type="checkbox"
                    checked={allowFlatpak}
                    onChange={(e) => setAllowFlatpak(e.target.checked)}
                    className="rounded bg-neutral-900 border-neutral-700 text-white focus:ring-0"
                  />
                  <span>
                    <strong className="text-white">allow_flatpak = true</strong> (Flathub fallback)
                  </span>
                </label>

                <div className="pt-1 text-[11px] text-neutral-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Adapter: {currentDistro.defaultPackageTool.toUpperCase()} ({currentDistro.name})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Resolution Banner */}
        {winnerAsset ? (
          <div className="border border-neutral-700 bg-neutral-950 p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-9 h-9 bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white shrink-0 mt-0.5 sm:mt-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
                    Resolved Package Target
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold">
                    {winnerAsset.source === 'flathub' ? 'Universal Fallback' : 'Native Package Match'}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-mono mt-0.5">
                  {winnerAsset.filename}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5 font-mono">
                  Source: <span className="text-neutral-200">{winnerAsset.source}</span> • Arch:{' '}
                  <span className="text-neutral-200">{winnerAsset.arch}</span> • Target Distro:{' '}
                  <span className="text-white font-bold">{currentDistro.name}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-neutral-900 border border-neutral-700 font-mono text-xs text-neutral-300">
                <span className="text-neutral-500">Action:</span>{' '}
                <span className="text-emerald-400 font-bold">
                  {winnerAsset.source === 'flathub'
                    ? `flatpak install flathub ${scenario.flathubId}`
                    : `sudo ${currentDistro.defaultPackageTool} install ~/.cache/vista/downloads/${winnerAsset.filename}`}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-rose-950/30 border border-rose-800/50 p-5 mb-6 text-center">
            <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-rose-200 font-mono">No Compatible Release Asset Found</h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto font-sans">
              Vista enforces strict architecture and format checks. Incompatible binaries are safely rejected.
            </p>
          </div>
        )}

        {/* Candidate Assets Table */}
        <div className="bg-[#0e121d] border border-neutral-800 overflow-hidden shadow-2xl font-mono text-xs">
          <div className="px-4 py-3 bg-neutral-900/80 border-b border-neutral-800 flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-white" />
              <span>Candidate Assets Evaluated for:</span>
              <code className="px-1.5 py-0.5 bg-neutral-950 text-white border border-neutral-800">
                vista install {scenario.query}
              </code>
            </h4>
            <span className="text-xs text-neutral-400">{computedAssets.length} Candidates</span>
          </div>

          <div className="divide-y divide-neutral-800/60 overflow-x-auto">
            {computedAssets.map((asset, index) => (
              <div
                key={index}
                className={`p-3.5 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3 transition-colors ${
                  asset.selected
                    ? 'bg-neutral-900/60 border-l-2 border-l-white'
                    : !asset.isCompatible
                    ? 'opacity-60 bg-neutral-950/40'
                    : 'hover:bg-neutral-900/40'
                }`}
              >
                {/* File info */}
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 shrink-0">
                    {asset.selected ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : asset.isCompatible ? (
                      <Box className="w-4 h-4 text-neutral-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400/70" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-semibold text-white truncate max-w-sm sm:max-w-md">
                        {asset.filename}
                      </span>
                      {asset.selected && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-white text-black">
                          SELECTED TARGET
                        </span>
                      )}
                      {!asset.isCompatible && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800/50">
                          FILTERED
                        </span>
                      )}
                    </div>

                    {/* Breakdown reasons pills */}
                    <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
                      {asset.tags.map((item, bIdx) => (
                        <span
                          key={bIdx}
                          title={item.reason}
                          className={`text-[10px] font-mono px-1.5 py-0.5 border ${
                            item.isPositive
                              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
                              : 'bg-rose-950/40 text-rose-300 border-rose-800/40'
                          }`}
                        >
                          {item.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status Column */}
                <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-800">
                  <span className={`text-xs px-2 py-0.5 border ${
                    asset.selected
                      ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300 font-bold'
                      : asset.isCompatible
                      ? 'bg-neutral-900 border-neutral-800 text-neutral-300'
                      : 'bg-rose-950/40 border-rose-900 text-rose-400'
                  }`}>
                    {asset.statusLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution note */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-400 px-1">
          <span>
            Verified on Fedora 44 x86_64:{' '}
            <code className="text-white">fastfetch-linux-amd64.rpm</code> selected as native package asset.
          </span>
          <span className="hidden sm:inline text-neutral-500">Source: src/packages/mod.rs</span>
        </div>
      </div>
    </section>
  );
};
