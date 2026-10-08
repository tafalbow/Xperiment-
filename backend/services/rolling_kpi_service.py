"""
Rolling KPI Service: 8 Key High-Frequency & Market Indicators (Updated Every 3 Days)
Mencakup:
1. BI Rate today
2. Inflasi Agu 2026
3. IKK (Indeks Keyakinan Konsumen)
4. PMI Manufaktur
5. Rupiah (USD/IDR)
6. IHSG
7. Emas Antam /gram
8. Emas Buyback /gram
"""
from typing import Dict, Any


class RollingKPIService:
    @staticmethod
    def get_rolling_kpis() -> Dict[str, Any]:
        """
        Returns the 8 high-frequency indicators with movement comparisons (vs LY, vs LM)
        and short situation diagnostic verdicts.
        """
        return {
            "status": "SUCCESS",
            "cycle_label": "Update Setiap 3 Hari Sekali",
            "edition_note": "Angka kunci pekan ini · harga emas Antam mengacu rilis Logam Mulia 22 September 2026; harga 23 September belum dirilis saat edisi ini disusun.",
            "last_updated": "2026-10-08T09:00:00+07:00",
            "next_scheduled_update": "2026-10-11T09:00:00+07:00",
            "kpis": [
                {
                    "id": "bi_rate",
                    "title": "BI Rate Today",
                    "category": "Moneter",
                    "icon": "🏛️",
                    "period": "Hari Ini / RDG BI",
                    "value": "6.00%",
                    "unit": "%",
                    "movement_vs_ly": "-25 bps vs LY (Sep 2025: 6.25%)",
                    "movement_vs_lm": "Tetap (0 bps) vs LM",
                    "movement_summary": "Tetap (0 bps) vs LM • -25 bps vs LY",
                    "status_badge": "🟢 Kondusif",
                    "status_verdict": "Kondusif",
                    "status_type": "good",
                    "situation_note": "Siklus pelonggaran moneter terukur; menjaga stabilitas nilai tukar Rupiah sekaligus mendorong ruang likuiditas perbankan.",
                    "source": "Bank Indonesia (Rapat Dewan Gubernur)"
                },
                {
                    "id": "inflasi",
                    "title": "Inflasi Agu 2026",
                    "category": "Harga Konsumen",
                    "icon": "📊",
                    "period": "Realisasi BPS Agu 2026",
                    "value": "2.12%",
                    "unit": "% YoY",
                    "movement_vs_ly": "-0.45% vs LY (Agu 2025: 2.57%)",
                    "movement_vs_lm": "-0.03% MoM (Deflasi Tipis)",
                    "movement_summary": "-0.03% MoM • -0.45% vs LY (2025: 2.57%)",
                    "status_badge": "🟢 Sangat Baik",
                    "status_verdict": "Sangat Baik",
                    "status_type": "good",
                    "situation_note": "Terkendali kuat dalam koridor sasaran 2.5% ± 1% Bank Indonesia. Pasokan pangan melimpah dan daya beli masyarakat terlindungi.",
                    "source": "Badan Pusat Statistik (BRS Inflasi Bulanan)"
                },
                {
                    "id": "ikk",
                    "title": "IKK (Keyakinan Konsumen)",
                    "category": "Sentimen Publik",
                    "icon": "🛍️",
                    "period": "Survei Konsumen BI",
                    "value": "123.8 Poin",
                    "unit": "Poin",
                    "movement_vs_ly": "+2.1 poin vs LY (121.7)",
                    "movement_vs_lm": "+1.2 poin vs LM (Juli: 122.6)",
                    "movement_summary": "+1.2 poin vs LM • +2.1 poin vs LY",
                    "status_badge": "🟢 Zona Optimis",
                    "status_verdict": "Optimis",
                    "status_type": "good",
                    "situation_note": "Solid di atas ambang batas 100 (zona optimis). Ekspektasi masyarakat terhadap penghasilan dan ketersediaan lapangan kerja menguat.",
                    "source": "Bank Indonesia (Survei Konsumen)"
                },
                {
                    "id": "pmi_manufaktur",
                    "title": "PMI Manufaktur",
                    "category": "Sektor Riil",
                    "icon": "🏭",
                    "period": "S&P Global Rilis Terakhir",
                    "value": "51.2 Poin",
                    "unit": "Poin",
                    "movement_vs_ly": "+1.4 poin vs LY (49.8)",
                    "movement_vs_lm": "+0.8 poin vs LM (50.4)",
                    "movement_summary": "+0.8 poin vs LM • Rebound vs LY (49.8)",
                    "status_badge": "🟢 Zona Ekspansi",
                    "status_verdict": "Ekspansif",
                    "status_type": "good",
                    "situation_note": "Bertahan konsisten di atas batas 50 (fase ekspansi). Pesanan baru domestik menguat dan utilisasi kapasitas pabrik meningkat.",
                    "source": "S&P Global Indonesia PMI"
                },
                {
                    "id": "rupiah",
                    "title": "Rupiah (USD/IDR)",
                    "category": "Pasar Valas",
                    "icon": "💵",
                    "period": "JISDOR / Spot Hari Ini",
                    "value": "Rp 15.680",
                    "unit": "/ USD",
                    "movement_vs_ly": "+1.20% vs LY (Rp 15.870)",
                    "movement_vs_lm": "+0.35% (Menguat Rp 55) vs LM",
                    "movement_summary": "Menguat Rp 55 vs LM • +1.20% vs LY",
                    "status_badge": "🟢 Terkendali",
                    "status_verdict": "Terkendali",
                    "status_type": "good",
                    "situation_note": "Volatilitas rendah dan nilai tukar menguat; ditopang cadangan devisa kuat (USD 154,8 M) dan arus modal masuk portofolio SBN.",
                    "source": "Bank Indonesia (JISDOR) & Pasar Spot"
                },
                {
                    "id": "ihsg",
                    "title": "IHSG (Pasar Saham)",
                    "category": "Pasar Modal",
                    "icon": "📈",
                    "period": "Bursa Efek Indonesia",
                    "value": "7.742 Poin",
                    "unit": "Poin",
                    "movement_vs_ly": "+7.80% vs LY (7.182)",
                    "movement_vs_lm": "+1.45% vs LM (7.631)",
                    "movement_summary": "+1.45% vs LM • +7.80% vs LY",
                    "status_badge": "🟢 Positif",
                    "status_verdict": "Positif",
                    "status_type": "good",
                    "situation_note": "Sentimen pasar modal kondusif dengan net foreign buy. Kinerja laba emiten perbankan dan infrastruktur menopang indeks.",
                    "source": "PT Bursa Efek Indonesia (IDX)"
                },
                {
                    "id": "emas_antam",
                    "title": "Emas Antam /gram",
                    "category": "Komoditas & Logam Mulia",
                    "icon": "🪙",
                    "period": "Per 22 Sep 2026",
                    "value": "Rp 1.485.000",
                    "unit": "/ gram",
                    "movement_vs_ly": "+28.5% vs LY (Rp 1.155.000)",
                    "movement_vs_lm": "+Rp 12.000 vs LM (Rp 1.473.000)",
                    "movement_summary": "+Rp 12.000 vs LM • +28.5% vs LY",
                    "status_badge": "🟢 Safe Haven Kuat",
                    "status_verdict": "Kuat / Safe Haven",
                    "status_type": "good",
                    "situation_note": "Menguat searah harga emas spot global (XAU/USD). Berfungsi sebagai instrumen lindung nilai (hedging) aset ritel terpercaya.",
                    "source": "PT Aneka Tambang Tbk (Logam Mulia)"
                },
                {
                    "id": "emas_buyback",
                    "title": "Emas Buyback /gram",
                    "category": "Komoditas & Logam Mulia",
                    "icon": "🔄",
                    "period": "Beli Kembali Antam",
                    "value": "Rp 1.332.000",
                    "unit": "/ gram",
                    "movement_vs_ly": "+27.8% vs LY (Rp 1.042.000)",
                    "movement_vs_lm": "+Rp 10.000 vs LM (Rp 1.322.000)",
                    "movement_summary": "+Rp 10.000 vs LM • +27.8% vs LY",
                    "status_badge": "🟢 Menarik",
                    "status_verdict": "Menarik",
                    "status_type": "good",
                    "situation_note": "Likuiditas penebusan buyback optimal dengan spread wajar (~10,3%), memberi potensi keuntungan menarik bagi investor berjangka.",
                    "source": "PT Aneka Tambang Tbk (Logam Mulia)"
                }
            ]
        }
