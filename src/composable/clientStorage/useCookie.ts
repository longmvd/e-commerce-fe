// useCookie.ts

export function useCookie() {
  // Function to set a cookie
  const setCookie = (name: string, value: string, days = 7) => {
    const encodedValue = encodeURIComponent(value);
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${name}=${encodedValue};expires=${expires};path=/`;
  };

  // Function to get a cookie value
  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  };

  // Function to delete a cookie
  const deleteCookie = (name: string) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  };

  // // Reactive reference for cookie value
  // const cookieValue = ref<string | null>(null);

  // // On mounted, initialize the cookie value
  // onMounted(() => {
  //   cookieValue.value = getCookie('exampleCookie');
  // });

  return {
    // cookieValue,
    setCookie,
    getCookie,
    deleteCookie,
  };
}
