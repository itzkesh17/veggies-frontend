import MenuCard from './MenuCard'
import './menuCss.scss'
import Marquee from 'react-fast-marquee'
import tomato from '../../assets/tomato.jpg'
import cabbage from '../../assets/cabbage.jpg'
import carrot from '../../assets/carrot.jpg'
import pumpkin from '../../assets/pumpkin.jpg'
import bananaflower from '../../assets/bananaflower.jpg'
import peppers from '../../assets/peppers.jpg'


const Menu = () => {

    const vegetables = [
        {image: tomato, title: 'tomato'},
        {image: cabbage, title: 'cabbage'},
        {image: carrot, title: 'carrot'},
        {image: pumpkin, title: 'pumpkin'},
        {image: bananaflower, title: 'banana flower'},
        {image: peppers, title: 'peppers'}
    ]

  return (
        <div className='top-container'>
             <h1 className='next-compo'>Our Top Fresh Veggies</h1>
             <div className="card-container">
                <Marquee play speed={60} loop={0} pauseOnHover={true} gradient={true} gradientWidth={50}>
                {
                    vegetables.map((veg,index) =>{
                        return <MenuCard key={index} image={veg.image} title={veg.title}/>
                    }) 
                }
                </Marquee>
             </div>
        </div>
  )
}

export default Menu