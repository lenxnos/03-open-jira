import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState { 
   sidemenuOpen: boolean;
   isAddingEntry: boolean;
   isDragging: boolean;
 }

const UIInitialState: UIState = { 
   sidemenuOpen: false, 
   isAddingEntry: false,
   isDragging: false,

 };

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UIInitialState);

  const openSideMenu = () => {
    dispatch({ type: 'UI - Open Sidebar' });
  }

  const closeSideMenu = () => {
    dispatch({ type: 'UI - Close Sidebar' });
  }

  const setIsAddingEntry = (isAddingEntry: boolean) => {
    dispatch({ type: 'UI - SetIsAddingEntry', payload: isAddingEntry });
  }

  const startDragging = () => {
    dispatch({ type: 'UI - Start Dragging' });
  }

  const endDragging = () => {
    dispatch({ type: 'UI - End Dragging' });
  }

  return ( 

    <UIContext.Provider value={{
      ...state,

      // Methods
      openSideMenu,
      closeSideMenu,
      setIsAddingEntry,
      startDragging,
      endDragging,
    }}>
      {children}
    </UIContext.Provider>
  ); 

}; 
