$(document).ready(function(){


	// jQuery - Авто калькулятор
	var modelSpecs,
		modelPrice,
		modelSpecsHolder,
		modelPriceHolder,
		modelPriceUSDHolder;

	modelSpecsHolder = $('#modelSpecs');
	modelPriceHolder = $('#modelPrice');
	modelPriceUSDHolder = $('#modelPriceUSD');

	modelSpecs = '';
	modelPrice = 0;


	    // Получаем курс валют
    var currencyUrl = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3'
    var uanUsdRate = 0;


    $.ajax({
    	url: currencyUrl,
    	cache: false,
    	success: function(html){
    		console.log(html[2].buy);
    		uanUsdRate = html[2].buy;
    		calculateUSD();
    	}
    });

    function calculateUSD(){
    	var modelPriceUSD = modelPrice / uanUsdRate;
    	// alert(modelPriceUSD);
    	modelPriceUSDHolder.text('$ ' + prettify(modelPriceUSD.toFixed(0)));

    };
	function compileSpecs(){
			modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text();
			modelSpecs = modelSpecs + ', ' + $('input[name=transmission]:checked + label', '#autoForm').text();
			modelSpecs = modelSpecs + ', ' + $('input[name=package]:checked + label', '#autoForm').text() + '.';
			// alert(modelSpecs);
			modelSpecsHolder.text(modelSpecs);
		}


	function calculatePrice(){
		var modelPriceEngine = $('input[name=engine]:checked', '#autoForm').val();
		var modelPriceTransmission = $('input[name=transmission]:checked', '#autoForm').val();
		var modelPricePackage = $('input[name=package]:checked', '#autoForm').val();

		modelPriceEngine = parseInt(modelPriceEngine);
		modelPriceTransmission = parseInt(modelPriceTransmission);
		modelPricePackage = parseInt(modelPricePackage);

		modelPrice = modelPriceEngine + modelPriceTransmission + modelPricePackage;
		// alert(modelPrice); 
		modelPriceHolder.text( prettify(modelPrice) + ' грн.');

	};


	// После переключения радио кнопки
	$('#autoForm').on('change', function(){
		compileSpecs();
		calculatePrice();
		calculateUSD();

	});


	// При старте страницы 
	calculatePrice();
	compileSpecs();

	// Выбор цвета	
	$('#colorSelector .colorItem').on('click', function(){
		var imgPath = $(this).attr('data-img-path');
		$('#imgHolder img').attr('src', imgPath);
	});


	function prettify(num) {
            var n = num.toString();
            return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
        }






});
