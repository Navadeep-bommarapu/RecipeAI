import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a command that a user gives and suggest for the answer. You don't need to go deeper into the topic. `

const apikey = process.env.REACT_APP_HF_ACCESS_TOKEN
const hf = new HfInference(apikey)
console.log(apikey)


export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Now you can add some ingredients into the list but not too many and give me the recipe with this ingredients.` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}
