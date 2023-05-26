import React from "react";
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext'
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from 'react-icons/fa'

const SHIPPING = 10 ; 
export default function MyCart() {
    const { uid } = useAuthContext();
    const { isLoading, data: products } = useQuery(['carts'], () => getCart(uid));

    if(isLoading) return <p>Loading...</p>
    
    const hasProducts = products && products.length > 0
    const totalPrice = products && products.reduce((prev, current)=> prev + parseInt(current.price) * current.quantity, 0)

    console.log('My Cart uid::::', uid)
    return <section>
        {!hasProducts && <p>No product were selected in your cart.</p> }
        {hasProducts && <> 
            <ul>
                { products && products.map((product) => (<CartItem key={product.id} product={product} uid={uid}/>))}
            </ul>
            <div>
                <PriceCard text="Total Product Price" price={totalPrice} />
                <BsFillPlusCircleFill />
                <PriceCard text="Shipping Fee" price={SHIPPING} />
                <FaEquals />
                <PriceCard text="Total Amount" price={totalPrice + SHIPPING}/>
            </div>
       
        </>}
        </section>
}