/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 7. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'İlk 2 kg 40 TL, sonrası kg başı 12 TL', en: '40 TL up to 2 kg, then 12 TL a kg',
      note: 'Bir kargo şirketi 2 kilograma kadar 40 lira alıyor; 2 kilogramdan sonraki her kilogram için 12 lira ekliyor. 5 kilogramlık paket kaç lira?' },
    { scene: 2, start: 10.8, end: 20.6, tr: '5 − 2 = 3, 3 · 12 = 36, 40 + 36 = 76', en: '5 − 2 = 3, 3 · 12 = 36, 40 + 36 = 76',
      note: 'Adımları açıklayalım: önce fazla ağırlığı bul, 5 eksi 2, 3 kilogram. Fazlanın ücreti 3 çarpı 12, 36 lira. Toplam 40 artı 36, 76 lira. Bu adımlar tek bir ifadede birleşir: 40 artı 12 çarpı w eksi 2.' },
    { scene: 2, start: 21.0, end: 27.8, tr: '5 kg: 76 TL', en: '5 kg: 76 TL',
      note: '5 kilogramlık paket 76 lira.' },
    { scene: 3, start: 28.6, end: 36.0, tr: '1,5 kg: 34 TL? Olmaz', en: '1.5 kg: 34 TL? No',
      note: 'Aynı adımları 1,5 kilogram için deneyelim: 40 artı 12 çarpı 1,5 eksi 2, yani 34 lira. Ama 2 kilograma kadar ücret 40 lira olmalı. Formül her ağırlık için doğru değil.' },
    { scene: 3, start: 36.4, end: 45.8, tr: 'Bir karar adımı: w ≤ 2 mi?', en: 'A decision step: is w ≤ 2?',
      note: 'Bir karar adımı gerekiyor: ağırlık 2 kilogram ya da daha az mı? Evetse 40 lira, değilse formül. Karar adımı algoritmayı her ağırlık için doğru yapar.' },
    { scene: 4, start: 46.6, end: 56.6, tr: 'Adım adım algoritma', en: 'The algorithm, step by step',
      note: 'Algoritmayı adım adım yazalım: başla; ağırlığı al; w 2’den küçük ya da eşitse ücret 40; değilse ücret 40 artı 12 çarpı w eksi 2; ücreti yaz; bitir.' },
    { scene: 4, start: 57.0, end: 63.8, tr: 'Sıralı ve açık adımlar', en: 'Ordered, clear steps',
      note: 'Algoritma, bir işi yapan sıralı ve açık adımlardır. Her adım bir öncekinin sonucunu kullanır.' },
    { scene: 5, start: 64.6, end: 74.6, tr: 'Akış şeması: iki yol', en: 'A flowchart: two paths',
      note: 'Aynı algoritmayı akış şemasıyla çizelim. Oval başla ve bitir, paralelkenar girdi ve çıktı, eşkenar dörtgen karar. 5 kilogram hayır yolundan geçer: 76 lira. 1,5 kilogram evet yolundan: 40 lira.' },
    { scene: 5, start: 75.0, end: 79.8, tr: 'Liste ve şema aynı algoritma', en: 'The list and the chart: one algorithm',
      note: 'Adım listesi ve akış şeması aynı algoritmayı anlatır.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Açıkla, dene, karar ekle, yaz', en: 'Explain, test, add a decision, write',
      note: 'Aklında kalsın: adımları ve ilişkileri açıkla, her girdi için dene, gerekirse karar adımı ekle, adım listesi ya da akış şemasıyla yaz.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Sıralı, açık, eksiksiz!', en: 'Ordered, clear, complete!',
      note: 'Algoritma sıralı, açık ve eksiksiz olmalı!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
