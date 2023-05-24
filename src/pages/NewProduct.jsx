import React, { useState } from "react";
import Button from "../components/ui/Button";

export default function NewProduct() {
    const [ product, setProduct ] = useState({});
    const [ file, setFile ] = useState();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log('e.target:::', e.target)
        if(name === 'file') {
            setFile(files && files[0]);
            console.log("files[0]", files[0])
            return
        }
        setProduct((product) => ({...product, [name]: value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('AAA')

    };
    return (
        <section>
            {file && <img src={URL.createObjectURL(file)} alt='local file'/> }
            <form onSubmit={handleSubmit}>
                <input type="file" accept='image/*' name='file' required onChange={handleChange} />
                <input type="text" name= 'title' value={product.title ?? ''} placeholder='Product Name' required onChange={handleChange}/>
                <input type="number" name= 'price' value={product.price ?? ''} placeholder='Product Price' required onChange={handleChange}/>
                <input type="text" name= 'category' value={product.category ?? ''} placeholder='Product Category' required onChange={handleChange}/>
                <input type="text" name= 'description' value={product.description ?? ''} placeholder='Product Description' required onChange={handleChange}/>
                <input type="text" name= 'options' value={product.options ?? ''} placeholder='Options(separate with ,)' required onChange={handleChange}/>
                <Button text={'Register Product'} />
            </form>
        </section>
    )
}