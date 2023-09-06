import { createGlobalStyle } from 'styled-components';
import './containers/Bingo/Bingo.css';
import 'semantic-ui-css/semantic.min.css';
const theme = 'Dark';
const width = document.body.clientWidth;
const GlobalStyle = createGlobalStyle`
 body {    
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;            
      
      background-color: ${theme === 'Dark' ? '#00000d' : '#ffffff'} 
      
      background-image: url("${
        theme === 'Dark'
          ? 'https://www.transparenttextures.com/patterns/skulls.png'
          : 'https://www.transparenttextures.com/patterns/skulls.png'
      }");
      background-image: url("${
        theme === 'Dark'
          ? 'https://www.transparenttextures.com/patterns/dark-mosaic.png'
          : 'https://www.transparenttextures.com/patterns/diagmonds-light.png'
      }");

      font-size: 16px;
      color: #8697a2;
      line-height: 30px;
      font-family: Open Sans,Segoe UI,-apple-system,Arial,Helvetica,sans-serif;
      font-weight: 400;
      -webkit-font-smoothing: antialiased;
      scrollbar-color: #f2711c rgba(0,0,0,0.8);
      scrollbar-width: thin;
    }
    ._asb_application {
      background: #00172700!important;
    }
    .ui.button.toggle.active, .ui.buttons .button.toggle.active, .ui.toggle.buttons .active.button {
      background-color: #ff7701!important;
    }
    .ui.inverted.orange.button:active, .ui.inverted.orange.buttons .button:active {
      background-color: #e76b00;
    }

    .ui.inverted.orange.button, .ui.inverted.orange.buttons .button {
      background-color: transparent;
      -webkit-box-shadow: 0 0 0 2px #ff851b inset!important;
      box-shadow: 0 0 0 1px #fb9d4c  inset!important;
      color:  ${theme === 'Dark' ? '#ff851b' : '#151515'} ;
    }
    .ui.inverted.orange.button.pick:focus{      
      background-color:unset;
      color: #ff851b;
      -webkit-box-shadow: 0 0 0 1px #fb9d4c inset!important;
      box-shadow: 0 0 0 1px #fb9d4c inset!important;
    }
    .ui.accordion .title:not(.ui) {
      border-top:2px solid orange;    
      border-left:1px solid  ${theme === 'Dark' ? 'transparent' : 'orange'} ;
      border-right:1px solid  ${theme === 'Dark' ? 'transparent' : 'orange'} ;
      
      background-color: ${
        theme === 'Dark' ? 'rgba(0, 0, 0, 0.80);' : '#ffffff;'
      } 
      border-top-left-radius:5px;
      border-top-right-radius:5px;
      border-bottom-right-radius:5px;
      border-bottom-left-radius:5px;
      margin-top:5px;
      color: orange;
      padding-left:15px;
      padding-top:5px;
  
    }
    .ui.orange.button:hover, .ui.orange.buttons .button:hover {
      background-color: #f26202;
      color: #fff;
      text-shadow: none;
    }

    .ui.orange.button, .ui.orange.buttons .button {
      background-color: #f2711c;
      color: #fff;
      text-shadow: none;
      background-image: none;
    }
  
   html, .padding-0{
    padding:0;
  }
  #alternar-game{
    word-break: normal;
  }
  div._asb_category-flag-or-sport-icon._asb_top-leagues-item-icon > i{
    line-height:0 !important;
  }
  [class^="sicon-"],
  [class*=" sicon-"]  {
    font-size: 20px;
  }
  .swing{
    animation: animationFrames ease 1s;
    animation-iteration-count: 1;
    transform-origin: 50% 50%;
    -webkit-animation: animationFrames ease 1s;
    -webkit-animation-iteration-count:1;
    -webkit-transform-origin: 50% 50%;
    -moz-animation: animationFrames ease 1s;
    -moz-animation-iteration-count:1;
    -moz-transform-origin: 50% 50%;
    -o-animation: animationFrames ease 1s;
    -o-animation-iteration-count:1;
    -o-transform-origin: 50% 50%;
    -ms-animation: animationFrames ease 1s;
    -ms-animation-iteration-count:1;
    -ms-transform-origin: 50% 50%;          
  }

  .swal2-popup{
    background:#14161d;
  }
  .swal2-success-circular-line-left{
    background: #14161d;
  }
  .swal2-title {    
    color: #e65619;
  }
  .swal2-icon.swal2-success [class^=swal2-success-line] {    
    background-color: #e65619;
  }
  .swal2-icon.swal2-success .swal2-success-ring {
    border: .25em solid #e65619;
  }
  .swal2-confirm {
    background-color: #e65619 !important;
    color: #fff;
    font-size: 12px !important;
  }
  .marquee {
    overflow: hidden;
    position: relative;
    background: #fefefe;
    color: #333;
  }
  .marquee :first-child {
    position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 10px;
    /* line-height: 50px; */
    text-align: center;
    -moz-transform: translateX(${width}px);
    -webkit-transform: translateX(${width}px);
    transform: translateX(${width}px);
    -moz-animation: scroll-left 50S linear infinite;
    -webkit-animation: scroll-left 50S linear infinite;
    animation: scroll-left 50s linear infinite;
  }
  @-moz-keyframes scroll-left {
    0% {
        -moz-transform: translateX(${width}px);
    }
    100% {
        -moz-transform: translateX(-100%);
    }
  }

  @-webkit-keyframes scroll-left {
    0% {
        -webkit-transform: translateX(${width}px);
    }
    100% {
        -webkit-transform: translateX(-100%);
    }
  }

  @keyframes scroll-left {
    0% {
        -moz-transform: translateX(${width}px);
        -webkit-transform: translateX(${width}px);
        transform: translateX(${width}px);
    }
    100% {
        -moz-transform: translateX(-100%);
        -webkit-transform: translateX(-100%);
        transform: translateX(-100%);
    }
  }

  .ui.vertical.tabular.menu.inverted .active.item:not(:hover) {
    background: rgb(0, 8, 15);
    color: rgba(0,0,0,.95);
    border-color: #d4d4d5;
    margin: 0 -1px 0 0;
    border-radius: .28571429rem 0 0 .28571429rem!important;
  }
  .ui.tabular.menu.inverted .item:hover {
    background-color: rgb(9 21 39) !important;
    color: rgba(191,191,191);
    border-radius:5px 0 0 5px;
  }
  .ui.inverted.list .list>.item .checkbox label, .ui.inverted.list>.item .checkbox label {
    color: rgba(255,255,255,.7);
  }
  .ui.steps .step.dark .description{
    color: ${theme === 'Dark' ? '#fff' : 'unset'} !important;
  }

  div.step.dark, a.step.dark {
    color:  ${theme === 'Dark' ? '#ff851b' : 'rgba(0, 0, 0,0.85)'} !important;
  }
  a.step.dark:after, div.step.dark:after{
    background-color: unset !important;
  }
  .ui.inverted.red.top.popup:before{
    background:red;
  }
  .ui.steps .step.dark:hover, a.step.dark:hover, div.step.dark.active, a.step.dark.active, .ui.steps .step.dark.active:after, a.step.dark:hover:after, div.step.dark:hover:after {
    background-color: #ff851b !important;
    color: #fff !important;
  }
  .ui.ordered.steps .step.dark.active:before, .ui.steps .dark.active.step .icon{
    color: #fff !important;
  }
  .ui.steps .step.dark.active .title, a.steps .step.dark.active .title{
    color:  #fff !important;
  }

  a.ui.statistic{
    padding:10px;
  }
  a.ui.statistic:hover div.label{
    color: #ff851b !important;
  }
  a.ui.statistic:hover div.text.value{
    color: #ff851b !important;
  }

  @keyframes animationFrames{
    0% {
      transform:  translate(0px,0px)  ;

    }
    10% {
      transform:  translate(-10px,0px) scaleX(0.9);
      background-color:#ff5144;
      color:#fff;
    }
    20% {
      transform:  translate(10px,0px) scaleX(0.9);
      background-color:#ff5144;
      color:#fff;
    }
    30% {
      transform:  translate(-10px,0px) scaleX(0.9);
      background-color:#ff5144;
      color:#fff;
    }
    40% {
      transform:  translate(10px,0px) scaleX(0.9);
      background-color:#ff5144;
      color:#fff;
    }
    50% {
      transform:  translate(-10px,0px) scaleX(0.9);

      background-color:#ff5144;
      color:#fff;
    }
    60% {
      transform:  translate(10px,0px) scaleX(0.9);
      background-color:#ff5144;
      color:#fff;
    }
    70% {
      transform:  translate(-10px,0px) scaleX(0.9);
      background-color:#ff5144;
      color:#fff;
    }
    80% {
      transform:  translate(10px,0px) scaleX(0.9);
      background-color:#ff5144;
      color:#fff;
    }
    90% {
      transform:  translate(-10px,0px) scaleX(0.9);
      background-color:#ff5144;
      color:#fff;
    }
    100% {
      transform:  translate(0px,0px) ;

    }
  }

  @-moz-keyframes animationFrames{
    0% {
      -moz-transform:  translate(0px,0px);
    }
    10% {
      -moz-transform:  translate(-10px,0px) scaleX(0.9);
    }
    20% {
      -moz-transform:  translate(10px,0px) scaleX(0.9);
    }
    30% {
      -moz-transform:  translate(-10px,0px) scaleX(0.9);
    }
    40% {
      -moz-transform:  translate(10px,0px) scaleX(0.9);
    }
    50% {
      -moz-transform:  translate(-10px,0px) scaleX(0.9);
      background-color:#ff5144;
      color:#fff;
    }
    60% {
      -moz-transform:  translate(10px,0px) scaleX(0.9);
    }
    70% {
      -moz-transform:  translate(-10px,0px) scaleX(0.9);
    }
    80% {
      -moz-transform:  translate(10px,0px) scaleX(0.9);
    }
    90% {
      -moz-transform:  translate(-10px,0px) scaleX(0.9);
    }
    100% {
      -moz-transform:  translate(0px,0px) ;
    }
  }

  @-webkit-keyframes animationFrames {
    0% {
      -webkit-transform:  translate(0px,0px);
    }
    10% {
      -webkit-transform:  translate(-10px,0px) scaleX(0.9);
    }
    20% {
      -webkit-transform:  translate(10px,0px) scaleX(0.9);
    }
    30% {
      -webkit-transform:  translate(-10px,0px) scaleX(0.9);
    }
    40% {
      -webkit-transform:  translate(10px,0px) scaleX(0.9);
    }
    50% {
      -webkit-transform:  translate(-10px,0px) scaleX(0.9);
      background-color:#ff5144;
      color:#fff;
    }
    60% {
      -webkit-transform:  translate(10px,0px) scaleX(0.9);
    }
    70% {
      -webkit-transform:  translate(-10px,0px) scaleX(0.9);
    }
    80% {
      -webkit-transform:  translate(10px,0px) scaleX(0.9);
    }
    90% {
      -webkit-transform:  translate(-10px,0px) scaleX(0.9);
    }
    100% {
      -webkit-transform:  translate(0px,0px) ;
    }
  }

  @-o-keyframes animationFrames {
    0% {
      -o-transform:  translate(0px,0px);
    }
    10% {
      -o-transform:  translate(-10px,0px) scaleX(0.9);
    }
    20% {
      -o-transform:  translate(10px,0px) scaleX(0.9);
    }
    30% {
      -o-transform:  translate(-10px,0px) scaleX(0.9);
    }
    40% {
      -o-transform:  translate(10px,0px) scaleX(0.9);
    }
    50% {
      -o-transform:  translate(-10px,0px) scaleX(0.9);
      background-color:#ff5144;
      color:#fff;
    }
    60% {
      -o-transform:  translate(10px,0px) scaleX(0.9);
    }
    70% {
      -o-transform:  translate(-10px,0px) scaleX(0.9);
    }
    80% {
      -o-transform:  translate(10px,0px) scaleX(0.9);
    }
    90% {
      -o-transform:  translate(-10px,0px) scaleX(0.9);
    }
    100% {
      -o-transform:  translate(0px,0px);      
    }
  }

  @-ms-keyframes animationFrames {
    0% {
      -ms-transform:  translate(0px,0px) ;

    }
    10% {
      -ms-transform:  translate(-10px,0px) scaleX(0.9);
    }
    20% {
      -ms-transform:  translate(10px,0px) scaleX(0.9);
    }
    30% {
      -ms-transform:  translate(-10px,0px) scaleX(0.9);
    }
    40% {
      -ms-transform:  translate(10px,0px) scaleX(0.9);
    }
    50% {
      -ms-transform:  translate(-10px,0px) scaleX(0.9);
      background-color:#ff5144;
      color:#fff;
    }
    60% {
      -ms-transform:  translate(10px,0px) scaleX(0.9);
    }
    70% {
      -ms-transform:  translate(-10px,0px) scaleX(0.9);
    }
    80% {
      -ms-transform:  translate(10px,0px) scaleX(0.9);
    }
    90% {
      -ms-transform:  translate(-10px,0px) scaleX(0.9);
    }
    100% {
      -ms-transform:  translate(0px,0px) ;
    }
  }

  .dark{  
    background: ${theme === 'Dark' ? '#1b1c1d' : '#f1f1f1'} !important;
    background: ${
      theme === 'Dark' ? 'rgba(0, 0, 0, 0.65)' : 'rgba(241, 241, 241, 0.72)'
    } !important;    

  }   
  .ReactTable .-pagination .-btn {
    color: ${theme === 'Dark' ? '#d0cdcd' : '#1b1c1d'} !important;
  }
  .ReactTable.-highlight .rt-tbody .rt-tr:not(.-padRow):hover {
    background: #ddf0ff !important;
  }

  .grid::-webkit-scrollbar {
    width: 10px;
    border-radius:5px;
  }

  body ::-webkit-scrollbar-track, .grid::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  .grid::-webkit-scrollbar-thumb {
    background-color: #f2711c;  
    border-radius:5px;
  }
  body::-webkit-scrollbar {
    width: 10px;
    border-radius:5px;
  }

  body::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  body::-webkit-scrollbar-thumb {
    background-color: #f2711c!important;  
    border-radius:5px;
  }
 
  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  p,  label {
    line-height: 1.5em;
  }

  .ui.active.inverted.info{
      -webkit-box-shadow: 0 0 0 2px rgba(0, 0, 0, 0) inset !important; 
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0) inset !important;
      padding-left:40px;
  }

  .ui.basic.segment{
    margin:0 !important;
  }

  .ui.button.info{    
    margin-bottom:5px !important;
  }

  
  .ui.button.pick{       
    margin-bottom:5px !important;  
   }

  .dark > div.content {
    background-color:unset;
  }
  .dark > i.close.icon{
    color: rgb(255, 119, 1);
  }
  .ui.celled.grid>.column:not(.row), .ui.celled.grid>.row>.column {
    -webkit-box-shadow:none; 
    box-shadow:none; 
  }

  .fixed.top.menu{
    z-index:901;
  }

  .ui.dropdown .menu{
    z-index:900 !important;
  }

  .celled.grid {
    margin:0;
    border-top:0;
  }

  .ui.accordion{
    margin-top:5px;
  }

  .ui.accordion .title:not(.ui).active{
    border-bottom-right-radius:0px !important;
    
    border-bottom-left-radius:0px !important;
  }
  .ui.accordion .accordion .active.content, .ui.accordion .active.content{
    padding-top:0 !important;
    padding-bottom: 0 !important;
  }
  .list .item {
    margin:0 !important;
    margin-right:2px !important;
  }
  .internal.rail.left{
    padding:0px !important;
  }
  .ui.rail{
    width:270px;
  }
  .ui.inverted.menu, .ui.inverted.menu .dropdown.item .menu, .ui.inverted.dropdown .menu  {
    background-color:rgba(0, 0, 0, 0.95);
    // background-color:#232323;
  }
  .ui.inverted.menu .ui.header, .ui.inverted.menu .ui.dropdown .menu>.item, .ui.inverted.dropdown .menu>.header{
    color: #fff!important;

  }
  .ui.inverted.menu .active.item, .ui.inverted.dropdown .menu>.item { 
    background-color: rgba(0, 0, 0, 0.65);    
  }
  .ui.inverted.menu .ui.dropdown .menu>.item:hover{
    background-color:#0d0d0d!important;

  }
  .ui.inverted.dropdown .menu>.item {
    // background-color:#232323;
    color: #ddd!important;
  }
  .ui.inverted.dropdown .menu>.item:hover{
    color: #fff!important;
  }
  .ui.menu .item{
    font-weight:bolder !important;
  }
  .ui.menu .item.disabled, .ui.menu .item.disabled:hover {
    
    color: rgba(255, 255, 255, 0.40)!important;
  }
  .react-datepicker__portal {
    width: 100% !important;
    height: 100% !important;
  }
  .truncate{
    text-overflow: ellipsis;
    display:inline-block;
    overflow: hidden;
    white-space: nowrap;
  }
  .ui.embed.star>.icon:after{
    background:none;
  }
  .ui.embed>.icon:before {
    color:${theme === 'Dark' ? '#fab54d;' : '#fab54d;'}
  }

  .ui.embed .icon:hover:before {
    color:${theme === 'Dark' ? '#d48b1a;' : '#d48b1a;'}
  }
  .shine-me {
    width:100%; /*Make sure the animation is over the whole element*/
    
    -webkit-animation-name: ShineAnimation;
    -webkit-animation-duration: 5s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: cubic-bezier(.12,.89,.98,.47);
  }

  @-webkit-keyframes ShineAnimation{
    from {
        background-repeat:no-repeat;
        background-image:-webkit-linear-gradient(
            top left,
            rgba(255, 255, 255, 0.0) 0%,
            rgba(255, 255, 255, 0.0) 45%,
            rgba(255, 255, 255, 0.5) 48%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0.5) 52%,
            rgba(255, 255, 255, 0.0) 57%,
            rgba(255, 255, 255, 0.0) 100%
        );
        background-position:-250px -250px;
        background-size: 300px 300px
    }
    to {
        background-repeat:no-repeat;
        background-position:250px 250px;
    }
  }
  .ui.search .prompt {    
    border:none;
    margin-left:2px;
    margin-right:2px;
    height:100%;
    border-radius: 0px 5px 5px 0px;
  //   background-color: ${
    theme === 'Dark' ? 'rgba(33, 33, 33, .50)' : 'rgb(255,255,255)'
  };
  //   color: ${theme === 'Dark' ? 'white' : 'black'};
  }

  .ui.search .action:hover{
    background:none;
  }
.ui.basic.inverted.button.borderless {
  box-shadow: unset !important;
}
.ui.inverted > input {
  background-color:#000b15!important;
  color: aliceblue !important;
}
.ui.inverted.input>i.icon{
  color:#444444;
}
.ui.inverted > input:focus{
  background-color:#fff!important;
  color: black!important;
}
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
}

.swiper-slide img {
  display: block;
  width: 100%;
}
:root{
  --swiper-theme-color: #f2711c !important;
}
.carousel .thumbs-wrapper {
  margin: 10px!important;
}

.ui.secondary.button, .ui.secondary.buttons .button {
  background-color: #000b15;
}
.ui.inverted.placeholder, .ui.inverted.placeholder .image.header:after, .ui.inverted.placeholder .line, .ui.inverted.placeholder .line:after, .ui.inverted.placeholder>:before {
  background-color: #000b15;
}
.ui.inverted.segment, .ui.primary.inverted.segment {
  background: #000b15;
  color: rgba(255,255,255,.9);
}
`;

export default GlobalStyle;
