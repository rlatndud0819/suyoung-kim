/**
 * data.js의 SITE_DATA를 읽어 각 섹션을 그려주고,
 * 스크롤 시 가벼운 페이드인 효과를 적용합니다.
 * 내용 수정은 이 파일이 아니라 js/data.js에서 하세요.
 */
(function () {
  const data = window.SITE_DATA;

  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        if (key === "class") node.className = value;
        else if (key === "html") node.innerHTML = value;
        else node.setAttribute(key, value);
      });
    }
    (children || []).forEach((child) => {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function text(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = content;
    return node;
  }

  // ---------- Hero ----------
  function renderHero() {
    const { hero } = data;
    document.getElementById("hero-name").textContent = hero.name;
    document.getElementById("hero-tagline").textContent = hero.tagline;

    const primary = document.getElementById("hero-cta-primary");
    primary.textContent = hero.ctaPrimary.label;
    primary.setAttribute("href", hero.ctaPrimary.href);

    const secondary = document.getElementById("hero-cta-secondary");
    secondary.textContent = hero.ctaSecondary.label;
    secondary.setAttribute("href", hero.ctaSecondary.href);

    document.title = `${hero.name} | 백엔드 개발자`;
  }

  // ---------- 제공 서비스 ----------
  function renderServices() {
    const grid = document.getElementById("services-grid");
    data.services.forEach((service, i) => {
      const card = el("div", { class: "card service-card", "data-fade": "" }, [
        text("span", "service-num", String(i + 1).padStart(2, "0")),
        text("h3", null, service.title),
        text("p", null, service.description),
      ]);
      grid.appendChild(card);
    });
  }

  // ---------- 작업 사례 ----------
  function renderWorks() {
    const grid = document.getElementById("works-grid");

    if (!data.projects.length) {
      grid.appendChild(
        text("p", "tag-muted", "작업 사례를 준비 중입니다. 곧 소개해 드릴게요.")
      );
      return;
    }

    data.projects.forEach((project) => {
      const thumb = el("div", { class: "work-thumb" }, [
        project.image
          ? el("img", { src: project.image, alt: `${project.title} 스크린샷` })
          : text("span", null, "스크린샷 준비중"),
      ]);

      const stackWrap = el("div", { class: "work-stack" }, []);
      if (project.stack.length) {
        project.stack.forEach((s) => stackWrap.appendChild(text("span", "tag", s)));
      } else {
        stackWrap.appendChild(text("span", "tag tag-muted", "기술 스택 작성 예정"));
      }

      const linkBtn = project.link
        ? el("a", { class: "btn btn-secondary work-link", href: project.link, target: "_blank", rel: "noopener" }, [
            text("span", null, "자세히 보기"),
          ])
        : el("span", { class: "btn btn-disabled work-link" }, [text("span", null, "링크 준비중")]);

      const body = el("div", { class: "work-body" }, [
        text("h3", null, project.title),
        text("p", null, project.description || "소개 문구 작성 예정"),
        stackWrap,
        linkBtn,
      ]);

      const card = el("div", { class: "card work-card", "data-fade": "" }, [thumb, body]);
      grid.appendChild(card);
    });
  }

  // ---------- 진행 방식 ----------
  function renderProcess() {
    const list = document.getElementById("process-steps");
    data.process.forEach((step, i) => {
      const item = el("li", { class: "process-step", "data-fade": "" }, [
        text("span", "process-num", String(i + 1)),
        text("span", "process-label", step.label),
      ]);
      list.appendChild(item);
    });
  }

  // ---------- 경력·기술 ----------
  function renderCareer() {
    const timeline = document.getElementById("career-timeline");
    data.career.forEach((item) => {
      const node = el("li", { class: "timeline-item", "data-fade": "" }, [
        text("p", "timeline-period", item.period),
        text("p", "timeline-org", item.org),
        text("p", "timeline-role", item.role),
      ]);
      timeline.appendChild(node);
    });

    const tagsWrap = document.getElementById("skills-tags");
    data.skills.forEach((skill) => {
      tagsWrap.appendChild(text("span", "tag", skill));
    });
  }

  // ---------- Contact ----------
  function renderContact() {
    const wrap = document.getElementById("contact-buttons");
    const { contact } = data;

    const emailBtn = el(
      "a",
      { class: "btn btn-primary", href: `mailto:${contact.email}` },
      [text("span", null, `이메일 보내기 (${contact.email})`)]
    );
    wrap.appendChild(emailBtn);

    const blogBtn = contact.blog
      ? el("a", { class: "btn btn-secondary", href: contact.blog, target: "_blank", rel: "noopener" }, [
          text("span", null, "블로그 보기"),
        ])
      : el("span", { class: "btn btn-disabled" }, [text("span", null, "블로그 준비중")]);
    wrap.appendChild(blogBtn);
  }

  // ---------- Footer ----------
  function renderFooter() {
    document.getElementById("footer-year").textContent = new Date().getFullYear();
  }

  // ---------- 스크롤 페이드인 ----------
  function initFadeIn() {
    const targets = document.querySelectorAll("[data-fade]");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((t) => observer.observe(t));
  }

  function init() {
    renderHero();
    renderServices();
    renderWorks();
    renderProcess();
    renderCareer();
    renderContact();
    renderFooter();
    initFadeIn();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
