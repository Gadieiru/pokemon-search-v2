const playAudio = (fileName) => {
  const audio = new Audio(`/sounds/${fileName}.mp3`);
  
  audio.volume = 0.3;
  audio.play().catch(error => {
    if (error.name === 'NotAllowedError') {
       console.warn("Haz clic en la pantalla primero para activar el sonido.");
    } else {
       console.error("Error al cargar el audio:", fileName, error);
    }
  });
};

export const sounds = {
  playSelect: () => playAudio('select'),
  playSuccess: () => playAudio('success'),
  playError: () => playAudio('error'),
  playDelete: () => playAudio('delete'),
}