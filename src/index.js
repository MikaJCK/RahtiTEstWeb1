import "./styles.css";

/*document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;*/

var array = [];
var player = "X";
const SizeofBoard = 5;

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function() {
    initializeCode();
  });
}

function initializeCode() {
  renderTablet();
  ChangePlayerButton();
  makeArray();
  //addListener();
}

function makeArray() {
  array = [];
  for (var i = 0; i < SizeofBoard; i++) {
    var subarray = ["", "", "", "", ""];
    array.push(subarray);
  }
}

function addListener(element) {
  const button = element;
  console.log("button done");
  button.addEventListener("mousedown", event => {
    buttonActivites(element.id);
    event.stopPropagation();
  });
}

function buttonActivites(id) {
  if (document.getElementById(id).innerHTML !== player) {
    document.getElementById(id).innerHTML = player;
    addItemToArray(id, player);
    changeplayer();
  }

  if (checkWinner(array) === 1) {
    window.setTimeout(clearBoard, 2000);
  }
}

function clearBoard() {
  var button = document.getElementById("clearButton");
  var button2 = document.getElementById("CP");
  initializeCode();
  document.getElementById("board").remove();
  button2.remove();
  button.remove();
}

function addItemToArray(id, symbol) {
  var splits = id.split("-");
  array[splits[0] - 1][splits[1] - 1] = symbol;
}

function renderTablet() {
  let tablehead = document.createElement("table");
  const width = SizeofBoard * 60,
    height = SizeofBoard * 60;
  //tablehead.setAttribute("style", "width:400px;height:400px");
  tablehead.setAttribute("width", width);
  tablehead.setAttribute("height", height);
  tablehead.setAttribute("id", "board");
  tablehead.style.tableLayout = "fixed";
  for (var i = 1; i < SizeofBoard + 1; i++) {
    let row = document.createElement("tr");
    for (var j = 1; j < SizeofBoard + 1; j++) {
      let element = document.createElement("th");
      element.setAttribute("id", i.toString() + "-" + j.toString());
      console.log(i.toString() + j.toString());
      addListener(element);
      row.appendChild(element);
    }
    tablehead.appendChild(row);
  }
  let mainelement = document.getElementById("body");
  mainelement.appendChild(tablehead);
  clearButton();
}

function clearButton() {
  let button = document.createElement("button");
  button.textContent = "clear board";
  button.setAttribute("id", "clearButton");
  button.addEventListener("mousedown", event => {
    clearBoard();
    event.stopPropagation();
  });
  let mainelement = document.getElementById("body");
  mainelement.appendChild(button);
}

function changeplayer() {
  if (player === "X") {
    player = "O";
  } else {
    player = "X";
  }
}

function ChangePlayerButton() {
  let button = document.createElement("button");
  button.textContent = "changeplayer";
  button.setAttribute("id", "CP");
  button.addEventListener("mousedown", event => {
    changeplayer();
    event.stopPropagation();
  });
  let mainelement = document.getElementById("body");
  mainelement.appendChild(button);
}

function checkReverseDiagonal() {
  var intx = 0;
  for (var i = 0; i < SizeofBoard; i++) {
    if (array[i][SizeofBoard - i - 1] === "X") {
      //console.log(i + " " + (SizeofBoard - i - 1) + " is X");
      intx++;
    } else if (array[i][SizeofBoard - i - 1] === "O") {
      //console.log(i + " " + (SizeofBoard - i - 1) + " is O");
      intx--;
    }
  }
  if (intx === SizeofBoard) {
    alert("X wins");
    return 1;
  } else if (intx === -SizeofBoard) {
    alert("O wins");
    return 1;
  }
  return 0;
}

function checkWinner(array2d) {
  var proxyArray;
  var int, proxyvalue;
  var array = [0, 0, 0, 0, 0, 0, 0];
  for (var i = 0; i < array2d.length; i++) {
    int = 0;
    proxyArray = array2d[i];
    for (var j = 0; j < proxyArray.length; j++) {
      if (proxyArray[j] === "X") {
        int++;
        proxyvalue = 1;
      } else if (proxyArray[j] === "O") {
        int--;
        proxyvalue = -1;
      } else {
        proxyvalue = 0;
      }
      array[j] += proxyvalue;
      if (j === i) {
        array[SizeofBoard] += proxyvalue;
      }
      if (array[j] === SizeofBoard || array[j] === -SizeofBoard) {
        int = array[j];
      }
      if (
        array[SizeofBoard] === SizeofBoard ||
        array[SizeofBoard] === -SizeofBoard
      ) {
        int = array[SizeofBoard];
      }
    }
    if (int === SizeofBoard) {
      alert("X wins");
      return 1;
    } else if (int === -SizeofBoard) {
      alert("O wins");
      return 1;
    }
  }
  if (checkReverseDiagonal() === 1) {
    return 1;
  }
  return 0;
}
