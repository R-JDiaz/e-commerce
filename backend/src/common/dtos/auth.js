export const authResponseDTO = (user, tokens) => ({
  user: publicUserDTO(user),
  access_token: tokens.accessToken,
  refresh_token: tokens.refreshToken
});