import React, { useState } from 'react';
import { Terminal, Copy, Check, Search } from 'lucide-react';

export const CliCheatsheet: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const commands = [
    {
      name: 'vista install <pkg>',
      alias: 'vista add',
      description: 'Resolves and installs a package with native-first priority and automatic Flathub fallback.',
      example: 'vista install fastfetch-cli@fastfetch',
      category: 'Package Management',
    },
    {
      name: 'vista install <user@repo>',
      alias: 'Upstream Resolver',
      description: 'Resolves releases directly from a GitHub repository, matches compatible binaries, and audits SHA256.',
      example: 'vista install sharkdp/bat',
      category: 'Package Management',
    },
    {
      name: 'vista search <query>',
      alias: 'find',
      description: 'Searches upstream GitHub releases, distribution repositories, and Flathub simultaneously.',
      example: 'vista search ripgrep',
      category: 'Discovery',
    },
    {
      name: 'vista info <pkg>',
      alias: 'inspect',
      description: 'Displays resolution match details, checksum integrity, and package provenance.',
      example: 'vista info fastfetch',
      category: 'Discovery',
    },
    {
      name: 'vista sys-info',
      alias: 'status',
      description: 'Detects host distribution (Fedora/Debian/Arch), native toolchain path, and CPU architecture.',
      example: 'vista sys-info',
      category: 'System',
    },
    {
      name: 'vista update',
      alias: 'refresh',
      description: 'Refreshes local cache metadata, GitHub release registries, and Flathub AppStream indexes.',
      example: 'vista update',
      category: 'Maintenance',
    },
    {
      name: 'vista upgrade [pkg]',
      alias: 'up',
      description: 'Upgrades installed packages to their latest verified upstream or native release.',
      example: 'vista upgrade',
      category: 'Maintenance',
    },
    {
      name: 'vista remove <pkg>',
      alias: 'vista rm',
      description: 'Removes the package using the native package manager or flatpak uninstall.',
      example: 'vista remove fastfetch',
      category: 'Package Management',
    },
    {
      name: 'vista clean',
      alias: 'purge',
      description: 'Clears downloaded temporary release archives, partial downloads, and cached manifests.',
      example: 'vista clean --all',
      category: 'Maintenance',
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const q = searchQuery.toLowerCase();
    return (
      cmd.name.toLowerCase().includes(q) ||
      cmd.description.toLowerCase().includes(q) ||
      cmd.example.toLowerCase().includes(q)
    );
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section id="commands" className="py-20 border-b border-neutral-800 bg-[#0c0d10]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block mb-2">
              Command Line Reference
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Vista CLI Syntax
            </h2>
            <p className="mt-2 text-sm text-neutral-300 font-sans">
              Clean, predictable commands that behave consistently across any distribution.
            </p>
          </div>

          {/* Filter Search Input */}
          <div className="w-full md:w-72">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="cli-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter commands..."
                className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>
        </div>

        {/* Square Grid Command Table */}
        <div className="mt-8 border border-neutral-800 bg-neutral-950 overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="bg-neutral-900 border-b border-neutral-800 text-neutral-300">
                <th className="p-3.5 sm:p-4 font-bold text-neutral-200">Command</th>
                <th className="p-3.5 sm:p-4 font-bold text-neutral-200">Description</th>
                <th className="p-3.5 sm:p-4 font-bold text-neutral-200">Example</th>
                <th className="p-3.5 sm:p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80 text-neutral-300">
              {filteredCommands.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-neutral-500 font-mono">
                    No matching commands found.
                  </td>
                </tr>
              ) : (
                filteredCommands.map((cmd, idx) => (
                  <tr key={idx} className="hover:bg-neutral-900/40 transition-colors">
                    <td className="p-3.5 sm:p-4 font-bold text-white whitespace-nowrap">
                      <span className="text-white">{cmd.name}</span>
                      {cmd.alias && (
                        <span className="text-[10px] text-neutral-400 block font-normal mt-0.5">
                          alias: {cmd.alias}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 sm:p-4 font-sans text-xs text-neutral-300 max-w-xs">
                      {cmd.description}
                    </td>
                    <td className="p-3.5 sm:p-4 font-mono text-xs text-neutral-200 whitespace-nowrap">
                      <code className="bg-neutral-900 px-2 py-1 border border-neutral-800">
                        {cmd.example}
                      </code>
                    </td>
                    <td className="p-3.5 sm:p-4 text-right whitespace-nowrap">
                      <button
                        id={`copy-cmd-${idx}`}
                        onClick={() => handleCopy(cmd.example)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs transition-colors cursor-pointer"
                        title="Copy command example"
                      >
                        {copiedCmd === cmd.example ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-neutral-400" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Command Flags Reference Strip */}
        <div className="mt-6 p-4 border border-neutral-800 bg-neutral-950 font-mono text-xs text-neutral-300 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="text-neutral-500 uppercase tracking-wider text-[11px] font-bold">
            Common Flags:
          </span>
          <div>
            <code className="text-white font-bold">--dry-run</code>{' '}
            <span className="text-neutral-400 text-[11px]">Preview candidate resolution without installing</span>
          </div>
          <div>
            <code className="text-white font-bold">-y, --yes</code>{' '}
            <span className="text-neutral-400 text-[11px]">Bypass interactive root prompt</span>
          </div>
          <div>
            <code className="text-white font-bold">--github</code>{' '}
            <span className="text-neutral-400 text-[11px]">Force upstream GitHub releases search</span>
          </div>
        </div>
      </div>
    </section>
  );
};
