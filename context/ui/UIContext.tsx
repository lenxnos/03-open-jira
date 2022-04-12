import { createContext } from 'react'; 

interface ContextProps { 
   sidemenuOpen: boolean;
   openSideMenu: () => void;
   closeSideMenu: () => void;
   isAddingEntry: boolean;
   setIsAddingEntry: (isAddingEntry: boolean) => void;
   isDragging: boolean;
   startDragging: () => void;
   endDragging: () => void;
 } 

export const UIContext = createContext({} as ContextProps);