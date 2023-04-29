const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#postpet-title').value.trim();
  // const date = document.querySelector('#postpet-date_created').value.trim();
  const description = document.querySelector('#postpet-desc').value.trim();
  // const image = document.querySelector('#postpet-image').value.trim();
  const phone = document.querySelector('#postpet-phone').value.trim();
  const [image] = document.querySelector('#imageUpload').files;
  // const contact = document.querySelector('#postpet-user_id').value.trim();

  // make a post request to create a new pet and get postId
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('phone', phone); 
  formData.append('image', image);
  // const postRespons = await fetch(`/api/postpets`, {title,description},{method:'POST'});

  if (title && description && phone && image) {
    fetch(`/api/postpets`, {
      method: 'POST',
      body: formData, // contents to be uploaded over multipart-request
    })
      .then((res) => res.json())
      .then((res) => {
        window.location.reload(); //refresh th page
        console.log(res); //log the response
      })
      .catch((err) => {
        console.log(err); //log the error
        alert('Failed to create post'); //alert the user
      });
  }
};

const editButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');  
    const response = await fetch(`/api/postpets/${id}`, {
      method: 'PUT',
      body: formData,
    })
    .then((res) => res.json())
    .then((res) => {
      window.location.reload(); //refresh th page
      console.log(res); //log the response
    })
    .catch((err) => {
      console.log(err); //log the error
      alert('Failed to edit post'); //alert the user
    });

    // if (response.ok) {
    //   document.location.replace('/profile');
    // } else {
    //   alert('Failed to edit post');
    // }
  }
};


const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/postpets/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.new-postpet-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.postpet-list')
  .addEventListener('click', delButtonHandler);

document
  .querySelector('.edit-postpet-form')
  .addEventListener('submit', editButtonHandler);
