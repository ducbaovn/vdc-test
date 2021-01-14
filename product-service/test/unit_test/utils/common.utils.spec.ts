import { CommonUtils } from '../../../src/utils/common.utils';
import { expect } from 'chai';
import 'mocha';

describe('CommonUtils test', () => {
  describe('filter method', () => {
    it('should filter property', () => {
      const target = {
        field1: "abc",
        field2: 3,
        field3: new Date()
      }
      const filters = ["field1", "field3", "field4"]
      CommonUtils.filter(target, filters)
      expect(target).not.haveOwnProperty("field1")
      expect(target).not.haveOwnProperty("field3")
      expect(target).haveOwnProperty("field2")
    });
    it('should do nothing with null', () => {
      const target = null
      CommonUtils.filter(target)
      expect(target).equals(null)
    });
  })
});