document.addEventListener('DOMContentLoaded',function(){

    time = new Date();
    today = time.getDate() + '/' + (time.getMonth() + 1);
    hour = time.getHours();
    minute = time.getMinutes();
    entrada_msg = document.querySelector('.entrada-msg');
    entrada_msg.style.borderColor = '#736939';

    let i = 0;

    enviar = document.querySelector('.botao-enviar');
    enviar.addEventListener('click',function(){
        if (entrada_msg.value != ''){

            msg_nova = document.createElement('section');
            msg_nova.className = 'msg-usuario';

            titulo_novo = document.createElement('div');
            titulo_novo.className = 'msg-titulo';
            titulo_novo.innerHTML = '<h2>Você</h2><h3>' + today +'-'+ hour+':'+minute+ '</h3>';

            bolha_nova = document.createElement('div');
            bolha_nova.className = 'bolha-usuario';
            bolha_nova.innerHTML = '<p>'+entrada_msg.value+'</p>';


            msg_nova.appendChild(titulo_novo);
            msg_nova.appendChild(bolha_nova);
            document.querySelector('.msg-panel').appendChild(msg_nova);
            entrada_msg.value = '';
            i+=1;
        }
    });
})