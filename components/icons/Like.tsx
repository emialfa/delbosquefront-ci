import React from "react";

interface Props {
  value?: boolean;
}
const Like: React.FC<Props> = ({ value }) => {
  return (
    <>
      {value ? (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="10.5" fill="white" stroke="black" />
          <path
            d="M15.7581 8.84437C15.6029 8.48345 15.3792 8.15639 15.0994 7.88149C14.8194 7.60577 14.4894 7.38666 14.1271 7.23608C13.7514 7.07931 13.3485 6.99907 12.9418 7.00001C12.3711 7.00001 11.8143 7.157 11.3305 7.45354C11.2147 7.52448 11.1048 7.60239 11.0006 7.68728C10.8964 7.60239 10.7864 7.52448 10.6707 7.45354C10.1868 7.157 9.63005 7.00001 9.05938 7.00001C8.64845 7.00001 8.25026 7.07909 7.87406 7.23608C7.51059 7.38725 7.18301 7.60472 6.90172 7.88149C6.6216 8.15608 6.39782 8.48322 6.24308 8.84437C6.08219 9.21999 6 9.61886 6 10.0294C6 10.4166 6.07871 10.8201 6.23498 11.2306C6.36578 11.5737 6.5533 11.9296 6.79291 12.2889C7.17259 12.8575 7.69464 13.4506 8.34286 14.0518C9.41706 15.0485 10.4808 15.7369 10.526 15.7648L10.8003 15.9416C10.9219 16.0195 11.0781 16.0195 11.1997 15.9416L11.474 15.7648C11.5192 15.7357 12.5818 15.0485 13.6571 14.0518C14.3053 13.4506 14.8274 12.8575 15.2071 12.2889C15.4467 11.9296 15.6354 11.5737 15.765 11.2306C15.9213 10.8201 16 10.4166 16 10.0294C16.0011 9.61886 15.919 9.21999 15.7581 8.84437V8.84437Z"
            fill="#4F4138"
          />
        </svg>
      ) : (
        <svg
          width="42"
          height="39"
          viewBox="0 0 42 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d)">
            <circle cx="21" cy="17" r="11" fill="#4F4138" />
            <path
              d="M25.7581 14.8444C25.6029 14.4834 25.3792 14.1564 25.0994 13.8815C24.8194 13.6058 24.4894 13.3867 24.1271 13.2361C23.7514 13.0793 23.3485 12.9991 22.9418 13C22.3711 13 21.8143 13.157 21.3305 13.4535C21.2147 13.5245 21.1048 13.6024 21.0006 13.6873C20.8964 13.6024 20.7864 13.5245 20.6707 13.4535C20.1868 13.157 19.63 13 19.0594 13C18.6485 13 18.2503 13.0791 17.8741 13.2361C17.5106 13.3873 17.183 13.6047 16.9017 13.8815C16.6216 14.1561 16.3978 14.4832 16.2431 14.8444C16.0822 15.22 16 15.6189 16 16.0294C16 16.4166 16.0787 16.8201 16.235 17.2306C16.3658 17.5737 16.5533 17.9296 16.7929 18.2889C17.1726 18.8575 17.6946 19.4506 18.3429 20.0518C19.4171 21.0485 20.4808 21.7369 20.526 21.7648L20.8003 21.9416C20.9219 22.0195 21.0781 22.0195 21.1997 21.9416L21.474 21.7648C21.5192 21.7357 22.5818 21.0485 23.6571 20.0518C24.3053 19.4506 24.8274 18.8575 25.2071 18.2889C25.4467 17.9296 25.6354 17.5737 25.765 17.2306C25.9213 16.8201 26 16.4166 26 16.0294C26.0011 15.6189 25.919 15.22 25.7581 14.8444Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d"
              x="0"
              y="0"
              width="42"
              height="42"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      )}
    </>
  );
};

export default Like;
