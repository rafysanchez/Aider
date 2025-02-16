

document.getElementById('previewButton').addEventListener('click', function() {
    const messageDiv = document.getElementById('message');
    const audio = new Audio();
    
    // Check if the mp3 URL is available
    if (messageDiv.innerHTML.includes('Download MP3')) {
        const mp3Url = messageDiv.querySelector('a').href; // Get the mp3 URL from the link
        audio.src = mp3Url;
        audio.play();
        messageDiv.innerText = 'Playing the preview...';
    } else {
        messageDiv.innerText = 'Please convert a file first.';
    }
});

document.getElementById('downloadButton').addEventListener('click', function() {
    const messageDiv = document.getElementById('message');
    
    // Check if the mp3 URL is available
    if (messageDiv.innerHTML.includes('Download MP3')) {
        const downloadLink = messageDiv.querySelector('a');
        downloadLink.click(); // Trigger the download
    } else {
        alert('Please convert a file first to download.');
    }
});


document.getElementById('convertButton2').addEventListener('click', async function() {
    const fileInput = document.getElementById('fileInput2');
    const messageDiv = document.getElementById('message');

    if (fileInput.files.length === 0) {
        messageDiv.innerText = 'Please select an MP4 file.';
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function(event) {
        const mp4Data = event.target.result;
        const mp4ArrayBuffer = new Uint8Array(mp4Data);
        
        // Load FFmpeg
        const ffmpeg = createFFmpeg({ log: true });
        await ffmpeg.load();
        
        // Write the MP4 file to FFmpeg's virtual file system
        ffmpeg.FS('writeFile', 'input.mp4', mp4ArrayBuffer);
        
        // Run the conversion
        await ffmpeg.run('-i', 'input.mp4', 'output.mp3');
        
        // Read the converted MP3 file
        const mp3Data = ffmpeg.FS('readFile', 'output.mp3');
        const mp3Blob = new Blob([mp3Data.buffer], { type: 'audio/mp3' });
        const mp3Url = URL.createObjectURL(mp3Blob);
        
        messageDiv.innerHTML = `<a href="${mp3Url}" download="${file.name.replace('.mp4', '.mp3')}">Download MP3</a>`;
    };

    reader.readAsArrayBuffer(file);
});