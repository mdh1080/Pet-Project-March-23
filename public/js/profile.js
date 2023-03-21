const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#postpet-name').value.trim();
    const needed_funding = document.querySelector('#postpet-funding').value.trim();
    const description = document.querySelector('#postpet-desc').value.trim();
  
    if (name && needed_funding && description) {
      const response = await fetch(`/api/postpets`, {
        method: 'POST',
        body: JSON.stringify({ name, needed_funding, description }),
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
  