const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAPI_KEY,
});

const openai = new OpenAIApi(configuration);

exports.grammerCorrection = async (message) => {
  try {
    const prompt = `Please correct this to standard English: ${message.text}`;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0.5,
      max_tokens: 1000,
      //   top_p: 1.0,
      //   frequency_penalty: 0.0,
      //   presence_penalty: 0.0,
    });
    return completion.data.choices[0].text;
  } catch (error) {
    console.log(error);
    return "Some Error Occured Please Try Again...!!";
  }
};
