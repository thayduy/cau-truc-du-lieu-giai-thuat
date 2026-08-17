# CHƯƠNG 2: CÁC THUẬT TOÁN TÌM KIẾM VÀ SẮP XẾP

> Chương này làm trên **mảng** (`a[0..n-1]`). DSLK sắp xếp bằng hoán đổi `data` — xem Ch.3 `SapXep` (đổi chỗ trực tiếp).  
> Ch.1 đã đếm $O(n)$ / $O(\log n)$ và $n(n-1)/2$. Ở đây **cài đủ**, chạy tay, rồi mới nói $O$.

---

## 🎯 MỤC TIÊU CHƯƠNG 2

**Sau khi học xong chương này, sinh viên có thể:**

1. Phát biểu bài toán tìm kiếm: vào mảng + khóa, ra chỉ số hoặc $-1$.
2. Cài **ba** giải thuật tìm (khớp giáo trình/đề thực hành Phần 1): tuần tự, nhị phân, **nội suy**; đếm so sánh; nêu tốt / xấu.
3. Phát biểu bài toán sắp xếp; phân biệt **ổn định**, **tại chỗ**, tăng / giảm.
4. Cài bốn giải thuật đơn giản: **đổi chỗ trực tiếp**, **chọn trực tiếp**, **chèn trực tiếp**, **nổi bọt** — không nhầm Interchange với Selection.
5. Cài bốn giải thuật nhanh: **trộn**, **nhanh**, **vun đống**, **cơ số**; nêu $O$ tốt / TB / xấu và bộ nhớ phụ.
6. Chọn thuật toán theo $n$, dữ liệu đã gần sort hay chưa, có cần ổn định không.

---

## 📋 NỘI DUNG CHƯƠNG 2

```
2.1. Bài toán tìm kiếm
     2.1.1. Khái niệm
     2.1.2. Tìm kiếm tuần tự
     2.1.3. Tìm kiếm nhị phân
     2.1.4. Tìm kiếm nội suy          ← giáo trình / đề thực hành Phần 1 (bắt buộc)
2.2. Bài toán sắp xếp
     2.2.1. Khái niệm
     2.2.2. Các thuật toán sắp xếp đơn giản
            a. Sắp xếp đổi chỗ trực tiếp (Interchange)
            b. Sắp xếp chọn trực tiếp (Selection)
            c. Sắp xếp chèn trực tiếp (Insertion)
            d. Sắp xếp nổi bọt (Bubble)
     2.2.3. Các thuật toán sắp xếp nhanh
            a. Sắp xếp trộn (Merge)
            b. Sắp xếp nhanh (Quick)
            c. Sắp xếp vun đống (Heap)
            d. Sắp xếp theo cơ số (Radix)
```

> **Cài đặt:** C++ (`iostream`), tên hàm khớp thực hành / đề: `TimTuyenTinh`, `TimNhiPhan`, `TimNoiSuy`, `InterchangeSort`, `SelectionSort`, `InsertionSort`, `BubbleSort`, `QuickSort` + `partition`, `MergeSort`, `HeapSort`, `RadixSort`.  
> Ảnh đề cương lý thuyết 2.1 dừng ở nhị phân. **Giáo trình thực hành Phần 1 và đề thi** bắt đủ **3** phương pháp tìm — mục **2.1.4 nội suy** soạn đầy đủ, không bỏ.

---

## 📖 CÁCH ĐỌC (ZERO → HERO)

| Mốc | Đọc | Xong khi |
|-----|-----|----------|
| **Zero** | 2.1.1 + 2.2.1 | Nói được “tìm = trả chỉ số”; “sắp = đưa về thứ tự khóa” |
| **Đề thi tìm** | 2.1.2 + 2.1.3 + **2.1.4** | Viết ba hàm; bảng $L,R,M$; công thức `pos` nội suy |
| **Đề thi sort đơn giản** | 2.2.2 cả bốn | Chạy tay $n=4$; phân biệt Interchange / Selection |
| **Đề thi sort nhanh** | 2.2.3.a–b | Merge hai mảng đã sort; partition pivot cuối |
| **Hero** | 2.2.3.c–d + bảng chọn | Heapify; LSD từng chữ số; chọn thuật toán |

Mỗi thuật toán: **ý tưởng → lưu đồ → hình / chạy tay từng bước → mã giả → C++ → toán ($O$) → ứng dụng → bẫy**.

**Checklist chất lượng (mỗi giải thuật phải có):**

| Tiêu chí | Có trong chương |
|----------|-----------------|
| Đầy đủ theo đề cương + giáo trình (kể cả nội suy) | 2.1.2–2.1.4, 2.2.2.a–d, 2.2.3.a–d |
| Dễ hiểu (zero → hero, ẩn dụ) | đầu mỗi mục |
| Trực quan (ô mảng, cây chia, đống) | có |
| **Lưu đồ giải thuật** | khung *Bắt đầu / điều kiện / xử lý / Kết thúc* |
| Mã giả + mã C++ | có |
| Chạy tay từng bước | bảng + mảng `[5,1,4,2]` hoặc dãy tìm |
| Toán (số so sánh, công thức $O$) | khối **Toán** |
| Ví dụ + bài tập | trong mục + 2.3 |
| Ứng dụng thực tế (đề án SV, không thống kê bịa) | khối **Ứng dụng** |

Mảng chạy tay dùng xuyên chương (thuộc mặt):

```
  Tìm:   a = [10, 20, 30, 40, 50, 60, 70, 80]     (đã tăng)
  Sắp:   a = [5, 1, 4, 2]                          (n = 4)
```

---

## 📚 BẢNG THUẬT NGỮ

| Thuật ngữ | Nghĩa | Ghi nhớ |
|-----------|--------|---------|
| **Khóa (key)** | Trường dùng để tìm / sắp | Mã SV, điểm, `a[i]` nếu mảng `int` |
| **Tìm thành công** | Có khóa, trả chỉ số | Có thể có nhiều phần tử trùng — ta trả **một** vị trí |
| **Tìm thất bại** | Không có, trả $-1$ | Vẫn tốn so sánh |
| **Tuần tự / tuyến tính** | Đi `a[0]`, `a[1]`, … | Không cần sort |
| **Nội suy** | Ước vị trí theo *giá trị*, không luôn lấy giữa | Mảng tăng + phân bố khá đều |
| **Lính canh (sentinel)** | Ghi khóa vào `a[n]` rồi tìm | Bớt kiểm `i < n` |
| **Ổn định (stable)** | Hai phần tử **bằng khóa** giữ thứ tự tương đối | Insertion, Merge, Bubble (bản `>`) thường ổn định |
| **Tại chỗ (in-place)** | Phụ $O(1)$ (không kể stack đệ quy) | Selection, Heap; Merge **không** |
| **Pass / lượt** | Một vòng ngoài | Bubble: mỗi pass “neo” max về cuối |
| **Pivot** | Chốt Quick | Đề thi thường `a[high]` |
| **Heap (đống)** | Cây nhị phân hoàn chỉnh + tính chất heap | Cha ≥ con (max-heap) |
| **LSD** | Least Significant Digit | Radix: hàng đơn vị rồi chục, trăm… |

---

## 2.1. BÀI TOÁN TÌM KIẾM

### 2.1.1. Khái niệm

#### A. Bài toán (thuộc)

**Tìm kiếm:** cho dãy $n$ phần tử $a[0..n-1]$ và khóa $x$.  
**Ra:** một chỉ số $i$ ($0\le i<n$) sao cho $a[i]$ “khớp” $x$, hoặc $-1$ nếu không có.

Với `int`: khớp = `a[i] == x`.  
Với `SinhVien`: khớp = `strcmp(a[i].ma, ma)==0` (Ch.1).

```
Vào:  a[0..n-1], x
Ra:   i  hoặc  −1
```

```
  chỉ số:  0    1    2    3    4
         ┌────┬────┬────┬────┬────┐
         │ 10 │ 20 │ 30 │ 40 │ 50 │
         └────┴────┴────┴────┴────┘
                    ▲
              tìm x = 30  →  trả 2
              tìm x = 99  →  trả −1
```

Không phải “in ra phần tử”. Thi và hàm C++ trả **vị trí** để còn sửa, xóa (Ch.1 `SuaDiem`, `XoaTai`).

#### B. Hai họ — chọn theo mảng đã sort chưa

| Họ | Ý | Điều kiện mảng | $O$ xấu |
|----|---|----------------|---------|
| Tuần tự (2.1.2) | So lần lượt | **Không** cần sort | $O(n)$ |
| Nhị phân (2.1.3) | So giữa, bỏ nửa | **Phải** đã sắp một chiều | $O(\log n)$ |
| Nội suy (2.1.4) | Ước `pos` theo tỷ lệ giá trị | Đã sắp **và** phân bố khá đều | $O(n)$ (lệch) |

Nhị phân nhanh **không** bù cho mảng lộn: kết quả có thể sai. Muốn nhị phân → sắp trước (mục 2.2), chi phí sắp thường lớn hơn **một** lần tìm. Nhiều lần tìm trên cùng dữ liệu: sắp **một lần**, rồi nhị phân mãi.

#### C. Tốt / trung bình / xấu (ôn Ch.1)

Với tìm tuần tự, $n$ phần tử, mỗi lần so một phần tử:

| | Tình huống | Số so sánh khóa |
|---|------------|-----------------|
| Tốt | $x = a[0]$ | $1$ |
| Xấu | không có, hoặc $x=a[n-1]$ | $n$ |
| TB (khóa có, vị trí đều) | $\approx (n+1)/2$ | |

Đề không nói thì lấy **xấu**. $O$ tuần tự: $O(n)$. $O$ nhị phân: $O(\log n)$ (xấu cũng log, vì mỗi bước bỏ nửa).

#### D. Ứng dụng trong đề án (nối Ch.1)

| Việc | Giải thuật |
|------|------------|
| Tìm MSSV trên mảng nhập lung tung | Tuần tự |
| Từ điển 100 000 từ **đã** sort theo alphabet | Nhị phân |
| Tìm xong rồi `SuaDiem` | Dùng chỉ số vừa trả |

Không nhồi Google / “70% CPU”. Vai trò đủ: **mọi** thao tác “có khóa này không?” đều là tìm.

### ✅ Kiểm tra nhanh 2.1.1

1. Hàm tìm trả giá trị `a[i]` thay vì $i$ — bất tiện lúc nào?
2. Mảng chưa sort, dùng nhị phân cho “nhanh” — được không?
3. Một lần tìm trên $n=20$: tuần tự hay nhị phân (nếu phải sort trước)?

**Đáp án:** (1) Sửa/xóa cần chỉ số. (2) Không — sai kết quả. (3) Tuần tự: sort đã $O(n\log n)$ hoặc $O(n^2)$, đắt hơn $20$ so sánh.

---

### 2.1.2. Tìm kiếm tuần tự (Sequential / Linear Search)

#### A. Ý tưởng (zero)

Đứng ở đầu dãy, hỏi từng ô: “Có phải $x$ không?” Gặp thì dừng. Hết dãy thì $-1$.

```
  tìm x = 40 trên [10, 20, 30, 40, 50]

  i=0: 10 ≠ 40
  i=1: 20 ≠ 40
  i=2: 30 ≠ 40
  i=3: 40 = 40  → trả 3, DỪNG
```

Không nhảy, không cần thứ tự. Giống lật từng trang danh sách lớp.

#### Lưu đồ

```
                    ┌──────────┐
                    │  Bắt đầu │
                    └────┬─────┘
                         ▼
                    ┌──────────┐
                    │  i ← 0   │
                    └────┬─────┘
                         ▼
                 ┌───────────────┐  không
            ┌───►│   i < n ?     ├──────────► ┌────────────┐
            │    └───────┬───────┘            │ return −1  │
            │         có │                    └─────┬──────┘
            │            ▼                          │
            │    ┌───────────────┐  có              │
            │    │  a[i] = x ?   ├──────────► ┌─────┴──────┐
            │    └───────┬───────┘            │ return i   │
            │       không│                    └─────┬──────┘
            │            ▼                          │
            │    ┌───────────────┐                  │
            │    │  i ← i + 1    │                  ▼
            │    └───────┬───────┘            ┌──────────┐
            │            │                    │ Kết thúc │
            └────────────┘                    └──────────┘
```

Hình thoi `?` = quyết định. Mũi tên **có** / **không** phải đọc được — đó là lưu đồ thi vẽ.

```
THUẬT TOÁN TimTuyenTinh(a, n, x) → i hoặc −1
1. i ← 0
2. while i < n
3.     nếu a[i] = x thì trả về i
4.     i ← i + 1
5. trả về −1
```

```cpp
int TimTuyenTinh(int a[], int n, int x) {
    for (int i = 0; i < n; i++)
        if (a[i] == x) return i;
    return -1;
}
```

`SinhVien`: đổi `==` thành `strcmp(a[i].ma, ma) == 0`.

#### C. Chạy tay + đếm so sánh

$a=[10,20,30,40,50]$, $n=5$.

| $x$ | So với | Số so sánh `ss` | Kết quả |
|-----|--------|-----------------|---------|
| 10 | 10 | 1 | 0 (tốt) |
| 40 | 10,20,30,40 | 4 | 3 |
| 50 | năm ô | 5 | 4 (cuối) |
| 99 | năm ô | 5 | −1 (thất bại) |
| (n=0) | không vào vòng | 0 | −1 |

#### D. Bản đếm — đúng đề thực hành

```cpp
int TimTuyenTinh(int a[], int n, int x, int &ss) {
    ss = 0;
    for (int i = 0; i < n; i++) {
        ss++;
        if (a[i] == x) return i;
    }
    return -1;
}
```

Đếm **trước** `if` thì mỗi lần xét một phần tử tính một so sánh — khớp “xấu = $n$”.

#### Toán

Gọi $T(n)$ = số so sánh khóa (xấu: không có $x$).

$$
T_{\text{tốt}}=1,\qquad T_{\text{xấu}}=n,\qquad T_{\text{TB}}\approx\frac{n+1}{2}
$$

(giả sử $x$ có, vị trí đều). Viết $O(n)$. Không gian phụ $S(n)=O(1)$.

#### Ứng dụng thực tế

| Tình huống | Vì sao tuần tự |
|------------|----------------|
| Danh sách lớp 40 SV, tìm MSSV, **chưa** sort | $n$ nhỏ, không tốn sort |
| Tìm trên DSLK (Ch.3) | Không có `a[i]`, chỉ đi `pNext` |
| Tìm lần đầu trên file nhập lung tung | Chưa biết thứ tự |

Không dùng khi: từ điển $10^5$ từ **đã** alphabet — chuyển 2.1.3.

Ghi $x$ vào ô **sau cùng** (cần `a` còn chỗ, hoặc mảng kích thước $n+1$):

```
THUẬT TOÁN TimLinhCanh(a, n, x) → i hoặc −1
1. a[n] ← x                 // lính
2. i ← 0
3. while a[i] ≠ x
4.     i ← i + 1
5. nếu i < n thì trả về i else −1
```

Vòng trong **không** kiểm `i < n`. Vẫn $O(n)$, chỉ bớt một phép so sánh biên mỗi vòng. Đề thi khóa này thường bản D là đủ.

#### F. $O$, ưu / nhược, lúc dùng

| | |
|---|---|
| Thời gian | Tốt $O(1)$, xấu / TB $O(n)$ → viết $O(n)$ |
| Không gian phụ | $O(1)$ |
| Ổn định? | Không sắp — không áp dụng |
| Ưu | Mọi mảng; code ngắn; $n$ nhỏ ổn |
| Nhược | $n$ lớn, tìm nhiều lần → chậm |

**Bẫy 2.1.2**

1. `==` trên `char[]` — dùng `strcmp`.
2. Quên `return -1`.
3. $n=0$ mà vẫn đọc `a[0]`.
4. Tìm thấy rồi vẫn chạy hết vòng — mất “tốt $O(1)$”, vẫn đúng kết quả nếu lấy chỉ số đầu.

### ✅ Kiểm tra nhanh 2.1.2

1. $n=6$, không có $x$. `ss`?
2. Có hai phần tử bằng $x$. Trả chỉ số nào (bản D)?
3. Vì sao tuần tự không cần sort?

**Đáp án:** (1) 6. (2) Chỉ số **nhỏ nhất** (gặp trước, `return`). (3) Chỉ so khớp, không dùng thứ tự trái/phải.

---

### 2.1.3. Tìm kiếm nhị phân (Binary Search)

#### A. Ý tưởng

Mảng **đã tăng**. So $x$ với phần tử **giữa**. Bằng thì xong. $x$ lớn hơn → chỉ còn nửa phải. $x$ nhỏ hơn → nửa trái. Lặp đến khi hết khoảng.

```
  L                M                R
  10  20  30  40  50  60  70  80
                   ▲
              a[M] ? x   → bỏ một nửa
```

Ẩn dụ: từ điển mở giữa; chữ cần tìm đứng trước/sau trang giữa.

#### Lưu đồ

```
              ┌──────────┐
              │  Bắt đầu │
              └────┬─────┘
                   ▼
         ┌───────────────────┐
         │ L ← 0, R ← n−1    │
         └─────────┬─────────┘
                   ▼
          ┌────────────────┐  không
     ┌───►│   L ≤ R ?      ├──────────► return −1
     │    └────────┬───────┘
     │          có │
     │             ▼
     │    ┌────────────────┐
     │    │ M ← (L+R)/2    │
     │    └────────┬───────┘
     │             ▼
     │    ┌────────────────┐  có
     │    │ a[M] = x ?     ├──────────► return M
     │    └────────┬───────┘
     │        không│
     │             ▼
     │    ┌────────────────┐  có
     │    │ a[M] < x ?     ├────► L ← M+1 ──┐
     │    └────────┬───────┘                │
     │        không│                        │
     │             ▼                        │
     │       R ← M−1                        │
     │             │                        │
     └─────────────┴────────────────────────┘
```

**Điều kiện bắt buộc:** mảng đã tăng (hoặc đã giảm, đổi nhánh). Mảng lộn → sai kết quả.

Phản ví dụ:

```
  a = [10, 50, 20, 40]   // lộn
  tìm 20, L=0, R=3, M=1, a[1]=50 > 20 → R=0
  còn [10], 10 ≠ 20 → −1   SAI (20 đang ở chỉ số 2)
```

#### B. Mã giả và C++ (vòng `while` — đề thi)

```
THUẬT TOÁN TimNhiPhan(a, n, x) → i hoặc −1     // a tăng dần
1. L ← 0, R ← n − 1
2. while L ≤ R
3.     M ← (L + R) / 2          // chia nguyên
4.     nếu a[M] = x thì trả về M
5.     nếu a[M] < x thì L ← M + 1
6.     ngược lại R ← M − 1
7. trả về −1
```

```cpp
int TimNhiPhan(int a[], int n, int x) {
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

Khoảng **còn lại** luôn `a[L..R]`. `L > R` → thất bại.

`M = L + (R - L) / 2` tránh tràn `L+R` khi chỉ số lớn. Đề $n\le 100$: `(L+R)/2` đủ.

#### C. Chạy tay — thành công

$a=[10,20,30,40,50,60,70,80]$, $n=8$, $x=70$.

| Bước | $L$ | $R$ | $M=(L+R)/2$ | $a[M]$ | Việc |
|------|-----|-----|-------------|--------|------|
| 1 | 0 | 7 | 3 | 40 | $40<70$ → $L=4$ |
| 2 | 4 | 7 | 5 | 60 | $60<70$ → $L=6$ |
| 3 | 6 | 7 | 6 | 70 | **bằng** → trả **6** |

Ba so sánh, không phải 7.

$x=40$ (trúng giữa ngay): $M=3$, **một** so sánh.

#### D. Chạy tay — thất bại

$x=35$, cùng mảng.

| Bước | $L$ | $R$ | $M$ | $a[M]$ | Việc |
|------|-----|-----|-----|--------|------|
| 1 | 0 | 7 | 3 | 40 | $40>35$ → $R=2$ |
| 2 | 0 | 2 | 1 | 20 | $20<35$ → $L=2$ |
| 3 | 2 | 2 | 2 | 30 | $30<35$ → $L=3$ |
| 4 | 3 | 2 | — | | $L>R$ → **−1** |

#### E. Hai mép: $x=a[0]$ và $x=a[n-1]$

$x=10$: $M=3$ (40) → $R=2$; $M=1$ (20) → $R=0$; $M=0$ (10) → trả 0.  
$x=80$: luôn đi phải đến $M=7$.

Vẫn $O(\log n)$ bước, không $O(n)$.

#### F. Bản đếm so sánh

```cpp
int TimNhiPhan(int a[], int n, int x, int &ss) {
    ss = 0;
    int L = 0, R = n - 1;
    while (L <= R) {
        int M = (L + R) / 2;
        ss++;
        if (a[M] == x) return M;
        if (a[M] < x) L = M + 1;
        else R = M - 1;
    }
    return -1;
}
```

Xấu: khoảng còn 1, 2, 4, … phần tử → $\lfloor\log_2 n\rfloor + 1$ so sánh kiểu. $n=8$ tối đa khoảng 4.

#### Toán

$$
T_{\text{xấu}}(n)=\lfloor \log_2 n \rfloor + 1
$$

Mỗi bước khoảng còn $\le$ một nửa. $n=8=2^3$ → tối đa 4. $n=10^6$ → $\approx 20$.  
Đệ quy: $T(n)=T(\lfloor n/2\rfloor)+O(1)$. Phụ vòng `while`: $O(1)$.

#### Ứng dụng thực tế

| Tình huống | Vì sao nhị phân |
|------------|-----------------|
| Sổ điểm **đã sort MSSV**, tra nhiều lần | Sort một lần, mỗi lần $\log n$ |
| Từ điển / danh bạ alphabet | “Mở giữa sách” |
| Tìm ngưỡng trên dãy tăng (ngày, điểm sàn) | |

**Cấm:** chưa sort; DSLK đơn (không nhảy giữa).

```cpp
int TimNhiPhanDQ(int a[], int L, int R, int x) {
    if (L > R) return -1;
    int M = (L + R) / 2;
    if (a[M] == x) return M;
    if (a[M] < x) return TimNhiPhanDQ(a, M + 1, R, x);
    return TimNhiPhanDQ(a, L, M - 1, x);
}
// gọi: TimNhiPhanDQ(a, 0, n - 1, x);
```

$T(n)=T(n/2)+O(1)\Rightarrow O(\log n)$. Stack đệ quy $O(\log n)$. Bản `while` phụ $O(1)$ — ưu tiên thi.

Mảng **giảm:** đổi nhánh `a[M] < x` thành đi **trái** (vì trái lớn hơn). Hoặc so với bản tăng: đừng lẫn.

#### H. $O$, ưu / nhược

| | |
|---|---|
| Thời gian | $O(\log n)$ tốt / TB / xấu (cùng bậc) |
| Phụ | $O(1)$ vòng; $O(\log n)$ đệ quy |
| Ưu | $n=10^6$ ~ 20 so sánh (Ch.1) |
| Nhược | Phải sort; code dễ sai `L=M` không `+1` (lặp vô hạn) |

**Bẫy 2.1.3**

1. Mảng chưa sort.
2. `while (L < R)` quên trường hợp $L=R$ còn một ô.
3. `L = M` khi $a[M]<x` — `M` đã loại, dễ kẹt.
4. Trùng khóa: bản này trả **một** vị trí giữa, không nhất thiết trái nhất.
5. `==` chuỗi.

#### I. So tuần tự và nhị phân

Cùng $a$ đã tăng, $n=8$, $x$ không có: tuần tự 8 so sánh; nhị phân ~4. $n$ lớn khe càng rộng. **Một** lần tìm $n=10$ chưa sort: đừng sort rồi nhị phân.

```
  n tăng →
  so sánh
    ▲
    │  tuần tự ────────────
    │           ╱
    │  nhị phân
    └────────────────────── n
```

### ✅ Kiểm tra nhanh 2.1.3

1. Nhị phân yêu cầu mảng thế nào?
2. $n=16$, xấu khoảng bao nhiêu so sánh (bậc)?
3. `[2,4,6,8,10,12,14,16]`, tìm $10$: $M$ lần 1?
4. `L=M` thay vì `L=M+1` khi đi phải — rủi ro?

**Đáp án:** (1) Đã sắp một chiều. (2) $O(\log n)$, ~4–5. (3) $(0+7)/2=3$, $a[3]=8<10$. (4) `M` không tiến, vòng có thể không kết.

---

### 2.1.4. Tìm kiếm nội suy (Interpolation Search)

Giáo trình thực hành Phần 1: **ba** phương pháp bắt buộc — tuần tự, nhị phân, nội suy. Đề thi hỏi $O$ và bắt viết `TimNoiSuy`.

#### A. Ý tưởng (zero)

Nhị phân **luôn** mở giữa trang từ điển. Nội suy hỏi: “$x$ nằm khoảng bao nhiêu phần trên đoạn giá trị?” rồi nhảy tới vị trí **ước lượng**.

Ẩn dụ: danh bạ 100 trang, tên bắt đầu `A`…`Z` đều. Tìm “Nguyen” (~chữ N, giữa bảng chữ) → mở khoảng trang 50, không mở trang 50 vì “luôn giữa số trang” mà vì **tỷ lệ giá trị**.

```
  a tăng, phân bố đều:

  a[L] = 1                         a[R] = 19
  ├────────────────────────────────┤
  1    3    5    7    9   11  13  15  17  19
                           ▲
                      x = 13  →  ước gần chỉ số 6, không phải giữa (chỉ số 4)
```

**Điều kiện:**

1. Mảng **đã tăng** (như nhị phân).
2. Giá trị **trải khá đều** — khoảng cách các phần tử không nhảy cóc quá lệch. Lệch mạnh → có thể chậm hơn nhị phân, xấu $O(n)$.

#### Lưu đồ

```
              ┌──────────┐
              │  Bắt đầu │
              └────┬─────┘
                   ▼
         L ← 0, R ← n−1
                   ▼
     ┌─────────────────────────────┐ không
┌───►│ L≤R và x trong [a[L],a[R]] ?├────► return −1
│    └─────────────┬───────────────┘
│               có │
│                  ▼
│           ┌────────────┐  có
│           │  L = R ?   ├────► return (a[L]=x ? L : −1)
│           └─────┬──────┘
│              không
│                  ▼
│         pos ← công thức nội suy
│                  ▼
│           ┌────────────┐  có
│           │ a[pos]=x ? ├────► return pos
│           └─────┬──────┘
│              không
│                  ▼
│           a[pos]<x ? ──có──► L ← pos+1
│              không
│                  ▼
│              R ← pos−1
│                  │
└──────────────────┘
```

#### B. Công thức (thuộc, chia nguyên)

$$
\mathrm{pos} = L + \frac{(x - a[L])\cdot (R - L)}{a[R] - a[L]}
$$

| Thành phần | Ý |
|------------|---|
| $x-a[L]$ | “$x$ hơn đầu đoạn bao nhiêu” |
| $a[R]-a[L]$ | “Cả đoạn giá trị dài bao nhiêu” |
| Tỷ lệ $\times (R-L)$ | Đổi tỷ lệ giá trị ra số ô |

C++ (chia nguyên, đúng đề):

```cpp
int pos = L + ((x - a[L]) * (R - L)) / (a[R] - a[L]);
```

**Bắt buộc** $a[R] \ne a[L]$ (mẫu giáo trình: nếu `L==R` thì so một ô rồi return).  
Nếu $x < a[L]$ hoặc $x > a[R]$ → **không có**, return $-1$ (không tính `pos`).

#### C. Mã giả và C++ (khớp giáo trình)

```
THUẬT TOÁN TimNoiSuy(a, n, x) → i hoặc −1     // a tăng
1. L ← 0, R ← n−1
2. while L ≤ R và x ≥ a[L] và x ≤ a[R]
3.     nếu L = R thì
4.         nếu a[L] = x thì trả về L else −1
5.     pos ← L + ((x − a[L]) × (R − L)) / (a[R] − a[L])
6.     nếu a[pos] = x thì trả về pos
7.     nếu a[pos] < x thì L ← pos+1
8.     ngược lại R ← pos−1
9. trả về −1
```

```cpp
int TimNoiSuy(int a[], int n, int x) {
    int L = 0, R = n - 1;
    while (L <= R && x >= a[L] && x <= a[R]) {
        if (L == R)
            return (a[L] == x) ? L : -1;
        int pos = L + ((x - a[L]) * (R - L)) / (a[R] - a[L]);
        if (a[pos] == x) return pos;
        if (a[pos] < x) L = pos + 1;
        else R = pos - 1;
    }
    return -1;
}
```

Bản đếm `ss`: `ss++` mỗi lần so `a[pos] == x` (và lần `a[L]==x` khi `L==R`).

```cpp
int TimNoiSuy(int a[], int n, int x, int &ss) {
    ss = 0;
    int L = 0, R = n - 1;
    while (L <= R && x >= a[L] && x <= a[R]) {
        if (L == R) {
            ss++;
            return (a[L] == x) ? L : -1;
        }
        int pos = L + ((x - a[L]) * (R - L)) / (a[R] - a[L]);
        ss++;
        if (a[pos] == x) return pos;
        if (a[pos] < x) L = pos + 1;
        else R = pos - 1;
    }
    return -1;
}
```

#### D. Chạy tay — phân bố đều (ví dụ giáo trình)

$a = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]$, $n=10$, chỉ số $0..9$, $x=13$.

$$
\mathrm{pos} = 0 + \frac{(13-1)\cdot(9-0)}{19-1} = \frac{12\cdot 9}{18} = 6
$$

$a[6]=13$ → **một** so sánh, trả 6.

Cùng mảng, tuần tự: 7 so sánh (đi $1,3,\ldots,13$). Nhị phân: 4 bước (giữa 9 → 15 → 11 → 13). Đó là lý do giáo trình gọi nội suy “nhanh khi đều”.

$x=1$ (mép trái): $\mathrm{pos}=0+(0\cdot 9)/18=0$, trúng ngay.  
$x=19$: $\mathrm{pos}=0+(18\cdot 9)/18=9$, trúng ngay.  
$x=0$ hoặc $x=20$: điều kiện `x >= a[L] && x <= a[R]` sai ngay → $-1$, **không** chia.

#### E. Chạy tay — không trúng lần đầu

Cùng mảng, $x=15$:

$$
\mathrm{pos} = 0 + \frac{(15-1)\cdot 9}{18} = \frac{14\cdot 9}{18} = 7
$$

(chia nguyên $126/18=7$). $a[7]=15$ → vẫn một bước.

$x=11$: $(11-1)*9/18=90/18=5$, $a[5]=11$.

Dãy **cách đều 2** nên công thức gần như “đúng chỗ”. Đó là trường hợp tốt $O(\log\log n)$ — với dãy đều thường **rất ít** bước, đôi khi 1.

#### F. Khi lệch — xấu $O(n)$ (phải nói được)

```
  a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1000]    // 9 số nhỏ, một số khổng
  tìm x = 9
```

$a[R]-a[L]=999$, $x-a[L]=8$, $R-L=9$:

$$
\mathrm{pos} = 0 + \frac{8\cdot 9}{999} = 0
$$

$a[0]=1 < 9$ → $L=1$. Lần sau vẫn ước gần đầu mảng. Có thể **bò từng ô** → xấu như tuần tự $O(n)$. Nhị phân trên mảng này vẫn $O(\log n)$.

**Kết luận chọn:** đều → nội suy; không chắc đều → nhị phân; chưa sort → tuần tự.

#### G. $O$, ưu / nhược, so ba thuật toán

| | Tuần tự | Nhị phân | Nội suy |
|---|----------|----------|---------|
| Mảng | mọi | đã sắp | đã sắp + khá đều |
| Tốt | $O(1)$ | $O(1)$ | $O(1)$ (trúng `pos`) |
| TB | $O(n)$ | $O(\log n)$ | $O(\log\log n)$ nếu đều |
| Xấu | $O(n)$ | $O(\log n)$ | **$O(n)$** nếu lệch |
| Phụ | $O(1)$ | $O(1)$ | $O(1)$ |

Đề điền chỗ trống: nội suy tốt $O(\log\log n)$, xấu $O(n)$, cần mảng **đã sắp**.

#### Ứng dụng thực tế

| Tình huống | Vì sao nội suy |
|------------|----------------|
| Mã SV / số báo danh **tăng đều** (SV001, SV002, …) | `pos` gần đúng chỗ |
| Bảng điểm 0, 0.5, 1, … 10 cách đều | Ít bước hơn nhị phân |
| Dữ liệu nhảy cóc (1,2,3,…,9,1000) | **Đừng** — dùng nhị phân |

**Bẫy 2.1.4**

1. Không kiểm $x$ ngoài $[a[L], a[R]]$ → `pos` âm hoặc $>R$, vượt biên.
2. `L==R` mà vẫn chia $a[R]-a[L]=0$.
3. Nhân `(x-a[L])*(R-L)` tràn `int` khi số lớn — đề $n\le 100$, giá trị nhỏ thì ổn; biết là có.
4. Mảng chưa sort / giảm dần.
5. Nhầm “nội suy luôn nhanh hơn nhị phân” — **sai** khi phân bố lệch.

### ✅ Kiểm tra nhanh 2.1.4

1. Công thức `pos`? Khi nào **cấm** tính?
2. `[1,3,5,7,9,11,13,15,17,19]`, $x=13$: `pos` = ? $a[\mathrm{pos}]$?
3. Tốt / xấu (ký hiệu $O$)?
4. Mảng lệch, tìm gần max của cụm nhỏ — nội suy hay nhị phân an toàn hơn?

**Đáp án:** (1) $L + (x-a[L])(R-L)/(a[R]-a[L])$; cấm khi $a[R]=a[L]$ hoặc $x$ ngoài đoạn. (2) $6$, $13$. (3) $O(\log\log n)$ / $O(n)$. (4) Nhị phân.

---

## 2.2. BÀI TOÁN SẮP XẾP

### 2.2.1. Khái niệm

#### A. Bài toán

**Sắp xếp:** đưa $a[0..n-1]$ về thứ tự theo khóa (thường **tăng**: $a[0]\le a[1]\le\cdots\le a[n-1]$).

```
  TRƯỚC                 SAU (tăng)
  ┌─┬─┬─┬─┐            ┌─┬─┬─┬─┐
  │5│1│4│2│            │1│2│4│5│
  └─┴─┴─┴─┘            └─┴─┴─┴─┘
```

Giảm: đổi mọi `>` thành `<` (và ngược lại) trong so sánh.

Sau khi sắp: tìm nhị phân được; in “top điểm”; gộp hai danh sách (Merge).

#### B. Ổn định và tại chỗ

**Ổn định:** hai hồ sơ **cùng khóa**, ai đứng trước lúc vào thì vẫn đứng trước lúc ra.

```
  Vào (cùng điểm 8, khác tên):  An(8),  Binh(8),  Chi(7)
  Sort ổn định theo điểm tăng:  Chi(7), An(8), Binh(8)
                                 An vẫn trước Binh
  Sort KHÔNG ổn định:           Chi(7), Binh(8), An(8)   ← có thể
```

Thi lý thuyết: Insertion / Merge / Bubble (so `>`) thường **ổn định**. Selection / Interchange / Heap / Quick (bản partition nhảy) **không** (hoặc không đảm bảo).

**Tại chỗ:** không cấp mảng $n$ phần tử phụ. Merge **không** tại chỗ (cần `tmp[]`). Quick tại chỗ về mảng, nhưng stack đệ quy $O(\log n)$ trung bình.

#### C. Họ $O(n^2)$ và họ $O(n\log n)$

| Họ | Mục | $O$ xấu điển hình | $n=10^5$ |
|----|-----|-------------------|----------|
| Đơn giản (2.2.2) | So cặp, lồng hai vòng | $O(n^2)$ | nặng |
| Nhanh (2.2.3) | Chia để trị / heap / chữ số | $O(n\log n)$ hoặc $O(d(n+k))$ | vừa |

Cận dưới **sort so sánh**: $\Omega(n\log n)$ trung bình. Radix **không** so hai khóa nguyên — đi từng chữ số, nên có thể $O(n)$ theo $n$ khi $d,k$ nhỏ.

#### D. Tiêu chuẩn chọn (nối 1.2)

1. $n$ nhỏ / bài tập: bốn thuật toán 2.2.2 — dễ vẽ, dễ thi viết tay.
2. $n$ lớn, so sánh khóa: Merge (ổn định, $O(n\log n)$ luôn) hoặc Quick (TB nhanh, xấu $O(n^2)$).
3. Cần $O(n\log n)$ luôn + phụ $O(1)$: Heap.
4. Khóa là số nguyên không âm, nhiều chữ số ít: Radix.

#### E. Ứng dụng sắp xếp trong đề án (thực tế khóa này)

| Việc | Thuật toán gợi ý |
|------|------------------|
| 40 SV, in theo tên / điểm — đề thi | Insertion (điểm), Selection (tên) |
| Thêm 1 hồ sơ vào ds **đã** sort | Insertion $O(n)$ |
| Hai lớp đã sort MSSV, gộp một danh sách | Merge |
| 10 000 điểm, không cần ổn định | Quick (tránh file đã tăng + pivot cuối) hoặc Heap |
| Xếp MSSV / số báo danh | Radix |
| Thi viết tay, $n=4$…$6$ | Interchange / Bubble / Selection — vẽ từng bước |

Không bịa “Google dùng Quick”. Trong môn: **quản lý sinh viên trên mảng** (thực hành bài 5) là ứng dụng đủ để thi.

### ✅ Kiểm tra nhanh 2.2.1

1. Ổn định quan trọng khi nào?
2. Merge tại chỗ không? Heap?
3. Sort xong mới nhị phân: chi phí một lần tìm $n$ nhỏ — có đáng?

**Đáp án:** (1) Sắp theo khóa 2 nhưng muốn giữ thứ tự khóa 1. (2) Merge không; Heap coi là tại chỗ. (3) Thường không — dùng tuần tự.

---

### 2.2.2. Các thuật toán sắp xếp đơn giản

Cả bốn: hai vòng, $O(n^2)$, phụ $O(1)$, dễ viết. **Khác nhau chỗ so với ai, đổi lúc nào.** Học thuộc khác biệt Interchange ≠ Selection — đề / Ch.3 `SapXep` là Interchange.

Mảng minh họa xuyên suốt: **`[5, 1, 4, 2]`**.

```
Hoán đổi hai ô (dùng mọi thuật toán):

void DoiCho(int &x, int &y) {
    int t = x; x = y; y = t;
}
```

Ba phép gán — đề thực hành đếm `gan += 3`.

---

#### 2.2.2.a. Sắp xếp đổi chỗ trực tiếp (Interchange Sort)

**Ý tưởng:** Người ở vị trí $i$ nhìn **mọi** người phía sau ($j=i+1..n-1$). Hễ $a[i] > a[j]$ thì **đổi ngay**, rồi nhìn $j$ tiếp theo. Sau vòng $i$, ô $i$ đã là min của đoạn $i..n-1$.

Đây là bản mảng của Ch.3 `SapXep`. **Không** phải Selection: Selection tìm **một** chỉ số min rồi đổi **một lần**.

#### Lưu đồ

```
         Bắt đầu → i ← 0
              ▼
     ┌────────────────┐ không
┌───►│   i ≤ n−2 ?    ├────► Kết thúc
│    └───────┬────────┘
│         có │
│            ▼
│       j ← i+1
│            ▼
│     ┌────────────────┐ không
│ ┌──►│   j ≤ n−1 ?    ├──► i ← i+1 ──┐
│ │   └───────┬────────┘              │
│ │        có │                       │
│ │           ▼                       │
│ │    a[i] > a[j] ?                  │
│ │     có: đổi a[i] ↔ a[j]           │
│ │           ▼                       │
│ │       j ← j+1                     │
│ └───────────┘                       │
└─────────────────────────────────────┘
```

```
THUẬT TOÁN InterchangeSort(a, n)          // tang dan
1. i ← 0
2. while i ≤ n-2
3.     j ← i+1
4.     while j ≤ n-1
5.         nếu a[i] > a[j] thì đổi a[i] ↔ a[j]
6.         j ← j+1
7.     i ← i+1
```

```cpp
void InterchangeSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = i + 1; j < n; j++)
            if (a[i] > a[j])
                DoiCho(a[i], a[j]);
}
```

**Chạy tay `[5, 1, 4, 2]`** — sau mỗi đổi, $a[i]$ **đã mới**, so tiếp với giá trị mới (giống bảng Ch.3):

| $i$ | $j$ | So | Đổi? | Mảng sau |
|-----|-----|-----|------|----------|
| 0 | 1 | 5>1 | có | **1**, 5, 4, 2 |
| 0 | 2 | 1>4 | không | 1, 5, 4, 2 |
| 0 | 3 | 1>2 | không | **1**, 5, 4, 2 |
| 1 | 2 | 5>4 | có | 1, **4**, 5, 2 |
| 1 | 3 | 4>2 | có | 1, **2**, 5, 4 |
| 2 | 3 | 5>4 | có | 1, 2, **4**, **5** |

Số so sánh luôn $n(n-1)/2=6$. Số đổi: 4 (nhiều hơn Selection trên cùng mảng).

#### Toán

Số cặp $(i,j)$ với $0\le i<j\le n-1$:

$$
C = \frac{n(n-1)}{2}=\Theta(n^2)
$$

Luôn đủ $C$ so sánh (kể cả mảng đã tăng). Số lần đổi: $0$ … $C$ tùy dữ liệu.

#### Ứng dụng thực tế

Dùng khi **$n$ nhỏ**, đề bắt “đổi chỗ trực tiếp”, hoặc sort DSLK hoán `data` (Ch.3 `SapXep`). Không dùng danh sách 10 000 SV mỗi lần F5.

**Bẫy:** nộp Selection khi đề “đổi chỗ trực tiếp”. Nhìn code: có `min_idx` không? Không → Interchange.

---

#### 2.2.2.b. Sắp xếp chọn trực tiếp (Selection Sort)

**Ý tưởng:** Mỗi vòng $i$, **tìm chỉ số** phần tử nhỏ nhất trên $i..n-1$, rồi đổi **một lần** với $a[i]$.

```
  i=0:  [5, 1, 4, 2]  min ở j=1 (số 1)  đổi với a[0]
        [1 | 5, 4, 2]     ô 0 xong
  i=1:  min của 5,4,2 là 2  đổi với a[1]
        [1, 2 | 4, 5]
  i=2:  min của 4,5 là 4    đã đúng chỗ
        [1, 2, 4, 5]
```

#### Lưu đồ

```
    Bắt đầu → i ← 0
         ▼
  ┌──────────────┐ không
  │  i ≤ n−2 ?   ├────► Kết thúc
  └──┬───────────┘
  có │
     ▼
  min ← i ; j ← i+1
     ▼
  ┌──────────────┐ không
  │  j ≤ n−1 ?   ├────► (min≠i thì đổi a[i]↔a[min]) → i++ → lặp
  └──┬───────────┘
  có │
     ▼
  a[j] < a[min] ?  có: min ← j
     ▼
  j ← j+1 → (lặp vòng j)
```

```
THUẬT TOÁN SelectionSort(a, n)
1. for i ← 0 to n-2
2.     min ← i
3.     for j ← i+1 to n-1
4.         nếu a[j] < a[min] thì min ← j
5.     nếu min ≠ i thì đổi a[i] ↔ a[min]
```

```cpp
void SelectionSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min = i;
        for (int j = i + 1; j < n; j++)
            if (a[j] < a[min]) min = j;
        if (min != i)
            DoiCho(a[i], a[min]);
    }
}
```

**Chạy tay** — chỉ đổi khi `min != i`:

| $i$ | `min` (sau vòng trong) | Đổi | Mảng |
|-----|------------------------|-----|-------|
| 0 | 1 (giá trị 1) | 5↔1 | **1**, 5, 4, 2 |
| 1 | 3 (giá trị 2) | 5↔2 | 1, **2**, 4, 5 |
| 2 | 2 (giá trị 4) | không | 1, 2, **4**, 5 |

So sánh vẫn $6$. Đổi chỉ **2** lần.

#### Toán

So sánh **luôn** $C=n(n-1)/2$. Số lần `DoiCho` $\le n-1$ (ưu: ít ghi bộ nhớ). $S=O(1)$. Không ổn định.

#### Ứng dụng thực tế

Đề Phần 1: **sắp theo họ tên** (`strcmp`). Hợp khi swap đắt (struct lớn) vì mỗi vòng ngoài tối đa **một** đổi. $n$ lớn → chuyển Heap/Quick.

---

#### 2.2.2.c. Sắp xếp chèn trực tiếp (Insertion Sort)

**Ý tưởng:** Tay trái đã xếp bài. Rút quân mới (`key = a[i]`), **dời** các quân lớn hơn sang phải, nhét `key` vào lỗ.

```
  sorted | unsorted
  [5]    | 1 4 2      rút 1, dời 5 →  [1 5 | 4 2]
  [1 5]  | 4 2        rút 4, dời 5 →  [1 4 5 | 2]
  [1 4 5]| 2          rút 2, dời 5,4 → [1 2 4 5]
```

#### Lưu đồ

```
   Bắt đầu → i ← 1
        ▼
 ┌─────────────┐ không
 │  i ≤ n−1 ?  ├────► Kết thúc
 └──┬──────────┘
 có │
    ▼
 key ← a[i] ; j ← i−1
    ▼
 ┌──────────────────────────┐ không
 │ j≥0 và a[j] > key ?      ├────► a[j+1] ← key ; i++ → lặp
 └──┬───────────────────────┘
 có │
    ▼
 a[j+1] ← a[j] ; j ← j−1  → (lặp while)
```

```
THUẬT TOÁN InsertionSort(a, n)
1. for i ← 1 to n-1
2.     key ← a[i]
3.     j ← i-1
4.     while j ≥ 0 và a[j] > key
5.         a[j+1] ← a[j]
6.         j ← j-1
7.     a[j+1] ← key
```

```cpp
void InsertionSort(int a[], int n) {
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
}
```

Dùng `>` không `>=` → **ổn định** (gặp bằng thì dừng, `key` đứng sau phần tử bằng).

**Chạy tay `[5, 1, 4, 2]`:**

| $i$ | `key` | Việc dời | Mảng sau chèn |
|-----|-------|----------|----------------|
| 1 | 1 | `a[1]=5` | **1**, **5**, 4, 2 |
| 2 | 4 | `a[2]=5` | 1, **4**, **5**, 2 |
| 3 | 2 | `a[3]=5`, `a[2]=4` | 1, **2**, 4, 5 |

#### Toán

$$
T_{\text{tốt}}=n-1\quad\text{(đã tăng, while không chạy)},\qquad T_{\text{xấu}}=\frac{n(n-1)}{2}\quad\text{(mảng giảm)}
$$

Ổn định nếu so `>`. $S=O(1)$.

#### Ứng dụng thực tế

Đề: **sắp theo điểm TB**. Thêm 1 SV vào danh sách **đã** sort điểm → Insertion $O(n)$, không cần Quick. Bài đang gõ (gần đúng thứ tự) cũng hợp.

**Bẫy:** `while` thiếu `j>=0` → `a[-1]`. Nhầm dời thành swap kiểu Interchange. **Khác Selection:** không tìm min cả đoạn — chỉ dời để chèn `key`.

---

#### 2.2.2.d. Sắp xếp nổi bọt (Bubble Sort)

**Ý tưởng:** Chỉ so **hai ô kề**. Lớn hơn thì đổi — số lớn “nổi” dần về **cuối**. Mỗi pass $i$ neo chắc `a[n-1-i]`.

```
  Pass 0, so kề:
  5 1 4 2  →  1 5 4 2  →  1 4 5 2  →  1 4 2 5     (5 xong)
  Pass 1:
  1 4 2 |5 →  1 4 2 5  →  1 2 4 5                 (4 xong)
  Pass 2:
  1 2 |4 5 →  không đổi                           xong
```

#### Lưu đồ

```
   Bắt đầu → i ← 0
        ▼
 ┌──────────────┐ không
 │  i ≤ n−2 ?   ├────► Kết thúc
 └──┬───────────┘
 có │
    ▼
 swapped ← false ; j ← 0
    ▼
 ┌──────────────────┐ không
 │ j ≤ n−2−i ?      ├────► swapped=false? có: Kết thúc
 └──┬───────────────┘      không: i++ → lặp
 có │
    ▼
 a[j] > a[j+1] ?  có: đổi, swapped ← true
    ▼
 j ← j+1 → (lặp j)
```

```
THUẬT TOÁN BubbleSort(a, n)
1. for i ← 0 to n-2
2.     swapped ← false
3.     for j ← 0 to n-2-i
4.         nếu a[j] > a[j+1] thì đổi; swapped ← true
5.     nếu swapped = false thì break    // da sort
```

```cpp
void BubbleSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                DoiCho(a[j], a[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}
```

Không `swapped`: vẫn đúng, mất cờ dừng sớm. Thực hành có cờ.

**Chạy tay** (có cờ):

| Pass $i$ | Các so kề (mảng biến) | `swapped` | Cuối pass |
|----------|----------------------|-----------|-----------|
| 0 | 5↔1, 5↔4, 5↔2 | true | 1, 4, 2, **5** |
| 1 | 1–4, 4↔2 | true | 1, 2, **4**, 5 |
| 2 | 1–2 | false | **break** |

#### Toán

Không cờ: $C=n(n-1)/2$ so sánh kề. Có cờ + mảng tăng: $T=n-1=O(n)$. Xấu (giảm): $\Theta(n^2)$. Ổn định (so `>`).

#### Ứng dụng thực tế

Dạy / thi viết tay (dễ vẽ “bọt nổi”). Kiểm tra mảng **đã** sort: một pass, `swapped=false`. $n$ lớn không dùng.

**Khác Interchange:** chỉ so **kề**. **Bẫy:** `j < n-1` không trừ `i` thì so thừa; `j <= n-1` vượt `a[j+1]`.

---

#### e. Bốn thuật toán trên một tờ — thuộc để thi

Cùng $n$, số so sánh Interchange = Selection = $n(n-1)/2$. Bubble (không cờ) cùng bậc, số so sánh $n(n-1)/2$ luôn. Insertion **thay đổi** theo dữ liệu.

| | So với ai | Đổi khi nào | Ổn định | Tốt |
|---|-----------|-------------|----------|-----|
| Interchange | $a[i]$ và mọi $a[j]$ sau | Hễ `a[i]>a[j]` | Không | Không (luôn $n^2$) |
| Selection | Tìm min đoạn | **Một** swap / $i$ | Không | Không (luôn $n^2$ so) |
| Insertion | Dời đoạn đã sort | Chèn `key` | Có | Đã tăng $O(n)$ |
| Bubble | Hai ô **kề** | Đổi kề | Có | Đã tăng $O(n)$ nếu có cờ |

```
  i cố định:
  Interchange:  a[i] ⇔ a[i+1], a[i+2], ...     (nhiều swap)
  Selection:    tìm min rồi  a[i] ⇔ a[min]     (≤ 1 swap)
  Bubble:       a[0]⇔a[1], a[1]⇔a[2], ...      (sóng kề)
  Insertion:    lấy a[i] nhét vào a[0..i-1]
```

### ✅ Kiểm tra nhanh 2.2.2

1. Ch.3 `SapXep` hai vòng, gặp lớn thì đổi `data` ngay — tên thuật toán?
2. Selection đổi tối đa bao nhiêu lần?
3. Insertion tốt khi nào? Bubble xấu khi nào?
4. `[5,1,4,2]` Interchange: sau $i=0$ mảng?

**Đáp án:** (1) Đổi chỗ trực tiếp. (2) $n-1$. (3) Đã (gần) tăng; mảng giảm. (4) `[1, 5, 4, 2]`.

---

### 2.2.3. Các thuật toán sắp xếp nhanh

$n$ lớn: $n^2$ không chơi (Ch.1: $n=10^6$ → $10^{12}$). Bốn giải thuật dưới: chia để trị hoặc không so cả khóa.

---

#### 2.2.3.a. Sắp xếp trộn (Merge Sort)

**Ý tưởng:** Chia mảng đôi đến còn 1 phần tử (đã “sort”). **Trộn** hai đoạn **đã sort** thành một đoạn sort.

```
        [5, 1, 4, 2]
         /         \
     [5, 1]       [4, 2]
      /   \        /   \
    [5]  [1]    [4]   [2]
      \   /        \   /
     [1, 5]       [2, 4]
         \         /
        [1, 2, 4, 5]
```

#### Lưu đồ (một lời gọi MergeSort)

```
              ┌─────────────────────┐
              │ MergeSort(left,right)│
              └──────────┬──────────┘
                         ▼
                  left ≥ right ?
                   có → return
                         không
                         ▼
                  mid ← (left+right)/2
                         ▼
              MergeSort(left, mid)
                         ▼
              MergeSort(mid+1, right)
                         ▼
              Merge(left, mid, right)
```

Lưu đồ **Merge**: hai con trỏ đầu nửa; lấy phần tử nhỏ hơn; hết một nửa thì copy phần còn.

```
THUẬT TOÁN Merge(a, left, mid, right)     // a[left..mid], a[mid+1..right] da sort

```
  L: 1 5        R: 2 4        out:
  ▲             ▲
  1<2 → lấy 1                  1
    ▲           ▲
    5>2 → lấy 2                1 2
    ▲             ▲
    5>4 → lấy 4                1 2 4
    ▲
    lấy 5                      1 2 4 5
```

```
THUẬT TOÁN Merge(a, left, mid, right)     // a[left..mid], a[mid+1..right] da sort
1. chép hai nửa vào tmp
2. i ← đầu nửa trái, j ← đầu nửa phải, k ← left
3. while còn cả hai nửa
4.     nếu tmp[i] ≤ tmp[j] thì a[k] ← tmp[i], i++   // ≤ để ổn định
5.     else a[k] ← tmp[j], j++
6.     k++
7. chép phần còn lại

THUẬT TOÁN MergeSort(a, left, right)
1. nếu left ≥ right thì return
2. mid ← (left + right) / 2
3. MergeSort(a, left, mid)
4. MergeSort(a, mid+1, right)
5. Merge(a, left, mid, right)
```

```cpp
void Merge(int a[], int left, int mid, int right) {
    int n1 = mid - left + 1, n2 = right - mid;
    int *L = new int[n1], *R = new int[n2];
    for (int i = 0; i < n1; i++) L[i] = a[left + i];
    for (int j = 0; j < n2; j++) R[j] = a[mid + 1 + j];
    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) a[k++] = L[i++];
        else a[k++] = R[j++];
    }
    while (i < n1) a[k++] = L[i++];
    while (j < n2) a[k++] = R[j++];
    delete[] L;
    delete[] R;
}

void MergeSort(int a[], int left, int right) {
    if (left >= right) return;
    int mid = (left + right) / 2;
    MergeSort(a, left, mid);
    MergeSort(a, mid + 1, right);
    Merge(a, left, mid, right);
}
// goi: MergeSort(a, 0, n - 1);
```

`new` không kiểm `NULL` (quy ước Ch.3). Có thể dùng một `tmp[MAX]` toàn cục cho đề $n$ nhỏ.

**Chạy tay đủ cây** `[5, 1, 4, 2]`, `MergeSort(a, 0, 3)`:

| Gọi | `left,right` | Việc | Mảng `a` sau bước |
|-----|--------------|------|-------------------|
| MS(0,3) | chia mid=1 | gọi trái, phải, rồi Merge | |
| MS(0,1) | mid=0 | `[5]` và `[1]` | |
| Merge(0,0,1) | trộn 5 và 1 | | **1, 5**, 4, 2 |
| MS(2,3) | | `[4]` và `[2]` | 1, 5, **2, 4** sau Merge(2,2,3) |
| Merge(0,1,3) | trộn `[1,5]` với `[2,4]` | lấy 1,2,4,5 | **1, 2, 4, 5** |

Trộn `Merge(0,1,3)` từng phần tử:

| So `L[i]` ? `R[j]` | Lấy | `a[k]` đang thành |
|--------------------|-----|-------------------|
| 1 ≤ 2 | 1 | 1, … |
| 5 ≤ 2? không | 2 | 1, 2, … |
| 5 ≤ 4? không | 4 | 1, 2, 4, … |
| hết R | 5 | 1, 2, 4, 5 |

Mỗi tầng trộn $O(n)$, sâu $\log n$ tầng → **luôn** $O(n\log n)$. Phụ $O(n)$. Ổn định nếu lấy trái khi `<=`.

#### Toán

$$
T(n)=2T(n/2)+O(n),\quad T(1)=O(1) \;\Longrightarrow\; T(n)=O(n\log n)
$$

(cây đệ quy: $\log_2 n$ tầng, mỗi tầng tổng việc trộn $O(n)$). $S=O(n)$ mảng phụ.

#### Ứng dụng thực tế

Gộp hai danh sách lớp **đã sort MSSV**. Cần **ổn định** (sort điểm rồi sort tên, tên bằng thì giữ thứ tự điểm). DSLK: Merge hợp hơn Quick (Ch.3).

**Bẫy:** quên copy phần còn lại; `mid` không chia; so `<` thay `<=` mất ổn định.

---

#### 2.2.3.b. Sắp xếp nhanh (Quick Sort)

**Ý tưởng:** Chọn **chốt (pivot)**. Đưa phần tử $<$ pivot sang trái, $\ge$ sang phải. Pivot đúng chỗ. Đệ quy hai bên.

Đề thi / thực hành: pivot = **`a[high]`**, partition **Lomuto**.

```
  [5, 1, 8, 2]     pivot = 2 (cuối)
   1 đi trái, rồi đặt 2 vào giữa
  [1]  2  [8, 5]
            pivot 5 → [5, 8]
  [1, 2, 5, 8]
```

#### Lưu đồ

```
         ┌──────────────────────┐
         │ QuickSort(low, high) │
         └──────────┬───────────┘
                    ▼
              low < high ?
               không → return
                    có
                    ▼
         p ← partition(low, high)
                    ▼
         QuickSort(low, p−1)
                    ▼
         QuickSort(p+1, high)
```

`partition`: `pivot=a[high]`; `j` quét; `a[j]<pivot` thì dồn trái; cuối đặt pivot vào `p`.

**Partition Lomuto** — chạy tay `[5, 1, 8, 2]`, `low=0`, `high=3`, `pivot=2`, `i=low-1=-1`:

| $j$ | `a[j] < pivot`? | Việc | Mảng | $i$ |
|-----|-----------------|------|-------|-----|
| 0 | 5<2? không | | 5,1,8,2 | −1 |
| 1 | 1<2? có | $i=0$, đổi `a[0]`↔`a[1]` | **1**,5,8,2 | 0 |
| 2 | 8<2? không | | 1,5,8,2 | 0 |
| đặt pivot | đổi `a[1]`↔`a[3]` | | 1,**2**,8,5 | trả $i+1=1$ |

Trái `[1]` (một phần tử, xong). Phải `[8, 5]` — `QuickSort(a, 2, 3)`:

| $j$ | `a[j]<5`? | Việc | Mảng |
|-----|-----------|------|-------|
| 2 | 8<5? không | | 1, 2, 8, 5 |
| đặt pivot | đổi `a[2]`↔`a[3]` | 1, 2, **5**, **8** | trả 2 |

Hai bên của 5 rỗng. Xong `[1, 2, 5, 8]`.

**Xấu — mảng đã tăng, pivot cuối.** `[1, 2, 4, 5]`, `high=3`, pivot=5: không ai `<5`, đặt pivot vẫn ở cuối, trái còn $n-1$ phần tử. Mỗi lần cắt 1 ô → $n+(n-1)+\cdots = \Theta(n^2)$.

```
THUẬT TOÁN partition(a, low, high) → vị trí pivot
1. pivot ← a[high]
2. i ← low − 1
3. for j ← low to high−1
4.     nếu a[j] < pivot thì i++; đổi a[i] ↔ a[j]
5. đổi a[i+1] ↔ a[high]
6. trả về i+1

THUẬT TOÁN QuickSort(a, low, high)
1. nếu low < high
2.     p ← partition(a, low, high)
3.     QuickSort(a, low, p−1)
4.     QuickSort(a, p+1, high)
```

```cpp
int partition(int a[], int low, int high) {
    int pivot = a[high];
    int i = low - 1;
    for (int j = low; j <= high - 1; j++) {
        if (a[j] < pivot) {
            i++;
            DoiCho(a[i], a[j]);
        }
    }
    DoiCho(a[i + 1], a[high]);
    return i + 1;
}

void QuickSort(int a[], int low, int high) {
    if (low < high) {
        int p = partition(a, low, high);
        QuickSort(a, low, p - 1);
        QuickSort(a, p + 1, high);
    }
}
// goi: QuickSort(a, 0, n - 1);
```

| | |
|---|---|
| TB / tốt | Chia khá đều, $O(n\log n)$ |
| Xấu | Pivot luôn min hoặc max (mảng **đã tăng/giảm**, chốt cuối) → $O(n^2)$ |
| Phụ | Stack $O(\log n)$ TB, $O(n)$ xấu |
| Ổn định | Không (đổi không kề) |

Đề: “Quick xấu khi mảng đã sort” — đúng **với pivot cuối**. (Pivot ngẫu nhiên / median-of-three giảm xác suất xấu — nâng cao, không bắt.)

#### Toán

Chia đều: $T(n)=2T(n/2)+O(n)=O(n\log n)$.  
Chia lệch (pivot min/max): $T(n)=T(n-1)+O(n)=\Theta(n^2)$.  
TB (pivot “ngẫu nhiên”): $O(n\log n)$. Stack TB $O(\log n)$, xấu $O(n)$.

#### Ứng dụng thực tế

Mảng số nguyên $n$ lớn, **không** cần ổn định (điểm không trùng, hoặc chấp nhận đảo người bằng điểm). Tránh pivot cuối trên dữ liệu **đã** tăng (file xuất đã sort).

**Bẫy:** `QuickSort(a, n)` thiếu `low, high`; đệ quy gồm **cả** pivot (`p` không `p-1`); `a[j] <= pivot` dồn bằng sang trái — vẫn sort, khác chỗ bằng.

---

#### 2.2.3.c. Sắp xếp vun đống (Heap Sort)

**Đống max (max-heap):** cây nhị phân **hoàn chỉnh** (lấp trái → phải), mọi nút **≥ hai con**. Cất bằng **mảng** (không cần `TNode` Ch.5):

$$
\text{cha}(i)=\lfloor(i-1)/2\rfloor,\quad \text{trái}=2i+1,\quad \text{phải}=2i+2
$$

($i$ từ $0$.)

```
  Mảng [4, 10, 3, 5, 1]

         4                 chỉ số 0
       /   \
     10     3              1     2
    /  \
   5    1                  3     4
```

**Heapify** (sàng xuống từ $i$, trong heap kích thước `size`): nếu con lớn hơn cha thì đổi với con **lớn nhất**, lặp xuống.

#### Lưu đồ HeapSort

```
  Bắt đầu
     ▼
  i ← n/2 − 1 … 0:  heapify(n, i)     ← dựng max-heap
     ▼
  i ← n−1 … 1:
       đổi a[0] ↔ a[i]
       heapify(i, 0)                  ← neo max về cuối
     ▼
  Kết thúc
```

`heapify(i)`: so `a[i]` với hai con; nếu con lớn hơn thì đổi và sàng tiếp.

**Heap Sort:**

1. **Dựng heap:** `heapify` từ nút cha cuối `n/2-1` về `0`.
2. **Lặp:** đổi `a[0]` (max) với `a[size-1]`; giảm `size`; `heapify(0)`.

```
  Sau dựng max-heap: [10, 5, 3, 4, 1]
         10
        /  \
       5    3
      / \
     4   1

  Đổi 10 ↔ 1, heap size=4, sàng 1 → ... 10 đã neo cuối
  ...
  Kết quả tăng dần ở mảng
```

```cpp
void heapify(int a[], int size, int i) {
    int largest = i;
    int L = 2 * i + 1, R = 2 * i + 2;
    if (L < size && a[L] > a[largest]) largest = L;
    if (R < size && a[R] > a[largest]) largest = R;
    if (largest != i) {
        DoiCho(a[i], a[largest]);
        heapify(a, size, largest);
    }
}

void HeapSort(int a[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(a, n, i);
    for (int i = n - 1; i > 0; i--) {
        DoiCho(a[0], a[i]);
        heapify(a, i, 0);
    }
}
```

**Chạy tay dựng heap** `[4, 10, 3, 5, 1]`, $n=5$, bắt đầu $i=n/2-1=1$ (nút 10): con 5,1 — 10 đã ≥. $i=0$ (nút 4): con 10,3 — 10 lớn hơn, đổi 4↔10 → `[10, 4, 3, 5, 1]`; sàng tiếp nút 4 với 5,1 → đổi 4↔5 → `[10, 5, 3, 4, 1]`.

**Lượt sort** (đổi gốc với cuối, giảm size, sàng):

| Size trước | Đổi `a[0]`↔`a[size-1]` | Sàng gốc | Ý |
|------------|-------------------------|----------|---|
| 5 | 10↔1 → `[1, 5, 3, 4, 10]` | 1 xuống → `[5, 4, 3, 1, 10]` | 10 neo |
| 4 | 5↔1 → `[1, 4, 3, 5, 10]` | → `[4, 1, 3, 5, 10]` | 5 neo |
| 3 | 4↔3 → `[3, 1, 4, 5, 10]` | → `[3, 1, 4, 5, 10]` | 4 neo |
| 2 | 3↔1 → `[1, 3, 4, 5, 10]` | → `[1, 3, 4, 5, 10]` | xong |

*(Sàng chi tiết size=5: gốc 1, trái 5, phải 3 → đổi 1↔5; rồi 1 với 4,1 → đổi 1↔4 → `[5,4,3,1,10]`. Làm chậm trên giấy như bảng `heapify`.)*

| | |
|---|---|
| Thời gian | **Luôn** $O(n\log n)$ (dựng $O(n)$, $n$ lần sàng $O(\log n)$) |
| Phụ | $O(1)$ mảng (đệ quy `heapify` $O(\log n)$ stack; có thể viết vòng) |
| Ổn định | Không |
| Ưu | Không xấu $n^2$ như Quick; không mảng phụ như Merge |
| Nhược | Thực tế thường chậm hơn Quick TB (không bắt thuộc số liệu) |

Cây heap **không** phải BST. BST: trái < nút < phải. Heap: chỉ cha ≥ con, trái/phải không theo thứ tự tìm kiếm.

#### Toán

Chiều cao đống hoàn chỉnh $h=\lfloor\log_2 n\rfloor$. Mỗi `heapify` $O(h)=O(\log n)$. Dựng heap $O(n)$; $n$ lần lấy max $O(n\log n)$. **Luôn** $O(n\log n)$. $S=O(1)$ (không kể stack sàng).

#### Ứng dụng thực tế

Cần $O(n\log n)$ **không xấu $n^2$**, không mảng phụ: xếp hạng điểm cả khoa. “Top $k$” (hàng đợi ưu tiên, Ch.4) cùng ý đống.

**Bẫy:** chỉ số `2*i+1` kiểu 1-based nhầm thành `2*i`; `heapify` sau swap quên giảm `size`.

---

#### 2.2.3.d. Sắp xếp theo cơ số (Radix Sort)

**Không** so hai số nguyên với nhau. Xếp theo **từng chữ số**, từ **hàng đơn vị** (LSD) rồi chục, trăm…

Mỗi lượt: phân **ổn định** vào 10 thùng `0..9` theo chữ số đang xét, rồi **đổ ra theo thứ tự thùng** (giữ ổn định trong thùng).

#### Lưu đồ

```
  Tìm max → d ← số chữ số
       ▼
  exp ← 1
       ▼
 ┌─────────────────┐ không
 │  max/exp > 0 ?  ├────► Kết thúc
 └──┬──────────────┘
 có │
    ▼
 Counting theo chữ số (a[i]/exp)%10   ← ổn định, đi ngược
    ▼
 exp ← exp × 10  → lặp
```

Ví dụ `[170, 45, 75, 90, 2, 24, 802, 66]` — **ba lượt**, mỗi lượt đổ thùng 0→9 (trong thùng giữ thứ tự ổn định):

```
  Gốc:        170  45  75  90   2  24  802  66

  ĐV (exp=1):
    thùng 0: 170, 90
    thùng 2: 2, 802
    thùng 4: 24
    thùng 5: 45, 75
    thùng 6: 66
    ra:  170, 90, 2, 802, 24, 45, 75, 66

  Chục (exp=10):
    thùng 0: 2, 802
    thùng 2: 24
    thùng 4: 45
    thùng 6: 66
    thùng 7: 170, 75
    thùng 9: 90
    ra:  2, 802, 24, 45, 66, 170, 75, 90

  Trăm (exp=100):
    thùng 0: 2, 24, 45, 66, 75, 90
    thùng 1: 170
    thùng 8: 802
    ra:  2, 24, 45, 66, 75, 90, 170, 802
```

Nếu counting **đi xuôi** (`i=0..n-1`) khi đặt vào `out`, hai số cùng chữ số **đảo** thứ tự — lượt sau sai. Phải đi **ngược**.

Cài: mỗi lượt dùng **đếm phân phối (counting)** theo chữ số `(a[i]/exp)%10`, `exp = 1, 10, 100, …`

```cpp
void CountingTheoChuSo(int a[], int n, int exp) {
    int out[100];          // de n <= 100; hoac new int[n]
    int cnt[10] = {0};
    for (int i = 0; i < n; i++)
        cnt[(a[i] / exp) % 10]++;
    for (int d = 1; d < 10; d++)
        cnt[d] += cnt[d - 1];
    for (int i = n - 1; i >= 0; i--) {     // di nguoc de on dinh
        int d = (a[i] / exp) % 10;
        out[cnt[d] - 1] = a[i];
        cnt[d]--;
    }
    for (int i = 0; i < n; i++) a[i] = out[i];
}

void RadixSort(int a[], int n) {
    int mx = a[0];
    for (int i = 1; i < n; i++)
        if (a[i] > mx) mx = a[i];
    for (int exp = 1; mx / exp > 0; exp *= 10)
        CountingTheoChuSo(a, n, exp);
}
```

Vòng `i = n-1` xuống `0` + cộng dồn `cnt` → **ổn định** từng lượt → cả Radix ổn định.

| | |
|---|---|
| Thời gian | $O(d(n+k))$, $k=10$ (thập phân), $d$ = số chữ số của max |
| Phụ | $O(n+k)$ |
| Khóa | Số nguyên **không âm** (bản trên). Có âm: tách dấu / lệch miền |
| Ổn định | Có (LSD + counting ngược) |

$d$ nhỏ (MSSV 8 số, năm sinh 4 số): gần tuyến tính theo $n$. Khóa `float` / `char ten[]` không nhét trực tiếp.

#### Toán

$d=\lfloor\log_{10}(\max)\rfloor+1$, mỗi lượt counting $O(n+k)$ với $k=10$:

$$
T=O\bigl(d(n+k)\bigr)
$$

Không bị cận $\Omega(n\log n)$ của sort **so sánh**.

#### Ứng dụng thực tế

Sort **MSSV**, số báo danh, SĐT, năm sinh (chuỗi chữ số). Không sort họ tên (không phải chữ số thập phân thuần).

**Bẫy:** counting đi **xuôi** `i=0..n-1` mất ổn định; quên `exp*=10`; `int out[n]` VLA.

---

#### e. Bảng chọn — tám thuật toán

| Thuật toán | Tốt | TB | Xấu | Phụ | Ổn định | Ghi nhớ |
|------------|-----|----|-----|-----|---------|---------|
| Interchange | $n^2$ | $n^2$ | $n^2$ | $O(1)$ | Không | Đổi ngay, ≠ Selection |
| Selection | $n^2$ | $n^2$ | $n^2$ | $O(1)$ | Không | Ít swap |
| Insertion | $n$ | $n^2$ | $n^2$ | $O(1)$ | Có | Gần sort |
| Bubble (+cờ) | $n$ | $n^2$ | $n^2$ | $O(1)$ | Có | Chỉ kề |
| Merge | $n\log n$ | $n\log n$ | $n\log n$ | $O(n)$ | Có | Luôn $n\log n$ |
| Quick | $n\log n$ | $n\log n$ | $n^2$ | $O(\log n)$ | Không | Pivot cuối + đã sort = xấu |
| Heap | $n\log n$ | $n\log n$ | $n\log n$ | $O(1)$ | Không | Đống ≠ BST |
| Radix | $d(n+k)$ | $d(n+k)$ | $d(n+k)$ | $O(n+k)$ | Có | Số nguyên, LSD |

**Chọn nhanh:**

```
 n nhỏ / thi viết tay     → 2.2.2 (biết khác Interchange/Selection)
 cần ổn định, n lớn       → Merge (hoặc Insertion nếu gần sort)
 n lớn, không cần ổn định → Quick (tránh pivot xấu) hoặc Heap
 khóa số nguyên, d nhỏ    → Radix
```

---

### Chương trình tối thiểu — Interchange + nhị phân

```bash
c++ -std=c++11 -o ch2 ch2.cpp && ./ch2
```

```cpp
#include <iostream>
using namespace std;

void DoiCho(int &x, int &y) { int t = x; x = y; y = t; }

void InterchangeSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++)
        for (int j = i + 1; j < n; j++)
            if (a[i] > a[j]) DoiCho(a[i], a[j]);
}

int TimNhiPhan(int a[], int n, int x) {
    int L = 0, R = n - 1;
    while (L <= R) {
        int M = (L + R) / 2;
        if (a[M] == x) return M;
        if (a[M] < x) L = M + 1;
        else R = M - 1;
    }
    return -1;
}

int main() {
    int a[] = {5, 1, 4, 2};
    int n = 4;
    InterchangeSort(a, n);
    for (int i = 0; i < n; i++) cout << a[i] << " ";   // 1 2 4 5
    cout << "\nTim 4: " << TimNhiPhan(a, n, 4) << "\n"; // 2
    cout << "Tim 3: " << TimNhiPhan(a, n, 3) << "\n";   // -1
    return 0;
}
```

Ghép `SelectionSort` / `InsertionSort` / `BubbleSort` / `QuickSort` như mục trên.

**Mẫu đếm đúng đề thực hành** (`ss` so sánh khóa, `gan` gán; `swap` = 3 gán):

```cpp
void SelectionSort(int a[], int n, int &ss, int &gan) {
    ss = gan = 0;
    for (int i = 0; i < n - 1; i++) {
        int min = i;
        for (int j = i + 1; j < n; j++) {
            ss++;
            if (a[j] < a[min]) min = j;
        }
        if (min != i) {
            DoiCho(a[i], a[min]);
            gan += 3;
        }
    }
}
```

Quick: cộng `ss` mỗi lần `a[j] < pivot`; `gan++` khi `pivot = a[high]`; mỗi `DoiCho` → `gan += 3`. **Copy mảng** trước mỗi thuật toán — đừng sort mảng đã sort rồi so với thuật toán sau.

Ba bộ test thực hành: ngẫu nhiên / **đã tăng** (Insertion, Bubble+cờ ít việc; Quick+pivot cuối **nhiều**) / **đã giảm**.

**Sort `SinhVien`** (đề bài 3 Phần 1): so `diem` bằng `<` / `>`; so tên `strcmp(a[j].ten, a[min].ten) < 0`. Tìm MSSV: tuần tự + `strcmp`. Nhị phân theo MSSV **chỉ** sau khi đã sort theo MSSV.

**Bẫy chương 2 (gom)**

1. Nhị phân trên mảng vừa `Interchange` **chưa gọi**.
2. Nộp Selection mang tên Interchange.
3. Quick pivot cuối trên mảng tăng → $O(n^2)$, không phải “luôn $n\log n$”.
4. Merge quên `delete[]`.
5. Heap dùng công thức BST.
6. `strcmp` vs `==` khi sort/tìm `SinhVien`.

### ✅ Kiểm tra nhanh 2.2.3

1. Merge luôn $O(n\log n)$ nhờ đâu?
2. Quick xấu khi nào (bản đề thi)?
3. Heap: `a[0]` sau bước dựng max-heap là gì?
4. Radix LSD: lượt 1 theo chữ số nào?
5. Cần ổn định + $O(n\log n)$ luôn: chọn?

**Đáp án:** (1) $\log n$ tầng, mỗi tầng $O(n)$. (2) Đã sort (pivot luôn biên). (3) Max. (4) Hàng đơn vị. (5) Merge.

---

## 2.3. BÀI TẬP

> **2.3 không nằm trong đề cương 2.1–2.2.** Cầu nối thực hành Phần 1.

Làm trên giấy trước khi gõ. Mảng sort: `[5,1,4,2]` trừ khi bài cho khác.

### A. Lý thuyết

**Bài 1.** Ba giải thuật tìm (tuần tự, nhị phân, nội suy): điều kiện mảng, $O$ xấu; một ví dụ thất bại của nhị phân khi **chưa** sort; khi nào nội suy chậm hơn nhị phân.

**Bài 2.** Ổn định là gì? Trong 2.2.2, thuật toán nào ổn định?

**Bài 3.** Interchange khác Selection **một câu + một dòng code**.

**Bài 4.** Insertion tốt / Bubble xấu / Quick xấu (pivot cuối).

**Bài 5.** Merge vs Quick vs Heap: $O$ xấu, phụ, ổn định — bảng 3 dòng.

**Bài 6.** Radix khác sort so sánh ở chỗ nào? Khóa nào không dùng trực tiếp?

**Bài 6b.** Vẽ **lưu đồ** (hình chữ nhật xử lý, hình thoi điều kiện) cho: (1) `TimTuyenTinh`, (2) `TimNhiPhan`, (3) `InsertionSort` hoặc `BubbleSort`. Đối chiếu mục tương ứng trong chương.

### B. Chạy tay (bắt buộc)

**Bài 7.** Tuần tự `[10,20,30,40,50]`, $x=40$ và $x=99$: `ss`.

**Bài 8.** Nhị phân `[10,20,30,40,50,60,70,80]`, $x=70$: bảng $L,R,M$. $x=35$: bảng đến thất bại.

**Bài 8b.** Nội suy `[1,3,5,7,9,11,13,15,17,19]`, $x=13$: tính `pos` từng phép. $x=100$: vì sao không chia?

**Bài 9.** Interchange `[5,1,4,2]`: bảng $i,j$, đổi, mảng. Đếm số đổi.

**Bài 10.** Selection cùng mảng: mỗi $i$ ghi `min` và có đổi không.

**Bài 11.** Insertion cùng mảng: mỗi `key`, mảng sau chèn.

**Bài 12.** Bubble (có cờ) cùng mảng: từng pass.

**Bài 13.** Partition Lomuto `[5,1,8,2]`, pivot cuối. Mảng + chỉ số trả về.

**Bài 14.** Trộn `[1,5]` với `[2,4]` từng bước lấy phần tử.

**Bài 15.** Heap: mảng `[4,10,3,5,1]` — vẽ cây, `heapify` từ $i=n/2-1$.

**Bài 16.** Radix một lượt ĐV: `[170,45,75,90,2]`.

### C. Cài đặt

**Bài 17.** `TimTuyenTinh` / `TimNhiPhan` / `TimNoiSuy` có `&ss`. Test mảng tăng $n=10$ (ví dụ giáo trình).

**Bài 18.** Bốn hàm 2.2.2. In mảng sau sort. Đếm `ss`, `gan` (swap = 3 gán).

**Bài 19.** `QuickSort` + `partition` đúng mẫu đề. Thử mảng tăng $n=8$ — cảm $O(n^2)$ (nhiều lần partition lệch).

**Bài 20.** `MergeSort`. So `ss` không bắt buộc; kiểm tra mảng ra tăng.

**Bài 21.** `HeapSort` + `RadixSort` trên số không âm.

**Bài 22.** `SinhVien`: tìm tuần tự theo MSSV; `InsertionSort` theo `diem`; `SelectionSort` theo tên (`strcmp`). Khớp đề Phần 1 bài 3. Nêu *vì sao* chọn hai sort đó (ứng dụng, không chỉ copy đề).

### D. Tự luận

1. Bài toán tìm. Hai giải thuật. Khi nào sort rồi nhị phân **đáng**.
2. Bốn sort đơn giản: ý tưởng một câu mỗi cái; Interchange ≠ Selection.
3. Quick: partition; vì sao mảng tăng + pivot cuối xấu.
4. Merge ổn định nhờ đâu (`<=`). Heap không ổn định vì sao (đổi cha–con xa).

### Đáp án gợi ý B

**7.** 4; 5.  
**8.** $70$: $M=3,5,6$. $35$: như bảng 2.1.3.D.  
**8b.** $(13-1)\times 9 / 18 = 6$; $x=100>19$ → `-1` ngay.  
**9.** 4 lần đổi; kết `[1,2,4,5]`. Sau $i=0$: `[1,5,4,2]`.  
**10.** Đổi 2 lần (ô 0 và ô 1).  
**13.** `[1,2,8,5]`, trả $1$.  
**14.** 1, rồi 2, rồi 4, rồi 5.  
**16.** Theo ĐV: 170, 90, 2, 45, 75.

---

## 🎯 TÓM TẮT CHƯƠNG 2

### Kiến thức cốt lõi

1. Tìm = trả **chỉ số** hoặc $-1$. **Ba** giải thuật giáo trình: tuần tự $O(n)$; nhị phân $O(\log n)$ (đã sắp); nội suy tốt $O(\log\log n)$, xấu $O(n)$ (đã sắp + đều).
2. Sắp = thứ tự khóa. Ổn định / tại chỗ / $O$ tốt–xấu — ba câu hỏi khi nêu thuật toán.
3. Interchange: đổi **ngay** với mọi $j$ sau. Selection: **một** min, **một** swap. Đừng nộp nhầm (Ch.3 `SapXep` = Interchange).
4. Insertion / Bubble (+cờ) tốt $O(n)$ khi đã tăng. Cả bốn đơn giản xấu $O(n^2)$.
5. Merge luôn $O(n\log n)$, phụ $O(n)$, ổn định. Quick TB $O(n\log n)$, xấu $O(n^2)$. Heap luôn $O(n\log n)$, phụ $O(1)$. Radix $O(d(n+k))$ trên số nguyên.

### Câu thần chú

- Nhị phân: `L = M+1` / `R = M-1`, điều kiện `L <= R`, mảng **đã** sort.
- Nội suy: `pos = L + ((x-a[L])*(R-L))/(a[R]-a[L])`; cấm chia khi $a[R]=a[L]$ hoặc $x$ ngoài đoạn.
- Thấy `min_idx` → Selection; hai vòng `if (a[i] > a[j]) swap` → Interchange.
- Insertion: `while (j>=0 && a[j] > key)` — thiếu `j>=0` vỡ.
- Bubble chỉ `a[j]` và `a[j+1]`.
- Quick đề thi: pivot `a[high]`, không đệ quy vào ô pivot.
- Mỗi thuật toán: **lưu đồ** (thoi = `if`) + **toán** $T(n)$ + **ứng dụng** một câu trước khi code.
- Radix: LSD, counting **ngược** để ổn định.

### Liên kết

- **Ch.1:** $O$, $n(n-1)/2$, tốt/xấu; mảng `SinhVien`.
- **Ch.3:** `SapXep` = Interchange trên DSLK; Merge hợp liên kết.
- **Ch.5:** cây hoàn chỉnh của Heap; BST khác Heap.
- **Thực hành Phần 1:** đếm `ss`/`gan`; nội suy; QL sinh viên.

---

*Hết chương 2. Làm bài 8–13 và 17–19 trước khi sang DSLK.*
