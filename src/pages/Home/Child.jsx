import React from 'react'

const Child = React.memo( ({clickFunc}) => {
    console.log('render');
  return (
    <button onClick={clickFunc}>Child</button>
  )
})

export default Child