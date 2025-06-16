export const isLoggedIn = () => {
  return localStorage.getItem('token') !== null;
};

export const isAdmin = () => {
  return localStorage.getItem('role') === 'admin';
};
