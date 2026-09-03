// ==============================================================================
// ABOUT VIEW COMPONENT (TENTANG INDOEKONOMI DATA)
// Ownership, Statutory Governance, Classification Evolution Access & Helpdesk
// ==============================================================================

import { ModalManager } from './modals.js';

export class AboutView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="space-y-4">
        <!-- 1. HEADER & MISSION -->
        <div class="bg-white p-5 rounded-lg border border-[#DADCE0] space-y-3 shadow-2xs">
          <div class="flex items-center justify-between border-b border-[#DADCE0] pb-3 flex-wrap gap-2">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-lg bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center text-lg">🏛️</span>
              <div>
                <h2 class="text-base font-mono font-bold text-[#202124] uppercase">
                  TENTANG INDOEKONOMI DATA
                </h2>
                <div class="text-[11px] text-[#5F6368] font-mono">
                  Indonesia Economic Data Observatory • domain: indoekonomi.data.go.id
                </div>
              </div>
            </div>
            <span class="text-[10.5px] font-mono bg-[#E6F4EA] text-[#137333] border border-[#CEEAD6] px-2.5 py-1 rounded font-semibold">
              STANDAR STATUTORI REPUBLIK INDONESIA
            </span>
          </div>

          <p class="text-xs sm:text-sm text-[#3C4043] font-sans leading-relaxed">
            <strong>INDOEKONOMI data</strong> dibangun sebagai observatorium data ekonomi nasional satu pintu yang menjembatani informasi ekonomi publik Indonesia yang tersebar di berbagai kementerian dan lembaga. Melalui arsitektur deret waktu berbasis observasi (<em>observation-based time series</em>), setiap angka dihubungkan secara utuh dengan dokumen publikasi kanonikal, nomor tabel, nomor halaman, dan institusi penerbit aslinya.
          </p>

          <div class="p-3 bg-[#F8F9FA] rounded border border-[#DADCE0] flex items-center justify-between flex-wrap gap-3">
            <div class="space-y-0.5 text-xs font-mono">
              <div class="font-bold text-[#202124]">Prinsip Produk:</div>
              <div class="text-[#5F6368] text-[11px]">
                Integritas Data > Provenans > Tata Kelola Akses > Ketepatan Analisis > Kegunaan
              </div>
            </div>

            <!-- Trigger Button for Section 13 Document -->
            <button id="about-btn-open-crosswalk-doc" class="px-3 py-1.5 rounded bg-[#1A73E8] hover:bg-[#174EA6] text-white text-xs font-mono font-medium shadow-xs flex items-center gap-1.5 cursor-pointer">
              <span>ℹ️</span>
              <span>Buka Dokumen Riwayat Klasifikasi APBN</span>
            </button>
          </div>
        </div>

        <!-- 2. GOVERNANCE, COPYRIGHT & ACCESS MATRIX -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Column 1: Ownership & Legal Basis -->
          <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-3 shadow-2xs">
            <h3 class="text-xs font-mono font-bold uppercase text-[#202124] flex items-center gap-2 border-b border-[#DADCE0] pb-2">
              <span>⚖️</span>
              <span>Hak Cipta & Landasan Hukum</span>
            </h3>

            <div class="space-y-2 text-xs font-sans text-[#3C4043] leading-relaxed">
              <p>
                Hak cipta platform dan repositori kompilasi <strong>INDOEKONOMI data</strong> dimiliki sepenuhnya oleh <strong>Pemerintah Republik Indonesia</strong>.
              </p>
              <ul class="space-y-1.5 text-[11.5px]">
                <li class="flex items-start gap-1.5">
                  <span class="text-[#1E8E3E] font-bold">✓</span>
                  <span><strong>UU No. 17/2003:</strong> Pengelolaan Keuangan Negara & Klasifikasi Anggaran Terpadu.</span>
                </li>
                <li class="flex items-start gap-1.5">
                  <span class="text-[#1E8E3E] font-bold">✓</span>
                  <span><strong>UU No. 16/1997:</strong> Penyelenggaraan Statistik Dasar & Statistik Sektoral Resmi.</span>
                </li>
                <li class="flex items-start gap-1.5">
                  <span class="text-[#1E8E3E] font-bold">✓</span>
                  <span><strong>PP No. 71/2010:</strong> Standar Akuntansi Pemerintahan (SAP Akrual Penuh).</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Column 2: 8 Access Statuses -->
          <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-3 shadow-2xs">
            <h3 class="text-xs font-mono font-bold uppercase text-[#202124] flex items-center gap-2 border-b border-[#DADCE0] pb-2">
              <span>🛡️</span>
              <span>Matriks Tata Kelola Akses Data (8 Status)</span>
            </h3>

            <div class="space-y-1.5 text-[11px] font-mono">
              <div class="flex items-center justify-between p-1.5 rounded bg-[#F8F9FA] border border-[#DADCE0]">
                <span class="font-bold text-[#1E8E3E]">PUBLIC_DOWNLOAD_OPEN</span>
                <span class="text-[#5F6368]">Dapat ditemukan, dilihat & diunduh langsung</span>
              </div>
              <div class="flex items-center justify-between p-1.5 rounded bg-[#F8F9FA] border border-[#DADCE0]">
                <span class="font-bold text-[#1A73E8]">PUBLIC_DOWNLOAD_AFTER_LOGIN</span>
                <span class="text-[#5F6368]">Wajib verifikasi sesi pengguna terdaftar</span>
              </div>
              <div class="flex items-center justify-between p-1.5 rounded bg-[#F8F9FA] border border-[#DADCE0]">
                <span class="font-bold text-[#B06000]">PUBLIC_VIEW_ONLY</span>
                <span class="text-[#5F6368]">Grafik & tabel dapat dilihat, unduh dilarang</span>
              </div>
              <div class="flex items-center justify-between p-1.5 rounded bg-[#F8F9FA] border border-[#DADCE0]">
                <span class="font-bold text-[#5F6368]">LINK_TO_ORIGINAL_ONLY</span>
                <span class="text-[#5F6368]">Tautan langsung ke repositori resmi instansi</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. HELPDESK & CONTACT -->
        <div class="bg-white p-4 rounded-lg border border-[#DADCE0] space-y-2.5 shadow-2xs">
          <h3 class="text-xs font-mono font-bold uppercase text-[#202124] flex items-center gap-2 border-b border-[#DADCE0] pb-2">
            <span>📞</span>
            <span>Kontak Helpdesk & Pertanyaan Metodologi</span>
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <div class="text-[#5F6368] text-[11px]">Helpdesk Tata Kelola Repositori:</div>
              <a href="mailto:lubis.tania@dewanekonomi.go.id" class="text-[#1A73E8] hover:underline font-bold text-xs">
                lubis.tania@dewanekonomi.go.id
              </a>
              <div class="text-[#5F6368] text-[10.5px] mt-1">
                Dewan Ekonomi Nasional — Republik Indonesia
              </div>
            </div>

            <div>
              <div class="text-[#5F6368] text-[11px]">Siklus Pembaruan Data Berkala:</div>
              <div class="text-[#202124] font-semibold">
                Tanggal 8, 17, dan 28 Setiap Bulan
              </div>
              <div class="text-[#5F6368] text-[10.5px] mt-1">
                Pembaruan otomatis terjadwal sesuai rilis BPS BRS & Kemenkeu APBN Kita
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('about-btn-open-crosswalk-doc')?.addEventListener('click', () => {
      ModalManager.showClassificationDocumentModal();
    });
  }
}
