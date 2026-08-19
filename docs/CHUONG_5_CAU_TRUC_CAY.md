# CHƯƠNG 5: CẤU TRÚC CÂY

> **Cây** = **Tree**. Khác mảng / DSLK / Stack / Queue: dữ liệu **phân nhánh**, không còn một đường thẳng.  
> Nút cây vẫn là `new` + hai con trỏ — cùng Heap như Chương 3. Duyệt tầng dùng **Queue** (Chương 4); duyệt sâu dùng đệ quy (Call Stack) hoặc Stack.

---

## 🎯 MỤC TIÊU CHƯƠNG 5

**Sau khi học xong chương này, sinh viên có thể:**

1. Phát biểu định nghĩa cây, kể đúng gốc / lá / cha / con / mức / chiều cao / bậc.
2. Định nghĩa cây nhị phân, nêu tính chất ($n_0 = n_2 + 1$, số nút tối đa theo mức), phân biệt đầy / hoàn chỉnh / suy biến.
3. Biểu diễn cây nhị phân bằng **liên kết** (`TNode`, `pLeft`, `pRight`) và bằng **mảng**.
4. Duyệt **NLR / LNR / LRN** (và Level-order); đếm nút, đếm lá, tính chiều cao.
5. Cài **BST**: `Insert`, `Search`, `Delete` (ba trường hợp), biết LNR ra dãy tăng.
6. Giải thích AVL, hệ số cân bằng, bốn phép xoay; chèn dãy tăng mà cây không suy biến.
7. Viết chương trình C++ chạy được, đúng mẫu đề thi thực hành Phần 3.

---

## 📋 NỘI DUNG CHƯƠNG 5

```
5.1. Khái niệm về cây
5.2. Cây nhị phân
     5.2.1. Định nghĩa và tính chất
     5.2.2. Biểu diễn cây nhị phân
     5.2.3. Các phép toán trên cây nhị phân
            – Duyệt cây (NLR, LNR, LRN, tầng, NLR không đệ quy)
            – Tính số nút, số lá, chiều cao, copy, đếm mức
            – Cây biểu thức (hậu tố → cây)
5.3. Cây nhị phân tìm kiếm (BST)
     5.3.1. Định nghĩa
     5.3.2. Các phép toán trên cây nhị phân tìm kiếm
            – Thêm một nút
            – Tìm một giá trị
            – Xóa một nút
            – Ứng dụng
5.4. Cây nhị phân cân bằng (AVL)
     – Định nghĩa, các phép quay
5.5. Các chương trình minh họa
```

> **Cài đặt:** C++ theo giáo trình thực hành và đề thi: `struct TNode { int data; TNode* pLeft; TNode* pRight; }`, `KhoiTao`, `TaoNode`, `Insert`, `Search`, `Delete`, `NLR` / `LNR` / `LRN`. AVL: `struct AVLNode` thêm `height`, `getBalance = height(phải) − height(trái)`.

---

## 📖 CÁCH ĐỌC (ZERO → HERO)

| Mốc | Đọc | Xong khi |
|-----|-----|----------|
| **Nền** | 5.1 + 5.2.1 | Vẽ một cây, chỉ gốc / lá / mức; nói được “nhị phân = tối đa 2 con” |
| **Đề thi** | 5.2.2–5.2.3 + 5.3 | Tự viết `TNode`, `Insert`, `Search`, `NLR`/`LNR`/`LRN`, `Height`, `CountNodes`; xóa 3 trường hợp; **ve ①②③** ra đúng 3 dãy |
| **Cân bằng** | 5.4 | Vẽ đủ LL / RR / LR / RL (kèm T2); chèn 1,2,3 ra cây cân; biết vì sao LR phải xoay kép |
| **Chạy được** | 5.5 | Biên dịch demo; LNR dãy đề thi ra tăng dần |

Mỗi thao tác: **ý tưởng → hình trước/sau → mã giả → code → độ phức tạp → bẫy**. AVL và xóa 2 con là chỗ hay mất điểm — đừng đọc lướt.

---

## 📚 BẢNG THUẬT NGỮ

| Thuật ngữ | Nghĩa | Ghi nhớ |
|-----------|--------|---------|
| **Gốc (`root`)** | Nút không có cha | Cửa vào duy nhất của cây |
| **Lá** | Nút không có con | `pLeft == pRight == NULL` |
| **Cha / con** | Nút trên / nút dưới một cạnh | Một nút tối đa **một** cha |
| **Anh em** | Cùng cha | |
| **Bậc (degree)** | Số con của nút | Cây nhị phân: bậc ≤ 2 |
| **Mức (level)** | Gốc mức **1**, con mức *i*+1 | Khớp đề thi: cây 4 tầng → chiều cao 4 |
| **Chiều cao cây** | Mức lớn nhất | Rỗng = 0, lá = 1 (quy ước chương này) |
| **Đường đi** | Dãy nút từ *u* xuống *v* | Dài = số cạnh |
| **NLR / LNR / LRN** | Node-Left-Right / Left-Node-Right / Left-Right-Node | Tiền / trung / hậu tự |
| **BST** | Binary Search Tree | Trái < gốc < phải, đệ quy |
| **Nút thế mạng** | Min của cây con phải | Dùng khi xóa nút 2 con |
| **AVL** | BST + \|BF\| ≤ 1 mọi nút | BF = cao phải − cao trái |
| **Suy biến** | Cây mọc một bên | BST thành DSLK, $O(n)$ |

---

## 5.1. KHÁI NIỆM VỀ CÂY

### A. Định nghĩa

**Cây** là cấu trúc **phi tuyến tính**: mỗi phần tử (nút) có thể nối với **nhiều** phần tử khác, nhưng **không có chu trình**.

Định nghĩa đệ quy (dùng khi viết code):

1. Cây rỗng (`root == NULL`) là một cây.
2. Cây không rỗng gồm một nút gốc và **0 hoặc nhiều cây con**, các cây con **rời nhau**.

**Ẩn dụ:** gia phả / sơ đồ công ty. Một tổng giám đốc (gốc). Mỗi người có cấp dưới (con), không ai có hai sếp trực tiếp (một cha). Nhân viên không quản lý ai = **lá**.

```
                    Gốc
                   (CEO)
                  /  |  \
              Kinh  KT  NS
              / \        |
           BanA BanB   Tuyển
```

So với những gì đã học:

| | Mảng / DSLK / Stack / Queue | Cây |
|---|------------------------------|-----|
| Hình | Một đường | Phân nhánh |
| Quan hệ | Trước–sau | Cha–con |
| Đi tới phần tử | Theo chỉ số / `pNext` | Từ gốc, chọn nhánh |
| Tìm (chưa sort) | $O(n)$ | $O(n)$ nếu không có thứ tự; **$O(\log n)$** nếu BST cân |

### B. Các thuật ngữ trên một hình

```
 mức 1                  1                 ← gốc; bậc 2; không có cha
                      /   \
 mức 2              2       3             ← con của 1; anh em nhau
                   / \       \
 mức 3            4   5       6           ← 4, 5, 6 là lá
```

| Nút | Cha | Con | Bậc | Lá? |
|-----|-----|-----|-----|-----|
| 1 | — | 2, 3 | 2 | không |
| 2 | 1 | 4, 5 | 2 | không |
| 3 | 1 | 6 | 1 | không |
| 4, 5, 6 | 2 hoặc 3 | — | 0 | **có** |

- **Nút trong:** có ít nhất một con (1, 2, 3).
- **Đường đi 1→5:** 1–2–5, dài 2 cạnh.
- **Chiều cao cây** (quy ước mức): 3. **Chiều cao nút 2:** 2 (cây con gốc 2 có hai mức).
- **Bậc của cây:** bậc lớn nhất của một nút = 2.

**Hai quy ước chiều cao — đừng lẫn đề thi:**

| | Rỗng | Lá | Cây hình trên | Dùng khi |
|---|------|-----|----------------|----------|
| **Số mức** (chương này, đề thi) | 0 | 1 | **3** | `Height(NULL)=0` |
| Số cạnh (một số sách, comment bài 9) | −1 | 0 | 2 | `Height(NULL)=-1` |

Cùng một cây, hai số khác **đúng 1**. Đề thi: chèn `50, 30, 70, …, 45` → **chiều cao 4, 11 nút** → họ đang đếm **mức**. Code trong chương theo quy ước đó.

### C. Ví dụ đối tượng dạng cây (không cần thuộc code)

| Đối tượng | Gốc | Con | Lá |
|-----------|------|-----|-----|
| Thư mục máy tính | ổ đĩa / folder gốc | thư mục con, file | file |
| HTML / DOM | `<html>` | thẻ lồng trong | thẻ không có thẻ con |
| Biểu thức | toán tử ngoài cùng | toán hạng | số |
| Cây quyết định, minimax | trạng thái đầu | nước đi | thế kết thúc |

Cây biểu thức `(3+4)*5`:

```
        *
       / \
      +   5
     / \
    3   4
```

Duyệt LRN ra `3 4 + 5 *` — đúng hậu tố Chương 4. Cây **nhớ cấu trúc**; Stack chỉ nhớ thứ tự.

### D. Cây tổng quát và mẹo “hai con trỏ”

Nút cây tổng quát có thể có 3, 4, … con. Không khai báo `pCon1, pCon2, pCon3…`. Mẹo **con đầu – anh em kế** (`first-child / next-sibling`): mỗi nút hai con trỏ, **chính là cây nhị phân**.

```
 Cây tổng quát:     1              Biểu diễn 2 con trỏ:
                  / | \                    1
                 2  3  4                  /
                                        2 — 3 — 4
```

Trái = con đầu; phải = anh em kế. Học xong 5.2 là đủ để lưu cây thư mục.

### ✅ Kiểm tra nhanh 5.1

1. Một nút có hai cha được không? Vì sao?
2. Gốc có phải lá được không?
3. Cây 1 nút: mức gốc? chiều cao (quy ước chương này)?

**Đáp án:** (1) Không — cây yêu cầu mỗi nút (trừ gốc) **đúng một** cha. Hai cha → thành đồ thị, không còn là cây. (2) Được — cây 1 nút: gốc đồng thời là lá. (3) Mức 1; chiều cao 1.

---

## 5.2. CÂY NHỊ PHÂN

### 5.2.1. Định nghĩa và tính chất

#### A. Định nghĩa

**Cây nhị phân** là cây trong đó mỗi nút có **tối đa hai** con, phân biệt **trái** và **phải** (con trái trống, con phải có — khác với “một con” không phía).

Đệ quy: rỗng là cây nhị phân; không rỗng thì gốc + cây con trái + cây con phải, cả hai đều là cây nhị phân.

```
   Hợp lệ              Hợp lệ             Không phải nhị phân
     1                    1                    1
    / \                    \                 / | \
   2   3                    3               2  3  4
```

#### B. Các dạng hay gặp

```
 Đầy (full): mỗi nút 0 hoặc 2 con     Hoàn chỉnh (complete): lấp trái → phải
        1                                      1
       / \                                   /   \
      2   3                                 2     3
     / \                                   / \   /
    4   5                                 4   5 6

 Perfect: mọi lá cùng mức, mọi nút trong có 2 con
        1
       / \
      2   3
     / \ / \
    4  5 6  7

 Suy biến (skewed) — thành DSLK:
    1              1
     \            /
      2          2
       \        /
        3      3
```

Heap (hàng đợi ưu tiên Chương 4) cài bằng **cây hoàn chỉnh + mảng**. BST không yêu cầu hoàn chỉnh.

> **Thuật ngữ — dễ lệch sách Việt / sách Anh.** Khóa này dùng đúng tên tiếng Anh trong ngoặc, đừng đổi chữ:
>
> | Tên trong chương | Tiếng Anh | Ý | Sách Việt đôi khi gọi |
> |------------------|-----------|---|------------------------|
> | **Đầy** | *full* | Mỗi nút **0 hoặc 2** con, không nút 1 con | “đầy đủ” — **lẫn** với perfect |
> | **Hoàn chỉnh** | *complete* | Lấp các mức trái → phải, mức cuối có thể thiếu bên phải | đúng “hoàn chỉnh” (dáng heap) |
> | **Perfect** | *perfect* | Mọi mức **đầy**, $n = 2^h-1$ | nhiều giáo trình gọi là “đầy đủ” |
>
> Cây perfect **luôn** complete và full. Cây full **không** nhất thiết perfect (hình “đầy” 5 nút ở trên). Đề thi hỏi “cây hoàn chỉnh” → dáng heap; hỏi “mọi lá cùng mức, đủ 2 con” → perfect.

#### C. Tính chất (nhớ để tính nhanh)

Gốc **mức 1**. Gọi $n$ = số nút, $h$ = chiều cao (số mức), $n_0$ = số lá, $n_2$ = số nút bậc 2, $n_1$ = số nút bậc 1.

| # | Tính chất | Ý |
|---|-----------|---|
| 1 | Mức $i$ có **tối đa** $2^{i-1}$ nút | Mức 1: 1; mức 2: 2; mức 3: 4 |
| 2 | Cây cao $h$ có tối đa $2^h - 1$ nút | Perfect |
| 3 | Cây $n$ nút có $h \ge \lceil \log_2(n+1)\rceil$ | Cân thì gần $\log n$ |
| 4 | $n = n_0 + n_1 + n_2$ | Đếm hết nút |
| 5 | **$n_0 = n_2 + 1$** | Đặc trưng cây nhị phân |

**Vì sao $n_0 = n_2 + 1$?** Mỗi nút (trừ gốc) là **một** con của ai đó. Tổng số con = $n - 1$. Tổng số con cũng = $1\cdot n_1 + 2\cdot n_2$. Vậy $n_0 + n_1 + n_2 - 1 = n_1 + 2 n_2$ ⇒ $n_0 = n_2 + 1$.

Ví dụ hình 5.1 (nút 1..6): $n_0=3$, $n_2=2$, $n_1=1$ → $3 = 2+1$.

**Bẫy:** “tối đa 2 con” không suy ra $n_0 = n_2+1$ nếu **không phân biệt trái/phải** theo đúng định nghĩa nút thiếu một phía — công thức vẫn đúng với cây nhị phân chuẩn.

---

### 5.2.2. Biểu diễn cây nhị phân

Hai cách, cùng ADT “nút có trái/phải”.

#### A. Liên kết — đúng đề thi

```cpp
struct TNode {
    int data;
    TNode* pLeft;
    TNode* pRight;
};

void KhoiTao(TNode* &root) { root = NULL; }

bool IsEmpty(TNode* root) { return root == NULL; }

TNode* TaoNode(int x) {
    TNode* p = new TNode;
    p->data = x;
    p->pLeft = p->pRight = NULL;   // la: hai con NULL
    return p;
}
```

`new` ném `bad_alloc` nếu hết RAM — **không** `if (p == NULL)` như C `malloc` (Chương 3).

```
 root
   │
   ▼
 ┌────┬────┬────┐
 │  1 │  ● │  ● │
 └────┴──┼─┴──┼─┘
         │    │
    ┌────┘    └────┐
    ▼              ▼
 ┌────┬──┬──┐   ┌────┬──┬──┐
 │  2 │/ │/ │   │  3 │/ │● │
 └────┴──┴──┘   └────┴──┴┼─┘
                         ▼
                      ┌────┬──┬──┐
                      │  6 │/ │/ │
                      └────┴──┴──┘
```

Mỗi nút $O(1)$ thêm trái/phải nếu đang cầm nút cha. Không có `a[i]` — muốn nút mức 3 phải đi từ gốc.

#### B. Mảng (tuần tự) — heap / cây hoàn chỉnh

Đánh số **mức, trái → phải**, chỉ số **từ 1**:

```
 chỉ số:     1
            / \
           2   3
          / \ / \
         4  5 6  7

 cha(i) = i/2          (i > 1)
 trái(i) = 2i
 phải(i) = 2i+1
```

Chỉ số **từ 0:** trái = `2i+1`, phải = `2i+2`, cha = `(i-1)/2`.

| | Liên kết | Mảng |
|---|----------|------|
| Cây thưa / không hoàn chỉnh | Tốt — không phí ô | Phí nhiều ô trống |
| Cây hoàn chỉnh (heap) | Thừa con trỏ | **Tốt** — không cần `pLeft` |
| Đề thi cây / BST | **`TNode`** | Hiếm |

**Không** dùng mảng cho BST nhập môn: chèn giữa làm lệch chỉ số.

---

### 5.2.3. Các phép toán trên cây nhị phân

Cây thao tác dưới đây **chưa** cần tính chất BST. Mọi hàm đều **đệ quy theo đúng hình cây**: xử lý gốc + gọi lại trái + gọi lại phải. Điều kiện dừng: `root == NULL`.

Cây chạy tay dùng xuyên suốt mục này:

```
        1
       / \
      2   3
     / \   \
    4   5   6
```

---

#### A. Duyệt cây — từ zero: “thăm” là gì?

**Duyệt** = đi qua **mọi** nút, mỗi nút **đúng một lần**, làm một việc (in, cộng, `delete`…).

Cây nhị phân **đệ quy**: một nút = gốc **N** + cây con trái **L** + cây con phải **R**. Muốn xong cả cây thì phải xong cả ba mảnh. Ba cách duyệt chỉ khác **lúc nào thăm N**.

```
 NLR (tiền tự / Pre-order):    N → L → R     thăm gốc TRƯỚC khi xuống con
 LNR (trung tự / In-order):    L → N → R     thăm gốc GIỮA hai cây con
 LRN (hậu tự / Post-order):    L → R → N     thăm gốc SAU khi xong hết con
```

**Zero — hai cây nhỏ nhất:**

```
 Rỗng:     root = NULL          → không thăm gì. Mọi hàm bắt đầu bằng
                                 if (root == NULL) return;

 Một nút:      7                NLR = LNR = LRN =  7
              / \
            NULL NULL           (hai cây con rỗng: không làm gì thêm)
```

**Hình gốc** dùng cho cả ba cách (và Level-order):

```
            1
           / \
          2   3
         / \   \
        4   5   6
```

---

##### ① Mẹo “đi quanh nút” — một hình, ba lần gặp

Tưởng tượng đi **ôm cây về phía trái** (Euler tour). Mỗi nút ta đi qua **ba lần**:

```
                    ① đến từ cha          ← NLR thăm ở đây
                   /
              ┌─── N ───┐
             /     ②     \                ← LNR thăm ở đây (xong trái, chưa phải)
            L             R
                   ③ rời nút về cha      ← LRN thăm ở đây
```

```
              ①
             /
            1
         ①/ ② ③\
         2       3
      ①/②③ ①/②③  ①/②③
      4      5        6
```

| Lần gặp nút | Việc | Tên duyệt |
|-------------|------|-----------|
| ① vừa tới từ cha | in ngay | **NLR** |
| ② vừa xong nhánh trái | in rồi mới sang phải | **LNR** |
| ③ xong cả hai nhánh, sắp lên cha | in rồi về | **LRN** |

Thuộc mẹo này thì **không cần nhớ code** khi thi vấn đáp: “ve” trên giấy, gặp ①/②/③ thì ghi số.

---

##### ② NLR — thăm lúc ① (gốc trước)

**Ý tưởng:** “xử lý tôi, rồi con trái, rồi con phải” — giống đọc mục lục từ trên xuống.

```
THUẬT TOÁN NLR(p)
1. nếu p = NULL thì return          ← zero: cây rỗng
2. thăm p.data                      ← ①
3. NLR(p.pLeft)
4. NLR(p.pRight)
```

```cpp
void NLR(TNode* root) {
    if (root == NULL) return;
    cout << root->data << " ";      // ①
    NLR(root->pLeft);
    NLR(root->pRight);
}
```

**Mở đệ quy** (Call Stack — Chương 4) trên cây 1..6:

```
NLR(1)
 ├─ in 1
 ├─ NLR(2)
 │   ├─ in 2
 │   ├─ NLR(4) → in 4, (NULL, NULL)
 │   └─ NLR(5) → in 5, (NULL, NULL)
 └─ NLR(3)
     ├─ in 3
     ├─ NLR(NULL)
     └─ NLR(6) → in 6, (NULL, NULL)
```

**Chạy tay từng bước:**

| Bước | Đang ở | Việc | Dãy in |
|------|--------|------|--------|
| 1 | 1 | ① in | `1` |
| 2 | 2 | ① in | `1 2` |
| 3 | 4 | ① in, lá xong | `1 2 4` |
| 4 | 5 | ① in, lá xong | `1 2 4 5` |
| 5 | 3 | ① in | `1 2 4 5 3` |
| 6 | 6 | ① in | `1 2 4 5 3 6` |

**Kết quả NLR: `1 2 4 5 3 6`**

Dùng khi: **sao chép cây** (tạo gốc trước, rồi gắn hai con); ghi prefix; serialize.

---

##### ③ LNR — thăm lúc ② (gốc giữa)

**Ý tưởng:** “hết trái đã, rồi tôi, rồi phải”. Trên BST, trái < tôi < phải → in ra **tăng dần**.

```
THUẬT TOÁN LNR(p)
1. nếu p = NULL thì return
2. LNR(p.pLeft)
3. thăm p.data                      ← ②
4. LNR(p.pRight)
```

```cpp
void LNR(TNode* root) {
    if (root == NULL) return;
    LNR(root->pLeft);
    cout << root->data << " ";      // ②
    LNR(root->pRight);
}
```

**Mở đệ quy:**

```
LNR(1)
 ├─ LNR(2)
 │   ├─ LNR(4) → in 4
 │   ├─ in 2
 │   └─ LNR(5) → in 5
 ├─ in 1
 └─ LNR(3)
     ├─ LNR(NULL)
     ├─ in 3
     └─ LNR(6) → in 6
```

| Bước | Xong trái của | ② in | Dãy in |
|------|----------------|------|--------|
| 1 | 4 (lá) | 4 | `4` |
| 2 | 2 | 2 | `4 2` |
| 3 | 5 | 5 | `4 2 5` |
| 4 | 1 | 1 | `4 2 5 1` |
| 5 | 3 | 3 | `4 2 5 1 3` |
| 6 | 6 | 6 | `4 2 5 1 3 6` |

**Kết quả LNR: `4 2 5 1 3 6`**

Cây này **không** phải BST nên LNR **không** tăng. Cùng hình nếu là BST 8–3–10… thì LNR tăng — xem 5.3.

Dùng khi: in BST; infix; kiểm tra “có tăng không”.

---

##### ④ LRN — thăm lúc ③ (gốc sau)

**Ý tưởng:** “xong hết con rồi mới đụng tôi”. Hủy cây: `delete` con trước, cha sau. Tính biểu thức: hai toán hạng xong mới tính toán tử (hậu tố Chương 4).

```
THUẬT TOÁN LRN(p)
1. nếu p = NULL thì return
2. LRN(p.pLeft)
3. LRN(p.pRight)
4. thăm p.data                      ← ③
```

```cpp
void LRN(TNode* root) {
    if (root == NULL) return;
    LRN(root->pLeft);
    LRN(root->pRight);
    cout << root->data << " ";      // ③
}
```

**Mở đệ quy:**

```
LRN(1)
 ├─ LRN(2)
 │   ├─ LRN(4) → in 4
 │   ├─ LRN(5) → in 5
 │   └─ in 2
 ├─ LRN(3)
 │   ├─ LRN(NULL)
 │   ├─ LRN(6) → in 6
 │   └─ in 3
 └─ in 1
```

| Bước | Xong cả hai con của | ③ in | Dãy in |
|------|---------------------|------|--------|
| 1 | 4 | 4 | `4` |
| 2 | 5 | 5 | `4 5` |
| 3 | 2 | 2 | `4 5 2` |
| 4 | 6 | 6 | `4 5 2 6` |
| 5 | 3 | 3 | `4 5 2 6 3` |
| 6 | 1 | 1 | `4 5 2 6 3 1` |

**Kết quả LRN: `4 5 2 6 3 1`**

Dùng khi: **`HuyCay`**; hậu tố; giải phóng từ lá lên.

---

##### ⑤ Ba cách trên cùng một hình — thuộc lòng

```
            1
           / \
          2   3
         / \   \
        4   5   6

 NLR  ①①①…     1   2 4 5   3 6
 LNR  ②②②…       4 2 5   1   3 6
 LRN  ③③③…       4 5 2     6 3   1
```

| | Thứ tự | Kết quả | Ứng dụng |
|---|--------|---------|----------|
| **NLR** | N L R | `1 2 4 5 3 6` | Copy cây, prefix |
| **LNR** | L N R | `4 2 5 1 3 6` | BST → tăng, infix |
| **LRN** | L R N | `4 5 2 6 3 1` | Hủy cây, hậu tố |

Cả ba: thời gian $O(n)$ (mỗi nút đúng một lần thăm + hai lần gọi con), không gian $O(h)$ do Call Stack.

**Bẫy:**

1. Quên `if (root == NULL) return` → crash.
2. Đổi hai lời gọi đệ quy → ra thứ tự **khác**, không còn đúng tên.
3. Nhầm LNR với NLR khi đọc code — nhìn **chỗ** `cout` (trước / giữa / sau).
4. Cây không BST mà bảo LNR tăng — sai.

---

#### B. Duyệt theo tầng (Level-order) — Queue Chương 4

Ba cách trên là **DFS** (đi sâu một nhánh). Tầng là **BFS**: xong mức 1 mới mức 2 — FIFO, đúng hàng đợi.

```
 Mức 1:          1
 Mức 2:        2   3
 Mức 3:      4  5     6
 → in:  1 | 2 3 | 4 5 6
```

**Ý tưởng:** lấy nút ở `front` ra in, Enqueue con trái rồi con phải (nếu có). Hàng đợi luôn giữ các nút “đã thấy cha, chưa in con”.

**Chạy tay — từng trạng thái Queue:**

| Bước | Lấy ra (in) | Queue sau khi Enqueue con (front → rear) |
|------|-------------|------------------------------------------|
| Init | | `[1]` |
| 1 | **1** | `[2 3]` |
| 2 | **2** | `[3 4 5]` |
| 3 | **3** | `[4 5 6]` |
| 4 | **4** | `[5 6]` |
| 5 | **5** | `[6]` |
| 6 | **6** | `[]` dừng |

**Kết quả Level-order: `1 2 3 4 5 6`**

```cpp
void LevelOrder(TNode* root) {     // hang doi mang, n < 100 — dung FIFO Chuong 4
    if (root == NULL) return;
    TNode* q[100];
    int f = 0, r = -1;
    q[++r] = root;
    while (f <= r) {
        TNode* p = q[f++];
        cout << p->data << " ";
        if (p->pLeft  != NULL) q[++r] = p->pLeft;
        if (p->pRight != NULL) q[++r] = p->pRight;
    }
}
```

**Bẫy:** Enqueue **phải trước trái** → in ngược trong từng mức. Dùng Stack thay Queue → thành DFS, không còn theo tầng.

Bốn cách trên cùng cây 1..6:

```
 NLR         1 2 4 5 3 6     sâu, gốc trước
 LNR         4 2 5 1 3 6     sâu, gốc giữa
 LRN         4 5 2 6 3 1     sâu, gốc sau
 Level       1 2 3 4 5 6     rộng, trên → dưới
```

**NLR không đệ quy — Stack Chương 4.** LIFO: Push gốc; lặp Pop → in → Push **phải rồi trái** (trái nằm đỉnh → ra trước).

```
 Cây 1..6
 Push 1
 Pop 1 in; Push 3, Push 2          stack (đỉnh→): 2 3
 Pop 2 in; Push 5, Push 4          stack: 4 5 3
 Pop 4 in                          stack: 5 3
 Pop 5 in                          stack: 3
 Pop 3 in; Push 6                  stack: 6
 Pop 6 in
 → 1 2 4 5 3 6   (đúng NLR)
```

```cpp
void NLR_KhuDeQuy(TNode* root) {    // mang dong vai Stack TNode*
    if (root == NULL) return;
    TNode* st[100];
    int top = -1;
    st[++top] = root;
    while (top >= 0) {
        TNode* p = st[top--];
        cout << p->data << " ";
        if (p->pRight != NULL) st[++top] = p->pRight;  // phai TRUOC
        if (p->pLeft  != NULL) st[++top] = p->pLeft;   // trai sau → ra truoc
    }
}
```

LNR không đệ quy cần thêm “đánh dấu đã xong trái” (hoặc con trỏ phụ) — đề thi ít bắt; thuộc bản đệ quy là đủ. Level-order **không** thay Stack vào chỗ Queue.

---

#### C. Số nút, số lá, chiều cao

Cùng khuôn đệ quy.

**Số nút:** rỗng → 0; không rỗng → $1 +$ trái $+$ phải.

```
THUẬT TOÁN CountNodes(p) → n
1. nếu p = NULL thì trả về 0
2. trả về 1 + CountNodes(p.pLeft) + CountNodes(p.pRight)
```

**Số lá:** rỗng → 0; là lá → 1; không thì cộng hai nhánh.

**Chiều cao (số mức):** rỗng → 0; không rỗng → $1 + \max($cao trái, cao phải$)$.

```cpp
int CountNodes(TNode* root) {
    if (root == NULL) return 0;
    return 1 + CountNodes(root->pLeft) + CountNodes(root->pRight);
}

int CountLeaves(TNode* root) {
    if (root == NULL) return 0;
    if (root->pLeft == NULL && root->pRight == NULL) return 1;
    return CountLeaves(root->pLeft) + CountLeaves(root->pRight);
}

int Height(TNode* root) {          // rong = 0, la = 1  ← de thi cao = 4
    if (root == NULL) return 0;
    int hl = Height(root->pLeft);
    int hr = Height(root->pRight);
    return 1 + (hl > hr ? hl : hr);
}
```

Cây 1..6: nút = 6, lá = 3, chiều cao = 3.

**Bẫy chiều cao:** `return -1` khi rỗng thì lá = 0, cây đề thi ra **3** chứ không phải 4. Chấm thực hành theo đề: **rỗng = 0**.

**Sao chép cây** — dùng NLR: tạo nút gốc trước, rồi gắn hai cây con (đã copy).

```cpp
TNode* CopyTree(TNode* root) {
    if (root == NULL) return NULL;
    TNode* p = TaoNode(root->data);     // N
    p->pLeft  = CopyTree(root->pLeft);  // L
    p->pRight = CopyTree(root->pRight); // R
    return p;
}
```

**Đếm nút mức $k$** (gốc mức 1 — khớp quy ước chương):

```
THUẬT TOÁN DemMuc(p, k) → số nút
1. nếu p = NULL hoặc k < 1 thì trả về 0
2. nếu k = 1 thì trả về 1
3. trả về DemMuc(p.pLeft, k-1) + DemMuc(p.pRight, k-1)
```

```cpp
int DemMuc(TNode* root, int k) {
    if (root == NULL || k < 1) return 0;
    if (k == 1) return 1;
    return DemMuc(root->pLeft, k - 1) + DemMuc(root->pRight, k - 1);
}
```

Cây 1..6: mức 1 → 1 nút; mức 2 → 2; mức 3 → 3. $O(n)$.

---

#### D. Hủy cây — phải LRN

Xóa cha trước → mất địa chỉ con → rò rỉ. Đúng: hủy trái, hủy phải, `delete` gốc.

```cpp
void HuyCay(TNode* &root) {
    if (root == NULL) return;
    HuyCay(root->pLeft);
    HuyCay(root->pRight);
    delete root;
    root = NULL;
}
```

$O(n)$. Gọi trước khi chương trình kết thúc (giống `HuyDanhSach` Chương 3).

---

#### E. Bảng tổng hợp 5.2.3

| Thao tác | $O$ thời gian | $O$ phụ | Ghi chú |
|----------|----------------|---------|---------|
| NLR / LNR / LRN | $O(n)$ | $O(h)$ | $h$ = cao |
| Level-order | $O(n)$ | $O(n)$ rộng nhất | Queue |
| CountNodes / Leaves / Height | $O(n)$ | $O(h)$ | |
| HuyCay | $O(n)$ | $O(h)$ | LRN |
| CopyTree | $O(n)$ | $O(h)$ | NLR tạo nút |
| DemMuc | $O(n)$ | $O(h)$ | gốc mức 1 |
| NLR không đệ quy | $O(n)$ | $O(n)$ | Stack, Push phải rồi trái |

Cây nhị phân **không thứ tự**: tìm một giá trị phải duyệt hết — $O(n)$. Muốn $O(h)$ → BST.

---

#### F. Cây biểu thức — cầu nối Chương 4

Mỗi toán tử là nút trong, mỗi số là lá. LNR = trung tố (cần ngoặc), LRN = hậu tố, NLR = tiền tố.

```
 Trung tố:  (3+4)*5
 Hậu tố:    3 4 + 5 *
 Tiền tố:   * + 3 4 5

            *
           / \
          +   5
         / \
        3   4
```

**Dựng cây từ hậu tố** — một Stack **cây** (ý như `TinhHauTo`, nhưng Push nút thay vì số):

```
 Gặp số      → tạo lá, Push
 Gặp toán tử → Pop phải, Pop trái, tạo nút op, gắn hai con, Push nút đó
```

```
 Token   Stack (đỉnh →)
 3       [3]
 4       [4  3]
 +       Pop 4, Pop 3 → nút + ; Push (+)     stack: [+]
 5       [5  +]
 *       Pop 5, Pop (+) → nút * ; Push (*)    stack: [*]  ← gốc
```

```cpp
// Gia su toan hang 1 chu so; TNode->data luu ma ASCII cua so hoac toan tu
TNode* CayTuHauTo(string postfix) {
    TNode* st[100];
    int top = -1;
    for (int i = 0; i < (int)postfix.size(); i++) {
        char c = postfix[i];
        if (c == ' ') continue;
        TNode* p = TaoNode((int)c);
        if (c == '+' || c == '-' || c == '*' || c == '/') {
            p->pRight = st[top--];   // Pop phai truoc
            p->pLeft  = st[top--];   // roi trai
        }
        st[++top] = p;
    }
    return (top >= 0) ? st[top] : NULL;
}

int TinhCay(TNode* p) {            // LRN: hai con xong moi tinh goc
    if (p == NULL) return 0;
    if (p->pLeft == NULL && p->pRight == NULL)
        return p->data - '0';      // la so
    int a = TinhCay(p->pLeft);
    int b = TinhCay(p->pRight);
    char op = (char)p->data;
    if (op == '+') return a + b;
    if (op == '-') return a - b;
    if (op == '*') return a * b;
    return a / b;
}
```

`TinhCay(CayTuHauTo("3 4 + 5 *"))` = 35. Cùng kết quả `TinhHauTo` Chương 4, nhưng cây **giữ cấu trúc** để in lại trung tố / tối ưu biểu thức.

---

### ✅ Kiểm tra nhanh 5.2

1. NLR, LNR, LRN, Level-order của cây 1(2,3) — 2 và 3 là lá?
2. Trên mẹo ①②③, LNR thăm lúc nào?
3. $n_0=5$. $n_2$?
4. Perfect 3 mức: bao nhiêu nút? Bao nhiêu lá?
5. Vì sao hủy cây không dùng NLR? Level-order dùng cấu trúc nào Chương 4?
6. Cây 1..6, `DemMuc(..., 3)`? NLR không đệ quy Push con theo thứ tự nào?

**Đáp án:** (1) NLR `1 2 3`; LNR `2 1 3`; LRN `2 3 1`; tầng `1 2 3`. (2) Lúc ② — xong trái, chưa sang phải. (3) 4. (4) 7 nút, 4 lá. (5) NLR `delete` gốc trước → mất con; tầng dùng **Queue**. (6) 3 nút (4, 5, 6); Push **phải rồi trái**.

---

## 5.3. CÂY NHỊ PHÂN TÌM KIẾM (BST)

### 5.3.1. Định nghĩa

**BST** (*Binary Search Tree*) là cây nhị phân thỏa **mọi** nút:

- Mọi giá trị cây con **trái** $<$ nút hiện tại
- Mọi giá trị cây con **phải** $>$ nút hiện tại
- Hai cây con cũng là BST

Khóa học **không chèn trùng** (`==` thì bỏ qua).

```
        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13
```

Trái của 8: `{1,3,4,6,7}` đều $< 8$. Phải: `{10,13,14}` đều $> 8$. Lặp lại tại 3, 10, …

**Không phải BST** dù “nhìn có nhánh”:

```
      5
     / \
    3   8
   / \
  1   6          ← 6 > 5 nhưng nằm bên trái 5  → SAI
```

Chỉ so sánh với cha **chưa đủ** — phải đúng với **mọi tổ tiên**.

**Vì sao sinh ra BST?** Mảng sort: tìm $O(\log n)$, chèn $O(n)$. DSLK: chèn $O(1)$ tại chỗ, tìm $O(n)$. BST: tìm + chèn + xóa đều $O(h)$; $h \approx \log n$ nếu không suy biến.

**Định lý nhỏ:** LNR trên BST = dãy **tăng dần**. Đó là cách kiểm tra nhanh và cách “sort bằng cây”.

---

### 5.3.2. Các phép toán trên cây nhị phân tìm kiếm

Mọi thao tác **đi một nhánh** mỗi bước (nhỏ → trái, lớn → phải). $O(h)$, không $O(n)$ trừ khi suy biến.

---

#### A. Thêm một nút (`Insert`)

**Ý tưởng:** từ gốc, so sánh như tìm chỗ trống. Đến `NULL` thì gắn `TaoNode`. Trùng thì không thêm.

**Chèn 5 vào cây 8 ở trên:**

```
 5 < 8 → trái (3)
 5 > 3 → phải (6)
 5 < 6 → trái (4)
 5 > 4 → phải = NULL  → gắn 5

        8
       / \
      3   10
     / \    \
    1   6    14
       / \   /
      4   7 13
       \
        5
```

```
THUẬT TOÁN Insert(p, x) → p
1. nếu p = NULL thì trả về TaoNode(x)
2. nếu x < p.data thì p.pLeft  ← Insert(p.pLeft, x)
3. nếu x > p.data thì p.pRight ← Insert(p.pRight, x)
4. (x = p.data: không làm gì)
5. trả về p
```

```cpp
TNode* Insert(TNode* root, int x) {
    if (root == NULL) return TaoNode(x);
    if (x < root->data)
        root->pLeft = Insert(root->pLeft, x);
    else if (x > root->data)
        root->pRight = Insert(root->pRight, x);
    return root;
}
```

Gọi: `root = Insert(root, x);` — **bắt buộc** gán lại, vì cây rỗng thì gốc mới chính là nút vừa tạo.

**Chèn dãy đề thi** `50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45`:

```
              50
           /      \
         30        70
        /  \      /  \
      20   40    60   80
     / \   / \
   10  25 35  45
```

11 nút, 4 mức → `CountNodes = 11`, `Height = 4`.

**Suy biến:** chèn `1,2,3,4,5` → chỉ toàn `pRight` → DSLK, $h = n$. BST **không tự cân**. Đó là lý do có AVL (5.4).

| | Tốt (cân) | Xấu (suy biến) |
|---|-----------|----------------|
| Thời gian | $O(\log n)$ | $O(n)$ |
| Không gian đệ quy | $O(\log n)$ | $O(n)$ |

**Bẫy:** quên `root = Insert(...)`. So sánh `<=` rồi vẫn đi trái khi bằng → tạo trùng, phá giả thiết. Gắn nhầm trái/phải.

---

#### B. Tìm một giá trị (`Search`)

Cùng đường với Insert; gặp bằng thì trả nút, gặp NULL thì không có.

```
 Tìm 6:  6<8 → 3;  6>3 → 6  → thấy.
 Tìm 5:  5<8 → 3;  5>3 → 6;  5<6 → 4;  5>4 → NULL  → không có.
```

```cpp
TNode* Search(TNode* root, int x) {          // de quy
    if (root == NULL || root->data == x) return root;
    if (x < root->data) return Search(root->pLeft, x);
    return Search(root->pRight, x);
}

TNode* SearchIter(TNode* root, int x) {      // vong lap, O(1) phu
    while (root != NULL && root->data != x) {
        if (x < root->data) root = root->pLeft;
        else root = root->pRight;
    }
    return root;
}
```

$O(h)$. Bản vòng không tốn Call Stack — nên dùng khi $h$ có thể lớn.

**Max / Min trên BST** — không cần duyệt hết: min = trái nhất, max = phải nhất (cùng `MinValueNode` lúc xóa).

```cpp
TNode* MaxValueNode(TNode* p) {
    while (p != NULL && p->pRight != NULL)
        p = p->pRight;
    return p;
}
```

Cây đề thi 11 nút: min = 10, max = 80. Cây **không** BST thì min/max phải duyệt $O(n)$ — đừng dùng hàm này.

**Bẫy:** tìm trên cây **không** BST mà viết `Search` kiểu này → sai (bỏ nhánh có thể chứa khóa).

---

#### C. Xóa một nút (`Delete`) — ba trường hợp

Tìm nút như Search. Tới nơi, chia:

| Trường hợp | Việc làm |
|------------|----------|
| **0 con** (lá) | `delete`, cha trỏ `NULL` |
| **1 con** | Cha trỏ thẳng sang đứa cháu (con duy nhất) |
| **2 con** | Không xóa “hình” nút: copy **nút thế mạng** vào, rồi xóa thế mạng (0 hoặc 1 con) |

**Nút thế mạng** (khóa này): **min cây con phải** = trái nhất của nhánh phải = successor trung tự. (Max cây con trái cũng được — một đề một kiểu; **đề thi: min phải**.)

```cpp
TNode* MinValueNode(TNode* p) {
    while (p != NULL && p->pLeft != NULL)
        p = p->pLeft;
    return p;
}

TNode* Delete(TNode* root, int x) {
    if (root == NULL) return NULL;
    if (x < root->data)
        root->pLeft = Delete(root->pLeft, x);
    else if (x > root->data)
        root->pRight = Delete(root->pRight, x);
    else {
        if (root->pLeft == NULL) {
            TNode* t = root->pRight;
            delete root;
            return t;
        }
        if (root->pRight == NULL) {
            TNode* t = root->pLeft;
            delete root;
            return t;
        }
        TNode* t = MinValueNode(root->pRight);
        root->data = t->data;
        root->pRight = Delete(root->pRight, t->data);
    }
    return root;
}
```

Hai nhánh 0/1 con gộp: không trái ⇒ thay bằng phải (phải có thể NULL = lá). Không phải ⇒ thay bằng trái.

**Chạy tay trên cây đề thi** — ba case **tách** nhau (mỗi case xuất phát từ cây 11 nút đầy đủ, trừ khi ghi rõ “sau khi đã xóa …”).

*Xóa lá 10 (0 con):* `20->pLeft` thành `NULL`.

```
     20               20
    /  \      →         \
  10   25                25
```

*Xóa 20 (1 con) — **sau khi đã xóa 10**, 20 chỉ còn con phải 25:* `30->pLeft` nhảy từ 20 sang 25.

```
    30                  30
   /                   /
 20           →      25
   \
   25
```

*Xóa 30 (hai con) trên cây **đầy đủ 11 nút** (chưa xóa 10, 20).* Cây con phải của 30 gốc 40; min = **35**. Copy 35 vào chỗ 30, xóa 35 (lá, trái của 40):

```
 TRƯỚC                         SAU
         50                            50
      /      \                      /      \
    30        70                  35        70
   /  \      /  \                /  \      /  \
 20   40    60   80            20   40    60   80
/ \   / \                     / \     \
10 25 35 45                  10 25    45
```

LNR sau xóa 30 (khi chưa xóa 10, 20): `10 20 25 35 40 45 50 60 70 80` — vẫn tăng.

*Xóa gốc 50:* thế mạng = min phải = 60. Copy 60, xóa 60 cũ.

**Bẫy:**

1. `delete` nút 2 con rồi mới đi tìm con → mất cả hai nhánh.
2. Thế mạng lấy **max trái** trong khi thầy bắt min phải — vẫn BST nhưng khác cây.
3. Quên `root->pRight = Delete(..., t->data)` sau khi copy — còn hai nút cùng giá trị.
4. Không `delete` → leak. `delete` rồi còn dùng `pLeft` → dangling.

$O(h)$.

---

#### D. Ứng dụng cây nhị phân tìm kiếm

| Ứng dụng | Cách dùng BST |
|----------|----------------|
| **Từ điển / map** | Khóa = từ; tìm / thêm / xóa $O(h)$ |
| **Sort (tree sort)** | Insert hết, LNR ra dãy tăng — $O(n h)$; xấu $O(n^2)$ |
| **Kiểm tra BST** | LNR phải tăng **chặt** (không giảm) |
| Tập hợp số nguyên | Như đề thi: chèn dãy, thống kê, xóa |
| Database index (ý tưởng) | Cây tìm kiếm — thực tế dùng B-tree / B+ |
| Tự cân để $h=\Theta(\log n)$ | AVL (5.4), Red-Black |

**Tree sort** — Insert `40,10,30,20` rồi LNR:

```
    40                 LNR: 10 20 30 40
   /
  10
    \
    30
   /
  20
```

Cùng dữ liệu Chương 3 `SapXep`, khác cấu trúc.

**BST ≠ Heap.** Đừng nhầm “cây có thứ tự” với “con nhỏ hơn cha”:

| | BST | Heap (max-heap, Ch.2 HeapSort) |
|--|-----|--------------------------------|
| Thứ tự | Trái < gốc < phải (mọi tổ tiên) | Cha ≥ hai con; **không** so trái–phải |
| Dáng | Tùy dữ liệu, có thể suy biến | **Hoàn chỉnh** (complete) |
| Tìm một khóa | $O(h)$ | $O(n)$ — phải duyệt |
| Lấy min/max | Trái nhất / phải nhất $O(h)$ | Max = gốc $O(1)$; xóa max $O(\log n)$ |
| Cài | `TNode` liên kết | Mảng, `cha = i/2` |

Heap **không** phải BST: `[90, 40, 70]` là max-heap hợp lệ (90 trên, 40 trái, 70 phải) nhưng 40 < 90 mà 70 cũng < 90 — 40 nằm trái, 70 phải, **không** thỏa trái < gốc < phải.

**IsBST** (nâng cao — đừng chỉ so với cha):

```cpp
#include <climits>

bool IsBST(TNode* root, int mn = INT_MIN, int mx = INT_MAX) {
    if (root == NULL) return true;
    if (root->data <= mn || root->data >= mx) return false;
    return IsBST(root->pLeft, mn, root->data)
        && IsBST(root->pRight, root->data, mx);
}
```

### ✅ Kiểm tra nhanh 5.3

1. LNR cây đề thi (11 nút) ra dãy nào?
2. Insert trùng 50. Cây đổi không?
3. Xóa nút 2 con, thế mạng là nút nào trên cây 8–3–10… khi xóa 8?
4. Chèn 1..n tăng. $h$? `Search(n)` bao nhiêu so sánh (xấp xỉ)?

**Đáp án:** (1) `10 20 25 30 35 40 45 50 60 70 80`. (2) Không. (3) 10 (min nhánh phải). (4) $h=n$; khoảng $n$ so sánh.

---

## 5.4. CÂY NHỊ PHÂN CÂN BẰNG (AVL)

### A. Vấn đề BST để lại

Chèn dãy đã sort → cây suy biến → mọi thao tác $O(n)$, mất lợi thế $\log n$.

**AVL** (Adelson-Velsky & Landis, 1962): BST **thêm** ràng buộc chiều cao, tự **xoay** sau mỗi lần chèn/xóa để không bao giờ lệch quá 1 mức.

### B. Định nghĩa

Cây AVL là BST trong đó **mọi** nút có **hệ số cân bằng**

$$
\mathrm{BF}(p) = \mathrm{Height}(p.\mathrm{right}) - \mathrm{Height}(p.\mathrm{left}) \in \{-1, 0, 1\}.
$$

Đúng công thức đề thi / thực hành: **phải trừ trái**.  
BF $= +2$ → lệch **phải**. BF $= -2$ → lệch **trái**.

Chiều cao lưu trong nút để không tính lại $O(n)$ mỗi lần:

```cpp
struct AVLNode {
    int data;
    AVLNode* left;
    AVLNode* right;
    int height;                 // la = 1; NULL quy uoc 0
};

int getHeight(AVLNode* p) {
    return (p == NULL) ? 0 : p->height;
}

int getBalance(AVLNode* p) {
    if (p == NULL) return 0;
    return getHeight(p->right) - getHeight(p->left);
}

AVLNode* createNode(int x) {
    AVLNode* p = new AVLNode;
    p->data = x;
    p->left = p->right = NULL;
    p->height = 1;
    return p;
}

void capNhatCao(AVLNode* p) {
    if (p == NULL) return;
    int hl = getHeight(p->left);
    int hr = getHeight(p->right);
    p->height = 1 + (hl > hr ? hl : hr);
}
```

Khớp `Height` mục 5.2.3: NULL = 0, lá = 1. (Bài 10 có chỗ ghi NULL = −1 — **đừng trộn** hai quy ước trong cùng một hàm.)

```
 AVL:        2  BF=0           Không AVL:   1  BF=+2
            / \                              \
           1   3                              2  BF=+1
                                               \
                                                3
```

Chiều cao AVL $n$ nút: $h \le 1{,}44\log_2(n+2)$. Thực hành: nhớ **$O(\log n)$ luôn**.

### C. Hai phép xoay đơn — “kéo nút giữa lên”

Xoay **không** đổi thứ tự LNR (vẫn BST). Chỉ đổi **3 con trỏ** + cập nhật `height`. Thời gian $O(1)$.

Quy tắc hình: cây đang **nghiêng** về một phía → kéo **nút giữa** lên làm gốc cây con, nút cũ xuống phía đối diện. Cây con “kẹt giữa” gọi là **T2** — phải giữ, nếu không mất nhánh.

---

##### ① Xoay trái (`leftRotate`) — chữa cây đổ sang **phải**

Dùng khi x–y–C thẳng hàng bên phải (hình “/” ngược).

```
 TRƯỚC (x lệch phải)              SAU
        x                               y          ← y lên làm gốc
       / \                             / \
     A     y                          x   C
          / \                        / \
        T2   C                      A  T2
```

LNR trước = LNR sau = `A x T2 y C` — BST không gãy.

**Từng con trỏ** (đúng thứ tự, giống `ThemDau` Chương 3: **giữ T2 trước**):

```
 ①  y  ← x->right          (nắm nút giữa)
 ②  T2 ← y->left           (GIỮ cây con kẹt giữa — bắt buộc)
 ③  y->left  ← x           (x xuống làm con trái của y)
 ④  x->right ← T2          (T2 thành con phải của x)
 ⑤  capNhatCao(x) rồi capNhatCao(y)   // x đã là con, tính trước
 ⑥  return y               (gốc mới của cây con)
```

```
 ①②                         ③                          ④
 x ──right──► y              y                          y
              │             /                          / \
             T2            x                          x   C
                           └──right còn trỏ y (sai     \
                              tạm, bước ④ sửa)         T2
```

**Số liệu:** `x=10, y=20, T2=NULL, C=30`. Height: lá = 1.

```
 TRƯỚC                         SAU
 10 h=3 BF=+2                  20 h=2 BF=0
   \                          /  \
   20 h=2 BF=+1             10    30
     \                      h=1   h=1
     30 h=1
```

```cpp
AVLNode* leftRotate(AVLNode* x) {
    AVLNode* y  = x->right;     // ①
    AVLNode* T2 = y->left;      // ②
    y->left  = x;               // ③
    x->right = T2;              // ④
    capNhatCao(x);              // ⑤ con trước
    capNhatCao(y);
    return y;                   // ⑥
}
```

---

##### ② Xoay phải (`rightRotate`) — chữa cây đổ sang **trái**

Đối xứng gương của xoay trái. Dùng khi y–x–A thẳng hàng bên trái (hình “\”).

```
 TRƯỚC (y lệch trái)               SAU
        y                                x          ← x lên làm gốc
       / \                              / \
      x   C                            A   y
     / \                                  / \
    A  T2                               T2   C
```

LNR = `A x T2 y C` — không đổi.

```
 ①  x  ← y->left
 ②  T2 ← x->right          (GIỮ)
 ③  x->right ← y
 ④  y->left  ← T2
 ⑤  capNhatCao(y) rồi capNhatCao(x)
 ⑥  return x
```

**Số liệu:** `y=30, x=20, A=10, T2=NULL, C=NULL`. Height: lá = 1.

```
 TRƯỚC                         SAU
     30 h=3 BF=-2                 20 h=2 BF=0
    /                            /  \
  20 h=2 BF=-1                 10    30
  /                            h=1   h=1
 10 h=1
```

```cpp
AVLNode* rightRotate(AVLNode* y) {
    AVLNode* x  = y->left;      // ①
    AVLNode* T2 = x->right;     // ②
    x->right = y;               // ③
    y->left  = T2;              // ④
    capNhatCao(y);              // ⑤
    capNhatCao(x);
    return x;                   // ⑥
}
```

**Bẫy xoay đơn:**

1. Quên T2 → nhánh giữa rơi, leak / mất khóa.
2. Cập nhật height **cha trước con** → height sai → lần sau xoay nhầm.
3. Không `return` gốc mới → cha của x/y vẫn trỏ nút cũ, cây gãy.
4. Nhầm trái/phải: cây đổ phải mà `rightRotate` → lệch nặng hơn.

---

### D. Bốn trường hợp mất cân bằng — nhận hình rồi xoay

Sau `Insert` BST, leo từ nút mới lên gốc. Nút **thấp nhất** có `|BF| = 2` gọi là $z$. Chỉ cần nhìn **hai bước** $z$ → con → cháu (chỗ vừa chèn):

```
        z                         z là nơi |BF|=2
       / \                        Con = nhánh cao hơn
     con
     / \
   cháu  ← vừa chèn (hoặc trên đường tới khóa mới)
```

| Tên | Đường 2 bước | Hình | BF($z$) | Việc |
|-----|--------------|------|---------|------|
| **LL** | trái, rồi trái | thẳng `\` | −2 | **Một** `rightRotate(z)` |
| **RR** | phải, rồi phải | thẳng `/` ngược | +2 | **Một** `leftRotate(z)` |
| **LR** | trái, rồi phải | “<” gãy | −2 | `leftRotate(con)` **rồi** `rightRotate(z)` |
| **RL** | phải, rồi trái | “>” gãy | +2 | `rightRotate(con)` **rồi** `leftRotate(z)` |

Mẹo: **đường thẳng → xoay một lần** (kéo giữa lên). **Đường gãy → xoay con trước** cho thẳng, rồi xoay $z$.

Khi chèn, không cần tính BF con: so khóa mới với `z->left` / `z->right`.

```
 b = getBalance(z)
 b < -1 && x < z->left->data     → LL
 b < -1 && x > z->left->data     → LR
 b >  1 && x > z->right->data    → RR
 b >  1 && x < z->right->data    → RL
```

Dưới đây bốn case **đủ hình, đủ height, đủ BF** — không “đối xứng rồi bỏ”.

---

##### Trường hợp RR — chèn `10, 20, 30`

```
 (1) chèn 10                 (2) chèn 20
     10 h=1 BF=0                 10 h=2 BF=+1     còn |BF|≤1, chưa xoay
                                   \
                                   20 h=1 BF=0

 (3) chèn 30 — 10 mất cân
     10 h=3 BF=+2  ← z
       \
       20 h=2 BF=+1
         \
         30 h=1
     Đường: 10→20→30 = phải-phải = RR
     leftRotate(10):  x=10, y=20, T2=NULL, C=30
```

```
  TRƯỚC RR                      SAU leftRotate(10)
  10 BF=+2                         20 BF=0
    \                             /  \
    20 BF=+1                    10    30
      \                         BF=0  BF=0
      30
```

LNR trước/sau: `10 20 30`. Gốc cây con đổi 10 → 20; hàm `insertNode` **return 20** gắn vào cha (ở đây 20 thành root).

---

##### Trường hợp LL — chèn `30, 20, 10`

```
 (1) 30                         (2) 30 h=2 BF=-1
                                /
                              20

 (3) chèn 10 — 30 mất cân
        30 h=3 BF=-2  ← z
       /
     20 h=2 BF=-1
     /
   10 h=1
     Đường: 30→20→10 = trái-trái = LL
     rightRotate(30):  y=30, x=20, T2=NULL, A=10
```

```
  TRƯỚC LL                      SAU rightRotate(30)
      30 BF=-2                     20 BF=0
     /                            /  \
   20 BF=-1                     10    30
   /                            BF=0  BF=0
 10
```

LNR: `10 20 30`. Gốc mới = 20.

**Có T2:** nếu 20 đã có con phải 25, xoay phải vẫn gắn 25 thành con trái của 30 (bước ④). LNR `10 20 25 30` không đổi.

```
     30                         20
    /                          /  \
  20            →            10    30
  / \                              /
10  25                           25
```

---

##### Trường hợp LR — chèn `30, 10, 20`  (gãy, phải xoay **kép**)

Một lần xoay phải tại 30 **không** đủ: nút 20 đang “lõm vào trong”. Phải **duỗi** nhánh trái thành LL đã, rồi mới `rightRotate`.

```
 (1) 30                         (2) 30 h=2 BF=-1
                                /
                              10

 (3) chèn 20
        30 h=3 BF=-2  ← z
       /
     10 h=2 BF=+1     ← con lệch NGƯỢC chiều (phải)
       \
       20 h=1
     Đường: 30→10→20 = trái-rồi-phải = LR
```

**Bước I — `leftRotate(10)`** duỗi thành LL (`x=10, y=20, T2=NULL`):

```
     30 BF=-2                   30 BF=-2
    /                          /
  10 BF=+1         →         20 BF=-1
    \                        /
    20                     10
```

**Bước II — `rightRotate(30)`** như LL (`y=30, x=20`):

```
     30                         20 BF=0
    /                          /  \
  20               →         10    30
  /                          BF=0  BF=0
10
```

Kéo **nút giữa 20** lên — đúng quy tắc “gãy thì duỗi, rồi kéo giữa”.

**LR có T2, T3** (đủ chữ để thi vẽ):

```
      z=30                      z=30                     20
     /                         /                        /  \
   10            I            20          II          10    30
     \         xoay trái     / \       xoay phải     / \    /
     20         tại 10     10  T3       tại 30     T2     T3
    /  \                   /
  T2   T3                T2
```

LNR luôn `T2 10 20 T3 30`.

---

##### Trường hợp RL — chèn `10, 30, 20`  (gương của LR)

```
 (1) 10                         (2) 10 h=2 BF=+1
                                      \
                                      30

 (3) chèn 20
     10 h=3 BF=+2  ← z
       \
       30 h=2 BF=-1    ← con lệch NGƯỢC (trái)
       /
     20 h=1
     Đường: 10→30→20 = phải-rồi-trái = RL
```

**Bước I — `rightRotate(30)`** duỗi thành RR:

```
  10 BF=+2                      10 BF=+2
    \                             \
    30 BF=-1         →            20 BF=+1
    /                               \
  20                                30
```

**Bước II — `leftRotate(10)`:**

```
  10                            20 BF=0
    \                          /  \
    20              →        10    30
      \                      BF=0  BF=0
      30
```

**RL đủ chữ:**

```
  z=10                         z=10                      20
    \                            \                      /  \
    30          I                20        II         10    30
    /        xoay phải          / \     xoay trái       \    \
  20          tại 30          T2  30      tại 10        T2    T3
 /  \                              \
T2  T3                             T3
```

---

##### Nhận case trong 5 giây (vấn đáp)

```
 Nhìn z (|BF|=2)
    │
    ├─ BF = -2  (lệch trái)
    │     ├─ con trái cũng lệch trái (BF con ≤ 0)  → LL  → xoay PHẢI z
    │     └─ con trái lệch phải   (BF con > 0)     → LR  → xoay TRÁI con, PHẢI z
    │
    └─ BF = +2  (lệch phải)
          ├─ con phải lệch phải  (BF con ≥ 0)      → RR  → xoay TRÁI z
          └─ con phải lệch trái  (BF con < 0)      → RL  → xoay PHẢI con, TRÁI z
```

Hình chữ: **LL = `\`, RR = `/` ngược, LR = `<`, RL = `>`**. Đường thẳng một xoay; đường gãy hai xoay.

**Bẫy bốn case:**

1. LR mà chỉ `rightRotate(z)` → 20 vẫn kẹt dưới 10, cây **vẫn** lệch.
2. Nhầm LR với LL vì “có đi trái” — phải nhìn **bước hai**.
3. Xoay kép nhưng quên gán `z->left = leftRotate(z->left)` trước xoay z.
4. Tính BF = trái − phải (sách khác) rồi dùng `if (b > 1)` của đề thi → xoay ngược chiều. **Khóa này: phải − trái.**

### E. Chèn AVL

Insert như BST, **leo lên** cập nhật height, gặp $|BF|=2$ thì xoay, `return` gốc mới của cây con.

```cpp
AVLNode* insertNode(AVLNode* p, int x) {
    if (p == NULL) return createNode(x);
    if (x < p->data) p->left = insertNode(p->left, x);
    else if (x > p->data) p->right = insertNode(p->right, x);
    else return p;

    capNhatCao(p);
    int b = getBalance(p);

    if (b < -1 && x < p->left->data)            // LL
        return rightRotate(p);
    if (b >  1 && x > p->right->data)           // RR
        return leftRotate(p);
    if (b < -1 && x > p->left->data) {          // LR
        p->left = leftRotate(p->left);
        return rightRotate(p);
    }
    if (b >  1 && x < p->right->data) {         // RL
        p->right = rightRotate(p->right);
        return leftRotate(p);
    }
    return p;
}
```

Chèn `1..7` — **từng bước, ghi xoay** (hero: thuộc bảng này thì vẽ AVL không cần chạy máy):

```
 Thêm 1     1                         chưa lệch

 Thêm 2     1                         BF(1)=+1  OK
             \
              2

 Thêm 3     1  BF=+2  → RR            leftRotate(1)
             \                            2
              2                          / \
               \                        1   3
                3

 Thêm 4     2                         BF(2)=+1  OK
           / \                            3 có con 4
          1   3
               \
                4

 Thêm 5     2  — tại 3: BF=+2 → RR    leftRotate(3)
           / \                            2
          1   3                          / \
               \                        1   4
                4                          / \
                 \                        3   5
                  5

 Thêm 6     trước xoay 2:              sau leftRotate(2):
                2 BF=+2                      4
               / \                          / \
              1   4                        2   5
                 / \                      / \   \
                3   5                    1   3   6
                     \
                      6
            (T2 = 3: con trái của 4 → thành con phải của 2)

 Thêm 7     trước: 5 BF=+2 → RR         sau leftRotate(5):
                4                              4
               / \                           /   \
              2   5                         2     6
             / \   \                       / \   / \
            1   3   6                     1   3 5   7
                     \
                      7
```

Cùng dãy trên BST thường: gốc 1, một đường phải, $h=7$. AVL: gốc **4**, $h=3$, perfect.

**Xóa AVL** (nâng cao): xóa như BST, rồi **cùng** bốn nhánh xoay khi leo lên — BF con dùng `getBalance(left/right)` vì không còn khóa “vừa chèn”. Đề thi câu 3 trọng tâm **chèn + xoay**; xóa là điểm mở rộng.

```cpp
bool isAVL(AVLNode* p) {
    if (p == NULL) return true;
    int b = getBalance(p);
    if (b < -1 || b > 1) return false;
    return isAVL(p->left) && isAVL(p->right);
}
```

(Đủ cho cây xây bằng `insertNode`. Muốn chặt: thêm `IsBST`.)

| | BST | AVL |
|---|-----|-----|
| Tìm / chèn / xóa trung bình | $O(\log n)$ | $O(\log n)$ |
| Xấu nhất | $O(n)$ | **$O(\log n)$** |
| Phụ | Không xoay | Height + xoay $O(1)$ mỗi nút trên đường |
| Khi nào | Dữ liệu ngẫu nhiên, code ngắn | Cần trần thời gian ổn định |

### ✅ Kiểm tra nhanh 5.4

1. BF = cao phải − cao trái. Nút chỉ có con trái lá: BF?
2. Chèn 10, 20, 30. Case nào, xoay gì tại 10?
3. Chèn 30, 10, 20. Vì sao **không** chỉ `rightRotate(30)`?
4. Sau `leftRotate(x)`, ai thành gốc cây con? T2 đi đâu?
5. Chèn AVL 1..7. Gốc cuối? Chiều cao?

**Đáp án:** (1) $0-1=-1$. (2) RR, `leftRotate(10)`, gốc mới 20. (3) Đó là LR (đường gãy); chỉ xoay phải thì 20 vẫn kẹt dưới 10. Phải `leftRotate(10)` rồi `rightRotate(30)`. (4) Con phải cũ `y`; T2 thành `x->right`. (5) Gốc 4, cao 3.

---

## 5.5. CÁC CHƯƠNG TRÌNH MINH HỌA

Copy từng file, biên dịch, đối chiếu output. Không nhìn đáp án khi đang thi — đây là **khung** đúng mẫu.

### A. BST — dữ liệu đề thi thực hành

```bash
c++ -std=c++11 -o bst_demo bst_demo.cpp && ./bst_demo
```

```cpp
#include <iostream>
using namespace std;

struct TNode {
    int data;
    TNode* pLeft;
    TNode* pRight;
};

void KhoiTao(TNode* &root) { root = NULL; }

TNode* TaoNode(int x) {
    TNode* p = new TNode;
    p->data = x;
    p->pLeft = p->pRight = NULL;
    return p;
}

TNode* Insert(TNode* root, int x) {
    if (root == NULL) return TaoNode(x);
    if (x < root->data) root->pLeft = Insert(root->pLeft, x);
    else if (x > root->data) root->pRight = Insert(root->pRight, x);
    return root;
}

TNode* Search(TNode* root, int x) {
    if (root == NULL || root->data == x) return root;
    if (x < root->data) return Search(root->pLeft, x);
    return Search(root->pRight, x);
}

TNode* MinValueNode(TNode* p) {
    while (p && p->pLeft) p = p->pLeft;
    return p;
}

TNode* Delete(TNode* root, int x) {
    if (root == NULL) return NULL;
    if (x < root->data) root->pLeft = Delete(root->pLeft, x);
    else if (x > root->data) root->pRight = Delete(root->pRight, x);
    else {
        if (root->pLeft == NULL) {
            TNode* t = root->pRight;
            delete root;
            return t;
        }
        if (root->pRight == NULL) {
            TNode* t = root->pLeft;
            delete root;
            return t;
        }
        TNode* t = MinValueNode(root->pRight);
        root->data = t->data;
        root->pRight = Delete(root->pRight, t->data);
    }
    return root;
}

void NLR(TNode* root) {
    if (!root) return;
    cout << root->data << " ";
    NLR(root->pLeft);
    NLR(root->pRight);
}
void LNR(TNode* root) {
    if (!root) return;
    LNR(root->pLeft);
    cout << root->data << " ";
    LNR(root->pRight);
}
void LRN(TNode* root) {
    if (!root) return;
    LRN(root->pLeft);
    LRN(root->pRight);
    cout << root->data << " ";
}

int CountNodes(TNode* root) {
    if (!root) return 0;
    return 1 + CountNodes(root->pLeft) + CountNodes(root->pRight);
}
int Height(TNode* root) {
    if (!root) return 0;
    int hl = Height(root->pLeft), hr = Height(root->pRight);
    return 1 + (hl > hr ? hl : hr);
}

void HuyCay(TNode* &root) {
    if (!root) return;
    HuyCay(root->pLeft);
    HuyCay(root->pRight);
    delete root;
    root = NULL;
}

int main() {
    TNode* root;
    KhoiTao(root);
    int a[] = {50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45};
    int n = 11;
    for (int i = 0; i < n; i++) root = Insert(root, a[i]);

    cout << "LNR: "; LNR(root); cout << "\n";
    cout << "NLR: "; NLR(root); cout << "\n";
    cout << "LRN: "; LRN(root); cout << "\n";
    cout << "So nut: " << CountNodes(root)
         << "  Cao: " << Height(root) << "\n";
    cout << (Search(root, 35) ? "Co 35\n" : "Khong 35\n");
    cout << (Search(root, 99) ? "Co 99\n" : "Khong 99\n");

    root = Delete(root, 10);
    root = Delete(root, 30);
    cout << "LNR sau xoa 10 va 30: "; LNR(root); cout << "\n";

    HuyCay(root);
    return 0;
}
```

Kỳ vọng:

```
LNR: 10 20 25 30 35 40 45 50 60 70 80
NLR: 50 30 20 10 25 40 35 45 70 60 80
LRN: 10 25 20 35 45 40 30 60 80 70 50
So nut: 11  Cao: 4
Co 35
Khong 99
LNR sau xoa 10 va 30: 20 25 35 40 45 50 60 70 80
```

(Xóa 10 rồi 30: 20 vẫn còn; 30 đổi thành 35.)

---

### B. AVL — chèn 1..7 và dãy tăng

```bash
c++ -std=c++11 -o avl_demo avl_demo.cpp && ./avl_demo
```

```cpp
#include <iostream>
using namespace std;

struct AVLNode {
    int data;
    AVLNode* left;
    AVLNode* right;
    int height;
};

int getHeight(AVLNode* p) { return p ? p->height : 0; }
int getBalance(AVLNode* p) {
    return p ? getHeight(p->right) - getHeight(p->left) : 0;
}
void capNhatCao(AVLNode* p) {
    if (!p) return;
    int hl = getHeight(p->left), hr = getHeight(p->right);
    p->height = 1 + (hl > hr ? hl : hr);
}
AVLNode* createNode(int x) {
    AVLNode* p = new AVLNode;
    p->data = x; p->left = p->right = NULL; p->height = 1;
    return p;
}
AVLNode* leftRotate(AVLNode* x) {
    AVLNode* y = x->right; AVLNode* T2 = y->left;
    y->left = x; x->right = T2;
    capNhatCao(x); capNhatCao(y);
    return y;
}
AVLNode* rightRotate(AVLNode* y) {
    AVLNode* x = y->left; AVLNode* T2 = x->right;
    x->right = y; y->left = T2;
    capNhatCao(y); capNhatCao(x);
    return x;
}
AVLNode* insertNode(AVLNode* p, int x) {
    if (!p) return createNode(x);
    if (x < p->data) p->left = insertNode(p->left, x);
    else if (x > p->data) p->right = insertNode(p->right, x);
    else return p;
    capNhatCao(p);
    int b = getBalance(p);
    if (b < -1 && x < p->left->data) return rightRotate(p);
    if (b >  1 && x > p->right->data) return leftRotate(p);
    if (b < -1 && x > p->left->data) {
        p->left = leftRotate(p->left);
        return rightRotate(p);
    }
    if (b >  1 && x < p->right->data) {
        p->right = rightRotate(p->right);
        return leftRotate(p);
    }
    return p;
}
void LNR(AVLNode* p) {
    if (!p) return;
    LNR(p->left); cout << p->data << " "; LNR(p->right);
}
void Huy(AVLNode* &p) {
    if (!p) return;
    Huy(p->left); Huy(p->right); delete p; p = NULL;
}

int main() {
    AVLNode* r = NULL;
    for (int i = 1; i <= 7; i++) r = insertNode(r, i);
    cout << "LNR: "; LNR(r); cout << "\n";
    cout << "Cao AVL 1..7: " << getHeight(r) << "\n";   // 3
    cout << "Goc: " << r->data << "\n";                  // 4
    Huy(r);
    return 0;
}
```

Kỳ vọng:

```
LNR: 1 2 3 4 5 6 7
Cao AVL 1..7: 3
Goc: 4
```

BST chèn 1..7: gốc 1, cao 7. AVL: gốc 4, cao 3.

---

## 5.6. BÀI TẬP

*(Cầu nối ôn thi — không phá đề cương 5.1–5.5.)*

Làm theo thứ tự. Vẽ cây trước khi gõ.

### A. Lý thuyết

**Bài 1.** Định nghĩa cây, cây nhị phân, BST, AVL. Mỗi cái một hình “đúng / sai”.

**Bài 2.** Cây nhị phân $n_2=6$, $n_1=2$. Tính $n_0$, $n$.

**Bài 3.** Mức $i$ tối đa bao nhiêu nút? Cây cao 5 tối đa bao nhiêu nút (quy ước mức)?

**Bài 4.** Phân biệt biểu diễn liên kết và mảng. Heap nên dùng cái nào?

**Bài 5.** Vì sao LNR(BST) tăng? Nếu một nút lệch thứ tự, LNR có tăng không?

### B. Truy vết

**Bài 6.** Cây 5.2.3 (nút 1..6). Viết NLR, LNR, LRN, Level-order. Đếm lá, chiều cao.

**Bài 7.** Insert lần lượt 50, 30, 70, 20, 40, 60, 80. Vẽ cây sau mỗi 2 số. LNR?

**Bài 8.** Từ cây bài 7: Search 40 (ghi đường đi); Search 25; xóa 20; xóa 30; xóa 50. Vẽ sau mỗi xóa.

**Bài 9.** Chèn AVL 1, 2, 3, 4. Ghi BF và phép xoay mỗi bước.

**Bài 10.** Chèn AVL 3, 1, 2 (LR). Vẽ 3 snapshot: BST thô → sau xoay trái con → sau xoay phải gốc.

### C. Cài đặt (CLO đề thi)

**Bài 11.** `TNode`, `KhoiTao`, `TaoNode`, `Insert`, `NLR`, `LNR`, `LRN`, `CountNodes`, `Height`. Test dãy đề thi 11 số.

**Bài 12.** `Search` đệ quy và vòng. In “thấy / không”.

**Bài 13.** `Delete` đủ 3 trường hợp + `MinValueNode`. Test xóa 10, 20, 30, 50 trên cây đề thi. Mỗi lần in LNR.

**Bài 14.** `HuyCay` (LRN). Menu: 1 thêm 2 xóa 3 tìm 4 NLR 5 LNR 6 LRN 7 thống kê 0 thoát — gọi `HuyCay` trước khi `return`.

**Bài 15.** AVL: `createNode`, `getHeight`, `getBalance`, `leftRotate`, `rightRotate`, `insertNode`. Chèn 1..7; chèn 7..1; chèn 50,30,70,20,40,60,80. In cao và LNR.

### D. Ứng dụng / nâng cao

**Bài 16.** Tree sort: nhập $n$ số, Insert BST, LNR.

**Bài 17.** `CountLeaves`, `LevelOrder` (Queue Chương 4 hoặc mảng), `DemMuc(root, k)`, `CopyTree`.

**Bài 18.** `IsBST` (kèm min/max). Cây cố ý sai (6 nằm trái 5) phải ra false.

**Bài 19 (nâng cao).** Duyệt NLR không đệ quy — dùng `class Stack` Chương 4.

**Bài 20 (nâng cao).** Xóa AVL; `isAVL` sau mỗi lần xóa.

**Bài 21 (nâng cao).** Cây biểu thức: dựng từ hậu tố `3 4 + 5 *` (Stack nút), LRN ra hậu tố, `TinhCay` = 35. Đối chiếu `TinhHauTo` Chương 4.

### E. Tự luận

1. Trình bày BST: định nghĩa, Insert, Search. Phân tích $O$. Vẽ chèn 5 số.
2. Ba trường hợp xóa. Vì sao cần nút thế mạng? Chạy tay xóa nút 2 con.
3. AVL khác BST chỗ nào? Vẽ xoay RR khi chèn 1,2,3. Viết `getBalance`.
4. NLR / LNR / LRN: thứ tự, một ứng dụng mỗi loại. Vì sao hủy cây dùng LRN?

### Đáp án gợi ý một số truy vết

**Bài 2.** $n_0=7$, $n=15$.

**Bài 6.** NLR `1 2 4 5 3 6`; LNR `4 2 5 1 3 6`; LRN `4 5 2 6 3 1`; tầng `1 2 3 4 5 6`; lá 3; cao 3.

**Bài 7.** LNR `20 30 40 50 60 70 80`.

**Bài 9.** `1`; `1-2` (BF 1 = +1); thêm 3 → xoay trái tại 1 → gốc 2, con 1 và 3; thêm 4 → RR tại 3, cây `2(1, 3( ,4))` rồi có thể còn cân — tùy height; tiếp tục đến 4 nút gốc vẫn 2.

(Với 1,2,3,4: sau 1–2–3 xoay thành `2(1,3)`; chèn 4 vào phải 3, BF(3)=+1, BF(2)=+1 — **chưa** xoay. Cây `2 /1  3\\4`.)

---

## 🎯 TÓM TẮT CHƯƠNG 5

### Kiến thức cốt lõi

1. **Cây** phi tuyến, một gốc, không chu trình. Nhị phân: tối đa 2 con, có trái/phải. $n_0 = n_2 + 1$.
2. **Biểu diễn đề thi:** `TNode` + `pLeft` / `pRight`. Mảng cho cây hoàn chỉnh.
3. **Duyệt:** NLR sao chép; LNR (BST → tăng); LRN hủy / hậu tố. Tầng = Queue.
4. **Chiều cao đề thi:** rỗng = 0, lá = 1. Cây 11 nút mẫu → cao **4**.
5. **BST:** trái < gốc < phải. Insert / Search / Delete $O(h)$. Xóa 2 con: min cây con phải. Min = trái nhất, max = phải nhất. **Không** nhầm heap.
6. **AVL:** BST + \|BF\| ≤ 1, BF = cao phải − cao trái. Bốn xoay LL / RR / LR / RL. $O(\log n)$ luôn.
7. **Cây biểu thức:** toán tử = nút trong, số = lá; LRN = hậu tố. Dựng từ hậu tố bằng Stack nút (Ch.4).

### Câu thần chú khi viết code

- Mọi đệ quy cây: **dừng khi `NULL`**.
- `root = Insert(root, x);` — cây rỗng đổi gốc.
- Không chèn trùng (`==` thì return).
- Xóa 2 con: **copy data** thế mạng, rồi `Delete` thế mạng — đừng `delete` nút đang có 2 con trỏ.
- Hủy: trái, phải, **rồi** `delete` gốc.
- AVL: cập nhật height **con trước cha** sau xoay; `getHeight(NULL) = 0` thống nhất với `height` lá = 1.
- LNR không tăng → **không** phải BST (hoặc vừa xóa sai).
- Duyệt: ve ①②③ trên giấy — NLR in lúc tới, LNR lúc xong trái, LRN lúc rời nút.
- AVL: đường thẳng (LL/RR) một xoay; đường gãy (LR/RL) **xoay con trước**, rồi xoay $z$. Giữ T2. Height: con trước cha.
- “Đầy / hoàn chỉnh / perfect” khác nhau — xem hộp thuật ngữ 5.2.1.B. Heap là complete trên mảng, không phải BST.

### Liên kết chương

- **Chương 3:** nút + `new`/`delete`; hủy hết tránh leak.
- **Chương 4:** Level-order = Queue; duyệt sâu = Stack / đệ quy; cây biểu thức ↔ hậu tố.
- **Đồ thị:** cây = đồ thị liên thông không chu trình; BFS/DFS cùng ý.

---

*Hết chương 5. Làm bài 11–14 trước buổi thực hành; bài 15 khi học AVL; 19–21 là mức cao cấp.*
