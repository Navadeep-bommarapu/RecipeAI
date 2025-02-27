import chefHat from "../images/chef-hat.png"

export default function Header(){
    return (
        <div className="header">
            <img src={chefHat} alt="chef-hat" />
            <p>RecipeAI</p>
        </div>
    )
}