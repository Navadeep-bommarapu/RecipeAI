import React, { forwardRef } from 'react';

const IngredientsList = forwardRef((props, ref) => {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    return (
        <section className="ingredients-section">
            <h2>Pantry</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length > 2 && <div className="get-recipe-container">
                <div ref={ref}>
                    <h3>Ready?</h3>
                    <p>Generate a recipe from your list.</p>
                </div>
                <button onClick={props.getRecipe} disabled={props.loading}>
                    {props.loading ? "Generating..." : "Get a recipe"}
                </button>
            </div>}
        </section>
    )
});

export default IngredientsList;