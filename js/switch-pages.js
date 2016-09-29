$(function () {

	var menu = $("header").children(),
		main = $("main");

	menu.click(function () {
		main.load("pages/" + $(this).attr("id") + ".html");
	});
});