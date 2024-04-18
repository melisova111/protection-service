$(document).ready(function () {
	var swipers = [].slice.call(document.querySelectorAll('.seven-slider1 '));
	swipers.forEach(function (container) {

		var swiper = new Swiper(container, {
			// Optional parameters
			direction: 'horizontal',
			loop: false,
			grabCursor: true,
			centeredSlides: false,
			slidesPerView: "auto",

			observer: true,
			observeParents: true,

			// Navigation arrows
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				// dynamicBullets: true,
			},

			navigation: {
				nextEl: '.command-arrows__next', //можно их поменять (поставить любой класс) или настроить стандарный
				prevEl: '.command-arrows__prev',
			},

		});

	});

	var swipers = [].slice.call(document.querySelectorAll('.seven-slider2'));
	swipers.forEach(function (container) {

		var swiper = new Swiper(container, {
			// Optional parameters
			direction: 'horizontal',
			loop: false,
			grabCursor: true,
			centeredSlides: false,
			slidesPerView: "auto",

			observer: true,
			observeParents: true,

			// Navigation arrows
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				// dynamicBullets: true,
			},
			navigation: {
				nextEl: '.command-arrows__next', //можно их поменять (поставить любой класс) или настроить стандарный
				prevEl: '.command-arrows__prev',
			},
		});

	});



	let serviceSlider = new Swiper('.service-slider', {
		// arrows
		// navigation: {
		//     nextEl: '.swiper-btn-next',//можно их поменять (поставить любой класс) или настроить стандарный
		//     prevEl: '.swiper-btn-prev',
		// },
		effect: 'fade',
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			// dynamicBullets: true,
		},
		//переключение при клике на слайд
		slideToClickedSlide: true,
		//управление клавиатурой
		keyboard: {
			// вкл / выкл
			enabled: true,
			//слайдер будет переключаться стрелками клавиатуры только когда мы до него доскролим
			onlyInViewport: true,
			//управдение слайдером кнопаками pageDown-pageUp
			pageUpDown: true,
		},
		slidesPerView: 1,
		spaceBetween: 20,
		observeParents: true,
		observer: true,
		//активный слайд по центру страницы
		centeredSlides: true,
		loop: true,
	});


	let commandSlider = new Swiper('.command-slider', {
		// arrows
		navigation: {
			nextEl: '.command-arrows__next', //можно их поменять (поставить любой класс) или настроить стандарный
			prevEl: '.command-arrows__prev',
		},
		// effect: 'fade',
		pagination: {
			el: '.command-pagination',
			clickable: true,
			// dynamicBullets: true,
		},

		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			767.98: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			991.98: {
				slidesPerView: 3,
				spaceBetween: 40,
				navigation: false
			},
			1400: {
				slidesPerView: 4,
				spaceBetween: 50,
			},
		},



		//переключение при клике на слайд
		slideToClickedSlide: true,
		//управление клавиатурой
		keyboard: {
			// вкл / выкл
			enabled: true,
			//слайдер будет переключаться стрелками клавиатуры только когда мы до него доскролим
			onlyInViewport: true,
			//управдение слайдером кнопаками pageDown-pageUp
			pageUpDown: true,
		},
		slidesPerView: 4,
		spaceBetween: 32,
		//бесконечно (не работает если количество рядоров больше 1-го)
		loop: true,

	});
	$("a.fancybox-link").fancybox();

	// if($(this).hasClass('collapsed')){
	//     console.log(this);
	//     $('.answers-card__header').css('background', 'grey');
	// }
	// else{
	//     console.log('blue');
	// }
	// $('.answers-card .show').parent().css('background', 'black');


	// $('.answers-card .btn-link').click(function(){
	//    if($('.collapse').hasClass('show')){
	//         $(this).toggleClass('red');
	//         console.log('add');
	//     }
	//     else{
	//         console.log('remove');
	//         $(this).removeClass('red');
	//     }
	//     // $('.collapse .show').parent().css('background', 'black');
	// })
	// $('.answers-card .btn-link').click(function () {
	//     var target = $(this).attr("aria-expanded");
	//     if($(target) == 'true'){
	//         console.log(target);
	//         $(this).css('background', 'black');
	//     }
	//     else{
	//         $(this).css('background', 'transparent');

	//     }
	//     // if ($(".btn-block").filter("[aria-expanded=true]")) {
	//         // $(".btn-block").filter("[aria-expanded=true]").css('background', 'black');
	//         // $(".btn-block").filter("[aria-expanded=false]").css('background', 'transparent');
	//     // }
	// });
	// $('.answers-card .btn-link').click(function () {
	//     console.log($(this).siblings());
	//     if($(this).siblings().hasClass('.show')) { 
	//         console.log('link');
	//         $(this).parent().addClass('red');
	//         // Element 'a' has no href
	//     }
	//     else{
	//         console.log('none');
	//     }
	// })

	$('.question-icon').on('mouseover', function () {
		$(this).parents('.question-icon-parent').addClass('active')
	});

	$('.question-icon').on('mouseout', function () {
		$(this).parents('.question-icon-parent').removeClass('active')
	});

	// Menu burger
	const iconMenu = document.querySelector('.menu__icon');
	const navMobile = document.querySelector('.header-nav-mobile');
	if (iconMenu) {
		iconMenu.addEventListener("click", function (e) {
			document.body.classList.toggle('lock');
			iconMenu.classList.toggle('active');
			navMobile.classList.toggle('active');
		});
	}

	// anchor
	$('.header-nav__menu').click(function () {
		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 500);
		return false;
	});


	// tabs: dropdown
	const $tabsToDropdown = $(".tabs-to-dropdown");

	function generateDropdownMarkup(container) {
		const $navWrapper = container.find(".nav-wrapper");
		const $navPills = container.find(".nav-pills");
		const firstTextLink = $navPills.find("li:first-child a").text();
		const $items = $navPills.find("li");
		const markup = `
    <div class="dropdown d-md-none">
		<button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		${firstTextLink}
		
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> 
        ${generateDropdownLinksMarkup($items)}
      </div>
    </div>
  `;
		$navWrapper.prepend(markup);
	}

	function generateDropdownLinksMarkup(items) {
		let markup = "";
		items.each(function () {
			const textLink = $(this).find("a").text();
			markup += `<a class="dropdown-item" href="#">${textLink}</a>`;
		});

		return markup;
	}

	function showDropdownHandler(e) {
		// works also
		//const $this = $(this);
		const $this = $(e.target);
		const $dropdownToggle = $this.find(".dropdown-toggle");
		const dropdownToggleText = $dropdownToggle.text().trim();
		const $dropdownMenuLinks = $this.find(".dropdown-menu a");
		const dNoneClass = "d-none";
		$dropdownMenuLinks.each(function () {
			const $this = $(this);
			if ($this.text() == dropdownToggleText) {
				$this.addClass(dNoneClass);
			} else {
				$this.removeClass(dNoneClass);
			}
		});
	}

	function clickHandler(e) {
		e.preventDefault();
		const $this = $(this);
		const index = $this.index();
		const text = $this.text();
		$this.closest(".dropdown").find(".dropdown-toggle").text(`${text}`);
		$this
			.closest($tabsToDropdown)
			.find(`.nav-pills li:eq(${index}) a`)
			.tab("show");
	}

	function shownTabsHandler(e) {
		// works also
		//const $this = $(this);
		const $this = $(e.target);
		const index = $this.parent().index();
		const $parent = $this.closest($tabsToDropdown);
		const $targetDropdownLink = $parent.find(".dropdown-menu a").eq(index);
		const targetDropdownLinkText = $targetDropdownLink.text();
		$parent.find(".dropdown-toggle").text(targetDropdownLinkText);
	}

	$tabsToDropdown.each(function () {
		const $this = $(this);
		const $pills = $this.find('a[data-toggle="pill"]');

		generateDropdownMarkup($this);

		const $dropdown = $this.find(".dropdown");
		const $dropdownLinks = $this.find(".dropdown-menu a");

		$dropdown.on("show.bs.dropdown", showDropdownHandler);
		$dropdownLinks.on("click", clickHandler);
		$pills.on("shown.bs.tab", shownTabsHandler);
	});


	$('.phone-js').inputmask('+7(999) 999-9999');




	let ok = false;
	window.addEventListener('scroll', function () {
		if (ok === false) {
			ok = true;
			setTimeout(() => {
				let script = document.createElement('script');
				script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Aa8436c678e792c8db94c7bf776a7cfb69690f32018f8aef8dd720953a5ea8ec3&amp;lang=ru_RU&amp;scroll=true';
				document.getElementById('yamap').replaceWith(script);
			}, 1000)
		}
	});

	document.querySelector('.scroll-outside').fakeScroll({
		track: "smooth"
	});
});