// ==============================================================================
// REST API CLIENT MODULE
// Connects UI to National Secondary Data Repository Backend
// ==============================================================================

const API_BASE = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
  ? ''
  : '';

export const ApiClient = {
  async fetchHealth() {
    const res = await fetch(`${API_BASE}/api/health`);
    if (!res.ok) throw new Error('Gagal mengambil status sistem.');
    return await res.json();
  },

  async fetchFilterOptions() {
    const res = await fetch(`${API_BASE}/api/filter-options`);
    if (!res.ok) throw new Error('Gagal memuat opsi filter.');
    return await res.json();
  },

  async fetchObservations(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        query.append(k, v);
      }
    });
    const res = await fetch(`${API_BASE}/api/observations?${query.toString()}`);
    if (!res.ok) throw new Error('Gagal memuat data observasi nasional.');
    return await res.json();
  },

  async fetchKPISummary(indicatorId) {
    const res = await fetch(`${API_BASE}/api/kpi/${encodeURIComponent(indicatorId)}`);
    if (!res.ok) throw new Error('Gagal menghitung ringkasan KPI deskriptif.');
    return await res.json();
  },

  async fetchIndicatorMetadata(indicatorId) {
    const res = await fetch(`${API_BASE}/api/metadata/${encodeURIComponent(indicatorId)}`);
    if (!res.ok) throw new Error('Gagal memuat kamus metadata indikator.');
    return await res.json();
  },

  async fetchMetadataCatalog() {
    const res = await fetch(`${API_BASE}/api/metadata/catalog`);
    if (!res.ok) throw new Error('Gagal memuat katalog metadata.');
    return await res.json();
  },

  async fetchSyncSchedule() {
    const res = await fetch(`${API_BASE}/api/sync-schedule`);
    if (!res.ok) throw new Error('Gagal memuat jadwal rilis data.');
    return await res.json();
  },

  async fetchVariablesInventory() {
    const res = await fetch(`${API_BASE}/api/variables-inventory`);
    if (!res.ok) throw new Error('Gagal memuat katalog detail variabel data.');
    return await res.json();
  },

  async fetchProvenanceTrace(observationId) {
    const res = await fetch(`${API_BASE}/api/provenance/${observationId}`);
    if (!res.ok) throw new Error('Gagal menelusuri data provenance / asal-usul data.');
    return await res.json();
  },

  async fetchSourcesRegistry() {
    const res = await fetch(`${API_BASE}/api/sources`);
    if (!res.ok) throw new Error('Gagal memuat Source Registry.');
    return await res.json();
  },

  async fetchContextualDrivers(indicatorId = null, period = null) {
    const query = new URLSearchParams();
    if (indicatorId) query.append('indicator_id', indicatorId);
    if (period) query.append('period', period);
    const res = await fetch(`${API_BASE}/api/contextual-drivers?${query.toString()}`);
    if (!res.ok) throw new Error('Gagal memuat informasi pendorong kontekstual.');
    return await res.json();
  },

  async fetchCrosswalk(sector = null) {
    const query = sector ? `?sector=${encodeURIComponent(sector)}` : '';
    const res = await fetch(`${API_BASE}/api/crosswalk${query}`);
    if (!res.ok) throw new Error('Gagal memuat Classification Crosswalk.');
    return await res.json();
  },

  async fetchLkppFinancialStatements(year = 2010) {
    const res = await fetch(`${API_BASE}/api/lkpp/financial-statements?year=${year}`);
    if (!res.ok) throw new Error('Gagal memuat Laporan Keuangan LKPP Audited.');
    return await res.json();
  },

  async fetchRevisionHistory(indicatorId = null) {
    const query = indicatorId ? `?indicator_id=${encodeURIComponent(indicatorId)}` : '';
    const res = await fetch(`${API_BASE}/api/revision-history${query}`);
    if (!res.ok) throw new Error('Gagal memuat riwayat revisi.');
    return await res.json();
  },

  async fetchValidationLogs(limit = 50, status = null) {
    const query = new URLSearchParams({ limit });
    if (status) query.append('status', status);
    const res = await fetch(`${API_BASE}/api/validation-logs?${query.toString()}`);
    if (!res.ok) throw new Error('Gagal memuat log validasi data.');
    return await res.json();
  },

  async fetchUpdateLogs(limit = 50) {
    const res = await fetch(`${API_BASE}/api/update-logs?limit=${limit}`);
    if (!res.ok) throw new Error('Gagal memuat log update ingestion.');
    return await res.json();
  },

  async runConnectorIngestion(sourceId, connectorType) {
    const query = new URLSearchParams({ source_id: sourceId, connector_type: connectorType });
    const res = await fetch(`${API_BASE}/api/ingestion/run?${query.toString()}`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Eksekusi Ingestion Connector gagal.');
    return await res.json();
  },

  async ingestBatch(payload) {
    const res = await fetch(`${API_BASE}/api/ingestion/batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Ingestion batch gagal diproses.');
    return await res.json();
  },

  async recordDownloadLog(payload) {
    try {
      await fetch(`${API_BASE}/api/audit/download-log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn('Silent download audit log notice:', e);
    }
  }
};
