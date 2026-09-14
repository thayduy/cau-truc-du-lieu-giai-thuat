/**
 * Dán vào Extensions → Apps Script của Google Sheet.
 * Triển khai: Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy URL (.../exec) rồi dán vào trang Bảng điểm.
 */
const TOKEN = 'ctdl-nophoc';

function bang() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName('BangDiem');
  if (!sh) {
    sh = ss.insertSheet('BangDiem');
    sh.appendRow([
      'Nộp lúc',
      'Họ và tên',
      'MSSV',
      'Điểm',
      'Số câu đúng',
      'Tổng câu',
      'Ch.1',
      'Ch.2',
      'Ch.3',
      'Ch.4',
      'Hết giờ?',
      'Bắt đầu (ms)',
      'Nộp (ms)',
    ]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (p.token && p.token !== TOKEN) {
    return jsonp(p.callback, {ok: false, error: 'token'});
  }
  if (p.action === 'nop') {
    bang().appendRow([
      new Date(),
      p.hoTen || '',
      p.mssv || '',
      Number(p.diem),
      Number(p.dung),
      Number(p.tong),
      p.ch1 || '',
      p.ch2 || '',
      p.ch3 || '',
      p.ch4 || '',
      p.auto === '1' ? 'Có' : 'Không',
      p.startedAt || '',
      p.finishedAt || '',
    ]);
    return jsonp(p.callback, {ok: true});
  }
  const values = bang().getDataRange().getValues();
  const rows = [];
  for (let i = 1; i < values.length; i++) {
    const r = values[i];
    rows.push({
      finishedAt: r[12] || r[0],
      hoTen: r[1],
      mssv: r[2],
      diem: r[3],
      dung: r[4],
      tong: r[5],
      ch1: r[6],
      ch2: r[7],
      ch3: r[8],
      ch4: r[9],
      auto: r[10],
      startedAt: r[11],
    });
  }
  return jsonp(p.callback, {ok: true, rows: rows});
}

function jsonp(cb, obj) {
  const s = JSON.stringify(obj);
  const body = cb ? cb + '(' + s + ')' : s;
  return ContentService.createTextOutput(body).setMimeType(
    cb ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON,
  );
}
