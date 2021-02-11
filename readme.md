# Node Auth

Ejemplo básico de una API Rest para autenticación.

Los endpoints son los siguientes

```
http://localhost:4000/auth/register
http://localhost:4000/auth/login
http://localhost:4000/auth/check-session
http://localhost:4000/auth/logout
```

Y el servicio en el front con React:

```
const registerUrl = "http://localhost:4000/auth/register";
const loginUrl = "http://localhost:4000/auth/login";
const checkSessionUrl = "http://localhost:4000/auth/check-session";
const logoutUrl = "http://localhost:4000/auth/logout";

export const register = async (userData) => {
  const request = await fetch(registerUrl, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type":"application/json",
      'Access-Control-Allow-Credentials': true,
      "Access-Control-Allow-Origin": "*",
    },
    credentials: 'include',
    body: JSON.stringify(userData),
  })

  
  const response = await request.json();

  if(!request.ok) {
    throw new Error(response.message);
  }

  return response;
};

export const login = async userData => {
  const request = await fetch(loginUrl, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:*",
      "Access-Control-Allow-Credentials": true,
    },
    credentials: 'include',
    body: JSON.stringify(userData),
  })

  const response = await request.json();
  if(!request.ok) {
    return new Error(response.message);
  }

  return response;
}

export const checkSession = async () => {
  const request = await fetch(checkSessionUrl, {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    credentials: 'include',
  });

  const response = await request.json();
  if(!request.ok) {
    throw new Error(response.message);
  }

  return response;
}

export const logout = async () => {
  const request = await fetch(logoutUrl, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    credentials: 'include',
  });

  const response = await request.json();

  if(!request.ok) {
    throw new Error(response.message);
  }

  return response;
}
```