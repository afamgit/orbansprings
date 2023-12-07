export const slugify = (string: string) => {
    return string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    role: string
  };

  export function storeUserInLocalStorage(user: string) {
    localStorage.setItem('userInfo', user);
    
  }
  
  export function getUserFromLocalStorage() {
     return localStorage.getItem('userInfo');
  }
  
  export function removeUserFromLocalStorage() {

    localStorage.removeItem('userInfo');
  }
  
  export async function getAuthenticatedUser() {
    const defaultReturnObject = { authenticated: 0, user: null };
    try {
      const userInfo = getUserFromLocalStorage();
      if (!userInfo) {
        return defaultReturnObject;
      }
      return {authenticated: 1, user: userInfo}
    }
    catch (err) {
      console.log('getAuthenticatedUser, Something Went Wrong', err);
      return defaultReturnObject;
    }
  }
