---
sidebar_position: 1
---

# Tabs Gallery 1

Tạo ứng dụng tabs gallery đơn giản 

<!-- ![Create-HTML-1](images/state.png) -->

<ToggleTOC />

<iframe height="300"  scrolling="no" title="Untitled" src="https://codepen.io/DinhTrieu/embed/vEGvGwd?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true">
      See the Pen <a href="https://codepen.io/DinhTrieu/pen/vEGvGwd">
  Untitled</a> by Dinh (<a href="https://codepen.io/DinhTrieu">@DinhTrieu</a>)
  on <a href="https://codepen.io">CodePen</a>.
      </iframe>

## I. Code HTML 

Định nghĩa tab & nội dung

```html
<section id="page3" class="screen3 load">
  <div class="container">
    <div class="screen3__title load fadeInDown">Testimonials</div>
    <div class="screen3__nav load fadeInDown">
      <div class="screen3__tab active" data-tab="0">Goretex Rhinoplasty</div>
      <div class="screen3__tab" data-tab="1">Silicone Rhinoplasty</div>
      <div class="screen3__tab" data-tab="2">Rib Cartilage Rhinoplasty</div>
      <div class="screen3__tab" data-tab="3">Reconstructive Rhinoplasty</div>
    </div>
    <div class="screen3__inner load fadeInDown">
      <div class="screen3__img">
        <img src="https://placehold.co/934x468/999999/FFFFFF?text=img1" alt="img1">
      </div>
      <div class="screen3__img">
        <img src="https://placehold.co/934x468/999999/FFFFFF?text=img2" alt="img2">

      </div>
    </div>
    <div class="screen3__inner hidden">
      <div class="screen3__img">
      </div>
      <div class="screen3__img">
        <img src="https://placehold.co/934x468/999999/FFFFFF?text=img3" alt="img3">

      </div>
    </div>
    <div class="screen3__inner hidden">
      <div class="screen3__img">
        <img src="https://placehold.co/934x468/999999/FFFFFF?text=img4" alt="img4">
      </div>
      <div class="screen3__img">
        <img src="https://placehold.co/934x468/999999/FFFFFF?text=img" alt="img">
      </div>
    </div>
    <div class="screen3__inner hidden">
      <div class="screen3__img"><img src="https://placehold.co/934x468/999999/FFFFFF?text=img5" alt="img"></div>
      <div class="screen3__img"><img src="https://placehold.co/934x468/999999/FFFFFF?text=img" alt="img"></div>
    </div>
  </div>

</section>
```

.screen3__nav chứa các phần tử đại diện cho “tab” (các div với class .screen3__tab). Mỗi tab có attribute data-tab xác định index tab. 

.screen3__inner tương ứng với nội dung của mỗi tab. Mỗi nội dung nên đứng theo thứ tự tương ứng với index tab. 

Tab mặc định khi load trang — tab đầu tiên — có class active; nội dung tương ứng hiện, các nội dung khác ẩn (bằng class hidden). 

## II. Style UI

Ẩn/hiện nội dung & style tab

```css
.container {
  max-width: 480px;
  margin: 0 auto;
}
.screen3 {
  background-color: #114d8f;
  padding: 20px 0;

  &__title {
    color: #fff;
    text-align: center;
    font-weight: 600;
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  &__tab {
    width: calc(48% - 2.5px);
    text-align: center;
    background-color: #fff;
    color: #114d8f;
    padding: 8px 3px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;

    &.active {
      color: #ff802c;
    }
  }

  &__inner {
    padding: 20px 0;
    &.hidden {
      display: none;
    }
  }

  &__img {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}
```

Tab nào có .active → được style nổi bật.

Nội dung tab tương ứng với tab active → .screen3__inner không có .hidden → hiển thị; các nội dung khác .hidden → ẩn. 

## III. Code JS

Xử lý click & chuyển tab

```js
document.querySelectorAll(".screen3__tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".screen3__tab")
      .forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");
    document
      .querySelectorAll(".screen3__inner")
      .forEach((inner) => inner.classList.add("hidden"));
    document
      .querySelectorAll(".screen3__inner")
      [tab.dataset.tab].classList.remove("hidden");
  });
});

```

Khi một tab được click → trước hết remove class active từ tất cả tab, sau đó thêm active cho tab được click. 

Ẩn hết semua nội dung (tất cả .screen3__inner add class hidden). 

Dựa vào data-tab của tab vừa click để tìm phần tử nội dung tương ứng (theo thứ tự trong DOM), rồi remove class hidden — tức hiển thị phần nội dung đó. 

