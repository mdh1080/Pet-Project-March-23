const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#postpet-title').value.trim();
    const date = document.querySelector('#postpet-date_created').value.trim();
    const description = document.querySelector('#postpet-desc').value.trim();
    // const image = document.querySelector('#postpet-image').value.trim();
    // const contact = document.querySelector('#postpet-user_id').value.trim();
  
    if (title && date && description) {
      const response = await fetch(`/api/postpets`, {
        method: 'POST',
        body: JSON.stringify({ title, date, description}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create post');
      }
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
  