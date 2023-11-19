import { useCookie } from '@/composable/cookie/useCookie';
import { User } from '@/entities/user/user';
import { generateGUID } from '@/utils';
import { defineStore } from 'pinia';
import { reactive } from 'vue';
const { getCookie, setCookie } = useCookie();

export const useUserStore = defineStore('user', () => {
  const user = reactive<User>({
    UserID: getUserID(),
  });

  function setUserID(id: string) {
    user.UserID = id;
    setCookie('userID', id);
  }
  return { user, setUserID };
});

function getUserID() {
  let id = getCookie('userID');
  if (!id) {
    id = generateGUID();
    setCookie('userID', id);
  }
  return id;
}
