# CHƯƠNG 1: TỔNG QUAN VỀ CẤU TRÚC DỮ LIỆU VÀ GIẢI THUẬT

> **CTDL** = **Cấu trúc dữ liệu**. **GT** = **Giải thuật** (thuật toán).  
> Chương này **không** thay chương 3–5. Nó dạy nền: *cất dữ liệu thế nào, chọn cấu trúc ra sao, đo chậm–nhanh bằng gì*. Học kỹ ở đây thì `ThemDau`, `Push`, `NLR` về sau không còn là “nhớ code”.

---

## 🎯 MỤC TIÊU CHƯƠNG 1

**Sau khi học xong chương này, sinh viên có thể:**

1. Kể được một đề án tin học cần **cất** gì và **làm** gì trên dữ liệu; vẽ luồng bài toán → CTDL → giải thuật.
2. Phát biểu và giải thích **chương trình = cấu trúc dữ liệu + giải thuật**.
3. Liệt kê thao tác (thêm, xóa, tìm, duyệt, truy cập thứ $i$) và chọn CTDL theo thao tác **nóng**.
4. Đánh giá CTDL theo đúng / thời gian / bộ nhớ / dễ cài / dễ mở — không chọn vì “nghe oai”.
5. Phân biệt kiểu cơ sở, mảng, `struct`, **ADT**, con trỏ (vừa đủ); vẽ ô nhớ biến và mảng `struct`.
6. Đếm số phép trên vòng `for` (một vòng, hai vòng lồng, tam giác); viết $O$ tốt / trung bình / xấu.
7. Phân biệt thời gian và không gian phụ; không lấy `clock()` một lần $n=10$ làm kết luận.

---

## 📋 NỘI DUNG CHƯƠNG 1

```
1.1. Vai trò của cấu trúc dữ liệu trong một đề án tin học
     1.1.1. Đề án tin học: dữ liệu và thao tác
     1.1.2. Ba tầng: giá trị → kiểu → CTDL
     1.1.3. Giải thuật (bốn tính chất)
     1.1.4. Chương trình = CTDL + giải thuật
     1.1.5. Case study: danh sách sinh viên trên mảng
            – Biến rời (sai)
            – ThemCuoi / Tim / Xuat
            – ThemDau, XoaTai, SuaDiem (dồn ô)
     1.1.6. Khi n lớn
     1.1.7. Bản đồ môn
     1.1.8. Chương trình minh họa
1.2. Các tiêu chuẩn đánh giá cấu trúc dữ liệu
     1.2.1. Năm tiêu chuẩn
     1.2.2. Bảng giá CTDL (nhìn trước)
     1.2.3. Case study chọn cấu trúc
     1.2.4. Đánh đổi thời gian–bộ nhớ
1.3. Kiểu dữ liệu
     1.3.1. Biến, kiểu, ô nhớ
     1.3.2. Kiểu cơ sở (tràn, char, float)
     1.3.3. Mảng 1 chiều và 2 chiều
     1.3.4. struct, mảng struct, chuỗi
     1.3.5. ADT
     1.3.6. Con trỏ và truyền tham số
1.4. Đánh giá độ phức tạp của giải thuật
     1.4.1. T(n), không đo clock
     1.4.2. Tốt / trung bình / xấu
     1.4.3. O, Θ, Ω và ba quy tắc
     1.4.4. Bảng tăng trưởng
     1.4.5. Đếm tay (kho đề thi)
     1.4.6. Tìm tuyến tính và tìm nhị phân
     1.4.7. Không gian phụ
     1.4.8. Cách đọc code ra O
```

> **Cài đặt:** C++ (`iostream`), cùng các chương sau. Kiểu trong C và C++ là **cùng ý tưởng**. `struct` dùng như C.

---

## 📖 CÁCH ĐỌC (ZERO → HERO)

| Mốc | Đọc | Xong khi |
|-----|-----|----------|
| **Zero** | 1.1.A–C | Nói được vì sao `ten1, ten2, ten3` không phải CTDL |
| **Nền đề án** | 1.1.D–G | Tự viết `ThemCuoi` / `Tim` trên mảng `SinhVien` |
| **Chọn** | 1.2 | Chọn CTDL cho Undo, xếp hàng, danh sách 40 SV — giải thích được |
| **Kiểu** | 1.3 | Vẽ `int x` và `SinhVien a[2]`; phân biệt `x`, `&x`, `*p` |
| **Đề thi** | 1.4 | Đếm `c++` hai vòng; $n(n-1)/2$; tìm tuyến tính / nhị phân |

Mỗi chỗ khó: **ý tưởng → hình ô nhớ / bảng chạy tay → mã giả → code → $O$ → bẫy**. Gặp *(nâng cao)* có thể bỏ lần đọc đầu.

---

## 📚 BẢNG THUẬT NGỮ

| Thuật ngữ | Nghĩa | Ghi nhớ |
|-----------|--------|---------|
| **Dữ liệu** | Thông tin máy cần nhớ | Mã SV, điểm, tên |
| **CTDL** | Cách **cất và lấy** + thao tác được phép | Mảng, DSLK, Stack, cây |
| **Giải thuật** | Dãy bước hữu hạn, xác định, đúng | Tìm, sắp, thêm, xóa |
| **ADT** | Hợp đồng *làm được gì* | Stack = Push/Pop, chưa nói mảng hay DSLK |
| **Thao tác nóng** | Việc chạy nhiều lần nhất | Chọn CTDL theo cái này |
| **$n$** | Kích thước vào | Số phần tử |
| **$T(n)$** | Số phép (mô hình) theo $n$ | Không phải giây trên laptop |
| **$O(g(n))$** | Trần tăng trưởng khi $n$ lớn | Bỏ hằng, giữ hạng lớn |
| **Tốt / TB / xấu** | Ít / kỳ vọng / nhiều phép nhất | Tìm: đầu / giữa / hết mảng |
| **Tuần tự** | Ô kề nhau, có `a[i]` | Mảng |
| **Liên kết** | Nút nắm địa chỉ nút kế | DSLK, Ch.3 |
| **Tràn (overflow)** | Giá trị vượt miền kiểu | `int` nhân lớn |

---

## 1.1. VAI TRÒ CỦA CẤU TRÚC DỮ LIỆU TRONG MỘT ĐỀ ÁN TIN HỌC

### 1.1.1. Đề án tin học: dữ liệu và thao tác

#### A. Đề án tin học là gì? (zero)

**Đề án tin học** = một phần mềm giải quyết việc của người dùng: quản lý sinh viên, bán hàng, đặt vé, game, LMS…

Mọi đề án, dù nhỏ, đều có **dữ liệu** và **việc làm trên dữ liệu**.

| Đề án | Dữ liệu | Việc làm (thao tác) |
|-------|---------|---------------------|
| Quản lý lớp | Mã, tên, điểm | Thêm SV, tìm mã, sửa điểm, in danh sách |
| Thư viện | Sách, bạn đọc, phiếu mượn | Tra ISBN, mượn/trả, thống kê quá hạn |
| Máy tính bỏ túi | Biểu thức | Phân tích, tính (Stack — Ch.4) |
| Playlist | Bài hát | Thêm cuối, phát bài kế, xóa bài đang chọn |

Hai câu hỏi **bắt buộc** trước khi gõ `int`:

1. **Cất cái gì?** (một SV, một danh sách SV, một hàng đợi khách…)
2. **Làm gì thường xuyên?** (tìm? thêm cuối? xóa giữa? in hết?)

Trả lời xong mới chọn CTDL. Chọn xong mới viết giải thuật.

```
  Người dùng cần gì?
         │
         ▼
  ┌──────────────┐     ┌──────────────┐
  │  DỮ LIỆU      │     │  THAO TÁC    │
  │  (cất gì)     │     │  (làm gì)    │
  └──────┬───────┘     └──────┬───────┘
         │                    │
         └────────┬───────────┘
                  ▼
           Chọn CTDL (1.2)
                  ▼
           Viết giải thuật, đo O (1.4)
```

#### B. Vòng đời đề án — CTDL xuất hiện lúc nào?

Nhiều bạn mở editor rồi mới nghĩ “khai báo gì”. Thứ tự nghề:

| Bước | Việc | Câu hỏi |
|------|------|---------|
| 1. Phân tích | Người dùng cần gì? | In danh sách? Tra mã? Undo? |
| 2. Mô hình dữ liệu | Một hồ sơ có những trường nào? Có **nhiều** hồ sơ không? | `SinhVien`: mã, tên, điểm |
| 3. Thao tác | Thêm / xóa / tìm / sửa / duyệt — cái nào **nóng**? | Mục 1.2 |
| 4. Chọn CTDL | Mảng, DSLK, Stack, Queue, cây… | Mục 1.2 |
| 5. Viết giải thuật | Mã giả trên cấu trúc đã chọn | Mục 1.1.3, 1.4 |
| 6. Cài + kiểm biên | Rỗng, một phần tử, đầy, không tìm thấy | |

Bỏ bước 2–4 → code “chạy được với 2 mẫu” rồi vỡ khi thêm người thứ 3.

#### C. Ví dụ đề án nhỏ — thư viện (chỉ phân tích, chưa cài)

| Thực thể | Một hồ sơ gồm | Nhiều hồ sơ cất bằng |
|----------|---------------|----------------------|
| Sách | ISBN, tựa, còn/mượn | Danh sách sách |
| Bạn đọc | Mã thẻ, tên | Danh sách bạn đọc |
| Phiếu mượn | Sách + bạn + ngày | Danh sách phiếu |

Ba **danh sách**, không phải ba biến. Thao tác nóng của thủ thư thường là **tra ISBN** và **đánh dấu đã trả** — không phải “in hết 40 dòng cho đẹp”. Chọn CTDL cho *tra*, không chọn cho *in*.

#### D. Dữ liệu tĩnh và dữ liệu động (ý, chưa cần `new`)

| | Tĩnh | Động |
|---|------|------|
| Biết $n$ lúc viết chương trình? | Gần đúng (`MAX=100`) | Không biết, tăng giảm lúc chạy |
| Minh họa Ch.1 | Mảng `a[MAX]` + biến `n` | (Ch.3: DSLK `new`/`delete`) |
| Đầy? | Có, khi $n=\mathrm{MAX}$ | Hết RAM mới thất bại |

Ch.1 cài **mảng + $n$**. Đó đã là CTDL: có chỗ cất, có số phần tử, có thao tác. DSLK không “đúng hơn” — chỉ **linh hơn** khi $n$ thay đổi mạnh và hay chèn đầu/giữa.

### ✅ Kiểm tra nhanh 1.1.1

1. Hai câu hỏi bắt buộc trước khi gõ `int`?
2. “In danh sách” và “tra ISBN mỗi phút” — cái nào thường là thao tác nóng ở thư viện?
3. Mảng `a[MAX]` + `n` đã là CTDL chưa, hay phải đợi DSLK?

**Đáp án:** (1) Cất cái gì? Làm gì thường xuyên? (2) Tra ISBN. (3) Đã là CTDL (danh sách tuần tự). DSLK là cách cất khác.

---

### 1.1.2. Ba tầng: giá trị → kiểu → CTDL

Đừng gọi mọi thứ là “cấu trúc dữ liệu”.

Đừng gọi mọi thứ là “cấu trúc dữ liệu”.

| Tầng | Là gì | Ví dụ |
|------|--------|--------|
| **Giá trị** | Một thông tin | `8.5`, `"An"` |
| **Kiểu** | Cách máy hiểu bit + phép được làm | `float`, `char[]` |
| **Đối tượng** | Ghép trường thành 1 hồ sơ | `struct SinhVien` |
| **CTDL** | Tổ chức **nhiều** đối tượng + thao tác | Mảng `SinhVien a[100]`, về sau là DSLK |

```
  Sai:   float d1, d2, d3, d4;          // 4 điểm rời — không phải danh sách
  Đúng:  float diem[4];                 // CTDL mảng — có chỉ số, có n, duyệt được
  Đúng hơn: SinhVien a[4];              // mỗi phần tử là cả hồ sơ
```

**Ẩn dụ kho:**

- Biến rời = đồ **vứt sàn**.
- Mảng = **kệ đánh số** 0, 1, 2… lấy ô số $i$ một bước.
- DSLK (Ch.3) = **thùng buộc dây**, thêm thùng mới dễ, không nhảy được tới thùng thứ 1000 nếu không đi từng nút.

**Bốn ví dụ “cùng dữ liệu, khác tầng”:**

| Câu nói | Đúng tầng | Sai nếu hiểu là |
|---------|-----------|-----------------|
| Điểm An là `8.5` | Giá trị | CTDL |
| `float diem` | Kiểu cơ sở | Danh sách |
| `struct SinhVien` | Một đối tượng | Danh sách lớp |
| `SinhVien a[100]; int n;` | CTDL (mảng hồ sơ) | Chỉ là kiểu |

Một `struct` **không** phải danh sách. Danh sách bắt đầu khi có **nhiều** phần tử và thao tác trên tập đó.

### ✅ Kiểm tra nhanh 1.1.2

1. `SinhVien sv;` là CTDL danh sách lớp không?
2. `float d1,d2,d3;` khác `float d[3];` ở điểm then chốt nào?

**Đáp án:** (1) Không — một hồ sơ. (2) Mảng có chỉ số, có $n$, duyệt một vòng; ba biến rời thì thêm phần tử thứ 4 phải sửa chương trình.

---

### 1.1.3. Giải thuật (bốn tính chất)

**Giải thuật** (thuật toán) là dãy bước giải **một** bài, thỏa:

| Tính | Nghĩa | Phản ví dụ |
|------|--------|------------|
| **Hữu hạn** | Dừng được | `while(true) i++;` không phải giải thuật |
| **Xác định** | Mỗi bước rõ | “Chọn phần tử nào cũng được” — không xác định |
| **Đúng** | Mọi bộ vào hợp lệ ra kết quả đúng (hoặc “không có”) | Tìm nhị phân trên mảng **lộn xộn** |
| **Có vào / ra** | Biết nhận gì, trả gì | Hàm không tham số, không return, in lung tung |

**Mã giả** (học thuộc khuôn — dùng cả môn):

```
THUẬT TOÁN TimTuyenTinh(a, n, x) → vị trí hoặc −1
1. i ← 0
2. while i < n
3.     nếu a[i] = x thì trả về i
4.     i ← i + 1
5. trả về −1
```

Cùng ý đó, **cài** bằng C++ (mục 1.1.5). Giải thuật **không phụ thuộc** ngôn ngữ; code mới phụ thuộc.

**Giải thuật ≠ chương trình.** Chương trình còn có nhập/xuất, menu, thông báo lỗi. Độ phức tạp (1.4) đo **giải thuật cốt lõi**, không đo `cout` cho đẹp.

**Input / output phải viết rõ** (thói quen đề thi):

```
Vào:  mảng a[0..n-1], khóa x
Ra:   chỉ số i (0 ≤ i < n) nếu có; −1 nếu không
```

Thiếu “−1 nếu không” là đề mở — dễ cài sai biên.

### ✅ Kiểm tra nhanh 1.1.3

1. `while (true) cin >> x;` có phải giải thuật tính tổng không? Vì sao?
2. “Chọn một phần tử bất kỳ làm chốt” — tính nào đang lung lay, nếu không nói cách chọn?

**Đáp án:** (1) Không hữu hạn (và chưa nói dừng khi nào). (2) Xác định: “bất kỳ” không phải bước máy làm được, trừ khi quy ước (ví dụ luôn lấy `a[0]`).

---

### 1.1.4. Chương trình = CTDL + giải thuật

Niklaus Wirth: **Algorithms + Data Structures = Programs**.

```
         ┌─────────────┐
         │  Bài toán   │
         └──────┬──────┘
                │
        ┌───────┴───────┐
        ▼               ▼
   CTDL cất         Giải thuật xử lý
   (mảng, DSLK…)    (tìm, sắp, thêm…)
        │               │
        └───────┬───────┘
                ▼
          Chương trình chạy được
```

**Cùng bài “tìm mã SV”, đổi CTDL là đổi giải thuật:**

| CTDL | Đường đi khi tìm | $O$ xấu (xem 1.4) |
|------|------------------|-------------------|
| Mảng chưa sort | `a[0]`, `a[1]`, … hết | $O(n)$ |
| Mảng đã sort | Nhị phân: giữa, nửa trái/phải (Ch.2) | $O(\log n)$ |
| DSLK | Theo `pNext` từ `pHead` (Ch.3) | $O(n)$ |
| BST cân | Rẽ trái/phải (Ch.5) | $O(\log n)$ |

Không có “hàm tìm quốc dân” dùng cho mọi cấu trúc.

**Phản ví dụ (hiểu công thức):**

- Chỉ có mảng, không có bước tìm → chương trình **cất** được, **không giải** bài.
- Có bước tìm hay, dữ liệu cất bằng 50 biến rời → **không lặp**, thêm phần tử phải sửa code.

**Ba cặp “cùng bài, đổi một vế”:**

| Giữ nguyên | Đổi | Hệ quả |
|------------|-----|--------|
| Bài tìm mã | Mảng → DSLK | Vẫn duyệt từng phần tử, $O(n)$, nhưng code dùng `pNext` |
| Bài tìm mã | Mảng lộn → mảng **đã sort** | Đổi giải thuật: nhị phân $O(\log n)$ |
| Cài mảng | Đổi bài: Undo | Mảng “tìm giữa” vô ích; cần Stack |

Công thức Wirth đọc ngược: thấy chương trình chậm, hỏi **cấu trúc đang cất** trước khi tối ưu từng dòng `for`.

### ✅ Kiểm tra nhanh 1.1.4

1. Có CTDL tốt, không có giải thuật — được chương trình giải bài không?
2. Cùng tìm khóa, vì sao BST không dùng vòng `for (i=0; i<n; i++)`?

**Đáp án:** (1) Không. (2) Đường đi trên cây là rẽ trái/phải, không phải chỉ số kề; giải thuật phải khớp cách cất.

---

### 1.1.5. Case study: danh sách sinh viên trên mảng

**Bài toán:** lớp có vài SV; thêm người; tìm theo mã; sửa điểm; xóa; in hết.

Đây là **đề án thu nhỏ**. Học xong mục này, các hàm Ch.3 (`ThemDau`, `Xoa`) chỉ khác *cách dồn / cách sửa con trỏ*, không khác *ý nghĩa thao tác*.

#### ① Cách chết: biến rời

**Bài toán mini:** lớp có vài SV; thêm người; tìm theo mã; in hết.

#### ① Cách chết: biến rời

```cpp
char ma1[16] = "SV001", ten1[64] = "An";
char ma2[16] = "SV003", ten2[64] = "Binh";
float diem1 = 8, diem2 = 7;
// Them SV thu 3? Phai khai bao ma3, ten3, diem3 — sua chuong trinh.
```

Không có $n$. Không `for`. Không viết được `Tim` một lần dùng mãi.

#### ② Cách sống: một kiểu hồ sơ + một danh sách

```
 chỉ số i:    0              1              2
           ┌──────┐       ┌──────┐       ┌──────┐
           │SV001 │       │SV003 │       │SV007 │
           │ An   │       │ Binh │       │ Chi  │
           │ 8.0  │       │ 7.5  │       │ 9.0  │
           └──────┘       └──────┘       └──────┘
            a[0]           a[1]           a[2]
```

**Mã giả thêm cuối / tìm / xuất:**

```
THUẬT TOÁN ThemCuoi(a, n, x)          // n = so phan tu hien co
1. nếu n = MAX thì báo đầy; return
2. a[n] ← x
3. n ← n + 1

THUẬT TOÁN TimTheoMa(a, n, ma) → i hoặc −1
1. i ← 0
2. while i < n
3.     nếu a[i].ma = ma thì trả về i
4.     i ← i + 1
5. trả về −1
```

```cpp
#include <iostream>
#include <cstring>
using namespace std;

struct SinhVien {
    char ma[16];
    char ten[64];
    float diem;
};

const int MAX = 100;

void KhoiTao(int &n) { n = 0; }

void ThemCuoi(SinhVien a[], int &n, SinhVien x) {
    if (n >= MAX) {
        cout << "Danh sach day!\n";
        return;
    }
    a[n] = x;     // chep ca ho so vao o ke tiep
    n++;
}

int TimTheoMa(SinhVien a[], int n, const char* ma) {
    for (int i = 0; i < n; i++)
        if (strcmp(a[i].ma, ma) == 0) return i;
    return -1;
}

void Xuat(SinhVien a[], int n) {
    for (int i = 0; i < n; i++)
        cout << a[i].ma << " | " << a[i].ten << " | " << a[i].diem << "\n";
}
```

**Chạy tay** — bắt buộc trước khi compile:

| Bước | $n$ | `a[0].ma` | `a[1].ma` | `a[2].ma` | Kết quả |
|------|-----|-----------|-----------|-----------|---------|
| `KhoiTao` | 0 | | | | rỗng |
| Them SV001 | 1 | SV001 | | | |
| Them SV003 | 2 | SV001 | SV003 | | |
| Them SV007 | 3 | SV001 | SV003 | SV007 | |
| Tim `"SV003"` | 3 | không đổi | | | so `a[0]` ≠, `a[1]` = → **1** |
| Tim `"SV999"` | 3 | | | | 3 so sánh, **−1** |

| Thao tác | Việc làm | $O$ (mảng, $n$ phần tử, chưa đầy) |
|----------|----------|-------------------------------------|
| Truy cập `a[i]` | Công thức địa chỉ | $O(1)$ |
| Thêm cuối | Ghi `a[n]`, `n++` | $O(1)$ |
| Thêm đầu | Dồn `a[n]…a[1]` sang phải, ghi `a[0]` | $O(n)$ |
| Tìm theo mã | Duyệt | $O(n)$ xấu |
| Xuất hết | Một vòng | $O(n)$ |

Thêm **đầu** mảng vì sao $O(n)$:

```
 TRƯỚC n=3                SAU ThemDau(SV000)
 [SV001][SV003][SV007]    [SV000][SV001][SV003][SV007]
                             ↑ phải dồn 3 ô
```

Đó là lý do Ch.3 có DSLK: thêm đầu **không dồn**. Ch.1 chỉ cần thấy *chọn mảng thì thêm đầu đắt*.

#### ③ Thêm đầu — dồn sang phải (làm chậm trên giấy)

**Ý tưởng:** ô `0` phải dành cho hồ sơ mới. Mọi hồ sơ cũ lùi một ô, **từ cuối lên** (nếu dồn từ đầu thì đè mất dữ liệu).

```
 TRƯỚC  n = 3                         SAU ThemDau(SV000)  n = 4
 i:     0       1       2             i:  0       1       2       3
     ┌──────┬──────┬──────┐             ┌──────┬──────┬──────┬──────┐
     │SV001 │SV003 │SV007 │             │SV000 │SV001 │SV003 │SV007 │
     └──────┴──────┴──────┘             └──────┴──────┴──────┴──────┘
                                              ghi mới    ← dồn từ i=2,1,0
```

**Mã giả:**

```
THUẬT TOÁN ThemDau(a, n, x)
1. nếu n = MAX thì báo đầy; return
2. i ← n-1
3. while i ≥ 0
4.     a[i+1] ← a[i]      // dồn phải
5.     i ← i - 1
6. a[0] ← x
7. n ← n + 1
```

```cpp
void ThemDau(SinhVien a[], int &n, SinhVien x) {
    if (n >= MAX) {
        cout << "Danh sach day!\n";
        return;
    }
    for (int i = n - 1; i >= 0; i--)
        a[i + 1] = a[i];
    a[0] = x;
    n++;
}
```

**Chạy tay** — mảng `[SV001, SV003, SV007]`, thêm `SV000`:

| Bước | Việc | Mảng (mã) | $n$ |
|------|------|-----------|-----|
| đầu | | SV001, SV003, SV007 | 3 |
| `i=2` | `a[3]=a[2]` | SV001, SV003, SV007, **SV007** | 3 |
| `i=1` | `a[2]=a[1]` | SV001, SV003, **SV003**, SV007 | 3 |
| `i=0` | `a[1]=a[0]` | SV001, **SV001**, SV003, SV007 | 3 |
| ghi | `a[0]=SV000` | **SV000**, SV001, SV003, SV007 | 3 |
| `n++` | | như trên | **4** |

**Bẫy dồn:** vòng `for (i = 0; i < n; i++) a[i+1]=a[i];` — `a[1]` bị `a[0]` đè **trước** khi `a[1]` kịp copy sang `a[2]`. Cả mảng thành toàn `SV001`. Phải dồn **từ cuối**.

$O(n)$ vì tối đa $n$ phép gán hồ sơ.

#### ④ Xóa tại vị trí `k` — dồn sang trái

**Ý tưởng:** lỗ ở ô $k$ được lấp bằng ô $k+1$, rồi $k+2$, … Cuối cùng $n$ giảm 1. Ô `a[n-1]` cũ **không cần xóa bit**, lần thêm sau sẽ ghi đè.

```
 TRƯỚC n=4, xóa k=1 (SV003)
 i:  0       1       2       3
  ┌──────┬──────┬──────┬──────┐
  │SV000 │SV003 │SV001 │SV007 │
  └──────┴──┬───┴──────┴──────┘
            xóa, dồn trái

 SAU n=3
  ┌──────┬──────┬──────┐
  │SV000 │SV001 │SV007 │
  └──────┴──────┴──────┘
```

```
THUẬT TOÁN XoaTai(a, n, k)
1. nếu n = 0 hoặc k < 0 hoặc k ≥ n thì báo lỗi; return
2. i ← k
3. while i < n-1
4.     a[i] ← a[i+1]
5.     i ← i + 1
6. n ← n - 1
```

```cpp
void XoaTai(SinhVien a[], int &n, int k) {
    if (n == 0 || k < 0 || k >= n) {
        cout << "Vi tri xoa khong hop le!\n";
        return;
    }
    for (int i = k; i < n - 1; i++)
        a[i] = a[i + 1];
    n--;
}
```

**Chạy tay** xóa $k=1$ trên `[A, B, C, D]`:

| `i` | Gán | Mảng |
|-----|-----|-------|
| 1 | `a[1]=a[2]` | A, **C**, C, D |
| 2 | `a[2]=a[3]` | A, C, **D**, D |
| `n--` | | A, C, D | $n=3$ (ô cũ D bỏ qua) |

Xóa đầu = `XoaTai(..., 0)` → dồn $n-1$ ô, $O(n)$.  
Xóa cuối = `XoaTai(..., n-1)` → vòng không chạy, chỉ `n--`, $O(1)$.

**Xóa theo mã:** `k = TimTheoMa(...);` nếu $k\ge 0$ thì `XoaTai`. Tìm đã $O(n)$, dồn thêm $O(n)$ → vẫn $O(n)$.

#### ⑤ Sửa điểm — tìm rồi ghi trường

Không dồn. $O$ = $O$ của `Tim`.

```cpp
int SuaDiem(SinhVien a[], int n, const char* ma, float diemMoi) {
    int k = TimTheoMa(a, n, ma);
    if (k < 0) return 0;       // khong co
    a[k].diem = diemMoi;
    return 1;
}
```

Chạy tay: `SuaDiem(..., "SV003", 9)` — `Tim` ra $k=1$, chỉ `a[1].diem` đổi, các ô khác đứng yên.

#### ⑥ Biên bắt buộc (đúng đắn — nối 1.2)

Trước khi khoe $O$, liệt kê test:

| Tình huống | Hàm | Việc đúng |
|------------|-----|-----------|
| $n=0$ | `Tim`, `XoaTai`, `Xuat` | −1 / báo lỗi / không in rác |
| $n=\mathrm{MAX}$ | `ThemCuoi`, `ThemDau` | từ chối, $n$ không tăng |
| $k=-1$ hoặc $k=n$ | `XoaTai` | từ chối |
| $n=1$ rồi xóa | `XoaTai(0)` | $n=0$ |
| Mã trùng | `Them*` | (quy ước đề: cho phép hoặc từ chối — phải nói) |

### 1.1.6. Khi $n$ lớn — vì sao “chọn CTDL” không phải chuyện hình thức

Giả sử mỗi so sánh tốn lượng việc như nhau. Tìm **xấu nhất** (không có khóa):

| $n$ | Duyệt hết $O(n)$ | Nhị phân $O(\log_2 n)$ (mảng **đã sort**) |
|-----|------------------|------------------------------------------|
| 10 | 10 | ~4 |
| 1 000 | 1 000 | ~10 |
| 1 000 000 | 1 000 000 | ~20 |

Một triệu so sánh vẫn chấp nhận được trên máy hiện đại; **một triệu lần một triệu** ($n^2$, sort nổi bọt) thì khác. Mục 1.4 sẽ đo đúng. Ở đây chỉ cần: **cùng bài, khác CTDL / khác giải thuật → số bước lệch hàng chục, hàng nghìn lần**.

Thêm đầu mảng $n=10^5$: mỗi lần thêm dồn ~$10^5$ hồ sơ. Thêm $10^5$ lần (danh sách lớn dần) → cỡ $n^2/2$ phép — máy vẫn làm được nhưng **lạc hướng**: cùng việc trên DSLK là $O(1)$ mỗi lần thêm đầu (Ch.3). Đó là vai trò CTDL: không phải “code chạy”, mà **số bước theo $n$**.

### 1.1.7. Bản đồ môn — CTDL sẽ gặp

```
 Ch.1  Kiểu, chọn, O(...)           ← đang học
 Ch.2  Tìm + sort trên MẢNG
 Ch.3  DSLK (con trỏ, heap)
 Ch.4  Stack LIFO, Queue FIFO
 Ch.5  Cây, BST, AVL
```

Mỗi chương = một cách **cất** + bộ **thao tác** + giải thuật kèm $O$. Ch.1 là lưỡi đo và lưỡi chọn.

```
  Mảng (tuần tự) ──Ch.2── tìm / sort trên chỉ số
       │
       └── Ch.1 bạn đang đứng: chọn + đo O
              │
  Liên kết ──Ch.3── NODE, pHead, Them/Xoa
       │
       ├── Ch.4  quy tắc LIFO / FIFO (đặt lên mảng hoặc DSLK)
       └── Ch.5  nhánh trái/phải, BST, AVL
```

Chưa cần nhớ code Ch.5. Chỉ cần: **đổi hình cất → đổi đường đi → đổi $O$**.

### 1.1.8. Chương trình minh họa — copy, chạy, đối chiếu tay

Hai mức: (1) tối thiểu để tin compiler; (2) đủ thao tác case study.

```bash
c++ -std=c++11 -o sv sv.cpp && ./sv
```

#### A. Tối thiểu (KhoiTao, ThemCuoi, Tim)

```bash
c++ -std=c++11 -o sv sv.cpp && ./sv
```

```cpp
#include <iostream>
#include <cstring>
using namespace std;

struct SinhVien {
    char ma[16];
    char ten[64];
    float diem;
};
const int MAX = 100;

void KhoiTao(int &n) { n = 0; }
void ThemCuoi(SinhVien a[], int &n, SinhVien x) {
    if (n < MAX) a[n++] = x;
}
int TimTheoMa(SinhVien a[], int n, const char* ma) {
    for (int i = 0; i < n; i++)
        if (strcmp(a[i].ma, ma) == 0) return i;
    return -1;
}

int main() {
    SinhVien a[MAX];
    int n;
    KhoiTao(n);
    SinhVien x = {"SV001", "An", 8};
    ThemCuoi(a, n, x);
    x = {"SV003", "Binh", 7.5f};
    ThemCuoi(a, n, x);
    cout << "n = " << n << "\n";
    cout << "Tim SV003: " << TimTheoMa(a, n, "SV003") << "\n";  // 1
    cout << "Tim SV999: " << TimTheoMa(a, n, "SV999") << "\n";  // -1
    return 0;
}
```

Kỳ vọng: `n = 2`, rồi `1` và `-1`.

#### B. Đủ ThemDau / XoaTai / SuaDiem

Ghép các hàm mục 1.1.5 vào cùng file, `main` như sau (kỳ vọng viết ra giấy **trước** khi chạy):

```cpp
int main() {
    SinhVien a[MAX];
    int n;
    KhoiTao(n);

    SinhVien x;
    x = {"SV001", "An", 8};      ThemCuoi(a, n, x);
    x = {"SV003", "Binh", 7.5f}; ThemCuoi(a, n, x);
    x = {"SV007", "Chi", 9};     ThemCuoi(a, n, x);
    // n=3: SV001, SV003, SV007

    x = {"SV000", "Zero", 5};    ThemDau(a, n, x);
    // n=4: SV000, SV001, SV003, SV007

    XoaTai(a, n, 2);             // xoa SV003
    // n=3: SV000, SV001, SV007

    SuaDiem(a, n, "SV001", 10);
    Xuat(a, n);
    cout << "Tim SV003: " << TimTheoMa(a, n, "SV003") << "\n";  // -1
    return 0;
}
```

Kỳ vọng `Xuat`:

```
SV000 | Zero | 5
SV001 | An | 10
SV007 | Chi | 9
```

và dòng tìm `-1`. Sai một ô → quay lại bảng dồn ③④, đừng sửa đại `for`.

**Bẫy 1.1**

1. Quên `n++` sau thêm → lần sau ghi đè `a[0]`.
2. Tìm nhưng so `=` trên `char[]` (`a[i].ma == ma`) — so **địa chỉ**, không so chữ. Phải `strcmp`.
3. Không kiểm `n >= MAX`.
4. Nhị phân trên mảng vừa thêm lung tung, chưa sort.
5. `ThemDau` dồn từ `i=0` lên → cả mảng một giá trị.
6. `XoaTai` quên `n--` → `Xuat` in thêm rác ô cũ.
7. `int n;` không `KhoiTao` → `n` rác, `ThemCuoi` ghi `a[rác]`.
8. So điểm `==` kiểu `float` sau nhiều phép tính (xem 1.3).

### ✅ Kiểm tra nhanh 1.1

1. Chương trình = ? + ?
2. Thêm cuối mảng chưa đầy: $O(1)$ hay $O(n)$? Thêm đầu?
3. Vì sao 50 biến `ten1…ten50` không gọi là CTDL danh sách?
4. Cùng tìm mã, mảng chưa sort và BST khác nhau chỗ nào?
5. Xóa cuối mảng: $O(1)$ hay $O(n)$? Xóa đầu?
6. Dồn thêm đầu: vòng `for` chạy từ đâu tới đâu? Vì sao không từ `0` lên?

**Đáp án:** (1) CTDL + giải thuật. (2) $O(1)$; thêm đầu $O(n)$ vì dồn. (3) Không có chỉ số chung, không tăng $n$, không một hàm `Tim` dùng lại. (4) Đường đi khác → giải thuật khác, $O$ khác. (5) Xóa cuối $O(1)$ (`n--`); xóa đầu $O(n)$. (6) Từ `n-1` xuống `0`; từ `0` lên thì đè dữ liệu chưa copy.

---

## 1.2. CÁC TIÊU CHUẨN ĐÁNH GIÁ CẤU TRÚC DỮ LIỆU

Chọn CTDL = **đánh giá**, không phải đoán. Năm tiêu chuẩn dưới đây dùng cho vấn đáp, báo cáo, và khi đọc Ch.3–5.

Câu hỏi thi hay gặp: *“Em chọn cấu trúc nào? Vì sao?”* Trả lời đủ: thao tác nóng + tiêu chuẩn nào thắng + tiêu chuẩn nào **chấp nhận hy sinh**.

### 1.2.1. Năm tiêu chuẩn

### A. Tiêu chuẩn 1 — Đúng đắn

Cấu trúc + thao tác phải **đúng trên mọi biên**: rỗng, một phần tử, đầy, không tìm thấy.

```
 Xoa khi n = 0?     Tim khi khong co ma?
 Them khi n = MAX?  Xoa phan tu duy nhat — n con 0 chu?
```

Hàm tìm trả `-1` khi không có là **đúng**. Hàm tìm không kiểm hết mảng, trả `0` mặc định là **sai** — dù $O(1)$.

Đúng đắn **luôn thắng** thời gian. AVL xoay đẹp mà mất nút → 0 điểm.

**Ví dụ đạt / trượt:**

| Hàm | Việc | Đạt? |
|-----|------|------|
| `Tim` trả −1 khi hết mảng | Mọi khóa không có đều −1 | Đạt |
| `Tim` trả 0 khi không thấy | Nhầm “có ở ô 0” | Trượt |
| `XoaTai` khi $n=0$ vẫn `n--` | $n$ âm, lần sau vỡ | Trượt |
| `ThemCuoi` khi đầy im lặng ghi `a[MAX]` | Vượt biên | Trượt |

Viết test biên **trước** khi tối ưu vòng lặp.

### B. Tiêu chuẩn 2 — Thời gian (thao tác nóng)

Liệt kê thao tác, đánh dấu cái chạy **nhiều lần / trong vòng lặp lớn**. Tối ưu **chúng**.

| Tình huống | Nóng | Hệ quả chọn |
|------------|------|-------------|
| In danh sách 40 SV một lần | Duyệt hết | Mảng, $O(n)$ chấp nhận |
| Tra cứu MSSV mỗi request | Tìm | Cần $O(\log n)$ hoặc tốt hơn khi $n$ lớn |
| Undo mỗi lần gõ | Push/Pop đỉnh | Stack $O(1)$, không cần tìm giữa |
| Khách quầy | Vào cuối, ra đầu | Queue |

**Bẫy:** tối ưu thêm cuối $O(1)$ trong khi 99% việc là **tìm** $O(n)$ — chọn nhầm.

**Cách làm trên giấy (4 dòng):**

```
1. Liệt kê thao tác: ThemCuoi, ThemDau, Tim, Xoa, Xuat, a[i]
2. Đánh dấu nóng (tần suất / nằm trong vòng lớn)
3. Tra bảng giá (1.2.2) cột tương ứng
4. Chọn CTDL làm cột nóng rẻ; chấp nhận cột khác đắt
```

Ví dụ: playlist “thêm bài cuối + phát bài kế (đầu)”. Nóng ≈ thêm cuối **và** lấy/xóa đầu → nghĩ Queue hoặc DSLK hai đầu. Không nghĩ BST.

### C. Tiêu chuẩn 3 — Bộ nhớ

| Cách cất | RAM |
|----------|-----|
| Mảng `SinhVien a[MAX]` | Luôn `MAX` hồ sơ, dù $n=3$ |
| DSLK $n$ nút | ~$n$ hồ sơ + $n$ con trỏ (Ch.3) |
| Cây | Mỗi nút thêm 2 con trỏ |

Máy nhúng / đề `MAX=100` nhỏ: mảng ổn. `MAX=10^7` trên stack: **tràn stack** (mảng cục bộ quá lớn). Khi đó cấp heap (`new`) hoặc không nhồi một phát.

**Tính thô (minh họa, không phải đề bắt thuộc số):**  
`SinhVien` ≈ 16+64+4 ≈ 84 byte (chưa kể padding). `a[1000]` ≈ 84 KB — nhỏ. `a[10^6]` ≈ 80 MB — còn vừa heap, **không** khai báo cục bộ trên stack. Con trỏ mỗi nút DSLK thêm 8 byte (64-bit): $n$ lớn thì “thuế con trỏ” đáng kể, đổi lại không phải `MAX` cứng.

### D. Tiêu chuẩn 4 — Dễ cài, dễ đọc, dễ sửa

Mảng + `for`: cả lớp viết được. AVL: đúng $O(\log n)$ nhưng xoay sai một con trỏ là mất cây.

Đồ án 4 tuần, $n$ nhỏ: **đơn giản thắng**. Thi Ch.5: phải AVL vì đề bắt.

Bảng “dễ” (cảm tính khóa này, không phải định lượng):

| Cài | Khó ở đâu |
|-----|-----------|
| Mảng + `n` | Biên `MAX`, dồn ô |
| DSLK đơn | `NULL`, rỗng, mất `pHead` |
| Stack/Queue mảng | `top`, `front`/`rear`, vòng `%` |
| BST | xóa 2 con |
| AVL | bốn case xoay |

Chọn khó hơn chỉ khi tiêu chuẩn 2 **bắt buộc** (n lớn, tìm nóng).

### E. Tiêu chuẩn 5 — Mở rộng

| Câu hỏi | Mảng cố định | DSLK |
|---------|--------------|------|
| $n$ tăng vượt `MAX`? | Phải cấp mảng mới, copy | Thêm nút |
| Thêm thao tác “chèn giữa”? | Dồn $O(n)$ | $O(1)$ nếu cầm nút trước (Ch.3) |

Hôm nay $n\le 40$, tháng sau $n=40\,000$ và thêm “chèn theo điểm” — mảng vẫn chạy nhưng **dồn mỗi lần chèn** thành nút thắt. Mở rộng = đoán thao tác **sẽ** nóng, không chỉ thao tác demo.

### 1.2.2. Bảng giá các CTDL sẽ học (nhìn trước — chứng minh ở chương sau)

Giá khi **không suy biến**. “$O(1)$ thêm DSLK” = thêm **đầu** (hoặc cuối nếu có `pTail`).

| CTDL | `a[i]` / thứ $i$ | Tìm khóa | Thêm đầu | Thêm cuối |
|------|------------------|----------|----------|-----------|
| Mảng | $O(1)$ | $O(n)$; đã sort: nhị phân $O(\log n)$ | $O(n)$ dồn | $O(1)$ nếu chưa đầy |
| DSLK đơn + tail | $O(n)$ | $O(n)$ | $O(1)$ | $O(1)$ |
| Stack | không | không | Push $O(1)$ | — |
| Queue | không | không | — | Enqueue $O(1)$ (ra ở đầu) |
| BST cân | — | $O(\log n)$ | $O(\log n)$ | — |

Hash: tìm **trung bình** $O(1)$, xấu $O(n)$. Ch.1 không cài — biết để chọn từ điển.

**Điều kiện — đọc kỹ kẻo nói tuyệt đối:**

| Câu dễ sai | Đủ điều kiện |
|------------|----------------|
| “DSLK thêm $O(1)$” | Thêm **đầu**; hoặc thêm cuối **khi có `pTail`** |
| “DSLK xóa $O(1)$” | Đang cầm nút (đơn: còn nút **trước**); không thì tìm $O(n)$ rồi mới xóa |
| “Mảng tìm $O(\log n)$” | Mảng **đã sort** + giải thuật nhị phân |
| “BST $O(\log n)$” | Cây **không suy biến**; dãy tăng không xoay → $O(n)$ (Ch.5) |
| “Stack truy cập giữa $O(1)$” | **Không** — ADT cấm đụng giữa |

### 1.2.3. Case study chọn cấu trúc

#### A. Bốn bài vấn đáp (thuộc hướng trả lời)

**Bài A.** Điểm danh 40 người, in theo thứ tự vào lớp.  
→ **Mảng**. Nóng = thêm cuối + in hết. $n$ nhỏ.

**Bài B.** Soạn thảo: Ctrl+Z.  
→ **Stack**. Nóng = hủy thao tác mới nhất (LIFO, Ch.4).

**Bài C.** Quầy vé: vào cuối hàng, phục vụ đầu hàng.  
→ **Queue** (FIFO).

**Bài D.** Từ điển 100 000 từ, tra cứu liên tục, thỉnh thoảng thêm.  
→ Nóng = **tìm**. Mảng tuyến tính $O(n)$ quá chậm ($n\approx 10^5$). Hướng: cây cân / bảng băm (môn này: BST/AVL Ch.5).

```
 Thao tác nóng?
    │
    ├─ lấy đúng ô thứ i, n biết trước     → mảng
    ├─ thêm/xóa đầu rất nhiều             → DSLK / Stack
    ├─ vào cuối ra đầu                    → Queue
    ├─ tìm + thêm khi n lớn               → cây cân
    └─ n nhỏ, deadline gần                → mảng, code ngắn
```

#### B. Làm chậm: quản lý sách phòng đọc (một đề án)

**Yêu cầu thu thập:**

1. Thêm sách mới (không thường).
2. Tra ISBN khi bạn đọc hỏi (rất thường).
3. Đánh dấu còn/mượn (sau khi đã tra được).
4. Cuối ngày in danh sách quá hạn (một lần).

**Bảng tần suất (tự đặt, có lý):**

| Thao tác | Tần suất | Nếu mảng chưa sort | Nếu cây cân |
|----------|----------|--------------------|-------------|
| Tra ISBN | mỗi vài phút × cả ngày | $O(n)$ mỗi lần | $O(\log n)$ |
| Sửa cờ mượn | sau mỗi lần tra | $O(1)$ khi đã có chỉ số/nút | $O(1)$ tại nút |
| Thêm sách | ít | $O(1)$ cuối | $O(\log n)$ |
| In quá hạn | 1 lần/ngày | $O(n)$ duyệt | $O(n)$ duyệt |

Kết luận: nóng = **tra**. $n=200$ sách phòng nhỏ → mảng + tìm tuyến tính **đủ**. $n=200\,000$ thư viện thành → không chọn mảng tuyến tính làm xương sống.

**Câu trả lời vấn đáp mẫu:**

> Em chọn cây nhị phân tìm kiếm (hoặc AVL nếu đề yêu cầu cân) vì thao tác nóng là tìm theo ISBN, $n$ lớn. Hy sinh: không có `a[i]` $O(1)$; in hết vẫn $O(n)$. Đúng đắn: ISBN trùng phải quy ước (từ chối thêm).

#### C. Bài “chọn sai” — học từ phản ví dụ

| Chọn | Bài | Vì sao sai |
|------|-----|------------|
| AVL | 40 SV, in danh sách | Quá tay, dễ bug xoay, $n$ nhỏ |
| Mảng | Undo 10 000 lần gõ | Xóa “phần tử mới nhất” nếu để giữa mảng là $O(n)$ mỗi lần; Stack $O(1)$ |
| Stack | Xếp hàng siêu thị | LIFO phục vụ người vào **sau** trước — sai nghiệp vụ |
| Queue | Tính biểu thức ngoặc | Cần LIFO (Ch.4) |

### 1.2.4. Đánh đổi thời gian–bộ nhớ (nói được một câu)

Muốn truy cập `a[i]` với $O(1)$: phải **ô kề** → chèn giữa phải dồn, `MAX` cứng.  
Muốn chèn giữa $O(1)$ khi đã cầm nút: **con trỏ** → mất `a[i]`, thêm RAM.

Không có cấu trúc “nhanh mọi thao tác, chẳng tốn RAM, dễ viết”. Báo cáo: viết **đã hy sinh thao tác nào**.

**Bảng cảm nhận đánh đổi** (cùng $n$ phần tử):

| Muốn rẻ | Thường phải trả |
|---------|-----------------|
| `a[i]` $O(1)$ | Chèn/xóa giữa $O(n)$, `MAX` |
| Chèn đầu $O(1)$ | Không `a[i]`, thuế con trỏ |
| Tìm $O(\log n)$ | Phải sort (mảng) hoặc giữ cây cân |
| Code 20 dòng | $O$ kém khi $n$ lớn |

### ✅ Kiểm tra nhanh 1.2

1. Hàm tìm $O(1)$ nhưng sai khi mảng rỗng. Đạt tiêu chuẩn nào, trượt tiêu chuẩn nào?
2. 99% việc là tìm, 1% là thêm cuối. Tối ưu thêm cuối trước — đúng/sai?
3. “DSLK xóa $O(1)$” thiếu điều kiện gì?
4. 40 SV in hết: chọn AVL “cho nhanh” — sai tiêu chuẩn nào?
5. Hàng siêu thị dùng Stack — sai chỗ nào?

**Đáp án:** (1) Thời gian đạt, đúng đắn trượt. (2) Sai — tối ưu thao tác nóng. (3) Phải đang cầm nút (đơn: còn nút trước); không thì tìm đã $O(n)$. (4) Dễ cài / đúng đủ dùng: $n$ nhỏ, nóng là duyệt. (5) LIFO phục vụ người vào sau trước — nghiệp vụ FIFO.

---

## 1.3. KIỂU DỮ LIỆU

CTDL = cách xếp **nhiều giá trị thuộc kiểu**. Sai kiểu thì `struct NODE` Ch.3 chỉ học vẹt.

Hai câu của mục này: *một giá trị máy hiểu thế nào?* và *nhiều giá trị xếp ra sao?* Câu hai chính là cửa vào mảng / `struct` / con trỏ.

### 1.3.1. Biến, kiểu, ô nhớ

#### A. Bốn thành phần của một biến (zero)

Mỗi biến lúc chạy chiếm **ô nhớ**:

| Thành phần | Ý nghĩa | Ví dụ |
|------------|---------|--------|
| Tên | Cách ta gọi | `x` |
| Kiểu | Cách hiểu bit + phép | `int` (thường 4 byte) |
| Giá trị | Đang chứa | `10` |
| Địa chỉ | Chỗ trên RAM | `0x100` (minh họa) |

```cpp
int x = 10;
cout << x << "\n";          // gia tri
cout << &x << "\n";         // dia chi
```

```
     tên x
   ┌────────┐
   │   10   │   ← giá trị
   └────────┘
   địa chỉ 0x100
```

Ẩn dụ: **số nhà** = địa chỉ, **người ở** = giá trị. Kiểu = “đây là nhà ở, không phải kho”.

Hai biến `int x=10, y=10;` **cùng giá trị, khác địa chỉ** — hai căn nhà khác nhau, tình cờ cùng người ở.

```
   x @ 0x100          y @ 0x104
 ┌────────┐         ┌────────┐
 │   10   │         │   10   │
 └────────┘         └────────┘
```

`x = y` **chép giá trị**, không nhập hai nhà thành một.

#### B. Kiểu = tập giá trị + tập phép

Máy chỉ có bit. `int` bảo: 4 byte kia là số có dấu, được `+ - * / %` và so sánh.

```
  4 byte:  00 00 00 41

  đọc int   →  65
  đọc char  →  phụ thuộc ô / endian
```

Cùng bit, **đổi kiểu là đổi nghĩa**.

`char c = 'A';` và `int k = 65;` trên nhiều máy đều liên quan ASCII 65, nhưng phép `c+1` ra `'B'` (vẫn `char` nếu gán lại `char`), còn `k+1` ra `66`. Đừng cộng `char` như đếm điểm thi.

### 1.3.2. Kiểu cơ sở — bảng sống, tràn, ký tự, số thực

Kích thước **lệ thuộc máy**. Bảng: máy 64-bit phổ biến (LP64).

| Kiểu | `sizeof` | Miền / ý |
|------|----------|----------|
| `char` | 1 | Ký tự; cũng là số $-128..127` (signed) |
| `short` | 2 | |
| `int` | 4 | Mặc định đề |
| `long long` | 8 | Nhân lớn, tràn `int` |
| `float` | 4 | ~7 chữ số |
| `double` | 8 | Nên dùng khi tính |
| `bool` | 1 | C++: `true`/`false` |
| `int*` | 8 (64-bit) | Địa chỉ, **không** phải 4 |

```cpp
#include <iostream>
#include <climits>
using namespace std;
int main() {
    cout << "int " << sizeof(int) << " byte, INT_MAX=" << INT_MAX << "\n";
    cout << "con tro " << sizeof(int*) << " byte\n";
    return 0;
}
```

#### `char` và ASCII — hay lẫn `'5'` với `5`

```
  'A' = 65    '0' = 48    '5' = 53
  '5' - '0' = 5     ← doi ky tu so sang gia tri
```

```cpp
char c = '5';
int v = c - '0';    // 5
c = c + 1;          // '6'
```

**Bảng nhỏ hay dùng:**

| Ký tự | Mã | Ghi nhớ |
|-------|-----|---------|
| `'0'` | 48 | `'0'+k` ra ký tự chữ số $k$ ($0\le k\le 9$) |
| `'A'` | 65 | |
| `'a'` | 97 | `'a'-'A' = 32` |
| `'\\0'` | 0 | kết chuỗi C |
| `' '` | 32 | khoảng trắng |

Nhập `cin >> c` khi người dùng gõ phím `5` → `c=='5'` (53), **không** phải `c==5`.

#### Tràn `int` — chạy tay

`INT_MAX` ≈ $2\cdot 10^9$ ($2^{31}-1 = 2147483647$).  

```cpp
int a = 1000000;
int b = a * a;      // 10^12 khong vua int 32-bit → SAI / undefined
long long c = 1LL * a * a;   // dung: nhan trong long long
```

| Phép | Vừa `int` 32-bit? |
|------|-------------------|
| $2000\times 2000=4\cdot 10^6$ | Có |
| $10^6\times 10^6=10^{12}$ | Không |
| $n(n-1)/2$ với $n=10^5$ | Trung gian $n(n-1)$ đã $10^{10}$ — **tràn trước khi chia** nếu tính bằng `int` |

Đếm số cặp (ví dụ 4 mục 1.4) trên giấy dùng công thức; trên máy với $n$ lớn dùng `long long`.

`int` không “tự thành `long long`” vì kết quả lớn. Phải đổi kiểu **trước** phép nhân: `1LL * a * a`.

#### `float` không chứa đúng 0.1

```cpp
float s = 0.1f + 0.2f;
// s == 0.3f  co the false
```

Tiền tệ: dùng số nguyên (xu), đừng `==` hai `float`.

Điểm thi: `float`/`double` được, in vài chữ số; **không** viết `if (diem == 8.5)` sau khi cộng dồn nhiều lần — dùng khoảng hoặc so trên thang 10 đã làm tròn.

#### `bool` và 0 / khác 0

C++: `false` là 0, `true` là 1. Trong điều kiện, `if (n)` đúng khi $n\neq 0$. `if (p)` đúng khi con trỏ khác `NULL`. Rõ ràng hơn: `if (n != 0)`, `if (p != NULL)`.

#### Stack bộ nhớ vs heap (chỉ cần Ch.1)

| | Stack (gọi hàm) | Heap (`new`) |
|---|-----------------|--------------|
| Biến cục bộ `int x`, `int a[100]` | Có | |
| `new SinhVien` | | Có |
| Hết hàm | **Mất** | Còn đến `delete` |
| Quên `delete` | | Rò rỉ (Ch.3) |

`int a[10000000];` trong `main` dễ **tràn stack**. Mảng lớn: tĩnh toàn cục hoặc `new[]`.

Hình tối thiểu:

```
  Call Stack (tự mất khi hết hàm)     Heap (new / delete)
  ┌─────────────┐                     ┌─────────────┐
  │ main: n, a[]│                     │  node DSLK  │  ← Ch.3
  │ Tim: i      │                     │  (sống lâu) │
  └─────────────┘                     └─────────────┘
```

Ch.1: biến cục bộ và mảng `a[MAX]` nằm stack. Ch.3 mới sống chết với `new`.

### ✅ Kiểm tra nhanh 1.3.2

1. `'5' == 5` đúng hay sai?
2. `int b = 1000000 * 1000000;` có chắc ra $10^{12}$?
3. Hai `float` vừa cộng xong, so `==` được không?

**Đáp án:** (1) Sai — trái là 53. (2) Không, tràn `int`. (3) Không nên.

---

### 1.3.3. Mảng — cấp phát tuần tự

Cùng kiểu, chỉ số $0\ldots n-1$, **kề nhau** →

$$
\mathrm{addr}(a[i]) = \mathrm{addr}(a[0]) + i \times \mathrm{sizeof}(\text{phần tử})
$$

nên `a[i]` **$O(1)$**, không đi từng ô.

```
  a[0]   a[1]   a[2]   a[3]
 ┌─────┬─────┬─────┬─────┐
 │ 10  │ 20  │ 30  │ 40  │
 └─────┴─────┴─────┴─────┘
  0x200  0x204  0x208  0x20C    (int 4 byte)
```

```cpp
int a[4] = {10, 20, 30, 40};
a[2] = 99;
```

Tính tay địa chỉ (giả sử `a[0]` ở `0x200`, `sizeof(int)=4`):

| Phần tử | Công thức | Địa chỉ |
|---------|-----------|---------|
| `a[0]` | `0x200 + 0*4` | `0x200` |
| `a[1]` | `0x200 + 1*4` | `0x204` |
| `a[3]` | `0x200 + 3*4` | `0x20C` |

Máy **không** đi `a[0]→a[1]→a[2]` để tới `a[3]`. Đó là định nghĩa truy cập $O(1)$. DSLK **không** có công thức này.

**Mảng 2 chiều** `int m[2][3]` — hàng 0 nằm xong mới hàng 1 (row-major):

```
 Chỉ số tuyến tính:     0      1      2      3      4      5
                     ┌──────┬──────┬──────┬──────┬──────┬──────┐
                     │[0][0]│[0][1]│[0][2]│[1][0]│[1][1]│[1][2]│
                     └──────┴──────┴──────┴──────┴──────┴──────┘
```

$$
\mathrm{addr}(m[i][j]) = \mathrm{addr}(m[0][0]) + (i\cdot \textit{số cột} + j)\times \mathrm{sizeof}(\text{phần tử})
$$

Ví dụ 3 cột, `m[1][2]`: offset $1\cdot 3+2=5$ phần tử.

Hai vòng `for i`, `for j`: $O(\textit{hàng}\times\textit{cột})$. Đây là nguồn $O(n^2)$ khi ma trận vuông $n\times n$.

**Bẫy mảng**

1. `a[n]` khi chỉ số hợp lệ $0..n-1` — vượt biên, undefined. `a[-1]` cũng vậy.
2. `void f(int a[]) { sizeof(a); }` → kích thước **con trỏ**, không phải cả mảng. Luôn truyền `n`.
3. `int a[n];` VLA — C++ chuẩn đề thi thường dùng `const int MAX` hoặc `n` đã biết.
4. Khởi tạo `int a[3];` không gán → giá trị **rác**. `Xuat` trước `Them` in rác.
5. `int a[3] = {1,2,3};` rồi `a[3]=4` — không có ô thứ 4.

### ✅ Kiểm tra nhanh 1.3.3

1. `a` bắt đầu `0x1000`, `float` 4 byte. Địa chỉ `a[5]`?
2. Ma trận `n` hàng `n` cột, duyệt hết: $O$?
3. Vì sao DSLK không có `a[i]` $O(1)$?

**Đáp án:** (1) `0x1000 + 20 = 0x1014`. (2) $O(n^2)$. (3) Ô không kề theo chỉ số; phải đi `pNext`.

---

### 1.3.4. `struct`, mảng `struct`, chuỗi

```cpp
struct SinhVien {
    char ma[16];
    char ten[64];
    float diem;
};
SinhVien a[3];
a[0].diem = 8.5f;
```

```
 a[0]                              a[1]
┌────────┬──────────┬──────┐     ┌──
│ ma     │ ten      │ diem │     │ ...
└────────┴──────────┴──────┘     └──
```

Toán tử `.` khi có **biến struct**. Toán tử `->` khi có **con trỏ** tới struct: `p->diem` ≡ `(*p).diem`.

`typedef` chỉ là đặt tên: `typedef SinhVien SV;` — không tạo kiểu mới về bản chất.

Chuỗi C: mảng `char` kết `'\\0'`.

```
  "An" :  ['A']['n']['\0']
```

So sánh: `strcmp`, không `==`.

**Chạy tay chuỗi** — đây là nguồn bug `Them`/`Tim` mã SV:

```
  char ma[16] = "SV001";

  chỉ số:  0    1    2    3    4    5
         ['S']['V']['0']['0']['1']['\0'] ...
```

`strlen(ma)` = 5 (không đếm `'\\0'`). `strcmp(ma, "SV001")==0` nghĩa là **trùng**. `ma == "SV001"` so hai **địa chỉ** — hầu như luôn sai.

Copy chuỗi: `strcpy(a[i].ma, x.ma);` hoặc gán cả struct `a[n] = x;` (C++ copy từng trường, kể cả mảng `char` trong struct).

`typedef` chỉ là đặt tên: `typedef SinhVien SV;` — không tạo kiểu mới về bản chất.

**Padding** *(nâng cao, biết là có):* compiler có thể chèn byte trống cho `float`/`int` thẳng hàng. `sizeof(SinhVien)` có thể **> 16+64+4**. Đừng cộng tay rồi khẳng định chắc 84 — in `sizeof`.

### 1.3.5. ADT — hợp đồng trước khi cài

**ADT danh sách:** khởi tạo rỗng; thêm; xóa; lấy phần tử thứ $i$; tìm; duyệt; hỏi rỗng.

Cài 1: mảng + `n`.  
Cài 2: DSLK `pHead`/`pTail` (Ch.3).

Người dùng ADT **không cần biết** cài nào, miễn thao tác đúng. Người cài **phải** biết để đảm bảo $O$.

**ADT Stack** (Ch.4, xem trước): chỉ `Push`/`Pop`/`Peek` đỉnh.  
Cài mảng (`top`) hoặc DSLK (`ThemDau`/`XoaDau`). Đề thi bắt một cài.

```
     ADT Stack
     Push / Pop / Peek
          │
    ┌─────┴─────┐
  Mảng + top   DSLK (đầu = đỉnh)
```

Bảng “hợp đồng vs cài”:

| Câu hỏi người dùng ADT | Câu hỏi người cài |
|------------------------|-------------------|
| Push khi đầy thì sao? | Mảng: `IsFull`. DSLK: hết RAM |
| Pop trả gì khi rỗng? | Cả hai: `IsEmpty`, không đọc rác |
| Peek có xóa không? | Không — chỉ đọc đỉnh |

Thi hay hỏi: *Stack là ADT hay là mảng?* Trả lời: **ADT**; mảng chỉ là **một** cách cài.

### 1.3.6. Con trỏ và truyền tham số — vừa đủ, ô nhớ từng dòng

**Con trỏ** = biến chứa **địa chỉ**.

```
   x (int)                 p (int*)
 ┌────────┐              ┌────────┐
 │   10   │ ←─────────── │ 0x100  │
 └────────┘              └────────┘
  0x100
```

| Ký hiệu | Việc |
|---------|------|
| `&x` | Địa chỉ của `x` |
| `int *p` | `p` trỏ tới `int` |
| `*p` | Giá trị **tại** ô `p` đang trỏ |

```cpp
int x = 10, y = 20;
int *p = &x;
*p = 99;     // x = 99, p van tro x
p = &y;      // p doi sang y
*p = 5;      // y = 5, x van 99
```

| Sau lệnh | `x` | `y` | `p` trỏ | `*p` |
|----------|-----|-----|---------|------|
| `x=10; y=20;` | 10 | 20 | — | — |
| `p=&x;` | 10 | 20 | `x` | 10 |
| `*p=99;` | **99** | 20 | `x` | 99 |
| `p=&y;` | 99 | 20 | **`y`** | 20 |
| `*p=5;` | 99 | **5** | `y` | 5 |

Hai việc **không lẫn:** `*p = …` đổi **nhà đang ở**; `p = …` đổi **số nhà đang cầm**.

**Bẫy:** `int *p;` rồi `*p = 1;` — `p` hoang, không trỏ đâu cả. Phải `p = &x` hoặc `p = new int`. Chi tiết heap: Ch.3.

**Truyền hàm:** `void f(int n)` nhận **bản sao** — đổi `n` không đổi biến ngoài. Cần đổi `n` thật: `void f(int &n)` (C++) hoặc `void f(int *p)` rồi `*p`.

```cpp
void Tang(int &n) { n++; }
void TangConTro(int *p) { (*p)++; }
```

Đó là lý do `ThemCuoi(..., int &n)` và Ch.3 `ThemDau(LIST &l, ...)`.

**Chạy tay truyền tham trị vs tham chiếu:**

```cpp
void KhongDoi(int n) { n = n + 1; }
void CoDoi(int &n)   { n = n + 1; }

int x = 5;
KhongDoi(x);   // x van 5 — doi ban sao
CoDoi(x);      // x thanh 6
```

```
 KhongDoi:     x (ngoài) 5          n (trong hàm) 5 → 6  (chết khi return)
 CoDoi:        x và n là CÙNG một ô  5 → 6
```

Mảng truyền hàm: `void Xuat(SinhVien a[], int n)` — `a` là **địa chỉ ô đầu**, nên `a[i].diem = ...` **đổi mảng ngoài**. Riêng `n` nếu không `&` thì `n++` trong `ThemCuoi` **mất**. Đó là cặp bắt buộc: `a[]` + `int &n`.

`NULL`: con trỏ không trỏ đâu. So `p == NULL` trước khi `*p`. Ch.3: `pHead == NULL` nghĩa là danh sách rỗng.

### ✅ Kiểm tra nhanh 1.3

1. `a[i]` $O(1)$ nhờ đâu?
2. `'0'+3` ra ký tự nào?
3. `*p=2` và `p=&y` khác nhau thế nào?
4. ADT khác `struct` ở điểm nào?
5. Trong `void f(int a[])`, `sizeof(a)` có phải kích thước mảng không?
6. `ThemCuoi(SinhVien a[], int n, ...)` thiếu `&` ở `n` — chuyện gì?
7. `p->diem` viết lại bằng `*` và `.`?

**Đáp án:** (1) Ô kề, địa chỉ tính được. (2) `'3'`. (3) Đổi giá trị tại chỗ đang trỏ / đổi chỗ đang trỏ. (4) ADT = thao tác; `struct` = bố trí bit. (5) Không — là con trỏ. (6) `n` ngoài không tăng, lần thêm sau đè `a[cùng chỉ số]`. (7) `(*p).diem`.

---

## 1.4. ĐÁNH GIÁ ĐỘ PHỨC TẠP CỦA GIẢI THUẬT

Lưỡi đo dùng **cả môn**. Thi lý thuyết hay cho đoạn `for` và hỏi $O$ / số lần thân vòng.

Đề không hỏi “máy bạn chạy mấy giây”. Đề hỏi: *khi $n$ tăng, số việc tăng theo dạng nào?*

### 1.4.1. $T(n)$ — vì sao không lấy giây trên máy bạn?

Cùng thuật toán: máy khác, lần chạy khác (CPU bận), $n$ khác. Hai sinh viên so `clock()` trên $n=10` **không** kết luận được thuật toán nào tốt.

Mô hình: đếm **phép cơ bản** (so sánh, gán, cộng chỉ số) như hàm $T(n)$. Khi $n$ lớn, hằng số máy lu mờ; **bậc tăng** còn lại: $n$ hay $n^2$.

```
  T(n)  ≈  (số phép) khi dữ liệu kích thước n
```

**Ba lý do `clock()` một lần không đủ:**

1. Máy A nhanh gấp 3 máy B — cùng thuật toán, giây khác.
2. $n=10$ che bậc: $100n$ có thể chậm hơn $n^2$ khi $n=10$ ($1000>100$), nhưng $n=1000$ thì $n^2$ thắng xa ($10^6 > 10^5$).
3. Lần chạy CPU đang mở browser — nhiễu.

Bảng minh họa ý 2 (chỉ là số phép mô hình, không phải giây):

| $n$ | $T_1=100n$ | $T_2=n^2$ | Ai lớn hơn? |
|-----|------------|-----------|-------------|
| 10 | 1 000 | 100 | $T_1$ |
| 100 | 10 000 | 10 000 | hòa |
| 1 000 | 100 000 | 1 000 000 | **$T_2$** |

Kết luận thuật toán phải nhìn **khi $n$ lớn**, tức $O$.

Phép cơ bản khóa này: so sánh, gán, cộng/trừ chỉ số, `c++`. Không đếm `cout` từng ký tự trừ khi đề bắt.

### 1.4.2. Tốt / trung bình / xấu

**Tìm tuyến tính** `a[0..n-1]` ra $x$:

| Trường hợp | Tình huống | Số so sánh |
|------------|------------|------------|
| Tốt | $x=a[0]$ | 1 |
| Xấu | không có, hoặc $a[n-1]$ | $n$ |
| TB | vị trí đều | $\approx n/2$ |

Khi $n\to\infty$, cả ba **cùng bậc $n$**. Viết $O(n)$. Đề **không nói** thì lấy **xấu nhất**.

Sort (Ch.2): một số thuật toán tốt $O(n)$ (đã gần sort), xấu $O(n^2)$. Phải nói rõ.

**Chạy tay tìm tuyến tính** $a=[4,1,9,3]$, $n=4$:

| $x$ | So sánh với | Số lần | Loại |
|-----|-------------|--------|------|
| 4 | 4 | 1 | tốt |
| 9 | 4,1,9 | 3 | giữa |
| 3 | 4,1,9,3 | 4 | xấu (cuối) |
| 8 | 4,1,9,3 | 4 | xấu (không có) |

Trung bình nếu khóa **có** và vị trí đều: $(1+2+3+4)/4 = 2.5 \approx (n+1)/2$.

### 1.4.3. $O$, $\Theta$, $\Omega$ và ba quy tắc

- $T(n)=O(g(n))$: $T$ **không vượt** $c\cdot g(n)$ khi $n$ đủ lớn (trần).
- $\Omega$: trần dưới. $\Theta$: cùng bậc (vừa $O$ vừa $\Omega$).

Thực hành: viết **$O(\ldots)$ xấu nhất**, bỏ hằng và hạng nhỏ.

**Ví dụ bỏ hằng:** $T(n)=3n+5$. Với $n\ge 5$, $3n+5 \le 4n$ chẳng hạn → $O(n)$. Không viết $O(3n+5)$.

**Ba quy tắc sống:**

| # | Quy tắc | Ví dụ |
|---|---------|--------|
| 1 | Bỏ hằng, bỏ hạng nhỏ | $n^2+100n+7=O(n^2)$ |
| 2 | Hai khối **nối tiếp**: lấy max | $O(n)+O(n^2)=O(n^2)$ |
| 3 | Vòng **lồng**: nhân | $n$ ngoài $\times n$ trong $=O(n^2)$ |

```cpp
// Khoi 1: O(n)
for (int i = 0; i < n; i++) a[i] = 0;
// Khoi 2: O(n^2)
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++) s += a[i];
// Ca ham: O(n) + O(n^2) = O(n^2)
```

**Cùng bậc hay không — vài cặp thuộc:**

| $T(n)$ | Viết $O$ | Cùng bậc $n^2$? |
|--------|----------|----------------|
| $n^2+n$ | $O(n^2)$ | Có ($\Theta(n^2)$) |
| $100n^2$ | $O(n^2)$ | Có |
| $n^2/2$ | $O(n^2)$ | Có — tam giác |
| $n$ | $O(n)$ | Không |
| $n\log n$ | $O(n\log n)$ | Không — chậm hơn $n$, nhanh hơn $n^2$ |
| $2^n$ | $O(2^n)$ | Không |

$O(n^2)$ **không** có nghĩa “chạy đúng $n^2$ lần” — nghĩa là **không tệ hơn bậc $n^2$**. $3n$ cũng là $O(n^2)$ (trần rộng), nhưng ta viết **chặt**: $O(n)$. Thi: lấy bậc nhỏ nhất “đúng kiểu khóa”.

### 1.4.4. Bảng tăng trưởng — thuộc vài mốc

$\log$ = $\log_2$ về **bậc**. $n=10^6$ → $\log_2 n \approx 20$.

| $n$ | $1$ | $\log n$ | $n$ | $n\log n$ | $n^2$ | $2^n$ |
|-----|-----|----------|-----|-----------|-------|-------|
| 16 | 1 | 4 | 16 | 64 | 256 | 65536 |
| 256 | 1 | 8 | 256 | ~2e3 | ~6e4 | khổng |
| $10^3$ | 1 | ~10 | $10^3$ | ~10^4 | $10^6$ | — |
| $10^6$ | 1 | ~20 | $10^6$ | ~2\cdot10^7 | $10^{12}$ | — |

$n^2$ với $n=10^6$ là **nghìn tỷ** bước — không chơi. $2^n$ với $n=40$ đã nặng (Fibonacci đệ quy thô).

```
 cham
  ▲          2^n
  │         /
  │        n^2
  │      n log n
  │     n
  │   log n
  │  1
  └──────────► n
```

| $O$ | Tên | Việc |
|-----|-----|------|
| $O(1)$ | hằng | `a[i]`, Push |
| $O(\log n)$ | log | nhị phân, cây cân |
| $O(n)$ | tuyến | duyệt, tìm tuyến tính |
| $O(n\log n)$ | | merge sort |
| $O(n^2)$ | bình phương | hai vòng, bubble, `SapXep` đổi chỗ Ch.3 |
| $O(2^n)$ | mũ | tránh $n$ lớn |

Nếu máy làm $10^8$ phép/giây (mốc thô, **không** phải đề bắt thuộc): $n^2$ với $n=10^4$ ≈ $10^8$ phép ~ 1 giây; $n=10^6$ thì $10^{12}$ phép — hết giờ. $\log n$ và $n$ với $n=10^6$ vẫn nhẹ. Dùng bảng này để **cảm** khi nào cần đổi giải thuật, không dùng để ghi vào bài thi như định luật.

### 1.4.5. Đếm tay — kho đề thi (làm chậm, có bảng)

**Ví dụ 1 — một vòng.** Thân chạy đúng $n$ lần. $O(n)$.

```cpp
int s = 0;
for (int i = 0; i < n; i++)
    s += a[i];
```

**Ví dụ 2 — hai vòng nối tiếp, không lồng.** $n+n=O(n)$. **Không** $O(n^2)$.

```cpp
for (int i = 0; i < n; i++) s += a[i];
for (int j = 0; j < n; j++) t += b[j];
```

**Ví dụ 3 — lồng vuông $n\times n$.** `c++` đúng $n^2$ lần. $O(n^2)$.

```cpp
int c = 0;
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        c++;
```

$n=3$: 9 lần. Bảng $i,j$: $(0,0)(0,1)(0,2)(1,0)\ldots(2,2)$.

**Ví dụ 4 — tam giác** (bẫy “bé hơn $n^2$”).

```cpp
int c = 0;
for (int i = 0; i < n; i++)
    for (int j = i + 1; j < n; j++)
        c++;
```

$i=0$: $n-1$ lần; $i=1$: $n-2$; … tổng $n(n-1)/2$. **Vẫn $O(n^2)$**.

$n=4$: $3+2+1+0=6=4\cdot3/2$.

| $i$ | $j$ | số lần |
|-----|-----|--------|
| 0 | 1,2,3 | 3 |
| 1 | 2,3 | 2 |
| 2 | 3 | 1 |
| 3 | — | 0 |

**Ví dụ 5 — tam giác phía kia** `j < i`: tổng $0+1+\cdots+(n-1)$ cùng công thức.

**Ví dụ 6 — vòng trong phụ thuộc hằng.** `for j=0; j<5; j++` trong vòng `i<n`: $5n=O(n)$, không $O(n^2)$.

**Ví dụ 7 — `return` sớm.** Phân tích **xấu**: giả sử không return giữa đường.

```cpp
int Tim(int a[], int n, int x) {
    for (int i = 0; i < n; i++)
        if (a[i] == x) return i;
    return -1;
}
```

Xấu $n$ so sánh, $O(n)$. Tốt $1$ so sánh — **không** kết luận cả hàm $O(1)$.

**Ví dụ 8 — $n$ và $m$ khác nhau.**

```cpp
for (int i = 0; i < n; i++)
    for (int j = 0; j < m; j++)
        c++;
```

$O(nm)$. Nếu đề $m=n$ thì $O(n^2)$.

**Ví dụ 9 — chia đôi** (`i = i*2` hoặc `i = i/2`). *(nâng cao nhẹ, gặp ở nhị phân / tìm kiếm)*

```cpp
int i = 1, c = 0;
while (i < n) {
    c++;
    i = i * 2;
}
```

$i$: $1,2,4,8,\ldots$ đến $\ge n$. Số lần $\approx \log_2 n$. $O(\log n)$.  
$n=16$: $i=1,2,4,8$ rồi $16$ không vào → **4** lần $=\log_2 16$.

**Ví dụ 10 — `if` trong vòng, thân không đổi số lần vòng.**

```cpp
for (int i = 0; i < n; i++)
    if (a[i] % 2 == 0) c++;
```

Vòng vẫn $n$ lần. $O(n)$. `if` không biến $O(n)$ thành $O(1)$.

**Ví dụ 11 — ba vòng lồng $n$.** $O(n^3)$. $n=100$ đã $10^6$; $n=1000$ thì $10^9$.

**Ví dụ 12 — vòng ngoài $n$, trong `n-i` (cùng họ tam giác).** Bubble sort Ch.2: vẫn $O(n^2)$.

Công thức nhớ:

$$
1+2+\cdots+(n-1)=\frac{n(n-1)}{2}=O(n^2)
$$

### 1.4.6. Tìm tuyến tính và tìm nhị phân — đếm so sánh

**Tuyến tính** trên `{10,20,30,40,50}`, tìm `40`: so 10,20,30,40 → **4** lần (thấy). Tìm `99`: **5** lần.

**Nhị phân** — mảng **đã tăng**. Ý tưởng: so với phần tử **giữa**, bỏ một nửa.

```
THUẬT TOÁN NhiPhan(a, n, x) → i hoặc −1     // a tang dan
1. L ← 0, R ← n-1
2. while L ≤ R
3.     M ← (L+R)/2          // chia nguyen
4.     nếu a[M] = x thì trả về M
5.     nếu a[M] < x thì L ← M+1
6.     ngược lại R ← M-1
7. trả về −1
```

Chạy tay $a=[10,20,30,40,50,60,70,80]$, $n=8$, $x=40$:

| Bước | $L$ | $R$ | $M$ | $a[M]$ | Việc |
|------|-----|-----|-----|--------|------|
| 1 | 0 | 7 | 3 | 40 | **bằng** → trả 3 |

Một so sánh. May. Tìm `70`:

| Bước | $L$ | $R$ | $M$ | $a[M]$ | Việc |
|------|-----|-----|-----|--------|------|
| 1 | 0 | 7 | 3 | 40 | 40<70 → $L=4$ |
| 2 | 4 | 7 | 5 | 60 | 60<70 → $L=6$ |
| 3 | 6 | 7 | 6 | 70 | **bằng** → 6 |

Xấu: khoảng còn lại chia 2 đến hết → $O(\log n)$ so sánh. $n=8$ tối đa ~4 lần, không phải 8.

**Tìm không có** — $x=35$, cùng mảng 8 phần tử $[10,20,30,40,50,60,70,80]$:

| Bước | $L$ | $R$ | $M$ | $a[M]$ | Việc |
|------|-----|-----|-----|--------|------|
| 1 | 0 | 7 | 3 | 40 | $40>35$ → $R=2$ |
| 2 | 0 | 2 | 1 | 20 | $20<35$ → $L=2$ |
| 3 | 2 | 2 | 2 | 30 | $30<35$ → $L=3$ |
| 4 | 3 | 2 | — | | $L>R$ dừng, −1 |

Vẫn vài bước, không phải 8. **Bẫy:** mảng chưa sort → nhị phân **sai kết quả**, không phải “nhanh hơn”.

```cpp
int NhiPhan(int a[], int n, int x) {
    int L = 0, R = n - 1;
    while (L <= R) {
        int M = (L + R) / 2;
        if (a[M] == x) return M;
        if (a[M] < x) L = M + 1;
        else R = M - 1;
    }
    return -1;
}
```

`M = (L+R)/2` chia nguyên. *(Nâng cao: $L+R$ tràn `int` khi chỉ số lớn — đề khóa này `n` nhỏ, chưa cần `L+(R-L)/2`.)*

Chi tiết cài + sentinel: **Ch.2**. Ở đây đủ để viết $O$ và đếm tay.

**So hai giải thuật trên cùng $n=16$ đã sort, tìm phần tử không có:** tuyến tính 16 so sánh; nhị phân $\le 5$ so sánh ($\lceil\log_2 16\rceil+1$ kiểu). $n$ càng lớn, khe càng rộng.

### 1.4.7. Không gian phụ $S(n)$

Bộ nhớ **thêm**, ngoài mảng/danh sách đề đã cho.

| Code | Phụ |
|------|-----|
| Vài `int i,s` | $O(1)$ |
| `int b[n];` copy | $O(n)$ |
| Đệ quy nhị phân, sâu $\log n` | $O(\log n)$ Call Stack |
| Merge sort cấp mảng tạm | $O(n)$ |

```cpp
int Max(int a[], int n) {     // duyet, O(n) thoi gian, O(1) phu
    int m = a[0];
    for (int i = 1; i < n; i++)
        if (a[i] > m) m = a[i];
    return m;
}
```

`ThemDau` mảng: không cấp mảng mới, chỉ dồn tại chỗ → thời gian $O(n)$, không gian phụ $O(1)$.  
Copy sang mảng `b[n]` rồi xử lý: phụ $O(n)$.

Đệ quy Fibonacci thô *(phản ví dụ thời gian)*:

```cpp
int F(int n) {
    if (n <= 1) return n;
    return F(n - 1) + F(n - 2);
}
```

Hai nhánh → số lời gọi ~$2^n$. $F(40)$ đã chậm. Không gian phụ = độ sâu đệ quy $O(n)$ (không phải $O(2^n)$ RAM). **Thời gian mũ, RAM tuyến tính** — đừng lẫn.

### 1.4.8. Cách đọc code ra $O$ (làm theo thứ tự)

1. Tìm vòng lặp / đệ quy theo $n$.
2. Lồng hay nối tiếp?
3. Thân vòng chạy bao nhiêu lần (xấu)?
4. Bỏ hằng, lấy hạng lớn.
5. Ghi rõ thời gian và không gian phụ nếu đề hỏi cả hai.

*(Nâng cao)* Đệ quy chia đôi $T(n)=T(n/2)+O(1)$ → $O(\log n)$ (nhị phân). $T(n)=2T(n/2)+O(n)$ → $O(n\log n)$ (merge). Ch.2–3 gặp lại.

**Phiếu 30 giây trước khi viết $O$ lên bài thi:**

```
[ ] Có bao nhiêu vòng? Lồng hay kế nhau?
[ ] Biến vòng phụ thuộc n hay hằng?
[ ] Có return sớm? → ghi rõ xấu nhất
[ ] Đã bỏ hằng / hạng nhỏ chưa?
[ ] Đề hỏi không gian phụ không?
```

### Mini — đếm so sánh tìm tuyến tính

```bash
c++ -std=c++11 -o ch1_o ch1_o.cpp && ./ch1_o
```

```cpp
#include <iostream>
using namespace std;

int TimDem(int a[], int n, int x, int &soSanh) {
    soSanh = 0;
    for (int i = 0; i < n; i++) {
        soSanh++;
        if (a[i] == x) return i;
    }
    return -1;
}

int main() {
    int a[] = {10, 20, 30, 40, 50};
    int n = 5, c;
    TimDem(a, n, 10, c);
    cout << "Tot (dau): " << c << "\n";     // 1
    TimDem(a, n, 50, c);
    cout << "Xau (cuoi): " << c << "\n";    // 5
    TimDem(a, n, 99, c);
    cout << "Khong co: " << c << "\n";      // 5
    return 0;
}
```

### J. Bẫy 1.4

1. Hai `for` **kế nhau** → $O(n^2)$.
2. Tam giác $n(n-1)/2$ → nghĩ $O(n)$.
3. Tốt $O(1)$ nên ghi cả hàm $O(1)$.
4. Nhị phân trên mảng lộn.
5. Một lần `clock()`, $n=10$, kết luận thuật toán.
6. Cộng $O(n)+O(1)$ viết $O(n+1)$ cho “đủ hạng” — không cần, $O(n)$.
7. Fibonacci đệ quy hai nhánh: $O(2^n)$, không $O(n)$.
8. `while (i < n) { ...; i *= 2; }` ghi $O(n)$.
9. Ba vòng lồng ghi $O(n^2)$.

### ✅ Kiểm tra nhanh 1.4

1. `for i=0..n-1` rồi `for k=0..m-1`. $O$?
2. $n(n-1)/2$ viết $O$? $n=5$ bao nhiêu lần thân?
3. Tìm tuyến tính: sao không $O(1)$ dù đôi khi thấy ngay?
4. `Max` ở G: thời gian? không gian phụ?
5. Nhị phân cần điều kiện gì trên mảng?
6. `while (i<n) i*=2` (i bắt đầu 1): $O$? $n=32$ khoảng mấy lần?
7. $100n$ và $n^2$: $n=10$ cái nào lớn? $n=1000$ cái nào lớn? Kết luận $O$ theo cái nào?

**Đáp án:** (1) $O(n+m)$. (2) $O(n^2)$; $10$ lần. (3) $O$ là trần / xấu khi $n$ lớn. (4) $O(n)$, $O(1)$ phụ. (5) Đã sắp (tăng hoặc giảm một chiều). (6) $O(\log n)$; 5 lần. (7) $n=10$: $100n$ lớn; $n=1000$: $n^2$ lớn — $O$ nhìn $n$ lớn.

---

## 1.5. BÀI TẬP

> Mục **1.5 không nằm trong đề cương 1.1–1.4**. Để đây như cầu nối (giống 3.7 / 4.4): luyện, không thêm lý thuyết mới.

Làm theo thứ tự. Viết mã giả / bảng đếm trước khi gõ.

### A. Lý thuyết

**Bài 1.** CTDL, giải thuật, ADT — mỗi cái một câu + ví dụ đề án “quản lý sách”.

**Bài 2.** Vẽ luồng: yêu cầu người dùng → dữ liệu → thao tác nóng → chọn CTDL.

**Bài 3.** Năm tiêu chuẩn 1.2. Chọn CTDL: (a) 40 SV in hết, (b) Undo, (c) hàng quầy, (d) tra 100 000 từ.

**Bài 4.** Stack **bộ nhớ** khác ADT Stack (Ch.4) chỗ nào?

**Bài 5.** Vẽ ô nhớ `int x=10; int *p=&x; *p=4;`.

**Bài 6.** Vẽ `SinhVien a[2]`. `p=&a[1]; p->diem=8;` ô nào đổi?

### B. Đếm và $O$ (bắt buộc)

**Bài 7.** $n=5$, đếm `c++`, viết $O$:

```cpp
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        c++;
```

**Bài 8.** Cùng hỏi:

```cpp
for (int i = 0; i < n; i++)
    for (int j = 0; j < i; j++)
        c++;
```

**Bài 9.** Cùng hỏi:

```cpp
for (int i = 0; i < n; i++)
    for (int j = 0; j < 4; j++)
        c++;
```

**Bài 10.** Hai khối: sort $O(n\log n)$ + nhị phân $O(\log n)$. Cả đoạn $O$?

**Bài 11.** `Tim` ví dụ 7 mục 1.4.E. $n=6$, $x$ không có. Số so sánh? $O$?

**Bài 12.** Chạy tay nhị phân $[2,4,6,8,10,12,14,16]$, tìm $10$. Bảng $L,R,M$.

**Bài 13.** Vì sao $3n^2+80n+9=O(n^2)$?

**Bài 14.** `Max(a,n)`: $O$ thời gian và không gian phụ.

### C. Cài đặt

**Bài 15.** `SinhVien` + mảng `MAX`: `KhoiTao`, `ThemCuoi`, `TimTheoMa`, `Xuat`. Thêm 3 SV, tìm mã có / không.

**Bài 16.** `ThemDau` trên mảng (dồn). So $O$ với `ThemCuoi`. Test.

**Bài 17.** Đếm so sánh như 1.4.I.

**Bài 18.** `DemChan(a,n)`. $O$?

**Bài 19.** `XoaTai` trên `[A,B,C,D]`, $k=0$. Bảng mảng sau từng `i`. $O$?

**Bài 20.** Nhị phân $[10,20,30,40,50,60,70,80]$, tìm $35$ (không có). Bảng $L,R,M$.

**Bài 21.** Đếm `c++`, $n=8$:

```cpp
int i = 1, c = 0;
while (i < n) { c++; i *= 2; }
```

**Bài 22.** Viết `ThemDau` + `XoaTai` + `SuaDiem`, `main` đúng kịch bản 1.1.8.B. Đối chiếu tay với máy.

### D. Tự luận

1. Vai trò CTDL trong đề án. Ví dụ danh sách SV: sai (biến rời) / đúng (mảng `struct`).
2. Mảng vs DSLK: `a[i]`, thêm đầu, bộ nhớ — nếu chưa học Ch.3 thì nói *dự kiến từ bảng 1.2*.
3. Định nghĩa $O$. Đếm đoạn hai vòng (đề cho code). Phân biệt nối tiếp / lồng / tam giác.
4. Tốt / xấu / TB của tìm tuyến tính. Nhị phân cần gì?
5. Năm tiêu chuẩn. Chọn CTDL cho thư viện $n$ lớn, thao tác nóng là tra ISBN — viết 5–7 câu như vấn đáp.

### Đáp án gợi ý B–C (đếm / cài)

**7.** $25$, $O(n^2)$.  
**8.** $10$, $O(n^2)$ ($n(n-1)/2$).  
**9.** $20$, $O(n)$.  
**10.** $O(n\log n)$.  
**11.** $6$, $O(n)$.  
**12.** $M$ lần lượt: $8$ (index 3, $a=8<10$ → phải), rồi $12$ (index 5, $>10$ → trái), rồi $10$ (index 4).  
**14.** $O(n)$, $O(1)$ phụ.  
**18.** Một vòng, $O(n)$.  
**19.** Dồn hết sang trái, $O(n)$; còn B, C, D.  
**21.** $i=1,2,4$ rồi dừng: $c=3$, $O(\log n)$.

---

## 🎯 TÓM TẮT CHƯƠNG 1

### Kiến thức cốt lõi

1. Đề án = **cất gì** + **làm gì** → chọn CTDL → viết giải thuật.
2. **Chương trình = CTDL + giải thuật.** Đổi cách cất thì đổi đường xử lý.
3. Chọn theo thao tác **nóng**; đúng đắn trước tốc độ; nhớ đánh đổi RAM.
4. Kiểu cơ sở → mảng / `struct` (tuần tự, `a[i]` $O(1)$) → ADT. Con trỏ = địa chỉ; `*p` vs `p=`.
5. $T(n)$ đếm phép; $O$ bỏ hằng; lồng nhân, nối tiếp lấy max; tam giác vẫn $O(n^2)$.
6. Xấu nhất là mặc định thi. Nhị phân: mảng đã sort, $O(\log n)$. Không gian phụ ≠ thời gian.

### Câu thần chú

- Trước code: *thao tác nào nhiều nhất?*
- Hai `for` **cùng thụt** → nghi $O(n^2)$; **kế nhau** → $O(n)$.
- $n(n-1)/2$ vẫn $O(n^2)$.
- `strcmp` cho `char[]`, không `==`.
- `ThemCuoi` nhớ `n++`; thêm đầu mảng phải dồn.
- ADT = *làm gì*; mảng/DSLK = *cất thế nào*.
- `ThemCuoi` cần `int &n`. Dồn thêm đầu: từ **cuối** xuống.
- `'5'` không phải `5`. `strcmp` không phải `==`.
- $100n$ có thể chậm hơn $n^2$ khi $n$ nhỏ — $O$ nhìn $n$ lớn.

### Liên kết chương sau

- **Ch.2:** tuyến tính $O(n)$, nhị phân $O(\log n)$, sort $O(n^2)$ / $O(n\log n)$.
- **Ch.3:** tuần tự vs liên kết; mỗi `Them*`/`Xoa*` phải nói $O$ và biên rỗng.
- **Ch.4–5:** ADT Stack/Queue/Cây — cài mảng hoặc nút, đo $O(1)$ hay $O(h)$.

---

*Hết chương 1. Làm bài 7–12 và 15–16 trước khi sang tìm kiếm–sắp xếp.*
