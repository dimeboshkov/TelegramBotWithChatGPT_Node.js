const { Configuration, OpenAIApi } = require("openai");
const { Telegraf } = require('telegraf')
require('dotenv').config()

const bot = new Telegraf("5948449419:AAEvvQWr7HUnEMagkIO-ARym3ImJ1PPBaPM")

bot.start((ctx) => {
  ctx.reply('Welcome to my ChatGPT bot! Send me a message and I will generate a response for you.')
})

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

ctx = "";

bot.on('message', async (ctx) => {
  try {

    async function runCompletion() {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: ctx.message.text,
        max_tokens: 3500,
        temperature: 0.9,
      });
      const user = ctx.from.first_name;
      console.log(`User ${user} says: ${ctx.message.text}\n`);

      console.log(completion.data.choices[0].text);
      console.log('____________________________________________________\n \n')
      ctx.reply(completion.data.choices[0].text)

    }

    runCompletion();

  } catch (error) {
    console.log(error)
  }
})

bot.launch()
