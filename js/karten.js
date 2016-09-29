$(function () {
	/*
	НЕПРАВИЛЬНЫЕ ГЛАГОЛЫ
	
	На экран выводится перевод произвольного слова, и дается задание написать форму, навпример, Präteritum.
	Количество ячеек под слова опрееляются самым длинным возможным словом. Количество карточек - все буквы алфавита, включая умлауты и эсцет. При перетаскивании карточки клонируются (чтобы можно было одну и ту же использовать несколько раз). Ячейки после перетаскивания принимают значение карточки.
	*/

	var word = $("#word"),
		schrift = $(".schrift"),
		aufgabe = $("#aufgabe"),
		res = $("#res"),
		ok = $("#ok"),
		leer = "<div class='leer'></div>";


	//получение данных из JSON
	$.getJSON("js/karten/verben.json")
		.done(function (data) {
			//при удачном обращении...

			let verb = data.verb,
				verbForm,
				ruWord,
				deWord;

			addLeer(verb);

			schrift.draggable({
				cursor: "pointer",
				revert: true
			});


			buchstabieren();
			$("#repeat").click(function () {
				buchstabieren();
			});

			function buchstabieren() {
				let i = random(0, verb.length),
					j = random(1, 4);

				res.text("").removeAttr("class");

				switch (j) {
				case 1:
					verbForm = "Infinitiv";
					break;
				case 2:
					verbForm = "Präsens";
					break;
				case 3:
					verbForm = "Präteritum";
					break;
				case 4:
					verbForm = "Partizip II";
					break;
				}

				ruWord = verb[i].ru;
				deWord = verb[i][verbForm];

				$(".ru").text(ruWord);
				$(".form").text(verbForm);

				//обработка события - клик по кнопке "ОК"
				ok.on("click", function () {
					let str = "";

					$.each(word.children(), function () {

						if (this.innerText !== "") str += this.innerText;

					});

					if (str === deWord) {
						res.text("Совершенно верно! Продолжим?").addClass("noerror").removeClass("error");
					} else {
						res.text("Увы, но это неправильный ответ :( Попробуйте ещё раз").addClass("error").removeClass("noerror");
					}
				});
			}
		})
		.fail(function (jqXHR, status, error) {
			//ошибка
			console.log(status, error);
		});


	//создание пустых ячеек под буквы
	function addLeer(obj) {
		let max = 1,
			wid,
			hei;

		$.each(obj, function () {
			if (max < $(this)[0]["Infinitiv"].length) max = $(this)[0]["Infinitiv"].length;
			if (max < $(this)[0]["Präsens"].length) max = $(this)[0]["Präsens"].length;
			if (max < $(this)[0]["Präteritum"].length) max = $(this)[0]["Präteritum"].length;
			if (max < $(this)[0]["Partizip II"].length) max = $(this)[0]["Partizip II"].length;
		});

		wid = (word.width() / max) - 5;
		hei = wid * 1.3;

		for (let i = 0; i < max; i++) {
			word.append(leer);
			$(".leer").css({
				"width": wid + "px",
				"height": hei + "px",
				"line-height": hei + "px"
			});
		}

		$(".leer").droppable({
			accept: schrift,
			drop: function (el) {
				$(this).text(el.toElement.innerHTML);
			}
		});
	}


	//рандомное число
	function random(min, max) {
		return Math.floor(arguments.length > 1 ? (max - min + 1) * Math.random() + min : (min + 1) * Math.random());
	}

});