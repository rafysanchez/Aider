const arquivoMP4 = document.getElementById('arquivoMP4');
const converterBtn = document.getElementById('converterBtn');
const progresso = document.getElementById('progresso');
const downloadLink = document.getElementById('downloadLink');

let ffmpeg;

async function inicializarFFmpeg() {
    ffmpeg = FFmpeg.createFFmpeg({ log: true });
    await ffmpeg.load();
    converterBtn.disabled = false;
}

inicializarFFmpeg();

arquivoMP4.addEventListener('change', () => {
    if (arquivoMP4.files.length > 0) {
        converterBtn.disabled = false;
    } else {
        converterBtn.disabled = true;
    }
});

converterBtn.addEventListener('click', async () => {
    const file = arquivoMP4.files[0];
    const nomeArquivo = file.name.split('.').slice(0, -1).join('.');

    progresso.innerHTML = 'Carregando arquivo...';
    ffmpeg.FS('writeFile', file.name, await FFmpeg.fetchFile(file));

    progresso.innerHTML = 'Convertendo...';
    await ffmpeg.run('-i', file.name, `${nomeArquivo}.mp3`);

    progresso.innerHTML = 'Finalizando...';
    const data = ffmpeg.FS('readFile', `${nomeArquivo}.mp3`);

    const blob = new Blob([data.buffer], { type: 'audio/mp3' });
    const url = window.URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = `${nomeArquivo}.mp3`;
    downloadLink.style.display = 'block';

    progresso.innerHTML = 'Conversão concluída!';
});