import { buildValidationStorage } from './validation.storage';

const { get, put } = buildValidationStorage('LoadValidation');

export { get, put };
