// 导入必要的模块
import "cypress-real-events";
import { createWatermark } from './create.cy.js';
import { modifyWatermark } from './modify.cy.js';
import { restartWatermark } from './restart.cy.js';
import { setupTest } from '../common.js';
import { addproducts } from './product.cy.js';

// 测试套件
describe("1:1水印功能完整流程测试", () => {
  beforeEach(() => {
    setupTest();
  });

  it("1. 创建水印", () => {
    createWatermark();
  });
  
  it("2. 修改水印", () => {
    modifyWatermark();
  });
  
  it("3. 结束并重开水印", () => {
    restartWatermark();
  });

  it.only("4. 添加删除商品", () => {
    addproducts();
  });
});

// 导出测试套件
export default describe;