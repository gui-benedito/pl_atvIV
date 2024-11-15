import Button from 'react-bootstrap/Button'

export default function Buttons(props: any) {
    return(
        <Button variant="outline-dark" href={props.rota}>{props.texto}</Button>
    )
}