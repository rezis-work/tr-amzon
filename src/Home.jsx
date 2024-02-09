import { useEffect, useState } from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  const [moreproducts, setMoreProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      // Check if data has already been fetched
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setMoreProducts(data.products);
    }
    getProducts();
  }, []);
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://m.media-amazon.com/images/I/61CiqVTRBEL._SX3000_.jpg"
          alt="Banner image"
        />

        <div className="home__row">
          <Product
            id="323234444444"
            title="Jabra Evolve2 65 Flex Wireless Stereo Headset - Bluetooth, Noise-Cancelling ClearVoice Technology & Hybrid ANC - Certified for Microsoft Teams - Black"
            price={29.99}
            image="https://m.media-amazon.com/images/I/618OFIFJ8IL._AC_UL320_.jpg"
            rating={5}
          />
          <Product
            id="32432332423"
            title="OtterBox iPhone 15 Premium Glass, antimicrobial, anti-scratch protection, shatter Resistant, crystal clarity (ships in polybag)"
            price={29.99}
            image="https://m.media-amazon.com/images/I/61wBMWcelNL._AC_UL320_.jpg"
            rating={5}
          />
        </div>

        <div className="home__row">
          <Product
            id="32434232222"
            title="iOttie Auto Sense 2 Dash & Windshield Car Phone Holder with Qi Wireless Charging - Auto Clamping Phone Mount & Charger for Google Pixel, iPhone, Galaxy, Huawei, LG. Power Adapter Not Included."
            price={29.99}
            image="https://m.media-amazon.com/images/I/61lUh3J8ySL._AC_UL320_.jpg"
            rating={5}
          />
          <Product
            id="234243232"
            title="Fitbit Inspire 3 Health &-Fitness-Tracker with Stress Management, Workout Intensity, Sleep Tracking, 24/7 Heart Rate and more, Morning Glow/Black, One Size (S & L Bands Included)"
            price={29.99}
            image="https://m.media-amazon.com/images/I/61Eyp16MspL._AC_UL320_.jpg"
            rating={5}
          />
          <Product
            id="3234432322"
            title="Tile Mate 1-Pack. Black. Bluetooth Tracker, Keys Finder and Item Locator for Keys, Bags and More; Up to 250 ft. Range. Water-Resistant. Phone Finder. iOS and Android Compatible."
            price={29.99}
            image="https://m.media-amazon.com/images/I/4161BoDqu3L._AC_UL320_.jpg"
            rating={5}
          />
        </div>

        <div className="home__row">
          <Product
            id="3243243242"
            title="Sony WH-CH720N Noise Canceling Wireless Headphones Bluetooth Over The Ear Headset with Microphone and Alexa Built-in, Black New"
            price={29.99}
            image="https://m.media-amazon.com/images/I/51rpbVmi9XL._AC_UL320_.jpg"
            rating={5}
          />
        </div>

        {moreproducts?.map((product) => (
          <div key={product.id} className="home__row">
            <Product
              id={product.id}
              title={product.description}
              price={product.price}
              image={product.images[0]}
              rating={Math.floor(product.rating)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
