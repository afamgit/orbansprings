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

  export const removeTags = (str: string) => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString().split(' ',50).join(' ');
 
    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/ig, '');
}

export const statusBg = (status: string) => {
  const bg = status === 'New' ? 'bg-gray-300' : status === 'Completed' ? 'bg-green-400' : status === 'Pending' ? 'bg-red-300' : status === 'Accepted' ? 'bg-green-200' : status === 'Cancelled' ? 'bg-red-300' : 'bg-red-600'

  return  `px-3 py-1 text-gray-900 rounded text-center ${bg}`
}


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
