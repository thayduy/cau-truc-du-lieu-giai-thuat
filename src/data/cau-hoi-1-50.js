/** 100 câu trắc nghiệm khó — phần 1 (câu 1–50). Căn cứ Ch.1–2. */
export const CAU_HOI_1_50 = [
  {
    id: 1,
    chapter: 1,
    question:
      'Phát biểu nào sau đây ĐÚNG nhất về mối quan hệ ADT — cấu trúc cài đặt — giải thuật?',
    options: [
      'Stack là một mảng có biến top; ADT chỉ là tên gọi khác của struct.',
      'ADT mô tả hợp đồng thao tác (làm được gì); mảng hay DSLK chỉ là một cách cài; giải thuật viết trên hợp đồng đó.',
      'Chọn CTDL xong thì mọi giải thuật đều cùng bậc O, vì dữ liệu đã “đúng chỗ”.',
      'struct SinhVien đã là ADT vì có nhiều trường; không cần thao tác Push/Pop.',
    ],
    answer: 1,
    explanation:
      'Giáo trình Ch.1: ADT = hợp đồng thao tác (Stack = Push/Pop/Peek), chưa nói cài bằng mảng hay DSLK. struct chỉ bố trí bit. Chương trình = CTDL + giải thuật.',
  },
  {
    id: 2,
    chapter: 1,
    question:
      'Hàm ThemDau trên mảng SinhVien a[0..n-1] nếu dồn bằng vòng for (int i = 0; i < n; i++) a[i+1] = a[i]; rồi ghi a[0] = x. Kết quả thực tế là gì?',
    options: [
      'Đúng: mọi hồ sơ dịch phải một ô, a[0] nhận x.',
      'Chỉ sai khi n = MAX, còn n nhỏ thì đúng.',
      'Toàn bộ a[1..n] bị đè thành cùng giá trị a[0] cũ; dữ liệu mất.',
      'Vòng chạy O(n) nên kết quả luôn đúng, chỉ chậm.',
    ],
    answer: 2,
    explanation:
      'Phải dồn từ i = n-1 xuống 0. Đi từ 0 lên sẽ copy a[0] sang a[1], rồi a[1] (đã là a[0]) sang a[2],… cả đoạn thành một giá trị.',
  },
  {
    id: 3,
    chapter: 1,
    question:
      'Biết T(n) = 3n + 5. Phát biểu nào ĐÚNG theo đúng “kiểu khóa” viết O trên bài thi?',
    options: [
      '3n + 5 không phải O(n²) vì không có n² trong công thức.',
      '3n + 5 = O(n) là viết chặt; đồng thời 3n + 5 cũng là O(n²) (trần rộng) nhưng thi lấy bậc nhỏ nhất đúng kiểu khóa.',
      'Phải viết O(3n+5) để không mất hằng.',
      'Vì có +5 nên T(n) = O(1) khi n nhỏ.',
    ],
    answer: 1,
    explanation:
      'O là trần: 3n cũng là O(n²). Thực hành thi: bỏ hằng, lấy hạng lớn, viết chặt O(n).',
  },
  {
    id: 4,
    chapter: 1,
    question:
      'Đoạn for (i=0; i<n; i++) for (j=i+1; j<n; j++) c++; chạy đúng bao nhiêu lần thân vòng trong, và O là gì?',
    options: [
      'n² lần, O(n²).',
      'n(n-1)/2 lần, vì nhỏ hơn n² nên O(n).',
      'n(n-1)/2 lần, vẫn O(n²).',
      'n-1 lần, O(n).',
    ],
    answer: 2,
    explanation:
      'Tam giác: (n-1)+(n-2)+…+0 = n(n-1)/2. Vẫn cùng bậc n². n=4 thì 6 lần.',
  },
  {
    id: 5,
    chapter: 1,
    question:
      'Hai vòng for (i=0;i<n;i++) s+=a[i]; rồi for (j=0;j<n;j++) t+=b[j]; (không lồng). Độ phức tạp thời gian?',
    options: [
      'O(n²) vì có hai vòng for.',
      'O(n) vì hai khối nối tiếp, lấy max cùng bậc n.',
      'O(2n) phải giữ hệ số 2.',
      'O(1) vì mỗi vòng độc lập.',
    ],
    answer: 1,
    explanation:
      'Quy tắc nối tiếp: O(n)+O(n)=O(n). Chỉ lồng mới nhân thành n².',
  },
  {
    id: 6,
    chapter: 1,
    question:
      'for (i=0;i<n;i++) for (j=0;j<5;j++) c++;  Độ phức tạp theo n?',
    options: [
      'O(n²) vì hai vòng lồng.',
      'O(5n) nên viết O(n²) cho an toàn.',
      'O(n) vì vòng trong là hằng.',
      'O(5) vì j chỉ tới 4.',
    ],
    answer: 2,
    explanation:
      'Vòng trong phụ thuộc hằng 5: 5n = O(n), không O(n²).',
  },
  {
    id: 7,
    chapter: 1,
    question:
      'Mảng nguyên chưa sắp. Sinh viên chạy tìm nhị phân vì “O(log n) nhanh hơn tuyến tính”. Kết luận đúng?',
    options: [
      'Đúng: nhị phân luôn nhanh hơn, chỉ kém ổn định.',
      'Sai kết quả (có thể trả −1 dù khóa có, hoặc trả chỉ số sai); không phải “chậm hơn một chút”.',
      'Nhị phân tự sắp trong lúc tìm nên vẫn đúng.',
      'Chỉ sai khi n lẻ; n chẵn thì giữa trùng khóa.',
    ],
    answer: 1,
    explanation:
      'Nhị phân yêu cầu mảng đã sắp một chiều. Chưa sort → bỏ nửa sai → kết quả sai, không phải đánh đổi tốc độ.',
  },
  {
    id: 8,
    chapter: 1,
    question:
      'Cùng n = 10, T1 = 100n = 1000 phép, T2 = n² = 100 phép. Kết luận nào đúng khi chọn thuật toán?',
    options: [
      'T2 luôn tốt hơn vì lúc n=10 đã thắng, không cần O.',
      'clock() trên máy bạn với n=10 đủ kết luận T2 tốt hơn.',
      'n=10 che bậc: khi n lớn (ví dụ 1000) T2 = n² vượt xa 100n; phải nhìn O khi n → ∞.',
      'Hai hàm cùng O(n) nên không phân biệt được.',
    ],
    answer: 2,
    explanation:
      'Ch.1: n=10 thì 100n > n²; n=1000 thì n² thắng xa. Không lấy một lần clock n nhỏ làm kết luận.',
  },
  {
    id: 9,
    chapter: 1,
    question:
      'Fibonacci đệ quy thô F(n)=F(n-1)+F(n-2). Thời gian và không gian phụ (độ sâu call stack) lần lượt?',
    options: [
      'Thời gian O(2ⁿ), không gian phụ O(2ⁿ).',
      'Thời gian O(n), không gian phụ O(n).',
      'Thời gian O(2ⁿ), không gian phụ O(n).',
      'Thời gian O(n²), không gian phụ O(1).',
    ],
    answer: 2,
    explanation:
      'Số lời gọi ~2ⁿ (thời gian mũ). RAM phụ = độ sâu đệ quy O(n), không phải O(2ⁿ). Đừng lẫn thời gian và không gian.',
  },
  {
    id: 10,
    chapter: 1,
    question:
      '“DSLK xóa O(1)” thiếu điều kiện nào thì phát biểu trở thành SAI?',
    options: [
      'Phải đang cầm nút cần xóa (đơn: còn nút trước); nếu phải tìm thì đã O(n).',
      'Phải có pTail thì mọi xóa đều O(1).',
      'Chỉ đúng với xóa cuối, sai với xóa đầu.',
      'Chỉ đúng khi danh sách đã sort.',
    ],
    answer: 0,
    explanation:
      'Bẫy Ch.1/Ch.3: xóa O(1) khi đã cầm nút (đơn cần nút trước). Tìm giá trị rồi mới xóa → O(n)+O(1).',
  },
  {
    id: 11,
    chapter: 1,
    question:
      'Vì sao a[i] trên mảng là O(1) còn phần tử thứ i của DSLK đơn là O(n)?',
    options: [
      'Mảng lưu trên Stack, DSLK trên Heap nên chậm hơn.',
      'Mảng ô kề, địa chỉ tính được bằng công thức; DSLK rải rác, phải đi i bước pNext từ pHead.',
      'DSLK luôn dài hơn mảng cùng n phần tử.',
      'Con trỏ pNext tốn 8 byte nên mỗi bước O(8).',
    ],
    answer: 1,
    explanation:
      'Máy không đi a[0]→a[1]→… để tới a[i]. DSLK không có công thức địa chỉ.',
  },
  {
    id: 12,
    chapter: 1,
    question:
      'ThemCuoi(SinhVien a[], int n, SinhVien x) thiếu & ở n (truyền tham trị). Hậu quả?',
    options: [
      'Không biên dịch được.',
      'n ngoài không tăng; lần thêm sau ghi đè cùng chỉ số a[n] cũ.',
      'Mảng a cũng không đổi vì truyền bản sao.',
      'Chỉ sai khi n = 0.',
    ],
    answer: 1,
    explanation:
      'a[] là địa chỉ ô đầu nên ghi a[n]=x vẫn vào mảng ngoài, nhưng n++ mất khi return. Lần sau đè cùng ô. Cặp bắt buộc: a[] + int &n.',
  },
  {
    id: 13,
    chapter: 1,
    question:
      'int i = 1, c = 0; while (i < n) { c++; i = i * 2; } với n = 16. c bằng bao nhiêu và O theo n?',
    options: [
      '16 lần, O(n).',
      '4 lần (i = 1,2,4,8), O(log n).',
      '5 lần kể cả i=16, O(log n).',
      '15 lần, O(n).',
    ],
    answer: 1,
    explanation:
      'i: 1,2,4,8 rồi 16 không vào vòng (i < 16). 4 lần = log₂ 16. Họ chia đôi → O(log n).',
  },
  {
    id: 14,
    chapter: 1,
    question:
      'Hàm Tim tuyến tính gặp x thì return i ngay. Có người viết “hàm này O(1) vì có return sớm”. Sai ở đâu?',
    options: [
      'return sớm làm sai kết quả nên không được nói O.',
      'Phân tích O lấy trường hợp xấu: không có khóa / khóa cuối → n so sánh, O(n). Tốt 1 lần không kết luận cả hàm O(1).',
      'Phải luôn chạy hết vòng mới đúng.',
      'O chỉ áp dụng cho sort, không cho tìm.',
    ],
    answer: 1,
    explanation:
      'Đề không nói thì lấy xấu. Tốt O(1) và xấu O(n) → viết O(n) cho thuật toán.',
  },
  {
    id: 15,
    chapter: 1,
    question:
      'Tìm tuyến tính, khóa CÓ trong mảng, vị trí đều. Số so sánh trung bình xấp xỉ?',
    options: [
      'n',
      'n/2',
      '(n+1)/2',
      'log n',
    ],
    answer: 2,
    explanation:
      'Trung bình nếu khóa có và vị trí đều: (1+2+…+n)/n = (n+1)/2. Không có khóa thì xấu = n.',
  },
  {
    id: 16,
    chapter: 1,
    question:
      'Thư viện: tra ISBN mỗi vài phút cả ngày; in danh sách quá hạn 1 lần/ngày. Chọn CTDL theo tiêu chuẩn nào của giáo trình?',
    options: [
      'Tối ưu in danh sách vì O(n) “nhìn thấy được”.',
      'Thao tác nóng là tra ISBN → hướng tìm O(log n) (cây cân / đã sort + nhị phân), không chọn vì “in cho đẹp”.',
      'Luôn dùng DSLK vì linh hoạt hơn mảng.',
      'Mảng a[MAX] đủ vì MAX=100 đã học ở Ch.1.',
    ],
    answer: 1,
    explanation:
      'Chọn theo thao tác nóng. Bẫy: tối ưu thêm cuối O(1) trong khi 99% việc là tìm O(n).',
  },
  {
    id: 17,
    chapter: 1,
    question:
      'Xóa cuối mảng (XoaTai n-1) và xóa đầu mảng, độ phức tạp thời gian?',
    options: [
      'Cả hai O(1) vì chỉ đổi n.',
      'Cả hai O(n) vì phải dồn.',
      'Xóa cuối O(1) (n--); xóa đầu O(n) (dồn n-1 ô).',
      'Xóa đầu O(1); xóa cuối O(n).',
    ],
    answer: 2,
    explanation:
      'Xóa cuối: vòng dồn không chạy. Xóa đầu = dồn a[1]…a[n-1] sang trái.',
  },
  {
    id: 18,
    chapter: 1,
    question:
      'Tính n(n-1)/2 với n = 10⁵ bằng biến int 32-bit. Bẫy nào giáo trình cảnh báo?',
    options: [
      'Chia 2 trước luôn cho kết quả 0.',
      'Trung gian n(n-1) ≈ 10¹⁰ tràn int trước khi chia.',
      'int không chia được số chẵn.',
      'Kết quả âm vì n-1 không dấu.',
    ],
    answer: 1,
    explanation:
      'n(n-1) đã ~10¹⁰, vượt INT_MAX (~2·10⁹). Tràn rồi mới chia → sai. Cần long long / chia khéo.',
  },
  {
    id: 19,
    chapter: 1,
    question:
      'Mảng a = [10,20,30,40,50,60,70,80], tìm nhị phân x = 35. Sau các bước, kết thúc thế nào?',
    options: [
      'Trả 2 vì a[2]=30 gần 35 nhất.',
      'L > R sau vài bước, trả −1; khoảng 4 lần so, không phải 8.',
      'Chạy hết 8 phần tử rồi trả −1.',
      'Vòng vô hạn vì 35 không có.',
    ],
    answer: 1,
    explanation:
      'Ch.1 chạy tay: (0,7)→M=3,a[3]=40>35,R=2; (0,2)→M=1,20<35,L=2; (2,2)→30<35,L=3; L>R dừng −1.',
  },
  {
    id: 20,
    chapter: 1,
    question:
      'int *p; *p = 1;  Lỗi thuộc loại nào?',
    options: [
      'Thiếu & nên p không đổi.',
      'p hoang — chưa trỏ ô hợp lệ; phải p = &x hoặc p = new int trước khi *p.',
      'Chỉ cảnh báo, runtime vẫn ghi vào địa chỉ 1.',
      'Phải viết p* = 1 theo cú pháp C++.',
    ],
    answer: 1,
    explanation:
      '*p đổi giá trị tại chỗ đang trỏ; p chưa khởi tạo thì chỗ đó rác. Khác p = &y (đổi số nhà).',
  },
  {
    id: 21,
    chapter: 1,
    question:
      'Hàm tìm O(1) nhưng sai khi mảng rỗng. Theo 5 tiêu chuẩn đánh giá CTDL/giải thuật, kết luận?',
    options: [
      'Đạt thời gian, trượt đúng đắn — không được chọn.',
      'O(1) thắng mọi tiêu chuẩn khác.',
      'Mảng rỗng là trường hợp không cần xét.',
      'Đúng đắn chỉ áp dụng cho DSLK.',
    ],
    answer: 0,
    explanation:
      'Đúng đắn đứng trước thời gian. Chạy nhanh mà sai khi biên (rỗng) là trượt.',
  },
  {
    id: 22,
    chapter: 1,
    question:
      'ThemDau trên mảng n = 10⁵, lặp 10⁵ lần thêm. Tổng việc xấp xỉ và ý nghĩa chọn CTDL?',
    options: [
      'O(n) tổng, mảng vẫn tốt.',
      'Mỗi lần O(n) dồn, tổng ~ n²/2 phép; cùng việc DSLK thêm đầu O(1) mỗi lần.',
      'Mảng thêm đầu O(1) nếu còn chỗ MAX.',
      'Chỉ khác hằng số cache, cùng O.',
    ],
    answer: 1,
    explanation:
      'Vai trò CTDL: không phải “code chạy”, mà số bước theo n. DSLK ThemDau O(1).',
  },
  {
    id: 23,
    chapter: 1,
    question:
      'Merge Sort thỏa T(n) = 2T(n/2) + O(n), T(1)=O(1). Kết quả?',
    options: [
      'O(n)',
      'O(n log n)',
      'O(n²)',
      'O(log n)',
    ],
    answer: 1,
    explanation:
      'Cây đệ quy log n tầng, mỗi tầng trộn tổng O(n) → O(n log n). Nhị phân là T(n)=T(n/2)+O(1) → O(log n).',
  },
  {
    id: 24,
    chapter: 1,
    question:
      'for (i=0;i<n;i++) if (a[i]%2==0) c++;  Có người nói “if làm thuật toán O(1) khi không có số chẵn”. Sai vì?',
    options: [
      'Không có số chẵn thì vòng không chạy.',
      'Vòng vẫn n lần; if không đổi số lần vòng. O(n).',
      'Phải đếm cả phép % nên O(n²).',
      'c++ chỉ chạy khi chẵn nên trung bình O(log n).',
    ],
    answer: 1,
    explanation:
      'Thân không đổi số lần vòng. if không biến O(n) thành O(1).',
  },
  {
    id: 25,
    chapter: 1,
    question:
      '“Mảng tìm O(log n)” đúng khi và chỉ khi nào?',
    options: [
      'n < 100.',
      'Dùng struct thay vì int.',
      'Mảng đã sắp một chiều VÀ giải thuật nhị phân (hoặc nội suy đúng điều kiện).',
      'Luôn đúng vì a[i] là O(1).',
    ],
    answer: 2,
    explanation:
      'Truy cập O(1) ≠ tìm O(log n). Tìm nhị phân cần đã sort. Mảng lộn vẫn tìm tuyến tính O(n).',
  },
  {
    id: 26,
    chapter: 2,
    question:
      'Công thức vị trí pos của tìm nội suy (mảng tăng, L < R, a[R] ≠ a[L], x nằm trong đoạn) là?',
    options: [
      'pos = (L + R) / 2',
      'pos = L + (x − a[L]) · (R − L) / (a[R] − a[L])',
      'pos = L + (a[R] − a[L]) / (x − a[L])',
      'pos = (x − a[0]) / n',
    ],
    answer: 1,
    explanation:
      'Nội suy ước theo tỷ lệ giá trị, không luôn lấy giữa. Cấm khi a[R]=a[L] hoặc x ngoài [a[L], a[R]].',
  },
  {
    id: 27,
    chapter: 2,
    question:
      'Tìm nội suy: tốt / trung bình (phân bố đều) / xấu (lệch) theo giáo trình?',
    options: [
      'O(1) / O(log n) / O(log n) — luôn không tệ hơn nhị phân.',
      'O(log log n) / O(log log n) / O(n)',
      'O(1) khi trúng pos; TB O(log log n) nếu đều; xấu O(n) nếu lệch.',
      'O(n) / O(n) / O(n²).',
    ],
    answer: 2,
    explanation:
      'Đề điền chỗ trống: tốt O(log log n) (thường rất ít bước, đôi khi 1), xấu O(n). Nhị phân lệch vẫn O(log n).',
  },
  {
    id: 28,
    chapter: 2,
    question:
      'a = [1,3,5,7,9,11,13,15] (chỉ số 0..7), x = 13. pos nội suy lần đầu bằng?',
    options: [
      '3 (giữa nhị phân)',
      '6, và a[6] = 13 (trúng một bước vì dãy cách đều)',
      '7 vì 13 gần max',
      '5 vì (13−1)/2 = 6 sai công thức',
    ],
    answer: 1,
    explanation:
      'pos = 0 + (13−1)·(7−0)/(15−1) = 12·7/14 = 6. Dãy cách đều 2 → gần “đúng chỗ”. Tuần tự tốn 7 so; nhị phân ~4 bước.',
  },
  {
    id: 29,
    chapter: 2,
    question:
      'Khi nào nội suy CÓ THỂ chậm hơn nhị phân?',
    options: [
      'Không bao giờ, vì ước pos “thông minh hơn giữa”.',
      'Phân bố lệch (cụm nhỏ rồi nhảy cóc) → có thể bò từng ô, xấu O(n); nhị phân vẫn O(log n).',
      'Khi mảng đã sort tăng.',
      'Khi n chẵn.',
    ],
    answer: 1,
    explanation:
      'Bẫy: “nội suy luôn nhanh hơn nhị phân” — SAI khi lệch. Chưa sort → tuần tự.',
  },
  {
    id: 30,
    chapter: 2,
    question:
      'Lính canh (sentinel) ở tìm tuần tự làm gì, và O thay đổi thế nào?',
    options: [
      'Ghi x vào a[n], vòng không kiểm i < n; vẫn O(n), chỉ bớt so sánh biên.',
      'Biến xấu từ O(n) thành O(1).',
      'Cho phép tìm nhị phân trên mảng chưa sort.',
      'Bắt buộc a phải có MAX = n+1 phần tử thật của dữ liệu.',
    ],
    answer: 0,
    explanation:
      'Vẫn O(n). Chỉ bớt một phép so i<n mỗi vòng. Đề khóa này bản duyệt thường là đủ.',
  },
  {
    id: 31,
    chapter: 2,
    question:
      'Mảng [5, 3, 4, 1]. Sau vòng ngoài i = 0, Interchange Sort và Selection Sort ra mảng nào?',
    options: [
      'Cả hai đều [1, 3, 4, 5].',
      'Interchange: [1, 5, 4, 3]; Selection: [1, 3, 4, 5].',
      'Interchange: [1, 3, 4, 5]; Selection: [1, 5, 4, 3].',
      'Cả hai đều [3, 5, 4, 1].',
    ],
    answer: 1,
    explanation:
      'Interchange: 5↔3 → [3,5,4,1]; 3↔4 không; 3↔1 → [1,5,4,3]. Selection: tìm min=1 ở cuối, ĐỔI MỘT LẦN 5↔1 → [1,3,4,5]. Ch.3 SapXep là Interchange.',
  },
  {
    id: 32,
    chapter: 2,
    question:
      'Selection Sort trên n phần tử: số so sánh khóa và số lần DoiCho tối đa?',
    options: [
      'So sánh thay đổi theo dữ liệu; swap tối đa n².',
      'So sánh luôn n(n−1)/2; DoiCho ≤ n−1.',
      'So sánh O(n); swap n(n−1)/2.',
      'Cả hai đều n−1.',
    ],
    answer: 1,
    explanation:
      'Luôn C = n(n−1)/2. Mỗi i tối đa một swap với min. Không ổn định. Ưu: ít ghi khi struct lớn.',
  },
  {
    id: 33,
    chapter: 2,
    question:
      'Insertion Sort (so sánh >) và Bubble Sort có cờ swapped, trường hợp tốt (mảng đã tăng) là?',
    options: [
      'Cả hai vẫn Θ(n²).',
      'Insertion O(n); Bubble một pass swapped=false rồi break → O(n).',
      'Chỉ Bubble O(n); Insertion luôn n².',
      'Chỉ Insertion O(n); Bubble không cờ vẫn n² và có cờ cũng n².',
    ],
    answer: 1,
    explanation:
      'Insertion dời 0 lần nếu đã tăng. Bubble có cờ: pass 0 không đổi → dừng. Interchange/Selection không có “tốt O(n)”.',
  },
  {
    id: 34,
    chapter: 2,
    question:
      'Thuật toán nào THƯỜNG ổn định (giữ thứ tự tương đối khóa bằng) theo giáo trình?',
    options: [
      'Selection, Interchange, Heap, Quick (partition nhảy).',
      'Insertion (so >), Merge (so ≤), Bubble (so >).',
      'Chỉ Heap Sort.',
      'Mọi thuật toán O(n log n).',
    ],
    answer: 1,
    explanation:
      'Ổn định: Insertion / Merge / Bubble bản >. Không đảm bảo: Selection, Interchange, Heap, Quick.',
  },
  {
    id: 35,
    chapter: 2,
    question:
      '[5,1,4,2], Bubble Sort pass i=0 (so kề, đổi nếu >). Mảng sau pass 0?',
    options: [
      '[1, 4, 2, 5]  (5 neo cuối)',
      '[1, 5, 4, 2]',
      '[1, 2, 4, 5]',
      '[2, 4, 1, 5]',
    ],
    answer: 0,
    explanation:
      '5↔1 → 1,5,4,2; 5↔4 → 1,4,5,2; 5↔2 → 1,4,2,5. Max nổi cuối.',
  },
  {
    id: 36,
    chapter: 2,
    question:
      'Merge Sort: thời gian / không gian phụ / tại chỗ?',
    options: [
      'Luôn O(n log n); phụ O(n); KHÔNG tại chỗ.',
      'TB O(n log n), xấu O(n²); phụ O(1); tại chỗ.',
      'O(n); phụ O(n); tại chỗ.',
      'O(n log n); phụ O(1); tại chỗ như Heap.',
    ],
    answer: 0,
    explanation:
      'Mỗi tầng O(n), log n tầng. Cần tmp[]. Heap mới coi là tại chỗ + luôn O(n log n).',
  },
  {
    id: 37,
    chapter: 2,
    question:
      'Quick Sort pivot = a[high] (Lomuto). Vì sao mảng ĐÃ TĂNG lại là trường hợp xấu O(n²)?',
    options: [
      'Vì so sánh kề như Bubble.',
      'Pivot luôn là max; không ai < pivot; cắt 1 ô mỗi lần → T(n)=T(n−1)+O(n).',
      'Đệ quy hai nửa bằng nhau nên n log n thành n².',
      'Mảng tăng làm tràn stack ngay lần gọi đầu.',
    ],
    answer: 1,
    explanation:
      'Đúng với chốt cuối. [1,2,4,5] pivot=5 đứng yên cuối, trái n−1 phần tử. Stack xấu O(n).',
  },
  {
    id: 38,
    chapter: 2,
    question:
      'partition Lomuto [5,1,8,2], low=0, high=3, pivot=2. Mảng và chỉ số pivot trả về?',
    options: [
      '[1, 2, 8, 5], trả 1',
      '[2, 1, 8, 5], trả 0',
      '[1, 8, 5, 2], trả 3',
      '[1, 2, 5, 8], trả 1 (đã sort xong cả mảng)',
    ],
    answer: 0,
    explanation:
      'j=1: 1<2 đổi với a[0] → [1,5,8,2]; đặt pivot đổi a[1]↔a[3] → [1,2,8,5], trả i+1=1. Phải còn QuickSort bên phải.',
  },
  {
    id: 39,
    chapter: 2,
    question:
      'Max-heap lưu mảng chỉ số 0. Con trái, con phải, cha của i?',
    options: [
      '2i, 2i+1, i/2  (kiểu chỉ số 1)',
      '2i+1, 2i+2, ⌊(i−1)/2⌋',
      'i−1, i+1, 0',
      '2i+2, 2i+1, 2i',
    ],
    answer: 1,
    explanation:
      'Chỉ số từ 0: trái=2i+1, phải=2i+2, cha=⌊(i−1)/2⌋. Nhầm chỉ số 1 là bẫy đề.',
  },
  {
    id: 40,
    chapter: 2,
    question:
      'Dựng max-heap từ [4, 10, 3, 5, 1] (heapify từ i = n/2−1 về 0). Mảng sau dựng heap?',
    options: [
      '[4, 10, 3, 5, 1] đã là heap.',
      '[10, 5, 3, 4, 1]',
      '[10, 4, 3, 5, 1]',
      '[1, 4, 3, 5, 10]',
    ],
    answer: 1,
    explanation:
      'i=1: 10 ≥ 5,1. i=0: đổi 4↔10 → [10,4,3,5,1]; sàng 4 với 5,1 → đổi 4↔5 → [10,5,3,4,1].',
  },
  {
    id: 41,
    chapter: 2,
    question:
      'Heap Sort so với Merge Sort: điểm KHÁC cốt lõi trên đề thi?',
    options: [
      'Heap xấu O(n²); Merge luôn n log n.',
      'Heap luôn O(n log n) và coi là tại chỗ (phụ O(1) mảng); Merge luôn n log n nhưng phụ O(n), ổn định nếu ≤.',
      'Cả hai ổn định và tại chỗ.',
      'Heap cần DSLK; Merge cần mảng.',
    ],
    answer: 1,
    explanation:
      'Cần O(n log n) luôn + phụ O(1) → Heap. Cần ổn định → Merge. Heap không ổn định.',
  },
  {
    id: 42,
    chapter: 2,
    question:
      'Cận dưới sort bằng SO SÁNH và lý do Radix có thể O(n) theo n?',
    options: [
      'Cận Ω(n); Radix so sánh từng cặp O(n).',
      'Cận Ω(n log n) trung bình; Radix không so hai khóa nguyên — đi từng chữ số O(d(n+k)) khi d,k nhỏ.',
      'Cận O(n²); Radix phá cận vì dùng heap.',
      'Không có cận; mọi sort đều n log n.',
    ],
    answer: 1,
    explanation:
      'Sort so sánh: Ω(n log n). Radix LSD: hàng đơn vị rồi chục, trăm… không so cả khóa.',
  },
  {
    id: 43,
    chapter: 2,
    question:
      'Hai lớp đã sort theo MSSV, cần gộp một danh sách tăng. Chọn?',
    options: [
      'Quick Sort lại cả hai mảng nối nhau.',
      'Merge hai đoạn đã sort (đúng ý Merge trong Merge Sort).',
      'Selection vì ít swap.',
      'Heapify từng lớp rồi nối.',
    ],
    answer: 1,
    explanation:
      'Ứng dụng Merge: gộp hai dãy đã sort. Quick lại từ đầu lãng phí và không ổn định.',
  },
  {
    id: 44,
    chapter: 2,
    question:
      'Thêm 1 sinh viên vào danh sách n người ĐÃ sort theo điểm. Cách hợp lý khóa này?',
    options: [
      'Quick Sort cả n+1 phần tử vì TB n log n.',
      'Insertion: chèn đúng chỗ O(n), không cần Quick.',
      'Nhị phân tìm chỗ O(log n) rồi chèn mảng O(1).',
      'Interchange từ đầu vì trùng Ch.3.',
    ],
    answer: 1,
    explanation:
      'Tìm chỗ nhị phân O(log n) nhưng chèn mảng vẫn dồn O(n) → tổng O(n). Insertion đủ.',
  },
  {
    id: 45,
    chapter: 2,
    question:
      'Nhị phân đệ quy vs vòng while: không gian phụ?',
    options: [
      'Cả hai O(n).',
      'Đệ quy O(log n) call stack; while O(1) — ưu tiên thi.',
      'Đệ quy O(1) vì T(n)=T(n/2)+O(1).',
      'While O(log n) vì số lần lặp log n.',
    ],
    answer: 1,
    explanation:
      'Thời gian cùng O(log n). Phụ khác: stack đệ quy vs vài biến. Số lần lặp ≠ không gian phụ.',
  },
  {
    id: 46,
    chapter: 2,
    question:
      'So sánh khóa Interchange, Selection, Bubble (không cờ) trên cùng n?',
    options: [
      'Insertion cũng luôn n(n−1)/2 như ba cái kia.',
      'Cả ba đều n(n−1)/2 so sánh (Bubble so kề cùng tổng tam giác); Insertion THAY ĐỔI theo dữ liệu.',
      'Bubble luôn ít hơn vì cờ.',
      'Selection ít so sánh nhất vì ít swap.',
    ],
    answer: 1,
    explanation:
      'Ít swap ≠ ít so sánh. Selection vẫn C = n(n−1)/2. Insertion tốt O(n) so sánh.',
  },
  {
    id: 47,
    chapter: 2,
    question:
      'Merge hai nửa, so L[i] < R[j] (không lấy ≤ khi bằng). Hệ quả?',
    options: [
      'Mảng không tăng.',
      'Vẫn sort đúng nhưng MẤT ổn định (phần tử phải được ưu tiên khi khóa bằng).',
      'Vòng while không kết.',
      'Phụ tăng thành O(n log n).',
    ],
    answer: 1,
    explanation:
      'Giáo trình: ≤ để ổn định — bằng thì lấy trái (đứng trước).',
  },
  {
    id: 48,
    chapter: 2,
    question:
      'n = 10⁶, sort so sánh. Vì sao loại Bubble/Interchange?',
    options: [
      'Chúng không đúng với số thực.',
      'n² ~ 10¹² phép — không chơi (Ch.1); hướng n log n (Merge/Quick/Heap).',
      'Chúng không tại chỗ.',
      'Chúng không ổn định.',
    ],
    answer: 1,
    explanation:
      'n=10⁶ → n² nghìn tỷ bước. n log n ~ 2·10⁷ còn nhẹ. Ổn định hay không là tiêu chí khác.',
  },
  {
    id: 49,
    chapter: 2,
    question:
      'QuickSort(a, low, high) đệ quy gồm CẢ chỉ số pivot p (gọi QuickSort(low,p) và (p,high)). Hệ quả?',
    options: [
      'Nhanh hơn vì không bỏ sót.',
      'Pivot bị partition lại; có thể đệ quy vô hạn / sai tiến trình; đúng là (low, p−1) và (p+1, high).',
      'Chỉ sai khi pivot ở giữa.',
      'Đó là Hoare, Lomuto bắt buộc gồm p.',
    ],
    answer: 1,
    explanation:
      'Bẫy đề: pivot đã đúng chỗ, không đụng lại. Gồm p → không tiến.',
  },
  {
    id: 50,
    chapter: 2,
    question:
      'Radix Sort LSD trên số nguyên không âm. Thứ tự xử lý chữ số và điều kiện hợp lý?',
    options: [
      'Hàng trăm rồi chục rồi đơn vị (MSD); khóa âm vẫn được.',
      'Hàng đơn vị rồi chục, trăm… (LSD); hợp khi d và k nhỏ; không so hai khóa nguyên.',
      'Chỉ một lượt counting sort là xong mọi chữ số.',
      'Luôn O(n log n) như Heap.',
    ],
    answer: 1,
    explanation:
      'LSD = Least Significant Digit. Ứng dụng MSSV / số báo danh. d chữ số, mỗi lượt O(n+k).',
  },
];
