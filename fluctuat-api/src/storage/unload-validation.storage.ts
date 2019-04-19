import { buildValidationStorage } from './validation.storage';

const { get, put } = buildValidationStorage('UnloadValidation');

export { get, put };
