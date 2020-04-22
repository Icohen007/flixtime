const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getParsedDate(releaseDate) {
  let parsedDate = '';
  try {
    const releseDateObj = new Date(releaseDate);
    parsedDate = `${months[releseDateObj.getMonth()]}, ${releseDateObj.getFullYear()}`;
  } catch (err) {
    console.log('date error', err);
    parsedDate = releaseDate;
  }
  return parsedDate;
}

export default getParsedDate;