import { MOVIES_APP_ACCESS_TOKEN } from "constants/tokens";
import { AUTHORIZATION_DELAY } from "constants/numbers";
import { AuthenticationResponse } from "types/common";
import { BASE_URL, USER_INFO_ENDPOINT } from "constants/urls";

const getUserInfo = async (token: string) => {
  const response = await fetch(BASE_URL + USER_INFO_ENDPOINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

export const authentication = async (
  token: string
): Promise<AuthenticationResponse> => {
  const data = await getUserInfo(token);

  return new Promise((resolve, reject) => {
    if (token === MOVIES_APP_ACCESS_TOKEN) {
      setTimeout(() => {
        resolve({ token, data });
      }, AUTHORIZATION_DELAY);
    } else {
      setTimeout(() => {
        reject("Wrong token!");
      }, AUTHORIZATION_DELAY);
    }
  });
};
