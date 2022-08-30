import React, { useEffect, useState } from 'react'
import CartCard from '../../Components/CartCard';
import Loader from '../../Components/Loader';
import { useHeader } from '../../Context/HeaderContext'
import { useProduct } from '../../Context/ProductContext';
import styles from './styles.module.css';

const Cart = () => {
    const {cartIds}=useHeader();
    const {loading,productList}=useProduct();
    const products=productList.filter((item)=>cartIds.includes(item.id));
    const costs=products.map((item)=>item.price);
    const sum=costs.reduce((num1,num2)=>num1+num2,0);
    console.log(sum);

    const chechOut=()=>alert("Payment Successful,Thank You for Ordering"+"\n"+"Have a Nice Day 😊");

  return (
    <div className={styles.main}>
        <div className={styles.cardGroup}>
        {
            !loading?(
                products.map((item)=>{
                    return(
                        <CartCard item={item} key={item.id}/>
                    )
                })
            ):<Loader/>
        }
        </div>
        <div className={styles.payment}>
            <div className={styles.paymentCard}>
                <h1 className='text-2xl'>Price: {(sum*0.95).toFixed(2)}</h1>
                <h3 className='text-lg'>Tax:{(sum*0.1).toFixed(2)}</h3>
                <h3 className='text-lg'>Discount:{(sum*0.05).toFixed(2)}</h3>
                <h1 className='text-3xl'>Final price:{(sum).toFixed(2)}</h1>
                <button className={styles.paymentButton} onClick={chechOut}>CheckOut</button>
            </div>
        </div>
    </div>
  )
}

export default Cart