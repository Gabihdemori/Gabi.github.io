document.addEventListener('DOMContentLoaded', function() {
  // Menu mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
    this.querySelector('i').classList.toggle('fa-bars');
  });
  
  // Fechar menu ao clicar em um link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.querySelector('i').classList.remove('fa-times');
        menuToggle.querySelector('i').classList.add('fa-bars');
      }
      
      // Ativar link clicado
      navLinks.forEach(item => item.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Header scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Animar barras de progresso quando a seção é visível
  const progressBars = document.querySelectorAll('.progress');
  
  function animateProgressBars() {
    progressBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      if (isElementInViewport(bar) && !bar.style.width) {
        bar.style.width = width + '%';
      }
    });
  }
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Verificar barras de progresso ao carregar e ao rolar
  animateProgressBars();
  window.addEventListener('scroll', animateProgressBars);
  
  // Smooth scroll para links internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Ativar link ativo conforme rolagem
  const sections = document.querySelectorAll('section');
  
  function activateMenuOnScroll() {
    let fromTop = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionId = section.getAttribute('id');
      const sectionLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        sectionLink.classList.add('active');
      } else {
        sectionLink.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', activateMenuOnScroll);
  activateMenuOnScroll(); // Ativar ao carregar
  
  // Formulário de contato
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simular envio (substituir por código real)
      const formData = new FormData(this);
      const formValues = Object.fromEntries(formData.entries());
      
      console.log('Formulário enviado:', formValues);
      
      // Feedback visual
      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.innerHTML = '<i class="fas fa-check"></i> Enviado!';
      submitButton.disabled = true;
      
      // Resetar após 3 segundos
      setTimeout(() => {
        this.reset();
        submitButton.innerHTML = 'Enviar Mensagem';
        submitButton.disabled = false;
      }, 3000);
    });
  }
  
  // Formulário de newsletter
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      console.log('Email cadastrado:', emailInput.value);
      
      // Feedback visual
      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.innerHTML = '<i class="fas fa-check"></i>';
      
      // Resetar após 3 segundos
      setTimeout(() => {
        emailInput.value = '';
        submitButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
      }, 3000);
    });
  }
  
  // Animação de elementos quando entram na viewport
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.timeline-item, .project-card, .tcc-content, .info-item');
    
    elements.forEach(element => {
      if (isElementInViewport(element)) {
        element.classList.add('animate');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Verificar ao carregar
});