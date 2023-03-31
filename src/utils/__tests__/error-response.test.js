import errorResponse from '../error-response.js';

describe('errorResponse tests', () => {
  it('should should create an error response in the login error', async () => {
    const schemaErrors = [
      {
        message: '"login" must be a valid email',
        path: ['login'],
        type: 'string.email',
        context: {
          value: 'Harry',
          invalids: [],
          label: 'login',
          key: 'login',
        },
      },
    ];

    expect(errorResponse(schemaErrors)).toEqual({
      errors: [{ message: '"login" must be a valid email', path: ['login'] }],
      status: 'failed',
    });
  });

  it('should should create an error response in the login error', async () => {
    const schemaErrors = [
      {
        message: '"age" must be greater than or equal to 4',
        path: ['age'],
        type: 'number.min',
        context: { limit: 4, value: -1, label: 'age', key: 'age' },
      },
    ];

    expect(errorResponse(schemaErrors)).toEqual({
      errors: [{ message: '"age" must be greater than or equal to 4', path: ['age'] }],
      status: 'failed',
    });
  });
});
