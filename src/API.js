export function fetchEvents() {
  return fetch('https://tasty-treats-backend.p.goit.global/api/events')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}
