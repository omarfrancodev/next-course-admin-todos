'use server'
// app/shopping-cart/actions/action.ts
import { cookies } from 'next/headers'

export async function getCookieCart() {
    const cookieStore = await cookies()
    const existing = cookieStore.get('cart')?.value || '{}'
    return JSON.parse(existing)
}

export async function addProductToCart(id: string) {
    const cookieStore = await cookies()
    const cart = await getCookieCart();

    cart[id] = (cart[id] || 0) + 1

    cookieStore.set({
        name: 'cart',
        value: JSON.stringify(cart),
        path: '/',
    })
}

export async function removeProductFromCart(id: string) {
    const cookieStore = await cookies()
    const cart = await getCookieCart();
    delete cart[id]

    cookieStore.set({
        name: 'cart',
        value: JSON.stringify(cart),
        path: '/',
    })
}
