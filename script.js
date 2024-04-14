const canvas = document.querySelector('canvas');
const form = document.querySelector('.signature-pad-form');
const clearButton = document.querySelector('.clear-button');
const ctx = canvas.getContext('2d');
let writingMode = false;

const body = document.querySelector("body");
const input = document.getElementById("colorPicker");
const colorCode = document.getElementById("colorCode");


setColor();
input.addEventListener("input", setColor);

function setColor() {
	// body.style.backgroundColor = input.value;
	colorCode.innerHTML = input.value;
ctx.strokeStyle = input.value;
ctx.stroke();

}

function downloadImage(url) {
    fetch(url, {
      mode : 'no-cors',
    })
      .then(response => response.blob())
      .then(blob => {
      let blobUrl = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
    //   a.download = url.replace(/^.*[\\\/]/, '');
      a.download = 'signature.png';
      a.href = blobUrl;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
  }
  


form.addEventListener('submit',(event)=>{
    event.preventDefault();

    const imageURL = canvas.toDataURL();
    const image = document.createElement('img');
    image.src = imageURL;
    image.height = canvas.height;
    image.width = canvas.width;
    image.style.display = 'block';
    downloadImage(imageURL);
    // form.appendChild(image);
    clearPad();
});

const clearPad = ()=>{
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

clearButton.addEventListener('click', (event)=>{
    event.preventDefault();
    clearPad();

});

const getTargetPosition = (event) =>{
positionX = event.clientX - event.target.getBoundingClientRect().x;
positionY = event.clientY - event.target.getBoundingClientRect().y;
return [positionX,positionY];
}

const handlePointerMove = (event) =>{
if(!writingMode) return

const [positionX, positionY] = getTargetPosition(event);
ctx.lineTo(positionX,positionY);
ctx.strokeStyle = input.value;
ctx.stroke();
}

const handlePointerUp = () =>{
    writingMode = false;
}

const handlePointerDown = (event) =>{
writingMode = true;
ctx.beginPath();

const [positionX, positionY] = getTargetPosition(event);
ctx.moveTo(positionX,positionY);
}

ctx.lineWidth = 1;
ctx.lineJoin = ctx.lineCap = 'round';

canvas.addEventListener('pointerdown',handlePointerDown, {passive: true});
canvas.addEventListener('pointerup',handlePointerUp, {passive: true});
canvas.addEventListener('pointermove',handlePointerMove, {passive: true});



// Note : https://www.youtube.com/watch?v=AmUhrlqITwg&ab_channel=DivByDiv