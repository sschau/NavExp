import { CHANGE_TAB } from '../constants/ActionTypes'

const tabs = [
  { key: 'ios-paper', title: 'Main' },
  { key: 'md-card', title: 'Recipes' },
  { key: 'md-car', title: 'Samples' },
  { key: 'md-cloud-upload', title: 'Main' },
  { key: 'md-camera', title: 'Main' },
  { key: 'md-code-working', title: 'Main' },
  { key: 'md-globe', title: 'Main' },
  { key: 'md-clipboard', title: 'Main' },
{ key: 'md-contact', title: 'Main' },
{ key: 'md-wifi', title: 'Main' },  
]

const initialState = {
  tabIndex: 0,
//  tabs
}

function tabsNav (state = initialState, action) {    
  if (action.index === state.index) return state
  
  switch (action.type) {
    case CHANGE_TAB:      
      return {
        ...state,
        tabIndex: action.index
      }
    default:
      return state
  }
}

export default tabsNav