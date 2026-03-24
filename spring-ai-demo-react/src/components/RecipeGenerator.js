import React, { useState } from "react";

function RecipeGenerator() {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [dietaryRestrictions, setDietaryRestrictions] = useState('');
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

    const createRecipe = async () => {
        if (!ingredients.trim()) return;
        setLoading(true);
        setRecipe('');
        try {
            const res = await fetch(
                `${API_URL}/recipe-creator?ingredients=${encodeURIComponent(ingredients)}&dietaryRestrictions=${encodeURIComponent(dietaryRestrictions)}&cuisine=${encodeURIComponent(cuisine || 'any')}`
            );
            const data = await res.text();
            setRecipe(data);
        } catch (error) {
            setRecipe('Something went wrong. Please check your connection and try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <p className="section-title">Recipe Generator</p>
            <p className="section-subtitle">Enter your ingredients and we will put together a recipe for you</p>

            <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Ingredients — e.g. chicken, garlic, lemon"
            />
            <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                placeholder="Cuisine type — e.g. Italian, Indian (optional)"
            />
            <input
                type="text"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder="Dietary restrictions — e.g. vegan, gluten-free (optional)"
            />

            <button className="btn-block" onClick={createRecipe} disabled={loading}>
                {loading ? 'Creating your recipe...' : 'Create Recipe'}
            </button>

            {!recipe && !loading && (
                <div className="empty-state">
                    Your recipe will appear here
                </div>
            )}

            {loading && (
                <p className="status-text">Writing your recipe...</p>
            )}

            {recipe && (
                <div className="recipe-box">
                    <pre>{recipe}</pre>
                </div>
            )}
        </div>
    );
}

export default RecipeGenerator;
