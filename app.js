const state = {
    projects: [],
    category: "Todos",
    relationship: "Todos",
    query: ""
};

const projectsElement =
    document.querySelector("#projects");

const categorySelect =
    document.querySelector("#category-filter");

const relationshipSelect =
    document.querySelector("#relationship-filter");

const searchInput =
    document.querySelector("#search");

const counter =
    document.querySelector("#counter");

const counterLabel =
    document.querySelector("#counter-label");

const activeFilter =
    document.querySelector("#active-filter");

const year =
    document.querySelector("#year");


/* --------------------------------------------------
   Utilidades
-------------------------------------------------- */

if (year) {
    year.textContent =
        new Date().getFullYear();
}


function escapeHTML(value = "") {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function normalize(value = "") {
    return String(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}


function initials(name = "") {
    return name
        .replace(/[+/]/g, " ")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(word => word[0])
        .join("")
        .toUpperCase();
}


/* --------------------------------------------------
   Logos
-------------------------------------------------- */

function getAutomaticLogo(project) {

    if (!project.url) {
        return "";
    }

    try {

        const hostname =
            new URL(project.url).hostname;

        return (
            "https://www.google.com/s2/favicons" +
            "?domain=" +
            encodeURIComponent(hostname) +
            "&sz=128"
        );

    } catch {

        return "";
    }
}


function logoTemplate(project) {

    /*
     * Ordem:
     *
     * 1. logo definida em projects.json
     * 2. favicon do site
     * 3. iniciais do projeto
     */

    const logo =
        project.logo ||
        getAutomaticLogo(project);

    const fallback =
        escapeHTML(initials(project.name));

    if (!logo) {

        return `
            <div
                class="logo"
                aria-hidden="true"
            >
                <span class="logo-fallback">
                    ${fallback}
                </span>
            </div>
        `;
    }

    return `
        <div
            class="logo"
            aria-hidden="true"
        >
            <img
                src="${escapeHTML(logo)}"
                alt=""
                loading="lazy"
                onerror="
                    this.hidden = true;
                    this.nextElementSibling.hidden = false;
                "
            >

            <span
                class="logo-fallback"
                hidden
            >
                ${fallback}
            </span>
        </div>
    `;
}


/* --------------------------------------------------
   Selects
-------------------------------------------------- */

function createOptions(values, selectedValue) {

    return values
        .map(value => {

            const selected =
                value === selectedValue
                    ? " selected"
                    : "";

            return `
                <option
                    value="${escapeHTML(value)}"
                    ${selected}
                >
                    ${escapeHTML(value)}
                </option>
            `;
        })
        .join("");
}


function renderFilters() {

    const categories = [
        "Todos",
        ...new Set(
            state.projects
                .map(project => project.category)
                .filter(Boolean)
        )
    ];


    const relationships = [
        "Todos",
        ...new Set(
            state.projects
                .map(project => project.relationship)
                .filter(Boolean)
        )
    ];


    categorySelect.innerHTML =
        createOptions(
            categories,
            state.category
        );


    relationshipSelect.innerHTML =
        createOptions(
            relationships,
            state.relationship
        );
}


/* --------------------------------------------------
   Filtro dos projetos
-------------------------------------------------- */

function projectMatches(project) {

    const categoryMatch =
        state.category === "Todos" ||
        project.category === state.category;


    const relationshipMatch =
        state.relationship === "Todos" ||
        project.relationship ===
            state.relationship;


    const query =
        normalize(
            state.query.trim()
        );


    const searchable =
        normalize(
            [
                project.name,
                project.repositoryName,
                project.description,
                project.category,
                project.relationship,
                project.visibility,
                ...(project.tags || [])
            ]
                .filter(Boolean)
                .join(" ")
        );


    const queryMatch =
        !query ||
        searchable.includes(query);


    return (
        categoryMatch &&
        relationshipMatch &&
        queryMatch
    );
}


/* --------------------------------------------------
   Links
-------------------------------------------------- */

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


    if (project.originalRepository) {

        links.push(`
            <a
                href="${escapeHTML(project.originalRepository)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Projeto original
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


/* --------------------------------------------------
   Tags
-------------------------------------------------- */

function tagsTemplate(project) {

    if (
        !project.tags ||
        !project.tags.length
    ) {
        return "";
    }


    const tags =
        project.tags
            .map(tag => `
                <span class="tag">
                    ${escapeHTML(tag)}
                </span>
            `)
            .join("");


    return `
        <div
            class="tags"
            aria-label="Características"
        >
            ${tags}
        </div>
    `;
}


/* --------------------------------------------------
   Card
-------------------------------------------------- */

function cardTemplate(project) {

    return `
        <article class="card">

            <div class="card-top">

                ${logoTemplate(project)}

                <div class="badges">

                    <span
                        class="badge relationship"
                    >
                        ${escapeHTML(
                            project.relationship
                        )}
                    </span>

                    <span class="badge">
                        ${escapeHTML(
                            project.visibility
                        )}
                    </span>

                </div>

            </div>


            <h3>
                ${escapeHTML(project.name)}
            </h3>


            <p class="description">
                ${escapeHTML(
                    project.description
                )}
            </p>


            ${tagsTemplate(project)}


            <footer class="card-footer">
                ${linksTemplate(project)}
            </footer>

        </article>
    `;
}


/* --------------------------------------------------
   Informação dos filtros ativos
-------------------------------------------------- */

function renderActiveFilters(filteredCount) {

    const active = [];


    if (state.category !== "Todos") {

        active.push(
            `Categoria: ${state.category}`
        );
    }


    if (
        state.relationship !== "Todos"
    ) {

        active.push(
            `Relação: ${state.relationship}`
        );
    }


    if (state.query.trim()) {

        active.push(
            `Busca: "${state.query.trim()}"`
        );
    }


    if (!active.length) {

        activeFilter.textContent =
            `Exibindo todos os ${state.projects.length} projetos cadastrados.`;

        return;
    }


    activeFilter.textContent =
        `${filteredCount} ${
            filteredCount === 1
                ? "resultado"
                : "resultados"
        } · ${active.join(" · ")}`;
}


/* --------------------------------------------------
   Renderização
-------------------------------------------------- */

function renderProjects() {

    const filtered =
        state.projects.filter(
            projectMatches
        );


    /*
     * Contador
     */

    counter.textContent =
        filtered.length;


    counterLabel.textContent =
        filtered.length === 1
            ? "projeto"
            : "projetos";


    /*
     * Informação textual dos filtros
     */

    renderActiveFilters(
        filtered.length
    );


    /*
     * Nenhum resultado
     */

    if (!filtered.length) {

        projectsElement.innerHTML = `
            <p class="status">
                Nenhum projeto encontrado
                com esses filtros.
            </p>
        `;

        return;
    }


    /*
     * Cards
     */

    projectsElement.innerHTML =
        filtered
            .map(cardTemplate)
            .join("");
}


/* --------------------------------------------------
   Carregamento do JSON
-------------------------------------------------- */

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
                `Erro HTTP ${response.status}`
            );
        }


        const data =
            await response.json();


        if (!Array.isArray(data)) {

            throw new Error(
                "projects.json precisa conter um array."
            );
        }


        state.projects =
            data;


        renderFilters();
        renderProjects();


    } catch (error) {

        console.error(
            "Erro ao carregar projetos:",
            error
        );


        projectsElement.innerHTML = `
            <div class="status">

                <strong>
                    Não foi possível carregar
                    o catálogo.
                </strong>

                <p>
                    Se você abriu o index.html
                    diretamente pelo computador,
                    execute o projeto por um
                    servidor HTTP local.
                </p>

            </div>
        `;


    } finally {

        projectsElement.setAttribute(
            "aria-busy",
            "false"
        );
    }
}


/* --------------------------------------------------
   Eventos
-------------------------------------------------- */

searchInput.addEventListener(
    "input",
    event => {

        state.query =
            event.target.value;

        renderProjects();
    }
);


categorySelect.addEventListener(
    "change",
    event => {

        state.category =
            event.target.value;

        renderProjects();
    }
);


relationshipSelect.addEventListener(
    "change",
    event => {

        state.relationship =
            event.target.value;

        renderProjects();
    }
);


/* --------------------------------------------------
   Inicialização
-------------------------------------------------- */

loadProjects();