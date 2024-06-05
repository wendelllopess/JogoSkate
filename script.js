const skatista = document.querySelector('.skatista');
const bloco = document.querySelector('.bloco');

//funcao para fazer com que o skatista pule 
const pulo = () => {
    //ira adicionar a classe do css que contem a animacao para o skatista pular 
    skatista.classList.add('pulo'); 

    //ira remover e reiniciar a classe para fazer ele pular novamente, depois de um rapido tempo 
    setTimeout(()=>{
        skatista.classList.remove('pulo')
    },500)
}

// funcao que ira fazer um loop rodando o jogo e verificar se perdeu ou nao 
const loop = setInterval( ()=>{

    //selecionar as posicoes dos blocos e do skatista
    const posicaoBloco = bloco.offsetLeft
    // aqui alem de selecionar ele aceessar os estilos ja criado do skatista atraves do "getComputedStyle", e tambem vai tranforma os numeros,
    // que por padrao vem em string por causa da propriedade, e tranforma em numeros permitindo cauculos.
    const posicacoSkatista = +window.getComputedStyle(skatista).bottom.replace('px', '');

   console.log(posicacoSkatista)

    //verifica se o bloco esta chegando perto do skatista e para o bloco na posicao da colisao 
   // e tambem verifica se o skatista pulou e se foi maior que o tamano do bloco

    if(posicaoBloco <= 160 && posicaoBloco > 0 && posicacoSkatista <110){
        bloco.style.animation = 'none';
        bloco.style.left = `${posicaoBloco}px`;

        skatista.style.animation = 'none';
        skatista.style.bottom = `${posicacoSkatista}px`;

        //adicionar uma imagem de gamer over quando ouver a colisao
        skatista.src = 'assents/game-over.png';
        skatista.style.width = '80px';
        skatista.style.marginLeft = '40px';

        //ira para a funcao do loop quando perder, e nao deixar que o jogo rodando mesmo quadandon der game over
        clearInterval(loop);
    }

    

},16)



document.addEventListener('keydown', pulo);
