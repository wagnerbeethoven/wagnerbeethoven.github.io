const state = {
    projects: [],
    category: "Todos",
    relationship: "Todos",
    query: ""
};

const projectsElement =
    document.querySelector("#projects");

const categoryFilters =
    document.querySelector("#category-filters");

const relationshipFilters =
    document.querySelector("#relationship-filters");

const searchInput =
    document.querySelector("#search");

const counter =
    document.querySelector("#counter");

const counterLabel =
    document.querySelector("#counter-label");

const activeFilter =
    document.querySelector("#active-filter");

document.querySelector("#year").textContent =
    new Date().getFullYear();

function escapeHTML(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function initials(name) {
    return name
        .replace(/[+/]/g, " ")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(word => word[0])
        .join("")
        .toUpperCase();
}

function normalize(value) {
    return String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function createFilterButton(value, type) {

    const button =
        document.createElement("button");

    button.type = "button";
    button.className = "filter";
    button.textContent = value;
    button.dataset.value = value;
    button.dataset.type = type;

    const selected =
        state[type] === value;

    button.setAttribute(
        "aria-pressed",
        String(selected)
    );

    button.addEventListener("click", () => {

        state[type] = value;

        renderFilters();
        renderProjects();
    });

    return button;
}

function renderFilters() {

    const categories = [
        "Todos",
        ...new Set(
            state.projects.map(project => project.category)
        )
    ];

    const relationships = [
        "Todos",
        ...new Set(
            state.projects.map(project => project.relationship)
        )
    ];

    categoryFilters.replaceChildren(
        ...categories.map(value =>
            createFilterButton(value, "category")
        )
    );

    relationshipFilters.replaceChildren(
        ...relationships.map(value =>
            createFilterButton(value, "relationship")
        )
    );
}

function projectMatches(project) {

    const categoryMatch =
        state.category === "Todos" ||
        project.category === state.category;

    const relationshipMatch =
        state.relationship === "Todos" ||
        project.relationship === state.relationship;

    const query =
        normalize(state.query.trim());

    const searchable =
        normalize([
            project.name,
            project.repositoryName,
            project.description,
            project.category,
            project.relationship,
            ...(project.tags || [])
        ].join(" "));

    const queryMatch =
        !query ||
        searchable.includes(query);

    return (
        categoryMatch &&
        relationshipMatch &&
        queryMatch
    );
}

function logoTemplate(project) {

    if (project.logo) {
        return `
            <div class="logo">
                <img
                    src="${escapeHTML(project.logo)}"
                    alt=""
                    loading="lazy"
                >
            </div>
        `;
    }

    return `
        <div class="logo" aria-hidden="true">
            <span class="logo-fallback">
                ${escapeHTML(initials(project.name))}
            </span>
        </div>
    `;
}

function linksTemplate(project) {

    const links = [];

    if (project.url) {
        links.push(`
            <a
                href="${escapeHTML(project.url)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Acessar projeto
            </a>
        `);
    }

    if (project.repository) {
        links.push(`
            <a
                href="${escapeHTML(project.repository)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                GitHub
            </a>
        `);
    }

    if (!links.length) {
        return `
            <p class="private-note">
                Sem link público
            </p>
        `;
    }

    return links.join("");
}

function cardTemplate(project) {

    const tags =
        (project.tags || [])
            .map(tag => `
                <span class="tag">
                    ${escapeHTML(tag)}
                </span>
            `)
            .join("");

    return `
        <article class="card">

            <div class="card-top">

                ${logoTemplate(project)}

                <div class="badges">

                    <span class="badge relationship">
                        ${escapeHTML(project.relationship)}
                    </span>

                    <span class="badge">
                        ${escapeHTML(project.visibility)}
                    </span>

                </div>

            </div>

            <h3>
                ${escapeHTML(project.name)}
            </h3>

            <p class="description">
                ${escapeHTML(project.description)}
            </p>

            <div class="tags" aria-label="Características">
                ${tags}
            </div>

            <footer class="card-footer">
                ${linksTemplate(project)}
            </footer>

        </article>
    `;
}

function renderProjects() {

    const filtered =
        state.projects.filter(projectMatches);

    counter.textContent =
        filtered.length;

    counterLabel.textContent =
        filtered.length === 1
            ? "projeto"
            : "projetos";

    const active = [];

    if (state.category !== "Todos") {
        active.push(state.category);
    }

    if (state.relationship !== "Todos") {
        active.push(state.relationship);
    }

    if (state.query.trim()) {
        active.push(`Busca: "${state.query.trim()}"`);
    }

    activeFilter.textContent =
        active.length
            ? `Filtros ativos: ${active.join(" · ")}`
            : `Exibindo todos os ${state.projects.length} projetos cadastrados.`;

    if (!filtered.length) {

        projectsElement.innerHTML = `
            <p class="status">
                Nenhum projeto encontrado com esses filtros.
            </p>
        `;

        return;
    }

    projectsElement.innerHTML =
        filtered
            .map(cardTemplate)
            .join("");
}

async function loadProjects() {

    projectsElement.setAttribute(
        "aria-busy",
        "true"
    );

    try {

        const response =
            await fetch("./projects.json");

        if (!response.ok) {
            throw new Error(
                `Erro ${response.status}`
            );
        }

        state.projects =
            await response.json();

        renderFilters();
        renderProjects();

    } catch (error) {

        console.error(error);

        projectsElement.innerHTML = `
            <p class="status">
                Não foi possível carregar o catálogo de projetos.
            </p>
        `;

    } finally {

        projectsElement.setAttribute(
            "aria-busy",
            "false"
        );
    }
}

searchInput.addEventListener(
    "input",
    event => {

        state.query =
            event.target.value;

        renderProjects();
    }
);

loadProjects();
