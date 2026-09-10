// Theme toggle
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", current);
  localStorage.setItem("theme", current);
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Render projects from projects.json
fetch("projects.json")
  .then((res) => res.json())
  .then((projects) => renderProjects(projects))
  .catch(() => {
    document.getElementById("projects-list").innerHTML =
      '<div class="projects-empty">Could not load projects.json — if you opened this file directly, run a local server instead (see README).</div>';
  });

function renderProjects(projects) {
  const list = document.getElementById("projects-list");
  if (!projects || projects.length === 0) {
    list.innerHTML = '<div class="projects-empty">Projects coming soon.</div>';
    return;
  }

  list.innerHTML = projects
    .map((p) => {
      const tags = (p.tech || [])
        .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
        .join("");
      const highlights = (p.highlights || [])
        .map((h) => `<li>${escapeHtml(h)}</li>`)
        .join("");
      const links = [];
      if (p.links?.github) links.push(`<a href="${p.links.github}" target="_blank" rel="noopener">source →</a>`);
      if (p.links?.demo) links.push(`<a href="${p.links.demo}" target="_blank" rel="noopener">demo →</a>`);

      const period = p.period
        ? `<span class="project-period">${escapeHtml(p.period)}</span>`
        : "";
      const subtitle = p.subtitle
        ? `<div class="project-subtitle">${escapeHtml(p.subtitle)}</div>`
        : "";
      const description = p.description
        ? `<p class="project-desc">${escapeHtml(p.description)}</p>`
        : "";
      const tagRow = tags ? `<div class="tag-row">${tags}</div>` : "";

      return `
        <div class="project-card">
          <div class="project-card-head">
            <h3 class="project-title">${escapeHtml(p.title)}</h3>
            ${period}
          </div>
          ${subtitle}
          ${description}
          <ul>${highlights}</ul>
          ${tagRow}
          ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
        </div>
      `;
    })
    .join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
