import React, {useEffect, useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ADMIN_PIN} from '../data/ket-qua-config';
import {
  captureApiFromQuery,
  downloadExcel,
  examLinkWithApi,
  formatTime,
  getApiUrl,
  latestByMssv,
  setApiUrl,
  taiDanhSach,
} from '../data/ket-qua';
import styles from './bai-kiem-tra.module.css';

const SCRIPT = `const TOKEN = 'ctdl-nophoc';

function bang() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('BangDiem');
  if (!sh) {
    sh = ss.insertSheet('BangDiem');
    sh.appendRow(['Nộp lúc','Họ và tên','MSSV','Điểm','Số câu đúng','Tổng câu','Ch.1','Ch.2','Ch.3','Ch.4','Hết giờ?','Bắt đầu (ms)','Nộp (ms)']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.token && p.token !== TOKEN) {
    return jsonp(p.callback, {ok:false, error:'token'});
  }
  if (p.action === 'nop') {
    bang().appendRow([new Date(), p.hoTen||'', p.mssv||'', Number(p.diem), Number(p.dung), Number(p.tong), p.ch1||'', p.ch2||'', p.ch3||'', p.ch4||'', p.auto==='1'?'Có':'Không', p.startedAt||'', p.finishedAt||'']);
    return jsonp(p.callback, {ok:true});
  }
  const values = bang().getDataRange().getValues();
  const rows = [];
  for (let i = 1; i < values.length; i++) {
    const r = values[i];
    rows.push({finishedAt: r[12]||r[0], hoTen:r[1], mssv:r[2], diem:r[3], dung:r[4], tong:r[5], ch1:r[6], ch2:r[7], ch3:r[8], ch4:r[9], auto:r[10], startedAt:r[11]});
  }
  return jsonp(p.callback, {ok:true, rows:rows});
}

function jsonp(cb, obj) {
  const s = JSON.stringify(obj);
  const body = cb ? cb + '(' + s + ')' : s;
  return ContentService.createTextOutput(body).setMimeType(cb ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}
`;

export default function BangDiemPage() {
  const bangPath = useBaseUrl('/bang-diem');
  const [pin, setPin] = useState('');
  const [ok, setOk] = useState(false);
  const [api, setApi] = useState('');
  const [rows, setRows] = useState([]);
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [q, setQ] = useState('');
  const [latestOnly, setLatestOnly] = useState(true);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    captureApiFromQuery();
    setApi(getApiUrl());
  }, []);

  const shareExam = () => {
    if (typeof window === 'undefined') return '';
    const root = window.location.origin + bangPath.replace(/\/bang-diem\/?$/, '');
    return examLinkWithApi(root);
  };

  const view = useMemo(() => {
    let list = latestOnly ? latestByMssv(rows) : [...rows].sort((a, b) => b.finishedAt - a.finishedAt);
    const s = q.trim().toLowerCase();
    if (s) {
      list = list.filter((r) => r.hoTen.toLowerCase().includes(s) || String(r.mssv).toLowerCase().includes(s));
    }
    return list;
  }, [rows, latestOnly, q]);

  const load = async () => {
    setLoading(true);
    setErr('');
    const data = await taiDanhSach();
    setRows(data.rows);
    setSource(data.source);
    if (getApiUrl() && data.source === 'local') {
      setErr('Không tải được Google Sheet. Kiểm tra URL Web App (Anyone). Đang hiện dữ liệu trên máy này.');
    }
    setLoading(false);
  };

  const unlock = () => {
    if (pin.trim() !== ADMIN_PIN) {
      setErr('Sai PIN.');
      return;
    }
    setErr('');
    setOk(true);
    load();
  };

  const saveApi = () => {
    setApiUrl(api);
    setCopied('Đã lưu URL máy chủ điểm.');
    load();
  };

  const copy = async (text, msg) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(msg);
    } catch {
      setCopied('Không copy được — chọn thủ công.');
    }
  };

  return (
    <Layout title="Bảng điểm" description="Thống kê sinh viên đã nộp bài kiểm tra CTDL & GT">
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Giảng viên</p>
          <h1>Bảng điểm phiên làm bài</h1>
          <p>Danh sách sinh viên đã nộp: STT, họ tên, MSSV, điểm. Xuất file Excel để chấm / lưu trữ.</p>
        </section>

        {!ok ? (
          <article className={styles.card} style={{maxWidth: 420}}>
            <h2>Nhập PIN giảng viên</h2>
            {err && <p className={styles.notice}>{err}</p>}
            <label className={styles.field}>
              <span>PIN</span>
              <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && unlock()} />
            </label>
            <button className={styles.primaryBtn} type="button" onClick={unlock}>
              Vào bảng điểm
            </button>
          </article>
        ) : (
          <>
            <article className={styles.card}>
              <h2>1. Kết nối Google Sheet (một lần)</h2>
              <ol className={styles.rules}>
                <li>Tạo Google Sheet mới → Extensions → Apps Script. Xóa code mặc định, dán script (nút bên dưới).</li>
                <li>Deploy → New deployment → Web app. Execute as <b>Me</b>, Who has access <b>Anyone</b>.</li>
                <li>Copy URL dạng <code>/macros/s/…/exec</code>, dán vào ô rồi Lưu.</li>
                <li>Gửi cho lớp <b>link làm bài đã gắn máy chủ</b> (nút copy) — nộp bài sẽ vào Sheet.</li>
              </ol>
              <div className={styles.navRow}>
                <button className={styles.ghostBtn} type="button" onClick={() => copy(SCRIPT, 'Đã copy script Google.')}>
                  Copy script Apps Script
                </button>
              </div>
              <label className={styles.field} style={{marginTop: '0.8rem'}}>
                <span>URL Web App</span>
                <input
                  value={api}
                  onChange={(e) => setApi(e.target.value)}
                  placeholder="https://script.google.com/macros/s/…/exec"
                />
              </label>
              <div className={styles.navRow}>
                <button className={`${styles.primaryBtn} ${styles.btnAuto}`} type="button" onClick={saveApi}>
                  Lưu URL
                </button>
                <button
                  className={styles.ghostBtn}
                  type="button"
                  onClick={() => copy(shareExam(), 'Đã copy link làm bài cho lớp.')}>
                  Copy link làm bài cho lớp
                </button>
              </div>
              {copied && <p className={styles.okNote}>{copied}</p>}
            </article>

            <article className={styles.card}>
              <h2>2. Danh sách đã nộp</h2>
              <p className={styles.typeHint}>
                Nguồn: {source === 'sheet' ? 'Google Sheet (gộp máy này)' : 'chỉ máy đang mở trang này'}
                {loading ? ' — đang tải…' : ''}
              </p>
              {err && <p className={styles.notice}>{err}</p>}
              <div className={styles.toolbar}>
                <input
                  className={styles.search}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Tìm tên hoặc MSSV"
                />
                <label className={styles.check}>
                  <input type="checkbox" checked={latestOnly} onChange={(e) => setLatestOnly(e.target.checked)} />
                  Chỉ lần nộp cuối / MSSV
                </label>
                <button className={styles.ghostBtn} type="button" onClick={load} disabled={loading}>
                  Làm mới
                </button>
                <button
                  className={`${styles.primaryBtn} ${styles.btnAuto}`}
                  type="button"
                  disabled={!view.length}
                  onClick={() =>
                    downloadExcel(
                      view,
                      `Bang_diem_CTDL_${new Date().toISOString().slice(0, 10)}.xls`,
                    )
                  }>
                  Xuất Excel
                </button>
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Họ và tên</th>
                      <th>MSSV</th>
                      <th>Điểm</th>
                      <th>Đúng</th>
                      <th>Nộp lúc</th>
                    </tr>
                  </thead>
                  <tbody>
                    {view.length === 0 ? (
                      <tr>
                        <td colSpan={6}>Chưa có bài nộp. Hoàn tất bước 1 rồi gửi link cho lớp.</td>
                      </tr>
                    ) : (
                      view.map((r, i) => (
                        <tr key={`${r.mssv}-${r.finishedAt}-${i}`}>
                          <td>{i + 1}</td>
                          <td>{r.hoTen}</td>
                          <td>{r.mssv}</td>
                          <td>
                            <b>{Number(r.diem).toFixed(1)}</b>
                          </td>
                          <td>
                            {r.dung}/{r.tong}
                          </td>
                          <td>{formatTime(r.finishedAt)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <p className={styles.typeHint}>
                File Excel gồm thêm cột Ch.1–4 và hết giờ. Mở bằng Microsoft Excel / Google Sheets.
              </p>
            </article>
          </>
        )}
      </main>
    </Layout>
  );
}
