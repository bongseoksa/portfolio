import type { Experience, Project } from '../types/portfolio';

export const skills: {
  frontend: string[];
  stateManagement: string[];
  styling: string[];
  api: string[];
  tools: string[];
} = {
  frontend: ['React', 'Next.js', 'Vue.js (V2)', 'TypeScript', 'JavaScript'],
  stateManagement: ['Recoil', 'Zustand', 'vuex'],
  styling: ['tailwind CSS', 'styled-components'],
  api: ['Axios', 'TanStack Query', 'WebRTC', 'Firebase(FCM)'],
  tools: ['Figma', 'Zeplin', 'git', 'Bitbucket', 'FileZilla', 'Jira', 'Slack', 'Confluence']
};

export const experiences: Experience[] = [
  {
    company: '비트맥스',
    position: '프론트엔드 개발자',
    period: '2021.06 - 2025.02',
    location: '서울, 대한민국',
    description:
      '산업용 CMS 솔루션을 중심으로 스마트팩토리와 디지털트윈 환경에 최적화된 웹 어플리케이션을 개발하고, Next.js, Vue.js 등 최신 프레임워크 기반의 아키텍처 설계를 주도했습니다.',
    achievements: [
      '프론트엔드 파트 내 개발 협업 및 코드 리뷰 리딩',
      'Vue.js 2에서 Next.js로의 프레임워크 마이그레이션 주도',
      'B2B 산업용 CMS 솔루션 프론트엔드 개발 및 유지보수',
      '스마트팩토리 연계 기능 개발 및 백오피스 시스템 운영 지원',
      '파견 및 외주 프로젝트에 참여하며 다양한 산업 도메인 대응'
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
      '멀티 플랫폼 웹게임 어플리케이션 개발 및 유지보수',
      '신규 홀덤 게임 클라이언트 파트 개발 및 운영 지원',
      '자체 게임 플랫폼(타짱) 웹 서비스 연동',
      '슬롯 당첨 확률 계산 로직 구현'
    ]
  },
  {
    company: '잼토즈',
    position: '웹기반 게임 개발자',
    period: '2018.10 - 2019.09',
    location: '서울, 대한민국',
    description:
      '웹 기반 보드게임 및 슬롯형 게임 콘텐츠의 클라이언트 애플리케이션을 cocos2d-js와 JavaScript 기반으로 개발했습니다.',
    achievements: ['웹게임 어플리케이션 개발 및 유지보수']
  },
  {
    company: '휴먼웍스',
    position: '웹기반 캐주얼게임 개발자',
    period: '2016.10 - 2018.10',
    location: '서울, 대한민국',
    description:
      '웹 기반 캐주얼 게임 콘텐츠의 클라이언트를 Pixi.js와 JavaScript 기반으로 개발했습니다.\n다양한 소셜 플랫폼에 대응하며 크로스 브라우징 및 서비스 런칭까지 전반적인 클라이언트 개발을 담당했습니다.',
    achievements: [
      '웹 캐주얼 게임 클라이언트 애플리케이션 개발',
      '크로스 브라우징 대응 게임 콘텐츠 구현',
      '소셜 플랫폼 게임 런칭 지원 (네이버 5분게임, 페이스북 미니게임)',
      '자사 서비스 플랫폼(게임엔) 내 게임 콘텐츠 배포 (게임1, 게임2, 게임3)'
    ]
  }
];

export const projects: Project[] = [
  {
    title: 'E-커머스 플랫폼',
    description: 'React와 Next.js를 활용한 현대적인 온라인 쇼핑몰 플랫폼',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    image: '/placeholder.svg?height=200&width=300',
    github: '#',
    demo: '#'
  },
  {
    title: '태스크 관리 앱',
    description: '팀 협업을 위한 실시간 태스크 관리 및 프로젝트 추적 도구',
    tech: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI'],
    image: '/placeholder.svg?height=200&width=300',
    github: '#',
    demo: '#'
  },
  {
    title: '날씨 대시보드',
    description: 'OpenWeather API를 활용한 반응형 날씨 정보 대시보드',
    tech: ['Vue.js', 'Chart.js', 'CSS3', 'REST API'],
    image: '/placeholder.svg?height=200&width=300',
    github: '#',
    demo: '#'
  },
  {
    title: '포트폴리오 웹사이트',
    description: '개인 브랜딩을 위한 반응형 포트폴리오 웹사이트',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'i18next'],
    image: '/placeholder.svg?height=200&width=300',
    github: '#',
    demo: '#'
  }
];
