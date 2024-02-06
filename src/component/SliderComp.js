import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from 'react'

const SliderComp = () => {
    const [listItems, setListItems] = useState(3);
    const [Item, setItems] = useState(0);
    const [apiData, setApiData] = useState(6);
    const [showNext, setSHowNext] = useState(false);

    const [data, setData] = useState([]);
    const getData = async () => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products?limit=${apiData}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const getMovieData = await response.json();
            setData(getMovieData);
        } catch (error) {
            console.log(error);
        }
    }
    const settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        lazyLoad: true,
    };
    const handleLoadNext = () => {
        setItems(Item + 1);
        setApiData(apiData + 5);
        setListItems(listItems + 1);
        if(listItems > data.length){
            setItems(0);
            setListItems(3);
        }
    }
    const handleLoadPrev = () => {
        setSHowNext(showNext);
        setItems(Item - 1);
        setListItems(listItems - 1);
        
    }
    useEffect(() => {
        getData();
    }, [Item, listItems]);
    console.log("listItems->>>", listItems, "data.length->>>", data.length);
    return (
        <div className="parent">
            {Item === 0 ? <button type="button" className="showLess" onClick={handleLoadPrev} disabled>Previous</button> : <button type="button" className="showLess" onClick={handleLoadPrev}>Previous</button>}
            {
                listItems < data.length ?
                    <Slider {...settings} className={setSHowNext ? `slider-parent show` : `slider-parent`}>
                        {
                            data.slice(Item, listItems).map((singleData, key) => {
                                return (
                                    <div className="singleContainer" key={key}>
                                        <div className="card-container">
                                            <div className="images">
                                                <img src={singleData.image} alt="" className="image" />
                                            </div>
                                            <div className="content">
                                                <h2>{singleData.title}</h2>
                                                <p>{singleData.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider> :  <Slider {...settings} className={setSHowNext ? `slider-parent show` : `slider-parent`}>
                        {
                            data.slice(Item, listItems).map((singleData, key) => {
                                return (
                                    <div className="singleContainer" key={key}>
                                        <div className="card-container">
                                            <div className="images">
                                                <img src={singleData.image} alt="" className="image" />
                                            </div>
                                            <div className="content">
                                                <h2>{singleData.title}</h2>
                                                <p>{singleData.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
            }

            {Item > data.length ? <button type="button" className="showMore" disabled onClick={handleLoadNext} >Next</button> : <button type="button" className="showMore" onClick={handleLoadNext} >Next</button>}
        </div>
    )
}

export default SliderComp
