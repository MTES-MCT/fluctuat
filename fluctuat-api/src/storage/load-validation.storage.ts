import { buildValidationStorage } from './build-validation-storage';

const { get, put, getByWaybillId } = buildValidationStorage('LoadValidation');

export { get, put, getByWaybillId };
