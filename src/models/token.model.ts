export interface TokenData {
  id: number;
  nombre: string;
  correo: string;
  foto?: string;
  exp?: number | undefined;
}

export interface TokenPayload {
  success: true;
  data: {
    exp: number;
    token: string;
    payload: TokenData;
  };
}
