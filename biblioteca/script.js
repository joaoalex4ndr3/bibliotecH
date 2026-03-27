// ==================== DADOS DOS LIVROS ====================
const booksData = {
    'quincas-borba': {
        title: 'Quincas Borba',
        author: 'Machado de Assis',
        description: 'Quincas Borba é um romance escrito por Machado de Assis, publicado em 1891. A história acompanha a trajetória de Rubião, um professor que herda a fortuna de seu amigo Quincas Borba, mas que acaba enlouquecendo. A obra é uma crítica à sociedade brasileira do século XIX, abordando temas como loucura, ambição e a filosofia do "Humanitismo".',
        image: 'assets/qborbas.png'
    },
    'dom-casmurro': {
        title: 'Dom Casmurro',
        author: 'Machado de Assis',
        description: 'Dom Casmurro é um dos maiores clássicos da literatura brasileira. Publicado em 1899, o romance narra a história de Bento Santiago (Bentinho) e sua suspeita de traição por parte de sua esposa, Capitu. A obra é famosa pela dúvida que deixa no leitor sobre a culpa ou inocência de Capitu, sendo um marco do realismo brasileiro.',
        image: 'assets/Dcasmurro.png'
    },
    'diario-banana': {
        title: 'Diário de um Banana',
        author: 'Jeff Kinney',
        description: 'Diário de um Banana é uma série de livros infantojuvenis que narra as aventuras e desventuras de Greg Heffley, um garoto que está cursando o ensino fundamental. Com ilustrações divertidas e um humor característico, os livros abordam os desafios da adolescência, amizade e família de forma leve e cômica.',
        image: 'assets/banana.webp'
    }
};

// ==================== HEADER SCROLL BEHAVIOR ====================
let lastScrollTop = 0;
let scrollTimeout;
const header = document.getElementById('cabecalho');
const scrollThreshold = 50;

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Adiciona classe scrolled quando scrollar
    if (currentScroll > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Esconde/mostra header baseado na direção do scroll
    if (currentScroll > scrollThreshold && currentScroll > lastScrollTop) {
        // Scroll para baixo
        header.classList.add('hide');
    } else if (currentScroll < lastScrollTop) {
        // Scroll para cima
        header.classList.remove('hide');
    }
    
    // Limpa timeout anterior
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    // Se estiver no topo, mostra o header
    if (currentScroll <= 10) {
        header.classList.remove('hide');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    
    // Atualiza link ativo baseado no scroll
    updateActiveLink();
});

// ==================== LOGO - VOLTAR AO TOPO ====================
const logoContainer = document.querySelector('.logo-container');
if (logoContainer) {
    logoContainer.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== MENU MOBILE ====================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// ==================== NAVEGAÇÃO DOS LINKS ====================
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Fecha o menu mobile se estiver aberto
        if (navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Atualiza link ativo
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// ==================== ATUALIZAR LINK ATIVO BASEADO NO SCROLL ====================
function updateActiveLink() {
    const sections = ['books', 'digital', 'events', 'services', 'about'];
    let currentSection = '';
    
    for (let section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const offset = element.offsetTop - 100;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= offset && scrollPosition < offset + element.offsetHeight) {
                currentSection = section;
                break;
            }
        }
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.classList.add('active');
        }
    });
}

// ==================== BOTÃO DE SEARCH ====================
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        alert('🔍 Search functionality coming soon!\n\nWe are working on bringing you the best search experience.');
    });
}

// ==================== BOTÃO DE LOGIN ====================
const loginBtn = document.getElementById('memberLogin');
if (loginBtn) {
    loginBtn.addEventListener('click', function() {
        alert('🔐 Member Login\n\nThis feature is coming soon. Stay tuned!');
    });
}

// ==================== MODAL DOS LIVROS ====================
const bookCards = document.querySelectorAll('.book-card');
const modal = document.getElementById('bookModal');
const closeBtn = document.querySelector('.modal-close');
const modalImage = document.getElementById('modalBookImage');
const modalTitle = document.getElementById('modalBookTitle');
const modalAuthor = document.getElementById('modalBookAuthor');
const modalDescription = document.getElementById('modalBookDescription');

function openModal(bookId) {
    const book = booksData[bookId];
    if (book) {
        modalImage.src = book.image;
        modalTitle.textContent = book.title;
        modalAuthor.textContent = book.author;
        modalDescription.textContent = book.description;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Tratamento de erro de imagem
        modalImage.onerror = function() {
            this.src = 'https://via.placeholder.com/200x300/CCCCCC/666666?text=Book+Cover';
        };
    }
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Eventos dos cards
bookCards.forEach(card => {
    card.addEventListener('click', () => {
        const bookId = card.getAttribute('data-book');
        openModal(bookId);
    });
});

// Fechar modal ao clicar no X
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

// Fechar ao clicar fora do modal
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Fechar ao pressionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModal();
    }
});

// ==================== TRATAMENTO DE ERRO DE IMAGENS ====================
document.querySelectorAll('.book-image').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/300x400/CCCCCC/666666?text=Book+Cover';
    });
});

// ==================== NEWSLETTER SUBSCRIBE ====================
const newsletterBtn = document.querySelector('.newsletter-form button');
const newsletterInput = document.querySelector('.newsletter-form input');

if (newsletterBtn && newsletterInput) {
    newsletterBtn.addEventListener('click', function() {
        const email = newsletterInput.value.trim();
        if (email && email.includes('@')) {
            alert(`✅ Thanks for subscribing!\n\nWe'll send updates to: ${email}`);
            newsletterInput.value = '';
        } else {
            alert('⚠️ Please enter a valid email address.');
        }
    });
}

// ==================== ANIMAÇÃO DE SCROLL REVEAL ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplica animação para todos os cards
document.querySelectorAll('.book-card, .collection-card, .event-card, .service-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== FECHAR MENU AO CLICAR FORA (MOBILE) ====================
document.addEventListener('click', function(e) {
    if (navMenu && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ==================== PREVENIR SCROLL QUANDO MENU MOBILE ESTÁ ABERTO ====================
if (navMenu) {
    navMenu.addEventListener('touchmove', function(e) {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
}

// ==================== INICIALIZAÇÃO ====================
console.log('🚀 Bibliotech website loaded successfully!');