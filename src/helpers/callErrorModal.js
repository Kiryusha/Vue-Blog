// calling error modal
export default function (context, error) {
  context.$Progress.fail();

  const errText = error.response ?
    error.response.data.message : error.message;
  context.$modal.show('response', { message: errText });
}
