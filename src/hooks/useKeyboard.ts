import { useCallback, useEffect, useState } from 'react';

function actionByKey(key: string) {
  const keys = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
    ShiftLeft: 'sprint',
    ControlLeft: 'crouch',
  } as const;
  return keys[key as keyof typeof keys];
}

export function useKeyboard() {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    sprint: false,
    crouch: false,
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => ({
        ...prev,
        [action]: true,
      }));
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => ({
        ...prev,
        [action]: false,
      }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
}