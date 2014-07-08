// We get to use jQuery. WHOOOOOOOOOOPPP!!!!

var color = $(".selected").css("background-color");

// when clicking on control list items
$(".controls li").click(function() {
	// Deselect sibling elements
	$(this).siblings().removeClass("selected");
	// Select clicked element
	$(this).addClass("selected");
	// Cache current color
	color = $(this).css("background-color");
});

// When new color is pressed
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