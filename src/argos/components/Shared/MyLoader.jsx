import React from "react"
import ContentLoader from "react-content-loader"

export const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={329}
    viewBox="0 0 400 329"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="591" cy="228" r="58" /> 
    <rect x="133" y="91" rx="0" ry="0" width="0" height="1" /> 
    <rect x="17" y="14" rx="0" ry="0" width="369" height="223" /> 
    <rect x="22" y="256" rx="0" ry="0" width="366" height="10" /> 
    <rect x="27" y="277" rx="0" ry="0" width="360" height="10" /> 
    <rect x="22" y="299" rx="0" ry="0" width="100" height="10" />
  </ContentLoader>
)

