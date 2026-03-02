import { ThemeToggle } from "../ui/ThemeSwitch";
import "./Header.css"

export default function Header() {
    return (
        <header>
            <h1>Expense Tracker</h1>
            <ThemeToggle />
        </header>
    );
}
