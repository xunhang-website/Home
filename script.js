let text = document.getElementById('text');
let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    text.style.marginTop = value * 1.5 + 'px';
    leaf.style.top = value * -1.5 + 'px';
    leaf.style.left = value * 1.5 + 'px';
    hill5.style.left = value * 1.5 + 'px';
    hill4.style.left = value * -1.5 + 'px';
    hill1.style.top = value * 0.5 + 'px';
});

function search() {
    // 获取输入框的值
    var searchText = document.getElementById("searchInput").value;

    // 移除上一次搜索的高亮和高亮文本样式
    var highlightedElements = document.querySelectorAll(".highlight");
    highlightedElements.forEach(function(element) {
      element.classList.remove("highlight");
    });
    var highlightedText = document.querySelectorAll(".highlight-text");
    highlightedText.forEach(function(element) {
      element.replaceWith(element.innerText);
    });

    if (searchText.trim() !== "") {
      // 查找匹配的文本
      var elements = document.querySelectorAll("p, h2, table tr");
      elements.forEach(function(element) {
        var text = element.innerText || element.textContent;

        // 如果是表格行，需要额外处理
        if (element.tagName.toLowerCase() === "tr") {
          var cells = element.querySelectorAll("td");
          cells.forEach(function(cell) {
            var cellText = cell.innerText || cell.textContent;
            if (cellText.includes(searchText)) {
              // 高亮匹配的表格单元格所在的行
              var row = cell.parentElement;
              row.classList.add("highlight");

              // 高亮匹配的文本
              var regex = new RegExp(searchText, "gi");
              row.innerHTML = row.innerHTML.replace(regex, function(match) {
                return '<span class="highlight-text">' + match + '</span>';
              });
            }
          });
        } else {
          if (text.includes(searchText)) {
            // 将找到的文本用红框框起来
            element.classList.add("highlight");

            // 高亮匹配的文本
            var regex = new RegExp(searchText, "gi");
            element.innerHTML = element.innerHTML.replace(regex, function(match) {
              return '<span class="highlight-text">' + match + '</span>';
            });

            // 将找到的文本移到页面首行
            element.scrollIntoView({ behavior: "smooth", block: "start" });

            // 只高亮第一个匹配项
            return;
          }
        }
      });
    }
  }