// We get to use jQuery. WHOOOOOOOOOOPPP!!!!

var color = $(".selected").css("background-color");
var context = $("canvas")[0].getContext("2d");
var $canvas = $("canvas");
var lastEvent;
var mouseDown = false;
var lineWidth = 1;

// when clicking on control list items
$(".controls").on("click", "li", function() {
	// Deselect sibling elements
	$(this).siblings().removeClass("selected");
	// Select clicked element
	$(this).addClass("selected");
	// Cache current color
	color = $(this).css("background-color");
});

// When "new color" is pressed
$("#revealColorSelect").click(function() {
	// Show color selection or hide the color selection
	changeColor();
	$("#colorSelect").toggle();
});

// Update the new color span
function changeColor() {
	var r = $("#red").val();
	var g = $("#green").val();
	var b = $("#blue").val();
	$("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
}

// When color sliders change
$("input[type=range]").change(changeColor);

// When "Add Color" is pressed
$("#addNewColor").click(function() {
	// Append the color to the controls ui
	var $newColor = $("<li></li>");
	$newColor.css("background-color", $("#newColor").css("background-color"));
	$(".controls ul").append($newColor);
	// Select the new color
	$newColor.click();
});

// increase stroke
$("#increaseStroke").click(function() {
    lineWidth++;
    $(".stroke-width").text("The brush size is " + lineWidth);
});

// decrease stroke
$("#decreaseStroke").click(function() {
    if (lineWidth <= 1) {
        lineWidth = 1;
    } else {
        lineWidth--;
        $(".stroke-width").text("The brush size is " + lineWidth);
    }
    console.log(lineWidth);
});

$("#export").click(function() {
    window.open().location = document.getElementsByTagName("canvas")[0].toDataURL("image/png");
});

// On mouse events on the canvas
$canvas.mousedown(function(e) {
	lastEvent = e;
	mouseDown = true;
}).mousemove(function(e) {
	// Draw lines
	if(mouseDown) {
		context.beginPath();
		context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
		context.lineTo(e.offsetX, e.offsetY);
		context.strokeStyle = color;
        context.lineWidth = lineWidth;
		context.stroke();
		lastEvent = e;
	}
}).mouseup(function() {
	mouseDown = false;
}).mouseleave(function() {
	$canvas.mouseup();
});
