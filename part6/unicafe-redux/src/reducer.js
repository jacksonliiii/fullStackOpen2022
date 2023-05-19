const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  let copiedState = { ...state }
  switch (action.type) {
    case 'GOOD':
      return {
        ...copiedState,
        good: copiedState.good += 1
      }
    case 'OK':
      return {
        ...copiedState,
        ok: copiedState.ok += 1
      }
    case 'BAD':
      return {
        ...copiedState,
        bad: copiedState.bad += 1
      }
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }

}

export default counterReducer