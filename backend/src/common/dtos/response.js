export const baseResponseDTO = ({
  success = true,
  message = "",
  data = null
} = {}) => ({
  success,
  message,
  data
});