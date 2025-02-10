document.getElementById('nome').addEventListener('input', atualizarPreview);
document.getElementById('mensagem').addEventListener('input', atualizarPreview);
document.getElementById('youtube').addEventListener('input', atualizarPreview);
document.getElementById('fotos').addEventListener('change', atualizarPreview);
document.getElementById('sugestao-btn').addEventListener('click', gerarMensagemCarinhosa);
document.querySelectorAll('input[name="plano"]').forEach(el => el.addEventListener('change', toggleVideo));
document.getElementById('data_namoro').addEventListener('change', atualizarContador);

setInterval(atualizarContador, 1000);

function atualizarContador() {
    let dataNamoro = new Date(document.getElementById('data_namoro').value);
    if (isNaN(dataNamoro)) return;

    let agora = new Date();
    let diferencaMs = agora - dataNamoro;

    let segundos = Math.floor((diferencaMs / 1000) % 60);
    let minutos = Math.floor((diferencaMs / (1000 * 60)) % 60);
    let horas = Math.floor((diferencaMs / (1000 * 60 * 60)) % 24);
    let diasTotais = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));

    let anos = Math.floor(diasTotais / 365.25);
    let diasRestantes = diasTotais % 365.25;

    let meses = Math.floor(diasRestantes / 30.4375);
    let dias = Math.floor(diasRestantes % 30.4375);

    document.getElementById('contador-anos').innerText = anos;
    document.getElementById('contador-meses').innerText = meses;
    document.getElementById('contador-dias').innerText = dias;
    document.getElementById('contador-horas').innerText = horas;
    document.getElementById('contador-minutos').innerText = minutos;
    document.getElementById('contador-segundos').innerText = segundos;
}

async function atualizarPreview() {
    let nome = document.getElementById('nome').value.trim();
    let mensagem = document.getElementById('mensagem').value;
    let video = document.getElementById('youtube').value;

    let slug = nome.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-$/, '');
    document.getElementById('preview-slug').innerText = slug;
    document.getElementById('preview-titulo').innerText = nome;
    document.getElementById('preview-mensagem').innerText = mensagem;

    let previewSlideshow = document.getElementById('preview-slideshow');
    previewSlideshow.innerHTML = ""; // Limpa imagens anteriores

    let arquivos = document.getElementById('fotos').files;
    if (arquivos.length > 0) {
        let slideshowDiv = document.createElement('div');
        slideshowDiv.className = "slideshow-romantico";

        Array.from(arquivos).forEach((file, index) => {
            let reader = new FileReader();
            reader.onload = function(e) {
                let img = document.createElement('img');
                img.src = e.target.result;
                img.className = "preview-img-romantica";
                img.style.display = index === 0 ? "block" : "none"; 
                slideshowDiv.appendChild(img);
            };
            reader.readAsDataURL(file);
        });

        previewSlideshow.appendChild(slideshowDiv);

        let index = 0;
        setInterval(() => {
            let imagens = document.querySelectorAll('.preview-img-romantica');
            if (imagens.length > 0) {
                imagens.forEach(img => (img.style.display = "none"));
                imagens[index].style.display = "block";
                index = (index + 1) % imagens.length;
            }
        }, 3000);
    }

    atualizarMusica(video);
}

function atualizarMusica(video) {
    let previewMusica = document.getElementById('preview-musica');
    let musicaThumb = document.getElementById('musica-thumb');
    let playBtn = document.getElementById('play-btn');

    if (video.trim() !== "") {
        let videoIdMatch = video.match(/(?:v=|\/|youtu.be\/|embed\/|watch\?v=|&v=)([0-9A-Za-z_-]{11})/);
        if (videoIdMatch) {
            let videoId = videoIdMatch[1];

            // Atualiza a thumbnail da música
            musicaThumb.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            // Torna o player visível
            previewMusica.style.display = "block";

            // Define o evento de clique do botão Play
            playBtn.onclick = function () {
                tocarMusica(videoId);
            };
        }
    } else {
        // Se não houver vídeo, oculta a seção de música
        previewMusica.style.display = "none";
    }
}

function tocarMusica(videoId) {
    let previewMusica = document.getElementById('preview-musica');
    previewMusica.innerHTML = `
        <h3>Nossa música ❤️‍🩹</h3>
        <iframe width="100%" height="250px" 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
            frameborder="0" allowfullscreen>
        </iframe>`;
}

function gerarMensagemCarinhosa() {
    let mensagens = [
        "Você é o amor da minha vida! ❤️", "Cada momento ao seu lado é mágico ✨",
        "Nosso amor é como uma estrela, sempre brilhando 🌟", "Amar você é a melhor parte da minha vida 💕",
        "Você me faz querer ser melhor todos os dias 💖", "O amor que sinto por você é infinito ♾️",
        "A cada segundo, me apaixono mais por você 💓", "Você é meu lar, meu lugar favorito no mundo 🌎",
        "Te amo mais do que as palavras podem dizer ❤️", "Nosso amor é a coisa mais linda que já vivi 💕",
        "Com você, cada dia é um presente 🌟", "Minha vida é mais feliz com você ao meu lado 💖",
        "Nada no mundo se compara ao nosso amor 💏", "O melhor lugar do mundo é ao seu lado 🌎",
        "Você ilumina minha vida como o sol ilumina o dia ☀️", "Nosso amor cresce a cada dia que passa 🌹",
        "Te amo além das palavras, além do tempo 🕰️", "Com você, tudo faz sentido 💕",
        "Você é o meu sonho realizado ✨", "Nosso amor é eterno, como um sonho que nunca acaba ✨"
    ];

    let mensagemAleatoria = mensagens[Math.floor(Math.random() * mensagens.length)];

    document.getElementById('mensagem').value = mensagemAleatoria;
    document.getElementById('preview-mensagem').innerText = mensagemAleatoria;
}

function toggleVideo() {
    let planoSelecionado = document.querySelector('input[name="plano"]:checked').value;
    let campoVideo = document.getElementById('youtube');

    if (planoSelecionado === "1ano") {
        campoVideo.disabled = true;
        campoVideo.value = "";
        document.getElementById('preview-musica').style.display = "none";
    } else {
        campoVideo.disabled = false;
    }
}

function efeitoCoracoes() {
    setInterval(() => {
        let coracao = document.createElement("div");
        coracao.className = "coracao";
        coracao.innerText = "❤️‍🩹";
        coracao.style.left = Math.random() * 100 + "vw"; // Posição aleatória na largura da tela
        coracao.style.animationDuration = Math.random() * 5 + 5 + "s"; // Duração aleatória entre 5 e 10 segundos
        document.getElementById("coracoes-container").appendChild(coracao);

        setTimeout(() => {
            coracao.remove(); // Remove o coração após a animação
        }, 4000);
    }, 400);
}

// Ativar o efeito assim que a página carregar
efeitoCoracoes();

document.getElementById('criarPaginaBtn').addEventListener('click', function () {
    let nome = document.getElementById('nome').value.trim();
    let dataNamoro = document.getElementById('data_namoro').value;

    if (nome === "" || dataNamoro === "") {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    // Exibir o campo de e-mail para pagamento
    document.getElementById('emailPagamentoContainer').style.display = 'block';
});

document.getElementById('gerarPagamentoBtn').addEventListener('click', async function () {
    let email = document.getElementById('emailPagamento').value.trim();
    let nome = document.getElementById('nome').value.trim();
    let dataNamoro = document.getElementById('data_namoro').value;
    let plano = document.querySelector('input[name="plano"]:checked').value;
    let mensagem = document.getElementById('mensagem').value.trim();
    let youtube = document.getElementById('youtube').value.trim();

    // Verifica se o email foi preenchido
    if (email === "") {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    // Exibir status de pagamento
    document.getElementById('statusPagamento').style.display = 'block';
    document.getElementById('mensagemStatus').innerText = "Gerando pagamento...";

    try {
        let response = await fetch('processar_pagamento.php', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                nome: nome,
                data_namoro: dataNamoro,
                plano: plano,
                mensagem: mensagem,
                youtube: youtube
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        let data = await response.json();

        if (data.init_point) {
            window.location.href = data.init_point; // Redireciona para o checkout do Mercado Pago
        } else {
            document.getElementById('mensagemStatus').innerText = "Erro ao gerar pagamento.";
        }
    } catch (error) {
        console.error("Erro ao processar pagamento:", error);
        document.getElementById('mensagemStatus').innerText = "Erro ao conectar com o servidor.";
    }
});