'use client'

import type React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Globe } from 'lucide-react'

const Header: React.FC = () => {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko'
    i18n.changeLanguage(newLang)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <button
            onClick={() => scrollToSection('about')}
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
          <Button variant="ghost" size="sm" onClick={toggleLanguage}>
            <Globe className="h-4 w-4 mr-1" />
            {i18n.language === 'ko' ? 'EN' : '한국어'}
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="mailto:contact@example.com">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default Header
