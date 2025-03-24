import { useReducer } from "react";

const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 }
];

function ProductList() {

    // BONUS 2 (corretto guardando correzione)
    const [addedProducts, dispatch] = useReducer(reducer, [])

    function reducer(addedProducts, action) {

        switch(action.type) {
            case "ADD_ITEM":
                const addedProduct = addedProducts.find(currProd => currProd.name === action.payload.name);
                    if(addedProduct) {
                        action.payload.quantity = addedProduct.quantity + 1;
                    } else {
                        return [...addedProducts, {...action.payload, quantity: 1}];
                    }

            case "UPDATE_QUANTITY":            
                if(action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
                    return addedProducts;
                }        
                return addedProducts.map(currProd => {
            
                        if (currProd.name === action.payload.name) {
                            return { ...currProd, quantity: action.payload.quantity};
                        };
            
                        return currProd;
                })

            case "REMOVE_ITEM":
                return addedProducts.filter((currProd, index) => index !== action.payload);
                
            default:
                return state;
        };
    };    

    return (
        <div>
            <section>
                <h2>PRODOTTI</h2>
                {products.map((p, i) => (
                    <div key={i}>
                        <h3>{p.name}</h3>
                        <p>prezzo: {p.price}</p>
                        <button onClick={() => dispatch({type: "ADD_ITEM", payload: p})}>Aggiungi al carrello</button>
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
                                    onChange={(event) => dispatch({
                                        type: "UPDATE_QUANTITY", 
                                        payload: {name: addP.name, quantity: parseInt(event.target.value)}
                                    })}
                                />
                            </div>
                            <button onClick={() => dispatch({type: "REMOVE_ITEM", payload: i})}>Rimuovi al carrello</button>
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