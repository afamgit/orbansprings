export const handleSubmit = (values) => {

    let formData = new FormData();

    formData.append('uname', values.username);
    formData.append('upass', values.password);
    formData.append('action', 'auth');

    return fetch(`http://localhost/orban/api/auth.php`, {
      method: 'post',
      body: formData
    })
      .then((res) => res.json())
      .then(async (res) => {
        console.log(res);

        if(res.status === 200) {
            return res.user
        }
      })
      .catch((error) => {
        console.log('Api call error', error.message);
      });
    }