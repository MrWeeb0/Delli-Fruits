(() => {
  'use strict';
  const $ = (s, parent = document) => parent.querySelector(s);
  const $$ = (s, parent = document) => [...parent.querySelectorAll(s)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reducedMotion) {
    document.body.classList.add('js-motion');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    $$('.reveal').forEach(el => observer.observe(el));
  }
  $('#year').textContent = new Date().getFullYear();
  const menu = $('.menu-button');
  const mobileNav = $('#mobile-nav');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    menu.setAttribute('aria-label', open ? 'Deschide meniul' : 'Închide meniul');
    mobileNav.hidden = open;
  });
  $$('#mobile-nav a').forEach(link => link.addEventListener('click', () => {
    mobileNav.hidden = true; menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Deschide meniul');
  }));
  $$('.filter').forEach(filter => filter.addEventListener('click', () => {
    $$('.filter').forEach(el => { el.classList.toggle('active', el === filter); el.setAttribute('aria-pressed', String(el === filter)); });
    $$('.product-card').forEach(card => { card.hidden = filter.dataset.filter !== 'all' && card.dataset.category !== filter.dataset.filter; });
  }));
  const recommendations = {
    mine: { label: 'Pentru mine', title: 'O pauză cu gust de vacanță.', description: 'O cutie cu fructe exotice, doar pentru tine. Descoperă gusturi noi și transformă o zi obișnuită într-un mic ritual.', product: 'Cutia cu fructe exotice' },
    drag: { label: 'Pentru cineva drag', title: 'Un „m-am gândit la tine”, cu gust.', description: 'Un cadou personalizat cu fructe și delicii. Povestește-ne despre persoana dragă, iar echipa Delli te ajută să alegi o combinație pe gustul ei.', product: 'Cadoul personalizat' },
    echipa: { label: 'Pentru echipă', title: 'Bucuria e mai bună împreună.', description: 'Cutii cu fructe sau cadouri pentru colegi și parteneri. Discutăm numărul de persoane, ocazia și bugetul, pentru o surpriză care aduce echipa mai aproape.', product: 'Cadouri pentru echipă' }
  };
  let recipient = 'mine';
  let giftSize = 'Un mic răsfăț';
  $$('.recipient').forEach(button => button.addEventListener('click', () => {
    recipient = button.dataset.recipient;
    $$('.recipient').forEach(el => { el.classList.toggle('selected', el === button); el.setAttribute('aria-pressed', String(el === button)); });
    const choice = recommendations[recipient];
    $('#recommendation-title').textContent = choice.title;
    $('#recommendation-description').textContent = choice.description;
    $('#summary-recipient').textContent = choice.label;
  }));
  $$('.size-choice').forEach(button => button.addEventListener('click', () => {
    giftSize = button.dataset.size;
    $$('.size-choice').forEach(el => { el.classList.toggle('selected', el === button); el.setAttribute('aria-pressed', String(el === button)); });
    $('#summary-size').textContent = giftSize;
  }));
  let previousFocus;
  const dialogs = $$('dialog');
  function openDialog(dialog) {
    previousFocus = document.activeElement;
    dialog.showModal();
    document.body.classList.add('modal-open');
  }
  function closeDialog(dialog) { dialog.close(); }
  dialogs.forEach(dialog => {
    $('.dialog-close', dialog).addEventListener('click', () => closeDialog(dialog));
    dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(dialog); } });
    dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); previousFocus?.focus(); });
  });
  const form = $('#gift-form');
  const result = $('#message-result');
  let fromBuilder = false;
  function openGift(product, builder = false) {
    fromBuilder = builder;
    $('#gift-selection').value = product;
    form.hidden = false; result.hidden = true;
    openDialog($('#gift-dialog'));
  }
  $$('[data-product]').forEach(button => button.addEventListener('click', () => openGift(button.dataset.product)));
  $('#customize-gift').addEventListener('click', () => openGift(recommendations[recipient].product, true));
  $('#preview-info').addEventListener('click', () => openDialog($('#info-dialog')));
  form.addEventListener('submit', event => {
    event.preventDefault();
    const note = $('#gift-note').value.trim();
    const message = [
      'Bună, Delli Fruits! Aș vrea să discutăm despre: ' + $('#gift-selection').value + '.',
      fromBuilder ? 'Destinatar: ' + recommendations[recipient].label + '. Ideea mea: ' + giftSize + '.' : '',
      'Ocazia: ' + $('#gift-occasion').value + '.',
      note ? 'Detalii: ' + note : '',
      'Îmi puteți spune ce opțiuni aveți, prețul și detaliile de livrare? Mulțumesc!'
    ].filter(Boolean).join('\n\n');
    $('#prepared-message').value = message;
    $('#whatsapp-draft').href = 'https://wa.me/37368434356?text=' + encodeURIComponent(message);
    form.hidden = true; result.hidden = false;
    $('#prepared-message').focus();
    $('#prepared-message').setSelectionRange(0, 0);
    $('#prepared-message').scrollTop = 0;
  });
  $('#edit-message').addEventListener('click', () => { form.hidden = false; result.hidden = true; $('#gift-selection').focus(); });
  let toastTimer;
  function toast(message) { $('#toast').textContent = message; $('#toast').classList.add('visible'); clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3000); }
  $('#copy-message').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText($('#prepared-message').value); toast('Mesaj copiat. Un zâmbet e pe drum.'); }
    catch { $('#prepared-message').focus(); $('#prepared-message').select(); toast('Selectează și copiază mesajul.'); }
  });
})();
