$(function () {
    let intervalo = null;//recebe o objeto setInterval()
    let bola = 0;//conta as bolas criadas
    let contador = 0;//conta as bolas estouradas
    let time = 0;//tempo do setInterval
    let rest = 10;//conta o restante das bolas
    let dif = 1200 //dificuldade - tempo de permanência da bola
    
    //Configurar o jogo
    $('#iniciar').on('click', function(e){
        rest = parseInt($('#qtdBolas').val());
        dif = parseInt($('input[name="nivel"]:checked').val());
        $('#placar').html(contador);
        $('#restante').html(rest-bola);
        $('h3').text('Nível: '+$('input[name="nivel"]:checked').attr('id'));
        $('.mensagem').remove();
        $('.config').slideUp();
        $('.placar').slideDown();
    });
    //Reconfigurar o jogos
    $('#reconfigurar').on('click', function(e){
        bola=0;                
        $('.placar').slideUp();
        $('.config').slideDown();
    });

    //Inicia o Jogo
    $('#comecar').on('click', function () {
        contador = 0;
        bola = 0; 
        time = Math.floor(Math.random() * 1000 + dif); 
        $('#reconfigurar').attr('disabled',true);
        $('.mensagem').remove();
        $('#restante').html(rest-bola);
        $('#placar').html(contador);
        runIntervalo(time);       
    });

    //reinicia o setInterval de acordo com o time aleatório
    function runIntervalo(time){
        if(intervalo){
            clearInterval(intervalo);
        }
        intervalo = setInterval(function () {
            $('#restante').html(rest-bola);
            criaBola();
        },time);
    }
    
    //cria a bola com cor e local aleatórios
    function criaBola() {
        let posX = Math.floor(Math.random() * 471);
        let posY = Math.floor(Math.random() * 471); 
        bola++;     
        time = Math.floor(Math.random() * 1000 + dif);  
        if (bola <= rest) {            
            $('.area').html('<div class="bola"></div>');
            $('.bola').css('left', posX).css('top', posY);
            $('.bola').css('backgroundColor', 'rgb('+cor()+')');
            //Verifica o click em cima da bola
            $('.bola').on('click', function () {
                contador++;
                $('#placar').html(contador);
                $('#restante').html(rest-bola);
                $('.bola').hide();                
                runIntervalo(time);
            });
            runIntervalo(time);
        } else {
            clearInterval(intervalo);
            $('.bola').hide();
            $('#reconfigurar').attr('disabled',false);
            $('#reconfigurar').after(mensagem());
        }
    }

    //Escolha aleatória da cor da bola rgb(r,g,b)'
    function cor() {
        let rgb = Math.floor(Math.random() * 256) +','+Math.floor(Math.random() * 256)+','+Math.floor(Math.random() * 256)
        //evitar que a bola tenha a mesma cor do fundo
        if(rgb == '204,204,204'){
            cor();
        }        
        return rgb;
    }

    //mensagem no final da partida
    /*
        Excelente - azul 100
        Ótimo - verde 80~99
        Bom - preto 60~79
        Treine mais - amarelo 40~59
        ruim - laranja 20~39
        péssimo - vermelho 00~19    
    */
   function mensagem(){
        let res = Math.round(((contador/rest)*100));
        let men = '';
        if( res == 100){
            men = "<div class='mensagem' style='color:blue' >EXCELENTE! Acertou "+res+" %</div>";
        }
        if( res >= 80 && res <=99){
            men = "<div class='mensagem' style='color:green' >Ótimo! Acertou "+res+" %</div>";
        }
        if( res >= 60  && res <=79){
            men = "<div class='mensagem' style='color:black' >Bom! Acertou "+res+" %</div>";
        }
        if( res >= 40  && res <=59){
            men = "<div class='mensagem' style='color:yellow' >Treine mais. Acertou "+res+" %</div>";
        }
        if( res >= 20  && res <=39){
            men = "<div class='mensagem' style='color:orange' >Treine mais. Acertou "+res+" %</div>";
        }
        if( res >= 0  && res <=19){
            men = "<div class='mensagem' style='color:red' >Péssimo. Acertou "+res+" %</div>";
        }
        return men;
   }
});

