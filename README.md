# Gridly.js

A simple jQuery plugin for arranging div elements into a grid.

Create a simple grid layout that is either 
- fixed width (generally 1920x1080 for use on a HDTV layout)
- relative (scales in size, best suited for desktop)


### demo pages

- [Basic fixed layout](http://redronin.github.com/gridly/examples/nogutter.html)
- [Basic fixed layout with gutter](http://redronin.github.com/gridly/examples/gutter.html)


### usage

1. Include `gridly.js` in your page. Ensure you have `jquery` loaded before as well.


2. Create a html structure like:

```
<div class='gridly' id='mygrid' data-rows='4' data-cols='6' data-width='1920' data-height='1080' data-orientation='horizontal'>
  <!-- cell in row 1, col 1, width of 1x and height of 1x -->
  <div class='cell' data-col='1' data-row='1' data-width='1' data-height='1'>
   your content
  </div>

  <!-- cell in row 1, cols 2-3, width of 2x and heigh of 1 -->
  <div class='cell' data-col='2' data-row='1' data-width='2' data-height='1'>
   your content
  </div>

  <!-- a 2x2 cell in row 1, col 4 -->
  <div class='cell' data-col='4' data-row='1' data-width='2' data-height='2'>
   your content
  </div>

  ...
  ...
</div>
```


3. Initialize your grid with:

```
  $('#mygrid').gridly();
```

#### options

<table>
  <tr>
    <th>option</th>
    <th>default</th>
    <th>notes</th>
  </tr>
  <tr>
    <td>width</td>
    <td>1920</td>
    <td>Width of grid in px</td>
  </tr>
  <tr>
    <td>height</td>
    <td>1080</td>
    <td>Height of grid in px</td>
  </tr>
  <tr>
    <td>orientation</td>
    <td>horizontal</td>
    <td>'horizontal' or 'vertical'</td>
  </tr>
  <tr>
    <td>rows</td>
    <td>4</td>
    <td>number of rows in the grid</td>
  </tr>
  <tr>
    <td>cols</td>
    <td>6</td>
    <td>number of columns in the grid</td>
  </tr>
  <tr>
    <td>fixed</td>
    <td>true</td>
    <td>true|false - if true, the grid is a fixed size in px. If false, the grid will fix in the browser window and will resize as the window resizes, but keeping it's original ratio.</td>
  </tr>
  <tr>
    <td>gutter</td>
    <td>0</td>
    <td>Gutter width between cells. If 0, no gutter. Otherwise gutter values > 0 will create a Xpx width around each cell. The outside border will be the 2xgutter value (ie: there will be each gutter around each cell).

  For example, if you specify gutter=2, then there is going to be a 4px border around the entire dashboard, and a 4px between each cell.
    </td>
  </tr>
</table>

You can specify the options in either a hash when you initialize the grid

```
$('#mygrid').gridly({width:1920, rows:4, cols:6})
```

or you can specify `data-` attributes in the `div` element of the grid.

