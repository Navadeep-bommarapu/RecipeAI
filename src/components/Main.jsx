import React, { useState, useEffect, useRef } from "react"
import IngredientsList from "./IngredientsList"
import RecipeDisplay from "./RecipeDisplay"
import RecipeHistory from "./RecipeHistory"
import { getRecipeFromGroq, getIngredientSuggestions } from "../ai"

export default function Main() {
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(false)

    // Preferences
    const [cuisine, setCuisine] = useState("")
    const [difficulty, setDifficulty] = useState("")
    const [time, setTime] = useState("")

    // History & Saved
    const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("recipe_history")) || [])
    const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("saved_recipes")) || [])

    const recipeSection = useRef(null)

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem("recipe_history", JSON.stringify(history))
        localStorage.setItem("saved_recipes", JSON.stringify(saved))
    }, [history, saved])

    // Scroll to recipe
    useEffect(() => {
        if (recipe && recipeSection.current) {
            recipeSection.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [recipe])

    async function getRecipe() {
        setLoading(true)
        try {
            const recipeData = await getRecipeFromGroq(ingredients, cuisine, difficulty, time)
            setRecipe(recipeData)
            setHistory(prev => [recipeData, ...prev].slice(0, 10)) // Keep last 10
        } catch (error) {
            console.error(error)
            alert("Failed to generate recipe. Please try again.")
        }
        setLoading(false)
    }

    async function getSuggestions() {
        setLoading(true)
        const suggestions = await getIngredientSuggestions()
        setIngredients(suggestions)
        setLoading(false)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        if (newIngredient) {
            // Split by space or comma, trim whitespace, and filter empty strings
            const ingredientsToAdd = newIngredient
                .split(/[ ,]+/) // Split by space or comma
                .map(i => i.trim())
                .filter(i => i.length > 0);

            setIngredients(prev => [...prev, ...ingredientsToAdd])
        }
    }

    function toggleSaveRecipe() {
        if (saved.find(r => r.title === recipe.title)) {
            setSaved(prev => prev.filter(r => r.title !== recipe.title))
        } else {
            setSaved(prev => [...prev, recipe])
        }
    }

    return (
        <main className="app-main">
            <div className="left-panel">
                <h3>Pantry & Ingredients</h3>
                <form action={addIngredient} className="add-ingredient-form">
                    <input
                        type="text"
                        placeholder="e.g. oregano"
                        aria-label="Add ingredient"
                        name="ingredient"
                    />
                    <button>Add</button>
                </form>

                {ingredients.length === 0 && (
                    <div className="suggestions-box">
                        <p>No ingredients? Let AI suggest some!</p>
                        <button onClick={getSuggestions} disabled={loading} className="suggestion-btn">
                            {loading ? "Thinking..." : "Suggest Ingredients"}
                        </button>
                    </div>
                )}

                {ingredients.length > 0 &&
                    <IngredientsList
                        ingredients={ingredients}
                        getRecipe={getRecipe}
                        ref={recipeSection}
                        loading={loading}
                    />
                }
            </div>

            <div className="center-panel" ref={recipeSection}>
                {loading && <div className="loading-spinner">Cooking up something delicious... 🍳</div>}

                {!loading && recipe && (
                    <RecipeDisplay
                        recipe={recipe}
                        onSave={toggleSaveRecipe}
                        isSaved={!!saved.find(r => r.title === recipe.title)}
                    />
                )}

                {!loading && !recipe && (
                    <div className="placeholder-recipe">
                        <h2>Your Personal AI Chef</h2>
                        <p>Add ingredients on the left, customize on the right, and your recipe will appear here!</p>
                    </div>
                )}
            </div>

            <div className="right-panel">
                <div className="preferences-panel">
                    <h3>Customize</h3>
                    <select value={cuisine} onChange={e => setCuisine(e.target.value)}>
                        <option value="">Any Cuisine</option>
                        <option value="Indian">Indian</option>
                        <option value="Italian">Italian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Mediterranean">Mediterranean</option>
                    </select>

                    <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                        <option value="">Any Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                    <select value={time} onChange={e => setTime(e.target.value)}>
                        <option value="">Any Time</option>
                        <option value="15 min">Under 15 min</option>
                        <option value="30 min">Under 30 min</option>
                        <option value="60 min">Under 1 hour</option>
                    </select>
                </div>

                <RecipeHistory
                    history={history}
                    saved={saved}
                    onSelect={setRecipe}
                    onClearHistory={() => setHistory([])}
                />
            </div>
        </main>
    )
}