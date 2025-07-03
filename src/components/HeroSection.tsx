"use client"

import type React from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"

const HeroSection: React.FC = () => {
  const { t } = useTranslation()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {t("hero.greeting")}
                <br />
                {t("hero.title")}
                <br />
                <span className="text-primary">{t("hero.name")}</span>
                {t("hero.subtitle")}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">{t("hero.description")}</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" onClick={() => scrollToSection("projects")}>
                {t("hero.viewProjects")}
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:contact@example.com">{t("hero.contact")}</a>
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{t("hero.location")}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{t("hero.experience")}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=400"
                width={400}
                height={400}
                alt="Profile"
                className="aspect-square overflow-hidden rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
