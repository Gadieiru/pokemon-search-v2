type soundEffect = 'select' | 'success' | 'error' | 'delete';

const playAudio = (fileName: soundEffect) => {
  const audio = new Audio(`/sounds/${fileName}.mp3`);
  
  audio.volume = 0.3;
  audio.play().catch((error: Error) => {
    if (error.name === 'NotAllowedError') {
       console.warn("Autoplay bloqueado: Haz clic en la pantalla primero para activar el sonido.");
    } else {
       console.error(`Error al cargar el audio: ${fileName}`, error);
    }
  });
};

export const sounds = {
  playSelect: (): void => playAudio('select'),
  playSuccess: (): void => playAudio('success'),
  playError: (): void => playAudio('error'),
  playDelete: (): void => playAudio('delete'),
}