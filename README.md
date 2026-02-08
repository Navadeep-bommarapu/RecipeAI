# RecipeAI 🍳🤖

RecipeAI is a smart, AI-powered recipe generator that turns your available ingredients into delicious meals. Built with **React** and **Groq AI (Llama 3.3)**, it offers a premium cooking experience in a responsive **3-column dashboard layout**.

![RecipeAI Demo](./public/screenshot.png) *(Add a screenshot here)*

## ✨ Features

-   **AI Chef**: Generates unique recipes based on your ingredients using the powerful **Llama 3.3** model.
-   **Smart Pantry**: 
    -   Add multiple ingredients at once (separated by spaces or commas). 
    -   Example: `tomato pasta garlic` adds all three instantly.
    -   **Ingredient Suggestions**: Stuck? Let AI suggest random ingredients for you.
-   **Recipe History**: Automatically saves your recent recipes to `localStorage` so you never lose them.
-   **Customize Your Meal**:
    -   **Cuisine**: Choose from Indian, Italian, Chinese, Mexican, and more.
    -   **Difficulty**: set to Easy, Medium, or Hard.
    -   **Time**: Filter recipes by cooking time (Under 15m, 30m, 1hr).
-   **Step-by-Step Instructions**: Clear, easy-to-follow cooking steps.
-   **Nutrition Facts**: AI-estimated calories, protein, carbs, and fat for every meal.
-   **Premium Design**: Modern Glassmorphism UI with smooth animations.

## 🚀 Getting Started

### Prerequisites

-   Node.js installed.
-   A **Groq API Key** (Get one for free at [console.groq.com](https://console.groq.com)).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Navadeep-bommarapu/RecipeAI.git
    cd RecipeAI
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    -   Create a `.env` file in the root directory.
    -   Add your API key:
        ```
        REACT_APP_GROQ_API_KEY=your_gsk_api_key_here
        ```

4.  **Run the App**:
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🛠️ Built With

-   **React 19** - Frontend Framework
-   **Groq SDK** - Ultra-fast AI Inference
-   **Llama 3.3** - LLM Model
-   **CSS3** - Custom variables & animations

## 📦 Deployment

Ready to deploy to Vercel?

1.  Push code to GitHub.
2.  Import project in Vercel.
3.  **IMPORTANT**: Add `REACT_APP_GROQ_API_KEY` in Vercel's **Environment Variables** settings.

---

