export default function cleanErrorStack(err) {
  const name = err.name === undefined ? 'Error' : String(err.name);
  const msg = err.message === undefined ? '' : String(err.message);

  if (name === '') {
    err.stack = msg;
  } else if (msg === '') {
    err.stack = name;
  } else if (!err.stack) {
    err.stack = `${name}: ${msg}`;
  }

  return err;
}
