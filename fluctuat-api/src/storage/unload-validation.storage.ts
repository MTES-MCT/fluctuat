import { buildValidationStorage } from './build-validation-storage';

const { get, put } = buildValidationStorage('UnloadValidation');

export { get, put };
