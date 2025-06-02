//'use client';

import { getCookie, hasCookie, setCookie } from "cookies-next"

export const getCookieCart = async (): Promise<{ [id: string]: number }> => {
    if (hasCookie('cart')) {
        const cookieCart = JSON.parse(await getCookie('cart') as string ?? '{}');
        return cookieCart
    }

    return {};
}


export const addProductToCart = async (id: string) => {
    const cookieCart = await getCookieCart();
    cookieCart[id] = (cookieCart[id] || 0) + 1;
    await setCookie('cart', JSON.stringify(cookieCart));
}

export const removeProductFromCart = async (id: string) => {
    const cookieCart = await getCookieCart();

    if (!cookieCart[id]) return;

    delete cookieCart[id];
    await setCookie('cart', JSON.stringify(cookieCart));
}