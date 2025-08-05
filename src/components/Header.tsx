'use client';

import type React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Globe, BarChart3 } from 'lucide-react';
import SimpleIcon from './SimpleIcon';
import { siGithub } from 'simple-icons';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const pendingScrollRef = useRef<string | null>(null);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
  };

  // 홈페이지로 이동했을 때 스크롤 처리
  useEffect(() => {
    if (location.pathname === '/' && pendingScrollRef.current) {
      const sectionId = pendingScrollRef.current;
      pendingScrollRef.current = null;

      // DOM이 완전히 렌더링된 후 스크롤 실행
      requestAnimationFrame(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // 홈페이지가 아니면 이동 후 스크롤할 섹션 저장
      pendingScrollRef.current = sectionId;
      navigate('/');
    } else {
      // 이미 홈페이지에 있으면 바로 스크롤
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handlePerformanceClick = () => {
    navigate('/dashboard');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <button
            onClick={() => {
              if (location.pathname !== '/') {
                pendingScrollRef.current = 'about';
                navigate('/');
              } else {
                scrollToSection('about');
              }
            }}
            className="mr-6 flex items-center space-x-2 bg-transparent border-none cursor-pointer"
          >
            <span className="font-bold text-xl">{t('about.about')}</span>
          </button>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <button
            onClick={() => scrollToSection('about')}
            className="transition-colors hover:text-foreground/80 bg-transparent border-none cursor-pointer"
          >
            {t('nav.about')}
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="transition-colors hover:text-foreground/80 bg-transparent border-none cursor-pointer"
          >
            {t('nav.skills')}
          </button>
          <button
            onClick={() => scrollToSection('career')}
            className="transition-colors hover:text-foreground/80 bg-transparent border-none cursor-pointer"
          >
            {t('nav.career')}
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="transition-colors hover:text-foreground/80 bg-transparent border-none cursor-pointer"
          >
            {t('nav.projects')}
          </button>
        </nav>
        <div className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={handlePerformanceClick}>
            <BarChart3 className="h-4 w-4 mr-1" />
            {t('nav.performance')}
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleLanguage}>
            <Globe className="h-4 w-4 mr-1" />
            {i18n.language === 'ko' ? 'EN' : '한국어'}
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="mailto:qhdtjr1004@naver.com">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="https://github.com/bongseoksa" target="_blank" rel="noopener noreferrer">
              <SimpleIcon svgData={siGithub.svg} />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
