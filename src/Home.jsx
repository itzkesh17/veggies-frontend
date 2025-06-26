import Feedback from "@/Components/Feedback/Feedback.jsx"
import Footer from "@/Components/Footer/Footer.jsx"
import Hero from "@/Components/Hero/Hero.jsx"
import Menu from "@/Components/Menu/Menu.jsx"
import Navbar from "@/Components/Navbar/Navbar.jsx"
import Subscribe from "@/Components/NewsLetter/Subscribe.jsx"
import Products from "@/Components/Products/Products.jsx"


const Home = () =>{

    return(
        <>
            <Navbar />
            <Hero />
            <Menu />
            <Products />
            <Feedback />
            <Subscribe />
            <Footer />
        </>
    )
}

export default Home