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
        const addedProduct = addedProducts.find(currProd => currProd.name === p.name);
        if(addedProduct) {
            updateProductQuantity(addedProduct.name, addedProduct.quantity + 1);
            return;
        }
        setAddedProducts(kartProd => {
            return [...kartProd, {...p, quantity: 1}];
        });
    };

    function updateProductQuantity(name, quantity) {
        if(quantity < 1 || isNaN(quantity)) {
            return;
        }

        setAddedProducts(kartProd => 
            kartProd.map(currProd => {
    
                if (currProd.name === name) {
                    return { ...currProd, quantity};
                };
    
                return currProd;
            })
        );
    };

    function removeFromCart(i) {
        // scorre l'array del carrello e mi ritorna un array con tutti gli elementi con indice diverso da quello passato
        setAddedProducts(kartProd => kartProd.filter((currProd, index) => index !== i));
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
                <div className="lista-carrello">
                    {addedProducts.map((addP, i) => (
                        <div key={i}>
                            <h5>{addP.name}</h5>
                            <p>prezzo: {addP.price}</p>
                            <div>
                                <label>quantita: </label>
                                <input 
                                    type="number" 
                                    value={addP.quantity} 
                                    onChange={(event) => updateProductQuantity(addP.name, parseInt(event.target.value))}
                                />
                            </div>
                            <button onClick={() => removeFromCart(i)}>Rimuovi al carrello</button>
                        </div>
                    ))}
                </div>
                <div>
                    <p>
                        <strong>Totale da pagare: </strong>
                        {addedProducts.reduce((acc, a) => (
                            acc + (a.price * a.quantity)
                        ), 0).toFixed(2)}
                    </p>
                </div>
            </section>
        </div>
    )
}

export default ProductList;