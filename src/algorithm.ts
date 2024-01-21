import clerk from "./records"

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

function mergeSort(array: number[], parentId = ""): number[] {
  const currentId = clerk.assignId()
  clerk.record(currentId, parentId, array)

  if(array.length == 1) {
    return array // base case
  }

  // split array
  const mid = Math.floor(array.length / 2) 
  const left = array.slice(0, mid)
  const right = array.slice(mid)

  // recursively sort
  const sortedLeft = mergeSort(left, currentId)
  const sortedRight = mergeSort(right, currentId)

  // merge
  return merge(sortedLeft, sortedRight)
}

export default mergeSort