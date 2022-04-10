import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState { 
   sidemenuOpen: boolean; 
 }

const UIInitialState: UIState = { 
   sidemenuOpen: false, 
 };

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UIInitialState);

  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' });
  }

  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close Sidebar' });
  }

  return ( 

    <UIContext.Provider value={{
      ...state,

      // Methods
      openSideMenu,
      closeSideMenu,
    }}>
      {children}
    </UIContext.Provider>
  ); 

}; 
