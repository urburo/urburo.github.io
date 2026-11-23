// Номер для заявок (WhatsApp). Замените при необходимости.
const WA = '79120789237';
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav'), burger = document.querySelector('.burger');
  burger?.addEventListener('click', () => { const o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  // вкладки услуг
  document.querySelectorAll('.tab').forEach(t => t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.setAttribute('aria-selected', x === t));
    document.querySelectorAll('[data-panel]').forEach(p => p.hidden = p.dataset.panel !== t.dataset.tab);
  }));

  // модальное окно
  const modal = document.getElementById('modal');
  const topic = document.getElementById('m-topic');
  const open = (subj) => { modal.classList.add('open'); if (topic) topic.value = subj || ''; modal.querySelector('input[name=name]').focus(); };
  const close = () => modal.classList.remove('open');
  document.querySelectorAll('[data-modal]').forEach(b => b.addEventListener('click', e => { e.preventDefault(); open(b.dataset.modal); }));
  document.querySelectorAll('.svc[data-modal]').forEach(c => c.addEventListener('keydown', e => { if (e.key === 'Enter') open(c.dataset.modal); }));
  modal?.addEventListener('click', e => { if (e.target === modal || e.target.closest('.close')) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // отправка заявки: открывает WhatsApp с готовым текстом
  document.querySelectorAll('form.form').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(f);
    const lines = ['Заявка с сайта Бюро Юридической Помощи', 'Имя: ' + (d.get('name') || ''), 'Телефон: ' + (d.get('phone') || '')];
    if (d.get('topic')) lines.push('Тема: ' + d.get('topic'));
    if (d.get('msg')) lines.push('Ситуация: ' + d.get('msg'));
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(lines.join('\n')), '_blank');
    f.reset(); close();
  }));
});
