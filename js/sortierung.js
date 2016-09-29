$(function () {

	//получение данных из JSON
	$.getJSON("js/sortierung/worte.json")
		.done(function (data) { //успех
			let worte = data.worte,
				listA,
				listB;

			//изначальное создание двух списков
			addLists();

			//повторное создание списков по клику на кнопку "#repeat"
			$("#repeat").click(function () {
				addLists();
			});

			//функция для добавления списков на страницу
			function addLists() {
				listA = random(0, 3);
				do {
					listB = random(0, 3);
				} while (listA === listB);

				addUL(worte[listA], worte[listB]);

				//UI - элементы списка становятся перетаскиваемыми
				//кроме того, их можно перетаскивать не только внутри списка, но и между ними
				$(".list").sortable({
					connectWith: ".list"
				});
			}

			//проверка, правильно ли отсортированы списки
			$("#ok").on("click", function () {
				if (checkUL($(".list")[0].childNodes) === true && checkUL($(".list")[1].childNodes) === true) {
					$("#res").text("Совершенно верно! Продолжим?").addClass("noerror").removeClass("error");
				} else {
					$("#res").text("Увы, но неверно :( Попробуйте ещё раз").addClass("error").removeClass("noerror");
				}

				function checkUL(ul) {
					let flag = listA, //набор из списка worte[listA]
						noerror = 1;

					for (let j = 0; j < worte[listB].length; j++) {
						if (ul[0].innerText === worte[listB][j].de) {
							//если первый элемент списка равен какому-то элементу из worte[listB], значит это набор из списка worte[listB], меняем значение флага
							flag = listB;
							break;
						}
					}

					for (let i = 1; i < ul.length; i++) {
						for (let j = 0; j < worte[flag].length; j++) {
							if (ul[i].innerText === worte[flag][j].de) noerror++;
						}
					}

					if (noerror === ul.length) {
						return true;
					} else {
						return false;
					}
				}
			});
		})
		.fail(function (jqXHR, status, error) { //ошибка
			console.log(status, error);
		});


	//создание 2-x списков
	//количество слов в каждом наборе одинаковое, поэтму нет проверок на пустые элементы, это не входит в рамки текущей цели
	function addUL(arr1, arr2) {
		let N = arr1.length;

		$(".list")[0].innerHTML = "";
		$(".list")[1].innerHTML = "";

		for (let i = 0; i < N; i++) {
			if ((random(1, 1000) % 2) === 0) $(".list")[0].innerHTML += "<li>" + arr1[i].de + "</li>";
			else $(".list")[1].innerHTML += "<li>" + arr1[i].de + "</li>";

			if ((random(1, 1000) % 2) === 0) $(".list")[0].innerHTML += "<li>" + arr2[i].de + "</li>";
			else $(".list")[1].innerHTML += "<li>" + arr2[i].de + "</li>";
		}
	}

	//рандомное число
	function random(min, max) {
		return Math.floor(arguments.length > 1 ? (max - min + 1) * Math.random() + min : (min + 1) * Math.random());
	}
});