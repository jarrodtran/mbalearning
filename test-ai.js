const { streamText } = require('ai');
const { google } = require('@ai-sdk/google');
async function test() {
  const result = await streamText({
    model: google('models/gemini-2.5-flash'),
    prompt: 'hi'
  });
  console.log(Object.keys(Math.getPrototypeOf ? Object.getPrototypeOf(result) : result));
  console.log('toDataStreamResponse' in result);
}
test();
