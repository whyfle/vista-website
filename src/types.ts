export type LinuxDistroId = 'fedora' | 'ubuntu' | 'arch' | 'debian' | 'opensuse';

export type PageTab = 'home' | 'quickstart' | 'docs';

export interface DistroInfo {
  id: LinuxDistroId;
  name: string;
  family: string;
  nativeFormat: 'RPM' | 'DEB' | 'Pacman';
  defaultPackageTool: 'dnf' | 'apt' | 'pacman' | 'zypper';
  logoColor: string;
  version: string;
}

export interface EvaluationTag {
  label: string;
  reason: string;
  isPositive: boolean;
}

export interface CandidateAsset {
  filename: string;
  format: 'rpm' | 'deb' | 'tar.gz' | 'flatpak' | 'appimage' | 'checksum';
  arch: 'x86_64' | 'aarch64' | 'all' | 'unknown';
  source: 'github' | 'flathub' | 'native-repo';
  isStable: boolean;
  isCompatible: boolean;
  statusLabel: string;
  tags: EvaluationTag[];
  selected?: boolean;
}

export interface PackageDemoScenario {
  id: string;
  name: string;
  query: string;
  description: string;
  githubRepo?: string;
  hasFlathub: boolean;
  flathubAppId?: string;
  assets: {
    filename: string;
    format: 'rpm' | 'deb' | 'tar.gz' | 'flatpak' | 'appimage' | 'checksum';
    arch: 'x86_64' | 'aarch64' | 'all' | 'unknown';
    source: 'github' | 'flathub' | 'native-repo';
    isStable: boolean;
  }[];
}

export interface CliCommandDef {
  command: string;
  alias?: string;
  summary: string;
  usage: string;
  flags: { flag: string; desc: string }[];
  example: string;
  simulatedOutput: string[];
}
