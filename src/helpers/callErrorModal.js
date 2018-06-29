// calling error modal
export default function (context, error) {
  const errText = error.response ?
    error.response.data.message : error.message;
  context.$modal.show('response', { message: errText });
  context.$Progress.fail();
}
