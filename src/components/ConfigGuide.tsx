import React, { useState } from 'react';
import { Sliders, Copy, Check, Shield, Key, Database, RefreshCw, FileText } from 'lucide-react';

export const ConfigGuide: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [preferNative, setPreferNative] = useState(true);
  const [allowFlatpak, setAllowFlatpak] = useState(true);
  const [verifyChecksums, setVerifyChecksums] = useState(true);
  const [requireConfirmation, setRequireConfirmation] = useState(true);
  const [ttlSeconds, setTtlSeconds] = useState(3600);

  const generatedToml = `# ~/.config/vista/config.toml
# Vista Universal Linux Package Manager Configuration

[resolver]
prefer_native = ${preferNative}
allow_flatpak = ${allowFlatpak}
allow_snap = false
prefer_stable = true

[security]
verify_checksums = ${verifyChecksums}
require_confirmation = ${requireConfirmation}
allow_untrusted = false

[cache]
enabled = true
ttl_seconds = ${ttlSeconds}
# directory = "/home/user/.cache/vista"

[github]
api_url = "https://api.github.com"
rate_limit_warn = true
# api_token = "ghp_..."

[flathub]
enabled = true
api_url = "https://flathub.org/api/v2"

[general]
auto_confirm = false
# architecture = "x86_64"
verbose = false
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedToml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="config-section" className="py-20 bg-[#090b10] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-800/50 text-xs font-mono text-purple-300 mb-3">
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>Declarative Configuration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Fine-Tune Vista to Your Workflow
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Configure resolver priority weights, security thresholds, cache TTLs, and GitHub rate limits in{' '}
            <code className="text-white font-mono bg-slate-900 px-1.5 py-0.5 rounded text-xs">
              ~/.config/vista/config.toml
            </code>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0c101a] rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-white" />
                <span>Interactive Config Builder</span>
              </h3>

              {/* Resolver Settings */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Resolver Strategy
                </span>
                <label className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">Prefer Native Packages</div>
                    <div className="text-[11px] text-slate-400">Prioritizes native RPM/DEB/Pacman above Flatpak</div>
                  </div>
                  <input
                    id="config-pref-native-toggle"
                    type="checkbox"
                    checked={preferNative}
                    onChange={(e) => setPreferNative(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-white"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">Allow Flathub Fallback</div>
                    <div className="text-[11px] text-slate-400">Automatically discovers Flathub when no native build exists</div>
                  </div>
                  <input
                    id="config-allow-flatpak-toggle"
                    type="checkbox"
                    checked={allowFlatpak}
                    onChange={(e) => setAllowFlatpak(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-white"
                  />
                </label>
              </div>

              {/* Security Settings */}
              <div className="space-y-3 pt-2 border-t border-slate-800/80">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                  Security & Verification
                </span>
                <label className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">Strict Checksum Audit</div>
                    <div className="text-[11px] text-slate-400">Rejects binaries that fail SHA256 matches</div>
                  </div>
                  <input
                    id="config-verify-checksums-toggle"
                    type="checkbox"
                    checked={verifyChecksums}
                    onChange={(e) => setVerifyChecksums(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-white"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800 cursor-pointer">
                  <div>
                    <div className="text-xs font-bold text-white">Interactive Confirmation</div>
                    <div className="text-[11px] text-slate-400">Prompt before invoking root package managers</div>
                  </div>
                  <input
                    id="config-require-confirmation-toggle"
                    type="checkbox"
                    checked={requireConfirmation}
                    onChange={(e) => setRequireConfirmation(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-white"
                  />
                </label>
              </div>

              {/* Cache TTL */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Cache TTL ({ttlSeconds}s)
                  </span>
                  <span className="text-xs font-mono text-white">
                    {Math.round(ttlSeconds / 60)} minutes
                  </span>
                </div>
                <input
                  id="config-cache-ttl-slider"
                  type="range"
                  min="600"
                  max="86400"
                  step="600"
                  value={ttlSeconds}
                  onChange={(e) => setTtlSeconds(Number(e.target.value))}
                  className="w-full accent-white bg-slate-800"
                />
              </div>

              {/* Auth Token Callout */}
              <div className="p-3.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-slate-300 space-y-1.5">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-white" />
                  <span>GitHub Rate Limit Boost (60 → 5000/hr)</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Export your GitHub Personal Access Token in your shell to prevent API rate limits:
                </p>
                <div className="bg-[#06080d] p-2 rounded font-mono text-[11px] text-neutral-200">
                  export VISTA_GITHUB_TOKEN="ghp_yourTokenHere"
                </div>
              </div>
            </div>
          </div>

          {/* Generated TOML Viewer */}
          <div className="lg:col-span-7">
            <div className="bg-[#07090f] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl h-full flex flex-col">
              {/* Header */}
              <div className="px-5 py-3.5 bg-[#0c101a] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-white" />
                  <span className="font-mono text-xs text-slate-300">config.toml</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-colors border border-slate-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy config.toml'}</span>
                </button>
              </div>

              {/* Content */}
              <div className="p-5 font-mono text-xs text-slate-300 overflow-x-auto flex-1 leading-relaxed bg-[#05070c]">
                <pre>{generatedToml}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
