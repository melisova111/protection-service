"use strict"

document.addEventListener('DOMContentLoaded', function () {
	const forms = document.querySelectorAll('.form-send__items');
	forms.forEach((form)=>{
		form.addEventListener('submit', formSend);
		async function formSend(e) {
			e.preventDefault();

			let error = formValidate(form);

			let formData = new FormData(form);

			if (error === 0) {
				form.classList.add('_sending');
				let response = await fetch('sendmail.php', {
					method: 'POST',
					body: formData
				});
				if (response.ok) {
					let result = await response.json();
					alert(result.message);
					form.reset();
					form.classList.remove('_sending');
				} else {
					alert("Ошибка");
					form.classList.remove('_sending');
				}
			} else {
				alert('<div class="popup-text"><span>Пожалуйста, укажите свой номер телефона</span></div><span class="popup-close btn"><span>X</span></span><button type="submit" class="popup-accept btn"><span>OK</span></button>');
			}

		}
	})
	

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//Функция теста email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

	$(document).ready(function ($) {
		window.realAlert = window.alert
		window.alert = function (s) {
			customAlert(s)
		}

		function customAlert(s) {
			if ($('.popup')[0]) {
				if ($('.popup').hasClass('open')) {
					$('.popup').find('.popup-content').html(s);
				} else {
					$('.popup').addClass('open').find('.popup-content').html(s);
				}
			} else {
				$('body').append('<div class="popup open"><div class="popup-content">' + s + '</div></div>');
			}
			$('.popup').fadeIn(1500);
		}

		$(document).on('click', '.popup', function () {
			$(this).removeClass('open').fadeOut();
		});

	});

});