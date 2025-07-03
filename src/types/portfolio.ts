import type React from "react"
export interface Experience {
  company: string
  position: string
  period: string
  location: string
  description: string
  achievements: string[]
}

export interface Project {
  title: string
  description: string
  tech: string[]
  image: string
  github: string
  demo: string
}

export interface SocialLink {
  name: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}
