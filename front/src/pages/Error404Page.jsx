import Nav from '../components/nav'
import Footer from '../components/Footer'
import '../styles/error404.css'

const error404Page = () => {
    return (
        <>
        <Nav />
        <div className='contenedor-error'>
            <h1>404</h1>
            <p>Página no encontrada</p>
        </div>
        <Footer />
        </>
    )
}

export default error404Page;