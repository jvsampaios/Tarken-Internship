let imgPath = 'meteor_challenge_01.png';
      let img = new Image();
      img.src = imgPath;
      img.crossOrigin = "Anonymous";
      img.onload = function() {
      let canvas = document.createElement('canvas'); // desenha nossa imagem em um canva
      canvas.width = img.width; // define o tamanho do canvas para o tamanho da imagem
      canvas.height = img.height;
      let canva = canvas.getContext('2d'); // define o contexto do canvas para 2d
      canva.drawImage(img, 0, 0);

      let stars = 0;      
      let meteors = 0;
      let waterPosition = new Set();
      let meteorsFall = 0;
      let meteorPosition = [];
      // percorre o canvas e verifica a cor de cada pixel

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          let image = canva.getImageData(x, y, 1, 1).data;
          if (image[0] === 255 && image[1] === 255 && image[2] === 255) { // se for branco puro, soma um a variável stars
            stars++;
          }
          else if (image[0] === 255 && image[1] === 0 && image[2] === 0) { // se for vermelho, adiciona a posição do pixel no array meteorPosition
            meteors++;
            meteorPosition.push(x);
          }
          else if (image[0] === 0 && image[1] === 0 && image[2] === 255) { // se for azul, adiciona a posição do pixel no array waterPosition
            waterPosition.add(x);
           }
        }
      }


      for (let i = 0; i < meteorPosition.length; i++) {
        if (waterPosition.has(meteorPosition[i])) {
          meteorsFall++;
        }
      }

      console.log('Number of Stars:', stars);
      console.log('Number of Meteors:', meteors);
      console.log('Meteors Fall:', meteorsFall);
      const calcularBtn = document.getElementById("resultado");
      const starsInput = document.getElementById("estrelas");
      const meteorsInput = document.getElementById("meteoros");
      const meteorsFallInput = document.getElementById("meteorsFalling");
      
      calcularBtn.addEventListener("click", function() {
        starsInput.value = stars;
        meteorsInput.value = meteors;
        meteorsFallInput.value = meteorsFall;
      });

    };