// para solicitudes HTTP
const request = require('request');

// para poder usar funcionaes similares a JQuery
const cheerio = require('cheerio');

// la dirección donde se va a buscar
//var baseURL = 'http://www.homeovet.com.ar/';
var baseURL = 'https://www.google.com.ar/';
//var baseURL = 'https://www.youtube.com/';

/*
function callback_e(err, res, body) {
	if (err) { return console.log(err); }
	console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
  	console.log('body:', body); // Print the HTML for the Google homepage.
}

request(baseURL, callback_e);
*/

request(
	baseURL, 
	function (error, response, html) {
		// verifico que no haya errores y la conexion fue exitosa
		if (!error && response.statusCode == 200) {
			// carga el html para poder usar jquery
		    var $ = cheerio.load(html);
		    
		    // cantidad de elementos que tienen un atributo href (dirección)
		    console.log("Cantidad de URLs: " + $('[href]').length);

		    var pos_slash = baseURL.indexOf("//");

		    console.log("URL: " + baseURL);
		    console.log("Posición de //: " + pos_slash);

		    // seleeciona todos los elementos que tengan como atributo href
		    // e itero por cada elemento
		    $('[href]').each(
		    	function(i, element){
		    		//console.log(i);
		    		//console.log(element);

					/*
					var a = $(this).prev();
					if (a.attr("href") != undefined) {
						//console.log(a.text());
						console.log(a.attr("href"));	
					}
					*/

					// obtengo el valor del atributo href, es decir, la URL
					var hrefValue = $(this).attr('href');

					// verifico que el valor devuelto este definido
					if (hrefValue != undefined) {

						// a continuación vamos a verificar que es una URL relativa

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

/*
request('https://www.google.com.ar', (err, res, body) => {
	        if (err) { return console.log(err); }
	        console.log(body);
});
*/
