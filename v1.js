let spots = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

for (let j = 0; j < 2; j++){
  let numbers = [1,2,3,4,5,6,7,8];
  for (let i = 0; i < 8; i++){
    let randomSpot = Math.floor(Math.random() * spots.length);
    let spot = spots[randomSpot];

    let randomNum = Math.floor(Math.random() * numbers.length);
    let number = numbers[randomNum];

    let spotElement = document.getElementById(spot.toString());
    spotElement.innerHTML = number;

    spots.splice(randomSpot, 1);
    numbers.splice(randomNum, 1);
  }
}

let tempOpen = [];

const show = id => {
  let element = document.getElementById(id);
  element.style.visibility = 'visible';
  tempOpen.push(id);
};

const hide = id => {
  let element = document.getElementById(id);
  element.style.visibility = 'hidden';
};

const check = id => {
  let element = document.getElementById(id);
  element.style.visibility === 'visible' ? undefined : show(id);
  let timer = setTimeout(timeOut, 1250);
};

const timeOut = () => {
  if (tempOpen.length >= 2) {
    if (tempOpen.length === 2 && document.getElementById(tempOpen[0]).innerHTML === document.getElementById(tempOpen[1]).innerHTML) {
      document.getElementById(tempOpen[0]).removeEventListener("click", check);
      document.getElementById(tempOpen[1]).removeEventListener("click", check);
      tempOpen = [];

    }
    tempOpen.forEach(spot => {
      hide(spot);
    });
    tempOpen = [];
  }
};