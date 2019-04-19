import { buildValidationStorage } from './build-validation-storage';

const { get, put, getByWaybillId } = buildValidationStorage('UnloadValidation');

export { get, put, getByWaybillId };
