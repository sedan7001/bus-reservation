# 버스 예약 서비스 🚌

React v18.0 기반의 버스 예약 서비스를 구현했습니다.

## 프로젝트 실행 방법 🧑🏻‍💻

### CLI

```sh
git clone https://github.com/sedan7001/bus-reservation
yarn install
yarn dev

# http://localhost:5173 에서 확인 가능합니다.
```

### Script

| 명령어           | 설명                                     |
| ---------------- | ---------------------------------------- |
| `yarn dev`       | 개발 서버를 실행해요.                    |
| `yarn build`     | 프로덕션 빌드를 생성해요.                |
| `yarn lint`      | ESLint를 활용하여 코드컨벤션을 확인해요. |
| `yarn typecheck` | TypeScript 타입 검사를 실행해요.         |
| `yarn test:e2e`  | Playwright E2E 테스트를 실행해요.        |

### E2E 테스트 상세

- **기본 실행**: `yarn test:e2e` 혹은 `npx playwright test`
- **UI 모드로 실행**: `npx playwright test --ui` (테스트 과정을 시각적으로 확인하며 디버깅할 수 있습니다.)

## 기술 스택 🛠️

- **Core**: React 18, TypeScript, Vite
- **상태관리**: Zustand, TanStack Query (React Query)
- **스타일링**: Emotion
- **라우팅**: React Router DOM
- **다국어**: react-i18next
- **유효성 검증**: Zod
- **패턴 매칭**: ts-pattern
- **오버레이**: overlay-kit
- **에러 처리**: react-error-boundary
- **날짜 처리**: date-fns

## 프로젝트 구조 📁

```
src/
├── api/                        # API 함수 및 URL 관리
│   ├── api-urls.ts             # API URL 상수
│   ├── query-keys.ts           # React Query 키 관리
│   ├── schemas.ts              # Zod 스키마 정의
│   ├── reservations.ts
│   ├── stations.ts
│   └── tickets.ts
├── hooks/                      # 커스텀 훅
│   ├── index.ts
│   ├── use-debounce.ts
│   ├── use-network-status.ts
│   └── use-ticket-formatter.ts
├── i18n/                       # 국제화 설정
│   ├── index.ts
│   └── locales/
│       ├── ko.json
│       └── en.json
├── lib/                        # 공통 라이브러리 (기본 UI 컴포넌트 및 유틸리티)
│   ├── border.tsx
│   ├── bottom-sheet.tsx
│   ├── button.tsx
│   ├── calendar.tsx
│   ├── colors.ts
│   ├── fixed-bottom-cta.tsx
│   ├── flex.tsx
│   ├── http.ts
│   ├── icon.tsx
│   ├── list-header.tsx
│   ├── list-row.tsx
│   ├── navigation-bar.tsx
│   ├── numeric-spinner.tsx
│   ├── spacing.tsx
│   ├── tab.tsx
│   ├── text-field.tsx
│   ├── text.tsx
│   ├── toast.tsx
│   ├── type-guards.ts
│   ├── type-utils.ts
│   ├── web-vitals.ts
│   └── index.ts
├── pages/                      # 페이지 컴포넌트
│   ├── routes.tsx              # 라우팅 설정
│   ├── start-page.tsx
│   ├── search-page.tsx
│   ├── station-page.tsx
│   ├── ticket-page.tsx
│   ├── confirm-page.tsx        # 좌석 선택 페이지
│   └── complete-page.tsx
├── store/                      # Zustand 스토어
│   └── reservation-store.ts
├── ui/                         # 재사용 UI 컴포넌트
│   ├── bus-type-badge.tsx      # 버스 등급 배지 (프리미엄/우등/일반)
│   ├── seat-selector.tsx       # 좌석 선택 UI
│   ├── count-bottom-sheet.tsx
│   ├── date-bottom-sheet.tsx
│   ├── empty-state.tsx
│   ├── error-fallback.tsx
│   └── index.ts
├── app.tsx
├── main.tsx
└── vite-env.d.ts
```

## 주요 기능 ✨

### 1. 버스 예약 플로우

- 출발 터미널/도착 터미널 선택 (서울, 수원, 대전, 부산, 광주, 인천, 대구, 울산, 창원, 전주)
- 날짜 및 인원 선택 (최대 9명)
- 편도/왕복 선택
- 버스 티켓 선택 (프리미엄/우등/일반 등급별 색상 배지 표시)
- 좌석 선택 및 예약 확인

### 2. 좌석 선택

- 버스 등급에 따른 좌석 배치도 표시
  - **프리미엄**: 21석 (1+2 배열)
  - **우등**: 28석 (2+2 배열)
  - **일반**: 40석 (2+2 배열)
- 선택 가능/선택됨/예약됨 좌석 상태 표시
- 인원 수에 맞는 좌석 수 선택 필수 (미선택 시 예약 버튼 비활성화)

### 3. 실제 소요시간 반영

- 한국 도시 간 실제 버스 소요시간 기반의 도착시간 계산
- 등급별 소요시간 차등 적용 (프리미엄 -10%, 일반 +10%)

### 4. 상태 관리

- **Zustand**: 예약 티켓 및 좌석 선택 상태 관리
- **React Query**: 서버 상태 관리 및 캐싱

### 5. 국제화 (i18n)

- 한국어/영어 다국어 지원
- react-i18next를 활용한 번역 관리

### 6. 타입 안전성

- **Zod**: API 응답 스키마 검증
- **ts-pattern**: 패턴 매칭을 활용한 안전한 분기 처리

### 7. 에러 처리

- react-error-boundary를 활용한 선언적 에러 처리
- ErrorFallback 컴포넌트를 통한 에러 UI 제공

### 8. 프로덕션 레벨 품질 개선

- **Accessibility**: ARIA 속성 적용으로 스크린 리더 접근성 강화
- **Performance**: LCP/CLS 등 Web Vitals 지표 모니터링
- **Network**: 오프라인 상태 감지 및 UX 제공
- **Stability**: 예약 요청 멱등성(Idempotency) 보장

### 9. 테스트 자동화

- **E2E**: Playwright를 활용한 전체 예약 플로우 테스트 자동화 (Coverage 100%)

### 10. UI/UX 고도화

- **Modern UI**: 모던한 스타일의 간결하고 직관적인 디자인 (Radius, Spacing 개선)
- **Interactive**: 반응형 버튼 레이아웃, 클릭 피드백 강화

## 프로젝트를 진행하며 고민한 부분 🤔

### 코드의 모듈화와 일관성을 유지하기 위해 노력했습니다.

- 프로젝트 구조를 `api`, `hooks`, `lib`, `ui`, `store`, `pages`로 나누어 역할별로 명확하게 분리했습니다.
- `lib/` 폴더에 기본 UI 컴포넌트와 유틸리티를 모아 재사용성을 높였습니다.
- API URL을 `api-urls.ts`에서 중앙 관리하여 일관성을 유지했습니다.

### 상태 관리 전략을 고민했습니다.

- 클라이언트 상태는 Zustand로, 서버 상태는 React Query로 분리했습니다.
- `query-keys.ts`를 통해 React Query 키를 중앙에서 관리하여 타이포를 방지했습니다.
- 좌석 선택 상태를 Zustand 스토어에서 관리하여 페이지 간 상태를 유지합니다.

### 타입 안전성을 강화했습니다.

- Zod를 활용하여 API 응답 데이터의 런타임 스키마 검증을 수행했습니다.
- ts-pattern을 활용하여 분기 처리 시 타입 안전성을 확보했습니다.

### 재사용 가능한 컴포넌트를 설계했습니다.

- `SeatSelector`, `BusTypeBadge`, `EmptyState`, `CountBottomSheet`, `DateBottomSheet`, `ErrorFallback` 등 공통 UI 컴포넌트를 분리했습니다.
- `useTicketFormatter` 훅을 통해 티켓 포맷팅 로직을 재사용 가능하게 만들었습니다.

### 사용자 경험을 고려했습니다.

- 동일한 터미널 선택 방지, 최대 인원 제한 등 유효성 검사를 구현했습니다.
- Toast를 활용하여 사용자에게 즉각적인 피드백을 제공했습니다.
- 버스 등급별 색상 배지(프리미엄=주황, 우등=초록, 일반=파랑)로 시각적 구분을 제공합니다.
- 좌석 미선택 시 예약 버튼을 비활성화하여 실수를 방지합니다.

## 개발 상세 내용 📖

1. **프로젝트 초기 설정**: Vite + React + TypeScript 환경 구성
2. **라우팅 구현**: React Router를 활용한 SPA 라우팅
3. **API 연동**: REST API 요청 처리 및 React Query 캐싱
4. **상태 관리**: Zustand를 활용한 전역 상태 관리 (티켓 + 좌석)
5. **좌석 선택**: 등급별 좌석 배치도 UI 및 선택 로직 구현
6. **타입 안전성**: Zod 스키마 검증 및 ts-pattern 패턴 매칭 적용
7. **UI 구현**: lib 컴포넌트를 활용한 일관된 UI, 등급별 색상 배지
8. **국제화**: react-i18next를 활용한 다국어 지원
9. **에러 처리**: react-error-boundary를 활용한 선언적 에러 바운더리
10. **품질 개선**: 접근성, 웹 바이탈, 멱등성, 보안(CSP) 등 프로덕션 필수 요소 적용
11. **테스트**: Playwright 기반 E2E 테스트 환경 구축 및 시나리오 작성
12. **UI 리파인먼트**: 디자인 시스템 고도화 및 반응형 레이아웃 개선
