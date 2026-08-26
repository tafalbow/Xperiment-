/**
 * ============================================================
 * MATH TUG OF WAR - QUESTION GENERATOR
 * Generator Soal Matematika Otomatis Berjenjang SD (Kelas 1 - 6)
 * dengan 4 Pilihan Jawaban Pengecoh Cerdas dan Unik.
 * ============================================================
 */

class MathQuestionGenerator {
    constructor() {
        this.randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Helper membuat 4 pilihan jawaban acak yang unik & masuk akal
    buildChoices(correctVal, isNumeric = true) {
        const choices = new Set([correctVal.toString()]);

        if (isNumeric && typeof correctVal === 'number') {
            const offsets = [-1, 1, -2, 2, -5, 5, -10, 10, -3, 3, -4, 4];
            // Acak offsets
            offsets.sort(() => Math.random() - 0.5);

            for (const offset of offsets) {
                const fake = correctVal + offset;
                if (fake >= 0 && !choices.has(fake.toString())) {
                    choices.add(fake.toString());
                }
                if (choices.size === 4) break;
            }

            // Fallback jika belum cukup 4
            let counter = 1;
            while (choices.size < 4) {
                const fake = correctVal + counter * (Math.random() > 0.5 ? 1 : -1);
                if (fake >= 0) choices.add(fake.toString());
                counter++;
            }
        }

        const choicesArray = Array.from(choices);
        // Shuffle choices (Fisher-Yates)
        for (let i = choicesArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [choicesArray[i], choicesArray[j]] = [choicesArray[j], choicesArray[i]];
        }

        return choicesArray;
    }

    // --- LEVEL 1: KELAS 1 - 2 SD ---
    generateLevel1() {
        const type = this.randInt(1, 4);

        if (type === 1) {
            // Penjumlahan Dasar (Hasil <= 50)
            const a = this.randInt(1, 25);
            const b = this.randInt(1, 20);
            const ans = a + b;
            return {
                text: `${a} + ${b} = ?`,
                answer: ans.toString(),
                choices: this.buildChoices(ans),
                category: 'Penjumlahan'
            };
        } else if (type === 2) {
            // Pengurangan Dasar (Positif)
            const a = this.randInt(8, 40);
            const b = this.randInt(1, a - 1);
            const ans = a - b;
            return {
                text: `${a} - ${b} = ?`,
                answer: ans.toString(),
                choices: this.buildChoices(ans),
                category: 'Pengurangan'
            };
        } else if (type === 3) {
            // Pola Angka / Deret Sederhana
            const step = this.randInt(2, 5);
            const start = this.randInt(1, 10);
            const n1 = start;
            const n2 = start + step;
            const n3 = start + step * 2;
            const ans = start + step * 3;
            return {
                text: `${n1}, ${n2}, ${n3}, [ ? ]`,
                answer: ans.toString(),
                choices: this.buildChoices(ans),
                category: 'Pola Bilangan'
            };
        } else {
            // Soal Cerita Benda Lucu
            const items = ['🍎 Apel', '⭐ Bintang', '🐱 Kucing', '🍬 Permen', '🌸 Bunga'];
            const item = items[this.randInt(0, items.length - 1)];
            const a = this.randInt(3, 12);
            const b = this.randInt(2, 10);
            const isAdd = Math.random() > 0.4;
            if (isAdd) {
                const ans = a + b;
                return {
                    text: `${a} ${item} + ${b} ${item} = ?`,
                    answer: ans.toString(),
                    choices: this.buildChoices(ans),
                    category: 'Hitung Benda'
                };
            } else {
                const total = a + b;
                const ans = a;
                return {
                    text: `${total} ${item} - ${b} ${item} = ?`,
                    answer: ans.toString(),
                    choices: this.buildChoices(ans),
                    category: 'Hitung Benda'
                };
            }
        }
    }

    // --- LEVEL 2: KELAS 3 - 4 SD ---
    generateLevel2() {
        const type = this.randInt(1, 5);

        if (type === 1) {
            // Perkalian Dasar (Tabel 2 - 10)
            const a = this.randInt(2, 10);
            const b = this.randInt(3, 10);
            const ans = a * b;
            return {
                text: `${a} × ${b} = ?`,
                answer: ans.toString(),
                choices: this.buildChoices(ans),
                category: 'Perkalian'
            };
        } else if (type === 2) {
            // Pembagian Bersih
            const b = this.randInt(2, 9);
            const ans = this.randInt(2, 10);
            const a = b * ans;
            return {
                text: `${a} ÷ ${b} = ?`,
                answer: ans.toString(),
                choices: this.buildChoices(ans),
                category: 'Pembagian'
            };
        } else if (type === 3) {
            // Operasi 2 Langkah (+ dan ×)
            const a = this.randInt(2, 6);
            const b = this.randInt(2, 6);
            const c = this.randInt(3, 15);
            const ans = (a * b) + c;
            return {
                text: `${a} × ${b} + ${c} = ?`,
                answer: ans.toString(),
                choices: this.buildChoices(ans),
                category: 'Operasi Campuran'
            };
        } else if (type === 4) {
            // Konversi Waktu Sederhana
            const subType = this.randInt(1, 3);
            if (subType === 1) {
                const hours = this.randInt(2, 5);
                const ans = hours * 60;
                return {
                    text: `${hours} Jam = ? Menit`,
                    answer: ans.toString(),
                    choices: this.buildChoices(ans),
                    category: 'Satuan Waktu'
                };
            } else if (subType === 2) {
                const mins = this.randInt(2, 5);
                const ans = mins * 60;
                return {
                    text: `${mins} Menit = ? Detik`,
                    answer: ans.toString(),
                    choices: this.buildChoices(ans),
                    category: 'Satuan Waktu'
                };
            } else {
                const days = this.randInt(2, 4);
                const ans = days * 7;
                return {
                    text: `${days} Minggu = ? Hari`,
                    answer: ans.toString(),
                    choices: this.buildChoices(ans),
                    category: 'Satuan Waktu'
                };
            }
        } else {
            // Operasi Pengurangan & Tambah Puluhan
            const a = this.randInt(30, 90);
            const b = this.randInt(15, 30);
            const c = this.randInt(5, 20);
            const ans = a - b + c;
            return {
                text: `${a} - ${b} + ${c} = ?`,
                answer: ans.toString(),
                choices: this.buildChoices(ans),
                category: 'Operasi Hitung'
            };
        }
    }

    // --- LEVEL 3: KELAS 5 - 6 SD ---
    generateLevel3() {
        const type = this.randInt(1, 5);

        if (type === 1) {
            // Operasi Campuran Tanda Kurung (Kabataku)
            const isBracketFirst = Math.random() > 0.5;
            if (isBracketFirst) {
                const a = this.randInt(3, 10);
                const b = this.randInt(2, 8);
                const c = this.randInt(2, 6);
                const ans = (a + b) * c;
                return {
                    text: `(${a} + ${b}) × ${c} = ?`,
                    answer: ans.toString(),
                    choices: this.buildChoices(ans),
                    category: 'Kabataku Kurung'
                };
            } else {
                const a = this.randInt(15, 40);
                const b = this.randInt(2, 6);
                const c = this.randInt(3, 7);
                const ans = a + (b * c);
                return {
                    text: `${a} + ${b} × ${c} = ?`,
                    answer: ans.toString(),
                    choices: this.buildChoices(ans),
                    category: 'Prioritas Operasi'
                };
            }
        } else if (type === 2) {
            // Pecahan Sederhana
            const fracPairs = [
                { q: '1/2 + 1/4', a: '3/4', choices: ['3/4', '2/6', '1/4', '1'] },
                { q: '1/2 + 1/2', a: '1', choices: ['1', '2/4', '1/4', '2'] },
                { q: '3/4 - 1/2', a: '1/4', choices: ['1/4', '2/2', '1/2', '2/4'] },
                { q: '1/3 + 1/3', a: '2/3', choices: ['2/3', '2/6', '1/6', '1'] },
                { q: '1 - 1/4', a: '3/4', choices: ['3/4', '1/4', '2/4', '0'] },
                { q: '1/2 × 8', a: '4', choices: ['4', '16', '2', '8'] },
                { q: '1/3 × 12', a: '4', choices: ['4', '36', '3', '6'] }
            ];
            const chosen = fracPairs[this.randInt(0, fracPairs.length - 1)];
            // Shuffle
            const shChoices = [...chosen.choices].sort(() => Math.random() - 0.5);
            return {
                text: `${chosen.q} = ?`,
                answer: chosen.a,
                choices: shChoices,
                category: 'Pecahan'
            };
        } else if (type === 3) {
            // Persentase & Desimal Sederhana
            const percentPairs = [
                { pct: 50, val: 80, a: 40 },
                { pct: 50, val: 120, a: 60 },
                { pct: 25, val: 40, a: 10 },
                { pct: 25, val: 100, a: 25 },
                { pct: 10, val: 150, a: 15 },
                { pct: 10, val: 200, a: 20 },
                { pct: 100, val: 75, a: 75 }
            ];
            const p = percentPairs[this.randInt(0, percentPairs.length - 1)];
            return {
                text: `${p.pct}% dari ${p.val} = ?`,
                answer: p.a.toString(),
                choices: this.buildChoices(p.a),
                category: 'Persentase'
            };
        } else if (type === 4) {
            // FPB / KPK Sederhana
            const kpkPairs = [
                { q: 'KPK dari 3 dan 4', a: 12 },
                { q: 'KPK dari 2 dan 5', a: 10 },
                { q: 'KPK dari 4 dan 6', a: 12 },
                { q: 'KPK dari 3 dan 5', a: 15 },
                { q: 'FPB dari 8 dan 12', a: 4 },
                { q: 'FPB dari 10 dan 15', a: 5 },
                { q: 'FPB dari 12 dan 18', a: 6 },
                { q: 'FPB dari 14 dan 21', a: 7 }
            ];
            const pair = kpkPairs[this.randInt(0, kpkPairs.length - 1)];
            return {
                text: `${pair.q} = ?`,
                answer: pair.a.toString(),
                choices: this.buildChoices(pair.a),
                category: 'KPK & FPB'
            };
        } else {
            // Geometri Dasar (Keliling / Luas Persegi & Persegi Panjang)
            const isPerimeter = Math.random() > 0.5;
            if (isPerimeter) {
                const s = this.randInt(4, 12);
                const ans = 4 * s;
                return {
                    text: `Keliling Persegi (Sisi ${s} cm) = ?`,
                    answer: `${ans} cm`,
                    choices: this.buildChoices(ans).map(x => `${x} cm`),
                    category: 'Geometri'
                };
            } else {
                const p = this.randInt(4, 9);
                const l = this.randInt(2, 6);
                const ans = p * l;
                return {
                    text: `Luas Persegi Panjang (${p} × ${l}) = ?`,
                    answer: `${ans} cm²`,
                    choices: this.buildChoices(ans).map(x => `${x} cm²`),
                    category: 'Geometri'
                };
            }
        }
    }

    // Generator Utama Berdasarkan Level
    getQuestion(level = 1) {
        if (level === 1) return this.generateLevel1();
        if (level === 2) return this.generateLevel2();
        if (level === 3) return this.generateLevel3();

        // Level All-Star (Campuran)
        const rnd = this.randInt(1, 3);
        if (rnd === 1) return this.generateLevel1();
        if (rnd === 2) return this.generateLevel2();
        return this.generateLevel3();
    }
}

// Instance global
const mathGen = new MathQuestionGenerator();
