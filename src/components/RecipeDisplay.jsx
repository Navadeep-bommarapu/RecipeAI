import React from 'react';

export default function RecipeDisplay({ recipe, onSave, isSaved }) {

    return (
        <section className="recipe-display" aria-live="polite">
            <div className="recipe-header">
                <h2>{recipe.title}</h2>
                <button
                    onClick={onSave}
                    className={`save-btn ${isSaved ? 'saved' : ''}`}
                    aria-label={isSaved ? "Unsave recipe" : "Save recipe"}
                >
                    {isSaved ? "★ Saved" : "☆ Save"}
                </button>
            </div>

            <div className="recipe-meta">
                <span className="badge">{recipe.cuisine}</span>
                <span className="badge">{recipe.difficulty}</span>
                <span className="badge">⏱ {recipe.time}</span>
            </div>

            <p className="recipe-description">{recipe.description}</p>

            <div className="nutrition-card">
                <h3>Nutrition (Estimated)</h3>
                <div className="nutrition-grid">
                    <div className="nutri-item">
                        <span className="value">{recipe.nutrition.calories}</span>
                        <span className="label">Kcal</span>
                    </div>
                    <div className="nutri-item">
                        <span className="value">{recipe.nutrition.protein}</span>
                        <span className="label">Protein</span>
                    </div>
                    <div className="nutri-item">
                        <span className="value">{recipe.nutrition.carbs}</span>
                        <span className="label">Carbs</span>
                    </div>
                    <div className="nutri-item">
                        <span className="value">{recipe.nutrition.fat}</span>
                        <span className="label">Fat</span>
                    </div>
                </div>
            </div>

            <div className="recipe-content">
                <div className="ingredients-column">
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                    </ul>
                </div>

                <div className="instructions-column">
                    <h3>Instructions</h3>
                    <ol>
                        {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
                    </ol>
                </div>
            </div>
        </section>
    );
}
