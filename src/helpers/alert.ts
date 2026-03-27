import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

const PokedexAlert = Swal.mixin({
  background: '#e0e8e8',
  color: '#3b2417',
  confirmButtonColor: '#ff1f1f',
  cancelButtonColor: '#3b2417',
  customClass: {
    popup: 'swal-retro-border',
    title: 'swal-title-size',
    confirmButton: 'press-start-font',
    cancelButton: 'press-start-font'
  }
});

export const notifySuccess = (title: string, text: string): void => {
  PokedexAlert.fire({
    icon: 'success',
    title: title.toUpperCase(),
    text: text.toUpperCase(),
    timer: 2000,
    showConfirmButton: false,
  });
};

export const notifyError = (title: string, text: string): void => {
  PokedexAlert.fire({
    icon: 'error',
    title: title.toUpperCase(),
    text: text.toUpperCase(),
    confirmButtonText: 'ENTENDIDO',
  });  
};  

export const confirmDelete = async (id: string | number): Promise<boolean> => {
  const result: SweetAlertResult = await PokedexAlert.fire({
    title: '¿ELIMINAR?',
    text: `VAS A BORRAR EL REGISTRO #${id}`,
    icon: 'warning' as SweetAlertIcon,
    showCancelButton: true,
    confirmButtonText: 'SÍ, BORRAR',
    cancelButtonText: 'ABORTAR'
  });
  
  return result.isConfirmed;
};
