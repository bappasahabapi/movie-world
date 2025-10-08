import { describe, it, expect } from 'vitest';
import { pickList } from '../api/axios';

describe('pickList', ()=>{
  it('returns array as-is', ()=>{
    expect(pickList([1,2,3])).toEqual([1,2,3]);
  });
  it('picks items field', ()=>{
    expect(pickList({items:[{a:1}]})).toEqual([{a:1}]);
  });
  it('returns [] for invalid', ()=>{
    expect(pickList(null as any)).toEqual([]);
  });
});
