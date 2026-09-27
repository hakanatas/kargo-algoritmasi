/* SAHNE 1 — KARGO (0–10 s)  İlk 2 kg 40 TL, sonrası kilogramı 12 TL.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const fr = (n, d, h) => F().fr(n, d, h);
  const neg = (s) => s.replace('-', '−');
  const label = (v) => (v < 0 ? neg(String(v)) : String(v));

  /** rows of working at P; each [t0, t1, i, items, hot, tick, cross] */
  function rows(ctx, P, list, t, s, W) {
    const f = F();
    list.forEach(([t0, t1, i, items, hot, tick, cross]) => {
      const k = win(t, t0, t1); if (k <= 0) return;
      const y = P.y0 + i * P.dy;
      f.expr(ctx, items, P.x, y, s * 0.86, { alpha: k, halo: true, color: hot ? A.amber : undefined, w: W });
      if (tick) f.tick(ctx, P.x + tick, y - 6, seg(t, t0 + 0.4, t0 + 1.0), k);
      if (cross) f.crossInk(ctx, P.x + cross, y, 18, seg(t, t0 + 0.4, t0 + 1.2), k);
    });
  }

  /** a flowchart node: kind 'oval' | 'io' | 'box' | 'dia' */
  function node(ctx, kind, x, y, txt, s, a, hot, seed) {
    if (a <= 0) return;
    const f = F(), w = Math.max(f.width(ctx, txt, s) + 50, kind === 'dia' ? 190 : 150), h = kind === 'dia' ? 78 : 50, col = hot ? LI.AMBER_RGB : undefined;
    let P;
    if (kind === 'dia') P = [[x, y - h / 2], [x + w / 2, y], [x, y + h / 2], [x - w / 2, y], [x, y - h / 2]];
    else if (kind === 'io') P = [[x - w / 2 + 14, y - h / 2], [x + w / 2 + 14, y - h / 2], [x + w / 2 - 14, y + h / 2], [x - w / 2 - 14, y + h / 2], [x - w / 2 + 14, y - h / 2]];
    else if (kind === 'oval') { P = []; for (let i = 0; i <= 28; i++) { const u = i / 28 * Math.PI * 2; P.push([x + w / 2 * Math.cos(u), y + h / 2 * Math.sin(u)]); } }
    else P = [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2], [x + w / 2, y + h / 2], [x - w / 2, y + h / 2], [x - w / 2, y - h / 2]];
    ctx.fillStyle = hot ? amber(0.22 * a) : `rgba(255,252,244,${0.8 * a})`;
    ctx.beginPath(); P.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fill();
    Ink.path(ctx, P, { w: 3.5, alpha: a, seed, taper: [0, 0], color: col });
    f.T(ctx, txt, x, y, { size: s, alpha: a, color: hot ? A.amber : undefined });
  }
  function arrow(ctx, P, a, hot, seed, lab, s) {
    if (a <= 0) return;
    const col = hot ? LI.AMBER_RGB : undefined, q = P[P.length - 1], p = P[P.length - 2], d = Math.atan2(q[1] - p[1], q[0] - p[0]);
    Ink.path(ctx, P, { w: 3, alpha: a, seed, taper: [0, 0], color: col });
    Ink.path(ctx, [[q[0] - 14 * Math.cos(d - 0.45), q[1] - 14 * Math.sin(d - 0.45)], q, [q[0] - 14 * Math.cos(d + 0.45), q[1] - 14 * Math.sin(d + 0.45)]], { w: 3, alpha: a, seed: seed + 50, taper: [0, 0], color: col });
    if (lab) F().T(ctx, lab, (P[0][0] + P[1][0]) / 2, P[0][1] - 20, { size: s * 0.6, alpha: a, color: hot ? A.amber : undefined });
  }
  /** the whole flowchart; path: 'yes' | 'no' | null lights the route taken */
  function flow(ctx, C, a, s, t, path, grow) {
    if (a <= 0) return;
    const S = s * 0.62 * C.s, Y = C.y, x = C.x, L = x - C.dx, R = x + C.dx;
    const k = (i) => a * seg(grow, i / 7, (i + 1) / 7);
    const on = (w) => path && (w === 'all' || w === path);
    node(ctx, 'oval', x, Y[0], 'Başla', S, k(0), on('all'), 9700);
    arrow(ctx, [[x, Y[0] + 25], [x, Y[1] - 25]], k(1), on('all'), 9710);
    node(ctx, 'io', x, Y[1], 'w’yi al (kg)', S, k(1), on('all'), 9701);
    arrow(ctx, [[x, Y[1] + 25], [x, Y[2] - 39]], k(2), on('all'), 9711);
    node(ctx, 'dia', x, Y[2], 'w ≤ 2 mi?', S, k(2), on('all'), 9702);
    arrow(ctx, [[x - 95, Y[2]], [L, Y[2]], [L, Y[3] - 25]], k(3), on('yes'), 9712, 'evet', s);
    arrow(ctx, [[x + 95, Y[2]], [R, Y[2]], [R, Y[3] - 25]], k(3), on('no'), 9713, 'hayır', s);
    node(ctx, 'box', L, Y[3], 'ücret = 40', S, k(4), on('yes'), 9703);
    node(ctx, 'box', R, Y[3], 'ücret = 40 + 12 · (w − 2)', S, k(4), on('no'), 9704);
    arrow(ctx, [[L, Y[3] + 25], [L, Y[4]], [x - 110, Y[4]]], k(5), on('yes'), 9714);
    arrow(ctx, [[R, Y[3] + 25], [R, Y[4]], [x + 110, Y[4]]], k(5), on('no'), 9715);
    node(ctx, 'io', x, Y[4], 'ücreti yaz', S, k(5), on('all'), 9705);
    arrow(ctx, [[x, Y[4] + 25], [x, Y[5] - 25]], k(6), on('all'), 9716);
    node(ctx, 'oval', x, Y[5], 'Bitir', S, k(6), on('all'), 9706);
  }
  /** numbered steps, left-aligned */
  function steps(ctx, P, list, t, t0, dt, a, s, hot) {
    if (a <= 0) return;
    const f = F();
    list.forEach((txt, i) => { const k = seg(t, t0 + i * dt, t0 + i * dt + 0.4) * a; if (k > 0) f.T(ctx, `${i + 1}. ${txt}`, P.x, P.y0 + i * P.dy, { size: s * 0.82, alpha: k, align: 'left', halo: true, color: hot === i ? A.amber : undefined }); });
  }
  const STEPS = ['Başla.', 'Paketin ağırlığını al: w kg.', 'w ≤ 2 ise ücret = 40 TL.', 'Değilse ücret = 40 + 12 · (w − 2) TL.', 'Ücreti yaz.', 'Bitir.'];

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Kargo ücreti: ilk 2 kg 40 TL, sonraki her kg 12 TL'],
      [10.6, 27.8, 'Adımları ve ilişkileri açıklayalım'],
      [28.4, 45.8, 'Aynı adımlar her paket için işler mi?'],
      [46.4, 63.8, 'Algoritmayı adım adım yazalım'],
      [64.4, 79.8, 'Akış şeması: aynı algoritma, şekillerle'],
    ]);
  }

  function figure(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t), s = L.G.s, P = L.PN, V = env.V, WW = V ? 900 : 1000;
    rows(ctx, P, [[5.0, 10.2, 0, ['2 kg’a kadar: 40 TL']], [5.8, 10.2, 1, ['2 kg’dan sonra: her kg için 12 TL']], [7.4, 10.2, 2, ['5 kg’lık paket kaç TL?'], true]], t, s * 1.05, WW);
    // 10–28: the steps for 5 kg
    rows(ctx, P, [[11.4, 27.8, 0, ['Fazla ağırlık: 5 − 2 = 3 kg']], [13.0, 27.8, 1, ['Fazlanın ücreti: 3 · 12 = 36 TL']], [14.6, 27.8, 2, ['Toplam: 40 + 36 = 76 TL'], true],
      [18.4, 27.8, 3, ['İlişki: ücret = 40 + 12 · (w − 2)']]], t, s, WW);
    // 28–46: the formula fails for 1.5 kg
    rows(ctx, P, [[29.4, 45.8, 0, ['w = 1,5 kg: 40 + 12 · (1,5 − 2) = 40 − 6 = 34 TL ?'], false, 0, V ? 460 : 500], [32.6, 45.8, 1, ['Ama 2 kg’a kadar ücret 40 TL olmalı']],
      [36.4, 45.8, 2, ['Bir karar adımı gerekiyor: w ≤ 2 mi?'], true], [39.4, 45.8, 3, ['w = 1,5 → 40 TL · w = 5 → 76 TL'], false, V ? 360 : 380]], t, s, WW);
    // 46–64: numbered steps
    steps(ctx, L.PS, STEPS, t, 47.2, 1.0, win(t, 46.8, 63.8) * a, s, t > 54 ? 2 : -1);
    // 64–80: the flowchart, traced for 5 kg then for 1.5 kg
    const fc = win(t, 64.8, 79.8) * a, path = t < 69.4 ? null : t < 73.4 ? 'no' : 'yes';
    flow(ctx, L.FC, fc, s, t, path, seg(t, 65.0, 68.6));
    if (fc > 0 && path) f.T(ctx, path === 'no' ? 'w = 5 → 76 TL' : 'w = 1,5 → 40 TL', L.FC.x + (V ? 0 : -500), V ? -250 : -216, { size: s * 0.85, alpha: fc * seg(t, path === 'no' ? 69.4 : 73.4, path === 'no' ? 69.8 : 73.8), color: A.amber, halo: true });
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[6.4, 10.2, 'Aritmetik adımlar: çıkar, çarp, topla'], [11.4, 27.8, 'Önce fazlayı bul, sonra fazlanın ücretini, en son toplamı'],
      [29.4, 45.8, '1,5 kg’lık paket için aynı adımları deneyelim'], [47.4, 63.8, 'Sırayla: girdi, karar, işlem, çıktı'],
      [65.4, 79.8, 'Oval: başla/bitir · paralelkenar: girdi/çıktı · eşkenar dörtgen: karar']]);
    exprs(ctx, t, at(W, 1), [[16.4, 27.8, 'Adımlar arasındaki ilişki tek bir cebirsel ifadede birleşiyor'], [33.4, 45.8, 'Formül her ağırlık için doğru değil: 2 kg’dan hafifler ayrı'],
      [52.0, 63.8, 'Her adım bir öncekinin sonucunu kullanır'], [69.4, 79.8, '5 kg “hayır” yolundan, 1,5 kg “evet” yolundan geçer']]);
    exprs(ctx, t, at(W, 2), [[8.8, 10.2, 'Hesabı adım adım yazalım', true], [21.0, 27.8, '5 kg’lık paket 76 TL', true],
      [41.6, 45.8, 'Karar adımı algoritmayı her ağırlık için doğru yapar', true],
      [57.0, 63.8, 'Algoritma: bir işi yapan, sıralı ve açık adımlar', true],
      [75.0, 79.8, 'Adım listesi ve akış şeması aynı algoritmayı anlatır', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Adımları ve ilişkileri açıkla', 80.6], ['Her girdi için dene, gerekirse karar ekle', 81.6], ['Adım listesi ya da akış şeması ile yaz', 82.6], ['Algoritma: sıralı, açık, eksiksiz!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.1 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); figure(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'A parcel', nameTr: 'Kargo', concept: '40 TL up to 2 kg', conceptTr: '2 kg’a kadar 40 TL', render });
})(window.LI = window.LI || {});
