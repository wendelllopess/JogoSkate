const skatista = document.querySelector('.skatista');
const cone = document.querySelector('.cone');

const contadorElement = document.getElementById('contador');
const jogo = document.querySelector('.jogo');

let contador = 0;
let passouCone = false;
let trocaDeCores = false;
// let velocidadeCone = 1.6;
// let proximoPontoDeVerificacao = 5;


skatista.style.bottom = '-20px';


//funcao para fazer com que o skatista pule 
const pulo = () => {
    //ira adicionar a classe do css que contem a animacao para o skatista pular 
    skatista.classList.add('pulo'); 

    //ira remover e reiniciar a classe para fazer ele pular novamente, depois de um rapido tempo 
    setTimeout(()=>{
        skatista.classList.remove('pulo')
    },500)
}

// // Função para ajustar a velocidade do cone no CSS
// const ajustarVelocidadeCone = () => {
//     if (velocidadeCone > 1.0) {
//         velocidadeCone -= 0.1 ; // Diminui o tempo de animação para aumentar a velocidade
//         cone.style.animationDuration = `${velocidadeCone}s`;
//     } 
// }

// funcao que ira fazer um loop rodando o jogo e verificar se perdeu ou nao 
const loop = setInterval( ()=>{

    //selecionar as posicoes dos blocos e do skatista
    const posicaoCone = cone.offsetLeft
    // aqui alem de selecionar ele aceessar os estilos ja criado do skatista atraves do "getComputedStyle", e tambem vai tranforma os numeros,
    // que por padrao vem em string por causa da propriedade, e tranforma em numeros permitindo cauculos.
    const posicacoSkatista = +window.getComputedStyle(skatista).bottom.replace('px', '');

   console.log(posicacoSkatista)

    //verifica se o cone esta chegando perto do skatista e para o cone na posicao da colisao 
   // e tambem verifica se o skatista pulou e se foi maior que o tamano do cone

    if(posicaoCone <= 120 && posicaoCone > 0 && posicacoSkatista <100){
        cone.style.animation = 'none';
        cone.style.left = `${posicaoCone}px`;

        skatista.style.animation = 'none';
        skatista.style.bottom = `${posicacoSkatista}px`;

        //adicionar uma imagem de gamer over quando ouver a colisao
        skatista.src = 'assents/game-over.png';
        skatista.style.width = '80px';
        skatista.style.marginLeft = '40px';

        //Exibe uma mensagem indicando para apertar uma tecla quando houver a colisao 
        const mensagemPerda = document.getElementById('mensagem-perda');
        mensagemPerda.style.display = 'block';

        //ira para a funcao do loop quando perder, e nao deixar que o jogo rodando mesmo quadandon der game over
        clearInterval(loop);
    } else if (posicaoCone < 0 && !passouCone) {
        contador++;
        contadorElement.textContent = contador;
        passouCone = true;
        trocarCorFundo(); // Chamar a função para trocar a cor do fundo

        // if (contador === proximoPontoDeVerificacao) {
        //     ajustarVelocidadeCone(); // Ajusta a velocidade
        //     proximoPontoDeVerificacao += 5; // Atualiza o próximo ponto de verificação
        // }
    } else if (posicaoCone > 160) {
        passouCone = false;
    }

},16)


document.addEventListener('keydown', pulo);

// Função para gerar uma cor RGB aleatória
const corAleatoria = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// funcao que ira fazer com que o jogo mude cor 
const trocarCorFundo = () => {
    if (contador >= 15 && contador < 20 && trocaDeCores) {
        jogo.style.backgroundColor = "black"; // Define a cor de fundo como vermelho
        clearInterval(intervalId); // Para de mudar a cor aleatória
    } else if (contador >= 10 && contador < 15 && !trocaDeCores) {
        trocaDeCores = true;
        intervalId = setInterval(() => {
            jogo.style.backgroundColor = corAleatoria();
        }, 1000); // Muda a cor a cada segundo
    } else if (contador >= 20) {
        intervalId = setInterval(() => {
            jogo.style.backgroundColor = corAleatoria();
        }, 1000); // Volta a mudar a cor a cada segundo
    }
}




function recarregar(){
   
    location.reload();
    
}


document.addEventListener("keydown", function(event){
    if (event.key === "r") {
        recarregar();
    }else if(event.key === "R"){
        recarregar();
    }
});

