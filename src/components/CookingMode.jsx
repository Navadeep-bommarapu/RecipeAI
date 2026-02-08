import React, { useState } from 'react';

export default function CookingMode({ recipe, onClose }) {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < recipe.instructions.length - 1) {
            setCurrentStep(s => s + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(s => s - 1);
        }
    };

    return (
        <div className="cooking-mode-overlay">
            <div className="cooking-container">
                <div className="cooking-header">
                    <h3>Cooking: {recipe.title}</h3>
                    <button onClick={onClose} className="close-btn">Exit Cooking Mode</button>
                </div>

                <div className="step-display">
                    <span className="step-counter">Step {currentStep + 1} of {recipe.instructions.length}</span>
                    <p className="step-text big-text">{recipe.instructions[currentStep]}</p>
                </div>

                <div className="step-controls">
                    <button onClick={prevStep} disabled={currentStep === 0} className="control-btn secondary">
                        ← Previous
                    </button>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${((currentStep + 1) / recipe.instructions.length) * 100}%` }}
                        ></div>
                    </div>
                    <button onClick={nextStep} disabled={currentStep === recipe.instructions.length - 1} className="control-btn primary">
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}
