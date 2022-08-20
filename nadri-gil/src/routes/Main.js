import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function App (){

    function 반복된UI(){
        const data = [
            { id : 0, name : '경복궁', image : 'images.jpg'},
            { id : 1, name : '경복궁1', image : 'images.jpg'},
            { id : 2, name : '경복궁2', image : 'images.jpg'},
        ]
        
      for (var i = 0; i < 3; i++) {
        어레이.push( <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={e.image}
                alt="First slide"
              />
            </Carousel.Item>
          </Carousel>)
      }
      return 어레이
    }
    return (
      <div>
        { ControlledCarousel }
      </div>
    )
  }

function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const data = [
    { id : 0, name : '경복궁', image : 'images.jpg'},
    { id : 1, name : '경복궁1', image : 'images.jpg'},
    { id : 2, name : '경복궁2', image : 'images.jpg'},
]

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    let preference = []
    for(let i = 0; i < index.length; i++){
        if(index[i]) preference.push(i)
    }
  };
  {data.map((e,i)=>{
  return (<>
    
        <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={e.image}
            alt="First slide"
          />
        </Carousel.Item>
      </Carousel>
    
      </>);
})}

export default ControlledCarousel;