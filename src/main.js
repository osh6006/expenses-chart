// fetch로 json파일의 데이터를 가져옴
loadItems = async () => {
  const result = await fetch("/data.json"); // fetch에서 데이터를 받아옴
  const json = await result.json();
  return json.items; // 제이슨의 배열을 리턴
};

// 아이템에 css를 적용
itemToCSS = items => {
  // 1. <ul> element 선택
  const ul = document.querySelector(".graph");
  // 2. <li> 목록 선택
  const wrap = ul.getElementsByTagName("li");
  const graphBar = document.querySelectorAll(".graph-bar");

  for (let index = 0; index < wrap.length; index++) {
    if (index > 0) {
      wrap[index].style.marginLeft = index * 70 + "px";
    }
    graphBar[index].style.height = parseInt(items[index].amount) * 4 + "px";
    //console.log(items[index].amount);
  }
};

// 업데이트 된 아이템을 보여줌
displayItems = items => {
  const container = document.querySelector(".contents__chart"); // 아이템을 담고있는 컨테이너 선택
  container.innerHTML = items.map(items => createHTMLString(items)).join(""); // HTML문자열로 만들어준다.
};

// html 스트링을 만들어줌
createHTMLString = item => {
  return `
    <li class="wrap">
        <div class="amount">${item.amount}</div>
        <div class="graph-bar"></div>
        <div class="day">${item.day}</div>
    </li>
    `;
};

onGraphBarHover = (graphBar, amount) => {
  graphBar.style.backgroundColor = "hsl(186, 34%, 60%)";
  amount.style.visibility = "visible";
};

outGraphBarHover = (graphBar, amount) => {
  graphBar.style.backgroundColor = "hsl(10, 79%, 65%)";
  amount.style.visibility = "hidden";
};

// 그래프의 이벤트 리스너
setEventListeners = () => {
  const graphBar = document.querySelectorAll(".graph-bar");
  const amount = document.querySelectorAll(".amount");

  for (let index = 0; index < graphBar.length; index++) {
    graphBar[index].addEventListener("mouseover", () => {
      onGraphBarHover(graphBar[index], amount[index]);
    });
    graphBar[index].addEventListener("mouseout", () => {
      outGraphBarHover(graphBar[index], amount[index]);
    });
  }
};

loadItems()
  .then(items => {
    displayItems(items);
    itemToCSS(items);
    setEventListeners();
  })
  .catch(console.log());
