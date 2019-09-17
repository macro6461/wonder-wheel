# Wonder Wheel

The Wonder Wheel accepts an array of objects representing skills, called `slices`. These `slices` have a title, fill color, font color, id as well as project id for filter purposes. The project id corresponds to the array of project objects. See below.

```
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
```

## Usage

You need to have the below HTML heirarchy in order for JavaScript to correctly select portions of the DOM. 

```
<div id='wrapper'>
    <div class='outerContainer'>
        <div>
            <p class="spinButton" onclick="spin()">Spin</p>
            <div class="stopper"></div>
        </div>
        <div id="container">
            <div class="axel"></div>
            <div id="pContainer">
                <canvas id="canvas" width="302" height="300" style="border-radius: 50%;">
                </canvas>
            </div>
        </div>
    </div>
    <div id="listContainer">
        <h1>Projects</h1>
        <ul id="list"></ul>
    </div>

</div>
```

If you want to change the classes/ids you can but you need to update them in the CSS, JS and HTML. 

You operate the wonder wheel by clicking the spin button and whatever result the wheel lands on is what will be used for your filter. You can also click on the titles in the pie chart sections to render a list of projects that have that project ID. 

##Parameters

`slices` objects can contain either `font` and `fill` values to determine style of wheel slice OR you can apply a general `backgroundColor` and `color` to `wheelData`. See below.

```
ACCEPTABLE SLICE OBJECT

    {title: 'JavaScript', fill: "grey", font: 'white', id: 0, project: 'js'}

    OR 

    {title: 'JavaScript', fill: "", font: '', id: 0, project: 'js'}

    OR 

    {title: 'JavaScript', id: 0, project: 'js'}
    
```

*If you are going to omit font and fill colors then you must set `backgroundColor`. See below.

```ACCEPTABLE WHEELDATA OBJECT

const wheelData = {
  backgroundColor: "grey",
  color: null,
  slices: slices,
  projects: projects
};

OR

const wheelData = {
  backgroundColor: "",
  color: "",
  slices: slices,
  projects: projects
};

OR

const wheelData = {
  backgroundColor: null,
  color: null,
  slices: slices,
  projects: projects
};

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)