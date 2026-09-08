# HeeYoung's Portfolio Webpage (Basic 1-1 Mission)

> **Basic Web Core & Front-end: 나를 소개하는 웹페이지 처음부터 만들기**  
> 순수 HTML5, Vanilla CSS3, ES6+ JavaScript만을 활용하여 제작된 반응형 포트폴리오 웹사이트입니다.

---

## 📌 프로젝트 개요 (Overview)

- **개발자**: 희영 (HeeYoung)
- **GitHub Repository**: [heeyoung35/Basic_1-1_portfolio-webpage](https://github.com/heeyoung35/Basic_1-1_portfolio-webpage.git)
- **GitHub Pages 배포 URL**: [https://heeyoung35.github.io/Basic_1-1_portfolio-webpage](https://heeyoung35.github.io/Basic_1-1_portfolio-webpage)
- **기술 스택**: HTML5, CSS3, Vanilla JavaScript (ES6+), GitHub REST API
- **제약 사항 준수**: React, Vue, jQuery, Bootstrap, Tailwind CSS 등 외부 라이브러리 일체 미사용. Pure Web Standard 기술로만 구현.

---

## ✨ 핵심 구현 기능 (Key Features)

### 1. 시맨틱 마크업 & 웹 접근성 (Semantic HTML)
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` 등 표준 시맨틱 태그 사용.
- 모든 이미지 요소에 의미 있는 `alt` 속성 부여.
- 폼 요소에 `<label for="...">`와 `<input id="...">`를 1:1 매칭하여 스크린 리더 지원.

### 2. 다크 모드 & 디자인 시스템 (Theme System)
- CSS Custom Properties (`:root` 및 `[data-theme="dark"]`)로 테마 토큰 관리.
- `localStorage` 동기화로 브라우저 새로고침 후에도 사용자의 다크 모드 설정 유지.
- `prefers-color-scheme` 미디어 쿼리를 통한 시스템 기본 다크모드 감지 지원.

### 3. 반응형 디자인 & 인터랙티브 UI (Responsive Layout)
- **Flexbox**: Header (로고 좌측, 네비게이션 우측) 레이아웃 적용.
- **CSS Grid**: Projects 섹션 카드를 `auto-fit` 및 `minmax(320px, 1fr)` 기반 가변 반응형 구조로 설계.
- **모바일 햄버거 메뉴**: 768px 미만 디바이스에서 네비게이션 자동 숨김 및 햄버거 토글 메뉴 (`classList.toggle('active')`) 작동.

### 4. GitHub REST API 비동기 연동 & 4가지 UI 상태 (Async Fetch)
- `fetch` 및 `async/await` 방식으로 GitHub 사용자(`heeyoung35`)의 저장소 목록을 동적으로 렌더링.
- **4가지 UI 상태 완벽 보장**:
  1. **Loading State**: 로딩 중 CSS Spinner 스피너 애니메이션 표시.
  2. **Success State**: `Array.prototype.map()`을 활용한 레포지토리 카드 동적 생성 (Star 수, 주요 언어, 설명, GitHub 링크).
  3. **Error State (403 Rate Limit 포함)**: API 오류 또는 호출 한도 초과 시 에러 메시지 안내 및 **[다시 시도]** 버튼 제공.
  4. **Empty State**: 조건에 맞는 레포지토리가 없을 경우 빈 상태 안내 뷰 표시.
- **언어별 필터링 기능**: `Array.prototype.filter()`를 활용하여 All / JavaScript / HTML/CSS / Other 카테고리 필터링.

### 5. 폼 유효성 검사 (Contact Form UX)
- 이름, 이메일, 메시지 필수값 검증 (빈 필드 제출 방지).
- 이메일 정규식 (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) 형식 검증.
- `event.preventDefault()`로 폼 기본 제출 동작을 방지하고 필드 근처 실시간 에러 메시지 및 성공 토스트 피드백 표시.

---

## ⚙️ 주요 설정 기준값 (Configuration Parameters)

미션 지침에 따라 아래 핵심 임계값 및 파라미터를 명시합니다:

| 구분 | 기준값 (Threshold) | 클래스 및 작동 방식 |
| :--- | :--- | :--- |
| **네비게이션 배경 스크롤** | **`60px`** | `window.scrollY > 60`일 때 `.scrolled` 클래스 추가 및 유리질 효과 적용 |
| **스크롤 탑 버튼 노출** | **`300px`** | `window.scrollY > 300`일 때 `#scroll-top`에 `.visible` 클래스 추가 |
| **스크롤 섹션 등장 애니메이션** | **`threshold: 0.2`** | `IntersectionObserver` 임계값 0.2 진입 시 `.is-visible` 클래스 추가 (Slide-up & Fade-in) |
| **Hero 타이핑 속도** | **`90ms / 40ms`** | 타자기 한 글자 출력 속도 90ms, 지움 속도 40ms, 대기시간 1800ms |

---

## 📂 프로젝트 폴더 구조 (Folder Structure)

```
Basic_1-1_portfolio-webpage/
├── index.html         # 메인 HTML5 시맨틱 페이지
├── css/
│   └── style.css      # CSS 변수, 테마 토큰 및 반응형 스타일
├── js/
│   └── main.js        # 비동기 API 연동, 상태 관리 및 이벤트 로직
├── images/
│   └── profile.jpg    # 프로필 이미지
└── README.md          # 프로젝트 설명서 및 기술 사양
```

---

## 🚀 실행 및 테스트 방법 (How to Run)

1. 저장소를 클론하거나 압축을 해제합니다.
   ```bash
   git clone https://github.com/heeyoung35/Basic_1-1_portfolio-webpage.git
   ```
2. `index.html` 파일을 최신 웹 브라우저(Chrome 권장)에서 엽니다. (VS Code의 Live Server 사용 권장)
