import React from 'react'
import ReactDOM from 'react-dom'


const beforeAfterWrapper = document.querySelectorAll(".before-after-image-wrapper")

beforeAfterWrapper.forEach(function(div, index) {
  // console.log(div.querySelector("pre").innerHTML)
  const data = JSON.parse(div.querySelector("pre").innerHTML)
  ReactDOM.render(<BaisSave {...data} index = {index} />, div)
})

// Frontend Part
function BaisSave(props) {
  return (
    <div className="before-after-image-wrap">
      {/* <div id="slider"  class="bais-slider bais-slider-wlabels" data-bais-label="before"> */}
      <div id={"slider" + props.index}  class="bais-slider bais-slider-wlabels" data-bais-label={props.beforeText ? props.beforeText : "Before"}>
        <img src={props.beforeImgUrl} alt={props.beforeImgAlt} />
        <div class="bais-reveal" data-bais-label={props.afterText ? props.afterText : "After"}>
          <img src={props.afterImgUrl} alt={props.afterImgAlt}/>
        </div>
      </div>
    </div>
  )
}