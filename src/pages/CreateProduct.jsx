import React, { useRef, useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import { createProduct } from "../services/api";
import BeatLoader from 'react-spinners/BeatLoader'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
const CreateProduct = () => {
    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        quantity: "",
        pictures: Array(6).fill(""), 
        inStock: false,
        price: "",
        description: "",

    });
    const picDivRef = useRef(null);
    const [picturesDivOpen, setPicturesDivOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)



    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle picture URL changes
    const handlePictureChange = (index, value) => {
        const newPictures = [...formData.pictures];
        newPictures[index] = value;
        setFormData({ ...formData, pictures: newPictures });
    };

    //function to increase height of the url input div
    const increaseHeight = () => {
        if (picDivRef.current) {
            setPicturesDivOpen(true)
        }
    };
     //function to decrease height of the url input div
    const decreaseHeight = () => {
        if (picDivRef.current) {
            setPicturesDivOpen(false)
        }
    };


    //handler function to submit the product details to the database
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const response = await createProduct(formData).then(() => {
                setIsLoading(false)
                toast.success(`Product Upload Successful!`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false, 
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }); 
            


        } catch (error) {
            setIsLoading(false)
            console.error("Error:", error);
            alert("Failed to add product.");
        }
    }

    return (
        <div className="lg:mx-auto lg:w-[90%] flex items-center justify-center min-h-screen mx-auto bg-gray-100 mt-22 md-w-max w-[90%] sm:w-full ">
            <ToastContainer />
            <form className="bg-white p-6 shadow-lg rounded-md w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-center">Add Product</h2>

                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="sku"
                        placeholder="SKU"
                        value={formData.sku}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    ></textarea>


                    {/* Pictures Input */}
                    <div ref={picDivRef} className={`${picturesDivOpen ? "h-max" : "h-19 overflow-hidden"}`}>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium">Product Pictures:</label>
                            {picturesDivOpen ? <FaAngleDown onClick={decreaseHeight} className='w-4 h-4 self-start cursor-pointer' /> :

                                <FaAngleRight onClick={increaseHeight} className='w-4 h-4 self-start cursor-pointer' />
                            }
                        </div>


                        {formData.pictures.map((url, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Picture ${index + 1} URL`}
                                value={formData.pictures[index]}
                                onChange={(e) => handlePictureChange(index, e.target.value)}
                                className="w-full p-2 border rounded mt-1"
                            />
                        ))}
                    </div>

                    {/* In Stock Checkbox */}
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="inStock"
                            checked={formData.inStock}
                            onChange={handleChange}
                            className="h-4 w-4"
                        />
                        <span>In Stock</span>
                    </label>

                    {/* Submit Button */}
                    <button
                        onClick={handleFormSubmit}
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        {isLoading ?
                            <div className='flex w-full h-full items-center justify-center '>
                                <BeatLoader
                                    size={10}
                                    cssOverride={override}
                                    color="white"
                                    style={{ color: "white", display: "block" }}
                                    aria-label="Loading Spinner"
                                    data-testid="loader" />
                            </div> : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
