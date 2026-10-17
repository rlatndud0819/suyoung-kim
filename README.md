# 김수영 자기소개 사이트

빌드 도구 없이 순수 HTML/CSS/JS로 만든 1페이지 자기소개 사이트입니다.

```
my-website/
├── index.html         # 페이지 구조
├── css/
│   └── style.css      # 디자인
├── js/
│   ├── data.js        # ⭐ 내용(텍스트·링크·작업 사례) 수정은 여기서만
│   └── main.js         # data.js를 읽어 화면을 그리는 코드 (평소엔 건드릴 필요 없음)
├── assets/
│   └── favicon.svg     # 파비콘 (이니셜 아이콘)
└── README.md
```

---

## 1. 로컬에서 열어보는 방법

가장 간단한 방법은 `index.html`을 더블클릭해서 브라우저로 바로 여는 것입니다.

다만 `file://`로 직접 열면 브라우저 보안 정책 때문에 일부 환경에서 스크립트가 정상 동작하지 않을 수 있습니다. 그럴 땐 터미널에서 아래처럼 간단한 로컬 서버를 띄운 뒤 접속하세요.

```bash
cd my-website
python3 -m http.server 8000
```

이후 브라우저에서 `http://localhost:8000` 접속하면 됩니다. (파이썬이 없다면 `npx serve .` 등을 사용해도 됩니다.)

---

## 2. 내용 수정 방법

**코드를 건드릴 필요 없이 `js/data.js` 파일의 값만 바꾸면 사이트 내용이 바뀝니다.**

`data.js` 안에는 다음 항목들이 있습니다.

| 항목 | 설명 |
|---|---|
| `hero` | 이름, 한 줄 소개, 버튼 2개 |
| `services` | 제공 서비스 카드 3개 |
| `projects` | 작업 사례 카드 목록 |
| `process` | 진행 방식 단계 |
| `career` | 경력·학력 타임라인 |
| `skills` | 기술 스택 태그 |
| `contact` | 이메일, 블로그 링크 |

### 예시: 작업 사례 추가하기

`HealthLog`처럼 아직 소개 문구가 준비되지 않은 프로젝트는 일부러 `projects` 배열에서 빼두었습니다. 내용이 준비되면 `js/data.js`의 `projects` 배열에 아래처럼 객체를 추가하세요. (파일 안에 예시 주석이 이미 있습니다)

```js
projects: [
  {
    title: "HealthLog",
    description: "여기에 한 줄 소개를 적어주세요",
    stack: ["Spring Boot", "MySQL"], // 사용 기술
    image: "./assets/projects/healthlog.png", // 스크린샷 경로
    link: "https://healthlog.example.com",     // 서비스 링크
  },
  // ... 기존 StockLens 항목
],
```

- `image`나 `link`를 빈 문자열(`""`)로 두면 각각 "스크린샷 준비중" 박스, "링크 준비중" 버튼이 자동으로 표시됩니다.
- 스크린샷 이미지는 `assets/projects/` 폴더를 만들어 그 안에 넣고, `image` 값에 경로를 적어주시면 됩니다.

### 예시: 블로그 링크 추가하기

```js
contact: {
  email: "rlatndud0819@gmail.com",
  blog: "https://your-blog.com", // 여기에 링크를 채우면 "블로그 준비중" 버튼이 활성화됩니다
},
```

### 공유 미리보기 이미지(OG 이미지) 추가하기

링크를 카카오톡·슬랙 등에 공유했을 때 보일 미리보기 이미지를 추가하려면,

1. 1200×630px 크기의 이미지를 준비해 `assets/og-image.png`로 저장하고
2. `index.html`의 `<head>` 안에 있는 아래 주석 처리된 두 줄의 주석을 해제하세요.

```html
<meta property="og:image" content="./assets/og-image.png" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## 3. GitHub Pages로 배포하기

처음 배포하시는 분도 따라 할 수 있도록 순서대로 안내합니다.

### 1) GitHub 저장소 만들기
1. [github.com](https://github.com) 에 로그인 후 우측 상단 `+` → `New repository` 클릭
2. 저장소 이름을 정합니다. (예: `my-website`)
3. `Public`으로 설정하고 `Create repository` 클릭

### 2) 코드 올리기

터미널에서 `my-website` 폴더로 이동한 뒤 아래 명령을 순서대로 실행하세요. (`<저장소 주소>`는 GitHub에서 저장소를 만들면 알려주는 `https://github.com/아이디/저장소이름.git` 주소입니다)

```bash
cd my-website
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <저장소 주소>
git push -u origin main
```

### 3) GitHub Pages 켜기
1. 방금 만든 저장소 페이지에서 상단 `Settings` 탭 클릭
2. 왼쪽 메뉴에서 `Pages` 클릭
3. `Build and deployment` → `Source`를 `Deploy from a branch`로 선택
4. `Branch`를 `main` / `/ (root)`로 선택 후 `Save`
5. 1~2분 기다리면 같은 페이지 상단에 `Your site is live at https://아이디.github.io/저장소이름/` 형태의 주소가 표시됩니다

이 주소로 접속하면 사이트가 바로 보입니다. 이후 내용을 수정하고 싶다면 `data.js`를 수정한 뒤 다시

```bash
git add .
git commit -m "내용 수정"
git push
```

을 실행하면 1~2분 내로 반영됩니다.

> 이 사이트는 모든 파일 경로를 상대 경로(`./css/...`)로 작성했기 때문에, 저장소 이름이 무엇이든(`아이디.github.io`든 일반 저장소든) 별도 설정 없이 그대로 배포됩니다.

---

## 4. (선택) 커스텀 도메인 연결하기

직접 구매한 도메인(예: `kimsuyoung.dev`)을 연결하고 싶다면,

1. 저장소 루트에 `CNAME`이라는 이름의 파일을 만들고 안에 도메인 주소 한 줄만 적습니다. (예: `kimsuyoung.dev`)
2. 도메인을 구매한 곳(가비아, Cloudflare 등)의 DNS 설정에서 GitHub Pages가 안내하는 레코드를 추가합니다. (A 레코드 또는 CNAME 레코드 — 저장소 `Settings` → `Pages`에 접속하면 GitHub가 정확한 값을 안내해줍니다)
3. 저장소 `Settings` → `Pages`의 `Custom domain`란에 도메인을 입력하고 저장합니다.
4. DNS가 전파되기까지 몇 분~몇 시간 정도 걸릴 수 있습니다. 완료되면 `Enforce HTTPS` 옵션을 켜서 보안 연결을 적용하세요.

---

## 참고

- 전화번호 등 민감한 개인정보는 사이트에 노출하지 않았습니다.
- `[작성 예정]`으로 표시된 항목은 아직 확정되지 않은 내용이니, 준비되는 대로 `js/data.js`에서 채워주세요.
