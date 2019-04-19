import { buildValidationStorage } from './build-validation-storage';

const { get, put } = buildValidationStorage('LoadValidation');

export { get, put };
