import { API_USER_URL } from '../constants';

export const registerUser = async (userData: any) => {
  try {
    const response = await fetch(`${API_USER_URL}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error al registrar el usuario: ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en registerUser:', error);
    throw error;
  }
};
