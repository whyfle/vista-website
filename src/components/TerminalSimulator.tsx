import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw, Sparkles } from 'lucide-react';

interface HistoryEntry {
  command: string;
  output: string[];
}

const PRESET_COMMANDS = [
  {
    cmd: 'vista sys-info',
    desc: 'Introspect host Linux distribution & native packaging manager',
  },
  {
    cmd: 'vista search fastfetch',
    desc: 'Search GitHub repositories and Flathub simultaneously',
  },
  {
    cmd: 'vista install fastfetch',
    desc: 'Resolve and install native RPM package via DNF5',
  },
  {
    cmd: 'vista install sharkdp/bat',
    desc: 'Upstream archive resolution with safety checks',
  },
  {
    cmd: 'vista install discord',
    desc: 'Search GitHub & Flathub with desktop fallback',
  },
  {
    cmd: 'vista list',
    desc: 'List packages managed or resolved by Vista',
  },
];

const MOCK_OUTPUTS: Record<string, string[]> = {
  'vista sys-info': [
    '  \x1b[1mSystem Information\x1b[0m',
    '  ────────────────────────────────────────',
    '    ID: fedora',
    '    Name: Fedora Linux 44 (KDE Plasma Desktop Edition)',
    '    Version: 44 (44 (KDE Plasma Desktop Edition))',
    '    Architecture: x86_64',
    '    Family: rpm',
    '    Native format: \x1b[32mrpm\x1b[0m',
    '    Like: -',
    '',
    '  Available package managers:',
    '    \x1b[32m✓\x1b[0m dnf',
    '    \x1b[32m✓\x1b[0m flatpak',
  ],
  'vista search fastfetch': [
    "vista search 'fastfetch' — fedora x86_64 (rpm)",
    'github:',
    '1. \x1b[1mfastfetch-cli/fastfetch\x1b[0m \x1b[33m★24548\x1b[0m — A maintained, feature-rich and performance oriented, neofetch like system information too…',
    '2. sameemul-haque/dotfiles \x1b[33m★899\x1b[0m — ✨ Hyprland + Waybar with Catppuccin theme • Arch Linux',
    '3. vyrx-dev/symphony \x1b[33m★507\x1b[0m — a setup I wish already existed',
    '4. LierB/fastfetch \x1b[33m★429\x1b[0m — Fastfetch config presets',
    '5. ad1822/hyprdots \x1b[33m★424\x1b[0m — 🫟 Awesome Hyprland Dotfiles',
    'flathub:',
    '1. \x1b[34mCPU Info (com.kgurgul.cpuinfo)\x1b[0m — Information about device hardware and software',
    '2. \x1b[34mEmbellish (io.github.getnf.embellish)\x1b[0m — Install nerd fonts',
    '3. \x1b[34mLinux Theme Store (io.github.debasish_patra_1987.linuxthemestore)\x1b[0m — Browse, preview, and install desktop themes',
    '4. \x1b[34mNixwriter (com.gitlab.adnan338.Nixwriter)\x1b[0m — Create bootable Linux images',
    '5. \x1b[34mSystem Monitoring Center (io.github.hakandundar34coding.system-monitoring-center)\x1b[0m — Multi-featured system monitor',
    'install: \x1b[36mvista install user@repo\x1b[0m  (native: rpm)',
  ],
  'vista install fastfetch': [
    '  \x1b[1mVista Package Manager\x1b[0m',
    '',
    '  Detecting system...',
    '  \x1b[32m✓\x1b[0m Fedora Linux 44 (KDE Plasma Desktop Edition) 44',
    '  \x1b[32m✓\x1b[0m x86_64',
    '  Family: rpm  Native: \x1b[32mrpm\x1b[0m',
    '',
    '  Searching GitHub...',
    '  Searching GitHub for \'fastfetch\'...',
    '  Found 5 repositories, checking releases...',
    '  Checking fastfetch-cli/fastfetch ...',
    '  \x1b[32m✓\x1b[0m Found release 2.68.1',
    '',
    '  Analyzing packages...',
    '  \x1b[32m✓ fastfetch-linux-amd64.rpm\x1b[0m',
    '',
    '  Selected:',
    '    Source: GitHub',
    '    Repository: fastfetch-cli/fastfetch',
    '    Package: fastfetch-linux-amd64.rpm',
    '    Format: \x1b[32mrpm\x1b[0m',
    '    Architecture: x86_64',
    '    Version: 2.68.1',
    '    URL: https://github.com/fastfetch-cli/fastfetch/releases/download/2.68.1/fastfetch-linux-amd64.rpm',
    '    Release: https://github.com/fastfetch-cli/fastfetch/releases/tag/2.68.1',
    '',
    '  Available package managers: dnf, flatpak',
    '',
    '  Vista found:',
    '',
    '    \x1b[1mfastfetch-linux-amd64.rpm 2.68.1\x1b[0m',
    '    Source: GitHub',
    '    Package: fastfetch-linux-amd64.rpm',
    '    Architecture: x86_64',
    '    Distribution: fedora (rpm)',
    '',
    '  Install this package? [Y/n] y',
    '  Downloading...',
    '  \x1b[32m✓\x1b[0m Downloaded 1616563 bytes to "~/.cache/vista/downloads/fastfetch-linux-amd64.rpm"',
    '  \x1b[33m⚠ No checksum provided — skipping verification (use --verify or ensure upstream provides checksums)\x1b[0m',
    '  SHA256: f815c47eb74f5f20cbbb3c479ecea4c0cea4ff8484740db4520cc0b88f995a00',
    '  Verifying package arch/format...',
    '',
    '  Installing with elevated rights...',
    '  Running: sudo dnf5 install ~/.cache/vista/downloads/fastfetch-linux-amd64.rpm',
    '  \x1b[32m✓ Successfully installed fastfetch-linux-amd64.rpm\x1b[0m',
  ],
  'vista install sharkdp/bat': [
    '  \x1b[1mVista Package Manager\x1b[0m',
    '',
    '  Detecting system...',
    '  \x1b[32m✓\x1b[0m Fedora Linux 44 (KDE Plasma Desktop Edition) 44',
    '  \x1b[32m✓\x1b[0m x86_64',
    '  Family: rpm  Native: \x1b[32mrpm\x1b[0m',
    '',
    '  Searching GitHub...',
    '  \x1b[32m✓\x1b[0m Found release v0.26.1',
    '',
    '  Analyzing packages...',
    '  \x1b[32m✓\x1b[0m bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz',
    '',
    '  Selected:',
    '    Source: GitHub',
    '    Repository: sharkdp/bat',
    '    Package: bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz',
    '    Format: tar.gz',
    '    Architecture: x86_64',
    '    Version: 0.26.1-x86_64-unknown-linux-musl.tar.gz',
    '    URL: https://github.com/sharkdp/bat/releases/download/v0.26.1/bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz',
    '    Release: https://github.com/sharkdp/bat/releases/tag/v0.26.1',
    '',
    '  \x1b[33m⚠ Package format \'tar.gz\' may require manual installation or script execution. Vista will not run arbitrary install scripts automatically.\x1b[0m',
    '',
    '  Available package managers: dnf, flatpak',
    '',
    '  Vista found:',
    '',
    '    bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz v0.26.1',
    '    Source: GitHub',
    '    Package: bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz',
    '    Architecture: x86_64',
    '    Distribution: fedora (rpm)',
    '',
    '  Install this package? [Y/n] y',
    '  Downloading...',
    '  \x1b[32m✓\x1b[0m Downloaded 3584928 bytes to "~/.cache/vista/downloads/bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz"',
    '  \x1b[33m⚠ No checksum provided — skipping verification (use --verify or ensure upstream provides checksums)\x1b[0m',
    '  SHA256: 0dcd8ac79732c0d5b136f11f4ee00e581440e16a44eab5b3105b611bbf2cf191',
    '  Verifying package arch/format...',
    '',
    '  Installing...',
    '',
    '  \x1b[31m✗ Unsupported package format tar.gz for direct install via native manager. Downloaded to "~/.cache/vista/downloads/bat-v0.26.1-x86_64-unknown-linux-musl.tar.gz". Please install manually.\x1b[0m',
  ],
  'vista install discord': [
    '  \x1b[1mVista Package Manager\x1b[0m',
    '',
    '  Detecting system...',
    '  \x1b[32m✓\x1b[0m Fedora Linux 44 (KDE Plasma Desktop Edition) 44',
    '  \x1b[32m✓\x1b[0m x86_64',
    '  Family: rpm  Native: \x1b[32mrpm\x1b[0m',
    '',
    '  Searching GitHub...',
    '  Searching GitHub for \'discord\'...',
    '  Found 5 repositories, checking releases...',
    '  Checking unclecode/crawl4ai ... no compatible assets',
    '  Checking Flowseal/zapret-discord-youtube ...',
    '  \x1b[32m✓\x1b[0m Found release 1.10.2',
    '',
    '  Analyzing packages...',
    '  \x1b[32m✓ zapret-discord-youtube-1.10.2.tar.gz\x1b[0m',
    '',
    '  Selected:',
    '    Source: GitHub',
    '    Repository: Flowseal/zapret-discord-youtube',
    '    Package: zapret-discord-youtube-1.10.2.tar.gz',
    '    Format: tar.gz',
    '    Architecture: unknown',
    '    Version: 1.10.2.tar.gz',
    '',
    '  \x1b[33m⚠ Package format \'tar.gz\' may require manual installation or script execution.\x1b[0m',
    '  \x1b[33m⚠ Architecture not detected in filename — please verify compatibility.\x1b[0m',
    '',
    '  Available package managers: dnf, flatpak',
    '  (Tip: Official Discord client is available on Flathub: \x1b[36mflatpak install flathub com.discordapp.Discord\x1b[0m)',
  ],
  'vista list': [
    'Listing packages managed via Vista:',
    'NAME                     VERSION    SOURCE               TYPE     STATUS',
    '-------------------------------------------------------------------------',
    'fastfetch                2.68.1     fastfetch-cli/repo   RPM       \x1b[32mActive\x1b[0m',
    'discord                  0.0.60     flathub/discord      Flatpak   \x1b[32mActive\x1b[0m',
    'bat                      0.26.1     sharkdp/bat          Binary    \x1b[32mActive\x1b[0m',
    '-------------------------------------------------------------------------',
    'Total: 3 packages tracked.',
  ],
  'vista clean': [
    '==> Purging expired download artifacts in ~/.cache/vista...',
    '    Removed 2 temporary RPM cache payloads (38.4 MB freed).',
    '    Flathub metadata cache refreshed.',
    '  \x1b[32m✓ Cache clean completed in 8ms.\x1b[0m',
  ],
  'vista --help': [
    'Vista — A GitHub-backed universal Linux package manager',
    '',
    'USAGE:',
    '    vista <COMMAND> [OPTIONS]',
    '',
    'COMMANDS:',
    '    install, add    Install a package (native priority -> Flathub fallback)',
    '    remove          Remove an installed package via host package manager',
    '    update          Refresh repository metadata and check for asset updates',
    '    upgrade         Upgrade installed packages to their latest releases',
    '    search          Search across GitHub Releases and Flathub registry',
    '    info            Display package provenance and candidate assets',
    '    list            List packages managed or installed by Vista',
    '    clean           Prune obsolete cached binaries and manifests',
    '    sys-info        Print host distribution, architecture, and packaging tool',
    '',
    'FLAGS:',
    '    -y, --yes               Auto-confirm prompts',
    '    -d, --dry-run           Inspect candidate packages without touching host',
    '    --default <SOURCE>      Choose what provider/source you want to use for install',
    '    --github <USER@REPO>    Override upstream repository source',
    '    -h, --help              Print help information',
  ],
};

export const TerminalSimulator: React.FC = () => {
  const [inputVal, setInputVal] = useState('vista sys-info');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'vista sys-info',
      output: MOCK_OUTPUTS['vista sys-info'],
    },
  ]);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const handleRun = (cmdToRun: string) => {
    const cleanCmd = cmdToRun.trim();
    if (!cleanCmd) return;

    if (cleanCmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let output = MOCK_OUTPUTS[cleanCmd];
    if (!output) {
      if (cleanCmd.startsWith('vista install')) {
        output = [
          `  \x1b[1mVista Package Manager\x1b[0m`,
          '',
          `  Searching GitHub for "${cleanCmd.replace('vista install ', '')}"...`,
          '  Found matching release candidate.',
          '  Checking architecture and format compatibility...',
          '  \x1b[32m✓ Validated candidate package.\x1b[0m',
          '  Use "vista info <pkg>" or test presets above for full trace.',
        ];
      } else if (cleanCmd.startsWith('vista search')) {
        output = [
          `vista search '${cleanCmd.replace('vista search ', '')}' — fedora x86_64 (rpm)`,
          'Searching GitHub Releases and Flathub...',
          'Found matching results. Run "vista install user@repo" to install.',
        ];
      } else {
        output = [
          `vista: command '${cleanCmd}' not recognized. Try 'vista --help' or one of the presets.`,
        ];
      }
    }

    setHistory((prev) => [...prev, { command: cleanCmd, output }]);
    setInputVal('');
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const renderFormattedLine = (line: string, lineIdx: number) => {
    const parts = line.split(/(\x1b\[\d+m|\x1b\[1m)/g);
    let currentColor = 'text-neutral-300';
    let isBold = false;

    return (
      <div key={lineIdx} className="font-mono text-xs leading-5">
        {parts.map((part, pIdx) => {
          if (part === '\x1b[32m') {
            currentColor = 'text-emerald-400';
            return null;
          } else if (part === '\x1b[36m') {
            currentColor = 'text-neutral-200';
            return null;
          } else if (part === '\x1b[34m') {
            currentColor = 'text-neutral-400';
            return null;
          } else if (part === '\x1b[31m') {
            currentColor = 'text-rose-400';
            return null;
          } else if (part === '\x1b[33m') {
            currentColor = 'text-amber-300';
            return null;
          } else if (part === '\x1b[1m') {
            isBold = true;
            return null;
          } else if (part === '\x1b[0m') {
            currentColor = 'text-neutral-300';
            isBold = false;
            return null;
          }
          return (
            <span key={pIdx} className={`${currentColor} ${isBold ? 'font-bold text-white' : ''}`}>
              {part}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <section id="terminal-section" className="py-20 bg-[#090b10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-200 mb-2">
              <TerminalIcon className="w-3.5 h-3.5 text-white" />
              <span>Interactive CLI Simulator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono">
              Test Vista in the Browser
            </h2>
            <p className="mt-2 text-neutral-400 text-sm max-w-2xl font-sans">
              Experience Vista's output format, distribution introspection, and package resolution live.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setHistory([
                  { command: 'vista sys-info', output: MOCK_OUTPUTS['vista sys-info'] },
                ]);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Terminal</span>
            </button>
          </div>
        </div>

        {/* Preset commands bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-thin">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-neutral-400" /> Presets:
          </span>
          {PRESET_COMMANDS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleRun(preset.cmd)}
              className="shrink-0 px-3 py-1 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-600 text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3 h-3 text-neutral-400 opacity-80" />
              <span>{preset.cmd}</span>
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div className="border border-neutral-800 bg-[#05070c] shadow-2xl overflow-hidden font-mono">
          {/* Title Bar */}
          <div className="px-4 py-3 bg-[#0c0e17] border-b border-neutral-800 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-neutral-700 inline-block" />
              <span className="w-3 h-3 rounded-full bg-neutral-600 inline-block" />
              <span className="w-3 h-3 rounded-full bg-neutral-500 inline-block" />
              <span className="ml-2 text-xs font-medium text-neutral-400">user@fedora: ~ (vista)</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-500">
              <span className="hidden sm:inline">bash 5.2</span>
              <span>x86_64</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 sm:p-6 min-h-[340px] max-h-[500px] overflow-y-auto space-y-4">
            {history.map((entry, eIdx) => (
              <div key={eIdx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-white font-bold">user@fedora:~$</span>
                  <span className="text-white font-bold">{entry.command}</span>
                </div>
                <div className="pl-3 border-l border-neutral-800/80 space-y-0.5">
                  {entry.output.map((line, lIdx) => renderFormattedLine(line, lIdx))}
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Input Prompt */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRun(inputVal);
            }}
            className="px-4 py-3 bg-[#0a0d14] border-t border-neutral-800 flex items-center gap-2"
          >
            <span className="text-white text-xs font-bold shrink-0">user@fedora:~$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type a command (e.g. 'vista search fastfetch', 'vista --help', 'clear')..."
              className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-neutral-600"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono font-medium border border-neutral-600 shrink-0 transition-colors cursor-pointer"
            >
              Run
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
