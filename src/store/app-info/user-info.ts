import CartApi from '@/apis/cart/cart-api';
import { useCookie } from '@/composable/clientStorage/useCookie';
import { check } from '@/composable/http/use-response';
import { useJwt } from '@/composable/jwt/useJwt';
import { User } from '@/entities/user/user';
import { generateGUID } from '@/utils';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
const { getCookie, setCookie, deleteCookie } = useCookie();
type KeyType = 'ID' | 'FullName' | 'Email' | 'Cart';

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>({
    UserID: getUserID(),
  });

  initData();
  getCartInfo();

  function setUserID(id: string) {
    user.UserID = id;
    setCookie('userID', id);
  }

  function setValue(key: KeyType, value: any) {
    user[key] = value;
  }

  function logOut() {
    deleteCookie('Bearer');
    deleteCookie('userID');
    window.location.reload();
  }

  function initData() {
    const { tokenDataParse } = useJwt();
    if (tokenDataParse) {
      Object.entries(tokenDataParse).forEach(([key, value]) => {
        user[key] = value;
      });
    }
  }

  async function getCartInfo() {
    if (getCookie('Bearer')) {
      const res = await CartApi.getCartInfo();
      const { isSuccess, data } = check(res);

      if (isSuccess) {
        user.Cart = data.Data;
      }
    }
  }

  return { user, setUserID, setValue, logOut, initData, getCartInfo };
});

function getUserID() {
  let id = getCookie('userID');
  if (!id) {
    id = generateGUID();
    setCookie('userID', id);
  }
  return id;
}
