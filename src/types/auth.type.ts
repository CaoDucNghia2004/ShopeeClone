import { User } from './user.type'
import { SuccessResponse } from './utils.type'

// export type AuthResponse = SuccessResponse<{
//   access_token: string
//   expires: string
//   user: User
// }>

export type AuthResponse = SuccessResponse<{
  access_token: string
  refresh_token: string
  expires_refresh_token: number
  expires: number
  user: User
}>

export type RefreshTokenResponse = SuccessResponse<{ access_token: string }>

//Ví dụ phản hồi từ API đăng nhập:
// {
//   "message": "Đăng nhập thành công",
//   "data": {
//     "access_token": "eyJhbGciOiJIUzI1NiIsIn...",
//     "expires": "2025-02-20T12:00:00Z",
//     "user": {
//       "_id": "123",
//       "roles": ["User"],
//       "email": "test@example.com",
//       "name": "Nguyen Van A",
//       "date_of_birth": null,
//       "address": "Hà Nội",
//       "phone": "0123456789",
//       "createdAt": "2024-02-20T12:00:00Z",
//       "updatedAt": "2024-02-20T12:30:00Z"
//     }
//   }
// }
