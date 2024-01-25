// Lenis Scroll

if (Webflow.env ("editor") === undefined) {
const lenis = new Lenis({
	lerp: 0.1,
  infinite: false,
	duratiom: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 0.7,
  touchInertiaMultiplier: 35,
  touchMultiplier: 0.7
})

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

}

// Form Interactions

$(document).ready(function () {

    $('.select-wrapper').each(function () {

        // Variables (enter classes here)
        const selectButton = $('.select-button');
        const selectList = $('.select-list');
        const selectOptions = $('.select-option');
        const ctaButtons = $('.plan-cta');
        const popupContainer = $('.popup-container');
        
        const inputPlan = $('#input-plan');
				const inputName = $('#input-name');
  			const inputPhone = $('#input-phone');
				const outputPlan = $('#output-plan');
				const outputName = $('#output-name');
				const outputPhone = $('#output-phone');

				// Prevent page scroll for mobile menu
				$('.burger-menu').on('click', function() {
        		$('body').toggleClass('no-scroll');
        })
        
        $('.nav-block-mobile a').on('click', function() {
        		$('.burger-menu').click();
        })
        
        // Menu button action
        $('#menu-btn, #menu-btn-mobile').on('click', function() {
        	popupContainer.css('display', 'flex').hide().fadeIn(200);
        });
        
        // Pre-selection interactions + adding value to hidden input
        ctaButtons.each(function () {
            $(this).on('click', function() {
              //$('body').addClass('no-scroll');
              selectButton.text($(this).data('value'));
              inputPlan.val($(this).data('value'));
              outputPlan.text(inputPlan.val());
              popupContainer.css('display', 'flex').hide().fadeIn(200);
            });
        });
        
        // Opening-closing select options list
        selectButton.on('click', function(e) {
        		e.preventDefault();
            $('#step1-h2').addClass('hidden');
            selectButton.addClass('hidden');
            $('#label-name').addClass('hidden');
            inputName.addClass('hidden');
            $('#label-phone').addClass('hidden');
            inputPhone.addClass('hidden');
            $('#form-checkbox').addClass('hidden');
            $('#form-next-btn').addClass('hidden');
            $('#select-list-h2').removeClass('hidden');
            selectList.removeClass('hidden');
            $('.popup-window').animate({height: '560px'}, 400)
        });

        // Option list selection interactions + adding value to hidden input
        selectOptions.each(function () {
            $(this).on('click', function(e) {
              e.stopPropagation();
              e.preventDefault();
              selectButton.text($(this).text());
              inputPlan.val($(this).data('value'));
              outputPlan.text(inputPlan.val());
              selectList.addClass('hidden');
              $('#select-list-h2').addClass('hidden');
              $('#step1-h2').removeClass('hidden');
              selectButton.removeClass('hidden');
              $('#label-name').removeClass('hidden');
              inputName.removeClass('hidden');
              $('#label-phone').removeClass('hidden');
              inputPhone.removeClass('hidden');
              $('#form-checkbox').removeClass('hidden');
              $('#form-next-btn').removeClass('hidden');
              $('.popup-window').animate({height: '722px'}, 400)
            });
        });
        
        // Transfering values from inputs Name and Phone to outputs
        inputName.on('change', function() {
        		outputName.text(inputName.val());
        });
        
        inputPhone.on('change', function() {
        		outputPhone.text(inputPhone.val());
        });
        
        // Pop-up closing buttong interaction
        $('.popup-close-btn, .popup-background').on('click', function() {
  					popupContainer.fadeOut(200);
            $('body').removeClass('no-scroll');
            selectList.addClass('hidden');
            $('#select-list-h2').addClass('hidden');
            $('#step1-h2').removeClass('hidden');
            selectButton.removeClass('hidden');
            $('#label-name').removeClass('hidden');
            inputName.removeClass('hidden');
            $('#label-phone').removeClass('hidden');
            inputPhone.removeClass('hidden');
            $('#form-checkbox').removeClass('hidden');
            $('#form-next-btn').removeClass('hidden');
            $('.popup-window').animate({height: '722px'}, 400)
  			});
             
        // Next button interaction
        $('#form-next-btn').on('click', function(e) {
        	if (inputPlan.val() == '') {alert('Please, choose your plan');}
          else if (inputName.val() == '') {alert('Please, enter your name');}
          else if (inputPhone.val() == '') {alert('Please, enter your phone number');}
          else if (!$("#form-checkbox > div").hasClass("w--redirected-checked")) {alert('Please, check our terms of service');} 
          else {
          $('.form-step-1').addClass('hidden');
  				$('.form-step-2').removeClass('hidden');
          }
				});
        
        // Back button interaction
        $('#form-back-btn').on('click', function() {
  				$('.form-step-1').removeClass('hidden');
  				$('.form-step-2').addClass('hidden');
				});
        
        // Prevent form submission on Step 1
    		$('form').submit(function(e) {
        	if ($('.form-step-2').hasClass('hidden')) {
            e.preventDefault(); // Prevents form submission
            alert('Please fill out the required fields and press Next.');
        	}
          
    		});
        
        // Submit button click
        $('#submit-btn').on('click', function() {
        	$('.popup-window').css('height', 'auto')
        });
        
        // Done button
        $('#form-btn-done').on('click', function() {
					$('.popup-close-btn').click();
        });
    });

});