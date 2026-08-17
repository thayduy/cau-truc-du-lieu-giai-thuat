# CHƯƠNG 3: CẤU TRÚC DANH SÁCH LIÊN KẾT

> **DSLK** = **Danh sách liên kết** (tiếng Anh: *Linked List*).  
> Đây là viết tắt dùng xuyên suốt giáo trình, đề thi và thực hành. Khi thấy “DSLK đơn / kép / vòng”, hãy đọc là “danh sách liên kết đơn / kép / vòng”.

---

## 🎯 MỤC TIÊU CHƯƠNG 3

**Sau khi học xong chương này, sinh viên có thể:**

1. Giải thích được đối tượng dữ liệu **con trỏ**, phân biệt Stack/Heap, cấp phát và giải phóng bộ nhớ động.
2. Nêu định nghĩa danh sách liên kết, so sánh với mảng, và phân biệt các **hình thức tổ chức** (tuần tự / liên kết).
3. Tổ chức và cài đặt **DSLK đơn** theo cách cấp phát liên kết (`NODE`, `LIST`, `pHead`, `pTail`).
4. Thực hiện thành thạo các thao tác: khởi tạo, duyệt, tìm, thêm, xóa, hủy danh sách — kèm mã giả, code và độ phức tạp.
5. Sắp xếp DSLK bằng **đổi chỗ trực tiếp** (đúng đề thi), biết relink và Merge Sort; trộn hai danh sách đã sắp.
6. Cài đặt **DSLK kép** và **DSLK vòng**, nêu ưu nhược điểm và chọn đúng loại cho bài toán.
7. Áp dụng DSLK vào bài toán thực tế và giải bài tập từ cơ bản đến nâng cao.

---

## 📋 NỘI DUNG CHƯƠNG 3

```
3.1. Giới thiệu đối tượng dữ liệu con trỏ
3.2. Danh sách liên kết (DSLK)
     3.2.1. Định nghĩa DSLK
     3.2.2. Các hình thức tổ chức DSLK
3.3. DSLK đơn
     3.3.1. Tổ chức DSLK đơn theo cách cấp phát liên kết
     3.3.2. Các thao tác cơ bản trên DSLK đơn
     3.3.3. Sắp xếp danh sách
3.4. Một số DSLK khác
     3.4.1. DSLK kép
     3.4.2. DSLK vòng
```

> **Lưu ý cài đặt:** Phần 3.1 dùng C để thấy rõ `malloc`/`free` (bản chất con trỏ). Từ mục 3.3 trở đi dùng **C++** theo đúng mẫu giáo trình thực hành và đề thi: `NODE`, `LIST`, `pHead`, `pTail`, `pNext`. Con trỏ trong C và C++ là **cùng một ý tưởng**.

---

## 📖 CÁCH ĐỌC TÀI LIỆU NÀY (TỪ ZERO ĐẾN HERO)

| Mốc | Đọc mục | Khi nào thì được sang bước sau |
|-----|---------|--------------------------------|
| **Nền** | 3.1 → 3.2 | Vẽ được ô nhớ của `int *p = &a` và nói được DSLK khác mảng chỗ nào |
| **Trọng tâm đề thi** | 3.3.1 → 3.3.2 → 3.3.3.A + 3.3.3.D | Tự viết `ThemDau`, `ThemCuoi`, `XoaDau`, `XoaCuoi`, `SapXep` (đổi chỗ trực tiếp), `Noi` không nhìn tài liệu |
| **Mở rộng chương** | 3.4 | Phân biệt đơn / kép / vòng, vẽ được sơ đồ thêm-xóa |
| **Cao cấp** | 3.5 → 3.6 | Chỉ học khi đã code được 3.3; không cần thuộc để qua môn |

Mỗi thao tác cơ bản được viết theo một khuôn: **ý tưởng → sơ đồ trước/sau → mã giả → code → độ phức tạp → bẫy**. Gặp chỗ đánh **(nâng cao)** thì có thể bỏ qua lần đọc đầu.

---

## 📚 BẢNG THUẬT NGỮ

| Thuật ngữ / viết tắt | Nghĩa tiếng Việt | Ghi nhớ nhanh |
|----------------------|------------------|---------------|
| **DSLK** | Danh sách liên kết | Dãy nút nắm tay nhau bằng con trỏ |
| **Nút / NODE** | Một phần tử của DSLK | Gồm `data` + con trỏ liên kết |
| **`pHead`** | Con trỏ đầu danh sách | Cửa vào duy nhất của DSLK đơn |
| **`pTail`** | Con trỏ cuối danh sách | Để thêm cuối $O(1)$ |
| **`pNext` / `pPrev`** | Con trỏ nút sau / nút trước | Đơn chỉ có `pNext`; kép có cả hai |
| **`NULL`** | Không trỏ tới ô nhớ nào | Lính canh: hết danh sách (DSLK thẳng) |
| **Cấp phát tuần tự** | Lưu bằng mảng, ô nhớ kề nhau | Có `a[i]` |
| **Cấp phát liên kết** | Mỗi nút tự “ôm” địa chỉ nút kế | Không có `a[i]` |
| **Heap** | Vùng nhớ xin bằng `new`/`malloc` | Node sống đến khi `delete`/`free` |
| **Stack (bộ nhớ)** | Vùng nhớ biến cục bộ | Hết hàm là mất — **không** để node ở đây |
| **Memory leak** | Rò rỉ bộ nhớ | `new` mà quên `delete` |
| **Dangling pointer** | Con trỏ treo | Trỏ tới ô đã `delete` |
| **ADT** | Kiểu dữ liệu trừu tượng | “Danh sách *là gì*” trước khi *cài bằng gì* |
| **Relink** | Nối lại con trỏ | Đổi chỗ nút mà không copy `data` |
| **Dummy / header node** | Nút giả không chứa dữ liệu thật | Làm code thêm/xóa gọn hơn (khóa này **không dùng**) |

---

## 3.1. GIỚI THIỆU ĐỐI TƯỢNG DỮ LIỆU CON TRỎ

Danh sách liên kết **không tồn tại** nếu không có con trỏ. Trước khi học DSLK, phải làm chủ bốn thứ:

1. Địa chỉ ô nhớ và biến con trỏ.
2. Toán tử `&` (lấy địa chỉ) và `*` (giải tham chiếu).
3. Con trỏ tới `struct` và toán tử `->`.
4. Cấp phát / giải phóng bộ nhớ trên **Heap**.

Nếu bỏ qua mục này, các thao tác thêm/xóa node sẽ thành “copy code cho chạy” chứ không hiểu vì sao phải đổi con trỏ.

---

### 3.1.1. Bộ nhớ máy tính: biến, địa chỉ, giá trị

Mỗi biến khi chương trình chạy được hệ điều hành cấp **một (hoặc nhiều) ô nhớ**. Ô nhớ có:

| Thành phần | Ý nghĩa | Ví dụ |
|------------|---------|--------|
| **Tên** | Cách lập trình viên gọi biến | `a` |
| **Kiểu** | Cách diễn giải các bit | `int` (thường 4 byte) |
| **Giá trị** | Dữ liệu đang chứa | `10` |
| **Địa chỉ** | Vị trí ô nhớ trên RAM | `0x7ffe1234` |

```c
int a = 10;
printf("Gia tri a = %d\n", a);
printf("Dia chi a = %p\n", (void*)&a);   /* &a = dia chi cua a */
```

**Ẩn dụ:** Căn nhà có **số nhà** (địa chỉ) và **người đang ở** (giá trị). Muốn đến nhà đó, bạn cần số nhà, không cần nhớ người đang ở là ai.

---

### 3.1.2. Con trỏ là gì?

**Định nghĩa:** Con trỏ (pointer) là biến chuyên lưu **địa chỉ** của một biến (hoặc vùng nhớ) khác.

```
     a (int)                    p (int*)
   ┌────────┐                 ┌──────────┐
   │   10   │  <──────────────│  &a      │
   └────────┘                 └──────────┘
   địa chỉ: 0x100             địa chỉ: 0x200
```

#### Khai báo và hai toán tử bắt buộc

```c
int  a = 10;
int *p = &a;     /* p luu dia chi cua a */

printf("%d\n", a);    /* 10  - gia tri cua a        */
printf("%p\n", (void*)p);   /* 0x100 - gia tri cua p (la dia chi) */
printf("%d\n", *p);   /* 10  - lay gia tri tai dia chi ma p dang tro */
```

| Ký hiệu | Tên | Việc nó làm |
|---------|-----|-------------|
| `&x` | Address-of | Lấy địa chỉ của `x` |
| `*p` | Dereference / gián tiếp | Đọc/ghi **giá trị tại ô nhớ** mà `p` đang trỏ |
| `int *p` | Khai báo | `p` là con trỏ tới `int` |

**Quy tắc vàng:**

- `p`  = địa chỉ.
- `*p` = dữ liệu nằm ở địa chỉ đó.
- Muốn **đổi dữ liệu** qua con trỏ: gán `*p = ...`.
- Muốn **đổi chỗ đang trỏ**: gán `p = ...`.

```c
int a = 10, b = 20;
int *p = &a;

*p = 99;     /* a thanh 99, p van tro toi a */
p  = &b;     /* p doi sang tro toi b, a van la 99 */
*p = 5;      /* b thanh 5 */
```

**Đi từng dòng trên ô nhớ** (địa chỉ minh họa). Đây là bài tập “zero” bắt buộc — đọc chậm:

| Sau câu lệnh | `a` | `b` | `p` (chứa địa chỉ) | `*p` (giá trị tại chỗ p đang trỏ) |
|--------------|-----|-----|---------------------|-------------------------------------|
| `int a = 10;` | 10 tại `0x100` | — | — | — |
| `int b = 20;` | 10 | 20 tại `0x104` | — | — |
| `int *p = &a;` | 10 | 20 | `0x100` | 10 |
| `*p = 99;` | **99** | 20 | `0x100` (không đổi) | 99 |
| `p = &b;` | 99 | 20 | **`0x104`** | 20 |
| `*p = 5;` | 99 | **5** | `0x104` | 5 |

Hai thao tác **không được lẫn:**

- `*p = 99` = “vào nhà số `p`, đổi người đang ở”. Biến `a` đổi, bản thân `p` không đổi.
- `p = &b` = “chuyển `p` sang giữ số nhà khác”. `a` không bị đụng.

Cách viết khai báo đều hợp lệ và **cùng nghĩa**: `int *p`, `int* p`, `int * p`. Giáo trình dùng `NODE* p` (kiểu nhìn rõ hơn).

---

### 3.1.3. Con trỏ `NULL` và con trỏ hoang

```c
int *p = NULL;    /* p khong tro toi o nho hop le nao */
```

`NULL` (trong C++11 trở đi thường viết `nullptr`) nghĩa là **“không trỏ tới đâu cả”**. Đây là giá trị lính canh của DSLK: node cuối luôn có `pNext = NULL`.

**Cấm tuyệt đối** giải tham chiếu con trỏ NULL hoặc con trỏ chưa khởi tạo:

```c
int *p;          /* wild pointer: chua gan, chua biet tro toi dau */
*p = 10;         /* UNDEFINED BEHAVIOR - co the crash */

int *q = NULL;
*q = 10;         /* crash: segmentation fault */
```

Trước khi dùng `*p`, luôn kiểm tra:

```c
if (p != NULL) {
    printf("%d\n", *p);
}
```

---

### 3.1.4. Con trỏ và `struct` — toán tử `->`

Node của DSLK là một `struct`. Truy cập thành viên qua con trỏ dùng `->`.

```c
struct NODE {
    int data;
    struct NODE *pNext;
};

struct NODE n;
n.data = 5;
n.pNext = NULL;

struct NODE *p = &n;
p->data  = 7;          /* tuong duong (*p).data = 7  */
p->pNext = NULL;       /* tuong duong (*p).pNext = NULL */
```

**Ghi nhớ:**

```
p->data     ≡    (*p).data
```

Cả chương này, mọi thao tác DSLK đều là: đọc/ghi `p->data` và đổi `p->pNext`.

---

### 3.1.5. Stack và Heap — hai “kho” bộ nhớ

| | **Stack** | **Heap** |
|---|-----------|----------|
| Ai cấp phát? | Compiler, tự động khi vào hàm | Lập trình viên (`malloc` / `new`) |
| Thời gian sống | Hết hàm là mất | Sống đến khi `free` / `delete` |
| Tốc độ | Rất nhanh | Chậm hơn (phải tìm ô trống) |
| Kích thước | Cố định, nhỏ (vài MB) | Lớn, gần như RAM còn lại |
| Ví dụ | `int a = 10; int arr[100];` | Node của DSLK |

```c
#include <stdlib.h>
void f() {
    int x = 5;                 /* Stack: chet khi thoat f() */
    int *p = (int*)malloc(sizeof(int));
    if (p == NULL) return;
    *p = 5;
    free(p);
}
```

**Vì sao DSLK phải dùng Heap?** Vì số node không biết trước, và node phải **tồn tại sau khi hàm tạo node kết thúc**. Nếu cấp phát node trên Stack, khi hàm `return` thì node biến mất, con trỏ thành dangling.

---

### 3.1.6. Cấp phát động trong C: `malloc`, `calloc`, `free`

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    /* Xin 1 o int tren Heap */
    int *p = (int*)malloc(sizeof(int));
    if (p == NULL) {           /* BAT BUOC kiem tra: het RAM */
        printf("Khong cap phat duoc\n");
        return 1;
    }
    *p = 42;
    printf("%d\n", *p);
    free(p);                   /* Tra lai he dieu hanh */
    p = NULL;                  /* Tranh dangling pointer */
    return 0;
}
```

| Hàm | Việc làm |
|-----|----------|
| `malloc(n)` | Xin `n` byte, **không** xóa rác trong ô nhớ |
| `calloc(k, sz)` | Xin `k*sz` byte, **điền 0** |
| `realloc(p, n)` | Đổi kích thước vùng nhớ (có thể copy sang chỗ mới) |
| `free(p)` | Trả vùng nhớ. Gọi 2 lần trên cùng `p` → **double free** (lỗi nặng) |

Cấp phát một node (tư duy sẽ dùng suốt chương):

```c
struct NODE *p = (struct NODE*)malloc(sizeof(struct NODE));
if (p == NULL) { /* xu ly loi */ }
p->data  = 10;
p->pNext = NULL;
```

---

### 3.1.7. Cấp phát động trong C++: `new` / `delete`

Giáo trình thực hành dùng C++:

```cpp
NODE* p = new NODE;     // cap phat 1 node
p->data  = 10;
p->pNext = NULL;

delete p;               // giai phong 1 node
p = NULL;
```

| C | C++ |
|---|-----|
| `malloc` + ép kiểu | `new NODE` |
| `free(p)` | `delete p` |
| Không gọi constructor | Có gọi constructor |

**Không lẫn:** `malloc` đi với `free`, `new` đi với `delete`. Không `free` bộ nhớ `new`, không `delete` bộ nhớ `malloc`.

---

### 3.1.8. Bốn lỗi con trỏ “chết người” trong DSLK

**1. Memory leak (rò rỉ bộ nhớ)** — `new` mà quên `delete`:

```cpp
NODE* p = new NODE;
p->data = 1;
p = new NODE;     // mat dia chi node cu → LEAK
```

**2. Dangling pointer** — xóa rồi vẫn dùng:

```cpp
delete p;
p->data = 5;      // p tro toi o nho da tra lai HĐH
```

**3. Mất liên kết** — đổi `pNext` trước khi giữ địa chỉ node sau:

```cpp
/* SAI: mat het phan duoi danh sach */
pHead = pHead->pNext;   // neu khong luu node cu thi khong delete duoc
                        // va neu day la node duy nhat con lai thi OK,
                        // nhung neu muon xoa node cu: phai giu temp
```

Cách đúng khi xóa đầu:

```cpp
NODE* temp = l.pHead;
l.pHead = l.pHead->pNext;
delete temp;
```

**4. Double free** — `delete` cùng node hai lần.

---

### 3.1.9. Con trỏ cấp hai (`NODE**`) và truyền tham chiếu

Khi hàm cần **đổi chính con trỏ `pHead`**, phải truyền địa chỉ của con trỏ.

```cpp
/* Cach 1: con tro cap 2 (C) */
void ThemDau(NODE **pHead, int x) {
    NODE* p = new NODE;
    p->data = x;
    p->pNext = *pHead;
    *pHead = p;            /* doi head o ben ngoai ham */
}

/* Cach 2: tham chieu C++ — dung trong giao trinh */
void ThemDau(LIST &l, NODE* p) {
    p->pNext = l.pHead;
    l.pHead = p;
}
```

Từ đây, giáo trình dùng **cách 2**: `LIST &l`. Dấu `&` ở đây là *tham chiếu C++* (không phải lấy địa chỉ `&a` của mục 3.1.2): hàm sửa được `pHead`/`pTail` của người gọi.

Đoạn `ThemDau` phía trên **cố ý rút gọn** để chỉ ra ý “đổi được head”. Bản đủ (xét rỗng, cập nhật `pTail`) nằm ở mục 3.3.2.

---

### 3.1.10. Con trỏ và mảng (để đối chiếu với DSLK)

```c
int a[5] = {1, 2, 3, 4, 5};
int *p = a;          /* ten mang chinh la dia chi phan tu dau */
printf("%d\n", *(p + 2));   /* 3  — so hoc con tro */
printf("%d\n", a[2]);       /* 3  — tuong duong */
```

Mảng: phần tử **nằm liền nhau**, nên `p+1` nhảy đúng `sizeof(int)` byte.

DSLK: phần tử **rải rác**, `p+1` **không** ra node kế. Muốn sang node sau **bắt buộc** `p = p->pNext`. Đây là lý do DSLK **không truy cập ngẫu nhiên O(1)** được.

---

### 3.1.11. Ví dụ tổng hợp: tạo 3 node rời rồi nối tay

Đọc ví dụ này xong là đã “nhìn thấy” DSLK.

```cpp
#include <iostream>
using namespace std;

struct NODE {
    int data;
    NODE* pNext;
};

int main() {
    NODE* a = new NODE;  a->data = 10;  a->pNext = NULL;
    NODE* b = new NODE;  b->data = 20;  b->pNext = NULL;
    NODE* c = new NODE;  c->data = 30;  c->pNext = NULL;

    /* Noi: 10 -> 20 -> 30 -> NULL */
    a->pNext = b;
    b->pNext = c;

    NODE* p = a;
    while (p != NULL) {
        cout << p->data << " -> ";
        p = p->pNext;
    }
    cout << "NULL\n";

    delete a; delete b; delete c;
    return 0;
}
```

Sơ đồ bộ nhớ (địa chỉ minh họa) — khớp code `a->pNext = b; b->pNext = c;`:

```
              biến a
                │
                ▼
Heap:        0x10              0x50              0x90
          ┌────┬────┐      ┌────┬────┐      ┌────┬────┐
          │ 10 │  ●─┼─────►│ 20 │  ●─┼─────►│ 30 │  / │──► NULL
          └────┴────┘      └────┴────┘      └────┴────┘
             ▲
          pNext của 10 chứa 0x50, không phải “ô bên cạnh”
```

Ba node **không** nằm kề nhau (0x10, 0x50, 0x90). Chúng chỉ “biết nhau” nhờ `pNext`.

---

### ✅ Kiểm tra nhanh 3.1

Tự trả lời rồi lật đáp án ở dưới.

1. Khác nhau giữa `p` và `*p`?
2. Vì sao node DSLK không khai báo `NODE n;` trong hàm rồi `return &n;`?
3. `malloc` thất bại trả về gì? Phải làm gì?
4. Muốn xóa nút đầu: nếu viết `delete pHead;` **rồi mới** `pHead = pHead->pNext` thì sao? Nếu viết `pHead = pHead->pNext` **mà không** giữ nút cũ để `delete` thì sao?

**Đáp án:**

1. `p` là **địa chỉ**; `*p` là **giá trị nằm tại địa chỉ đó**.
2. `n` nằm trên Stack, chết khi hàm `return` → địa chỉ trả về thành dangling. Node phải `new` trên Heap.
3. Trả về `NULL`. Phải kiểm tra, không được `p->data = ...`. (Còn `new` kiểu C++ chuẩn thì **ném exception**, không trả `NULL`; trong bài tập nhập môn vẫn hay kiểm tra `NULL` cho thống nhất tư duy “cấp phát có thể thất bại”.)
4. `delete` trước rồi đọc `pHead->pNext` = dùng ô nhớ đã trả (dangling, crash). Đổi `pHead` trước mà không `delete` nút cũ = **leak**. Cách đúng: `temp = pHead; pHead = pHead->pNext; delete temp;`.

---

## 3.2. DANH SÁCH LIÊN KẾT (DSLK)

**DSLK** chính là **Danh sách liên kết**. Phần này trả lời hai câu: *nó là gì?* và *cài nó bằng cách nào?*

### 3.2.1. Định nghĩa DSLK

#### A. Danh sách tuyến tính (ôn lại)

**Danh sách tuyến tính** (linear list) là tập hữu hạn các phần tử cùng kiểu, có thứ tự:

$$
L = (a_0, a_1, a_2, \dots, a_{n-1})
$$

- $a_0$ là phần tử **đầu**, $a_{n-1}$ là phần tử **cuối**.
- $a_i$ đứng **trước** $a_{i+1}$, đứng **sau** $a_{i-1}$.
- Các thao tác trừu tượng (ADT List): khởi tạo rỗng, kiểm tra rỗng, lấy độ dài, lấy phần tử thứ $i$, tìm, thêm, xóa, duyệt.

Mảng là **một** cách cài ADT này. DSLK là **cách khác**.

#### B. Định nghĩa danh sách liên kết

**Danh sách liên kết** là cấu trúc dữ liệu tuyến tính, trong đó:

- Mỗi phần tử được đặt trong một **nút (node / NODE)**.
- Nút gồm hai phần: **thông tin** (`data`) và **liên kết** (con trỏ tới nút khác).
- Các nút **không cần nằm liên tục** trong bộ nhớ. Thứ tự logic do con trỏ quyết định, không do địa chỉ vật lý.
- Nút cuối trỏ tới `NULL` (DSLK thẳng) hoặc trỏ về nút đầu (DSLK vòng).

**Ẩn dụ:** Mảng là **toa tàu hàn chết với nhau** — muốn chèn toa giữa phải đẩy cả đoàn. DSLK là **nhóm người nắm tay nhau** — muốn chèn người mới chỉ cần hai người kề nhau buông tay rồi nắm tay người mới.

#### C. Nút (NODE) — viên gạch của DSLK

Mỗi nút là **một hộp hai ngăn**: ngăn trái chứa dữ liệu, ngăn phải chứa địa chỉ nút kế.

```
 ┌────────────┬────────────┐
 │    data    │   pNext    │
 │     10     │     ●──────┼──►  nút kế   (hoặc / = NULL nếu là nút cuối)
 └────────────┴────────────┘
   thông tin      liên kết
```

- `data`: số nguyên, sinh viên, đơn hàng… — **payload**.
- `pNext`: địa chỉ nút kế. Đây là thứ biến “đám node rời” thành “danh sách”.

#### D. So sánh mảng và DSLK (nắm để chọn đúng cấu trúc)

| Tiêu chí | Mảng (cấp phát tuần tự) | DSLK (cấp phát liên kết) |
|----------|-------------------------|---------------------------|
| Vị trí RAM | Liên tục | Rải rác |
| Kích thước | Cố định (hoặc phải `realloc`) | Tăng/giảm từng nút |
| Truy cập phần tử thứ $i$ | $O(1)$ | $O(n)$ — phải đi từ đầu |
| Thêm/xóa **đầu** | $O(n)$ — dồn mảng | $O(1)$ |
| Thêm/xóa **giữa** (đã có sẵn con trỏ tới vị trí) | $O(n)$ — dồn | $O(1)$ — chỉ sửa 1–2 con trỏ |
| Thêm/xóa giữa (phải tìm vị trí) | $O(n)$ | $O(n)$ tìm + $O(1)$ sửa |
| Bộ nhớ phụ | Chỉ dữ liệu | Thêm 1 con trỏ / nút (overhead) |
| Cục bộ cache | Tốt (nằm kề nhau) | Kém (nhảy lung tung trên RAM) |
| Tìm kiếm nhị phân | Làm được nếu đã sort | **Không** làm trực tiếp (không có chỉ số) |

**Khi nào chọn DSLK?**

- Không biết trước số phần tử.
- Thêm/xóa đầu hoặc giữa diễn ra **rất thường xuyên**.
- Không cần truy cập ngẫu nhiên `a[i]`.
- Cần cấu trúc linh hoạt: ngăn xếp, hàng đợi, đa thức, đồ thị (danh sách kề)…

**Khi nào chọn mảng?**

- Cần `a[i]` thường xuyên.
- Dữ liệu ít thay đổi kích thước.
- Cần tận dụng cache CPU (xử lý số lớn, ma trận).

#### E. Định nghĩa hình thức (toán học) — có thể bỏ qua lần đọc đầu

> Mục này dành cho ai muốn phát biểu “cho chặt”. Không cần thuộc để cài code.

DSLK đơn là bộ $(N, H)$ trong đó:

- $N$ là tập nút; mỗi nút $x$ có trường `data(x)` và `next(x) ∈ N ∪ {NULL}`.
- $H$ (head) là nút đầu, hoặc `NULL` nếu danh sách rỗng.
- Mọi nút (trừ `NULL`) đều đến được từ $H$ bằng cách lặp `next`.
- Không có chu trình (với DSLK thẳng): đi theo `next` luôn tới `NULL`.

---

### 3.2.2. Các hình thức tổ chức DSLK

Có **hai cách lớn** để cài một danh sách tuyến tính, và trong cách liên kết lại có vài biến thể.

#### A. Tổ chức tuần tự (sequential allocation)

Các phần tử nằm **kề nhau** trong một khối nhớ (mảng):

```
Chỉ số:   0     1     2     3     4
        ┌─────┬─────┬─────┬─────┬─────┐
        │  10 │  20 │  30 │  40 │     │
        └─────┴─────┴─────┴─────┴─────┘
        địa chỉ: 1000  1004  1008  1012  ...
```

Phần tử thứ $i$ ở địa chỉ:

$$
\text{addr}(a_i) = \text{addr}(a_0) + i \times \text{sizeof}(a_0)
$$

Đó là lý do truy cập $O(1)$. Nhược điểm: chèn vào giữa phải **dịch** các phần tử bên phải.

```
 Chèn 25 vào giữa mảng [10, 20, 30, 40]:
 TRƯỚC     [ 10 | 20 | 30 | 40 |    ]
 CHÈN      [ 10 | 20 | 25 | 30 | 40 ]   ← 30 và 40 phải dời sang phải
                    ▲
                   chỗ mới: copy hàng loạt, O(n)
```

```cpp
/* Chen x vao vi tri k trong mang a[0..n-1] */
for (int i = n; i > k; i--)
    a[i] = a[i - 1];
a[k] = x;
n++;
```

Độ phức tạp: $O(n)$.

Trên DSLK, cùng việc chèn chỉ sửa **hai** con trỏ, không dời 30 và 40 (xem hình mục 3.2.2.B và thao tác ThemSau).

#### B. Tổ chức liên kết (linked allocation) — trọng tâm chương

Mỗi phần tử “ôm” địa chỉ phần tử kế:

```
  pHead
    │
    ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘
   0x10           0x88           0x24        (địa chỉ rải rác)
  data  next     data  next     data  NULL
```

**Quy ước vẽ dùng suốt chương** (học thuộc để đọc mọi hình sau):

```
 ┌────┬────┐
 │ 10 │  ●─┼───►     ●─┼───►  = con trỏ pNext đang trỏ tới nút kế
 └────┴────┘
 │ 30 │  / │──► NULL  /       = NULL (hết danh sách thẳng)
```

Không còn công thức địa chỉ theo chỉ số. Muốn tới phần tử thứ $i$ phải đi $i$ bước.

**Ưu:** chèn/xóa tại chỗ đã đứng chỉ sửa con trỏ, không dồn dữ liệu.
**Nhược:** tốn RAM cho con trỏ; truy cập chậm; cache kém.

#### C. Danh sách liên kết tĩnh (cursor / mảng nút)

Khi ngôn ngữ **không có con trỏ** (Pascal cổ, Fortran) hoặc muốn quản lý bộ nhớ thủ công, dùng **mảng các nút** và liên kết bằng **chỉ số nguyên**:

```cpp
struct StaticNode {
    int data;
    int next;     // chi so o mang, -1 = NULL
};

StaticNode pool[100];
int pHead = 0;    // nut dau o chi so 0
// pool[0] = {10, 2}
// pool[2] = {20, 5}
// pool[5] = {30, -1}
```

Đây vẫn là “tổ chức liên kết”, chỉ khác là liên kết bằng **chỉ số** chứ không bằng địa chỉ.

**Đọc ví dụ** `pHead = 0`, `pool[0]={10,2}`, `pool[2]={20,5}`, `pool[5]={30,-1}`:

```
 Chỉ số:     0              1      2              3   4      5
          ┌────┬────┐           ┌────┬────┐              ┌────┬────┐
          │ 10 │  2 │           │ 20 │  5 │              │ 30 │ -1 │
          └────┴────┘           └────┴────┘              └────┴────┘
            ▲    │                 ▲    │                   ▲
 pHead=0 ───┘    └── nhảy tới ô 2 ─┘    └── nhảy tới ô 5 ──┘  └── hết (-1)

 Thứ tự LOGIC:  10 → 20 → 30     (ô nhớ 0, 2, 5 không liền nhau)
```

Trong môn này ta dùng con trỏ thật (`NODE*`). Biết cursor để khi hỏi “ngôn ngữ không có con trỏ thì tổ chức liên kết thế nào?” vẫn trả lời được.

#### D. Phân loại theo chiều liên kết và hình dạng

```
                    DANH SÁCH LIÊN KẾT
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
      DSLK đơn          DSLK kép         DSLK vòng
    (1 con trỏ)      (2 con trỏ)      (đuôi nối đầu)
         │                 │                 │
         │                 │         ┌───────┴───────┐
         │                 │      vòng đơn        vòng kép
```

| Loại | Con trỏ mỗi nút | Duyệt | Nút cuối trỏ tới |
|------|-----------------|-------|------------------|
| Đơn (singly) | `pNext` | Một chiều | `NULL` |
| Kép (doubly) | `pPrev`, `pNext` | Hai chiều | `pNext = NULL`, `pPrev` của đầu = `NULL` |
| Vòng đơn | `pNext` | Một chiều, không gặp `NULL` | Nút đầu |
| Vòng kép | `pPrev`, `pNext` | Hai chiều khép kín | Đầu ↔ cuối |

**Bốn hình — nhìn là phân biệt được:**

**1. DSLK đơn (thẳng):**

```
  pHead                    pTail
    │                        │
    ▼                        ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘
```

**2. DSLK kép (thẳng, hai chiều):**

```
  pHead                                         pTail
    │                                             │
    ▼                                             ▼
 ┌────┬────┬────┐   ┌────┬────┬────┐   ┌────┬────┬────┐
 │ /  │ 10 │  ●─┼──►│  ● │ 20 │  ●─┼──►│  ● │ 30 │  / │──► NULL
 └────┴────┴────┘   └─▲──┴────┴────┘   └─▲──┴────┴────┘
    ▲                 │                  │
    └─────────────────┴──────────────────┘
         pPrev (mỗi nút nhớ cả người đứng trước)
  NULL◄── ngăn prev của nút đầu
```

Cột trái = `pPrev`, cột giữa = `data`, cột phải = `pNext`.

**3. DSLK vòng đơn** (đuôi nắm đầu, không còn NULL):

```
          ┌──────────────────────────────────────────┐
          ▼                                          │
        ┌────┬────┐    ┌────┬────┐    ┌────┬────┐    │
        │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  ●─┼────┘
        └────┴────┘    └────┴────┘    └────┴────┘
            ▲                               ▲
          head                            pTail
          (head = pTail->pNext)
```

**4. DSLK vòng kép** (khép kín hai chiều):

```
     ┌─────────────────────────────────────────────────┐
     ▼                                                 │
 ┌────┬────┬────┐   ┌────┬────┬────┐   ┌────┬────┬────┐│
 │  ● │ 10 │  ●─┼──►│  ● │ 20 │  ●─┼──►│  ● │ 30 │  ●─┼┘
 └────┴────┴────┘   └─▲──┴────┴────┘   └─▲──┴────┴────┘
     ▲                │                  │
     └────────────────┴──────────────────┘
  head->pPrev == pTail     pTail->pNext == head
```

#### E. Biến thể tổ chức: có / không có nút giả (dummy / header node)

**Không dummy** (giáo trình dùng cách này):

```
  pHead                    pTail
    │                        │
    ▼                        ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘
```

Danh sách rỗng: `pHead == NULL`. Mọi hàm thêm/xóa **phải xét riêng** trường hợp rỗng và trường hợp 1 nút.

**Có dummy** (nâng cao, code gọn hơn):

```
  pHead                         pTail
    │                             │
    ▼                             ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │  - │  ●─┼───►│ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘    └────┴────┘
   dummy
  (không chứa dữ liệu có nghĩa)
```

Dummy không chứa dữ liệu có nghĩa. Danh sách “rỗng” vẫn còn 1 nút giả ⇒ thêm đầu luôn là `ThemSau(dummy, p)`, không cần `if (pHead == NULL)`.

Khóa này theo giáo trình: **không dùng dummy**, luôn xử lý rỗng / 1 nút tường minh. Biết dummy để đọc tài liệu tiếng Anh không bị bỡ ngỡ.

#### F. Tổ chức quản lý danh sách: chỉ `pHead` hay thêm `pTail`?

```cpp
struct LIST {
    NODE* pHead;    // bat buoc
    NODE* pTail;    // khuyen dung
};
```

| | Chỉ `pHead` | `pHead` + `pTail` |
|---|-------------|-------------------|
| Thêm đầu | $O(1)$ | $O(1)$ |
| Thêm cuối | $O(n)$ | $O(1)$ |
| Xóa đầu | $O(1)$ | $O(1)$ |
| Xóa cuối | $O(n)$ | $O(n)$ với DSLK đơn (vẫn phải tìm nút trước tail) |
| Bộ nhớ | 1 con trỏ | 2 con trỏ |

Đề thi và thực hành dùng **cả `pHead` lẫn `pTail`**. Phải **cập nhật `pTail`** mỗi khi thêm/xóa ảnh hưởng nút cuối, nếu quên thì danh sách hỏng âm thầm.

### ✅ Kiểm tra nhanh 3.2

1. DSLK viết tắt của gì? Khác mảng ở chỗ nào về vị trí RAM?
2. Vì sao truy cập phần tử thứ $i$ của DSLK là $O(n)$?
3. Tổ chức tuần tự và tổ chức liên kết khác nhau thế nào?
4. Có `pTail` rồi, xóa cuối DSLK đơn có $O(1)$ không? Vì sao?

**Đáp án:** (1) Danh sách liên kết; nút rải rác, mảng liền kề. (2) Không có công thức địa chỉ, phải đi $i$ bước từ `pHead`. (3) Tuần tự = mảng kề nhau; liên kết = mỗi nút giữ địa chỉ (hoặc chỉ số) nút kế. (4) Không — không có `pPrev`, phải tìm nút kế cuối.

---

## 3.3. DSLK ĐƠN

Đã có định nghĩa và các hình thức tổ chức. Từ đây **cài một loại cụ thể**: danh sách liên kết **đơn**, cấp phát **động bằng con trỏ** — đúng trọng tâm đề thi.

**DSLK đơn (Singly Linked List):** mỗi nút chỉ biết nút **đứng sau**. Không đi ngược được.

```
  pHead                                         pTail
    │                                             │
    ▼                                             ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  ●─┼───►│ 40 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘    └────┴────┘

 Đứng ở nút 30: biết 40, KHÔNG biết 20  →  muốn xóa 40 phải đi lại từ pHead
```

Tính chất:

- Đi từ `pHead` theo `pNext` sẽ thăm hết nút, kết thúc ở `NULL`.
- Từ một nút **không** biết nút trước — muốn biết phải duyệt lại từ đầu. Đây là lý do xóa cuối / thêm trước nút $p$ tốn $O(n)$.

---

### 3.3.1. Tổ chức DSLK đơn theo cách cấp phát liên kết

#### A. Khai báo cấu trúc — học thuộc, viết đúng trong mọi bài

```cpp
#include <iostream>
#include <climits>
using namespace std;

struct NODE {
    int data;        // thong tin
    NODE* pNext;     // lien ket toi nut ke
};

struct LIST {
    NODE* pHead;     // nut dau
    NODE* pTail;     // nut cuoi
};
```

Mỗi lần `new NODE` là **một lần cấp phát liên kết**: hệ điều hành tìm một chỗ trống trên Heap, trả về địa chỉ, ta cất địa chỉ đó vào `pNext` của nút trước.

```
 struct NODE                  struct LIST
 ┌────┬────┐                  ┌────────┬────────┐
 │data│pNext│                 │ pHead  │ pTail  │
 └────┴────┘                  └────────┴────────┘
      ▲                            │         │
      │                            │         └──► nút cuối
      └── new NODE                 └──────────► nút đầu
```

#### B. Khởi tạo danh sách rỗng

```
  LIST l
  ┌────────┬────────┐
  │ pHead  │ pTail  │
  └───┬────┴───┬────┘
      │        │
      ▼        ▼
     NULL     NULL     ← chưa có nút nào trên Heap
```

**Mã giả:**

```
THUẬT TOÁN KhoiTao(l)
Vào:  l — danh sách
Ra:   l rỗng
1. l.pHead ← NULL
2. l.pTail ← NULL
```

```cpp
void KhoiTao(LIST &l) {
    l.pHead = l.pTail = NULL;
}

bool IsEmpty(LIST l) {
    return l.pHead == NULL;
}
```

#### C. Tạo một nút — đơn vị cấp phát

**Mã giả:**

```
THUẬT TOÁN TaoNode(x) → p
1. p ← cấp phát một NODE
2. Nếu p = NULL thì báo lỗi, dừng
3. p.data  ← x
4. p.pNext ← NULL      // nut moi chua noi vao ai
5. Trả về p
```

```cpp
NODE* TaoNode(int x) {
    NODE* p = new NODE;   // het RAM: C++ nem bad_alloc, khong tra NULL
    p->data  = x;
    p->pNext = NULL;      // bat buoc truoc khi noi vao list
    return p;
}
```

> Giáo trình thực hành cũng viết như trên (không kiểm `NULL`). Muốn `new` trả `NULL` khi hết RAM: `NODE* p = new (nothrow) NODE;` rồi mới `if (p == NULL)`.

**Quy tắc:** nút mới **luôn** có `pNext = NULL` trước khi gắn vào danh sách. Gắn xong mới nối.

```
  TaoNode(10) trả về p:

    p
    │
    ▼
 ┌────┬────┐
 │ 10 │  / │──► NULL     ← hộp đứng một mình, chưa ai nắm, chưa nắm ai
 └────┴────┘
```

#### D. Mô hình cấp phát khi thêm lần lượt 10, 20, 30 vào cuối

**Bước 0 — rỗng:**

```
 pHead ──► NULL     pTail ──► NULL
```

**Bước 1 — thêm 10** (danh sách rỗng: head = tail = nút mới):

```
 pHead, pTail
      │
      ▼
   ┌────┬────┐
   │ 10 │  / │──► NULL
   └────┴────┘
```

**Bước 2 — thêm 20:** `pTail->pNext = p` rồi `pTail = p`

```
 pHead          pTail
   │              │
   ▼              ▼
 ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  / │──► NULL
 └────┴────┘    └────┴────┘
```

**Bước 3 — thêm 30:**

```
 pHead                    pTail
   │                        │
   ▼                        ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘
```

Trên RAM, ba nút có thể ở `0x1A00`, `0x20F8`, `0x0C10` — không liền kề. Logic vẫn là 10→20→30 vì ta **gán con trỏ**, không phải vì địa chỉ tăng dần.

#### E. Duyệt danh sách — thao tác nền của mọi thuật toán

Muốn “nhìn” hết danh sách, chỉ có một cách: đi từ `pHead` đến khi gặp `NULL`.

**Mã giả:**

```
THUẬT TOÁN Duyet(l)
1. p ← l.pHead
2. while p ≠ NULL
3.     xử lý p.data        // in, dem, so sanh...
4.     p ← p.pNext
5. hết
```

```cpp
void Xuat(LIST l) {
    NODE* p = l.pHead;
    cout << "Danh sach: ";
    while (p != NULL) {
        cout << p->data << " -> ";
        p = p->pNext;
    }
    cout << "NULL\n";
}

int DemSoPhanTu(LIST l) {
    int dem = 0;
    for (NODE* p = l.pHead; p != NULL; p = p->pNext)
        dem++;
    return dem;
}
```

| | Thời gian | Không gian |
|---|-----------|------------|
| Duyệt / Đếm / Xuất | $O(n)$ | $O(1)$ |

**Lỗi kinh điển khi duyệt:**

```cpp
while (p != NULL) {
    cout << p->data;
    /* quen p = p->pNext  → vong lap vo han */
}
```

```cpp
while (p->pNext != NULL) {   // SAI neu muon xu ly ca nut cuoi
    cout << p->data;
    p = p->pNext;
}
```

Điều kiện `p != NULL` thì thăm **mọi** nút. Điều kiện `p->pNext != NULL` thì **bỏ nút cuối** — chỉ dùng khi cố ý dừng ở nút *trước* cuối (ví dụ xóa cuối).

#### F. Hai cách “cầm” danh sách trong hàm

```cpp
void Xuat(LIST l);        // copy 2 con tro head/tail, khong sua duoc danh sach goc
void ThemDau(LIST &l, NODE* p);  // sua duoc pHead, pTail
```

In/đếm/tìm: truyền `LIST l`.
Thêm/xóa/sắp xếp: truyền `LIST &l`.

---

### 3.3.2. Các thao tác cơ bản trên DSLK đơn

**Thứ tự logic khi học (và khi viết chương trình):**

```
Tạo rỗng → Tạo nút → Thêm (đầu/cuối) → Xuất
       → Tìm / Đếm / Min-max
       → Thêm giữa / Xóa
       → Hủy
```

Mục 3.3.1 đã xong khối “tạo rỗng, tạo nút, xuất”. Dưới đây lần lượt: tìm → thêm → xóa → thống kê → hủy. Mỗi thao tác: **ý tưởng → sơ đồ → mã giả → code → độ phức tạp → bẫy**.

Muốn **thử ngay**: gõ `KhoiTao` + `ThemCuoi` + `Xuat` trước, rồi mới học xóa. Đừng học xóa khi chưa dựng được một list.

---

#### ① Tìm kiếm theo giá trị

**Ý tưởng:** duyệt tuyến tính, so sánh `data`. DSLK **không** binary search được — không có chỉ số, không nhảy giữa list được.

**Ví dụ:** tìm `30` trong `10 → 20 → 30 → 40`. Con trỏ `p` **đi từng hộp**, không nhảy:

```
  pHead
    │
    ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  ●─┼───►│ 40 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘    └────┴────┘
    ▲                ▲              ▲
  B1: 10≠30       B2: 20≠30      B3: 30=30  → trả về p
```

Không tìm thấy: `p` đi tới `NULL`, trả về `NULL` (không phải `-1` như trên mảng — vì không có chỉ số).

**Mã giả:**

```
THUẬT TOÁN Tim(l, x) → p
1. p ← l.pHead
2. while p ≠ NULL
3.     nếu p.data = x thì trả về p
4.     p ← p.pNext
5. trả về NULL
```

```cpp
NODE* Tim(LIST l, int x) {
    NODE* p = l.pHead;
    while (p != NULL) {
        if (p->data == x) return p;
        p = p->pNext;
    }
    return NULL;
}
```

| Trường hợp | Độ phức tạp |
|------------|-------------|
| Tốt nhất (nút đầu) | $O(1)$ |
| Trung bình / xấu nhất | $O(n)$ |

---

#### ② Thêm vào đầu — $O(1)$ — thao tác “rẻ” nhất của DSLK đơn

**Ý tưởng:** nút mới trỏ tới head cũ, rồi head trỏ tới nút mới.

**Trường hợp rỗng:**

```
 Trước:  pHead ──► NULL    pTail ──► NULL

 Sau:    pHead, pTail
              │
              ▼
           ┌────┬────┐
           │  5 │  / │──► NULL
           └────┴────┘
```

**Trường hợp đã có nút — đúng thứ tự ① rồi ②:**

```
 TRƯỚC                         p (nút mới, chưa nối)
  pHead          pTail           │
    │              │             ▼
    ▼              ▼          ┌────┬────┐
 ┌────┬────┐    ┌────┬────┐   │  5 │  / │
 │ 10 │  ●─┼───►│ 20 │  / │   └────┴────┘
 └────┴────┘    └────┴────┘

 ①  p->pNext = l.pHead     (5 nắm lấy 10 — PHẢI làm trước)
 ②  l.pHead  = p           (cửa vào chuyển sang 5)
     pTail không đổi

 SAU
  pHead                    pTail
    │                        │
    ▼                        ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │  5 │  ●─┼───►│ 10 │  ●─┼───►│ 20 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘
```

**Sai nếu đảo ② trước ①:** `pHead = p` khi `p->pNext` còn NULL → mất đường tới 10 và 20 (rò rỉ cả list cũ).

**Mã giả:**

```
THUẬT TOÁN ThemDau(l, p)
1. nếu l.pHead = NULL
2.     l.pHead ← p
3.     l.pTail ← p
4. ngược lại
5.     p.pNext ← l.pHead
6.     l.pHead ← p
```

```cpp
void ThemDau(LIST &l, NODE* p) {
    if (p == NULL) return;
    if (l.pHead == NULL) {
        l.pHead = l.pTail = p;
    } else {
        p->pNext = l.pHead;
        l.pHead  = p;
    }
}

void ThemDauGiaTri(LIST &l, int x) {
    ThemDau(l, TaoNode(x));
}
```

**Thứ tự gán bắt buộc:** phải `p->pNext = l.pHead` **trước**, rồi mới `l.pHead = p`. Đảo ngược thì mất cả danh sách cũ.

Độ phức tạp: **$O(1)$** — không duyệt.

---

#### ③ Thêm vào cuối — $O(1)$ nhờ `pTail`

**Không có `pTail`:** phải duyệt đến nút cuối rồi nối → $O(n)$.
**Có `pTail`:** nối thẳng vào tail → $O(1)$.

```
 TRƯỚC
  pHead          pTail              p (nút mới)
    │              │                │
    ▼              ▼                ▼
 ┌────┬────┐    ┌────┬────┐      ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  / │      │ 30 │  / │
 └────┴────┘    └────┴────┘      └────┴────┘

 ①  l.pTail->pNext = p     (20 nắm lấy 30)
 ②  l.pTail = p            (cửa cuối chuyển sang 30)

 SAU
  pHead                    pTail
    │                        │
    ▼                        ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘
```

**Mã giả:**

```
THUẬT TOÁN ThemCuoi(l, p)
1. nếu l.pHead = NULL
2.     l.pHead ← p
3.     l.pTail ← p
4. ngược lại
5.     l.pTail.pNext ← p
6.     l.pTail ← p
```

```cpp
void ThemCuoi(LIST &l, NODE* p) {
    if (p == NULL) return;
    if (l.pHead == NULL) {
        l.pHead = l.pTail = p;
    } else {
        l.pTail->pNext = p;
        l.pTail = p;
    }
}
```

**Bẫy:** sau `ThemCuoi`, `p->pNext` phải là `NULL` (đã làm trong `TaoNode`). Nếu `p` đang là một chuỗi nút, cả chuỗi sẽ bị gắn vào — hữu ích khi nối hai list, nguy hiểm nếu quên.

Độ phức tạp: **$O(1)$** với `pTail`, **$O(n)$** nếu chỉ có `pHead`.

---

#### ④ Thêm sau một nút `q` cho trước — $O(1)$

Đã **cầm sẵn** con trỏ `q` thì không cần tìm.

```
 TRƯỚC  (q đang cầm nút 20)
  pHead          q                         pTail
    │            │                           │
    ▼            ▼                           ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 40 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘

 p = nút 30. Thứ tự BẮT BUỘC:
 ①  p->pNext = q->pNext     (30 nắm 40 — giữ phần sau trước khi cắt)
 ②  q->pNext = p            (20 nắm 30)
     nếu q == pTail thì pTail = p

 SAU
  pHead          q              p            pTail
    │            │              │              │
    ▼            ▼              ▼              ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  ●─┼───►│ 40 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘    └────┴────┘
```

**Mã giả:**

```
THUẬT TOÁN ThemSau(l, q, p)
Vào: q ≠ NULL, p là nút mới
1. p.pNext ← q.pNext
2. q.pNext ← p
3. nếu q là l.pTail thì l.pTail ← p
```

```cpp
void ThemSau(LIST &l, NODE* q, NODE* p) {
    if (q == NULL || p == NULL) return;
    p->pNext = q->pNext;
    q->pNext = p;
    if (q == l.pTail)
        l.pTail = p;
}
```

**Thứ tự hai dòng 1–2 không được đảo:** nếu gán `q->pNext = p` trước thì mất liên kết tới phần sau.

---

#### ⑤ Thêm trước một nút `q` — $O(n)$ trên DSLK đơn

DSLK đơn **không có `pPrev`**, nên phải tìm nút **đứng trước** `q`.

**Mã giả:**

```
THUẬT TOÁN ThemTruoc(l, q, p)
1. nếu q = l.pHead thì ThemDau(l, p); return
2. t ← l.pHead
3. while t ≠ NULL và t.pNext ≠ q
4.     t ← t.pNext
5. nếu t ≠ NULL thì ThemSau(l, t, p)
```

```cpp
void ThemTruoc(LIST &l, NODE* q, NODE* p) {
    if (q == NULL || p == NULL) return;
    if (q == l.pHead) {
        ThemDau(l, p);
        return;
    }
    NODE* t = l.pHead;
    while (t != NULL && t->pNext != q)
        t = t->pNext;
    if (t != NULL)
        ThemSau(l, t, p);
}
```

Độ phức tạp: $O(n)$ vì phải tìm nút trước. Trên **DSLK kép** thao tác này là $O(1)$.

**Sơ đồ** (thêm `15` trước nút `20` — `q` cầm 20):

```
 TRƯỚC
  pHead          q
    │            │
    ▼            ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘

 Không có pPrev → phải đi từ pHead tìm t sao cho t->pNext == q
  t cầm nút 10. Rồi ThemSau(l, t, p) như mục ④.

 SAU
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 15 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘    └────┴────┘
```

**Bẫy:** nếu `q` không thuộc list, vòng `while` đi tới `NULL` rồi không thêm — phải kiểm tra `t != NULL`.

---

#### ⑥ Thêm tại vị trí `k` (k đếm từ 0)

```
k = 0          → ThemDau
k = số phần tử → ThemCuoi
0 < k < n      → đứng ở nút k-1, ThemSau
k không hợp lệ → báo lỗi, không thêm
```

```cpp
void ThemTaiViTri(LIST &l, int k, int x) {
    int n = DemSoPhanTu(l);
    if (k < 0 || k > n) {
        cout << "Vi tri khong hop le!\n";
        return;
    }
    NODE* p = TaoNode(x);
    if (k == 0) { ThemDau(l, p); return; }
    NODE* q = l.pHead;
    for (int i = 0; i < k - 1; i++)
        q = q->pNext;
    ThemSau(l, q, p);
}
```

Thời gian: $O(n)$ (đi tới vị trí). Việc gắn nút: $O(1)$.

**Ví dụ chạy tay:** list `10 → 20 → 30` ($n = 3$).

| $k$ | Ý nghĩa | Kết quả |
|-----|---------|---------|
| 0 | Thêm đầu | `x → 10 → 20 → 30` |
| 1 | Đứng ở nút 0, thêm sau | `10 → x → 20 → 30` |
| 3 | Thêm cuối ($k = n$) | `10 → 20 → 30 → x` |
| 4 | Không hợp lệ | Không thêm |

---

#### ⑥b. Lấy phần tử thứ $k$ (truy cập)

Không có `a[k]`. Phải đi $k$ bước từ `pHead`.

```cpp
NODE* LayTaiViTri(LIST l, int k) {
    if (k < 0) return NULL;
    NODE* p = l.pHead;
    int i = 0;
    while (p != NULL && i < k) {
        p = p->pNext;
        i++;
    }
    return p;   // NULL nếu k >= n
}
```

$O(k)$, xấu nhất $O(n)$. Đây là lý do DSLK **thua mảng** khi cần lấy phần tử giữa thường xuyên.

---

#### ⑦ Xóa đầu — $O(1)$

```
 TRƯỚC
  pHead                    pTail
    │                        │
    ▼                        ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘

 temp = pHead (giữ 10 để delete)
 pHead = pHead->pNext  (cửa vào nhảy sang 20)
 delete temp

 SAU
                pHead          pTail
                  │              │
                  ▼              ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │    │    │ 20 │  ●─┼───►│ 30 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘
   đã delete
```

**Mã giả:**

```
THUẬT TOÁN XoaDau(l)
1. nếu l.pHead = NULL thì return          // rong
2. p ← l.pHead
3. l.pHead ← l.pHead.pNext
4. nếu l.pHead = NULL thì l.pTail ← NULL  // vua xoa nut duy nhat
5. delete p
```

```cpp
void XoaDau(LIST &l) {
    if (l.pHead == NULL) return;
    NODE* p = l.pHead;
    l.pHead = l.pHead->pNext;
    if (l.pHead == NULL)
        l.pTail = NULL;
    delete p;
}
```

**Bẫy 1:** quên cập nhật `pTail` khi xóa nút duy nhất → `pTail` dangling.
**Bẫy 2:** `delete` rồi mới `pHead = pHead->pNext` → đọc ô nhớ đã giải phóng.

---

#### ⑧ Xóa cuối — $O(n)$ trên DSLK đơn

Phải tìm nút **kế cuối** (nút có `pNext == pTail`). Có `pTail` **không** giúp xóa cuối xuống $O(1)$, vì không có `pPrev`. Muốn $O(1)$ phải dùng DSLK kép.

**Vì sao phải tìm nút kế cuối?** Xóa nút cuối rồi, nút đứng trước nó phải trỏ `NULL` và trở thành `pTail` mới. DSLK đơn không đi lùi được nên phải đi từ đầu.

```
 TRƯỚC
  pHead                    pTail
    │                        │
    ▼                        ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘
                  p              (p->pNext == pTail)

 p đi từ đầu đến nút KẾ CUỐI (20).
 delete pTail (30)
 p->pNext = NULL
 pTail = p

 SAU
  pHead          pTail
    │              │
    ▼              ▼
 ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  / │──► NULL
 └────┴────┘    └────┴────┘
```

Ba trường hợp bắt buộc:

| List | Cách xử lý |
|------|------------|
| Rỗng | Không làm gì |
| 1 nút (`pHead == pTail`) | `delete` nút đó, cả hai con trỏ về `NULL` |
| ≥ 2 nút | Tìm kế cuối như sơ đồ |

**Mã giả:**

```
THUẬT TOÁN XoaCuoi(l)
1. nếu rỗng thì return
2. nếu chỉ 1 nút thì XoaDau(l); return
3. p ← l.pHead
4. while p.pNext ≠ l.pTail
5.     p ← p.pNext          // p dung o nut ke cuoi
6. delete l.pTail
7. p.pNext ← NULL
8. l.pTail ← p
```

```cpp
void XoaCuoi(LIST &l) {
    if (l.pHead == NULL) return;
    if (l.pHead == l.pTail) {
        delete l.pHead;
        l.pHead = l.pTail = NULL;
        return;
    }
    NODE* p = l.pHead;
    while (p->pNext != l.pTail)
        p = p->pNext;
    delete l.pTail;
    p->pNext = NULL;
    l.pTail = p;
}
```

---

#### ⑨ Xóa sau nút `q` — $O(1)$ nếu đã có `q`

```
 TRƯỚC  (q cầm 20, xóa nút SAU q)
  pHead          q              p=q->pNext     pTail
    │            │              │                │
    ▼            ▼              ▼                ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  ●─┼───►│ 40 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘    └────┴────┘

 ①  q->pNext = p->pNext     (20 nhảy cóc sang 40)
 ②  nếu p == pTail thì pTail = q
 ③  delete p

 SAU
  pHead          q                         pTail
    │            │                           │
    ▼            ▼                           ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 40 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘
```

**Mã giả:**

```
THUẬT TOÁN XoaSau(l, q)
1. nếu q = NULL hoặc q.pNext = NULL thì return   // khong co nut sau de xoa
2. p ← q.pNext
3. q.pNext ← p.pNext
4. nếu p = l.pTail thì l.pTail ← q
5. delete p
```

```cpp
void XoaSau(LIST &l, NODE* q) {
    if (q == NULL || q->pNext == NULL) return;
    NODE* p = q->pNext;       // nut bi xoa
    q->pNext = p->pNext;
    if (p == l.pTail)
        l.pTail = q;
    delete p;
}
```

**Bẫy:** quên dòng 4 khi xóa đúng nút cuối → `pTail` treo. Không được `XoaSau` khi muốn xóa chính `q` — hàm này xóa **nút đứng sau** `q`.

---

#### ⑩ Xóa theo giá trị (nút đầu tiên có `data == x`)

Hai nhánh: xóa đầu, hoặc tìm nút trước nút cần xóa rồi `XoaSau`.

```
 List: xóa x = 30
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  ●─┼───►│ 40 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘    └────┴────┘
                  q              q->pNext->data == 30
                                 → XoaSau(l, q)
```

Nếu `x` nằm ở đầu: không có nút trước → gọi `XoaDau`.

```cpp
void XoaNodeTheoGiaTri(LIST &l, int x) {
    if (l.pHead == NULL) return;
    if (l.pHead->data == x) {
        XoaDau(l);
        return;
    }
    NODE* q = l.pHead;
    while (q->pNext != NULL && q->pNext->data != x)
        q = q->pNext;
    if (q->pNext != NULL)
        XoaSau(l, q);
    else
        cout << "Khong tim thay " << x << "\n";
}
```

Hàm `XoaMin` (xóa phần tử nhỏ nhất — hay ra đề) = tìm min rồi gọi hàm này; xem mục ⑪.

---

#### ⑩b. Xóa tại vị trí $k$ (đếm từ 0)

Đề bài và bài tập thường hỏi hàm này. Tư duy giống thêm tại vị trí, nhưng gọi xóa.

```
k = 0      → XoaDau
k > 0      → đứng ở nút k-1, XoaSau
k không hợp lệ (k < 0 hoặc k ≥ n) → không xóa
```

```cpp
void XoaTaiViTri(LIST &l, int k) {
    int n = DemSoPhanTu(l);
    if (k < 0 || k >= n) {
        cout << "Vi tri khong hop le!\n";
        return;
    }
    if (k == 0) {
        XoaDau(l);
        return;
    }
    NODE* q = l.pHead;
    for (int i = 0; i < k - 1; i++)
        q = q->pNext;
    XoaSau(l, q);
}
```

$O(n)$. Lưu ý: thêm tại $k$ cho phép $k = n$ (thêm sau phần tử cuối); **xóa** tại $k$ **không** cho $k = n$ vì không có phần tử đó.

---

```cpp
void XoaTatCaGiaTri(LIST &l, int x) {
    while (Tim(l, x) != NULL)
        XoaNodeTheoGiaTri(l, x);
}
```

Độ phức tạp: $O(n)$ một lần xóa; $O(n^2)$ nếu xóa hết bản sao theo cách naive ở trên. Cách một lần duyệt $O(n)$:

```cpp
void XoaTatCaGiaTri_O_n(LIST &l, int x) {
    while (l.pHead != NULL && l.pHead->data == x)
        XoaDau(l);
    NODE* q = l.pHead;
    while (q != NULL && q->pNext != NULL) {
        if (q->pNext->data == x)
            XoaSau(l, q);     // q dung yen, vi nut sau da doi
        else
            q = q->pNext;
    }
}
```

---

#### ⑪ Tìm min / max, thống kê — mẫu đề thi

```cpp
int TimMin(LIST l) {
    if (l.pHead == NULL) return INT_MAX;
    int m = l.pHead->data;
    for (NODE* p = l.pHead->pNext; p != NULL; p = p->pNext)
        if (p->data < m) m = p->data;
    return m;
}

NODE* TimNodeMax(LIST l) {
    if (l.pHead == NULL) return NULL;
    NODE* mx = l.pHead;
    for (NODE* p = l.pHead->pNext; p != NULL; p = p->pNext)
        if (p->data > mx->data) mx = p;
    return mx;
}

bool LaSoNguyenTo(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}

int DemSoNguyenTo(LIST l) {
    int dem = 0;
    for (NODE* p = l.pHead; p != NULL; p = p->pNext)
        if (LaSoNguyenTo(p->data)) dem++;
    return dem;
}

void LietKeSoChan(LIST l) {
    for (NODE* p = l.pHead; p != NULL; p = p->pNext)
        if (p->data % 2 == 0) cout << p->data << " ";
    cout << "\n";
}
```

Tất cả $O(n)$.

```cpp
void XoaMin(LIST &l) {          // mau de thi
    if (l.pHead == NULL) return;
    XoaNodeTheoGiaTri(l, TimMin(l));
}
```

Hai lần duyệt: một lần tìm min, một lần xóa → vẫn $O(n)$.

**Vì sao `TimMin` bắt đầu từ `pHead->pNext`?** Vì `m` đã lấy `pHead->data` làm mốc. So sánh lại nút đầu là thừa, không sai.

---

#### ⑫ Tách danh sách theo điều kiện (mẫu đề thi)

Tách `l` thành `l1` (số nguyên tố) và `l2` (còn lại). **Không phá** `l` gốc nếu đề yêu cầu — tạo node mới.

**Ví dụ:** `l = 7 → 4 → 9 → 2 → 8`

```
 l gốc (không bị phá):
 ┌────┬────┐   ┌────┬────┐   ┌────┬────┐   ┌────┬────┐   ┌────┬────┐
 │  7 │  ●─┼──►│  4 │  ●─┼──►│  9 │  ●─┼──►│  2 │  ●─┼──►│  8 │  / │
 └────┴────┘   └────┴────┘   └────┴────┘   └────┴────┘   └────┴────┘

 l1 nguyên tố:     ┌────┬────┐   ┌────┬────┐
                   │  7 │  ●─┼──►│  2 │  / │
                   └────┴────┘   └────┴────┘
 l2 không:         ┌────┬────┐   ┌────┬────┐   ┌────┬────┐
                   │  4 │  ●─┼──►│  9 │  ●─┼──►│  8 │  / │
                   └────┴────┘   └────┴────┘   └────┴────┘
```

```cpp
void Tach(LIST l, LIST &l1, LIST &l2) {
    KhoiTao(l1);
    KhoiTao(l2);
    for (NODE* p = l.pHead; p != NULL; p = p->pNext) {
        NODE* q = TaoNode(p->data);
        if (LaSoNguyenTo(p->data)) ThemCuoi(l1, q);
        else                       ThemCuoi(l2, q);
    }
}
```

$O(n)$. Nếu được phép **di chuyển node** (không `new` lại) thì phải cắt/nối `pNext` cẩn thận và cập nhật 3 cái tail.

---

#### ⑬ Hủy toàn bộ danh sách — chống memory leak

```
THUẬT TOÁN HuyDanhSach(l)
1. while l.pHead ≠ NULL
2.     XoaDau(l)
```

```cpp
void HuyDanhSach(LIST &l) {
    while (l.pHead != NULL)
        XoaDau(l);
}
```

$O(n)$. Sau khi hủy: `pHead = pTail = NULL`.

**Sai:** `delete l.pHead` một lần rồi thôi — chỉ giải phóng nút đầu, $n-1$ nút leak.

---

#### ⑭ Bảng tổng hợp độ phức tạp DSLK đơn (`pHead` + `pTail`)

| Thao tác | Thời gian | Ghi chú |
|----------|-----------|---------|
| Khởi tạo / Rỗng? | $O(1)$ | |
| Truy cập thứ $i$ | $O(n)$ | Không có `a[i]` |
| Tìm theo giá trị | $O(n)$ | |
| Thêm/Xóa đầu | $O(1)$ | |
| Thêm cuối | $O(1)$ | Nhờ `pTail` |
| Xóa cuối | $O(n)$ | Phải tìm nút kế cuối |
| Thêm/Xóa sau nút `q` | $O(1)$ | Đã có `q` |
| Thêm/Xóa trước nút `q` | $O(n)$ | Phải tìm nút trước |
| Thêm/Xóa vị trí $k$ | $O(n)$ | `ThemTaiViTri` / `XoaTaiViTri` |
| Duyệt / Đếm / Hủy | $O(n)$ | |
| Không gian | $O(n)$ | Thêm 1 con trỏ / nút |

---

#### ⑮ Ví dụ chạy tay cả chuỗi thao tác (đọc để “thấy” pHead / pTail)

Bắt đầu list rỗng. Theo dõi **từng** thay đổi — đây là cách debug DSLK trên giấy trước khi gõ code.

| Bước | Thao tác | Danh sách | pHead | pTail |
|------|----------|-----------|-------|-------|
| 0 | `KhoiTao` | (rỗng) | `NULL` | `NULL` |
| 1 | `ThemCuoi(5)` | `5` | 5 | 5 |
| 2 | `ThemDau(2)` | `2 → 5` | 2 | 5 |
| 3 | `ThemCuoi(9)` | `2 → 5 → 9` | 2 | 9 |
| 4 | `XoaDau` | `5 → 9` | 5 | 9 |
| 5 | `ThemTaiViTri(1, 7)` | `5 → 7 → 9` | 5 | 9 |
| 6 | `XoaCuoi` | `5 → 7` | 5 | 7 |
| 7 | `XoaNodeTheoGiaTri(5)` | `7` | 7 | 7 |
| 8 | `XoaDau` | (rỗng) | `NULL` | `NULL` |

Bước 8 là chỗ hay quên: xóa nút duy nhất phải đưa **cả** `pHead` và `pTail` về `NULL`. Nếu quên `pTail`, lần `ThemCuoi` sau sẽ ghi vào ô nhớ đã `delete` → crash.

#### ⑯ Chương trình tối thiểu — copy, biên dịch, chạy được

Ghép các hàm đã học: `KhoiTao`, `TaoNode`, `ThemDau`, `ThemCuoi`, `Xuat`, `XoaDau`, `SapXep`, `HuyDanhSach`. Lưu `dslk.cpp`, chạy:

```bash
c++ -std=c++11 -o dslk dslk.cpp && ./dslk
```

```cpp
#include <iostream>
using namespace std;

struct NODE {
    int data;
    NODE* pNext;
};
struct LIST {
    NODE* pHead;
    NODE* pTail;
};

void KhoiTao(LIST &l) { l.pHead = l.pTail = NULL; }

NODE* TaoNode(int x) {
    NODE* p = new NODE;
    p->data = x;
    p->pNext = NULL;
    return p;
}

void ThemDau(LIST &l, NODE* p) {
    if (p == NULL) return;
    if (l.pHead == NULL) l.pHead = l.pTail = p;
    else { p->pNext = l.pHead; l.pHead = p; }
}

void ThemCuoi(LIST &l, NODE* p) {
    if (p == NULL) return;
    if (l.pHead == NULL) l.pHead = l.pTail = p;
    else { l.pTail->pNext = p; l.pTail = p; }
}

void Xuat(LIST l) {
    for (NODE* p = l.pHead; p != NULL; p = p->pNext)
        cout << p->data << " -> ";
    cout << "NULL\n";
}

void XoaDau(LIST &l) {
    if (l.pHead == NULL) return;
    NODE* p = l.pHead;
    l.pHead = l.pHead->pNext;
    if (l.pHead == NULL) l.pTail = NULL;
    delete p;
}

void SapXep(LIST &l) {
    if (l.pHead == NULL || l.pHead == l.pTail) return;
    for (NODE* p = l.pHead; p != NULL; p = p->pNext)
        for (NODE* q = p->pNext; q != NULL; q = q->pNext)
            if (p->data > q->data) {
                int t = p->data; p->data = q->data; q->data = t;
            }
}

void HuyDanhSach(LIST &l) {
    while (l.pHead != NULL) XoaDau(l);
}

int main() {
    LIST l;
    KhoiTao(l);
    ThemCuoi(l, TaoNode(40));
    ThemCuoi(l, TaoNode(10));
    ThemCuoi(l, TaoNode(30));
    ThemCuoi(l, TaoNode(20));
    ThemDau(l, TaoNode(5));
    cout << "Truoc sort: "; Xuat(l);     // 5 -> 40 -> 10 -> 30 -> 20 -> NULL
    SapXep(l);
    cout << "Sau sort:   "; Xuat(l);     // 5 -> 10 -> 20 -> 30 -> 40 -> NULL
    XoaDau(l);
    cout << "Sau xoa dau:"; Xuat(l);     // 10 -> 20 -> 30 -> 40 -> NULL
    HuyDanhSach(l);
    return 0;
}
```

Kết quả kỳ vọng:

```
Truoc sort: 5 -> 40 -> 10 -> 30 -> 20 -> NULL
Sau sort:   5 -> 10 -> 20 -> 30 -> 40 -> NULL
Sau xoa dau:10 -> 20 -> 30 -> 40 -> NULL
```

---

### 3.3.3. Sắp xếp danh sách

Sắp xếp trên DSLK **khác** sắp xếp trên mảng:

| Trên mảng | Trên DSLK |
|-----------|-----------|
| `a[i]`, `a[j]` $O(1)$ | Không có chỉ số — Quick Sort “chia theo pivot index” khó viết |
| Swap 2 phần tử $O(1)$ | Swap **giá trị** $O(1)$; swap **nút** (relink) phức tạp hơn |
| Merge Sort tốn mảng phụ $O(n)$ | Merge Sort **rất hợp**: trộn bằng sửa con trỏ, không cần mảng phụ |

Hai chiến lược:

1. **Hoán đổi `data`** — đúng đề thi và giáo trình thực hành (“sắp xếp bằng hoán đổi giá trị”). Nút đứng yên, số bên trong đổi chỗ.
2. **Relink nút** — đổi dây `pNext`, không copy `data`. Dùng khi `data` là struct lớn.

---

#### A. Đổi chỗ trực tiếp — hàm `SapXep` đúng giáo trình / đề thi

Đây **không** phải Selection Sort. Giáo trình lồng hai vòng: với mỗi `p`, so với **mọi** `q` phía sau; hễ `p->data > q->data` thì đổi ngay.

**Ý tưởng tiếng Việt:** “Người đứng ở `p` nhìn hết những người phía sau. Gặp ai nhỏ hơn mình thì đổi số với người đó, rồi nhìn tiếp.”

**Mã giả:**

```
THUẬT TOÁN SapXep(l)                       // tang dan, doi cho truc tiep
1. nếu rỗng hoặc 1 nút thì return
2. p ← l.pHead
3. while p ≠ NULL
4.     q ← p.pNext
5.     while q ≠ NULL
6.         nếu p.data > q.data thì hoán đổi p.data ↔ q.data
7.         q ← q.pNext
8.     p ← p.pNext
```

```cpp
void SapXep(LIST &l) {     // dung dung ten + dung dung giai thuat giao trinh
    if (l.pHead == NULL || l.pHead == l.pTail) return;
    NODE* p = l.pHead;
    while (p != NULL) {
        NODE* q = p->pNext;
        while (q != NULL) {
            if (p->data > q->data) {
                int temp = p->data;
                p->data = q->data;
                q->data = temp;
            }
            q = q->pNext;
        }
        p = p->pNext;
    }
}
```

**Chạy tay** `40 → 10 → 30 → 20` — **bắt buộc** nhớ: sau mỗi lần đổi, `p->data` đã đổi, vòng trong so tiếp với giá trị **mới**:

```
Ban đầu:  40 → 10 → 30 → 20
```

| Vòng `p` (nút, không phải số) | Việc xảy ra trong vòng trong | List sau vòng |
|-------------------------------|------------------------------|---------------|
| Nút 1 (đang 40) | 40>10 đổi → nút 1 thành **10**; 10>30? không; 10>20? không | **10** → 40 → 30 → 20 |
| Nút 2 (đang 40) | 40>30 đổi → 30; 30>20 đổi → **20** | 10 → **20** → 40 → 30 |
| Nút 3 (đang 40) | 40>30 đổi | 10 → 20 → **30** → 40 |
| Nút 4 (đang 40) | không còn `q` | 10 → 20 → 30 → **40** |

Sai nếu viết “nút 1 đổi với cả 10, 30 và 20”: sau lần đổi đầu, nút 1 đã là 10, không còn là 40.

- Thời gian $O(n^2)$, không gian $O(1)$.
- Giảm dần: đổi `>` thành `<`.
- Nút **không** bị cắt/nối; `pHead`/`pTail` giữ nguyên địa chỉ.

**Khác Selection Sort:** Selection tìm *một* min rồi swap **một lần** mỗi vòng ngoài. Đổi chỗ trực tiếp có thể swap **nhiều lần** trong một vòng. Đề thi yêu cầu bản đổi chỗ trực tiếp ở trên — đừng nộp nhầm Selection trừ khi đề nói “chọn phần tử nhỏ nhất”.

```cpp
void SapXepChon(LIST &l) {          // bien the: selection, khong phai de mau
    for (NODE* p = l.pHead; p != NULL; p = p->pNext) {
        NODE* min = p;
        for (NODE* q = p->pNext; q != NULL; q = q->pNext)
            if (q->data < min->data) min = q;
        if (min != p) {
            int tmp = p->data; p->data = min->data; min->data = tmp;
        }
    }
}
```

---

#### B. Bubble Sort trên DSLK

**Ý tưởng:** chỉ so **hai nút kề nhau**. Số lớn “nổi” dần về cuối, giống bọt nước. Khác mục A: mục A so `p` với cả đoạn sau; Bubble chỉ so `p` với `p->pNext`.

Mỗi lượt duyệt: nếu `p->data > p->pNext->data` thì đổi. Lặp đến khi một lượt **không còn đổi** nào.

```cpp
void BubbleSort(LIST &l) {
    if (l.pHead == NULL) return;
    bool swapped;
    do {
        swapped = false;
        for (NODE* p = l.pHead; p->pNext != NULL; p = p->pNext) {
            if (p->data > p->pNext->data) {
                int tmp = p->data;
                p->data = p->pNext->data;
                p->pNext->data = tmp;
                swapped = true;
            }
        }
    } while (swapped);
}
```

$O(n^2)$, ổn định nếu chỉ swap khi `>`. Dùng để hiểu; thi thì viết `SapXep` mục A.

---

#### C. Insertion Sort bằng relink nút — $O(n^2)$, hợp DSLK

**Ý tưởng:** dựng một list `sorted` ban đầu rỗng. Mỗi lần **cắt** nút đầu của list gốc, **cắm** vào đúng chỗ trong `sorted` (như sắp bài trên tay).

```
Gốc:     30 → 10 → 40 → 20
sorted:  (rỗng)

Lấy 30:  sorted = 30
Lấy 10:  10 nhỏ hơn 30 → cắm đầu → 10 → 30
Lấy 40:  40 lớn hơn 30 → cắm cuối → 10 → 30 → 40
Lấy 20:  10 < 20 < 30 → cắm giữa → 10 → 20 → 30 → 40
```

Chèn nút đã cầm sẵn chỉ $O(1)$ phép gán con trỏ; thời gian chủ yếu là **tìm chỗ** $O(n)$.

```cpp
void InsertionSortRelink(LIST &l) {
    NODE* sorted = NULL;
    NODE* cur = l.pHead;
    while (cur != NULL) {
        NODE* next = cur->pNext;
        if (sorted == NULL || cur->data <= sorted->data) {
            cur->pNext = sorted;
            sorted = cur;
        } else {
            NODE* p = sorted;
            while (p->pNext != NULL && p->pNext->data < cur->data)
                p = p->pNext;
            cur->pNext = p->pNext;
            p->pNext = cur;
        }
        cur = next;
    }
    l.pHead = sorted;
    l.pTail = sorted;
    if (l.pTail != NULL) {
        while (l.pTail->pNext != NULL)
            l.pTail = l.pTail->pNext;
    }
}
```

Ổn định. Rất tốt khi dữ liệu **gần như đã sắp**.

---

#### D. Trộn hai danh sách **đã sắp** — $O(n+m)$ (mẫu đề thi)

```
l1:  ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
     │  1 │  ●─┼───►│  4 │  ●─┼───►│  7 │  / │
     └────┴────┘    └────┴────┘    └────┴────┘
l2:  ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
     │  2 │  ●─┼───►│  3 │  ●─┼───►│  8 │  / │
     └────┴────┘    └────┴────┘    └────┴────┘

So từng cặp đầu list: 1≤2 lấy 1; 4>2 lấy 2; 4>3 lấy 3; 4≤8 lấy 4; 7≤8 lấy 7; còn 8.

l3:  ┌───┬──┐ ┌───┬──┐ ┌───┬──┐ ┌───┬──┐ ┌───┬──┐ ┌───┬──┐
     │ 1 │●─┼►│ 2 │●─┼►│ 3 │●─┼►│ 4 │●─┼►│ 7 │●─┼►│ 8 │/ │
     └───┴──┘ └───┴──┘ └───┴──┘ └───┴──┘ └───┴──┘ └───┴──┘
```

**Mã giả (tạo list mới, không phá l1, l2):**

```
THUẬT TOÁN Noi(l1, l2, l3)
1. KhoiTao(l3)
2. p ← l1.pHead, q ← l2.pHead
3. while p ≠ NULL và q ≠ NULL
4.     nếu p.data ≤ q.data
5.         ThemCuoi(l3, TaoNode(p.data)); p ← p.pNext
6.     ngược lại
7.         ThemCuoi(l3, TaoNode(q.data)); q ← q.pNext
8. while p ≠ NULL: ThemCuoi(l3, TaoNode(p.data)); p ← p.pNext
9. while q ≠ NULL: ThemCuoi(l3, TaoNode(q.data)); q ← q.pNext
```

```cpp
void Noi(LIST l1, LIST l2, LIST &l3) {
    KhoiTao(l3);
    NODE* p = l1.pHead;
    NODE* q = l2.pHead;
    while (p != NULL && q != NULL) {
        if (p->data <= q->data) {
            ThemCuoi(l3, TaoNode(p->data));
            p = p->pNext;
        } else {
            ThemCuoi(l3, TaoNode(q->data));
            q = q->pNext;
        }
    }
    while (p != NULL) { ThemCuoi(l3, TaoNode(p->data)); p = p->pNext; }
    while (q != NULL) { ThemCuoi(l3, TaoNode(q->data)); q = q->pNext; }
}
```

Nếu đề cho phép **tái sử dụng nút** (không `TaoNode`), dùng relink: mỗi bước cắt nút nhỏ hơn gắn vào `l3`. $O(1)$ phụ, nhưng `l1`/`l2` bị rỗng sau khi trộn.

---

#### E. Merge Sort trên DSLK — thuật toán “cao cấp” nên dùng thật

Trên mảng, Merge Sort tốn mảng phụ. Trên DSLK, **trộn bằng con trỏ** nên đây là lựa chọn $O(n \log n)$ tự nhiên nhất.

**Chia — trị — trộn**, ví dụ `40 → 10 → 30 → 20`:

```
            40 → 10 → 30 → 20
           /                  \
      40 → 10              30 → 20
      /      \              /     \
    40        10          30       20
      \      /              \     /
      10 → 40              20 → 30
           \                  /
            10 → 20 → 30 → 40
```

**Chia:** tìm nút giữa bằng hai con trỏ chậm/nhanh (slow đi 1, fast đi 2), cắt `mid->pNext = NULL`.
**Trị:** gọi đệ quy từng nửa.
**Trộn:** giống mục D nhưng relink nút, không `TaoNode` lại.

```cpp
NODE* TimGiua(NODE* head) {
    NODE* slow = head;
    NODE* fast = head;
    while (fast->pNext != NULL && fast->pNext->pNext != NULL) {
        slow = slow->pNext;
        fast = fast->pNext->pNext;
    }
    return slow;
}

NODE* MergeRelink(NODE* a, NODE* b) {
    if (a == NULL) return b;
    if (b == NULL) return a;
    NODE dummy;
    NODE* tail = &dummy;
    dummy.pNext = NULL;
    while (a != NULL && b != NULL) {
        if (a->data <= b->data) {
            tail->pNext = a;
            a = a->pNext;
        } else {
            tail->pNext = b;
            b = b->pNext;
        }
        tail = tail->pNext;
    }
    tail->pNext = (a != NULL) ? a : b;
    return dummy.pNext;
}

NODE* MergeSortNodes(NODE* head) {
    if (head == NULL || head->pNext == NULL) return head;
    NODE* mid  = TimGiua(head);
    NODE* half = mid->pNext;
    mid->pNext = NULL;
    NODE* left  = MergeSortNodes(head);
    NODE* right = MergeSortNodes(half);
    return MergeRelink(left, right);
}

void MergeSortList(LIST &l) {
    l.pHead = MergeSortNodes(l.pHead);
    l.pTail = l.pHead;
    if (l.pTail != NULL)
        while (l.pTail->pNext != NULL)
            l.pTail = l.pTail->pNext;
}
```

| | Thời gian | Không gian (stack đệ quy) |
|---|-----------|---------------------------|
| Selection / Bubble / Insertion | $O(n^2)$ | $O(1)$ |
| Merge Sort | $O(n \log n)$ | $O(\log n)$ |

**Không** dùng binary search sau khi sort DSLK: mỗi lần “lấy phần tử giữa” đã tốn $O(n)$ → tổng trở thành $O(n)$ chẳng hơn linear search.

---

#### F. Ưu / nhược khi sắp xếp trên DSLK

**Ưu:** Merge Sort không cần mảng phụ; insertion bằng relink không dồn phần tử.

**Nhược:** không Quick Sort-index; không Heap Sort (heap cần truy cập cha/con theo chỉ số); cache kém nên $O(n \log n)$ trên DSLK thường chậm hơn $O(n \log n)$ trên mảng.

**Kiểm tra đã tăng dần** (bài tập thực hành hay hỏi):

```cpp
bool DaTangDan(LIST l) {
    if (l.pHead == NULL) return true;
    for (NODE* p = l.pHead; p->pNext != NULL; p = p->pNext)
        if (p->data > p->pNext->data) return false;
    return true;
}
```

$O(n)$. Một cặp lệch là đủ kết luận “chưa sort”.

### ✅ Kiểm tra nhanh 3.3

1. `ThemDau` phải gán `p->pNext = pHead` trước hay `pHead = p` trước? Vì sao?
2. Có `pTail` thì thêm cuối $O(?)$, xóa cuối $O(?)$.
3. Đề thi `SapXep` dùng thuật toán nào: đổi chỗ trực tiếp hay Selection?
4. `Noi` yêu cầu hai list đầu vào điều kiện gì?

**Đáp án:** (1) Gán `p->pNext` trước, không thì mất list cũ. (2) $O(1)$ và $O(n)$. (3) Đổi chỗ trực tiếp (hai vòng, gặp lớn hơn thì swap ngay) — đúng code giáo trình. (4) Cả hai **đã sắp** cùng chiều.

---

## 3.4. MỘT SỐ DSLK KHÁC

DSLK đơn đủ cho gần hết bài tập. Nó còn **hai hạn chế**, mỗi hạn chế sinh ra một biến thể:

| Hạn chế của DSLK đơn | Biến thể giải quyết |
|----------------------|---------------------|
| Không đi lùi; xóa cuối $O(n)$; thêm trước một nút $O(n)$ | **DSLK kép** — thêm `pPrev` |
| Không mô tả dữ liệu tuần hoàn; duyệt phải luôn bắt đầu từ head | **DSLK vòng** — nút cuối trỏ về đầu |

Học kép trước (vẫn thẳng, thêm một con trỏ), rồi vòng (đổi điều kiện dừng).

### 3.4.1. DSLK kép (Doubly Linked List)

#### A. Định nghĩa

Mỗi nút có **hai** liên kết:

- `pNext` — nút sau (cột phải)
- `pPrev` — nút trước (cột trái)

```
  pHead                                         pTail
    │                                             │
    ▼                                             ▼
 ┌────┬────┬────┐   ┌────┬────┬────┐   ┌────┬────┬────┐
 │ /  │ 10 │  ●─┼──►│  ● │ 20 │  ●─┼──►│  ● │ 30 │  / │──► NULL
 └────┴────┴────┘   └─▲──┴────┴────┘   └─▲──┴────┴────┘
    ▲    prev data next  │                  │
    └────────────────────┴──────────────────┘
                    pPrev đi ngược

 NULL◄── prev của 10     next của 30 ──► NULL
 Nếu 10.next == 20  thì bắt buộc  20.prev == 10
```

```cpp
struct DNODE {
    int data;
    DNODE* pPrev;
    DNODE* pNext;
};

struct DLIST {
    DNODE* pHead;
    DNODE* pTail;
};

void KhoiTaoD(DLIST &l) {
    l.pHead = l.pTail = NULL;
}

DNODE* TaoDNode(int x) {
    DNODE* p = new DNODE;
    p->data  = x;
    p->pPrev = p->pNext = NULL;
    return p;
}
```

**Bất biến (invariant) phải giữ mọi lúc:**

1. `pHead->pPrev == NULL` (nếu list không rỗng).
2. `pTail->pNext == NULL`.
3. Nếu `a->pNext == b` thì `b->pPrev == a` (liên kết đối xứng).
4. Rỗng: `pHead == pTail == NULL`.

#### B. Duyệt hai chiều

```cpp
void XuatXuoi(DLIST l) {
    for (DNODE* p = l.pHead; p != NULL; p = p->pNext)
        cout << p->data << " ";
    cout << "\n";
}

void XuatNguoc(DLIST l) {
    for (DNODE* p = l.pTail; p != NULL; p = p->pPrev)
        cout << p->data << " ";
    cout << "\n";
}
```

Đây là thứ DSLK đơn **làm không được** (trừ khi dùng stack phụ).

---

#### C. Thêm đầu — $O(1)$

```
 TRƯỚC
                pHead          pTail
                  │              │
                  ▼              ▼
               ┌────┬────┬────┐   ┌────┬────┬────┐
 NULL ◄────────┤ /  │ 20 │  ●─┼──►│  ● │ 30 │  / │──► NULL
               └────┴────┴────┘   └────┴────┴────┘

 p (nút 10) — 4 phép, đúng thứ tự:
 ① p->pNext = pHead
 ② p->pPrev = NULL
 ③ pHead->pPrev = p     (20 nhớ người đứng trước là 10)
 ④ pHead = p

 SAU
  pHead                                         pTail
    │                                             │
    ▼                                             ▼
 ┌────┬────┬────┐   ┌────┬────┬────┐   ┌────┬────┬────┐
 │ /  │ 10 │  ●─┼──►│  ● │ 20 │  ●─┼──►│  ● │ 30 │  / │──► NULL
 └────┴────┴────┘   └────┴────┴────┘   └────┴────┴────┘
```

Cần cập nhật **tới 4** liên kết: `p->pPrev`, `p->pNext`, `head cũ->pPrev`, `pHead`.

**Mã giả:**

```
THUẬT TOÁN ThemDauKep(l, p)
1. nếu rỗng: pHead ← pTail ← p; return
2. p.pNext ← l.pHead
3. p.pPrev ← NULL
4. l.pHead.pPrev ← p
5. l.pHead ← p
```

```cpp
void ThemDauKep(DLIST &l, DNODE* p) {
    if (l.pHead == NULL) {
        l.pHead = l.pTail = p;
        return;
    }
    p->pNext = l.pHead;
    p->pPrev = NULL;
    l.pHead->pPrev = p;
    l.pHead = p;
}
```

---

#### D. Thêm cuối — $O(1)$

Đối xứng với thêm đầu: nắm `pTail` thay vì `pHead`.

```
 TRƯỚC
  pHead          pTail              p (nút 30)
    │              │                │
    ▼              ▼                ▼
 ┌────┬────┬────┐   ┌────┬────┬────┐      ┌────┬────┬────┐
 │ /  │ 10 │  ●─┼──►│  ● │ 20 │  / │      │ /  │ 30 │  / │
 └────┴────┴────┘   └────┴────┴────┘      └────┴────┴────┘

 ① p->pPrev = pTail
 ② p->pNext = NULL
 ③ pTail->pNext = p
 ④ pTail = p

 SAU
  pHead                                         pTail
    │                                             │
    ▼                                             ▼
 ┌────┬────┬────┐   ┌────┬────┬────┐   ┌────┬────┬────┐
 │ /  │ 10 │  ●─┼──►│  ● │ 20 │  ●─┼──►│  ● │ 30 │  / │──► NULL
 └────┴────┴────┘   └────┴────┴────┘   └────┴────┴────┘
```

Bốn phép: `p->pPrev = tail`, `p->pNext = NULL`, `tail->pNext = p`, `pTail = p`.

```cpp
void ThemCuoiKep(DLIST &l, DNODE* p) {
    if (l.pTail == NULL) {
        l.pHead = l.pTail = p;
        return;
    }
    p->pPrev = l.pTail;
    p->pNext = NULL;
    l.pTail->pNext = p;
    l.pTail = p;
}
```

---

#### E. Thêm sau nút `q` — $O(1)$

```
 TRƯỚC  q cầm 20, thêm p=25
 ┌────┬────┬────┐   ┌────┬────┬────┐   ┌────┬────┬────┐
 │ /  │ 10 │  ●─┼──►│  ● │ 20 │  ●─┼──►│  ● │ 30 │  / │
 └────┴────┴────┘   └────┴────┴────┘   └────┴────┴────┘
                      q

 ① p->pNext = q->pNext     (25 nắm 30)
 ② p->pPrev = q            (25.prev = 20)
 ③ q->pNext = p            (20 nắm 25)
 ④ p->pNext->pPrev = p     (30.prev = 25)  — nếu p->pNext == NULL thì pTail = p

 SAU
 ┌────┬────┬────┐  ┌────┬────┬────┐  ┌────┬────┬────┐  ┌────┬────┬────┐
 │ /  │ 10 │  ●─┼─►│  ● │ 20 │  ●─┼─►│  ● │ 25 │  ●─┼─►│  ● │ 30 │  / │
 └────┴────┴────┘  └────┴────┴────┘  └────┴────┴────┘  └────┴────┴────┘
```

```cpp
void ThemSauKep(DLIST &l, DNODE* q, DNODE* p) {
    if (q == NULL) return;
    p->pNext = q->pNext;
    p->pPrev = q;
    q->pNext = p;
    if (p->pNext != NULL)
        p->pNext->pPrev = p;
    else
        l.pTail = p;          // q la tail cu
}
```

Thêm **trước** `q`: $O(1)$ — đây là thắng lợi so với DSLK đơn.

```cpp
void ThemTruocKep(DLIST &l, DNODE* q, DNODE* p) {
    if (q == NULL) return;
    if (q == l.pHead) { ThemDauKep(l, p); return; }
    ThemSauKep(l, q->pPrev, p);
}
```

---

#### F. Xóa một nút `p` cho trước — $O(1)$ (không cần tìm nút trước)

Đây là lý do DSLK kép tồn tại.

```
 Xóa nút 20 (đã cầm sẵn con trỏ p):

 TRƯỚC
 ┌────┬────┬────┐   ┌────┬────┬────┐   ┌────┬────┬────┐
 │ /  │ 10 │  ●─┼──►│  ● │ 20 │  ●─┼──►│  ● │ 30 │  / │
 └────┴────┴────┘   └─▲──┴────┴────┘   └─▲──┴────┴────┘
                      p

 Hai phép giữa (p không phải head/tail):
 ①  p->pPrev->pNext = p->pNext     (10.next ← 30)
 ②  p->pNext->pPrev = p->pPrev     (30.prev ← 10)
     delete p

 SAU
 ┌────┬────┬────┐                   ┌────┬────┬────┐
 │ /  │ 10 │  ●─┼──────────────────►│  ● │ 30 │  / │
 └────┴────┴────┘                   └────┴────┴────┘
```

Chỉ cần:

```
p.pPrev.pNext ← p.pNext
p.pNext.pPrev ← p.pPrev
```

kèm xử lý nếu `p` là head hoặc tail.

```cpp
void XoaNodeKep(DLIST &l, DNODE* p) {
    if (p == NULL || l.pHead == NULL) return;

    if (p == l.pHead && p == l.pTail) {     // 1 nut
        l.pHead = l.pTail = NULL;
    } else if (p == l.pHead) {
        l.pHead = p->pNext;
        l.pHead->pPrev = NULL;
    } else if (p == l.pTail) {
        l.pTail = p->pPrev;
        l.pTail->pNext = NULL;
    } else {
        p->pPrev->pNext = p->pNext;
        p->pNext->pPrev = p->pPrev;
    }
    delete p;
}

void XoaDauKep(DLIST &l) { XoaNodeKep(l, l.pHead); }
void XoaCuoiKep(DLIST &l) { XoaNodeKep(l, l.pTail); }   // O(1) !

void HuyDanhSachKep(DLIST &l) {
    while (l.pHead != NULL)
        XoaDauKep(l);
}
```

**Xóa cuối $O(1)$** — khác hẳn DSLK đơn $O(n)$. Bốn nhánh `if` tương ứng: 1 nút / xóa đầu / xóa cuối / xóa giữa. Vẽ trên giấy trước khi gõ: luôn sửa **cả hai phía** `pPrev` và `pNext`.

**So nhanh đơn vs kép:**

| Thao tác (đã cầm con trỏ tới nút) | DSLK đơn | DSLK kép |
|-----------------------------------|----------|----------|
| Thêm/xóa đầu | $O(1)$ | $O(1)$ |
| Thêm cuối (có tail) | $O(1)$ | $O(1)$ |
| Xóa cuối (có tail) | $O(n)$ | **$O(1)$** |
| Thêm/xóa trước một nút | $O(n)$ | **$O(1)$** |
| Duyệt ngược | Không | Có |
| RAM mỗi nút | 1 con trỏ | 2 con trỏ |

---

#### G. Ưu / nhược điểm DSLK kép

**Ưu điểm**

1. Duyệt hai chiều.
2. Xóa nút đang cầm: $O(1)$.
3. Xóa cuối: $O(1)$.
4. Thêm trước một nút: $O(1)$.
5. Cài deque (hai đầu) tự nhiên.

**Nhược điểm**

1. Mỗi nút thêm **một con trỏ** `pPrev` → tốn RAM (trên máy 64-bit: +8 byte/nút).
2. Mọi thao tác phải sửa **nhiều con trỏ hơn** → dễ gán sai, khó debug.
3. Vẫn không truy cập ngẫu nhiên $O(1)$, tìm kiếm vẫn $O(n)$.

#### H. Ứng dụng DSLK kép

| Ứng dụng | Vì sao kép? |
|----------|-------------|
| Lịch sử trình duyệt (Back / Forward) | Đi tới và lùi trang |
| Undo / Redo trong editor | Hai hướng thao tác |
| LRU Cache (cùng HashMap) | Đưa nút đang dùng lên đầu / xóa nút cuối $O(1)$ |
| Playlist có nút “bài trước” | Lùi bài |
| `std::list` trong C++ STL | Chính là DSLK kép |

#### I. Ví dụ LRU (ý tưởng cao cấp)

Cache dung lượng $k$: HashMap `key → DNODE*`, danh sách kép lưu thứ tự “mới dùng”.

- Truy cập key: đưa nút lên đầu $O(1)$.
- Thêm mới khi đầy: xóa `pTail` $O(1)$, thêm đầu $O(1)$.

Không cần code đầy đủ trong chương này; nắm ý: **kép cho phép di chuyển nút $O(1)$**.

---

### 3.4.2. DSLK vòng (Circular Linked List)

#### A. Định nghĩa vòng đơn

Nút cuối **không** trỏ `NULL` mà trỏ **về nút đầu**:

```
          ┌──────────────────────────────────────────┐
          ▼                                          │
        ┌────┬────┐    ┌────┬────┐    ┌────┬────┐    │
        │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  ●─┼────┘
        └────┴────┘    └────┴────┘    └────┴────┘
            ▲                               ▲
          head                            pTail

  head = pTail->pNext     ← chỉ cần giữ pTail là suy ra được đầu
  Không còn ô nào chứa NULL  →  while (p != NULL) sẽ chạy mãi
```

Thường chỉ giữ **một con trỏ `pTail`** (nút cuối): vì `pTail->pNext` chính là head. Thêm đầu/cuối đều $O(1)$.

```
head = pTail->pNext
```

```cpp
struct CLIST {
    NODE* pTail;     // NULL ⇔ rỗng
};

void KhoiTaoC(CLIST &l) { l.pTail = NULL; }

bool IsEmptyC(CLIST l) { return l.pTail == NULL; }
```

#### B. Duyệt vòng — **không** viết `while (p != NULL)`

Vì không còn `NULL`, vòng `while (p != NULL)` **chạy mãi**.

**Mã giả:**

```
THUẬT TOÁN XuatVong(l)
1. nếu pTail = NULL thì return
2. p ← pTail.pNext          // head
3. lặp
4.     in p.data
5.     p ← p.pNext
6. until p = pTail.pNext    // da quay ve head
```

```cpp
void XuatVong(CLIST l) {
    if (l.pTail == NULL) return;
    NODE* p = l.pTail->pNext;
    do {
        cout << p->data << " -> ";
        p = p->pNext;
    } while (p != l.pTail->pNext);
    cout << "(quay ve dau)\n";
}
```

Dùng `do-while`: thân lặp chạy **trước**, rồi mới kiểm tra đã về đầu chưa — cần vì list 1 nút: `pNext` trỏ chính nó.

---

#### C. Thêm vào cuối vòng — $O(1)$

Hai trường hợp. Vẽ cho thuộc tay — đây là chỗ sinh viên hay gán sai.

**List rỗng:** nút tự trỏ tới chính nó.

```
      pTail
        │
        ▼
     ┌────┬────┐
  ┌─►│ 30 │  ●─┼─┐
  │  └────┴────┘ │
  └──────────────┘
   p->pNext = p     (một nút thành một vòng)
```

**List đã có nút:** chèn `p` **ngay sau** `pTail` (kề trước head), rồi dời `pTail` sang `p`.

Luôn vẽ từ **head** (không vẽ từ tail — dễ hiểu nhầm thứ tự).

```
 TRƯỚC  head=10, pTail=30
          ┌────────────────────────────────┐
          ▼                                │
        ┌────┬────┐   ┌────┬────┐   ┌────┬────┐
        │ 10 │  ●─┼──►│ 20 │  ●─┼──►│ 30 │  ●─┼┘
        └────┴────┘   └────┴────┘   └────┴────┘
            ▲                           ▲
          head                        pTail

 Thêm 40 vào cuối — 3 phép:
 ①  p->pNext = pTail->pNext     (40 nắm head = 10)
 ②  pTail->pNext = p            (30 nắm 40)
 ③  pTail = p                   (40 thành đuôi)

 SAU   head vẫn 10, pTail=40
          ┌──────────────────────────────────────────┐
          ▼                                          │
        ┌────┬────┐   ┌────┬────┐   ┌────┬────┐   ┌────┬────┐
        │ 10 │  ●─┼──►│ 20 │  ●─┼──►│ 30 │  ●─┼──►│ 40 │  ●─┼┘
        └────┴────┘   └────┴────┘   └────┴────┘   └────┴────┘
            ▲                                       ▲
          head                                    pTail
```

Thứ tự 3 phép gán (list không rỗng):

1. `p->pNext = l.pTail->pNext`  — nút mới nắm head cũ  
2. `l.pTail->pNext = p`         — tail cũ nắm nút mới  
3. `l.pTail = p`                — nút mới thành tail  

Đảo (1) và (2) sẽ mất head.

```cpp
void ThemCuoiVong(CLIST &l, NODE* p) {
    if (l.pTail == NULL) {
        l.pTail = p;
        p->pNext = p;          // 1 nut tu tro toi minh
        return;
    }
    p->pNext = l.pTail->pNext; // p tro toi head
    l.pTail->pNext = p;        // tail cu tro toi p
    l.pTail = p;               // p thanh tail moi
}
```

Thêm đầu vòng: giống thêm cuối **nhưng không đổi `pTail`**.

```cpp
void ThemDauVong(CLIST &l, NODE* p) {
    if (l.pTail == NULL) {
        l.pTail = p;
        p->pNext = p;
        return;
    }
    p->pNext = l.pTail->pNext;
    l.pTail->pNext = p;
    /* pTail khong doi */
}
```

---

#### D. Xóa đầu vòng

```cpp
void XoaDauVong(CLIST &l) {
    if (l.pTail == NULL) return;
    NODE* head = l.pTail->pNext;
    if (l.pTail == head) {     // 1 nut
        delete head;
        l.pTail = NULL;
        return;
    }
    l.pTail->pNext = head->pNext;
    delete head;
}
```

Xóa một giá trị — viết đủ, không chỉ “tưởng tượng”:

```cpp
void XoaGiaTriVong(CLIST &l, int x) {
    if (l.pTail == NULL) return;

    NODE* head = l.pTail->pNext;
    if (head == l.pTail && head->data == x) {   // 1 nut
        delete head;
        l.pTail = NULL;
        return;
    }

    NODE* prev = l.pTail;
    NODE* p = head;
    do {
        if (p->data == x) {
            prev->pNext = p->pNext;
            if (p == l.pTail) l.pTail = prev;
            delete p;
            return;
        }
        prev = p;
        p = p->pNext;
    } while (p != head);
}
```

$O(n)$. `do-while` để list 1 nút vẫn được xét. Nếu xóa head, `pTail->pNext` tự thành head mới nhờ `prev` đang là tail.

---

#### E. DSLK vòng kép (circular doubly)

```
     ┌───────────────────────────────────────────────────┐
     ▼                                                   │
 ┌────┬────┬────┐   ┌────┬────┬────┐   ┌────┬────┬────┐  │
 │  ● │ 10 │  ●─┼──►│  ● │ 20 │  ●─┼──►│  ● │ 30 │  ●─┼──┘
 └────┴────┴────┘   └─▲──┴────┴────┘   └─▲──┴────┴────┘
     ▲                │                  │
     └────────────────┴──────────────────┘
   head                                     tail = head->pPrev
   head->pPrev == tail     tail->pNext == head
```

- `pHead->pPrev == pTail`
- `pTail->pNext == pHead`

Mọi thêm/xóa đầu-cuối đều $O(1)$, duyệt hai chiều khép kín. Dùng cho playlist lặp, buffer vòng.

**Cài đặt tối thiểu** (đủ để hiểu, không nhồi thêm ADT mới):

```cpp
struct CDNODE {
    int data;
    CDNODE *pPrev, *pNext;
};

void ThemCuoiVongKep(CDNODE* &head, int x) {
    CDNODE* p = new CDNODE;
    p->data = x;
    if (head == NULL) {
        p->pNext = p->pPrev = p;
        head = p;
        return;
    }
    CDNODE* tail = head->pPrev;   // vong kep: prev cua head la tail
    p->pNext = head;
    p->pPrev = tail;
    tail->pNext = p;
    head->pPrev = p;
}
```

Duyệt: `do { ... p = p->pNext; } while (p != head);` — giống vòng đơn.

---

#### F. Bài toán Josephus — ứng dụng kinh điển của vòng

$n$ người đứng vòng, đếm $k$ người thì loại 1, lặp đến khi còn 1 người.

**Chạy tay $n=5$, $k=2$** (bắt đầu ở người 1; code đứng ở người *trước* người bị loại):

```
 Ban đầu (vòng):
     ┌─────────────────────────────────┐
     ▼                                 │
   ┌───┐   ┌───┐   ┌───┐   ┌───┐   ┌───┐
   │ 1 │──►│ 2 │──►│ 3 │──►│ 4 │──►│ 5 │┘
   └───┘   └───┘   └───┘   └───┘   └───┘

 Loại 2 →  1 → 3 → 4 → 5 → 1
 Loại 4 →  1 → 3 → 5 → 1
 Loại 1 →  3 → 5 → 3
 Loại 5 →  3 → 3     ← sống sót
```

```
n=5, k=2:  loại 2, 4, 1, 5  → còn 3
```

```cpp
int Josephus(int n, int k) {
    if (n < 1 || k < 1) return -1;
    if (k == 1) return n;          // giet lan luot nguoi hien tai: con lai nguoi n

    CLIST l;
    KhoiTaoC(l);
    for (int i = 1; i <= n; i++)
        ThemCuoiVong(l, TaoNode(i));

    NODE* p = l.pTail->pNext;   // bat dau o nguoi 1
    while (p->pNext != p) {     // con > 1 nguoi
        for (int i = 1; i < k - 1; i++)
            p = p->pNext;
        /* p dung truoc nguoi bi loai */
        NODE* chet = p->pNext;
        p->pNext = chet->pNext;
        if (chet == l.pTail) l.pTail = p;
        delete chet;
        p = p->pNext;           // nguoi ke tiep tiep tuc dem
    }
    int song = p->data;
    delete p;
    l.pTail = NULL;
    return song;
}
```

Code trên đúng với ví dụ $n=5, k=2$ (sống sót = 3) và $k \ge 2$. $k=1$ xử lý riêng để không đụng `p->pNext` theo nghĩa “đứng trước người bị loại”.

Độ phức tạp: $O(n \cdot k)$ cách naive; có công thức $O(n)$ nếu chỉ cần vị trí sống sót, không cần mô phỏng.

---

#### G. Ưu / nhược điểm DSLK vòng

**Ưu**

- Từ **mọi** nút đều đi được hết danh sách (không cần quay về head).
- Thêm đầu và cuối $O(1)$ nếu giữ `pTail`.
- Mô hình tự nhiên cho dữ liệu tuần hoàn: CPU scheduling round-robin, playlist lặp, token ring.

**Nhược**

- Dễ vòng lặp vô hạn nếu quên điều kiện dừng.
- Không có `NULL` lính canh → nhiều hàm phải viết `do-while`.
- Debug khó hơn DSLK thẳng.

#### H. Ứng dụng

| Ứng dụng | Loại vòng |
|----------|-----------|
| Round-robin scheduling (OS) | Vòng đơn |
| Playlist lặp / slide show | Vòng đơn hoặc kép |
| Buffer vòng (circular buffer) — biến thể mảng | Vòng về mặt logic |
| Game: lượt chơi quanh bàn | Vòng đơn |
| Josephus | Vòng đơn |

### ✅ Kiểm tra nhanh 3.4

1. DSLK kép thắng đơn ở thao tác nào? Đánh đổi gì?
2. Xóa nút đang cầm trên kép cần sửa những con trỏ nào (nút giữa)?
3. Vì sao `while (p != NULL)` trên vòng chạy mãi? Viết điều kiện dừng đúng.
4. Josephus $n=5, k=2$, người sống sót là ai (theo ví dụ trong bài)?

**Đáp án:** (1) Đi lùi, xóa cuối $O(1)$, thêm trước $O(1)$; tốn thêm 1 con trỏ/nút, dễ gán sai. (2) `p->pPrev->pNext` và `p->pNext->pPrev`. (3) Không còn `NULL`; `do … while (p != head)`. (4) Người 3.

---

## 3.5. SO SÁNH TỔNG HỢP VÀ ỨNG DỤNG

### 3.5.1. Bảng chọn cấu trúc

| Nhu cầu | Chọn |
|---------|------|
| `a[i]` thường xuyên, ít thêm/xóa giữa | Mảng |
| Thêm/xóa đầu nhiều, kích thước không biết trước | DSLK đơn |
| Thêm cuối nhiều | DSLK đơn + `pTail`, hoặc vòng + `pTail` |
| Xóa cuối / đi lùi / undo-redo | DSLK kép |
| Dữ liệu tuần hoàn, round-robin | DSLK vòng |
| Cache LRU, deque | DSLK kép (+ hash nếu cần tìm $O(1)$) |

### 3.5.2. Overhead bộ nhớ (máy 64-bit, `int` 4 byte, con trỏ 8 byte, alignment)

```
NODE  đơn:  data 4 + padding 4 + pNext 8  ≈ 16 byte  (chỉ 4 byte là dữ liệu)
DNODE kép: data 4 + pad 4 + pPrev 8 + pNext 8 ≈ 24 byte
```

1000 số nguyên:

- Mảng: $1000 \times 4 = 4000$ byte.
- DSLK đơn: $\approx 16000$ byte (gấp 4).
- DSLK kép: $\approx 24000$ byte (gấp 6).

DSLK **đắt RAM**. Đừng dùng khi chỉ cần lưu dãy số tĩnh.

### 3.5.3. Ứng dụng “zero to hero”

**1. Đa thức** — mỗi nút `(hệ số, số mũ)`, chỉ lưu số hạng ≠ 0. Đây là ứng dụng kinh điển trong giáo trình CTDL.

```
P(x) = 3x^5 + 2x^2 + 1     ≡    [3,5] → [2,2] → [1,0] → NULL
                                 coef  exp
```

Quy ước: sắp theo **mũ giảm dần**, không có số hạng hệ số 0.

```cpp
struct Term {
    double coef;
    int exp;
    Term* pNext;
};
```

**Cộng hai đa thức** = đi song song hai list (giống `Noi`), so sánh mũ:

| So sánh mũ | Việc làm |
|------------|----------|
| `p->exp > q->exp` | Copy số hạng `p` vào kết quả, `p` tiến |
| `p->exp < q->exp` | Copy số hạng `q`, `q` tiến |
| `p->exp == q->exp` | Cộng hệ số; nếu tổng ≠ 0 thì ghi vào kết quả; cả `p` và `q` tiến |

Tính $P(x_0)$: duyệt list, `tong += coef * pow(x0, exp)`. $O(n)$.

**2. Danh sách kề của đồ thị** — chương sau: mỗi đỉnh một DSLK các đỉnh kề. Đồ thị thưa tiết kiệm hơn ma trận.

**3. Ngăn xếp / hàng đợi** — chương 4: Stack = thêm/xóa đầu DSLK; Queue = thêm cuối + xóa đầu.

**4. Bộ nhớ hệ điều hành** — free list: các khối RAM trống xâu thành DSLK.

**5. Trình duyệt, editor, LRU** — DSLK kép.

---

## 3.6. THUẬT TOÁN NÂNG CAO TRÊN DSLK ĐƠN

Các thuật toán dưới đây xuất hiện trong bài tập khó / phỏng vấn. Nên hiểu **ý tưởng hai con trỏ**.

### 3.6.1. Đảo ngược danh sách — $O(n)$, $O(1)$ phụ

```
10 → 20 → 30 → NULL     thành     30 → 20 → 10 → NULL
```

Cần **ba** con trỏ vì mỗi lần lật `cur->pNext` sẽ mất địa chỉ nút sau, nên phải giữ `next` trước.

```
 Ban đầu:  prev=NULL     cur
                         │
                         ▼
                      ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
                      │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  / │
                      └────┴────┘    └────┴────┘    └────┴────┘

 Lần 1: next=20; lật 10 về prev (NULL)
         prev          cur
           │             │
           ▼             ▼
        ┌────┬────┐   ┌────┬────┐    ┌────┬────┐
        │ 10 │  / │   │ 20 │  ●─┼───►│ 30 │  / │
        └────┴────┘   └────┴────┘    └────┴────┘

 Lần 2: next=30; lật 20 về 10
                      prev          cur
                        │             │
                        ▼             ▼
        ┌────┬────┐   ┌────┬────┐   ┌────┬────┐
        │ 10 │  / │◄──┤ 20 │  ● │   │ 30 │  / │
        └────┴────┘   └────┴────┘   └────┴────┘

 Lần 3: next=NULL; lật 30 về 20; cur=NULL → dừng
  pHead=prev=30:

        ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
        │ 30 │  ●─┼───►│ 20 │  ●─┼───►│ 10 │  / │──► NULL
        └────┴────┘    └────┴────┘    └────┴────┘
            ▲                             ▲
          pHead                         pTail (head cũ)
```

**Mã giả:**

```
THUẬT TOÁN DaoNguoc(l)
1. prev ← NULL, cur ← pHead
2. while cur ≠ NULL
3.     next ← cur.pNext
4.     cur.pNext ← prev      // lat chieu
5.     prev ← cur
6.     cur ← next
7. pTail ← pHead
8. pHead ← prev
```

```cpp
void DaoNguoc(LIST &l) {
    NODE* prev = NULL;
    NODE* cur  = l.pHead;
    l.pTail = l.pHead;
    while (cur != NULL) {
        NODE* next = cur->pNext;
        cur->pNext = prev;
        prev = cur;
        cur  = next;
    }
    l.pHead = prev;
    if (l.pTail) l.pTail->pNext = NULL;
}
```

Đệ quy: đảo phần sau, rồi `head->pNext->pNext = head; head->pNext = NULL`. $O(n)$ stack — không dùng list dài.

---

### 3.6.2. Tìm nút giữa — hai con trỏ chậm/nhanh

`slow` đi 1 bước, `fast` đi 2. Khi `fast` không đi tiếp được, `slow` đang ở giữa — vì `fast` đã đi gấp đôi.

```
 List 5 nút:
 ┌────┬────┐   ┌────┬────┐   ┌────┬────┐   ┌────┬────┐   ┌────┬────┐
 │ 10 │  ●─┼──►│ 20 │  ●─┼──►│ 30 │  ●─┼──►│ 40 │  ●─┼──►│ 50 │  / │
 └────┴────┘   └────┴────┘   └────┴────┘   └────┴────┘   └────┴────┘
     ▲
   S,F xuất phát

 Sau 1 nhịp (S+1, F+2):
                   S                   F
                   ▼                   ▼
                 [20]                [40]

 Sau 2 nhịp:
                                 S                   F hết đường
                                 ▼
                               [30]  ← nút giữa, trả về slow
```

Với số nút chẵn, `slow` dừng ở nút trái-giữa (tùy điều kiện vòng lặp). Không cần `DemSoPhanTu` rồi chia 2 — một lần duyệt.

```cpp
NODE* TimNutGiua(LIST l) {
    if (l.pHead == NULL) return NULL;
    NODE* slow = l.pHead;
    NODE* fast = l.pHead;
    while (fast->pNext != NULL && fast->pNext->pNext != NULL) {
        slow = slow->pNext;
        fast = fast->pNext->pNext;
    }
    return slow;
}
```

$O(n)$ thời gian, $O(1)$ phụ. Không cần đếm $n$ rồi đi $n/2$.

Tìm nút thứ $k$ **từ cuối**: `fast` đi trước $k$ bước, rồi `slow` và `fast` đi cùng tốc độ. Khi `fast` hết, `slow` là đáp án.

---

### 3.6.3. Phát hiện chu trình — Floyd (tortoise & hare)

Nếu ai đó gán nhầm `pTail->pNext` vào giữa list, duyệt `while (p != NULL)` treo.

```
 ┌────┬────┐   ┌────┬────┐   ┌────┬────┐   ┌────┬────┐
 │ 10 │  ●─┼──►│ 20 │  ●─┼──►│ 30 │  ●─┼──►│ 40 │  ●─┼─┐
 └────┴────┘   └────┴────┘   └────┴────┘   └────┴────┘ │
                     ▲                                 │
                     └─────────────────────────────────┘
  Có chu trình: 40 nắm lại 20. Không còn NULL. Duyệt thẳng sẽ không dừng.
```

```cpp
bool CoChuTrinh(LIST l) {
    NODE* slow = l.pHead;
    NODE* fast = l.pHead;
    while (fast != NULL && fast->pNext != NULL) {
        slow = slow->pNext;
        fast = fast->pNext->pNext;
        if (slow == fast) return true;
    }
    return false;
}
```

**Vì sao đúng:** trên đoạn thẳng `fast` không bao giờ bị `slow` bắt. Khi cả hai vào vòng, mỗi nhịp khoảng cách giảm 1 (vì `fast` nhanh hơn 1 bước so với chu vi). Sau hữu hạn bước chúng đứng cùng một nút.

Tìm **nút vào vòng**: sau khi gặp nhau, đưa một con trỏ về `pHead`, cả hai đi từng bước; chỗ gặp lại là cửa vào vòng (Floyd bước 2).

---

### 3.6.4. Kiểm tra palindrome

Palindrome: đọc xuôi = đọc ngược, ví dụ `1 → 2 → 3 → 2 → 1`.

**Cách dễ (học trước):** $O(n)$ thời gian, $O(n)$ bộ nhớ phụ — đẩy nửa đầu vào stack, so từng phần tử với nửa sau.

**Cách $O(1)$ phụ:**

1. Tìm nút giữa (mục 3.6.2).
2. Đảo nửa sau (mục 3.6.1).
3. So từng cặp từ `pHead` với đầu nửa sau.
4. Đảo lại nửa sau để trả list như cũ.

```
1 → 2 → 3 → 2 → 1
         giữa
đảo nửa sau:  1 → 2 → 3    và    1 → 2
so: 1=1, 2=2  → palindrome
```

---

## 3.7. BÀI TẬP

Làm theo thứ tự. Không nhìn code mẫu ở trên trừ khi đã viết nháp mã giả.

### A. Lý thuyết — hiểu khái niệm

**Bài 1.** Phân biệt `p`, `*p`, `&x`. Vẽ ô nhớ cho:

```cpp
int x = 7;
int *p = &x;
*p = 3;
```

**Bài 2.** Vì sao không được `return` địa chỉ biến cục bộ? Liên hệ với việc `TaoNode` phải `new`.

**Bài 3.** So sánh cấp phát tuần tự và cấp phát liên kết theo 5 tiêu chí: truy cập, thêm đầu, thêm giữa, bộ nhớ, cache.

**Bài 4.** DSLK đơn có `pTail`. Thao tác nào vẫn $O(n)$? Vì sao xóa cuối không xuống $O(1)$?

**Bài 5.** Nêu 4 con trỏ phải sửa khi thêm một nút vào **giữa** DSLK kép. Vẽ trước/sau.

**Bài 6.** Vì sao duyệt DSLK vòng không dùng `while (p != NULL)`? Viết điều kiện dừng đúng.

**Bài 7.** Sau `SapXep` (đổi chỗ `data`) trên DSLK, có binary search $O(\log n)$ được không? Giải thích.

**Bài 8.** Điền bảng: thêm đầu, thêm cuối, xóa đầu, xóa cuối cho (mảng, DSLK đơn+tail, DSLK kép, vòng+tail).

---

### B. Truy vết (trace) — bắt buộc trước khi gõ code

**Bài 9.** List rỗng. Thực hiện: `ThemCuoi 5`, `ThemDau 2`, `ThemCuoi 9`, `XoaDau`, `ThemTaiViTri(1, 7)`. Vẽ `pHead`, `pTail` sau mỗi bước.

**Bài 10.** `[4]→[1]→[3]→[2]`. Chạy `SapXep` (đổi chỗ trực tiếp, đúng giáo trình). Ghi `data` các nút sau mỗi vòng `p`.

**Bài 11.** DSLK kép `[A]↔[B]↔[C]`. Xóa `B`. Liệt kê giá trị `pPrev`/`pNext` của A và C sau khi xóa.

**Bài 12.** Vòng 1-2-3-4-5, Josephus $k=3$. Liệt kê thứ tự loại.

---

### C. Cài đặt cơ bản (CLO thao tác)

**Bài 13.** Cài đủ: `KhoiTao`, `TaoNode`, `ThemDau`, `ThemCuoi`, `Xuat`, `IsEmpty`, `DemSoPhanTu`, `HuyDanhSach`. Viết `main` menu.

**Bài 14.** Thêm: `Tim`, `ThemTaiViTri`, `XoaDau`, `XoaCuoi`, `XoaNodeTheoGiaTri`, `XoaTaiViTri`.

**Bài 15.** Tạo 50 số ngẫu nhiên $1..30$ vào list (thêm cuối). Đếm số chẵn, in node max, xóa min.

**Bài 16.** `Tach(l, l1, l2)`: `l1` nguyên tố, `l2` còn lại. Không phá `l`.

---

### D. Sắp xếp và trộn

**Bài 17.** `SapXep` tăng dần bằng hoán đổi giá trị. In trước/sau.

**Bài 18.** Viết `SapXepGiam`. So sánh số lần swap với bản tăng trên cùng dữ liệu.

**Bài 19.** `Noi(l1, l2, l3)` hai list **đã sort**. Test: `l1 = 1..10`, `l2 = 5..15`.

**Bài 20 (nâng cao).** Cài `MergeSortList`. So thời gian (clock) với `SapXep` khi $n = 5000$.

---

### E. Kép và vòng

**Bài 21.** Cài DSLK kép: thêm đầu/cuối, xóa đầu/cuối, xuất xuôi/ngược, hủy.

**Bài 22.** Từ DSLK đơn, xây DSLK kép cùng dữ liệu (duyệt đơn, `ThemCuoiKep`).

**Bài 23.** Cài vòng đơn với `pTail`: thêm đầu, thêm cuối, xuất, xóa giá trị.

**Bài 24.** Josephus $n$, $k$ nhập từ bàn phím.

**Bài 25.** Playlist: vòng kép, lệnh next / prev / insert after current / delete current / lặp vô hạn in 20 bước.

---

### F. Ứng dụng và cao cấp

**Bài 26. Đa thức.** Nút `{double coef; int exp; NODE* pNext}` sắp theo mũ giảm. Viết cộng và tính $P(x_0)$.

**Bài 27.** Đảo list (iterative). Kiểm tra bằng xuất xuôi.

**Bài 28.** Tìm nút giữa không đếm `n`. Tìm nút thứ $k$ từ cuối.

**Bài 29.** Viết `CoChuTrinh`. Tạo list có vòng (gán `pTail->pNext = pHead->pNext`) để test, **nhớ cắt vòng trước khi `HuyDanhSach`**.

**Bài 30.** Cho hai list số nguyên đã sort, in các giá trị **giao** (intersection) theo thứ tự tăng, mỗi giá trị một lần.

**Bài 31.** Kiểm tra list số nguyên có palindrome không.

**Bài 32 (khó).** Copy list có thêm con trỏ `random` (trỏ tới nút bất kỳ). Kết quả là list mới, `random` trỏ đúng nút tương ứng trên list mới. $O(n)$ thời gian.

---

### G. Câu hỏi tự luận / kiểm tra miệng

1. Trình bày hình thức tổ chức tuần tự và liên kết. Vẽ sơ đồ.
2. Viết mã giả thêm đầu, thêm cuối, xóa đầu DSLK đơn có `pHead`/`pTail`. Phân tích $O$.
3. Vì sao Merge Sort hợp DSLK hơn Quick Sort? Nêu thuật toán tìm giữa.
4. So sánh DSLK đơn, kép, vòng: cấu trúc nút, thao tác đặc trưng, một ứng dụng mỗi loại.
5. Liệt kê các lỗi bộ nhớ khi cài DSLK và cách tránh.

---

## 🎯 TÓM TẮT CHƯƠNG 3

### Kiến thức cốt lõi

1. **Con trỏ + Heap** là nền: `new`/`delete`, `NULL`, `->`, không giải tham chiếu bừa, không leak.
2. **Cấp phát tuần tự** (mảng): `a[i]` $O(1)$, chèn giữa $O(n)$.
3. **Cấp phát liên kết** (DSLK): chèn/xóa tại chỗ $O(1)$, truy cập thứ $i$ là $O(n)$.
4. **DSLK đơn:** `NODE` + `LIST(pHead, pTail)`. Thêm đầu/cuối $O(1)$, xóa cuối $O(n)$.
5. **Sắp xếp:** đề thi dùng **đổi chỗ trực tiếp** trên `data` — hàm `SapXep` $O(n^2)$; thực tế trên DSLK nên Merge Sort $O(n \log n)$.
6. **DSLK kép:** thêm `pPrev` → xóa nút đang cầm và xóa cuối $O(1)$, duyệt 2 chiều, tốn RAM.
7. **DSLK vòng:** đuôi nối đầu; duyệt bằng `do-while`; round-robin, Josephus.

### Câu thần chú khi viết code

- Nút mới: `pNext = NULL` trước khi nối.
- Đổi liên kết: **giữ** địa chỉ phần còn lại trước khi ghi đè con trỏ.
- Thêm/xóa: luôn xét **rỗng / một nút / nút đầu / nút cuối**.
- Có `pTail` thì **mọi** nhánh thêm/xóa ảnh hưởng cuối phải cập nhật `pTail`.
- Hết việc: `HuyDanhSach`.

### Liên kết chương sau

- **Chương 4:** Stack = thêm/xóa đầu DSLK; Queue = xóa đầu + thêm cuối.
- **Chương 5:** Cây = nút có 2 (hoặc nhiều) con trỏ, không còn tuyến tính.
- **Đồ thị:** danh sách kề là mảng các DSLK.

---

*Hết chương 3. Làm bài tập 13–19 trước khi sang chương 4; bài 20 và 26–32 là mức cao cấp.*
