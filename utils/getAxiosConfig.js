export const getAxiosConfig = (text) => {
  let data = JSON.stringify({
    messages: [
      {
        content: text,
        role: "user",
      },
    ],
    model: "deepseek-chat",
    frequency_penalty: 0,
    max_tokens: 2048,
    presence_penalty: 0,
    stop: null,
    stream: false,
    temperature: 1,
    top_p: 1,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.DEEPSEEK,
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + process.env.KEY,
    },
    data: data,
  };
  return config;
};
