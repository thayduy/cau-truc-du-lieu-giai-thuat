import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Layout from '@theme/Layout';
import {ExamFigure, FIGURE_BY_ID} from '../components/ExamFigures';
import {
  CAU_HOI,
  CHUONG_META,
  DIEM_MOI_CAU,
  DURATION_MS,
  STORAGE_KEY,
  TONG_CAU,
  TONG_DIEM,
  TYPE_LABEL,
} from '../data/cau-hoi';
import {computeStats, isAnswered, isCorrect, mixQuestions} from '../data/exam-utils';
import {buildResult, captureApiFromQuery, getApiUrl, nopBaiLenBang} from '../data/ket-qua';
import styles from './bai-kiem-tra.module.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

function formatMs(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}

function rankOf(score) {
  if (score >= 8.5) return 'Xuất sắc';
  if (score >= 7) return 'Giỏi';
  if (score >= 5.5) return 'Khá';
  if (score >= 4) return 'Trung bình';
  return 'Chưa đạt';
}

function loadDraft() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function BaiKiemTraPage() {
  const [phase, setPhase] = useState('intro');
  const [hoTen, setHoTen] = useState('');
  const [mssv, setMssv] = useState('');
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState({});
  const [flags, setFlags] = useState({});
  const [endsAt, setEndsAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [startedAt, setStartedAt] = useState(0);
  const [nopStatus, setNopStatus] = useState('');
  const [hasApi, setHasApi] = useState(false);
  const submittedRef = useRef(false);

  const remaining = Math.max(0, endsAt - now);
  const answeredCount = items.filter((q, i) => isAnswered(q, picks[i])).length;

  const persist = useCallback(
    (next) => {
      const payload = {
        phase: next.phase ?? phase,
        hoTen: next.hoTen ?? hoTen,
        mssv: next.mssv ?? mssv,
        items: next.items ?? items,
        index: next.index ?? index,
        picks: next.picks ?? picks,
        flags: next.flags ?? flags,
        endsAt: next.endsAt ?? endsAt,
        startedAt: next.startedAt ?? startedAt,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    },
    [phase, hoTen, mssv, items, index, picks, flags, endsAt, startedAt],
  );

  useEffect(() => {
    captureApiFromQuery();
    setHasApi(!!getApiUrl());
    const draft = loadDraft();
    if (!draft?.items?.length) return;
    if (draft.phase === 'exam' && draft.endsAt > Date.now()) {
      setHoTen(draft.hoTen || '');
      setMssv(draft.mssv || '');
      setItems(draft.items);
      setIndex(draft.index || 0);
      setPicks(draft.picks || {});
      setFlags(draft.flags || {});
      setEndsAt(draft.endsAt);
      setStartedAt(draft.startedAt || Date.now());
      setPhase('exam');
    } else if (draft.phase === 'result' && draft.items?.length) {
      setHoTen(draft.hoTen || '');
      setMssv(draft.mssv || '');
      setItems(draft.items);
      setPicks(draft.picks || {});
      setFlags(draft.flags || {});
      setEndsAt(draft.endsAt || 0);
      setStartedAt(draft.startedAt || 0);
      setPhase('result');
      submittedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (phase !== 'exam') return undefined;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'exam') return undefined;
    const onLeave = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onLeave);
    return () => window.removeEventListener('beforeunload', onLeave);
  }, [phase]);

  const finish = useCallback(
    (auto = false) => {
      setConfirmOpen(false);
      setPhase('result');
      persist({phase: 'result'});
      if (auto) setError('Hết giờ — hệ thống đã nộp bài tự động.');
      if (submittedRef.current) return;
      submittedRef.current = true;
      const row = buildResult({hoTen, mssv, items, picks, startedAt, auto});
      setNopStatus('sending');
      nopBaiLenBang(row)
        .then((r) => setNopStatus(r.localOnly ? 'local' : 'ok'))
        .catch(() => setNopStatus('loi'));
    },
    [persist, hoTen, mssv, items, picks, startedAt],
  );

  useEffect(() => {
    if (phase === 'exam' && remaining <= 0 && endsAt) finish(true);
  }, [phase, remaining, endsAt, finish]);

  const start = () => {
    const ten = hoTen.trim();
    const id = mssv.trim();
    if (ten.length < 3 || id.length < 3) {
      setError('Nhập đầy đủ họ tên và MSSV (tối thiểu 3 ký tự).');
      return;
    }
    const mixed = mixQuestions(CAU_HOI, FIGURE_BY_ID);
    const startTs = Date.now();
    const endTs = startTs + DURATION_MS;
    setError('');
    setHoTen(ten);
    setMssv(id);
    setItems(mixed);
    setIndex(0);
    setPicks({});
    setFlags({});
    setStartedAt(startTs);
    setEndsAt(endTs);
    setNow(startTs);
    setPhase('exam');
    persist({
      phase: 'exam',
      hoTen: ten,
      mssv: id,
      items: mixed,
      index: 0,
      picks: {},
      flags: {},
      endsAt: endTs,
      startedAt: startTs,
    });
  };

  const savePick = (value) => {
    if (phase !== 'exam') return;
    const next = {...picks, [index]: value};
    setPicks(next);
    persist({picks: next});
  };

  const choose = (opt) => {
    const q = items[index];
    if (!q || phase !== 'exam') return;
    if (q.type === 'multi') {
      const cur = Array.isArray(picks[index]) ? picks[index] : [];
      const next = cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt];
      savePick(next);
      return;
    }
    savePick(opt);
  };

  const goto = (i) => {
    setIndex(i);
    persist({index: i});
  };

  const toggleFlag = () => {
    const next = {...flags, [index]: !flags[index]};
    setFlags(next);
    persist({flags: next});
  };

  const stats = useMemo(() => computeStats(items, picks, DIEM_MOI_CAU), [items, picks]);

  const q = items[index];
  const review = phase === 'result';
  const type = q?.type || 'single';
  const pick = picks[index];

  const renderOptions = () => {
    if (type === 'fill') {
      const ok = review && isCorrect(q, pick);
      return (
        <>
          <input
            className={`${styles.fillInput} ${review ? (ok ? styles.fillOk : styles.fillBad) : ''}`}
            value={pick ?? ''}
            disabled={review}
            placeholder={q.placeholder || 'Nhập đáp án'}
            onChange={(e) => savePick(e.target.value)}
            autoComplete="off"
            spellCheck="false"
          />
          {review && (
            <p className={styles.fillHint}>
              Đáp án nhận: <b>{(q.accept || [q.answer])[0]}</b>
              {ok ? ' — đúng (hệ thống chấp nhận biến thể viết).' : ' — không khớp.'}
            </p>
          )}
        </>
      );
    }

    return q.options.map((text, opt) => {
      const selected = type === 'multi' ? Array.isArray(pick) && pick.includes(opt) : pick === opt;
      const isRight = type === 'multi' ? q.answer.includes(opt) : opt === q.answer;
      let cls = styles.option;
      if (phase === 'exam' && selected) cls += ` ${styles.optionOn}`;
      if (review) {
        if (isRight) cls += ` ${styles.optionOk}`;
        else if (selected) cls += ` ${styles.optionBad}`;
      }
      return (
        <button key={opt} type="button" className={cls} onClick={() => choose(opt)} disabled={review}>
          <span className={`${styles.letter} ${type === 'multi' ? styles.letterBox : ''}`}>
            {type === 'multi' && selected ? '✓' : LETTERS[opt]}
          </span>
          <span>{text}</span>
        </button>
      );
    });
  };

  return (
    <Layout
      title="Bài kiểm tra 200 câu — CTDL & GT"
      description="Đề 200 câu mức khó, 50 câu/chương: trắc nghiệm 1 đáp án, nhiều đáp án, điền, hình suy luận và bẫy lỗi.">
      <main className={styles.page}>
        {phase === 'intro' && (
          <>
            <section className={styles.hero}>
              <p className={styles.kicker}>Hệ thống kiểm tra trực tuyến</p>
              <h1>Bài kiểm tra chuyên sâu<br />Cấu trúc dữ liệu và Giải thuật</h1>
              <p>
                200 câu mức khó, 50 câu mỗi chương (1–4). Ba dạng: chọn một, chọn nhiều (thiếu/thừa = 0),
                điền kết quả. Nhiều câu có hình ô nhớ / DSLK / heap / hàng đợi vòng — phải suy từ hình, không đoán.
              </p>
              <div className={styles.metaRow}>
                <span className={styles.chip}>200 câu</span>
                <span className={styles.chip}>50 / chương</span>
                <span className={styles.chip}>180 phút</span>
                <span className={styles.chip}>Thang 10 · 0,05/câu</span>
              </div>
            </section>
            <div className={styles.grid}>
              <article className={styles.card}>
                <h2>Quy chế phòng thi</h2>
                <ol className={styles.rules}>
                  <li>Mỗi chương 50 câu. Xáo thứ tự câu và thứ tự đáp án khi bắt đầu.</li>
                  <li>
                    <b>1 đáp án</b> — chọn A/B/C/D. <b>Nhiều đáp án</b> — tick đủ tập đúng, thiếu hoặc thừa đều
                    sai. <b>Điền</b> — gõ đúng ý (O(n), số, mảng, DUNG/SAI…).
                  </li>
                  <li>Hình và đoạn lệnh là dữ liệu đề: đếm tay, vẽ nháp, rồi mới chọn.</li>
                  <li>Không tài liệu, máy tính, AI. Hết 180 phút nộp tự động.</li>
                  <li>Tải lại trang vẫn giữ bài nếu chưa hết giờ. Gắn cờ để xem lại.</li>
                  <li>Xếp loại: 8,5 xuất sắc · 7,0 giỏi · 5,5 khá · 4,0 trung bình.</li>
                  <li>
                    Nộp bài ghi họ tên, MSSV, điểm lên bảng giảng viên
                    {hasApi ? ' (đã kết nối).' : ' khi dùng đúng link từ trang Bảng điểm.'}
                  </li>
                </ol>
              </article>
              <article className={styles.card}>
                <h2>Thẻ dự thi</h2>
                {error && <p className={styles.notice}>{error}</p>}
                <label className={styles.field}>
                  <span>Họ và tên</span>
                  <input value={hoTen} onChange={(e) => setHoTen(e.target.value)} placeholder="Nguyễn Văn A" />
                </label>
                <label className={styles.field}>
                  <span>Mã số sinh viên</span>
                  <input value={mssv} onChange={(e) => setMssv(e.target.value)} placeholder="VD: 23001234" />
                </label>
                <button className={styles.primaryBtn} type="button" onClick={start}>
                  Bắt đầu làm bài
                </button>
              </article>
            </div>
          </>
        )}

        {phase !== 'intro' && q && (
          <>
            <div className={styles.topbar}>
              <div className={styles.student}>
                <b>{hoTen}</b> · {mssv}
                <div>
                  {review
                    ? `Đã nộp · ${stats.correct}/${TONG_CAU} đúng`
                    : `Đã trả lời ${answeredCount}/${TONG_CAU}`}
                </div>
              </div>
              {phase === 'exam' && (
                <div className={`${styles.timer} ${remaining < 10 * 60 * 1000 ? styles.timerWarn : ''}`}>
                  {formatMs(remaining)}
                </div>
              )}
              {review && (
                <button
                  className={styles.ghostBtn}
                  type="button"
                  onClick={() => {
                    localStorage.removeItem(STORAGE_KEY);
                    submittedRef.current = false;
                    setNopStatus('');
                    setPhase('intro');
                    setItems([]);
                    setError('');
                  }}>
                  Làm đề mới
                </button>
              )}
            </div>

            {review && (
              <section className={`${styles.card} ${styles.scoreHero}`}>
                {error && <p className={styles.notice}>{error}</p>}
                <div className={styles.mark}>{stats.score.toFixed(1)}</div>
                <div>/ {TONG_DIEM} điểm · {rankOf(stats.score)}</div>
                {nopStatus === 'sending' && <p className={styles.typeHint}>Đang gửi điểm lên bảng giảng viên…</p>}
                {nopStatus === 'ok' && <p className={styles.nopOk}>Đã ghi nhận trên bảng điểm (họ tên, MSSV, điểm).</p>}
                {nopStatus === 'local' && (
                  <p className={styles.nopWarn}>
                    Đã lưu trên máy này. Để vào danh sách lớp, sinh viên phải mở đúng link làm bài thầy gửi từ trang Bảng điểm.
                  </p>
                )}
                {nopStatus === 'loi' && (
                  <p className={styles.notice}>
                    Gửi bảng điểm thất bại.{' '}
                    <button
                      type="button"
                      className={`${styles.ghostBtn} ${styles.btnAuto}`}
                      onClick={() => {
                        submittedRef.current = false;
                        const row = buildResult({hoTen, mssv, items, picks, startedAt, auto: false});
                        submittedRef.current = true;
                        setNopStatus('sending');
                        nopBaiLenBang(row)
                          .then((r) => setNopStatus(r.localOnly ? 'local' : 'ok'))
                          .catch(() => setNopStatus('loi'));
                      }}>
                      Gửi lại
                    </button>
                  </p>
                )}
                <div className={styles.bars}>
                  {[1, 2, 3, 4].map((c) => {
                    const row = stats.byChap[c];
                    const pct = row.total ? (100 * row.ok) / row.total : 0;
                    return (
                      <div className={styles.barRow} key={c}>
                        <span>{CHUONG_META[c].short}</span>
                        <div className={styles.barTrack}>
                          <span style={{width: `${pct}%`}} />
                        </div>
                        <b>
                          {row.ok}/{row.total}
                        </b>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            <div className={styles.layout}>
              <aside className={styles.palette}>
                <h3>Mục lục câu</h3>
                <div className={styles.grid100}>
                  {items.map((item, i) => {
                    const cls = [
                      styles.qdot,
                      i === index ? styles.qdotCurrent : '',
                      isAnswered(item, picks[i]) ? styles.qdotAnswered : '',
                      flags[i] ? styles.qdotFlag : '',
                    ]
                      .filter(Boolean)
                      .join(' ');
                    return (
                      <button key={item.id} className={cls} type="button" onClick={() => goto(i)}>
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
                <div className={styles.legend}>
                  <span>
                    <i className={styles.qdotAnswered} /> Đã làm
                  </span>
                  <span>
                    <i className={styles.qdotFlag} /> Gắn cờ
                  </span>
                </div>
              </aside>

              <section className={styles.qcard}>
                <div className={styles.qmeta}>
                  <strong>
                    Câu {index + 1}/{items.length}
                  </strong>
                  <span className={styles.badgeRow}>
                    <span className={styles.badge}>
                      {CHUONG_META[q.chapter].short} · {CHUONG_META[q.chapter].name}
                    </span>
                    <span className={`${styles.badge} ${styles.badgeType}`}>{TYPE_LABEL[type]}</span>
                  </span>
                </div>
                <div className={styles.progress}>
                  <span style={{width: `${(answeredCount / items.length) * 100}%`}} />
                </div>
                {q.figure ? <ExamFigure id={q.figure} /> : null}
                <p className={styles.stem}>{q.question}</p>
                {type === 'multi' && (
                  <p className={styles.typeHint}>Chọn tất cả đáp án đúng. Thiếu hoặc thừa = 0 điểm câu này.</p>
                )}
                {type === 'fill' && (
                  <p className={styles.typeHint}>Gõ đúng kết quả (không phân biệt hoa/thường, khoảng trắng thừa).</p>
                )}
                {renderOptions()}
                {review && <div className={styles.explain}>{q.explanation}</div>}
                <div className={styles.navRow}>
                  <button className={styles.ghostBtn} type="button" disabled={index === 0} onClick={() => goto(index - 1)}>
                    Câu trước
                  </button>
                  <button className={styles.ghostBtn} type="button" onClick={toggleFlag}>
                    {flags[index] ? 'Bỏ cờ' : 'Gắn cờ xem lại'}
                  </button>
                  {index < items.length - 1 ? (
                    <button className={styles.primaryBtn} type="button" onClick={() => goto(index + 1)}>
                      Câu tiếp
                    </button>
                  ) : (
                    phase === 'exam' && (
                      <button className={styles.dangerBtn} type="button" onClick={() => setConfirmOpen(true)}>
                        Nộp bài
                      </button>
                    )
                  )}
                  {phase === 'exam' && index < items.length - 1 && (
                    <button className={styles.dangerBtn} type="button" onClick={() => setConfirmOpen(true)}>
                      Nộp bài
                    </button>
                  )}
                </div>
              </section>
            </div>
          </>
        )}

        {confirmOpen && (
          <div className={styles.modalMask} role="dialog" aria-modal="true">
            <div className={styles.modal}>
              <h2>Nộp bài?</h2>
              <p>
                Bạn đã trả lời <b>{answeredCount}/{TONG_CAU}</b> câu
                {answeredCount < TONG_CAU ? `, còn ${TONG_CAU - answeredCount} câu trống (tính sai).` : '.'}
              </p>
              <div className={styles.navRow}>
                <button className={styles.ghostBtn} type="button" onClick={() => setConfirmOpen(false)}>
                  Làm tiếp
                </button>
                <button className={styles.dangerBtn} type="button" onClick={() => finish(false)}>
                  Xác nhận nộp
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
