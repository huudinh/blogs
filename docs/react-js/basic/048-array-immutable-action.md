---
sidebar_position: 48
---

# Thao tác với mảng bất biến

Trong bài học này, chúng ta sẽ tìm hiểu cách cập nhật và xóa các phần tử từ mảng theo cách bất biến.

![Create-HTML-1](images/components.jpg)

<ToggleTOC />

## I. Cập nhật phần tử (bất biến)

Để cập nhật một hoặc nhiều phần tử trong mảng, bạn có thể sử dụng phương thức .map để trả về một bản sao của mảng và đồng thời sửa đổi một hoặc nhiều phần tử.

```jsx
const grades = [10, 20, 18, 14];
// change 18 to 17
const updatedGrades = grades.map(grade => {
    if (grade === 18){
        return 17;
    }
    // in all other cases, keep it as it was
    return grade;
});
console.log(updatedGrades); //[10, 20, 17, 14]
```

Bạn cũng có thể cập nhật nhiều phần tử, ví dụ: cộng `1` cho tất cả các điểm thi thấp hơn `10`

```jsx
const grades = [10, 8, 9, 4, 16];
// add 1 to all grades below 10

const updatedGrades = grades.map(grade => {
    if (grade < 10){
        return grade + 1;
    }
    // in all other cases, keep it as it was
    return grade;
});
console.log(updatedGrades); //[10, 9, 10, 5, 16]
```

## II. Xóa phần tử (bất biến)

Bạn có thể xóa phần tử một cách bất biến bằng cách sử dụng phương thức slice (**slice** chứ không phải **splice**). slice là phương thức bất biến trong khi splice là phương thức thay đổi mảng.

```jsx
const grades = [10, 8, 9, 4, 16];

// remove the first grade
// think of it as: get all grades except the first one
const subset1 = grades.slice(1); //start from position 1
console.log(subset1); // [8, 9, 4, 16]

// remove the last 2 grades
// think of it as: get all grades except the last 2
// so start from 0 and stop after 5 - 2 = 3 items
const subset2 = grades.slice(0, grades.length - 2); 
console.log(subset2); // [10, 8, 9]
```

Đôi khi việc sử dụng `.filter` sẽ dễ dàng hơn bởi nó trả về một tập con của mảng gốc dựa trên điều kiện

```jsx
const grades = [10, 8, 9, 4, 16];

// return all grades >= 10
const subset1 = grades.filter(grade => grade >= 10);
console.log(subset1); // [10, 16]

// remove the 2nd grade
const subset2 = grades.filter(grade => grade !== 8);
console.log(subset2); // [10, 9, 4, 16]
```

Lưu ý rằng ví dụ thứ hai sẽ bỏ qua tất cả các điểm thi là `8`. Nếu bạn chỉ muốn bỏ qua phần tử thứ hai, bạn có thể sử dụng đối số thứ hai mà bạn nhận được với `filter`, đó là chỉ số.

```jsx
const grades = [10, 8, 9, 4, 16];

const subset = grades.filter((grade, index) => index !== 1);
console.log(subset); // [10, 9, 4, 16];
```

:::tip Tóm lại
 
- `.map` được sử dụng để cập nhật mảng theo cách bất biến.
- `.slice` là phương thức bất biến, trong khi `.splice` là phương thức thay đổi mảng.
- `.slice` được sử dụng để xóa các phần tử khỏi mảng theo cách bất biến.
- `.filter` được sử dụng để xóa các phần tử khỏi mảng theo cách bất biến.

:::

<!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/EDnLPIP2sYw?rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## FAQ - Câu hỏi thường gặp khi phỏng vấn

---

### Câu 1: Tại sao chúng ta không sửa trực tiếp mảng gốc, mà thay vào đó tạo ra một mảng mới?

React không thể phát hiện thay đổi nếu bạn thay đổi trực tiếp mảng gốc, vì tham chiếu không đổi. Việc tạo mảng mới giúp React nhận ra sự thay đổi và cập nhật UI.

React sử dụng Virtual DOM và so sánh các phiên bản trước–sau. Nếu bạn tạo mảng mới, React dễ dàng xác định phần nào cần render lại.

Thay đổi trực tiếp mảng có thể gây ra lỗi không mong muốn, đặc biệt khi nhiều component cùng sử dụng chung dữ liệu.

React khuyến khích viết code theo phong cách functional programming, nơi dữ liệu là bất biến và không có side effects.

### Câu 2: Tại sao nên sử dụng filter để xóa phần tử trong mảng bất biến?

Không làm thay đổi mảng gốc → giữ tính bất biến.

React nhận ra sự thay đổi → cập nhật lại UI chính xác.

Dễ đọc, dễ bảo trì → phù hợp với lập trình hàm.