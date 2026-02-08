import React from 'react';

export default function RecipeHistory({ history, saved, onSelect, onClearHistory }) {
    const [activeTab, setActiveTab] = React.useState('recent'); // 'recent' or 'saved'

    const list = activeTab === 'recent' ? history : saved;

    return (
        <aside className="recipe-history">
            <div className="history-tabs">
                <button
                    className={activeTab === 'recent' ? 'active' : ''}
                    onClick={() => setActiveTab('recent')}
                >
                    Recent
                </button>
                <button
                    className={activeTab === 'saved' ? 'active' : ''}
                    onClick={() => setActiveTab('saved')}
                >
                    Saved ({saved.length})
                </button>
            </div>

            <ul className="history-list">
                {list.length === 0 && <li className="empty-msg">No recipes yet.</li>}
                {list.map((item, index) => (
                    <li key={index} onClick={() => onSelect(item)} className="history-item">
                        <h4>{item.title}</h4>
                        <span className="small-meta">{item.cuisine} • {item.time}</span>
                    </li>
                ))}
            </ul>

            {activeTab === 'recent' && history.length > 0 &&
                <button onClick={onClearHistory} className="clear-link">Clear History</button>
            }
        </aside>
    );
}
