/*
 * Se concidera enlaces relativos a los que empiezan con "/""
 * Se concidera enlaces absolutos a cualquiera que empiece con "http:"" o "https:"
 */

// modulo para hacer consultas HTTP (GET, POST, PUT)
const request = require('request');

// modulo para hacer busquedas en un documento HTML (similar a JQuery)
const cheerio = require('cheerio');

// URL base en la cual se comienza a buscar enlaces relativos y absolutos
//var baseURL = 'http://www.homeovet.com.ar/';
var baseURL = 'https://www.google.com.ar/';
//var baseURL = 'https://www.youtube.com/';

function webCrawler(baseURL, deep, indentation) {
	request(
		baseURL, 
		function (error, response, html) {

			// imprimo la URL base
			console.log(indentation + "URL: " + baseURL);

			// verifico que no haya errores y que la conexion a baseURL fue exitosa
			if (!error && response.statusCode == 200) {
				console.log(indentation + "Conexión exitosa: HTTP Response " + response.statusCode);
				// variable donde se va a almacenar el valor de un atributo href (el enlace)
				var hrefValue = undefined;

				// la URL relativa para cada elemento
				var relativeURL;

				// carga el html de la página devuelta en baseURL
			    var $ = cheerio.load(html);
			    
			    // imprimo la cantidad de enlaces
			    console.log(indentation + "Cantidad de enlaces (absolutos y relativos): " + $('[href]').length);

			    // seleeciona todos los elementos que tengan como atributo href (enlace)
			    // e itero por cada elemento
			    $('[href]').each(
			    	function(i, element){

						// obtengo el valor del atributo href, es decir, la URL
						hrefValue = $(this).attr('href');

						// verifico que el valor devuelto este definido
						if (hrefValue != undefined) {

							if (hrefValue.indexOf('/', 0) == 0) {
								console.log(indentation + "\tEnlace " + (i + 1) + " - relativo: " + hrefValue);

								// esto hay que probarlo, puede que no sea tan simple
								relativeURL = baseURL + hrefValue.slice(1);
								if (deep == true) {
									webCrawler(relativeURL, false, (indentation + "\t"));
								}

							} else {
								console.log(indentation + "\tEnlace " + (i + 1) + " - absoluto: " + hrefValue);
							}
						}
			    	}
			    );
			    console.log("\n");
		  	} else {
		  		console.log(indentation + "Conexión fallida: HTTP Response " + response.statusCode);
		  	}
		}
	);
}

webCrawler(baseURL, true, "");

/*
function callback_e(err, res, body) {
	if (err) { return console.log(err); }
	console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
  	console.log('body:', body); // Print the HTML for the Google homepage.
}

request(baseURL, callback_e);
*/

/*
request(
	baseURL, 
	function (error, response, html) {
		// verifico que no haya errores y que la conexion a baseURL fue exitosa
		if (!error && response.statusCode == 200) {
			//
			var hrefValue = undefined;

			// carga el html de la página devuelta en baseURL
		    var $ = cheerio.load(html);
		    
		    // imprimo la URL base
		    console.log("URL: " + baseURL);
		    // imprimo la cantidad de enlaces
		    console.log("Cantidad de enlaces: " + $('[href]').length);

		    // seleeciona todos los elementos que tengan como atributo href (enlace)
		    // e itero por cada elemento
		    $('[href]').each(
		    	function(i, element){

					// obtengo el valor del atributo href, es decir, la URL
					hrefValue = $(this).attr('href');

					// verifico que el valor devuelto este definido
					if (hrefValue != undefined) {

						if (hrefValue.indexOf('/', 0) == 0) {
							console.log(i + " - relativo: " + hrefValue);
						} else {
							console.log(i + " - absoluto: " + hrefValue);
						}

						// primero corrobora si la URL-base es parte de esta URL
						if (hrefValue.indexOf(baseURL) != -1) {
							console.log(i, hrefValue);
						} 
						
						// si no es parte, entonces se fija si la URL comienza con /
						else if (hrefValue.indexOf('/') == 0) {

							if ()
							hrefValue = baseURL.concat(hrefValue);

							console.log(i, baseURL.concat(hrefValue));
						}
					}
					
		    	}
		    );
		    
		    
		    //console.log($("[href]").attr("href"));
	  	}
	}
);
*/
/*
request('https://www.google.com.ar', (err, res, body) => {
	        if (err) { return console.log(err); }
	        console.log(body);
});
*/
