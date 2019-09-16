# Wonder Wheel

The Wonder Wheel accepts an array of objects representing skills. These skills have a title, fill color, font color, id as well as project id for filter purposes. The project id corresponds to the array of project objects. 

## Usage

You need to have the below HTML heirarchy in order for JavaScript to correctly select portions of the DOM. 

```<div id='wrapper'>
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

</div>```

If you want to change the classes/ids you can but you need to update them in the CSS, JS and HTML. 

You operate the wonder wheel by clicking the spin button and whatever result the wheel lands on is what will be used for your filter. You can also click on the titles in the pie chart sections to render a list of projects that have that project ID. 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)