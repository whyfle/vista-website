/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { QuickStartPage } from './components/QuickStartPage';
import { DocsPage } from './components/DocsPage';
import { Footer } from './components/Footer';
import { PageTab } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageTab>('home');
  const [docSection, setDocSection] = useState<string>('overview');

  // Synchronize with URL Hash for seamless back/forward navigation and deep links
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (hash.startsWith('quickstart')) {
        setCurrentPage('quickstart');
      } else if (hash.startsWith('docs')) {
        setCurrentPage('docs');
        const parts = hash.split('/');
        if (parts[1]) {
          setDocSection(parts[1]);
        }
      } else {
        setCurrentPage('home');
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleNavigate = (page: PageTab, subSection?: string) => {
    setCurrentPage(page);
    if (page === 'home') {
      window.location.hash = '';
    } else if (page === 'quickstart') {
      window.location.hash = '/quickstart';
    } else if (page === 'docs') {
      if (subSection) {
        setDocSection(subSection);
        window.location.hash = `/docs/${subSection}`;
      } else {
        window.location.hash = '/docs';
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#e2e8f0] flex flex-col selection:bg-neutral-800 selection:text-white font-sans">
      {/* High-density sticky top navbar */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main View Area: Uncluttered Home, Dedicated Quick Start, or Comprehensive Docs */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'quickstart' && <QuickStartPage onNavigate={handleNavigate} />}
        {currentPage === 'docs' && (
          <DocsPage onNavigate={handleNavigate} initialSection={docSection} />
        )}
      </main>

      {/* High-density clean footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
