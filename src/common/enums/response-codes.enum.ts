export enum ResponseCodes {
  SUCCESS = 'SUCCESS',
  CREATED = 'CREATED',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export const ResponseMessages: Record<ResponseCodes, string> = {
  [ResponseCodes.SUCCESS]: 'Operation successful',
  [ResponseCodes.CREATED]: 'Resource created successfully',
  [ResponseCodes.BAD_REQUEST]: 'Bad request',
  [ResponseCodes.UNAUTHORIZED]: 'Unauthorized access',
  [ResponseCodes.FORBIDDEN]: 'Access forbidden',
  [ResponseCodes.NOT_FOUND]: 'Resource not found',
  [ResponseCodes.CONFLICT]: 'Resource conflict',
  [ResponseCodes.VALIDATION_ERROR]: 'Validation failed',
  [ResponseCodes.INTERNAL_ERROR]: 'Internal server error',
};
