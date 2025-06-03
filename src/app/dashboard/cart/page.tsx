import { products, type Product } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart";
import * as actions from "@/shopping-cart/actions/actions"


export const metadata = {
    title: 'Carrito de compras',
    description: 'Carrito de compras',
};

interface ProductInCart {
    product: Product,
    quantity: number
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
    const productsInCart: ProductInCart[] = [];

    for (const id of Object.keys(cart)) {
        const product = products.find((product) => product.id === id);
        if (product) {
            productsInCart.push({ product, quantity: cart[id] || 0 });
        }
    }
    return productsInCart
}

export default async function CartPage() {
    const cart = await actions.getCookieCart() as { [id: string]: number };

    const productsInCart = getProductsInCart(cart);
    return (
        <div>
            <h1 className="text-5xl">Productos en el carrito</h1>
            <hr className="my-2" />
            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                    {productsInCart.map((productInCart) => (
                        <ItemCard
                            key={productInCart.product.id}
                            product={productInCart.product}
                            quantity={productInCart.quantity}
                        />
                    ))}
                </div>
            </div>
        </div >
    );
}