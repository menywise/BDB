const ALL_PROJECTS = [
  {id: 'gmail-manager', title: 'Gmail Manager', path: '/gmail-manager', icon: 'bi-envelope'},
  {id: 'alegria-tracker', title: 'Alegria Tracker', path: '/alegria-tracker', icon: 'bi-journal'},
  {id: 'bloc-op', title: 'Bloc Op', path: '/bloc-op', icon: 'bi-hospital'},
  {id: 'matrice-prio', title: 'Matrice Prio IA', path: '/matrice-prio', icon: 'bi-grid-3x3'}
];

function renderNavbar() {
  const current = window.PROJECT_INFO.id;
  const nav = document.getElementById('navbar-root');
  
  nav.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom sticky-top">
      <div class="container-fluid">
        <a class="navbar-brand fw-bold" href="/">Mon Écosystème</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            ${ALL_PROJECTS.map(p => `
              <li class="nav-item">
                <a class="nav-link ${p.id === current ? 'active' : ''}" href="${p.path}">
                  <i class="bi ${p.icon} me-1"></i>${p.title}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </nav>
  `;
}

document.addEventListener('DOMContentLoaded', renderNavbar);
