import {CAU_HOI_1_50} from './cau-hoi-1-50';
import {CAU_HOI_51_100} from './cau-hoi-51-100';
import {CAU_HOI_THEM_A} from './cau-hoi-them-a';
import {CAU_HOI_THEM_B} from './cau-hoi-them-b';

export const CAU_HOI = [...CAU_HOI_1_50, ...CAU_HOI_51_100, ...CAU_HOI_THEM_A, ...CAU_HOI_THEM_B].map(
  (q) => ({...q, type: q.type || 'single'}),
);

export const CHUONG_META = {
  1: {short: 'Ch.1', name: 'Tổng quan CTDL & GT'},
  2: {short: 'Ch.2', name: 'Tìm kiếm và sắp xếp'},
  3: {short: 'Ch.3', name: 'Danh sách liên kết'},
  4: {short: 'Ch.4', name: 'Ngăn xếp và hàng đợi'},
};

export const TYPE_LABEL = {
  single: '1 đáp án',
  multi: 'Nhiều đáp án',
  fill: 'Điền kết quả',
};

export const DURATION_MS = 180 * 60 * 1000;
export const DIEM_MOI_CAU = 0.05;
export const TONG_DIEM = 10;
export const TONG_CAU = 200;
export const STORAGE_KEY = 'ctdl-bkt-chuong1-4-v2';
