// calling error modal
export default function (context, error) {
  let errText = 'Неизвестная ошибка.';

  if (error.response) {
    errText = error.response.data.message ? error.response.data.message :
      error.response.data;
  } else {
    errText = error.message;
  }

  context.$Progress.fail();
  context.$modal.show('response', { message: errText });
}
