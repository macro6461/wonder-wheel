var projects = [
  {projectName: 'JavaScript 1', filter: 'js'},
  {projectName: 'JavaScript 2', filter: 'js'},
  {projectName: 'JavaScript 3', filter: 'js'},
  {projectName: 'Scala 1', filter: 'scala'},
  {projectName: 'Scala 2', filter: 'scala'},
  {projectName: 'Python 1', filter: 'py'},
  {projectName: 'PHP 1', filter: 'php'},
  {projectName: 'PHP 2', filter: 'php'}
]




var slices = [

  {title: 'JavaScript', fill: "grey", font: 'white', id: 0, project: 'js'},
  {title: 'Ruby', fill: "grey", font: 'white', id: 1, project: 'ruby'},
  {title: 'Python', fill: 'grey', font: 'white', id: 2, project: 'py'},
  {title: "Java", fill: "grey", font: "white", id: 3, project: 'java'},
  { title: "Scala", fill: "grey", font: "white", id: 4, project: 'scala'},
  {title: "PHP",fill: "grey",font: "white",id: 5, project: 'php'},
]

const wonderWheel = {
  sliceStyle: true,
  backgroundColor: null,
  color: 'white',
  slices: slices
};

var hasSpun, isSpinning = false;
var spinButton, container, pContainer, canvas, context, stopper, pie;
var startDegrees = 0;

var Circle = function(center, radius) {

  this.center = center;
  this.radius = radius;

  this._radiusSquared = Math.pow(this.radius, 2);
};

var CircleSector = function(startAngle, endAngle) {


  this.startAngle = startAngle;
  this.endAngle = endAngle;
};

var Pad = function(sector, slice) {

  this.sector = sector;
  this.color = slice.fill;
  this.id = slice.id
  this.project= slice.project

};

Pad.prototype.draw = function(context, circle) {
  context.beginPath();
  context.moveTo(circle.center.x, circle.center.y);
  context.arc(circle.center.x, circle.center.y, circle.radius,
    this.sector.startAngle, this.sector.endAngle, false);
  context.lineWidth = circle.radius;
  context.fillStyle = this.color;
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = '#444';
  if (slices.length > 1){
    context.stroke();
  }
};

isLabel = (id) =>{
  var finalId
  if (id.includes('title')){
    finalId = parseInt(id.split("title")[1])
  } else {
    finalId = parseInt(id)
  }
  return finalId
}


onClick = (e) =>{
  var id = e.target ? isLabel(e.target.id) : e
  var selected = slices.find((x)=>{return x.id === id })
  loadProjects(selected.project)
}

makeTitleContainer = (angle, i) =>{
  pContainer = document.getElementById('pContainer');
  var el1 = document.createElement("DIV")
  var elLabel = document.createElement("LABEL")
  var elLabelContainer = document.createElement("DIV")
  elLabel.id = slices[i].id
  pContainer.appendChild(el1)
  if (slices.length > 2){
    el1.style.top = 10 +'px'
    el1.classList.add('titleContainer')
    elLabelContainer.classList.add('title')
    el1.style.transform = `rotate(${angle + ((360/slices.length)/2)}deg)`
  } else if (slices.length == 2) {
    el1.classList.add('twoTitleContainer')
    if (i === 0){
      el1.style.transform = 'rotate(180deg)'
      el1.style.bottom = 0 + 'px'

    } else {
      el1.style.transform = 'rotate(0deg)'
      el1.style.top = 0 + 'px'
    }
  } else {
    el1.classList.add('twoTitleContainer')
    el1.style.transform = 'rotate(0deg)'
    el1.style.top = 0 + 'px'
  }

  elLabelContainer.id = 'title' + elLabel.id
  elLabel.classList.add('titleLabel')
  elLabel.innerText = slices[i].title
  elLabel.style.color = slices[i].font
  elLabelContainer.appendChild(elLabel)
  el1.appendChild(elLabelContainer)


  document.getElementById(elLabel.id).addEventListener('click', onClick);

  document.getElementById('title' + elLabel.id).addEventListener('click', onClick);
};



radians_to_degrees = (radians) => {
  var pi = Math.PI;
  return radians * (180/pi);
};


var Pie = function(circle, colors) {
  this.circle = circle;
  var angle =  2 * Math.PI / colors.length;

  this.pads = colors.map((color, i) => {
    makeTitleContainer(i*radians_to_degrees(angle), i)
    return new Pad(new CircleSector(i*angle, (i+1)*angle), color);
  });
};

Pie.prototype.draw = function(context) {
  this.pads.forEach((pad, i)=>{
    pad.draw(context, this.circle);
  })
};

loadProjects = (x) =>{

  if (x === 'all'){
    renderProjects(projects)
  } else {
    var arr = projects.filter((y)=>{
      return y.filter === x.toLowerCase()
    })
    renderProjects(arr)
  }
};

renderProjects = (arr) =>{
  var list = document.getElementById('list');
  list.innerHTML = "";
  if (arr.length > 0){
    for (var i = 0; i < arr.length; i++){
      var listItem = document.createElement("LI");
      listItem.innerText = arr[i].projectName;
      list.appendChild(listItem)
    }
  } else {
    var listItem = document.createElement("LI");
    listItem.innerText = 'NO DATA';
    list.appendChild(listItem)
  }
}

function getPositionAtCenter(element) {
  const {top, left, width, height} = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2
  };
}

function getDistanceBetweenElements(a, b) {
    var aPosition
    var bPosition
    if(a.x){
        aPosition = a;
        bPosition = getPositionAtCenter(b);
    } else {
        aPosition = getPositionAtCenter(a);
        bPosition = getPositionAtCenter(b);
    }

  return Math.sqrt(
    Math.pow(aPosition.x - bPosition.x, 2) +
    Math.pow(aPosition.y - bPosition.y, 2)
  );
}


spin = () => {
  if (!isSpinning){
    spinButton = document.getElementsByClassName('spinButton')[0];
    spinButton.classList.add('disable')
    if (pContainer.style.transform === ""){
      startDegrees = 0
    } else {
      startDegrees = parseInt(pContainer.style.transform.split('(')[1].split("deg)")[0])
    }
    startDegrees =  startDegrees + (Math.floor(Math.random() * 1080) + 360)
    pContainer.style.transition = 'transform 5s'
    pContainer.style.transform = `rotate(${startDegrees}deg)`
  }
  isSpinning = true;
  setTimeout(()=>{
    calcDistance()
    spinButton.classList.remove('disable');
    isSpinning = false;
  }, 5000)
}

calcDistance = () =>{
  var tops = []
    var sorted =[]
  var titleLabels = document.getElementsByClassName('titleLabel');
  for (var i = 0; i < titleLabels.length; i++){
    tops.push(titleLabels[i].getBoundingClientRect().top)
  }

  //get two closest to stopper
  tops = tops.sort((a, b)=>{
    return a - b
  }).slice(0,2)

  for (var i = 0; i < titleLabels.length; i++){
    if (tops.includes(titleLabels[i].getBoundingClientRect().top)){
      sorted.push(titleLabels[i])
    }
  }

  closestEl(sorted)

};

closestEl = (e) =>{
    var titles, coords;
    if (Array.isArray(e)){
        titles = e
        coords = stopper
    } else{
        var titles = document.getElementsByClassName('title');
        coords ={x: e.clientX, y: e.clientY}
    }
    var isClosest = [];
    for (var i = 0; i < titles.length; i++){
        var obj = {}
        obj['dist'] = getDistanceBetweenElements(coords, titles[i]);
        obj['id'] = titles[i].id
        isClosest.push(obj);
    }
    var final = document.getElementById(isClosest.sort((a, b)=>{return a.dist-b.dist})[0].id);
    final.click();
};

checkCoords = (e) =>{
    debugger
    var radius = document.getElementById('canvas').getBoundingClientRect().width/2;
    var canvasY = document.getElementById('canvas').getBoundingClientRect().top;
    var canvasX= document.getElementById('canvas').getBoundingClientRect().left;
    var center = {x: canvasX + radius, y: canvasY + radius };
    if (Math.sqrt((e.clientX-center.x)*(e.clientX-center.x) + (e.clientY-center.y)*(e.clientY-center.y)) < radius){
        closestEl(e)
    }
};

window.onload = ()=> {
    loadProjects('all')
};

window.addEventListener('DOMContentLoaded', ()=>{

    canvas =  document.getElementById('canvas');
    context = canvas.getContext('2d');

    canvas.addEventListener('click', (e)=>{
        if (!isSpinning){
            debugger
            checkCoords(e)
        }
    });

    pie = new Pie(new Circle({ x: (canvas.width / 2), y: (canvas.height / 2) }, 150),
        slices);

    pie.draw(context);

    hasSpun, isSpinning = false;
    spinButton = document.getElementsByClassName('spinButton')[0];
    container = document.getElementById('container');
    pContainer = document.getElementById('pContainer');
    stopper = document.getElementsByClassName('stopper')[0];
});
