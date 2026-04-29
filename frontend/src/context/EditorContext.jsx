import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const EditorContext = createContext(null);

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) throw new Error('useEditor must be used within an EditorProvider');
  return context;
};

export const EditorProvider = ({ children, initialElements = [] }) => {
  const [elements, setElements] = useState(initialElements);
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([initialElements]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const selectedElement = useMemo(
    () => elements.find((e) => e.id === selectedId) || null,
    [elements, selectedId]
  );

  const pushToHistory = useCallback((newElements) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newElements);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const addElement = useCallback((type, defaultProps = {}) => {
    const newElement = {
      id: `el_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      ...defaultProps,
    };
    const newElements = [...elements, newElement];
    setElements(newElements);
    setSelectedId(newElement.id);
    pushToHistory(newElements);
  }, [elements, pushToHistory]);

  const updateElement = useCallback((id, updates) => {
    const newElements = elements.map((el) => 
      el.id === id ? { ...el, ...updates } : el
    );
    setElements(newElements);
    pushToHistory(newElements);
  }, [elements, pushToHistory]);

  const removeElement = useCallback((id) => {
    const newElements = elements.filter((el) => el.id !== id);
    setElements(newElements);
    if (selectedId === id) setSelectedId(null);
    pushToHistory(newElements);
  }, [elements, selectedId, pushToHistory]);

  const moveElement = useCallback((id, direction) => {
    const index = elements.findIndex(e => e.id === id);
    if (index < 0) return;
    
    const newElements = [...elements];
    if (direction === 'up' && index > 0) {
      [newElements[index - 1], newElements[index]] = [newElements[index], newElements[index - 1]];
    } else if (direction === 'down' && index < newElements.length - 1) {
      [newElements[index], newElements[index + 1]] = [newElements[index + 1], newElements[index]];
    }
    
    setElements(newElements);
    pushToHistory(newElements);
  }, [elements, pushToHistory]);

  const duplicateElement = useCallback((id) => {
    const el = elements.find(e => e.id === id);
    if (!el) return;
    
    const newElement = { ...el, id: `el_${Date.now()}` };
    const index = elements.findIndex(e => e.id === id);
    
    const newElements = [...elements];
    newElements.splice(index + 1, 0, newElement);
    
    setElements(newElements);
    setSelectedId(newElement.id);
    pushToHistory(newElements);
  }, [elements, pushToHistory]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setElements(history[historyIndex - 1]);
      setSelectedId(null);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setElements(history[historyIndex + 1]);
      setSelectedId(null);
    }
  }, [history, historyIndex]);

  const loadElements = useCallback((newElements) => {
    setElements(newElements);
    setHistory([newElements]);
    setHistoryIndex(0);
    setSelectedId(null);
  }, []);

  const value = {
    elements,
    selectedId,
    selectedElement,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    setSelectedId,
    addElement,
    updateElement,
    removeElement,
    moveElement,
    duplicateElement,
    undo,
    redo,
    loadElements
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorContext;
