import React from 'react';

const expandFromCenter = (s, left, right) => {
  let L = left
  let R = right

  while(L >= 0 && R < s.length && s.charAt(L) === s.charAt(R)) {
      R++
      L--
  }
  //почему тут -1
  return R - L - 1
}

const longestPalindrome = (s) => {
  let startInd = 0
  let endInd = 0

  for(let i = 0; i < s.length; i++) {
    
      const len1 = expandFromCenter(s, i, i)
      const len2 = expandFromCenter(s, i, i + 1)
      const len = Math.max(len1, len2)
      console.log(len, endInd - startInd);
      if(len > endInd - startInd) {
          startInd = i
          endInd = i + len
      }
  }
  return s.slice(startInd, endInd);
};

const res = longestPalindrome("babad");
const Other = () => {
  return (
    <div>
    <h1>{res}</h1>
    </div>
  )
}
export default Other