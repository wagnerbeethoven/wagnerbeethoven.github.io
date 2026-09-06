const GITHUB_USER = "wagnerbeethoven";

const hiddenRepositories = new Set([
    "wagnerbeethoven",
    "wagnerbeethoven.github.io"
]);

const customDescriptions = {
    "figma-plugin-html-layers":
        "Plugin e experimento para trabalhar com estruturas HTML e camadas no Figma.",

    "figma-plugin-samples":
        "Coleção de estudos, exemplos e experimentos para desenvolvimento de plugins do Figma.",

    "figma-plugin-selection-to-variables":
        "Plugin para transformar propriedades de elementos selecionados em variáveis no Figma.",

    "ai-a11y":
        "Recursos e experimentos que aproximam inteligência artificial e acessibilidade digital.",

    "ai-claude-code-templates":
        "Templates e referências para estruturar fluxos e projetos utilizando Claude Code.",

    "ai-code-review-graph":
        "Experimentos com inteligência artificial aplicada à revisão e análise de código.",

    "ai-graphic-design-skill":
        "Skill experimental para apoiar tarefas e processos de design gráfico com inteligência artificial.",

    "ai-open-codesign":
        "Recursos e experimentos de codesign apoiados por inteligência artificial.",

    "ai-open-design":
        "Explorações sobre processos de design, ferramentas abertas e inteligência artificial.",

    "ai-ruflo":
        "Experimentação e estudo de workflows multiagente e automações com inteligência artificial.",

    "revista-zena":
        "Projeto editorial e arquivo digital da Revista Zena."
};

const state = {
    repositories: [],
    filter: "all",
    query: ""
};

const repositoryContainer =
    document.querySelector("#repositories");

const search =
    document.querySelector("#search");

const filters =
    [...document.querySelectorAll(".filter")];

const repoCount =
    document.querySelector("#repo-count");

const repoCountLabel =
    document.querySelector("#repo-count-label");

document.querySelector("#year").textContent =
    new Date().getFullYear();

function getCategory(repository) {

    if (repository.name.startsWith("ai-")) {
        return "ai";
    }

    if (repository.name.startsWith("figma-plugin-")) {
        return "figma";
    }

    return "other";
}

function getCategoryLabel(category) {

    const labels = {
        ai: "IA",
        figma: "Figma",
        other: "Projeto"
    };

    return labels[category];
}

function getInitials(repository) {

    if (repository.name.startsWith("figma-plugin-")) {
        return "FG";
    }

    if (repository.name.startsWith("ai-")) {
        return "AI";
    }

    return repository.name
        .split("-")
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join("")
        .toUpperCase();
}

function formatName(repositoryName) {

    const names = {
        "figma-plugin-html-layers":
            "HTML Layers",

        "figma-plugin-samples":
            "Figma Plugin Samples",

        "figma-plugin-selection-to-variables":
            "Selection to Variables",

        "ai-a11y":
            "AI + Accessibility",

        "ai-claude-code-templates":
            "Claude Code Templates",

        "ai-code-review-graph":
            "Code Review Graph",

        "ai-graphic-design-skill":
            "Graphic Design Skill",

        "ai-open-codesign":
            "Open Codesign",

        "ai-open-design":
            "Open Design",

        "ai-ruflo":
            "Ruflo",

        "revista-zena":
            "Revista Zena"
    };

    return names[repositoryName] ??
        repositoryName
            .split("-")
            .map(word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
            )
            .join(" ");
}

function getDescription(repository) {

    return customDescriptions[repository.name]
        ?? repository.description
        ?? "Projeto e experimento publicado no meu GitHub.";
}

function escapeHTML(value = "") {

    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function cardTemplate(repository) {

    const category =
        getCategory(repository);

    const language =
        repository.language
            ? `
                <span>
                    <span
                        class="language-dot"
                        aria-hidden="true"
                    ></span>
                    ${escapeHTML(repository.language)}
                </span>
            `
            : "";

    return `
        <article class="repo-card">

            <div class="repo-card-header">

                <div
                    class="repo-icon"
                    aria-hidden="true"
                >
                    ${escapeHTML(getInitials(repository))}
                </div>

                <span class="repo-type">
                    ${escapeHTML(getCategoryLabel(category))}
                </span>

            </div>

            <h3>
                <a
                    href="${escapeHTML(repository.html_url)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Acessar ${escapeHTML(formatName(repository.name))} no GitHub"
                >
                    ${escapeHTML(formatName(repository.name))}
                </a>
            </h3>

            <p class="repo-description">
                ${escapeHTML(getDescription(repository))}
            </p>

            <div class="repo-meta">
                ${language}

                ${
                    repository.stargazers_count > 0
                        ? `
                            <span>
                                ★ ${repository.stargazers_count}
                                <span class="sr-only">
                                    estrelas
                                </span>
                            </span>
                        `
                        : ""
                }
            </div>

        </article>
    `;
}

function filterRepositories() {

    const normalizedQuery =
        state.query
            .trim()
            .toLocaleLowerCase("pt-BR");

    return state.repositories.filter(repository => {

        const matchesFilter =
            state.filter === "all" ||
            getCategory(repository) === state.filter;

        const searchableText = `
            ${repository.name}
            ${formatName(repository.name)}
            ${getDescription(repository)}
        `.toLocaleLowerCase("pt-BR");

        const matchesSearch =
            !normalizedQuery ||
            searchableText.includes(normalizedQuery);

        return matchesFilter && matchesSearch;
    });
}

function render() {

    const repositories =
        filterRepositories();

    repoCount.textContent =
        repositories.length;

    repoCountLabel.textContent =
        repositories.length === 1
            ? "repositório"
            : "repositórios";

    if (!repositories.length) {

        repositoryContainer.innerHTML = `
            <p class="empty">
                Nenhum projeto encontrado para esse filtro.
            </p>
        `;

        return;
    }

    repositoryContainer.innerHTML =
        repositories
            .map(cardTemplate)
            .join("");
}

async function loadRepositories() {

    repositoryContainer.setAttribute(
        "aria-busy",
        "true"
    );

    try {

        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`
        );

        if (!response.ok) {
            throw new Error(
                `GitHub retornou ${response.status}`
            );
        }

        const repositories =
            await response.json();

        state.repositories =
            repositories
                .filter(repository =>
                    !repository.fork &&
                    !repository.archived &&
                    !hiddenRepositories.has(repository.name)
                )
                .sort((a, b) => {

                    const categoryOrder = {
                        figma: 0,
                        ai: 1,
                        other: 2
                    };

                    const categoryDifference =
                        categoryOrder[getCategory(a)] -
                        categoryOrder[getCategory(b)];

                    if (categoryDifference !== 0) {
                        return categoryDifference;
                    }

                    return formatName(a.name)
                        .localeCompare(
                            formatName(b.name),
                            "pt-BR"
                        );
                });

        render();

    } catch (error) {

        console.error(error);

        repositoryContainer.innerHTML = `
            <div class="error">
                <p>
                    Não foi possível carregar os projetos agora.
                </p>

                <p>
                    <a
                        href="https://github.com/${GITHUB_USER}?tab=repositories"
                    >
                        Acessar meus repositórios diretamente no GitHub.
                    </a>
                </p>
            </div>
        `;

    } finally {

        repositoryContainer.setAttribute(
            "aria-busy",
            "false"
        );
    }
}

search.addEventListener(
    "input",
    event => {

        state.query =
            event.target.value;

        render();
    }
);

filters.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            state.filter =
                button.dataset.filter;

            filters.forEach(filter => {

                const active =
                    filter === button;

                filter.classList.toggle(
                    "active",
                    active
                );

                filter.setAttribute(
                    "aria-pressed",
                    String(active)
                );
            });

            render();
        }
    );
});

loadRepositories();
