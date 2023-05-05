const axios = require('axios');

// POST a new chat and get response from bot
axios.post('http://localhost:4000/chats/answer', {
    message: 'yelyel',
    useKMP: false
  })
  .then(response => console.log(response.data))
  .catch(error => console.log(error));

// axios.post('http://localhost:4000/knowledge', {
//     question: 'yelyel',
//     answer: ''
//   })
//   .then(response => console.log(response.data))
//   .catch(error => console.log(error));
