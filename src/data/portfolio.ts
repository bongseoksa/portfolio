import type { Experience, Project } from "../types/portfolio"

export const skills: string[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "HTML5",
  "CSS3",
  "Tailwind CSS",
  "Sass",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Git",
  "Docker",
  "AWS",
  "Figma",
]

export const experiences: Experience[] = [
  {
    company: "테크 스타트업",
    position: "시니어 프론트엔드 개발자",
    period: "2022.03 - 현재",
    location: "서울, 대한민국",
    description: "React와 TypeScript를 활용한 웹 애플리케이션 개발 및 팀 리딩",
    achievements: [
      "사용자 경험 개선으로 전환율 25% 향상",
      "컴포넌트 라이브러리 구축으로 개발 효율성 40% 증대",
      "주니어 개발자 3명 멘토링",
    ],
  },
  {
    company: "디지털 에이전시",
    position: "프론트엔드 개발자",
    period: "2020.06 - 2022.02",
    location: "서울, 대한민국",
    description: "다양한 클라이언트 프로젝트의 프론트엔드 개발 담당",
    achievements: [
      "10개 이상의 웹사이트 및 웹앱 개발 완료",
      "반응형 디자인 구현으로 모바일 사용성 개선",
      "성능 최적화로 로딩 속도 50% 단축",
    ],
  },
  {
    company: "IT 솔루션 회사",
    position: "주니어 프론트엔드 개발자",
    period: "2019.03 - 2020.05",
    location: "서울, 대한민국",
    description: "웹 애플리케이션 UI/UX 개발 및 유지보수",
    achievements: [
      "레거시 코드 리팩토링으로 유지보수성 향상",
      "크로스 브라우저 호환성 확보",
      "사내 개발 가이드라인 문서화",
    ],
  },
]

export const projects: Project[] = [
  {
    title: "E-커머스 플랫폼",
    description: "React와 Next.js를 활용한 현대적인 온라인 쇼핑몰 플랫폼",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
    image: "/placeholder.svg?height=200&width=300",
    github: "#",
    demo: "#",
  },
  {
    title: "태스크 관리 앱",
    description: "팀 협업을 위한 실시간 태스크 관리 및 프로젝트 추적 도구",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
    image: "/placeholder.svg?height=200&width=300",
    github: "#",
    demo: "#",
  },
  {
    title: "날씨 대시보드",
    description: "OpenWeather API를 활용한 반응형 날씨 정보 대시보드",
    tech: ["Vue.js", "Chart.js", "CSS3", "REST API"],
    image: "/placeholder.svg?height=200&width=300",
    github: "#",
    demo: "#",
  },
  {
    title: "포트폴리오 웹사이트",
    description: "개인 브랜딩을 위한 반응형 포트폴리오 웹사이트",
    tech: ["React", "TypeScript", "Tailwind CSS", "i18next"],
    image: "/placeholder.svg?height=200&width=300",
    github: "#",
    demo: "#",
  },
]
