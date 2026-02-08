import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: REACT_APP_GROQ_API_KEY,
    dangerouslyAllowBrowser: true // Client-side usage for demo
});

const RECIPE_SCHEMA = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        ingredients: {
            type: "array",
            items: { type: "string" }
        },
        instructions: {
            type: "array",
            items: { type: "string" }
        },
        nutrition: {
            type: "object",
            properties: {
                calories: { type: "integer" },
                protein: { type: "string" },
                carbs: { type: "string" },
                fat: { type: "string" }
            },
            required: ["calories", "protein", "carbs", "fat"]
        },
        difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
        time: { type: "string" },
        cuisine: { type: "string" }
    },
    required: ["title", "description", "ingredients", "instructions", "nutrition", "difficulty", "time", "cuisine"]
};

export async function getRecipeFromGroq(ingredientsArr, cuisine, difficulty, time) {
    const ingredientsString = ingredientsArr.join(", ");
    const prompt = `Create a ${cuisine || "any"} recipe using: ${ingredientsString}. 
    Difficulty: ${difficulty || "any"}. 
    Max Time: ${time || "any"}.
    Return ONLY valid JSON passing the schema.`;

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a professional chef. Return a recipe in JSON format.
                    JSON Schema: ${JSON.stringify(RECIPE_SCHEMA)}`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            response_format: { type: "json_object" }
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (err) {
        console.error("AI Error:", err);
        throw err;
    }
}

export async function getIngredientSuggestions() {
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Suggest 5 random distinct ingredients for a delicious meal. Return JSON: { ingredients: string[] }"
                }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });
        return JSON.parse(completion.choices[0].message.content).ingredients;
    } catch (err) {
        console.error("Suggestion Error:", err);
        return ["Chicken", "Pasta", "Tomatoes", "Basil", "Garlic"]; // Fallback
    }
}
