var effectButton;
var paintButton;
var canvas;
var context;
var canvas2;
var context2;
var canvas3;
var context3;

function init() {
  var image = document.getElementById('SourceImage');
  effectButton = document.getElementById('EffectButton');
  paintButton = document.getElementById('PaintButton');
  decryptButton = document.getElementById('DecryptButton');
  
  canvas0 = document.getElementById('SourceImage');
  context0 = canvas.getContext('2d');
  
  canvas = document.getElementById('Canvas');
  context = canvas.getContext('2d');
  
  canvas2 = document.getElementById('Canvas2');
  context2 = canvas2.getContext('2d');
  
  canvas3 = document.getElementById('Canvas3');
  context3 = canvas3.getContext('2d');
  
  // Set the canvas the same width and height of the image
  canvas.width = image.width;
  canvas.height = image.height;
  
  canvas2.width = image.width;
  canvas2.height = image.height;
 
  canvas3.width = image.width;
  canvas3.height = image.height;

  paintButton.addEventListener('click', function () {
    drawImage(image);
    // Or
    // var image = new Image();
    // image.onload = function () {
    //    drawImage(image);
    // }
    // image.src = 'image.jpg';
  });
  
  effectButton.addEventListener('click', addEffect);
  
  decryptButton.addEventListener('click', function () {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var imageData2 = context2.getImageData(0, 0, canvas2.width, canvas2.height);
    var imageData3 = context3.getImageData(0, 0, canvas3.width, canvas3.height);
    
    XOR(imageData, imageData2, imageData3)
    
    context3.putImageData(imageData3, 0, 0);
    context3.drawImage(image, 0, 0);
  });
}

function drawImage(image) {
  context.drawImage(image, 0, 0);
}

function addEffect() {
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var imageData2 = context2.getImageData(0, 0, canvas2.width, canvas2.height);
    
    changeToWhite(imageData.data, imageData2.data);
    
    context.putImageData(imageData, 0, 0);
    context2.putImageData(imageData2, 0, 0);
}

function randomNumber(min, max) {
  // !!!!!!!!!!
  // TODO: PROBABLY NOT CRYPTOGRAPHICALLY SECURE
  // !!!!!!!!!!
  return Math.floor(Math.random() * max) + min; 
}

function changeToWhite(data, data2) {
  for (var i = 0; i < data2.length; i += 4) {
    data2[i] = randomNumber(0, 255);
    data2[i+1] = randomNumber(0, 255);
    data2[i+2] = randomNumber(0, 255);
    data2[i+3] = 255;
    
    data[i] ^= data2[i];
    data[i+1] ^= data2[i+1];
    data[i+2] ^= data2[i+2];
    data[i+3] = 255;
  }
/*   for (var i = 0; i < data.length; i++ ) {
    data[i] = randomNumber(0, 255);
  } */
}

function XOR(in1, in2, output) {
  for (var i = 0; i < output.length; i += 4) {
    output[i] = in1[i] ^ in2[i];
    output[i+1] = in1[i+1] ^ in2[i+1];
    output[i+2] = in1[i+2] ^ in2[i+2];
    output[i+3] = 255;
  }
/*   for (var i = 0; i < data.length; i++ ) {
    data[i] = randomNumber(0, 255);
  } */
}

window.addEventListener('load', init);









var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('SourceImage');
var ctx = canvas.getContext('2d');


function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}
