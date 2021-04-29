// Customização do lightbox

lightbox.option({
    albumLabel: 'Foto %1 de %2' ,
    fadeDuration: '1000'
});

// inicialização do pluguin AOS animation

AOS.init();


//Comportamento da seta sobe
//Quando ocorre rolagem na tela do navegador
$(window).scroll(function(){
    //SE A ROLAGEM FOR MAIOR OU IGUAL A 550
    //MOSTRA A SETA COM FADE
    //CASO CONTRÁRIO, OCULTA A SETA COM FADE
    if($(window).scrollTop() >= 550)
    {
        $('.seta-sobe').fadeIn();
    }else{
        $('.seta-sobe').fadeOut();
    }
    
});
$('.seta-sobe').click(function(){
    // aplica animação de rolagem no body,html no topo
    $('body, html').animate({
       scrollTop: 0
       
    });
});

//Rolagem com animação nos links superiores
$('.rolagem').click(function(){
    //posição vertical do item clicado
    var id = $(this).attr('href');
    var destino = $(id).offset().top;
    $('html, body').animate({
        scrollTop: destino,
    });
});

//codigos para o furmulario
//o texto de txt-idade é o valor do campo de idade
 $('#txt-idade').text($('#idade').val());
//    |--QUALQUER INSTRUÇÃO DECLARADA FORA DE EVENTO É PROCESSADA UMA ÚNICA VEZ QUANDO A PÁGINA É CARREGADA

//evento atualiaçao do campo de idade

$('#idade').change(function(){
    $('#txt-idade').text($('#idade').val());
});


//validação de formulario

(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Pega todos os formulários que nós queremos aplicar estilos de validação Bootstrap personalizados.
      var forms = document.getElementsByClassName('needs-validation');
      // Faz um loop neles e evita o envio
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
  
 //preencha a lista de estados com API do IBGE quando a pagina for carregada 
 $.ajax({
  url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
  success: function(dados){
    var tag = '';
    //laço de repetiçao executal repetidamente ate o final
    for (let i = 0; i < dados.length; i++) {
      tag += '<option value="'+dados[i].id+'">' + dados[i].nome + '</option>';
      // += pede pra tag acumular
    }
    //preenche a lista #estados com a variável tag
    $('#estados').html(tag);
  },
  error: function(msg){
    alert('Não foi possível carregar. Tente mais tarde.');
  }
 });

 //atualizar cidades quando um estado é selecionado
 $('#estados').change(function(){
   var uf = $(this).val();
   var link = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+uf+'/municipios';
   
   $.ajax({
    url: link,
    success: function(dados){
      var tag = '';
      //laço de repetiçao executal repetidamente ate o final
      for (let i = 0; i < dados.length; i++) {
        tag += '<option value="'+dados[i].id+'">' + dados[i].nome + '</option>';
        // += pede pra tag acumular
      }
      //preenche a lista #estados com a variável tag
      $('#cidades').html(tag);
    },
    error: function(msg){
      alert('Não foi possível carregar. Tente mais tarde.');
    }
   });

 });