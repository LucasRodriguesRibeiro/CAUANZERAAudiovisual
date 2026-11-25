/* ==========================================================================
   CAUANZERA — INTERAÇÕES & CONFIGURAÇÃO FÁCIL DO PORTFÓLIO
   Basta preencher os links das redes sociais e os vídeos abaixo quando quiser.
   ========================================================================== */

const PORTFOLIO_CONFIG = {
  socials: {
    whatsapp: 'https://wa.me/',
    behance: 'https://www.behance.net/',
    tiktok: 'https://www.tiktok.com/',
    youtube: 'https://www.youtube.com/',
  },
  featured: {
    title: 'Showreel — Cauanzera',
    image: 'assets/moto-preview.png',
    videoUrl: '', // Ex: 'assets/videos/showreel.mp4'
  },
  // Adicione aqui os vídeos 9:16 (mp4) ou imagens dos 5 projetos verticais:
  reels: [
    { title: 'PROJETO 01', videoUrl: '', posterUrl: '' },
    { title: 'PROJETO 02', videoUrl: '', posterUrl: '' },
    { title: 'PROJETO 03', videoUrl: '', posterUrl: '' },
    { title: 'PROJETO 04', videoUrl: '', posterUrl: '' },
    { title: 'PROJETO 05', videoUrl: '', posterUrl: '' },
  ],
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Aplica os links configurados nas redes sociais
  document.querySelectorAll('[data-social]').forEach((el) => {
    const key = el.getAttribute('data-social');
    if (key && PORTFOLIO_CONFIG.socials[key]) {
      el.setAttribute('href', PORTFOLIO_CONFIG.socials[key]);
    }
  });

  // 2. Popula automaticamente os 5 cards verticais se houver vídeo/imagem configurado
  const reelButtons = document.querySelectorAll('.reel-card');
  reelButtons.forEach((btn, idx) => {
    const item = PORTFOLIO_CONFIG.reels[idx];
    if (!item) return;

    if (item.videoUrl) {
      const video = document.createElement('video');
      video.src = item.videoUrl;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      if (item.posterUrl) video.poster = item.posterUrl;
      btn.appendChild(video);
    } else if (item.posterUrl) {
      const img = document.createElement('img');
      img.src = item.posterUrl;
      img.alt = item.title;
      btn.appendChild(img);
    }

    btn.addEventListener('click', () => openReelModal(item));
  });

  // 3. Modal Lightbox para o vídeo/foto em destaque e para os 5 reels
  const modal = document.getElementById('mediaModal');
  const modalBody = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalCloseBtn');
  const featuredBtn = document.getElementById('featuredPreviewBtn');

  function openModal(contentEl) {
    modalBody.innerHTML = '';
    modalBody.appendChild(contentEl);
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.hidden = true;
    modalBody.innerHTML = '';
    document.body.style.overflow = '';
  }

  function openReelModal(item) {
    if (item.videoUrl) {
      const video = document.createElement('video');
      video.src = item.videoUrl;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      openModal(video);
    } else if (item.posterUrl) {
      const img = document.createElement('img');
      img.src = item.posterUrl;
      img.alt = item.title;
      openModal(img);
    } else {
      const box = document.createElement('div');
      box.className = 'modal-placeholder';
      box.innerHTML = `
        <h3>${item.title}</h3>
        <p>Espaço pronto para vídeo vertical (9:16).<br />Adicione o arquivo em <code>script.js</code> para exibir seu projeto aqui.</p>
      `;
      openModal(box);
    }
  }

  if (featuredBtn) {
    featuredBtn.addEventListener('click', () => {
      if (PORTFOLIO_CONFIG.featured.videoUrl) {
        const video = document.createElement('video');
        video.src = PORTFOLIO_CONFIG.featured.videoUrl;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        openModal(video);
      } else {
        const img = document.createElement('img');
        img.src = PORTFOLIO_CONFIG.featured.image;
        img.alt = PORTFOLIO_CONFIG.featured.title;
        openModal(img);
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hidden) {
      closeModal();
    }
  });

  // 4. Scroll suave explícito no botão CONHEÇA MEUS SERVIÇOS
  const ctaBtn = document.getElementById('ctaServicesBtn');
  const servicesSection = document.getElementById('servicos');
  if (ctaBtn && servicesSection) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
