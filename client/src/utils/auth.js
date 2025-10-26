// Simple JWT helpers

export const setToken = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const getRole = () => {
    return localStorage.getItem('role');
  };
  
  export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };