import React from "react";
import CartItem from "../components/CartItem";
import PriceCard from "../components/PriceCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaEquals } from 'react-icons/fa'
import Button from "../components/ui/Button";
import useCart from "../hooks/useCart";

const SHIPPING = 10 ; 
export default function MyCart() {
    const { cartQuery: { isLoading, data: products }, } = useCart()

    if(isLoading) return <p>Loading...</p>
    
    const hasProducts = products && products.length > 0
    const totalPrice = products && products.reduce((prev, current)=> prev + parseInt(current.price) * current.quantity, 0)

    return (
        <section className="p-8 flex flex-col">
            <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">My Cart</p>
            {!hasProducts && <p>No product were selected in your cart.</p> }
            {hasProducts && <> 
                <ul className="border-b border-gray-300 mb-8 p-4 px-8">
                    { products && products.map((product) => (<CartItem key={product.id} product={product} />))}
                </ul>
                <div className="flex justify-between items-center mb-4 px-2 md:px-8 lg:px-16">
                    <PriceCard text="Total Product Price" price={totalPrice} />
                    <BsFillPlusCircleFill className="shrink-0" />
                    <PriceCard text="Shipping Fee" price={SHIPPING} />
                    <FaEquals className="shrink-0" />
                    <PriceCard text="Total Amount" price={totalPrice + SHIPPING}/>
                </div>
                <Button text="Order" />

        
            </>}
        </section>
    )
}