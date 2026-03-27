import Swal from 'sweetalert2';

const PokedexAlert = Swal.mixin({
  background: '#e0e8e8',
  color: '#3b2417',
  fontFamily: '"Press Start 2P", cursive',
  confirmButtonColor: '#ff1f1f',
  cancelButtonColor: '#3b2417',
  customClass: {
    popup: 'swal-retro-border',
    title: 'swal-title-size',
    confirmButton: 'press-start-font',
    cancelButton: 'press-start-font'
  }
});

export const notifySuccess = (title, text) => {
  PokedexAlert.fire({
    icon: 'success',
    title: title.toUpperCase(),
    text: text.toUpperCase(),
    timer: 2000,
    showConfirmButton: false,
  });
};

export const notifyError = (title, text) => {
  PokedexAlert.fire({
    icon: 'error',
    title: title.toUpperCase(),
    text: text.toUpperCase(),
    confirmButtonText: 'ENTENDIDO',
  });
};

export const confirmDelete = async (id) => {
  const result = await PokedexAlert.fire({
    title: '¿ELIMINAR?',
    text: `VAS A BORRAR EL REGISTRO #${id}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'SÍ, BORRAR',
    cancelButtonText: 'ABORTAR'
  });
  
  return result.isConfirmed;
};
