export const SAVE_HISTORY = 'chess/game/save_history';
export const LOAD_HISTORY = 'chess/game/load_history';

export const saveHistory = (moveId) => ({ type: SAVE_HISTORY, moveId });
export const loadHistory = (moveId) => ({ type: LOAD_HISTORY, moveId });

