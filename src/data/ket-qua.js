import {DIEM_MOI_CAU} from './cau-hoi';
import {computeStats} from './exam-utils';
import {SHEET_TOKEN, SHEET_WEBAPP_URL} from './ket-qua-config';

export const LEDGER_KEY = 'ctdl-bkt-ledger-v1';
export const API_STORE_KEY = 'ctdl-bkt-api-url';

export function captureApiFromQuery() {
  if (typeof window === 'undefined') return;
  const api = new URL(window.location.href).searchParams.get('api');
  if (api && api.trim()) {
    localStorage.setItem(API_STORE_KEY, api.trim());
  }
}

export function getApiUrl() {
  if (typeof window === 'undefined') return SHEET_WEBAPP_URL;
  const q = new URL(window.location.href).searchParams.get('api');
  if (q && q.trim()) return q.trim();
  return (localStorage.getItem(API_STORE_KEY) || SHEET_WEBAPP_URL || '').trim();
}

export function setApiUrl(url) {
  localStorage.setItem(API_STORE_KEY, String(url || '').trim());
}

export function examLinkWithApi(siteRoot) {
  const api = getApiUrl();
  const base = `${String(siteRoot).replace(/\/$/, '')}/bai-kiem-tra`;
  if (!api) return base;
  return `${base}?api=${encodeURIComponent(api)}`;
}

export function loadLocalLedger() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LEDGER_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalLedger(row) {
  const list = loadLocalLedger();
  list.push(row);
  localStorage.setItem(LEDGER_KEY, JSON.stringify(list));
}

export function buildResult({hoTen, mssv, items, picks, startedAt, auto}) {
  const {correct, score, byChap} = computeStats(items, picks, DIEM_MOI_CAU);
  const finishedAt = Date.now();
  return {
    hoTen: String(hoTen || '').trim(),
    mssv: String(mssv || '').trim(),
    diem: score,
    dung: correct,
    tong: items.length,
    ch1: `${byChap[1].ok}/${byChap[1].total}`,
    ch2: `${byChap[2].ok}/${byChap[2].total}`,
    ch3: `${byChap[3].ok}/${byChap[3].total}`,
    ch4: `${byChap[4].ok}/${byChap[4].total}`,
    startedAt,
    finishedAt,
    auto: !!auto,
  };
}

function jsonp(url) {
  return new Promise((resolve, reject) => {
    const cb = `ctdlCb${Date.now()}${Math.floor(Math.random() * 1e6)}`;
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error('timeout'));
    }, 18000);
    const script = document.createElement('script');
    const cleanup = () => {
      clearTimeout(timer);
      try {
        delete window[cb];
      } catch {
        window[cb] = undefined;
      }
      script.remove();
    };
    window[cb] = (data) => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error('network'));
    };
    const join = url.includes('?') ? '&' : '?';
    script.src = `${url}${join}callback=${cb}`;
    document.body.appendChild(script);
  });
}

export async function nopBaiLenBang(row) {
  saveLocalLedger(row);
  const api = getApiUrl();
  if (!api) return {ok: true, localOnly: true};
  const q = new URLSearchParams({
    action: 'nop',
    token: SHEET_TOKEN,
    hoTen: row.hoTen,
    mssv: row.mssv,
    diem: String(row.diem),
    dung: String(row.dung),
    tong: String(row.tong),
    ch1: row.ch1,
    ch2: row.ch2,
    ch3: row.ch3,
    ch4: row.ch4,
    auto: row.auto ? '1' : '0',
    startedAt: String(row.startedAt || ''),
    finishedAt: String(row.finishedAt),
  });
  const data = await jsonp(`${api}?${q.toString()}`);
  if (!data?.ok) throw new Error(data?.error || 'nop');
  return {ok: true, localOnly: false};
}

export async function taiDanhSach() {
  const local = loadLocalLedger();
  const api = getApiUrl();
  if (!api) return {rows: local, source: 'local'};
  try {
    const q = new URLSearchParams({action: 'list', token: SHEET_TOKEN});
    const data = await jsonp(`${api}?${q.toString()}`);
    const remote = Array.isArray(data?.rows) ? data.rows : [];
    return {rows: mergeRows(remote, local), source: 'sheet'};
  } catch {
    return {rows: local, source: 'local'};
  }
}

function mergeRows(remote, local) {
  const key = (r) => `${r.mssv}|${r.finishedAt}|${r.diem}`;
  const map = new Map();
  [...local, ...remote].forEach((r) => {
    map.set(key(r), normalizeRow(r));
  });
  return [...map.values()].sort((a, b) => Number(b.finishedAt) - Number(a.finishedAt));
}

function normalizeRow(r) {
  const finishedAt = toMs(r.finishedAt);
  return {
    hoTen: r.hoTen || '',
    mssv: String(r.mssv || ''),
    diem: Number(r.diem),
    dung: Number(r.dung || 0),
    tong: Number(r.tong || 0),
    ch1: r.ch1 || '',
    ch2: r.ch2 || '',
    ch3: r.ch3 || '',
    ch4: r.ch4 || '',
    auto: r.auto === true || r.auto === '1' || r.auto === 1,
    startedAt: toMs(r.startedAt),
    finishedAt,
  };
}

function toMs(v) {
  if (v == null || v === '') return 0;
  if (typeof v === 'number' && !Number.isNaN(v)) {
    return v < 1e12 ? v * 1000 : v;
  }
  const n = Number(v);
  if (!Number.isNaN(n) && String(v).trim() !== '') {
    return n < 1e12 && n > 1e9 ? n * 1000 : n;
  }
  const t = Date.parse(v);
  return Number.isNaN(t) ? 0 : t;
}

export function latestByMssv(rows) {
  const map = new Map();
  [...rows]
    .sort((a, b) => a.finishedAt - b.finishedAt)
    .forEach((r) => map.set(String(r.mssv).toLowerCase(), r));
  return [...map.values()].sort((a, b) => b.diem - a.diem || a.hoTen.localeCompare(b.hoTen, 'vi'));
}

export function formatTime(ms) {
  if (!ms) return '';
  return new Date(ms).toLocaleString('vi-VN');
}

function xml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function downloadExcel(rows, filename = 'Bang_diem_CTDL_GT.xls') {
  const header = ['STT', 'Họ và tên', 'MSSV', 'Điểm', 'Số câu đúng', 'Tổng câu', 'Ch.1', 'Ch.2', 'Ch.3', 'Ch.4', 'Nộp lúc', 'Hết giờ?'];
  const cells = (vals, types) =>
    vals
      .map((v, i) => {
        const t = types?.[i] || 'String';
        return `<Cell><Data ss:Type="${t}">${xml(v)}</Data></Cell>`;
      })
      .join('');
  const headerRow = `<Row>${cells(header)}</Row>`;
  const body = rows
    .map((r, i) => {
      const vals = [
        i + 1,
        r.hoTen,
        r.mssv,
        r.diem,
        r.dung,
        r.tong,
        r.ch1,
        r.ch2,
        r.ch3,
        r.ch4,
        formatTime(r.finishedAt),
        r.auto ? 'Có' : 'Không',
      ];
      const types = ['Number', 'String', 'String', 'Number', 'Number', 'Number', 'String', 'String', 'String', 'String', 'String', 'String'];
      return `<Row>${cells(vals, types)}</Row>`;
    })
    .join('');
  const xmlDoc = `<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
<Worksheet ss:Name="Bang diem">
<Table>${headerRow}${body}</Table>
</Worksheet>
</Workbook>`;
  const blob = new Blob([xmlDoc], {type: 'application/vnd.ms-excel;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}
