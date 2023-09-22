import { createContext, useContext, useState } from "react";

// 1) CREATE A CONTEXT
const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    // 2) PROVIDE VALUE TO THE CHILD COMPONENTS
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

// CUSTOM HOOK
export function useSearchContext() {
  const context = useContext(SearchContext);

  if (context === undefined)
    throw new Error("SearchContext was used outside of the SearchProvider");

  return context;
}
