import { useNavigate } from 'react-router-dom'
import './productCss.scss'
import ProductCard from './ProductCard'
import { FaLocationArrow } from "react-icons/fa";

import tomato from '../../assets/tomo.png'
import potato from '../../assets/potato.png'
import ginger from '../../assets/ginger.png'
import mushroom from '../../assets/mushroom.png'
import eggPlant from '../../assets/eggplant.png'
import onion from '../../assets/onion.png'
import ladiesFinger from '../../assets/ladiesfinger.png'
import snakeGaurd from '../../assets/snakegaurd.png'
import sweetPotato from '../../assets/sweetpotato.png'
import drumStick from '../../assets/drumstick.png'
import ridge from '../../assets/ridge.png'
import beet from '../../assets/beet.png'
import garlic from '../../assets/garlic.png'
import cauliflower from '../../assets/cauliflower.png'
import greenBeans from '../../assets/greenbeans.png'
import corn from '../../assets/corn.png'
import radish from '../../assets/radish.png'
import jalapeno from '../../assets/jalapeno.png'
import carrot from '../../assets/carrot.png'
import pumpkin from '../../assets/pumpkin.png'
import redPaper from '../../assets/redpepper.png'
import bananaFlower from '../../assets/bananaflower.png'
import cabbage from '../../assets/cabbageveggie.png'
import peas from '../../assets/peas.png'

const Products = ({ showAll = false, searchedProduct = '' }) => {

      const productsCard = [
      { id: 1, image: tomato,        title: "Tomato",        price: 45 },
      { id: 2, image: potato,        title: "Potato",        price: 38 },
      { id: 3, image: mushroom,      title: "Mushroom",      price: 50 },
      { id: 4, image: onion,         title: "Onion",         price: 30 },
      { id: 5, image: ginger,        title: "Ginger",        price: 20 },
      { id: 6, image: eggPlant,      title: "EggPlant",      price: 25 },
      { id: 7, image: ladiesFinger,  title: "LadiesFinger",  price: 42 },
      { id: 8, image: snakeGaurd,    title: "SnakeGaurd",    price: 34 }
    ];

      const productAllCard = [
      { id: 9,  image: sweetPotato,   title: "SweetPotato",   price: 58 },
      { id: 10, image: drumStick,     title: "DrumStick",     price: 32 },
      { id: 11, image: ridge,         title: "RidgeGourd",    price: 44 },
      { id: 12, image: beet,          title: "Beetroot",      price: 35 },
      { id: 13, image: garlic,        title: "Garlic",        price: 70 },
      { id: 14, image: cauliflower,   title: "Cauliflower",   price: 48 },
      { id: 15, image: greenBeans,    title: "Beans",         price: 56 },
      { id: 16, image: corn,          title: "Corn",          price: 28 },
      { id: 17, image: radish,        title: "Radish",        price: 25 },
      { id: 18, image: jalapeno,      title: "Jalapeno",      price: 52 },
      { id: 19, image: carrot,        title: "Carrot",        price: 38 },
      { id: 20, image: pumpkin,       title: "Pumpkin",       price: 40 },
      { id: 21, image: redPaper,      title: "RedPepper",     price: 62 },
      { id: 22, image: bananaFlower,  title: "BananaFlower",  price: 80 },
      { id: 23, image: cabbage,       title: "Cabbage",       price: 33 },
      { id: 24, image: peas,          title: "Peas",          price: 45 }
    ];

  const navigate = useNavigate();
  const listOfProducts = showAll ? [...productsCard, ...productAllCard] : productsCard;
  const findProduct = searchedProduct.trim().toLowerCase();

  const sortedProduct = [...listOfProducts].sort((a, b) => {
    const productA = a.title.toLowerCase().includes(findProduct);
    const productB = b.title.toLowerCase().includes(findProduct);
    return productA - productB;
  });

  const filteredSortedProducts = findProduct
  ? sortedProduct.filter((veg) =>
      veg.title.toLowerCase().includes(findProduct)
    )
  : sortedProduct;

  return (
    <section id='products'>
    <div className="top-container2">
      {!showAll && <h2 className="title-of-component">Products</h2>}
      
      <div className="product-container">
        {filteredSortedProducts.length > 0 ? (
          filteredSortedProducts.map((veg) => (
            <ProductCard
              key={veg.id}
              id={veg.id}
              image={veg.image}
              title={veg.title}
              price={veg.price}
            />
          ))
        ) : (
          <p style={{ color: '#888' }}>No matching items found.</p>
        )}
      </div>

      {!showAll && (
        <div className="line-container">
          <hr className="line" />
          <p>Wanna See More Products to Shopify?</p>
          <button onClick={() => navigate("/products")}>See More</button>
          <FaLocationArrow className="arrow" />
        </div>
      )}
    </div>
    </section>
  );
};

export default Products;
