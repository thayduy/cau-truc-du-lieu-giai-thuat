import React from 'react';

const ink = 'currentColor';

function Frame({w, h, children, title}) {
  return (
    <figure style={{margin: '0 0 1rem', maxWidth: '100%'}}>
      {title ? (
        <figcaption style={{fontSize: '0.78rem', opacity: 0.75, marginBottom: 6}}>{title}</figcaption>
      ) : null}
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        role="img"
        style={{
          display: 'block',
          background: 'var(--ifm-background-color)',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: 12,
        }}>
        {children}
      </svg>
    </figure>
  );
}

function Cell({x, y, w = 52, h = 36, text, hi, idx}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="5"
        fill={hi ? 'rgba(46,133,85,0.18)' : 'transparent'}
        stroke={ink}
        strokeWidth="1.4"
      />
      <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill={ink}>
        {text}
      </text>
      {idx != null && (
        <text x={x + w / 2} y={y + h + 14} textAnchor="middle" fontSize="11" fill={ink} opacity="0.7">
          {idx}
        </text>
      )}
    </g>
  );
}

function Arrow({x1, y1, x2, y2}) {
  const id = `a${x1}${y1}${x2}${y2}`;
  return (
    <g>
      <defs>
        <marker id={id} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill={ink} />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth="1.6" markerEnd={`url(#${id})`} />
    </g>
  );
}

const FIGURES = {
  'them-dau-sai': (
    <Frame w="520" h="150" title="Mảng n=3, dồn ThemDau từ i = 0 đi lên">
      <text x="20" y="28" fontSize="13" fill={ink}>
        Trước: a[0]=An a[1]=Binh a[2]=Chi
      </text>
      <Cell x="20" y="44" text="An" idx={0} />
      <Cell x="80" y="44" text="Binh" idx={1} />
      <Cell x="140" y="44" text="Chi" idx={2} />
      <text x="20" y="112" fontSize="13" fill={ink}>
        a[1]=a[0]; a[2]=a[1]; a[3]=a[2] …
      </text>
      <text x="20" y="134" fontSize="12" fill={ink} opacity="0.75">
        Mỗi bước copy ô vừa bị đè — suy ra mảng sau?
      </text>
    </Frame>
  ),
  'con-tro': (
    <Frame w="480" h="130" title="Hai biến int và con trỏ p">
      <Cell x="40" y="36" w="80" text="x=10" />
      <Cell x="300" y="36" w="90" text="p" hi />
      <text x="80" y="92" fontSize="11" fill={ink} opacity="0.7">
        0x100
      </text>
      <Arrow x1="300" y1="54" x2="128" y2="54" />
      <text x="180" y="48" fontSize="12" fill={ink}>
        p = &x
      </text>
      <text x="40" y="118" fontSize="13" fill={ink}>
        Lệnh kế: *p = 99; rồi p = &y; *p = 5;
      </text>
    </Frame>
  ),
  'nhi-phan-35': (
    <Frame w="540" h="120" title="Tìm nhị phân x = 35 trên mảng đã tăng">
      {[10, 20, 30, 40, 50, 60, 70, 80].map((v, i) => (
        <Cell key={v} x={16 + i * 64} y="28" text={String(v)} idx={i} hi={i === 3} />
      ))}
      <text x="16" y="100" fontSize="13" fill={ink}>
        L=0, R=7, M=(0+7)/2=3, a[M]=40
      </text>
    </Frame>
  ),
  'heap-cay': (
    <Frame w="420" h="220" title="Cây đang ứng với mảng [4, 10, 3, 5, 1] (chỉ số 0)">
      <Cell x="174" y="16" text="4" idx={0} />
      <Cell x="70" y="90" text="10" idx={1} />
      <Cell x="278" y="90" text="3" idx={2} />
      <Cell x="20" y="164" text="5" idx={3} />
      <Cell x="120" y="164" text="1" idx={4} />
      <Arrow x1="190" y1="52" x2="110" y2="90" />
      <Arrow x1="230" y1="52" x2="290" y2="90" />
      <Arrow x1="90" y1="126" x2="55" y2="164" />
      <Arrow x1="110" y1="126" x2="140" y2="164" />
    </Frame>
  ),
  'bubble-pass0': (
    <Frame w="480" h="100" title="Bubble: so kề, pass i = 0 trên [5, 1, 4, 2]">
      <Cell x="30" y="28" text="5" />
      <Cell x="100" y="28" text="1" />
      <Cell x="170" y="28" text="4" />
      <Cell x="240" y="28" text="2" />
      <text x="30" y="86" fontSize="13" fill={ink}>
        5↔1, rồi 5↔4, rồi 5↔2 — max nổi về đâu?
      </text>
    </Frame>
  ),
  'merge-cay': (
    <Frame w="500" h="180" title="Cây chia MergeSort [5, 1, 4, 2]">
      <text x="180" y="28" fontSize="14" fontWeight="700" fill={ink}>
        [5, 1, 4, 2]
      </text>
      <text x="70" y="78" fontSize="13" fill={ink}>
        [5, 1]
      </text>
      <text x="300" y="78" fontSize="13" fill={ink}>
        [4, 2]
      </text>
      <text x="40" y="128" fontSize="13" fill={ink}>
        [5] [1]
      </text>
      <text x="280" y="128" fontSize="13" fill={ink}>
        [4] [2]
      </text>
      <text x="20" y="168" fontSize="12" fill={ink} opacity="0.75">
        Trộn lá trước: [5] với [1] ra gì trên a[0..1]?
      </text>
    </Frame>
  ),
  'dslk-don': (
    <Frame w="540" h="130" title="DSLK đơn + pHead, pTail">
      <Cell x="40" y="36" w="90" text="10 | ●" />
      <Cell x="200" y="36" w="90" text="20 | ●" />
      <Cell x="360" y="36" w="90" text="30 | /" />
      <Arrow x1="130" y1="54" x2="196" y2="54" />
      <Arrow x1="290" y1="54" x2="356" y2="54" />
      <text x="55" y="100" fontSize="12" fill={ink}>
        pHead
      </text>
      <text x="380" y="100" fontSize="12" fill={ink}>
        pTail
      </text>
      <text x="40" y="120" fontSize="12" fill={ink} opacity="0.75">
        Đứng ở 20: biết 30, không biết 10
      </text>
    </Frame>
  ),
  'dslk-vong': (
    <Frame w="500" h="150" title="Vòng đơn — chỉ giữ pTail">
      <Cell x="60" y="40" w="90" text="10 | ●" />
      <Cell x="200" y="40" w="90" text="20 | ●" />
      <Cell x="340" y="40" w="90" text="30 | ●" />
      <Arrow x1="150" y1="58" x2="196" y2="58" />
      <Arrow x1="290" y1="58" x2="336" y2="58" />
      <path d="M385,40 C385,12 60,12 60,40" fill="none" stroke={ink} strokeWidth="1.6" />
      <text x="355" y="108" fontSize="12" fill={ink}>
        pTail
      </text>
      <text x="60" y="132" fontSize="12" fill={ink}>
        head = pTail-&gt;pNext = 10
      </text>
    </Frame>
  ),
  'xoa-dau-bay': (
    <Frame w="500" h="120" title="Hai dòng lệnh — cái nào treo, cái nào rò?">
      <text x="24" y="40" fontSize="14" fontFamily="ui-monospace,monospace" fill={ink}>
        (1) delete pHead; pHead = pHead-&gt;pNext;
      </text>
      <text x="24" y="72" fontSize="14" fontFamily="ui-monospace,monospace" fill={ink}>
        (2) pHead = pHead-&gt;pNext; // không delete
      </text>
      <text x="24" y="104" fontSize="13" fill={ink} opacity="0.75">
        Node heap cũ mất địa chỉ hay bị đọc sau free?
      </text>
    </Frame>
  ),
  stack: (
    <Frame w="280" h="210" title="Stack mảng, quy ước đỉnh trên">
      <Cell x="90" y="20" text="30" hi />
      <Cell x="90" y="64" text="20" />
      <Cell x="90" y="108" text="10" />
      <text x="160" y="42" fontSize="13" fill={ink}>
        ← top
      </text>
      <text x="90" y="172" fontSize="13" fill={ink}>
        đáy
      </text>
      <text x="24" y="198" fontSize="13" fill={ink}>
        Pop lần lượt ra thứ tự nào?
      </text>
    </Frame>
  ),
  'queue-vong': (
    <Frame w="520" h="140" title="Hàng đợi vòng MAX = 4, front=0, rear=3">
      <Cell x="40" y="36" text="A" idx={0} hi />
      <Cell x="110" y="36" text="B" idx={1} />
      <Cell x="180" y="36" text="C" idx={2} />
      <Cell x="250" y="36" text="D" idx={3} />
      <text x="40" y="100" fontSize="13" fill={ink}>
        front
      </text>
      <text x="250" y="100" fontSize="13" fill={ink}>
        rear
      </text>
      <text x="40" y="126" fontSize="13" fill={ink}>
        (rear+1)%4 = ? so với front — đầy hay còn chỗ?
      </text>
    </Frame>
  ),
  'queue-bo': (
    <Frame w="520" h="130" title="Queue mảng thẳng MAX=5 sau vài Dequeue">
      <Cell x="20" y="28" text="·" idx={0} />
      <Cell x="80" y="28" text="·" idx={1} />
      <Cell x="140" y="28" text="A" idx={2} hi />
      <Cell x="200" y="28" text="B" idx={3} />
      <Cell x="260" y="28" text="C" idx={4} />
      <text x="140" y="90" fontSize="12" fill={ink}>
        front=2
      </text>
      <text x="260" y="90" fontSize="12" fill={ink}>
        rear=4
      </text>
      <text x="20" y="116" fontSize="13" fill={ink}>
        Enqueue D: rear++ = 5 → “đầy” dù ô 0,1 trống
      </text>
    </Frame>
  ),
  ngoac: (
    <Frame w="460" h="110" title='Chuỗi ngoặc: ( [ ) ]'>
      <text x="30" y="40" fontSize="28" fontFamily="ui-monospace,monospace" fill={ink}>
        ( [ ) ]
      </text>
      <text x="30" y="78" fontSize="13" fill={ink}>
        Stack sau khi gặp ')': đỉnh đang là '['
      </text>
    </Frame>
  ),
  'interchange-sel': (
    <Frame w="520" h="130" title="Cùng [5, 3, 4, 1], xong vòng ngoài i = 0">
      <text x="20" y="32" fontSize="13" fill={ink}>
        Interchange: đổi ngay mỗi khi a[0] &gt; a[j]
      </text>
      <text x="20" y="58" fontSize="13" fill={ink}>
        Selection: tìm min cả đoạn, đổi một lần với a[0]
      </text>
      <text x="20" y="98" fontSize="13" fill={ink} opacity="0.8">
        Hai mảng sau i=0 có giống nhau không?
      </text>
    </Frame>
  ),
  partition: (
    <Frame w="480" h="100" title="Lomuto, pivot = a[high] = 2">
      <Cell x="30" y="24" text="5" />
      <Cell x="100" y="24" text="1" />
      <Cell x="170" y="24" text="8" />
      <Cell x="240" y="24" text="2" hi />
      <text x="30" y="84" fontSize="13" fill={ink}>
        low=0 high=3 — mảng sau partition?
      </text>
    </Frame>
  ),
};

export const FIGURE_BY_ID = {
  2: 'them-dau-sai',
  19: 'nhi-phan-35',
  20: 'con-tro',
  31: 'interchange-sel',
  35: 'bubble-pass0',
  38: 'partition',
  40: 'heap-cay',
  53: 'heap-cay',
  56: 'xoa-dau-bay',
  57: 'xoa-dau-bay',
  62: 'dslk-vong',
  65: 'dslk-don',
  81: 'stack',
  85: 'ngoac',
  90: 'queue-bo',
  93: 'queue-vong',
};

export function ExamFigure({id}) {
  const node = FIGURES[id];
  if (!node) return null;
  return node;
}
