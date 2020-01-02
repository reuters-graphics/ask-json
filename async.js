const prompts = require('prompts');

const asyncFunc = async() => {
  const response = await prompts({
    type: 'number',
    name: 'value',
    message: 'How old are you?',
    validate: value => value < 18 ? 'Nightclub is 18+ only' : true,
  });

  console.log('Answered!');

  console.log(response); // => { value: 24 }
};

const runner = async() => {
  await asyncFunc();
  console.log('WAITS');
};

runner();
