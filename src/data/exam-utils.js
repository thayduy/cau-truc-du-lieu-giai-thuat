export function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function normalizeFill(s) {
  return String(s ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '')
    .replace(/[−–—]/g, '-')
    .replace(/²/g, '2')
    .replace(/³/g, '3')
    .replace(/θ|Θ|ϴ/g, 'theta')
    .replace(/ω|Ω/g, 'omega')
    .replace(/log₂/g, 'log2')
    .replace(/×/g, '*')
    .replace(/lg/g, 'log');
}

export function mixQuestions(bank, figureById = {}) {
  return shuffle(bank).map((q) => {
    const type = q.type || 'single';
    const figure = q.figure || figureById[q.id];
    if (type === 'fill' || !q.options) {
      return {...q, type, figure};
    }
    const order = shuffle(q.options.map((_, i) => i));
    const remap = (idx) => order.indexOf(idx);
    return {
      ...q,
      type,
      figure,
      options: order.map((i) => q.options[i]),
      answer: type === 'multi' ? q.answer.map(remap) : remap(q.answer),
    };
  });
}

export function isAnswered(q, pick) {
  const type = q?.type || 'single';
  if (type === 'fill') return String(pick ?? '').trim() !== '';
  if (type === 'multi') return Array.isArray(pick) && pick.length > 0;
  return pick != null && pick !== '';
}

export function computeStats(items, picks, diemMoiCau) {
  let correct = 0;
  const byChap = {1: {ok: 0, total: 0}, 2: {ok: 0, total: 0}, 3: {ok: 0, total: 0}, 4: {ok: 0, total: 0}};
  items.forEach((q, i) => {
    byChap[q.chapter].total += 1;
    if (isCorrect(q, picks[i])) {
      correct += 1;
      byChap[q.chapter].ok += 1;
    }
  });
  const score = Math.round(correct * diemMoiCau * 10) / 10;
  return {correct, score, byChap};
}

export function isCorrect(q, pick) {
  const type = q?.type || 'single';
  if (type === 'fill') {
    const got = normalizeFill(pick);
    const list = q.accept?.length ? q.accept : [q.answer];
    return list.some((x) => normalizeFill(x) === got);
  }
  if (type === 'multi') {
    const a = [...(q.answer || [])].sort((x, y) => x - y).join(',');
    const b = [...(pick || [])].sort((x, y) => x - y).join(',');
    return a === b && a.length > 0;
  }
  return pick === q.answer;
}
