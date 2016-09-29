$(function () {
	var notiz = '<div class="notiz"><textarea></textarea></div>',
		del = $("#del"),
		N = 25;

	//создание стопку "листьев", количество - N
	for (let i = 0; i < N; i++) {

		let k = (i * 3) + "px";

		$("h1").after(notiz);
		$(".notiz").css({
			top: k,
			left: k
		});
	}

	//оформление стопки - листки чуть сдвинуты
	$.each($(".notiz"), function (i) {
		let t = (i + 61) + "px",
			l = i / 2 + "px";

		$(this).css({
			top: t,
			left: l
		});
	});

	//перетаскивание
	$(".notiz").draggable();

	//изменение размеров
	$(".notiz").resizable();

	//удаление
	del.droppable(); //если не объявить заранее, то объект станет областью перетаскивания только после первого события мыши, и при первом перетаскавании на него не повестся класс ".ui-droppable-hover", который меняет его цвет при наведении удаляемого элемента на крестик
	$(".notiz").on("mouseup", function () {
		let el = $(this);
		//console.log("1: " + el);

		del.droppable({
			drop: function () {
				el.remove();
			}
		});
	});


	// !ХРАНЕНИЕ ИНФОРМАЦИИ! - реализовать позже
});