declare namespace Express {
  export interface Request {
    auth?: import('./src/utils/manageAuth').TJWTPayload;
  }
  export interface Response {
    auth?: import('./src/utils/manageAuth').TJWTPayload;
  }
}
