import Button from "../Button";
import './style.css'

export default function Navbar() {
    return(
        <>
            <div className="navbar">
                <nav>
                    <Button rota ='/' texto='Início' />
                    <Button rota='/cliente/lista' texto='Clientes'/>
                </nav>
            </div>
        </>
    )
}