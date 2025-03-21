import { useState } from "react";

const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 }
  ];

function ProductList() {   
    
    const [addedProducts, setAddedProducts] = useState([])

    function addToCart(p) {
        setAddedProducts(cartProd => {
            const isAdded = cartProd.some(currProd => currProd.name === p.name);
            if(!isAdded) {
                return [...cartProd, {...p, quantity: 1}];
            } else {
                return cartProd;
            };
        });
    };

    return (
        <div>
            <section>
                <h2>PRODOTTI</h2>
                {products.map((p, i) => (
                    <div key={i}>
                        <h3>{p.name}</h3>
                        <p>prezzo: {p.price}</p>
                        <button onClick={() => addToCart(p)}>Aggiungi al carrello</button>
                    </div>
                ))}
            </section>

            <section>
                <h2>CARRELLO</h2>
                {addedProducts.map((addP, i) => (
                    <div key={i}>
                        <h5>{addP.name}</h5>
                        <p>prezzo: {addP.price}</p>
                        <p>quantita: {addP.quantity}</p>
                    </div>
                ))}
            </section>
        </div>
    )
}

export default ProductList;