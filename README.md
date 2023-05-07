# Teste Técnico - Dev Internship Tarken - João Victor Sampaio

Tasks:

1.  Count the number of Stars
2.  Count the number of Meteors
3.  If the Meteors are falling perpendicularly to the Ground (Water level), count how many will fall on the Water
4.  (optional) Find the phrase that is hidden in the dots in the sky.

# Utilizando o programa
Para utilizar o código no navegador, é necessário criar um servidor local usando um `http-server`, que pode ser instalado através do `npm`. Uma vez instalado, basta iniciar o servidor no diretório onde o arquivo `index.html` está localizado e acessá-lo no navegador através do endereço fornecido pelo servidor.
# Como resolvi o desafio

Utilizei de HTML, CSS e Javascript para solucionar o problema.
-   | Count
--------- | ------
Number of Stars | 315
Number of Meteors | 328
Meteors falling on the Water | 105
Hidden Phrase (optional) | n/a


## Criando um canvas

Um dos principais recursos do canvas é a capacidade de manipular pixels individualmente, exatamente o que eu precisava para o desafio. Então, utilizei-me disso para desenhar a imagem nele e poder contar cada pixel existente na imagem.

~~~javascript
let imgPath = 'meteor_challenge_01.png'; 
let img = new Image(); 
img.src = imgPath; 
img.crossOrigin = "Anonymous"; 
img.onload = function() { // aqui ele inicia o código apenas quando a imagem for carregada
let canvas = document.createElement('canvas'); 
canva.drawImage(img, 0, 0);
~~~

## Contando as estrelas e meteoros

Defini as variáveis Stars, Meteors e MeteorsFall. Depois, percorri cada pixel da imagem nas posições X e Y utilizando de um laço de repetição e verificando se o pixel selecionado tem a cor branca ou vermelha. Se for branca, ele incrementa um na variável Star, se for Vermelho incrementa um na variável meteors.

~~~javascript
let  stars  =  0;
let  meteors  =  0;
let  meteorsFall  =  0;
for (let  y  =  0; y  <  canvas.height; y++) {
	for (let  x  =  0; x  <  canvas.width; x++) {
		let  image  =  canva.getImageData(x, y, 1, 1).data;
		if (image[0] ===  255  &&  image[1] ===  255  &&  image[2] ===  255) { // se for branco puro, soma um a variável stars
			stars++;
		}
		else  if (image[0] ===  255  &&  image[1] ===  0  &&  image[2] ===  0) { // se for vermelho, adiciona a posição do pixel no array meteorPosition
			meteors++;
		}	
~~~

## Meteoro caindo perpendicular a água

Já para descobrir quais meteoros estão perpendiculares a água, pensei na ideia de criar um array para armazenar as posições X dos meteoros, já que apenas o X do pixel me interessa para saber se ele irá se chocar com a água, que deve estar no mesmo ponto cartesiano X do meteoro, mudando apenas o Y. E após isso, criei um Set para armazenar as posições X dos pixels de água, inicialmente, tinha criado um Array para as posições de água também, mas notei que precisava de apenas um pixel de água para ocorrer o "choque" entre o meteoro e a água e um array comum iria repetir as posições X da água e mudei para um Set, que não permite valores repetidos dentro dele. Então, ao encontrar um pixel vermelho, ele adiciona a posição no array MeteorsPosition e se encontrar um pixel azul, ele adiciona a posição no array WaterPosition, tudo dentro do mesmo laço de repetição da tarefa anterior.

~~~javascript 
let  waterPosition  =  new  Set();
let  meteorPosition  = [];
// laço abaixo é o mesmo da questão anterior, com incrementos
for (let  y  =  0; y  <  canvas.height; y++) {
	for (let  x  =  0; x  <  canvas.width; x++) {
	let  image  =  canva.getImageData(x, y, 1, 1).data;
	if (image[0] === 255 && image[1] === 0 && image[2] === 0) { 
		meteors++; 
		meteorPosition.push(x);
	} else if (image[0] === 0 && image[1] === 0 && image[2] === 255){
		waterPosition.add(x);
		}
~~~
Já para fazer a verificação do array e do set, já que se existir o mesmo valor dentro do array e set, é porque eles irão se chocar se eu continuar aumentando o valor do Y do meteoro, utilizei um outro laço para percorrer o array com as posições dos meteoros e verifica se aquela mesma posição existe no Set com as posições da água.
~~~javascript
for (let  i  =  0; i  <  meteorPosition.length; i++) {
	if (waterPosition.has(meteorPosition[i])) {
		meteorsFall++;
	}
}
~~~
## Find the phrase

Para tentar encontrar a frase, tentei aplicar filtros de saturação, brilho e contraste utilizando alguns dos seguintes códigos:

~~~javascript
canva.filter = 'saturate(50%)';
canva.filter = 'brightness(150%)'; 
canva.filter = 'contrast(200%)';
// mostrando a nova imagem no HTML
let novaImagem = document.createElement('img');
novaImagem.src = canva.toDataURL();
document.body.appendChild(novaImagem);
~~~
Como não consegui identificar a imagem, tentei aplicar outras cores aos pixels selecionados nas questões anteriores, mudando todos para verde ou branco na intenção de localizar a frase, fazendo a seguinte alteração no código:
~~~javascript
// verificação do pixel
if (image[0] ===  255  &&  image[1] ===  255  &&  image[2] ===  255) { 
	canva.fillStyle = "rgb(0, 255, 0)"; 
	canva.fillRect(x, y, 1, 1);
	}
let data = canva.getImageData(0, 0, canvas.width, canvas.height).data; // Criando um novo objeto ImageData com os pixels modificados 
let newData = new  ImageData(data, canvas.width, canvas.height); 
canva.putImageData(newData, 0, 0); // Substituindo a imagem original pela imagem com os pixels modificados
~~~
Após exibir essa nova imagem com o pixel modificado, não consegui localizar a frase escondida.
Por falta de conhecimentos necessários, não consegui localizar a frase.