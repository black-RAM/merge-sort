import "./style.scss"

function merge(left: number[], right:number[]) {
  const merged: number[] = []

  let i = 0
  let j = 0

  while(i < left.length && j < right.length) {
    if(left[i] < right[j]) {
      merged.push(left[i])
      i++
    } else {
      merged.push(right[j])
      j++
    }
  }

  // append remnants
  merged.push(...left.slice(i))
  merged.push(...right.slice(j))

  return merged
}

function mergeSort(array: number[]): number[] {
  if(array.length == 1) {
    return array // base case
  }

  // split array
  const mid = Math.floor(array.length / 2) 
  const right = array.slice(mid)
  const left = array.slice(0, mid)

  // recursively sort
  const sortedRight = mergeSort(right)
  const sortedLeft = mergeSort(left)

  // merge
  return merge(sortedLeft, sortedRight)
}

const unsorted = [3, 2, 1, 13, 8, 5, 0, 1]
const sorted = mergeSort(unsorted)
console.log(sorted)