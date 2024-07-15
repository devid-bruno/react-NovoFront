import axios from 'axios';

const API_URL = 'https://site-resgate-app.info';

export const getUsers = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const auth = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestOnlyPhone = async(tel, accessToken) => {
  try{
    const response = await axios.get(`${API_URL}/filterport/${tel}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestOnlyPhoneWPP = async(tel, accessToken) => {
  try{
    const response = await axios.get(`${API_URL}/filterzap/${tel}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const requestPhones = async (fileImported, accessToken) => {
  try {
    const formData = new FormData();
    formData.append('file', fileImported);

    const response = await axios.post(`${API_URL}/filter`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    return response; 
  } catch (error) {
    throw error;
  }
};

export const requestPhoneswpp = async (fileImported, accessToken) => {
  try {
    const formData = new FormData();
    formData.append('file', fileImported);

    const response = await axios.post(`${API_URL}/filterzap`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    return response; 
  } catch (error) {
    throw error;
  }
};

export const requestAddPhoneList = async (fileImported, phone, interval, accessToken) => {
  try {
    const formData = new FormData();
    formData.append('file', fileImported, 'phone', phone, 'interval', interval);

    const response = await axios.post(`${API_URL}/import-phone-list`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });

    return response; 
  } catch (error) {
    throw error;
  }
};


export const filesForUser = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/files`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DownloadFileForUser = async (accessToken, uuid) => {
  try {
    const response = await axios.get(`${API_URL}/download/${uuid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteFileForUser = async (accessToken, uuid) => {
  try {
    const response = await axios.delete(`${API_URL}/files/delete/${uuid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateUser = async (userId, values, accessToken) => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar usuário');
  }

  const data = await response.json();
  return data;
};


export const createUser = async(accessToken, values) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(values),
  });

  if(!response.ok){
    throw new Error('Erro ao criar usuário');
  }

  const data = await response.json();
  return data;
}

export const DeleteUser = async (userId, accessToken) => {
  const response = await fetch(`${API_URL}/users/delete/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao excluir usuário');
  }

  const data = await response.json();
  return data;
};