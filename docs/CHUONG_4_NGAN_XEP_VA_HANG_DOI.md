# CHƯƠNG 4: NGĂN XẾP VÀ HÀNG ĐỢI

> **Ngăn xếp** = **Stack**. **Hàng đợi** = **Queue**.  
> Hai cấu trúc này **không phải** danh sách liên kết mới: chúng là **quy tắc vào–ra** đặt lên mảng hoặc lên DSLK (Chương 3). Học xong chương này, bạn dùng lại `ThemDau`/`XoaDau`/`ThemCuoi` chứ không học lại con trỏ từ đầu.

---

## 🎯 MỤC TIÊU CHƯƠNG 4

**Sau khi học xong chương này, sinh viên có thể:**

1. Phát biểu đúng **LIFO** (ngăn xếp) và **FIFO** (hàng đợi); vẽ được đỉnh / đáy, đầu / cuối.
2. Cài đủ thao tác: `Init`, `IsEmpty`, `IsFull`, `Push`/`Pop`/`Peek`, `Enqueue`/`Dequeue`/`Front`.
3. Cài **hai cách**: mảng (đúng đề thi `class Stack` / `class Queue` vòng) và DSLK.
4. Giải thích vì sao hàng đợi mảng thẳng bị “bò trườn”, vì sao phải **hàng đợi vòng** (`% MAX`).
5. Ứng dụng Stack: đảo, đổi cơ số, **kiểm tra ngoặc**, trung tố → hậu tố, `TinhBieuThuc` (hai stack — thực hành 8).
6. Ứng dụng Queue: xếp hàng, máy in, round-robin; biết deque và hàng đợi ưu tiên (nâng cao).

---

## 📋 NỘI DUNG CHƯƠNG 4

```
4.1. Ngăn xếp (Stack)
     4.1.1. Khái niệm ngăn xếp
     4.1.2. Các thao tác trên ngăn xếp
     4.1.3. Ứng dụng ngăn xếp
4.2. Hàng đợi (Queue)
     4.2.1. Khái niệm hàng đợi
     4.2.2. Các thao tác trên hàng đợi
     4.2.3. Ứng dụng của hàng đợi
```

> **Cài đặt:** C++ theo giáo trình thực hành và đề thi: `class Stack`, `class Queue`, `MAX = 100`, hàng đợi dùng `(rear + 1) % MAX`. Bản DSLK dùng `new`/`delete` như Chương 3.

---

## 📖 CÁCH ĐỌC (ZERO → HERO)

| Mốc | Đọc | Xong khi |
|-----|-----|----------|
| **Nền** | 4.1.1 + 4.2.1 | Phân biệt LIFO / FIFO bằng một hình |
| **Đề thi** | 4.1.2 (mảng) + 4.2.2 (vòng) + 4.1.3.C + 4.2.3.A | Viết `Push`/`Pop`, `Enqueue`/`Dequeue`, kiểm tra ngoặc, mô phỏng xếp hàng |
| **Liên kết Chương 3** | 4.1.2 bản DSLK, 4.2.2 bản DSLK | Push = thêm đầu; Enqueue = thêm cuối + xóa đầu |
| **Cao cấp** | 4.1.3.D–F, 4.2.3.B–D | Hậu tố, `TinhBieuThuc`, round-robin, deque, ưu tiên |

Mỗi thao tác: **ý tưởng → hình trước/sau → mã giả → code → độ phức tạp → bẫy**.

---

## 📚 BẢNG THUẬT NGỮ

| Thuật ngữ | Nghĩa | Ghi nhớ |
|-----------|--------|---------|
| **LIFO** | Last In, First Out | Vào sau, ra trước |
| **FIFO** | First In, First Out | Vào trước, ra trước |
| **`top`** | Chỉ số / con trỏ **đỉnh** Stack | Push/Pop chỉ đụng `top` |
| **`front` / `rear`** | Đầu / cuối Queue | Ra ở `front`, vào ở `rear` |
| **Push / Pop / Peek** | Thêm đỉnh / lấy đỉnh / xem đỉnh | Peek **không** xóa |
| **Enqueue / Dequeue** | Thêm cuối / lấy đầu | Cũng gọi `PushBack` / `PopFront` |
| **Overflow** | Đẩy khi đầy | Stack/Queue mảng |
| **Underflow** | Lấy khi rỗng | Phải `IsEmpty` trước |
| **Hàng đợi vòng** | Mảng + phép `%` | Tái dùng ô đã Dequeue |
| **ADT** | Kiểu trừu tượng | “Chỉ được đụng hai đầu” — cài bằng mảng hay DSLK đều được |

---

## 4.1. NGĂN XẾP (STACK)

### 4.1.1. Khái niệm ngăn xếp

#### A. Định nghĩa

**Ngăn xếp** là danh sách tuyến tính chỉ cho phép thêm và xóa ở **một đầu**, gọi là **đỉnh (`top`)**. Đầu kia gọi là **đáy**.

Nguyên tắc: **LIFO — Last In, First Out**. Phần tử vào sau cùng là phần tử ra trước tiên.

**Ẩn dụ:** chồng đĩa. Chỉ được đặt đĩa mới lên **trên cùng** và chỉ được lấy đĩa **trên cùng**. Rút đĩa giữa → đổ cả chồng.

```
        top  ← chỉ được Push / Pop / Peek ở đây
         │
         ▼
      ┌────┐
      │ 30 │   vào sau cùng, ra trước tiên
      ├────┤
      │ 20 │
      ├────┤
      │ 10 │   đáy — vào trước, ra sau cùng
      └────┘
```

Đưa 10, rồi 20, rồi 30. Lấy ra lần lượt: **30, 20, 10** — ngược thứ tự vào.

#### B. Vì sao cần Stack? (vấn đề mảng/DSLK chưa giải)

Mảng và DSLK cho phép đụng **mọi** vị trí. Nhiều bài toán **cấm** đụng giữa: lần gọi hàm chưa xong, dấu ngoặc chưa đóng, nút “Undo” phải hủy thao tác **mới nhất**. Stack là cách **ép** lập trình viên chỉ đụng đỉnh — ít lỗi hơn tự quản lý chỉ số.

#### C. Stack ADT và Stack bộ nhớ — đừng lẫn

| | **Stack (cấu trúc dữ liệu, chương này)** | **Call Stack (bộ nhớ, Chương 3)** |
|---|------------------------------------------|-----------------------------------|
| Ai quản lý? | Bạn (`class Stack`) | Hệ thống khi gọi hàm |
| Tràn | `IsFull()` — overflow ADT | **Stack Overflow** (đệ quy vô hạn) |
| Dùng để | Ngoặc, hậu tố, Undo | Lưu biến cục bộ, địa chỉ trả về |

Cùng nguyên tắc LIFO. Khác nơi cất dữ liệu.

#### D. Hai cách cài (hình thức tổ chức)

```
  ADT Stack
      │
      ├── Mảng (tuần tự)     top là chỉ số. Đầy khi top == MAX-1.
      └── DSLK (liên kết)    top là pHead. Push = ThemDau, Pop = XoaDau.
```

| | Mảng | DSLK |
|---|------|------|
| Đầy? | Có (`IsFull`) | Không (hết RAM mới thất bại) |
| Bộ nhớ | Cấp sẵn `MAX` ô | Đúng số phần tử |
| Push/Pop | $O(1)$ | $O(1)$ |
| Đề thi | **`class Stack` mảng** | Dùng khi không biết trước số phần tử |

#### E. Minh họa Push / Pop trên giấy

```
 Rỗng:  top = -1     (quy ước: -1 = chưa có phần tử)

 Push(10)            Push(20)            Pop() → 20
    top=0               top=1               top=0
    ┌────┐              ┌────┐              ┌────┐
    │ 10 │         top→ │ 20 │         top→ │ 10 │
    └────┘              ├────┤              └────┘
                        │ 10 │
                        └────┘
```

**Quy ước vẽ:** đỉnh ở **trên**, đáy ở **dưới**. Mũi tên `top` luôn chỉ ô `data[top]`.

---

### 4.1.2. Các thao tác trên ngăn xếp

Thao tác chuẩn của ADT Stack:

| Thao tác | Việc làm | Rỗng / Đầy |
|----------|----------|------------|
| `Init` | Tạo stack rỗng | `top = -1` |
| `IsEmpty` | Rỗng? | `top == -1` |
| `IsFull` | Đầy? (chỉ bản mảng) | `top == MAX-1` |
| `Push(x)` | Đặt `x` lên đỉnh | Từ chối nếu đầy |
| `Pop()` | Lấy **và xóa** đỉnh | Từ chối nếu rỗng |
| `Peek()` / `Top()` | Đọc đỉnh, **không xóa** | Từ chối nếu rỗng |

Mọi thao tác trên: **$O(1)$**.

---

Thao tác học theo thứ tự: **Init → IsEmpty/IsFull → Push → Pop → Peek → Xuat**. Mỗi cái: ý tưởng → hình trước/sau → mã giả → code.

#### A. Cài bằng mảng — đúng đề thi

```
 chỉ số:   0        1        2              MAX-1
         đáy                              trần nhà
        ┌────┐    ┌────┐    ┌────┐         ┌────┐
        │ 10 │    │ 20 │    │ 30 │   ...   │    │
        └────┘    └────┘    └────┘         └────┘
                              ▲
                            top = 2
```

`top` tăng khi Push, giảm khi Pop. Ô dưới `top` **không bị xóa** trong RAM — chỉ bị bỏ qua. Lần Push sau sẽ ghi đè.

---

##### ① Init, IsEmpty, IsFull

**Ý tưởng:** stack rỗng khi chưa có phần tử nào (`top = -1`). Đầy khi đỉnh đã sát trần (`top == MAX - 1`).

```
 Rỗng (sau Init)              Đầy (MAX = 4)
 top = -1                     top = 3
 (không ô nào hợp lệ)         ┌────┬────┬────┬────┐
                              │ 10 │ 20 │ 30 │ 40 │
                              └────┴────┴────┴────┘
                                           ▲
                                         top
```

```
THUẬT TOÁN Init(S)          THUẬT TOÁN IsEmpty(S)         THUẬT TOÁN IsFull(S)
1. S.top ← -1               1. trả về (S.top = -1)        1. trả về (S.top = MAX-1)
```

---

##### ② Push — đặt lên đỉnh

**Ý tưởng:** tăng `top` **trước**, rồi ghi vào ô mới. Đầy thì từ chối (overflow).

**Trước / sau** `Push(40)` khi đang có 10, 20, 30:

```
 TRƯỚC  top=2                 SAU  top=3
 ┌────┐                       ┌────┐
 │ 30 │ ← top                 │ 40 │ ← top   vừa đặt
 ├────┤                       ├────┤
 │ 20 │                       │ 30 │
 ├────┤                       ├────┤
 │ 10 │                       │ 20 │
 └────┘                       ├────┤
                              │ 10 │
                              └────┘
```

```
THUẬT TOÁN Push(S, x)
1. nếu IsFull(S) thì báo đầy; return
2. S.top ← S.top + 1
3. S.data[S.top] ← x
```

---

##### ③ Pop — lấy và xóa đỉnh

**Ý tưởng:** đọc ô `top` **trước**, rồi giảm `top`. Rỗng thì từ chối (underflow). Ô cũ vẫn còn số trong RAM nhưng không còn thuộc stack.

**Trước / sau** `Pop()` → trả 40:

```
 TRƯỚC  top=3                 SAU  top=2
 ┌────┐                       ┌────┐
 │ 40 │ ← lấy cái này         │ 40 │   (rác — lần Push sau ghi đè)
 ├────┤                       ├────┤
 │ 30 │                       │ 30 │ ← top
 ├────┤                       ├────┤
 │ 20 │                       │ 20 │
 ├────┤                       ├────┤
 │ 10 │                       │ 10 │
 └────┘                       └────┘
```

```
THUẬT TOÁN Pop(S) → x
1. nếu IsEmpty(S) thì báo rỗng; return giá trị lính canh
2. x ← S.data[S.top]
3. S.top ← S.top - 1
4. trả về x
```

**Thứ tự bắt buộc:** tăng `top` **rồi** ghi (Push); đọc **rồi** giảm `top` (Pop). `data[++top] = x` và `x = data[top--]` là đúng.

---

##### ④ Peek / Top — xem đỉnh, không xóa

```
THUẬT TOÁN Peek(S) → x
1. nếu IsEmpty(S) thì báo rỗng; return lính canh
2. trả về S.data[S.top]      ← top không đổi
```

Peek rồi Pop: cùng giá trị, nhưng Peek **giữ** stack. Nút Undo “xem thao tác mới nhất mà chưa hủy” = Peek; “hủy” = Pop.

```cpp
#include <iostream>
using namespace std;

const int MAX = 100;

class Stack {
private:
    int data[MAX];
    int top;
public:
    Stack() { top = -1; }

    bool IsEmpty() { return top == -1; }
    bool IsFull()  { return top == MAX - 1; }

    void Push(int x) {
        if (IsFull()) {
            cout << "Stack day!\n";
            return;
        }
        data[++top] = x;
    }

    int Pop() {
        if (IsEmpty()) {
            cout << "Stack rong!\n";
            return -1;          // linh canh: khong dung -1 lam du lieu that
        }
        return data[top--];
    }

    int Peek() {
        if (IsEmpty()) {
            cout << "Stack rong!\n";
            return -1;
        }
        return data[top];
    }

    void Xuat() {               // tu dinh xuong day
        cout << "Stack: ";
        for (int i = top; i >= 0; i--)
            cout << data[i] << " ";
        cout << "(day)\n";
    }
};
```

**Bẫy:**

1. `Pop` khi rỗng mà không kiểm → đọc `data[-1]` (undefined).
2. Dùng `-1` vừa làm lính canh vừa làm dữ liệu → không phân biệt được “rỗng” và “đỉnh thật là -1”. Bài thi số nguyên dương thì ổn.
3. `Push` viết `data[top++] = x` (hậu tố) khi `top` đang `-1` → ghi `data[-1]`. Phải `++top` **trước**.

**Chạy tay** `Push 10, Push 20, Peek, Pop, Push 30`:

| Bước | `top` | `data[0..top]` | Kết quả |
|------|-------|----------------|---------|
| Init | -1 | (rỗng) | |
| Push 10 | 0 | 10 | |
| Push 20 | 1 | 10, 20 | |
| Peek | 1 | 10, 20 | trả 20, stack **không** đổi |
| Pop | 0 | 10 | trả 20 |
| Push 30 | 1 | 10, 30 | |

---

#### B. Cài bằng DSLK — Push = thêm đầu Chương 3

Đỉnh là `pHead`. Không có `IsFull` (trừ khi `new` thất bại).

```
 top (pHead)
    │
    ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 30 │  ●─┼───►│ 20 │  ●─┼───►│ 10 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘
   đỉnh                           đáy
```

Push 40: tạo nút, `pNext` nắm 30, `top` chuyển sang 40 — đúng `ThemDau`.  
Pop: giữ nút 30, `top = top->pNext`, `delete` 40 — đúng `XoaDau`.

```cpp
struct SNode {
    int data;
    SNode* pNext;
};

class LinkedStack {
private:
    SNode* top;
public:
    LinkedStack() { top = NULL; }
    ~LinkedStack() { while (!IsEmpty()) Pop(); }

    bool IsEmpty() { return top == NULL; }

    void Push(int x) {
        SNode* p = new SNode;
        p->data = x;
        p->pNext = top;     // ① nắm đỉnh cũ
        top = p;            // ② đỉnh mới
    }

    int Pop() {
        if (IsEmpty()) {
            cout << "Stack rong!\n";
            return -1;
        }
        SNode* p = top;
        int x = p->data;
        top = top->pNext;
        delete p;
        return x;
    }

    int Peek() {
        if (IsEmpty()) return -1;
        return top->data;
    }
};
```

Cùng thứ tự gán với `ThemDau`: **nắm đỉnh cũ trước**, rồi đổi `top`. Đảo ① ② là mất cả stack.

| | Mảng | DSLK |
|---|------|------|
| Push / Pop / Peek | $O(1)$ | $O(1)$ |
| Không gian | $O(\mathrm{MAX})$ luôn | $O(n)$ đúng số phần tử |

---

#### C. Bảng tổng hợp thao tác

| Thao tác | Mảng | DSLK | Ghi chú |
|----------|------|------|---------|
| Init | $O(1)$ | $O(1)$ | `top = -1` / `NULL` |
| IsEmpty | $O(1)$ | $O(1)$ | |
| IsFull | $O(1)$ | — | Chỉ mảng |
| Push | $O(1)$ | $O(1)$ | Overflow / hết RAM |
| Pop | $O(1)$ | $O(1)$ | Underflow |
| Peek | $O(1)$ | $O(1)$ | Không đổi stack |

Không có “chèn giữa stack”: làm vậy là **phá ADT**. Cần chèn giữa → dùng DSLK Chương 3, không gọi là Stack.

### ✅ Kiểm tra nhanh 4.1.1–4.1.2

1. Push 1, 2, 3 rồi Pop hai lần. Đỉnh còn lại?
2. `Peek` có làm `top` giảm không?
3. Vì sao Push DSLK phải thêm **đầu**, không thêm cuối?
4. `data[top++] = x` khi `top == -1` sai chỗ nào?

**Đáp án:** (1) 1. (2) Không. (3) Thêm cuối DSLK đơn không có `pTail` là $O(n)$; thêm đầu $O(1)$ — khớp ADT. (4) Ghi `data[-1]`; phải `++top` trước.

---

### 4.1.3. Ứng dụng ngăn xếp

Tư duy chung: **gặp thứ cần “nhớ để xử lý sau” → Push; đến lúc xử lý → Pop.** Thứ cần xử lý sau cùng thì Push sau (LIFO tự khớp).

---

#### A. Đảo chuỗi / đảo dãy

```
Vào:  H A N O I
Push từng ký tự, Pop hết → I O N A H
```

```cpp
void DaoChuoi(char s[]) {
    Stack st;
    for (int i = 0; s[i] != '\0'; i++)
        st.Push(s[i]);
    int i = 0;
    while (!st.IsEmpty())
        s[i++] = (char)st.Pop();
    s[i] = '\0';
}
```

$O(n)$ thời gian, $O(n)$ phụ.

---

#### B. Đổi cơ số (thập phân → nhị phân / 8 / 16)

Chia lấy dư: dư **cuối** là chữ số **cao nhất** → phải in ngược → Stack.

```
 13 ÷ 2 = 6 dư 1
  6 ÷ 2 = 3 dư 0
  3 ÷ 2 = 1 dư 1
  1 ÷ 2 = 0 dư 1
 Push: 1, 0, 1, 1     Pop: 1 1 0 1     → 13 = (1101)₂
```

```cpp
void DoiCoSo(int n, int base) {     // base = 2, 8, 16
    if (n == 0) { cout << 0; return; }
    Stack st;
    const char* chu = "0123456789ABCDEF";
    while (n > 0) {
        st.Push(n % base);
        n /= base;
    }
    while (!st.IsEmpty())
        cout << chu[st.Pop()];
}
```

---

#### C. Kiểm tra dấu ngoặc — trọng tâm đề thi

Biểu thức đúng ngoặc: mỗi `(` / `[` / `{` có một đóng **cùng loại** và **đúng thứ tự lồng**.

```
 ( [ ] )     đúng
 ( [ ) ]     sai — đóng ) khi đỉnh đang là [
 ( ( )       sai — hết chuỗi còn mở
 ) (         sai — đóng khi stack rỗng
```

**Thuật toán:**

```
THUẬT TOÁN KiemTraDauNgoac(s) → đúng/sai
1. Stack rỗng
2. với mỗi ký tự c trong s
3.     nếu c là mở  ( [ {  thì Push(c)
4.     nếu c là đóng ) ] }
5.         nếu stack rỗng thì SAI
6.         x ← Pop()
7.         nếu x không phải mở tương ứng với c thì SAI
8. hết chuỗi: đúng khi và chỉ khi stack rỗng
```

**Chạy tay** `"([)]"`:

```
 c='('  Push        stack: (
 c='['  Push        stack: ( [
 c=')'  Pop '['  ≠  '(' của )   → SAI
```

```
 "([])"
 c='('  Push (
 c='['  Push ( [
 c=']'  Pop [  khớp
 c=')'  Pop (  khớp
 hết, stack rỗng → ĐÚNG
```

```cpp
#include <string>

bool Khop(char mo, char dong) {
    return (mo == '(' && dong == ')')
        || (mo == '[' && dong == ']')
        || (mo == '{' && dong == '}');
}

bool KiemTraDauNgoac(string bieuThuc) {
    Stack st;
    for (int i = 0; i < (int)bieuThuc.size(); i++) {
        char c = bieuThuc[i];
        if (c == '(' || c == '[' || c == '{')
            st.Push(c);
        else if (c == ')' || c == ']' || c == '}') {
            if (st.IsEmpty()) return false;
            char mo = (char)st.Pop();
            if (!Khop(mo, c)) return false;
        }
        /* ky tu khac: bo qua */
    }
    return st.IsEmpty();
}
```

Bỏ qua chữ và số — chỉ xét ngoặc. `Pop` trả `int`: ép `(char)` vì ta Push mã ASCII.

---

#### D. Trung tố → hậu tố (nâng cao, hay hỏi)

| Dạng | Ví dụ | Ý |
|------|--------|---|
| Trung tố (infix) | `3 + 4 * 5` | Toán tử **giữa** hai số — người viết |
| Hậu tố (postfix / RPN) | `3 4 5 * +` | Toán tử **sau** hai số — máy tính bằng **một** Stack |

Hậu tố không cần ngoặc: `* ` ưu tiên hơn `+` đã thể hiện bằng thứ tự.

**Độ ưu tiên:** `*` `/` = 2; `+` `-` = 1; `(` = 0 trên stack.

**Thuật toán (Shunting-yard rút gọn, kết hợp trái):**

```
Với mỗi token x (trái → phải):
  số        → ghi ra kết quả
  (         → Push
  )         → Pop ra kết quả đến khi gặp (; Pop ( bỏ
  toán tử   → trong khi đỉnh là toán tử và ưu tiên(đỉnh) ≥ ưu tiên(x):
                  Pop ra kết quả
              rồi Push x
Hết: Pop hết toán tử ra kết quả
```

**Chạy tay** `(3+4)*5-6/2`  
Kết quả kỳ vọng: `3 4 + 5 * 6 2 / -`

| Token | Stack toán tử (đáy→đỉnh) | Kết quả |
|-------|--------------------------|---------|
| `(` | `(` | |
| `3` | `(` | `3` |
| `+` | `( +` | `3` |
| `4` | `( +` | `3 4` |
| `)` | (rỗng) | `3 4 +` |
| `*` | `*` | `3 4 +` |
| `5` | `*` | `3 4 + 5` |
| `-` | `-` (Pop `*` vì 2≥1) | `3 4 + 5 *` |
| `6` | `-` | `3 4 + 5 * 6` |
| `/` | `- /` | `3 4 + 5 * 6` |
| `2` | `- /` | `3 4 + 5 * 6 2` |
| hết | | `3 4 + 5 * 6 2 / -` |

```cpp
int UuTien(char op) {
    if (op == '*' || op == '/') return 2;
    if (op == '+' || op == '-') return 1;
    return 0;
}

bool LaToanTu(char c) {
    return c == '+' || c == '-' || c == '*' || c == '/';
}

string TrungToSangHauTo(string infix) {
    Stack st;
    string out;
    for (int i = 0; i < (int)infix.size(); i++) {
        char c = infix[i];
        if (c == ' ') continue;
        if (c >= '0' && c <= '9') {
            out += c;
            out += ' ';
        } else if (c == '(') {
            st.Push(c);
        } else if (c == ')') {
            while (!st.IsEmpty() && (char)st.Peek() != '(') {
                out += (char)st.Pop();
                out += ' ';
            }
            if (!st.IsEmpty()) st.Pop();   // bo '('
        } else if (LaToanTu(c)) {
            while (!st.IsEmpty() && LaToanTu((char)st.Peek())
                   && UuTien((char)st.Peek()) >= UuTien(c)) {
                out += (char)st.Pop();
                out += ' ';
            }
            st.Push(c);
        }
    }
    while (!st.IsEmpty()) {
        out += (char)st.Pop();
        out += ' ';
    }
    return out;
}
```

Phiên bản này: **mỗi số một chữ số**. Số nhiều chữ số: đọc cụm `while isdigit` như giáo trình thực hành.

`^` lũy thừa kết hợp **phải**: đổi `>=` thành `>` khi so với `^`. Khóa này không bắt buộc `^`.

---

#### E. Tính giá trị biểu thức hậu tố

Một Stack số. Gặp số → Push. Gặp toán tử → Pop **hai** số, tính, Push kết quả. **Thứ tự:** `b = Pop()` (toán hạng phải), `a = Pop()` (trái), tính `a op b`.

```
Hậu tố:  3  4  +  5  *     (tức (3+4)*5)

 3     stack: 3
 4     stack: 3 4
 +     b=4, a=3, 3+4=7     stack: 7
 5     stack: 7 5
 *     b=5, a=7, 7*5=35    stack: 35
 hết   kết quả = Peek = 35
```

```cpp
int TinhHauTo(string postfix) {
    Stack st;
    for (int i = 0; i < (int)postfix.size(); i++) {
        char c = postfix[i];
        if (c == ' ') continue;
        if (c >= '0' && c <= '9')
            st.Push(c - '0');
        else if (LaToanTu(c)) {
            int b = st.Pop();
            int a = st.Pop();
            if (c == '+') st.Push(a + b);
            else if (c == '-') st.Push(a - b);
            else if (c == '*') st.Push(a * b);
            else if (c == '/') st.Push(a / b);   // chia nguyen
        }
    }
    return st.Peek();
}
```

**Bẫy:** Pop `b` trước `a`. Viết `a` trước thì `3-4` thành `4-3`. Chia nguyên `7/2 = 3`. Stack không đủ 2 số → biểu thức sai.

Ghép D + E: `TinhHauTo(TrungToSangHauTo("(3+4)*5-6/2"))` phải ra **32**.

---

#### F. Tính trung tố trực tiếp — hai Stack (Bài thực hành 8)

Không cần ra hậu tố. Một Stack **số hạng**, một Stack **toán tử**. Cùng quy tắc ưu tiên với mục D; mỗi lần “đến lúc tính” thì Pop toán tử + Pop hai số, Push kết quả.

Đây là hàm `TinhBieuThuc` trong giáo trình thực hành. Hỗ trợ **số nhiều chữ số**.

**Chạy tay** `3+4*5` (kỳ vọng 23, không phải 35):

| Token | soHang (đáy→đỉnh) | toanTu | Việc |
|-------|-------------------|--------|------|
| `3` | `3` | | Push số |
| `+` | `3` | `+` | Push toán tử |
| `4` | `3 4` | `+` | Push số |
| `*` | `3 4` | `+ *` | `*` ưu tiên hơn `+` → không tính vội |
| `5` | `3 4 5` | `+ *` | Push số |
| hết | `3 20` rồi `23` | | Pop `*`: 4×5=20; Pop `+`: 3+20=23 |

```cpp
int ApDung(char op, int a, int b) {
    if (op == '+') return a + b;
    if (op == '-') return a - b;
    if (op == '*') return a * b;
    return a / b;                   // chia nguyen
}

int TinhBieuThuc(string s) {        // dung class Stack o 4.1.2
    Stack soHang, toanTu;
    for (int i = 0; i < (int)s.size(); i++) {
        char c = s[i];
        if (c == ' ') continue;
        if (c >= '0' && c <= '9') {
            int so = 0;
            while (i < (int)s.size() && s[i] >= '0' && s[i] <= '9') {
                so = so * 10 + (s[i] - '0');
                i++;
            }
            i--;                    // for se i++ — lui mot buoc
            soHang.Push(so);
        } else if (c == '(') {
            toanTu.Push(c);
        } else if (c == ')') {
            while (!toanTu.IsEmpty() && (char)toanTu.Peek() != '(') {
                char op = (char)toanTu.Pop();
                int b = soHang.Pop();
                int a = soHang.Pop();
                soHang.Push(ApDung(op, a, b));
            }
            if (!toanTu.IsEmpty()) toanTu.Pop();   // bo '('
        } else if (LaToanTu(c)) {
            while (!toanTu.IsEmpty() && LaToanTu((char)toanTu.Peek())
                   && UuTien((char)toanTu.Peek()) >= UuTien(c)) {
                char op = (char)toanTu.Pop();
                int b = soHang.Pop();
                int a = soHang.Pop();
                soHang.Push(ApDung(op, a, b));
            }
            toanTu.Push(c);
        }
    }
    while (!toanTu.IsEmpty()) {
        char op = (char)toanTu.Pop();
        int b = soHang.Pop();
        int a = soHang.Pop();
        soHang.Push(ApDung(op, a, b));
    }
    return soHang.Peek();
}
```

`TinhBieuThuc("(3+4)*5-6/2")` = 32. `TinhBieuThuc("12+3*4")` = 24 (số 12, không phải 1 và 2).

Hai con đường cùng kết quả:

```
 trung tố ──► hậu tố ──► TinhHauTo          (muc D + E, de hieu may)
 trung tố ──► TinhBieuThuc (2 stack)        (muc F, dung de thi thuc hanh)
```

---

#### G. Palindrome và Undo/Redo (biết để chọn đúng)

**Chuỗi đối xứng:** Push hết ký tự, Pop lần lượt, so với chuỗi gốc. `"abcba"` khớp; `"abca"` không. $O(n)$ thời gian, $O(n)$ phụ. (Deque ở 4.2.2 cũng làm được: so hai đầu, bóc dần.)

**Undo / Redo:** hai Stack. Làm việc → Push vào `undo`. Undo → Pop `undo`, Push sang `redo`. Redo → Pop `redo`, Push về `undo`. Đây là nút Back/Forward của trình duyệt, Ctrl+Z / Ctrl+Y của soạn thảo.

```
 Go "A", "B", "C"     undo: A B C     redo: (rỗng)
 Undo                 undo: A B       redo: C
 Undo                 undo: A         redo: C B
 Redo                 undo: A C       redo: B          ← C trở lại
 Go "D"               undo: A C D     redo: (rỗng)     ← nhánh mới, xóa redo
```

---

#### H. Ứng dụng khác (biết tên, không bắt buộc code)

| Ứng dụng | Vì sao Stack |
|----------|----------------|
| Undo | Thao tác mới nhất hủy trước |
| Nút Back trình duyệt | Trang vừa xem là đỉnh (Forward dùng stack thứ hai / DSLK kép) |
| DFS, quay lui (backtracking) | Đi sâu: Push; kẹt: Pop về nút trước |
| Gọi hàm / đệ quy | Call Stack của hệ thống |
| Duyệt cây NLR bằng vòng lặp | Mô phỏng đệ quy |

---

#### I. Chương trình tối thiểu — copy, biên dịch, chạy

```bash
c++ -std=c++11 -o stack_demo stack_demo.cpp && ./stack_demo
```

```cpp
#include <iostream>
#include <string>
using namespace std;

const int MAX = 100;

class Stack {
    int data[MAX];
    int top;
public:
    Stack() { top = -1; }
    bool IsEmpty() { return top == -1; }
    bool IsFull()  { return top == MAX - 1; }
    void Push(int x) {
        if (!IsFull()) data[++top] = x;
    }
    int Pop() {
        if (IsEmpty()) return -1;
        return data[top--];
    }
    int Peek() {
        if (IsEmpty()) return -1;
        return data[top];
    }
};

bool Khop(char mo, char dong) {
    return (mo=='('&&dong==')')||(mo=='['&&dong==']')||(mo=='{'&&dong=='}');
}

bool KiemTraDauNgoac(string s) {
    Stack st;
    for (int i = 0; i < (int)s.size(); i++) {
        char c = s[i];
        if (c=='('||c=='['||c=='{') st.Push(c);
        else if (c==')'||c==']'||c=='}') {
            if (st.IsEmpty()) return false;
            if (!Khop((char)st.Pop(), c)) return false;
        }
    }
    return st.IsEmpty();
}

int main() {
    Stack st;
    st.Push(10); st.Push(20); st.Push(30);
    cout << "Pop: " << st.Pop() << "\n";          // 30
    cout << "Peek: " << st.Peek() << "\n";        // 20

    cout << KiemTraDauNgoac("([])") << "\n";      // 1
    cout << KiemTraDauNgoac("([)]") << "\n";      // 0
    return 0;
}
```

Kỳ vọng:

```
Pop: 30
Peek: 20
1
0
```

### ✅ Kiểm tra nhanh 4.1.3

1. `"([)]"` sai ở ký tự nào, vì sao?
2. Hậu tố của `(3+4)*5`?
3. `TinhHauTo("3 4 -")` ra bao nhiêu? Nếu Pop `a` trước `b` thì ra bao nhiêu?
4. `TinhBieuThuc("3+4*5")` là 23 hay 35?

**Đáp án:** (1) Ký tự `)` — đỉnh đang `[`, không khớp `(`. (2) `3 4 + 5 *`. (3) −1; nếu đảo Pop thì +1. (4) **23** — `*` trước `+`.

---

## 4.2. HÀNG ĐỢI (QUEUE)

### 4.2.1. Khái niệm hàng đợi

#### A. Định nghĩa

**Hàng đợi** là danh sách tuyến tính: thêm ở **một đầu** (`rear` / cuối), xóa ở **đầu kia** (`front` / đầu).

Nguyên tắc: **FIFO — First In, First Out**. Vào trước, ra trước.

**Ẩn dụ:** quầy siêu thị. Vào cuối hàng (`Enqueue`). Thu ngân gọi người **đầu hàng** (`Dequeue`). Không chen ngang.

```
  Dequeue / Front                         Enqueue / Rear
       │                                        │
       ▼                                        ▼
    ┌────┐    ┌────┐    ┌────┐    ┌────┐
    │ 10 │───►│ 20 │───►│ 30 │───►│ 40 │
    └────┘    └────┘    └────┘    └────┘
     front                               rear
   vào trước                            vào sau
   ra trước                             ra sau
```

Đưa 10, 20, 30. Lấy ra: **10, rồi 20, rồi 30** — cùng thứ tự vào.

#### B. So với Stack

| | Stack | Queue |
|---|--------|--------|
| Nguyên tắc | LIFO | FIFO |
| Thêm | Đỉnh | Cuối (`rear`) |
| Xóa | Đỉnh | Đầu (`front`) |
| Hình | Chồng đĩa | Hàng người |
| “Công bằng” | Người mới được phục vụ trước | Người đến trước được phục vụ trước |

#### C. Hai cách cài — và cái bẫy của mảng thẳng

**DSLK:** `front` = `pHead`, `rear` = `pTail`. Enqueue = `ThemCuoi` $O(1)$, Dequeue = `XoaDau` $O(1)$. Sạch.

**Mảng thẳng (linear):** `rear++` khi thêm, `front++` khi lấy.

```
 MAX = 5
 Enqueue 10,20,30,40 rồi Dequeue hai lần:

 chỉ số:  0    1    2    3    4
        ┌────┬────┬────┬────┬────┐
        │    │    │ 30 │ 40 │    │
        └────┴────┴────┴────┴────┘
                    ▲    ▲
                  front rear

 Enqueue tiếp 50: rear=4. Enqueue 60: rear=5 → "đầy"
 nhưng ô 0 và 1 TRỐNG. Hàng đợi "bò trườn" sang phải, bỏ phí đầu mảng.
```

**Hàng đợi vòng (circular queue):** bẻ mảng thành vòng. Ô sau ô cuối là ô 0.

```
 Công thức vàng:   kế = (i + 1) % MAX
```

```
 Sau khi bò tới rear=4, Enqueue 60:
 (4+1)%5 = 0

 chỉ số:  0    1    2    3    4
        ┌────┬────┬────┬────┬────┐
        │ 60 │    │ 30 │ 40 │ 50 │
        └────┴────┴────┴────┴────┘
          ▲         ▲
         rear     front
```

Đề thi **bắt** cài Queue mảng theo kiểu vòng: `IsFull = ((rear+1)%MAX == front)`.

**Modulo nhớ tay** (`MAX = 4`):

```
 i     0  1  2  3  4  5  6  7
(i)%4  0  1  2  3  0  1  2  3     ← hết 3 thì về 0, không bao giờ = 4
```

`(rear + 1) % MAX` = “ô kế sau rear, vòng về 0 nếu đang ở cuối mảng”.

#### D. Rỗng / đầy trên vòng — quy ước giáo trình

Hai chỉ số `front`, `rear`. Rỗng: `front == -1` (và `rear == -1`).

```
 Rỗng:     front = rear = -1

 Một phần tử (Enqueue đầu tiên):
           front = rear = 0
        ┌────┬────┬────┐
        │ 10 │    │    │
        └────┴────┴────┘
          ▲
        f = r

 Đầy (MAX=4, đã có 4 phần tử, front=0, rear=3):
        (rear+1)%4 = 0 == front
        ┌────┬────┬────┬────┐
        │ 10 │ 20 │ 30 │ 40 │
        └────┴────┴────┴────┘
          f              r
```

Với quy ước `-1` nghĩa là rỗng, có thể dùng **hết** `MAX` ô. (Biến thể khác: rỗng khi `front==rear` **không** dùng `-1` thì phải chừa 1 ô — không dùng trong đề.)

---

### 4.2.2. Các thao tác trên hàng đợi

| Thao tác | Việc làm |
|----------|----------|
| `Init` | `front = rear = -1` |
| `IsEmpty` | `front == -1` |
| `IsFull` | `(rear + 1) % MAX == front` |
| `Enqueue(x)` | Thêm vào `rear` |
| `Dequeue()` | Lấy và xóa `front` |
| `GetFront()` | Đọc `front`, không xóa |

Tất cả **$O(1)$**.

---

#### A. Cài bằng mảng vòng — đúng đề thi

Học theo thứ tự: **Init → IsEmpty/IsFull → Enqueue → Dequeue → GetFront → Xuat**.

##### ① Init, IsEmpty, IsFull

```
THUẬT TOÁN Init(Q)              THUẬT TOÁN IsEmpty(Q)
1. Q.front ← Q.rear ← -1        1. trả về (Q.front = -1)

THUẬT TOÁN IsFull(Q)
1. trả về ((Q.rear + 1) % MAX = Q.front)
```

Khi rỗng, `front == -1` nên `IsFull` **không** nhầm: `(-1+1)%MAX = 0`, còn `front` là `-1`, khác nhau.

##### ② Enqueue — vào cuối

**Rỗng → phần tử đầu:** gán **cả** `front` và `rear` về 0, rồi ghi. Không chỉ `rear++`.

```
 TRƯỚC  f=r=-1                SAU Enqueue(10)
 (rỗng)                       ┌────┬────┬────┬────┐
                              │ 10 │    │    │    │
                              └────┴────┴────┴────┘
                                ▲
                              f = r = 0
```

**Đã có phần tử:** `rear = (rear+1)%MAX`, ghi vào ô mới.

```
 TRƯỚC  f=0 r=2               SAU Enqueue(40)
 ┌────┬────┬────┬────┐        ┌────┬────┬────┬────┐
 │ 10 │ 20 │ 30 │    │        │ 10 │ 20 │ 30 │ 40 │
 └────┴────┴────┴────┘        └────┴────┴────┴────┘
   f         r                  f              r
```

**Vòng về 0** (ô 0 đã trống sau Dequeue):

```
 TRƯỚC  f=1 r=3               SAU Enqueue(50)
 ┌────┬────┬────┬────┐        ┌────┬────┬────┬────┐
 │    │ 20 │ 30 │ 40 │        │ 50 │ 20 │ 30 │ 40 │
 └────┴────┴────┴────┘        └────┴────┴────┴────┘
         f         r            r    f
                                (rear+1)%4 = 0
```

```
THUẬT TOÁN Enqueue(Q, x)
1. nếu IsFull(Q) thì báo đầy; return
2. nếu IsEmpty(Q) thì front ← rear ← 0
3. ngược lại rear ← (rear + 1) % MAX
4. Q.data[rear] ← x
```

Mẫu giáo trình thực hành **rút gọn** có thể thiếu bước 1. Đề thi yêu cầu xử lý đầy/rỗng — **phải kiểm `IsFull`**, nếu không Enqueue khi đầy sẽ ghi đè `front`.

##### ③ Dequeue — ra đầu

Đọc `front`, rồi tiến `front`. Nếu vừa lấy phần tử **cuối cùng** (`front == rear`) thì reset cả hai về `-1` — trở lại trạng thái Init.

```
 TRƯỚC  f=0 r=2               SAU Dequeue() → 10
 ┌────┬────┬────┬────┐        ┌────┬────┬────┬────┐
 │ 10 │ 20 │ 30 │    │        │ 10 │ 20 │ 30 │    │
 └────┴────┴────┴────┘        └────┴────┴────┴────┘
   f         r                      f    r
                                  (ô 0 là rác)

 TRƯỚC còn 1 phần tử          SAU Dequeue() → 30
 f = r = 2                    f = r = -1  (rỗng thật)
 ┌────┬────┬────┬────┐
 │    │    │ 30 │    │
 └────┴────┴────┴────┘
```

```
THUẬT TOÁN Dequeue(Q) → x
1. nếu IsEmpty(Q) thì báo rỗng; return lính canh
2. x ← Q.data[front]
3. nếu front = rear thì front ← rear ← -1     // vừa lấy phần tử cuối
4. ngược lại front ← (front + 1) % MAX
5. trả về x
```

##### ④ GetFront — xem đầu, không xóa

Như Peek của Stack: trả `data[front]`, **không** đổi `front`/`rear`.

```cpp
#include <iostream>
using namespace std;

const int MAX = 100;

class Queue {
private:
    int data[MAX];
    int front, rear;
public:
    Queue() { front = rear = -1; }

    bool IsEmpty() { return front == -1; }
    bool IsFull()  { return (rear + 1) % MAX == front; }

    void Enqueue(int x) {
        if (IsFull()) {                 // giao trinh rut gon co the thieu dong nay
            cout << "Queue day!\n";     // de thi yeu cau xu ly ngoai le: PHAI co
            return;
        }
        if (IsEmpty()) front = rear = 0;
        else rear = (rear + 1) % MAX;
        data[rear] = x;
    }

    int Dequeue() {
        if (IsEmpty()) {
            cout << "Queue rong!\n";
            return -1;
        }
        int x = data[front];
        if (front == rear)
            front = rear = -1;
        else
            front = (front + 1) % MAX;
        return x;
    }

    int GetFront() {
        if (IsEmpty()) return -1;
        return data[front];
    }

    void Xuat() {
        if (IsEmpty()) { cout << "Queue rong\n"; return; }
        cout << "Queue: ";
        int i = front;
        while (true) {
            cout << data[i] << " ";
            if (i == rear) break;
            i = (i + 1) % MAX;
        }
        cout << "\n";
    }
};
```

**Bẫy:**

1. Enqueue khi rỗng mà chỉ `rear++` → `rear` thành 0, `front` còn `-1` → `IsEmpty` vẫn true. Phải gán **cả hai** `front = rear = 0`.
2. Dequeue phần tử cuối mà không reset `-1` → `front` chạy vòng, `IsEmpty` sai.
3. Duyệt in: **không** `for (i=front; i<=rear; i++)` — khi vòng, `rear` có thể **nhỏ hơn** `front`.
4. Nhầm Stack: Enqueue/Dequeue **cùng một đầu**.

**Chạy tay** `MAX = 4`, Enqueue 10,20,30, Dequeue, Enqueue 40,50:

| Bước | front | rear | Mảng (ô 0..3) | Ghi chú |
|------|-------|------|----------------|---------|
| Init | -1 | -1 | | rỗng |
| Enq 10 | 0 | 0 | 10, _, _, _ | |
| Enq 20 | 0 | 1 | 10, 20, _, _ | |
| Enq 30 | 0 | 2 | 10, 20, 30, _ | |
| Deq → 10 | 1 | 2 | _, 20, 30, _ | ô 0 trống |
| Enq 40 | 1 | 3 | _, 20, 30, 40 | |
| Enq 50 | 1 | 0 | **50**, 20, 30, 40 | vòng về 0; đầy vì `(0+1)%4==1` |

---

#### B. Cài bằng DSLK — Enqueue cuối, Dequeue đầu

Cần **hai** con trỏ, đúng `LIST` Chương 3:

```
 front (pHead)                         rear (pTail)
    │                                      │
    ▼                                      ▼
 ┌────┬────┐    ┌────┬────┐    ┌────┬────┐
 │ 10 │  ●─┼───►│ 20 │  ●─┼───►│ 30 │  / │──► NULL
 └────┴────┘    └────┴────┘    └────┴────┘
```

```cpp
struct QNode {
    int data;
    QNode* pNext;
};

class LinkedQueue {
private:
    QNode *front, *rear;
public:
    LinkedQueue() { front = rear = NULL; }
    ~LinkedQueue() { while (!IsEmpty()) Dequeue(); }

    bool IsEmpty() { return front == NULL; }

    void Enqueue(int x) {              // ThemCuoi
        QNode* p = new QNode;
        p->data = x;
        p->pNext = NULL;
        if (IsEmpty()) front = rear = p;
        else { rear->pNext = p; rear = p; }
    }

    int Dequeue() {                    // XoaDau
        if (IsEmpty()) return -1;
        QNode* p = front;
        int x = p->data;
        front = front->pNext;
        if (front == NULL) rear = NULL;  // vua lay nut duy nhat
        delete p;
        return x;
    }

    int GetFront() {
        if (IsEmpty()) return -1;
        return front->data;
    }
};
```

**Bẫy:** quên `rear = NULL` khi xóa nút duy nhất → `Enqueue` sau ghi vào nút đã `delete`.

Không `IsFull`. Mọi thao tác $O(1)$ nhờ `rear`.

---

#### C. Biến thể (nâng cao — biết để chọn đúng)

**1. Deque (double-ended queue)** — thêm/xóa **cả hai** đầu. Cài DSLK kép (Chương 3) hoặc mảng vòng hai con trỏ. Ứng dụng: sliding window, palindrome, BFS 0-1.

**2. Hàng đợi ưu tiên (Priority Queue)** — ra không theo thời điểm vào mà theo **độ ưu tiên**. Cài nhập môn: mỗi Enqueue chèn đúng chỗ trên DSLK đã sort ($O(n)$). Thực tế: heap $O(\log n)$ — gặp lại khi học cây.

```
 Hàng thường:   vào  A, B, C     ra  A, B, C
 Ưu tiên:       A(2), B(9), C(5)  ra  B, C, A     (9 > 5 > 2)
```

```cpp
struct PNode {
    int data, uuTien;     // uuTien lon hon ra truoc
    PNode* pNext;
};

void EnqueueUuTien(PNode* &head, int data, int u) {
    PNode* p = new PNode;
    p->data = data; p->uuTien = u; p->pNext = NULL;
    if (head == NULL || u > head->uuTien) {
        p->pNext = head;
        head = p;
        return;
    }
    PNode* q = head;
    while (q->pNext != NULL && q->pNext->uuTien >= u)
        q = q->pNext;
    p->pNext = q->pNext;
    q->pNext = p;
}

int DequeueUuTien(PNode* &head) {     // luon la head
    if (head == NULL) return -1;
    PNode* p = head;
    int x = p->data;
    head = head->pNext;
    delete p;
    return x;
}
```

### ✅ Kiểm tra nhanh 4.2.1–4.2.2

1. Enqueue 1,2,3 rồi Dequeue một lần. `GetFront`?
2. Vì sao Queue mảng thẳng bị “đầy giả”?
3. `(rear+1)%MAX == front` nghĩa là gì?
4. Dequeue nút duy nhất trên DSLK, quên gán `rear = NULL` thì sao?

**Đáp án:** (1) 2. (2) `front`/`rear` chỉ tăng, ô trước `front` bỏ phí. (3) Ô kế rear trùng front → đầy. (4) `rear` dangling; Enqueue sau crash.

---

### 4.2.3. Ứng dụng của hàng đợi

Tư duy: **việc phải xử lý đúng thứ tự đến** → Queue.

---

#### A. Mô phỏng xếp hàng — trọng tâm đề thi

Khách vào cuối, phục vụ ở đầu. In trạng thái sau mỗi lệnh.

```cpp
void MoPhongSieuThi() {
    Queue q;
    q.Enqueue(101);     // khach 101
    q.Enqueue(102);
    q.Enqueue(103);
    cout << "Phuc vu: " << q.Dequeue() << "\n";   // 101
    q.Enqueue(104);
    cout << "Dang doi dau tien: " << q.GetFront() << "\n";  // 102
    q.Xuat();           // 102 103 104
}
```

Máy in, ticket counter, upload nhiều file: cùng một hình.

---

#### B. Round-robin (lịch CPU) — hàng đợi vòng **đúng nghĩa thời gian**

Mỗi tiến trình được một **quantum**. Chưa xong → Enqueue lại cuối.

```
 P1(5) P2(3) P3(4)   quantum = 2

 P1 chạy 2, còn 3 → vào lại cuối:  P2 P3 P1
 P2 chạy 2, còn 1 → vào lại:       P3 P1 P2
 P3 chạy 2, còn 2 → vào lại:       P1 P2 P3
 ...
```

```cpp
struct Process { int id, conLai; };

void RoundRobin(Process a[], int n, int quantum) {
    Queue q;
    for (int i = 0; i < n; i++) q.Enqueue(i);
    int t = 0;
    while (!q.IsEmpty()) {
        int i = q.Dequeue();
        int chay = (a[i].conLai < quantum) ? a[i].conLai : quantum;
        a[i].conLai -= chay;
        t += chay;
        cout << "t=" << t << " xong lat P" << a[i].id
             << " con " << a[i].conLai << "\n";
        if (a[i].conLai > 0) q.Enqueue(i);
    }
}
```

Hàng đợi **vòng về mặt logic** (người chưa xong xuống cuối). Cài bằng `class Queue` vòng ở trên.

---

#### C. BFS (duyệt rộng) — xem trước Chương 5 / đồ thị

Duyệt **tầng**: thăm nút, Enqueue các nút kề chưa thăm, Dequeue lần lượt.

```
 Cây:      1
          / \
         2   3
        / \
       4   5

 Queue:  [1] → [2 3] → [3 4 5] → [4 5] → [5] → []
 Thứ tự thăm: 1, 2, 3, 4, 5
```

Stack + cùng ý tưởng = DFS (đi sâu). Chỉ cần nhớ: **rộng dùng Queue, sâu dùng Stack.**

---

#### D. Ứng dụng khác

| Ứng dụng | Loại queue |
|----------|------------|
| Bộ đệm bàn phím / mạng | Vòng (circular buffer) |
| Call center, đặt vé | FIFO thường |
| Cấp cứu (nặng trước) | Ưu tiên |
| Palindrome, cửa sổ trượt | Deque |
| In ấn, playlist tuần tự | FIFO |

---

#### E. Chương trình tối thiểu — mô phỏng hàng đợi khách

```bash
c++ -std=c++11 -o queue_demo queue_demo.cpp && ./queue_demo
```

```cpp
#include <iostream>
using namespace std;

const int MAX = 100;

class Queue {
    int data[MAX];
    int front, rear;
public:
    Queue() { front = rear = -1; }
    bool IsEmpty() { return front == -1; }
    bool IsFull()  { return (rear + 1) % MAX == front; }
    void Enqueue(int x) {
        if (IsFull()) return;
        if (IsEmpty()) front = rear = 0;
        else rear = (rear + 1) % MAX;
        data[rear] = x;
    }
    int Dequeue() {
        if (IsEmpty()) return -1;
        int x = data[front];
        if (front == rear) front = rear = -1;
        else front = (front + 1) % MAX;
        return x;
    }
    void Xuat() {
        if (IsEmpty()) { cout << "(rong)\n"; return; }
        int i = front;
        while (true) {
            cout << data[i] << " ";
            if (i == rear) break;
            i = (i + 1) % MAX;
        }
        cout << "\n";
    }
};

int main() {
    Queue q;
    q.Enqueue(101);
    q.Enqueue(102);
    q.Enqueue(103);
    cout << "Hang: "; q.Xuat();              // 101 102 103
    cout << "Phuc vu: " << q.Dequeue() << "\n";  // 101
    q.Enqueue(104);
    cout << "Hang: "; q.Xuat();              // 102 103 104
    return 0;
}
```

Kỳ vọng:

```
Hang: 101 102 103
Phuc vu: 101
Hang: 102 103 104
```

### ✅ Kiểm tra nhanh 4.2.3

1. Siêu thị: vào 101, 102, 103; phục vụ một người; vào 104. Ai đứng đầu?
2. Round-robin khác FIFO thuần ở chỗ nào?
3. BFS dùng Queue; DFS dùng gì? Vì sao không đổi chỗ được?

**Đáp án:** (1) 102. (2) Việc chưa xong **vào lại cuối** — FIFO trong một vòng, nhưng một việc có thể ra-vào nhiều lần. (3) Stack — đi sâu (mới nhất xử lý trước); Queue đi rộng (cũ nhất trước). Đổi chỗ là đổi thuật toán.

---

## 4.3. SO SÁNH NHANH VÀ CHỌN CẤU TRÚC

(Không nằm ngoài đề cương: đây là **cầu nối** 4.1 với 4.2 để thi vấn đáp.)

| Cần | Chọn |
|-----|------|
| Hủy việc **mới nhất** / ngoặc / hậu tố / Undo | **Stack** |
| Phục vụ **đúng thứ tự đến** / in / BFS | **Queue** |
| Thêm/xóa **cả hai đầu** | Deque (kép) |
| “Khẩn” hơn được trước | Hàng đợi ưu tiên |
| Không biết trước $n$, Push/Pop $O(1)$ | Stack DSLK |
| Đề thi Stack/Queue | **Mảng**, Queue **vòng** |

Mọi ADT này đều cài được bằng mảng hoặc bằng DSLK Chương 3. Khác nhau ở **chỗ được phép đụng**.

---

## 4.4. BÀI TẬP

Làm theo thứ tự. Viết mã giả trước khi gõ. Không nhìn code mẫu trừ khi đã vẽ truy vết.

### A. Lý thuyết — hiểu khái niệm

**Bài 1.** Định nghĩa LIFO, FIFO. Vẽ một Stack 3 phần tử và một Queue 3 phần tử, đánh dấu chỗ vào/ra.

**Bài 2.** Push 5, 7, 9, Pop, Push 2. Vẽ `top` và mảng.

**Bài 3.** Queue `MAX=5`. Enqueue 1..4, Dequeue hai lần, Enqueue 8, 9. Vẽ mảng vòng (`front`, `rear`). Có đầy không?

**Bài 4.** So sánh độ phức tạp Push Stack mảng vs thêm cuối DSLK đơn **không** `pTail`.

**Bài 5.** Vì sao `for (i = front; i <= rear; i++)` in Queue vòng sai?

**Bài 6.** Phân biệt: Stack ADT (chương này) và Call Stack (bộ nhớ). Cùng LIFO, khác chỗ nào?

### B. Truy vết (trace) — bắt buộc trước khi gõ code

**Bài 7.** Stack rỗng. Thực hiện: Push 10, Push 20, Peek, Pop, Push 30, Pop, Pop, Pop. Ghi `top` và giá trị trả về mỗi bước (Pop lần cuối?).

**Bài 8.** `"([{}])"` và `"([)]"` — chạy `KiemTraDauNgoac`. Với mỗi ký tự, ghi stack (đáy→đỉnh). Chỗ nào sai?

**Bài 9.** Chạy tay `TrungToSangHauTo("3+4*5")` rồi `TinhHauTo` kết quả. Đối chiếu `TinhBieuThuc("3+4*5")`.

**Bài 10.** Queue `MAX=4`. Enqueue 10, 20, 30, Dequeue, Enqueue 40, 50. Bảng `front`, `rear`, 4 ô mảng — phải khớp mục 4.2.2.

**Bài 11.** Round-robin: P1=5, P2=3, P3=4, quantum=2. Liệt kê thứ tự lát chạy đến khi hết (không cần code).

### C. Cài đặt (CLO đề thi)

**Bài 12.** `class Stack` đủ `Push`, `Pop`, `Peek`, `IsEmpty`, `IsFull`. `main` thử overflow (`MAX` lần Push) và underflow (Pop khi rỗng).

**Bài 13.** `class Queue` vòng đúng mẫu giáo trình, **có** `IsFull` trong Enqueue. In hàng sau mỗi Enqueue/Dequeue (dùng `%`, không `i<=rear`).

**Bài 14.** Stack DSLK và Queue DSLK. Hủy hết nút trong destructor.

**Bài 15.** `KiemTraDauNgoac` với `()[]{}`. Test: `"([])"`, `"([)]"`, `"((("`, `")("`, `""`, `"a(b[c]d)e"`.

**Bài 16.** Mô phỏng siêu thị: menu 1. Khách đến  2. Phục vụ  3. Xem hàng  0. Thoát.

### D. Ứng dụng

**Bài 17.** Đổi thập phân sang nhị phân / 8 / 16 bằng Stack.

**Bài 18.** Đảo chuỗi bằng Stack.

**Bài 19.** Trung tố một chữ số + `-` `*` `/` `()` → hậu tố. Tính hậu tố. Test `(3+4)*5-6/2` = 32.

**Bài 20.** `TinhBieuThuc` hai Stack (đúng thực hành 8), hỗ trợ số nhiều chữ số. Test `"12+3*4"` = 24.

**Bài 21.** Round-robin 3 tiến trình, in lịch chạy.

**Bài 22 (nâng cao).** Deque trên DSLK kép: `PushFront`, `PushBack`, `PopFront`, `PopBack`. Kiểm tra palindrome bằng bóc hai đầu.

**Bài 23 (nâng cao).** Hàng đợi ưu tiên: Enqueue kèm điểm ưu tiên, Dequeue luôn phần tử điểm cao nhất. Cùng điểm → FIFO.

**Bài 24 (nâng cao).** Undo/Redo hai Stack. Gõ chuỗi lệnh `GO x` / `UNDO` / `REDO`.

### E. Tự luận / kiểm tra miệng

1. Trình bày ADT Stack, cài mảng, phân tích $O$. Một ứng dụng, chạy tay.
2. Hiện tượng bò trườn. Hàng đợi vòng giải thế nào? Viết `IsFull`, `Enqueue`.
3. Thuật toán kiểm tra ngoặc. Vì sao phải Stack chứ không Queue?
4. Phân biệt Peek và Pop; GetFront và Dequeue.
5. Vì sao Enqueue khi rỗng phải gán **cả** `front` và `rear`? Dequeue phần tử cuối phải reset `-1`?

### Đáp án gợi ý một số bài truy vết

**Bài 3.** `MAX=5`. Sau Enq 1..4: `f=0,r=3` `[1,2,3,4,_]`. Deq hai lần: `f=2,r=3` `3,4`. Enq 8,9: `f=2,r=0` `[9, _, 3, 4, 8]` — hàng `3 4 8 9`. `(0+1)%5=1 ≠ 2` → **chưa đầy**.

**Bài 9.** Hậu tố `3 4 5 * +`. Giá trị 23. `TinhBieuThuc` cùng 23.

**Bài 8.** `"([{}])"` đúng. `"([)]"` sai tại `)` vì Pop ra `[`.

---

## 🎯 TÓM TẮT CHƯƠNG 4

### Kiến thức cốt lõi

1. **Stack = LIFO.** Chỉ đụng `top`. Push/Pop/Peek $O(1)$.
2. **Queue = FIFO.** Vào `rear`, ra `front`. Enqueue/Dequeue $O(1)$.
3. **Đề thi:** Stack mảng `top = -1`; Queue mảng **vòng** `front = rear = -1`, đầy khi `(rear+1)%MAX == front`.
4. **DSLK:** Stack = thêm/xóa đầu; Queue = thêm cuối + xóa đầu (nhớ `pTail`).
5. **Stack dùng cho:** ngoặc, đổi cơ số, hậu tố, `TinhBieuThuc` hai stack, Undo, DFS.
6. **Queue dùng cho:** xếp hàng, in, round-robin, BFS.

### Câu thần chú khi viết code

- Push: `++top` rồi ghi. Pop: đọc rồi `top--`. Không `data[top++] = x` khi `top == -1`.
- Queue rỗng: gán **cả** `front` và `rear` về `-1`.
- Enqueue đầu tiên: `front = rear = 0`, không chỉ tăng `rear`.
- Enqueue khi đầy: **phải** `IsFull` — mẫu giáo trình rút gọn có thể thiếu.
- In Queue vòng: đi từ `front` bằng `%` đến `rear`, không `i <= rear`.
- Ngoặc: hết chuỗi mà stack còn phần tử → thiếu đóng.
- Tính biểu thức: Pop **b** (phải) rồi **a** (trái); `*` `/` trước `+` `-`.

### Liên kết chương

- **Chương 3:** cài Stack/Queue bằng DSLK; kép → deque.
- **Chương 5:** duyệt cây — DFS ~ Stack, level-order ~ Queue.
- **Đồ thị:** BFS = Queue, DFS = Stack.

---

*Hết chương 4. Làm bài 12–16 (CLO đề thi) trước khi sang cây; bài 19–20 và 22–24 là mức cao cấp.*
