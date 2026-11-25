import type { Experience, Project } from '../types/portfolio';

export const skills: {
  frontend: string[];
  stateManagement: string[];
  styling: string[];
  api: string[];
  tools: string[];
} = {
  frontend: ['React', 'Next.js', 'Vue.js (V2)', 'TypeScript', 'JavaScript'],
  stateManagement: ['Jotai', 'Recoil', 'Zustand', 'vuex'],
  styling: ['tailwind CSS', 'Panda CSS', 'styled-components'],
  api: ['Axios', 'TanStack Query', 'Supabase', 'WebRTC', 'Firebase(FCM)'],
  tools: [
    'Figma',
    'Zeplin',
    'git',
    'Bitbucket',
    'FileZilla',
    'Jira',
    'Slack',
    'Confluence',
    'Turborepo',
    'pnpm',
    'Storybook',
    'Playwright',
    'Cloudflare Workers',
    'Sentry',
    'Vercel',
    'Biome'
  ]
};

export const experiences: Experience[] = [
  {
    company: '노머스',
    position: '프론트엔드 개발자',
    period: '2025.09 - 현재',
    location: '서울, 대한민국',
    description:
      '아티스트 IP 기반 팬 플랫폼 프롬(fromm)의 웹 프론트엔드를 맡아 스토어, 팬채널, 파트너센터, 백오피스를 개발하고 운영했습니다.\n디자인시스템, 호스팅 전환, 에러 관측, CI/CD 등 팀 전체가 공유하는 기반을 수립했고, 2026년 1월 팀장 발령 이후로는 평가 체계와 코드리뷰 기준을 설계해 프론트엔드 팀을 운영하고 있습니다.',
    achievements: [
      {
        text: '2026년 1월부터 프론트엔드 팀장으로 팀원 4명 운영 — 직무 평가 항목과 점수 루브릭 설계, 분기 1on1 운영 방식과 회고 체계 수립, 팀 공통 코드 품질 기준을 정착시키기 위한 타인 PR 리뷰 470건 수행',
        links: {}
      },
      {
        text: '코드리뷰 SLA를 팀에 접목하는 방법을 설계해 리뷰 요청 응답률을 팀 평균 59%에서 73%로 개선하고 SLA 90% 미달 인원을 2명에서 0명으로 해소 — 공식 리뷰 시간 지정과 반복 가이드, 지표 해석 기준 수립',
        links: {}
      },
      {
        text: '사내 디자인시스템을 독립 npm 패키지로 구축 — 컴포넌트 22종, 아이콘 348개 배포 및 공개 스토리북 운영',
        links: {
          스토리북: 'https://fds.frommyarti.com'
        }
      },
      {
        text: '유지비용 절감을 목적으로 한 Vercel → Cloudflare Workers 호스팅 전환을 PoC부터 운영 전환까지 주도',
        links: {}
      },
      {
        text: '요구사항이 정해지지 않은 상태에서 기능 스펙과 데이터 구조를 직접 정의해, 소속사 홈페이지와 운영 어드민을 Supabase 기반으로 백엔드 투입 없이 단독 구축',
        links: {}
      },
      {
        text: '성능, 캐싱 이슈 21건을 코드 단위로 전수 검증한 뒤 App Router 스토어의 ISR 캐싱 복구와 API 통신 계층 교체를 직접 구현',
        links: {}
      },
      {
        text: '에러 관측 체계 도입 — 운영 에러 212건을 전수 분류해 스토어 월 5,700건을 532건으로 축소',
        links: {}
      },
      {
        text: '테스트 코드가 아닌 서비스 구현 작업용으로 MSW 모킹 패키지를 설계해 5개 앱에 적용 — 목 핸들러가 시드 317줄에서 2개 레포 약 8,700줄로 늘며 팀 작업 방식으로 정착',
        links: {}
      },
      {
        text: 'UX팀, PM팀과 합의한 번역 운영 4단계 프로세스를 사내 공용 Claude Code 플러그인으로 제품화 — 마켓플레이스 배포 후 4개 레포에 실적용',
        links: {}
      },
      {
        text: '개발 생산성 표준화 — Swagger 기반 API 타입 자동 생성, 모노레포 공통 패키지화, GitHub Actions CI/CD 이관',
        links: {}
      }
    ]
  },
  {
    company: '비트맥스',
    position: '프론트엔드 개발자',
    period: '2021.06 - 2025.02',
    location: '서울, 대한민국',
    description:
      '산업용 CMS 솔루션을 중심으로 스마트팩토리와 디지털트윈 환경에 최적화된 웹 어플리케이션을 개발하고, Next.js, Vue.js 등 최신 프레임워크 기반의 아키텍처 설계를 주도했습니다.',
    achievements: [
      {
        text: '프론트엔드 파트 내 개발 협업 및 코드 리뷰 리딩',
        links: {}
      },
      {
        text: 'Vue.js 2에서 Next.js로의 프레임워크 마이그레이션 주도',
        links: {}
      },
      {
        text: 'B2B 산업용 CMS 솔루션 프론트엔드 개발 및 유지보수',
        links: {}
      },
      {
        text: '스마트팩토리 연계 기능 개발 및 백오피스 시스템 운영 지원',
        links: {}
      },
      {
        text: '파견 및 외주 프로젝트에 참여하며 다양한 산업 도메인 대응',
        links: {}
      }
    ]
  },
  {
    company: '제이하이소프트',
    position: '웹기반 게임 개발자',
    period: '2020.03 - 2021.05',
    location: '서울, 대한민국',
    description:
      '웹 기반 보드게임 및 슬롯형 게임 콘텐츠의 클라이언트 애플리케이션을 cocos2d-js와 JavaScript 기반으로 개발했습니다.\n퍼블리싱 플랫폼 연동과 게임 내 로직 구현을 중심으로 멀티 플랫폼 대응 작업을 수행했습니다.',
    achievements: [
      {
        text: '멀티 플랫폼 웹게임 어플리케이션 개발 및 유지보수',
        links: {}
      },
      {
        text: '신규 홀덤 게임 클라이언트 파트 개발 및 운영 지원',
        links: {}
      },
      {
        text: '자체 게임 플랫폼(타짱) 웹 서비스 연동',
        links: {}
      },
      {
        text: '슬롯 당첨 확률 계산 로직 구현',
        links: {}
      }
    ]
  },
  {
    company: '잼토즈',
    position: '웹기반 게임 개발자',
    period: '2018.10 - 2019.09',
    location: '서울, 대한민국',
    description:
      '웹 기반 보드게임 및 슬롯형 게임 콘텐츠의 클라이언트 애플리케이션을 cocos2d-js와 JavaScript 기반으로 개발했습니다.',
    achievements: [
      {
        text: '웹게임 어플리케이션 개발 및 유지보수',
        links: {}
      }
    ]
  },
  {
    company: '휴먼웍스',
    position: '웹기반 캐주얼게임 개발자',
    period: '2016.10 - 2018.10',
    location: '서울, 대한민국',
    description:
      '웹 기반 캐주얼 게임 콘텐츠의 클라이언트를 Pixi.js와 JavaScript 기반으로 개발했습니다.\n다양한 소셜 플랫폼에 대응하며 크로스 브라우징 및 서비스 런칭까지 전반적인 클라이언트 개발을 담당했습니다.',
    achievements: [
      {
        text: '웹 캐주얼 게임 클라이언트 애플리케이션 개발',
        links: {}
      },
      {
        text: '크로스 브라우징 대응 게임 콘텐츠 구현',
        links: {}
      },
      {
        text: '소셜 플랫폼 게임 런칭 지원 (네이버 5분게임, 페이스북 미니게임)',
        links: {}
      },
      {
        text: '자사 서비스 플랫폼(게임엔) 내 게임 콘텐츠 배포 (게임1, 게임2, 게임3)',
        links: {
          게임1: 'https://www.gamen.com/game120',
          게임2: 'https://www.gamen.com/game19',
          게임3: 'https://www.gamen.com/game85'
        }
      }
    ]
  }
];

export const projects: Project[] = [
  {
    title: '프롬 (fromm)',
    description:
      '아티스트 IP 기반 팬 플랫폼. 스토어, 팬채널, 파트너센터, 백오피스 웹 서비스 개발 및 운영. iOS, Android 앱 웹뷰로도 서비스',
    tech: [
      'Next.js',
      'React',
      'TypeScript',
      'Panda CSS',
      'Jotai',
      'TanStack Query',
      'Turborepo',
      'Cloudflare Workers'
    ],
    image: '/fromm.jpg?height=200&width=300',
    github: '',
    detail:
      'https://lush-sturgeon-c94.notion.site/fromm-3bf141f8c327805aaf43e5b1b2dd22ae?source=copy_link'
  },
  {
    title: 'fromm Design System',
    description:
      '피그마에만 있던 디자인 정의를 코드화한 사내 디자인시스템 npm 패키지. 컴포넌트 22종, 아이콘 348개',
    tech: ['React', 'TypeScript', 'Vite', 'Panda CSS', 'Storybook', 'GitHub Actions'],
    image: '/fds-storybook.svg?height=200&width=300',
    github: '',
    detail:
      'https://lush-sturgeon-c94.notion.site/fromm-Design-System-422141f8c32780679896c23f519269cd?source=copy_link'
  },
  {
    title: 'ui-translator',
    description:
      '단순 번역을 UX 라이팅 로컬라이징으로 바꾼 사내 공용 Claude Code 플러그인. 팀원 누구나 같은 화법으로 작업하도록 로케일 결손 탐지와 호출부 맥락 기반 번역, 번역시트 복제를 커맨드로 제공',
    tech: ['Claude Code Plugin', 'Node.js', 'Google Sheets API', 'i18n'],
    image: '/ui-translator.jpg?height=200&width=300',
    github: '',
    detail:
      'https://lush-sturgeon-c94.notion.site/ui-translator-422141f8c327806392d4eca4245575f2?source=copy_link'
  },
  {
    title: '와이더스',
    description: 'Next.js와 Babylon.js를 활용한 현실공간 기반 디지털트윈 공간맵 저작/공유 서비스',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'styled-components', 'Babylon.js'],
    image: '/widearth.png?height=200&width=300',
    github: '',
    detail:
      'https://lush-sturgeon-c94.notion.site/Widearth-1d2141f8c327807cbe97da5ebd218c02?source=copy_link'
  },
  {
    title: '맥스워크 어플라이언스 (미상용)',
    description: '디지털트윈과 IoT를 통한 실시간 공간 관리 서비스',
    tech: ['Next.js', 'TypeScript', 'styled-components', 'RabbitMQ'],
    image: '/appliance.png?height=200&width=300',
    github: '',
    detail:
      'https://lush-sturgeon-c94.notion.site/Maxwork-Appliance-1d2141f8c32780e2b6a7cb31ef062003?source=copy_link'
  },
  {
    title: '맥스워크 / MSF',
    description: 'AR기반 산업용 스마트 팩토리, 원격지원 솔루션 서비스',
    tech: ['Vue.js', 'Next.js', 'WebRTC', 'Javascript', 'TypeScript', 'styled-components'],
    image: '/maxwork.png?height=200&width=300',
    github: '',
    detail:
      'https://lush-sturgeon-c94.notion.site/MSF-1d2141f8c32780288c22f55dae0f1eb6?source=copy_link'
  },
  {
    title: '파견 & 외주',
    description: 'AR기반 산업용 스마트 팩토리, 원격지원 솔루션(맥스워크) 엔터프라이즈 파견 및 외주',
    tech: ['Vue.js', 'Next.js', 'WebRTC', 'Javascript', 'TypeScript', 'styled-components'],
    image: '/placeholder.svg?height=200&width=300',
    github: '',
    detail:
      'https://lush-sturgeon-c94.notion.site/1d2141f8c32780e98ae8f70b7ebb77a2?source=copy_link'
  },
  {
    title: '포트폴리오',
    description: 'Open AI를 활용한 포트폴리오',
    tech: ['v0.dev', 'claude-4-sonnet', 'react', 'typescript', 'tailwindcss'],
    image: '/portfolio.gif?height=200&width=300',
    github: 'https://github.com/bongseoksa/portfolio.git',
    detail:
      'https://lush-sturgeon-c94.notion.site/241141f8c32780699207d6c9fa10f03d?source=copy_link'
  }
];
