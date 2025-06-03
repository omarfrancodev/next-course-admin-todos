import { products, type Product } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart";
import * as actions from "@/shopping-cart/actions/actions"
import { WidgetItem } from '../../../components/widget-item/WidgetItem';


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

    const taxRate = 16;
    const totalToPay = productsInCart.reduce((prev, currentProduct) => (prev + currentProduct.product.price * currentProduct.quantity), 0);
    const totalToPayWithTax = totalToPay * (1 + (taxRate / 100));

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
                <div className="flex flex-col w-full sm:w-4/12">
                    <WidgetItem title={"Total a pagar"}>
                        <div className="mt-2 flex flex-col justify-center gap-4">
                            <div className="flex flex-row justify-between w-full">
                                <h3 className="text-2xl font-bold text-gray-700">Total:</h3>
                                <h3 className="text-2xl font-bold text-gray-700">${totalToPay.toFixed(2)}</h3>
                            </div>
                            <div className="flex flex-row justify-between w-full">
                                <h3 className="text-2xl font-bold text-gray-700">Total con IVA:</h3>
                                <h3 className="text-2xl font-bold text-gray-700">${totalToPayWithTax.toFixed(2)}</h3>
                            </div>
                        </div>
                        <span className="font-bold text-center text-gray-500">IVA {taxRate}%: ${(totalToPay * (taxRate / 100)).toFixed(2)}</span>
                    </WidgetItem>
                </div>
            </div>
        </div >
    );
}