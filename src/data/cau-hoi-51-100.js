/** 100 câu trắc nghiệm khó — phần 2 (câu 51–100). Căn cứ Ch.2–4. */
export const CAU_HOI_51_100 = [
  {
    id: 51,
    chapter: 2,
    question:
      'Mảng đã tăng, tìm nhị phân x không có, n = 16. Số so sánh tối đa cỡ nào so với tuyến tính?',
    options: [
      'Cả hai đều 16.',
      'Nhị phân ≤ ⌈log₂ 16⌉ + 1 kiểu (vài bước, ≤ 5); tuyến tính 16.',
      'Nhị phân 1 lần vì đã sort.',
      'Tuyến tính log n vì mảng tăng.',
    ],
    answer: 1,
    explanation:
      'Nhị phân xấu cũng log: mỗi bước bỏ nửa. n càng lớn khe càng rộng. n=8 tối đa ~4, không phải 8.',
  },
  {
    id: 52,
    chapter: 2,
    question:
      'Cần O(n log n) LUÔN, phụ O(1) trên mảng, không bắt buộc ổn định. Chọn?',
    options: [
      'Quick (xấu có thể n²).',
      'Merge (phụ O(n)).',
      'Heap Sort.',
      'Insertion (xấu n²).',
    ],
    answer: 2,
    explanation:
      'Giáo trình: cần n log n luôn + phụ O(1) → Heap. Quick tránh file đã tăng + pivot cuối.',
  },
  {
    id: 53,
    chapter: 2,
    question:
      'Sau dựng max-heap [10,5,3,4,1], lượt sort đầu: đổi a[0]↔a[4] rồi heapify size=4. Mảng ngay sau đổi, trước sàng?',
    options: [
      '[1, 5, 3, 4, 10]',
      '[10, 5, 3, 4, 1] không đổi',
      '[5, 4, 3, 1, 10]',
      '[1, 4, 3, 5, 10]',
    ],
    answer: 0,
    explanation:
      'Đổi gốc 10 với cuối 1 → [1,5,3,4,10]. Rồi sàng 1 xuống thành [5,4,3,1,10], 10 neo.',
  },
  {
    id: 54,
    chapter: 2,
    question:
      'Bubble j < n−1 (KHÔNG trừ i). Hệ quả?',
    options: [
      'Sai kết quả, mảng không tăng.',
      'Vẫn đúng nhưng so thừa các cặp đã neo; j <= n−1 thì vượt a[j+1] (lỗi biên).',
      'Cờ swapped không bao giờ true.',
      'Biến thành Interchange.',
    ],
    answer: 1,
    explanation:
      'j < n−1−i mới khỏi so đoạn đã neo. j <= n−1 truy cập a[n].',
  },
  {
    id: 55,
    chapter: 2,
    question:
      'Sort điểm rồi sort tên (ổn định) để người cùng tên giữ thứ tự điểm. Thuật toán tên PHẢI ổn định. Loại nào rủi ro?',
    options: [
      'Merge, Insertion.',
      'Quick / Heap / Selection — có thể đảo An(8) và Binh(8) dù đã sort điểm.',
      'Bubble so >.',
      'Mọi thuật toán n log n đều giữ thứ tự.',
    ],
    answer: 1,
    explanation:
      'Chi(7), An(8), Binh(8) — sort không ổn định có thể thành Chi, Binh, An.',
  },
  {
    id: 56,
    chapter: 3,
    question:
      'Xóa nút đầu DSLK: delete pHead; rồi pHead = pHead->pNext. Lỗi?',
    options: [
      'Không lỗi nếu đã NULL-check.',
      'Dùng ô đã trả (dangling) — crash / UB. Đúng: temp = pHead; pHead = pHead->pNext; delete temp.',
      'Chỉ leak, không treo.',
      'pNext tự cập nhật khi delete.',
    ],
    answer: 1,
    explanation:
      'delete trước rồi đọc pHead->pNext = dangling. Đổi pHead trước mà không delete = leak.',
  },
  {
    id: 57,
    chapter: 3,
    question:
      'pHead = pHead->pNext mà KHÔNG giữ nút cũ để delete. Hệ quả?',
    options: [
      'Dangling pointer.',
      'Memory leak — node heap không còn cách free.',
      'pTail tự về NULL.',
      'Danh sách rỗng hợp lệ.',
    ],
    answer: 1,
    explanation:
      'Mất địa chỉ node → không delete được. Leak ≠ dangling (dangling là trỏ ô đã free).',
  },
  {
    id: 58,
    chapter: 3,
    question:
      'DSLK đơn có cả pHead và pTail. Xóa cuối có O(1) không? Vì sao?',
    options: [
      'Có, vì đã cầm pTail.',
      'Không — không có pPrev, phải tìm nút KẾ CUỐI từ đầu, vẫn O(n). pTail chỉ giúp thêm cuối O(1).',
      'Có nếu danh sách đã sort.',
      'O(1) khi n > 1, O(n) khi n = 1.',
    ],
    answer: 1,
    explanation:
      'Xóa tail phải nối nút trước tới NULL. Đơn không đi lùi. Kép: XoaCuoi O(1).',
  },
  {
    id: 59,
    chapter: 3,
    question:
      'DSLK đơn chỉ giữ pHead (không pTail). ThemCuoi độ phức tạp?',
    options: [
      'O(1) như ThemDau.',
      'O(n) — phải đi tới nút cuối.',
      'O(log n).',
      'O(1) nếu dùng new.',
    ],
    answer: 1,
    explanation:
      'Có pTail thì ThemCuoi O(1). Thi/thực hành dùng cả hai và PHẢI cập nhật pTail khi thêm/xóa đụng cuối.',
  },
  {
    id: 60,
    chapter: 3,
    question:
      'DSLK đơn rỗng. ThemDau một nút. Cần cập nhật gì?',
    options: [
      'Chỉ pHead = p; pTail giữ NULL.',
      'Cả pHead và pTail cùng trỏ nút mới (một nút vừa đầu vừa cuối).',
      'Chỉ pTail = p; pHead tự suy ra.',
      'Không cần pNext = NULL vì new đã zero.',
    ],
    answer: 1,
    explanation:
      'Rỗng và một nút là hai case bắt buộc. Quên pTail → ThemCuoi lần sau hỏng âm thầm.',
  },
  {
    id: 61,
    chapter: 3,
    question:
      'Trên DSLK, p là NODE*. p + 1 cho ra node kế?',
    options: [
      'Có, vì con trỏ số học như mảng.',
      'Không — nút rải rác heap; bắt buộc p = p->pNext. Đó là lý do không a[i] O(1).',
      'Có nếu cấp phát bằng new NODE[n].',
      'Chỉ sai với kép.',
    ],
    answer: 1,
    explanation:
      'Pool mảng giả lập DSLK mới nhảy theo chỉ số next, không phải p+1 trên heap rời.',
  },
  {
    id: 62,
    chapter: 3,
    question:
      'Duyệt DSLK vòng bằng while (p != NULL). Hệ quả?',
    options: [
      'Đúng vì cuối vẫn NULL.',
      'Lặp vô hạn — vòng không còn NULL; phải do-while, dừng khi gặp lại head.',
      'Chỉ sai khi một nút.',
      'pTail == NULL nên vòng không vào.',
    ],
    answer: 1,
    explanation:
      'Nút cuối nắm head. Điều kiện dừng: quay lại pTail->pNext, không phải NULL.',
  },
  {
    id: 63,
    chapter: 3,
    question:
      'Vì sao vòng đơn giáo trình chỉ giữ pTail, head = pTail->pNext?',
    options: [
      'pHead không tồn tại trên vòng.',
      'Chèn ngay SAU tail = thêm đầu (không dời pTail) hoặc thêm cuối (dời pTail) — cả hai O(1). Chỉ pHead thì thêm cuối phải tìm last O(n).',
      'pTail tốn ít RAM hơn pHead.',
      'Heap chỉ cho một con trỏ gốc.',
    ],
    answer: 1,
    explanation:
      'Cùng chỗ chèn sau tail. ThemDau không dời pTail; ThemCuoi dời pTail sang nút mới.',
  },
  {
    id: 64,
    chapter: 3,
    question:
      'DSLK vòng một nút. Bất biến nào ĐÚNG?',
    options: [
      'pTail->pNext == NULL',
      'pTail->pNext == pTail (tự trỏ mình); head = pTail',
      'pHead != pTail',
      'Không thể có đúng một nút trên vòng.',
    ],
    answer: 1,
    explanation:
      'Rỗng ⇔ pTail==NULL. Một nút ⇔ pTail->pNext==pTail. Nhiều nút: đi n bước về head.',
  },
  {
    id: 65,
    chapter: 3,
    question:
      'Đứng tại nút p (không phải đầu) trên DSLK ĐƠN, muốn xóa p. Cần gì?',
    options: [
      'Chỉ p->pNext = p->pNext->pNext.',
      'Phải có nút TRƯỚC p (đi từ pHead) để nối prev->pNext = p->pNext; đơn không đi lùi.',
      'delete p là đủ, các nút tự vá.',
      'Luôn O(1) vì đang cầm p.',
    ],
    answer: 1,
    explanation:
      'Đơn: biết sau, KHÔNG biết trước. Kép: xóa nút đang cầm O(1) nhờ pPrev.',
  },
  {
    id: 66,
    chapter: 3,
    question:
      'DSLK kép: xóa cuối so với đơn?',
    options: [
      'Cả hai O(n).',
      'Kép O(1): pTail = pTail->pPrev; pTail->pNext = NULL. Đơn O(n).',
      'Đơn O(1) nhờ pTail; kép O(n) vì sửa 4 liên kết.',
      'Kép O(log n).',
    ],
    answer: 1,
    explanation:
      'Đó là lý do deque / LRU dùng kép: PopBack O(1).',
  },
  {
    id: 67,
    chapter: 3,
    question:
      'Chèn giữa DSLK kép (đã cầm vị trí). Số liên kết cần sửa (ý “đủ 4 liên kết”)?',
    options: [
      '1 như đơn.',
      'Thường 4 chiều: mới↔sau và mới↔trước (pNext/pPrev hai phía), nếu thiếu một chiều list đứt một chiều.',
      '8 vì mỗi nút 4 con trỏ.',
      '0 vì new đã nối.',
    ],
    answer: 1,
    explanation:
      'Kép: hai chiều khớp là bất biến. Sửa thiếu pPrev của nút sau → đi lùi sai.',
  },
  {
    id: 68,
    chapter: 3,
    question:
      'SapXep DSLK đúng đề thi khóa này là thuật toán nào?',
    options: [
      'Selection trên con trỏ min_idx.',
      'Đổi chỗ trực tiếp (Interchange): hai vòng, gặp lớn thì đổi data ngay — không relink.',
      'Quick partition trên pNext.',
      'Heap vì n log n.',
    ],
    answer: 1,
    explanation:
      'Nhìn code: không có min_idx → Interchange. Relink / Merge là nâng cao, không nhầm với đề “đổi chỗ trực tiếp”.',
  },
  {
    id: 69,
    chapter: 3,
    question:
      'Đổi chỗ hai nút DSLK bằng swap data vs relink. Khác biệt?',
    options: [
      'Swap data O(n); relink O(1).',
      'Swap data đơn giản, struct lớn thì đắt / iterator ngoài có thể “sai nghĩa”; relink sửa con trỏ, nút giữ identity.',
      'Relink cấm trên đơn.',
      'Hai cách luôn tương đương mọi mặt.',
    ],
    answer: 1,
    explanation:
      'Đề thi swap data. Relink khó hơn (cầm prev). Merge Sort DSLK thường relink, hợp hơn Quick.',
  },
  {
    id: 70,
    chapter: 3,
    question:
      'Josephus n = 5 người (1..5), mỗi lần đếm k = 2 người thì loại (vòng). Người còn lại?',
    options: [
      '1',
      '2',
      '3',
      '5',
    ],
    answer: 2,
    explanation:
      'Loại lần lượt 2, 4, 1, 5 → còn 3. DSLK vòng + đếm k bước là mô hình tự nhiên (không NULL).',
  },
  {
    id: 71,
    chapter: 3,
    question:
      'NODE p; // biến cục bộ trong hàm ThemDau, rồi pHead = &p. Sau khi hàm return?',
    options: [
      'Nút sống trên heap mãi.',
      'Ô stack của p chết — pHead dangling. Node DSLK phải new/malloc trên heap.',
      'C++ tự chuyển p sang heap.',
      'Chỉ sai nếu p.pNext != NULL.',
    ],
    answer: 1,
    explanation:
      'Stack bộ nhớ (Ch.3) ≠ Stack ADT (Ch.4). Hết hàm mất biến cục bộ.',
  },
  {
    id: 72,
    chapter: 3,
    question:
      'ThemDau(LIST l, NODE* p) truyền LIST theo GIÁ TRỊ (không &). Trong hàm gán l.pHead = p. Bên ngoài?',
    options: [
      'pHead ngoài đổi vì NODE* là con trỏ.',
      'LIST ngoài không đổi — sửa bản sao. Phải ThemDau(LIST &l, …) hoặc NODE**.',
      'Chỉ pTail ngoài đổi.',
      'new trong hàm đủ để head ngoài đổi.',
    ],
    answer: 1,
    explanation:
      '& ở LIST &l là tham chiếu C++, khác &a lấy địa chỉ. Đổi được pHead/pTail người gọi.',
  },
  {
    id: 73,
    chapter: 3,
    question:
      'Dummy / header node trong giáo trình khóa này?',
    options: [
      'Bắt buộc mọi DSLK thi.',
      'Khóa này KHÔNG dùng; rỗng = pHead==NULL, thêm/xóa phải xét rỗng và một nút.',
      'Thay thế pTail.',
      'Chỉ vòng kép mới có.',
    ],
    answer: 1,
    explanation:
      'Bảng thuật ngữ: dummy làm code gọn nhưng khóa không dùng.',
  },
  {
    id: 74,
    chapter: 3,
    question:
      'Trộn (Noi/Merge) hai DSLK đơn ĐÃ SORT. Ý đúng?',
    options: [
      'Phải copy data sang mảng, Merge Sort, dựng list lại.',
      'Chỉ sửa pNext (relink) O(n+m); không cần n log n lại từ đầu. Merge hợp DSLK hơn Quick.',
      'Quick partition trên list luôn O(n log n).',
      'Không trộn được vì không a[i].',
    ],
    answer: 1,
    explanation:
      'Hai con trỏ đầu list, lấy nút nhỏ hơn mà nối. Ứng dụng gộp hai lớp đã sort MSSV.',
  },
  {
    id: 75,
    chapter: 3,
    question:
      'Bất biến DSLK đơn thẳng sau mọi thao tác hợp lệ?',
    options: [
      'pHead->pPrev == NULL.',
      'Nếu không rỗng: pTail->pNext == NULL; đi từ pHead theo pNext tới pTail rồi NULL.',
      'pTail->pNext == pHead.',
      'pHead == pTail luôn.',
    ],
    answer: 1,
    explanation:
      'pTail->pNext == pHead là vòng, không phải thẳng. Thẳng: cuối NULL.',
  },
  {
    id: 76,
    chapter: 3,
    question:
      'Thêm/xóa giữa DSLK khi ĐÃ cầm nút trước vị trí, so với mảng?',
    options: [
      'Cả hai O(1).',
      'DSLK sửa 1–2 con trỏ O(1); mảng dồn O(n). Nếu phải TÌM vị trí: cả hai O(n) phần tìm.',
      'Mảng O(1) nhờ a[i]; DSLK O(n) kể cả đã cầm nút.',
      'DSLK luôn O(n) nên mảng luôn thắng.',
    ],
    answer: 1,
    explanation:
      'Bẫy “DSLK thêm O(1)”: đúng thêm đầu, hoặc giữa khi cầm prev, hoặc cuối khi có pTail.',
  },
  {
    id: 77,
    chapter: 3,
    question:
      'Back/Forward trình duyệt, Undo/Redo hai chiều. CTDL phù hợp trong Ch.3–4?',
    options: [
      'DSLK đơn + Queue vòng.',
      'DSLK kép (đi lùi O(1)) hoặc hai Stack; đơn đi lùi phải gửi lại từ head.',
      'Mảng a[i] vì O(1).',
      'Chỉ Heap.',
    ],
    answer: 1,
    explanation:
      'Kép: pPrev. Ứng dụng: Back/Forward, LRU, deque. Đơn không đi lùi O(1).',
  },
  {
    id: 78,
    chapter: 3,
    question:
      'Round-robin CPU / playlist lặp. Vì sao vòng hơn thẳng + if về head?',
    options: [
      'Vòng tìm O(log n).',
      'Không NULL, next của cuối là đầu — tiến một bước luôn hợp lệ; thẳng phải if (p->pNext==NULL) p=pHead dễ quên.',
      'Vòng truy cập a[i] O(1).',
      'Vòng cấm pTail.',
    ],
    answer: 1,
    explanation:
      'Josephus, round-robin, playlist. Đừng lẫn hàng đợi vòng (mảng %, Ch.4) với DSLK vòng.',
  },
  {
    id: 79,
    chapter: 3,
    question:
      'Hủy DSLK đơn: while (pHead) { pHead = pHead->pNext; delete pHead; } (không temp). Sai vì?',
    options: [
      'delete NULL ở cuối là đủ dừng.',
      'Đổi pHead rồi delete pHead = xóa nút MỚI, leak nút cũ + có thể xóa nhầm/crash. Cần temp.',
      'Chỉ sai với kép.',
      'delete không cần vì hết hàm OS thu.',
    ],
    answer: 1,
    explanation:
      'OS thu khi process chết, không bào chữa leak trong chương trình dài. Đúng: temp=head; head=next; delete temp.',
  },
  {
    id: 80,
    chapter: 3,
    question:
      'Vòng kép so với vòng đơn: điểm mạnh / giá?',
    options: [
      'Vòng kép truy cập giữa O(1).',
      'Đi hai chiều + xóa đang cầm / xóa cuối O(1); giá: mỗi nút hai con trỏ, sửa đủ liên kết khép kín (head->pPrev==pTail, pTail->pNext==head).',
      'Vòng đơn luôn chậm hơn cùng hệ số n.',
      'Vòng kép không cần bất biến.',
    ],
    answer: 1,
    explanation:
      'Bảng bốn loại: đơn / kép / vòng / vòng kép — chọn theo đi lùi và tuần hoàn, không “oai”.',
  },
  {
    id: 81,
    chapter: 4,
    question:
      'Stack và Queue khác nhau ở quy tắc vào–ra, KHÔNG phải “một cái là DSLK”. Phát biểu đúng?',
    options: [
      'Stack FIFO, Queue LIFO.',
      'Stack LIFO (chỉ đụng đỉnh); Queue FIFO (vào rear, ra front). Cả hai cài được bằng mảng hoặc DSLK.',
      'Queue không cài bằng mảng.',
      'Stack bắt buộc mảng vì đề thi class Stack.',
    ],
    answer: 1,
    explanation:
      'ADT = quy tắc. Đề thi: class Stack mảng, class Queue vòng. DSLK: Push=ThemDau, Enqueue=ThemCuoi + Dequeue=XoaDau.',
  },
  {
    id: 82,
    chapter: 4,
    question:
      'Stack mảng, top = −1. Push viết data[top++] = x (hậu tố ++). Lỗi?',
    options: [
      'Không lỗi, top thành 0.',
      'Ghi data[−1] rồi mới tăng top. Phải ++top TRƯỚC rồi ghi data[top].',
      'Chỉ sai khi stack đầy.',
      'Hậu tố nhanh hơn tiền tố nên giáo trình dùng top++.',
    ],
    answer: 1,
    explanation:
      'Quy ước rỗng top=−1. Tăng đỉnh trước, rồi ghi ô mới.',
  },
  {
    id: 83,
    chapter: 4,
    question:
      'Peek / GetFront khác Pop / Dequeue chỗ nào?',
    options: [
      'Peek xóa nhưng không trả giá trị.',
      'Peek đọc đỉnh/đầu, KHÔNG đổi top hay front/rear.',
      'Peek O(n); Pop O(1).',
      'Peek chỉ có trên Queue.',
    ],
    answer: 1,
    explanation:
      'Hợp đồng ADT: xem ≠ lấy. Pop khi rỗng = underflow.',
  },
  {
    id: 84,
    chapter: 4,
    question:
      'Đệ quy vô hạn làm chương trình chết. Đó là overflow của cấu trúc nào?',
    options: [
      'class Stack.IsFull() trên mảng MAX=100.',
      'Call stack hệ thống (mỗi lời gọi một khung) — khác overflow ADT IsFull.',
      'Hàng đợi vòng đầy.',
      'Heap C++ hết new.',
    ],
    answer: 1,
    explanation:
      'Cùng LIFO, khác nơi cất. NLR đệ quy Ch.5 cũng dùng call stack. IsFull là ADT mảng.',
  },
  {
    id: 85,
    chapter: 4,
    question:
      'KiemTraDauNgoac(\"([)]\"). Kết quả và lý do?',
    options: [
      'Đúng vì số mở = số đóng.',
      'SAI: Pop \'[\' không khớp \')\' — đúng loại và đúng thứ tự lồng, không chỉ đếm.',
      'Đúng vì [] nằm trong ().',
      'SAI chỉ vì stack còn phần tử lúc hết chuỗi.',
    ],
    answer: 1,
    explanation:
      'Chạy tay: Push ( [ ; gặp ) Pop [ ≠ (. “(())” đúng; “(()” hết chuỗi stack còn mở → sai; “)(” đóng khi rỗng → sai.',
  },
  {
    id: 86,
    chapter: 4,
    question:
      'Hết chuỗi ngoặc, stack còn \'(\'. Kết luận thuật toán giáo trình?',
    options: [
      'Đúng nếu đã khớp từng cặp trước đó.',
      'SAI — đúng khi và chỉ khi stack rỗng sau vòng.',
      'Phải Push thêm \')\'.',
      'Peek bằng \'(\' nghĩa là đúng.',
    ],
    answer: 1,
    explanation:
      'return st.IsEmpty(). Còn mở = thiếu đóng.',
  },
  {
    id: 87,
    chapter: 4,
    question:
      'Trung tố 3+4*5 đổi hậu tố (ưu tiên * = 2 > + = 1, kết hợp trái, ≥ thì Pop)?',
    options: [
      '3 + 4 * 5 (giữ trung tố)',
      '3 4 + 5 *',
      '3 4 5 * +',
      '+ * 3 4 5',
    ],
    answer: 2,
    explanation:
      '3 ra; + Push; 4 ra; * ưu tiên cao hơn + nên Push *; 5 ra; hết Pop * rồi +. Hậu tố không cần ngoặc.',
  },
  {
    id: 88,
    chapter: 4,
    question:
      'Tính hậu tố 3 4 + 5 *. Stack số, Pop b rồi a, tính a op b. Kết quả?',
    options: [
      '27  (nhầm 3*(4+5))',
      '35',
      '17',
      '12',
    ],
    answer: 1,
    explanation:
      '3,4 → + cho 7; 5 → * cho 35. Thứ tự b=Pop() (phải), a=Pop() (trái) — trừ/chia không giao hoán.',
  },
  {
    id: 89,
    chapter: 4,
    question:
      '(3+4)*5-6/2 → hậu tố theo bảng giáo trình?',
    options: [
      '3 4 + 5 * 6 2 / -',
      '3 4 5 * + 6 2 / -',
      '3 4 + 5 6 2 / - *',
      '3 + 4 * 5 - 6 / 2',
    ],
    answer: 0,
    explanation:
      'Shunting-yard: ) Pop +; * Push; − gặp * (ưu tiên 2≥1) Pop *; / Push cạnh −; hết Pop / rồi −.',
  },
  {
    id: 90,
    chapter: 4,
    question:
      'Hàng đợi mảng THẲNG: Enqueue rear++, Dequeue front++. Vì sao “đầy giả” / bò trườn?',
    options: [
      'FIFO sai trên mảng.',
      'Ô trước front bỏ không dùng; rear tới MAX−1 dù còn chỗ đầu mảng. Vòng: kế = (i+1)%MAX.',
      'front phải giảm chứ không tăng.',
      'Chỉ xảy ra khi MAX lẻ.',
    ],
    answer: 1,
    explanation:
      'Đề bắt Queue vòng. Đừng dồn mảng mỗi Dequeue (O(n)) trừ khi đề cho phép.',
  },
  {
    id: 91,
    chapter: 4,
    question:
      'Hàng đợi vòng giáo trình: IsFull và IsEmpty?',
    options: [
      'Full: front==rear; Empty: front==−1 — cùng một công thức.',
      'Empty: front==−1; Full: (rear+1)%MAX == front. Rỗng không nhầm full vì (−1+1)%MAX=0 ≠ −1.',
      'Full: rear==MAX−1; Empty: top==−1.',
      'Full khi rear==front==0.',
    ],
    answer: 1,
    explanation:
      'Quy ước −1 = rỗng dùng hết MAX ô. Biến thể chừa 1 ô (front==rear) KHÔNG dùng trong đề.',
  },
  {
    id: 92,
    chapter: 4,
    question:
      'Queue vòng rỗng (front=rear=−1). Enqueue phần tử đầu. Phải làm gì?',
    options: [
      'Chỉ rear++ rồi ghi data[rear] (rear thành 0, front còn −1).',
      'Gán CẢ front và rear về 0, rồi ghi data[0].',
      'front=0, rear=1.',
      'Push như Stack: ++top.',
    ],
    answer: 1,
    explanation:
      'Không chỉ rear++. Dequeue phần tử cuối: reset CẢ hai về −1 (về Init).',
  },
  {
    id: 93,
    chapter: 4,
    question:
      'MAX = 4, front = 0, rear = 3. IsFull?',
    options: [
      'Không, còn ô vì 4 ô chưa chắc đầy.',
      'Có: (3+1)%4 = 0 == front.',
      'Có vì rear==MAX−1 như mảng thẳng.',
      'Không vì front==0 nghĩa là rỗng.',
    ],
    answer: 1,
    explanation:
      'Đã 4 phần tử. Enqueue thêm sẽ đè front nếu không kiểm IsFull.',
  },
  {
    id: 94,
    chapter: 4,
    question:
      'Hàng đợi vòng (mảng, Ch.4) khác DSLK vòng (Ch.3) chỗ nào?',
    options: [
      'Cùng một cấu trúc, khác tên.',
      'Vòng mảng: chỉ số % MAX, ADT FIFO, ô kề; DSLK vòng: pNext khép, không % , không bắt buộc FIFO.',
      'DSLK vòng cấm Queue.',
      'Cả hai đều IsFull = (rear+1)%MAX==front.',
    ],
    answer: 1,
    explanation:
      'Cùng chữ “vòng”, khác hẳn. Queue DSLK: front=pHead, rear=pTail, không bò trườn, không IsFull ADT (hết RAM).',
  },
  {
    id: 95,
    chapter: 4,
    question:
      'Cài Stack bằng DSLK đơn. Push / Pop nên đụng đầu hay cuối?',
    options: [
      'Push = ThemCuoi, Pop = XoaCuoi (đơn XoaCuoi O(n) — tệ).',
      'Push = ThemDau, Pop = XoaDau — cả hai O(1); đỉnh = pHead.',
      'Phải dùng kép vì Stack đi hai chiều.',
      'Push đầu, Pop cuối để ra FIFO.',
    ],
    answer: 1,
    explanation:
      'LIFO tại một đầu. Đầu list rẻ. Queue mới hai đầu: ThemCuoi + XoaDau.',
  },
  {
    id: 96,
    chapter: 4,
    question:
      'Duyệt cây NLR lặp (gợi ý Ch.4): Push gốc; Pop in; Push phải rồi trái. Vì sao phải trước trái?',
    options: [
      'Cây luôn nghiêng phải.',
      'LIFO: trái nằm trên đỉnh → Pop ra trước, đúng NLR. Level-order đổi sang Queue.',
      'Stack FIFO trong trường hợp này.',
      'Phải Push trái rồi phải.',
    ],
    answer: 1,
    explanation:
      'Muốn trái xử lý trước thì Push sau. Queue thì vào trước ra trước → theo mức.',
  },
  {
    id: 97,
    chapter: 4,
    question:
      'TinhBieuThuc hai stack (số hạng + toán tử) so với “ra hậu tố rồi TinhHauTo”?',
    options: [
      'Hai stack sai vì chỉ được một ADT Stack.',
      'Cùng quy tắc ưu tiên; mỗi lần “đến lúc tính” Pop toán tử + Pop hai số, Push kết quả — không cần chuỗi hậu tố.',
      'Hai stack dùng cho Queue.',
      'Chỉ tính được biểu thức không ngoặc.',
    ],
    answer: 1,
    explanation:
      'Thực hành 8. Trung tố → hậu tố dễ hiểu máy; hai stack gộp một lượt.',
  },
  {
    id: 98,
    chapter: 4,
    question:
      'Chọn CTDL: Undo mỗi lần gõ; quầy vé xếp hàng khách. Lần lượt?',
    options: [
      'Queue cho Undo (FIFO hủy người gõ đầu tiên); Stack cho quầy.',
      'Stack (LIFO, thao tác mới nhất); Queue (FIFO). Dùng mảng giữa cho Undo là O(n) mỗi lần xóa “mới nhất”.',
      'Cả hai DSLK kép bắt buộc.',
      'Mảng a[i] cho cả hai vì O(1).',
    ],
    answer: 1,
    explanation:
      'Ch.1 case study: Undo = Stack O(1). FIFO phục vụ đúng thứ tự đến. LIFO cho quầy là sai nghiệp vụ.',
  },
  {
    id: 99,
    chapter: 4,
    question:
      'Enqueue khi IsFull (không kiểm). Hệ quả hàng đợi vòng?',
    options: [
      'rear dừng, phần tử bỏ qua im lặng — an toàn.',
      'Ghi đè ô front (mất phần tử chưa Dequeue) / làm hỏng rỗng-đầy.',
      'Tự dồn mảng.',
      'Chỉ tăng MAX lúc chạy.',
    ],
    answer: 1,
    explanation:
      'Mẫu rút gọn có thể thiếu bước 1. Đề thi bắt xử lý đầy/rỗng. Overflow ADT ≠ hết RAM DSLK.',
  },
  {
    id: 100,
    chapter: 4,
    question:
      'Đổi cơ số n > 0 sang nhị phân bằng Stack: lặp Push n%2, n/=2; rồi Pop hết. Vì sao ra đúng thứ tự bit?',
    options: [
      'FIFO đảo lại bit thừa.',
      'Bit dư đầu tiên là bit YẾU (LSB) vào stack trước; Pop LIFO đưa bit MẠNH (MSB) ra trước — đúng cách viết nhị phân.',
      'Phải dùng Queue mới đúng MSB trước.',
      'Chỉ đúng với cơ số 10.',
    ],
    answer: 1,
    explanation:
      'Ứng dụng Stack: đảo chuỗi, đổi cơ số, ngoặc, hậu tố. Vào sau ra trước khớp “tính dư từ LSB, in từ MSB”.',
  },
];
