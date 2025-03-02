// 导入必要的模块
import "cypress-real-events";
import { createWatermark } from './create.cy.js';
import { modifyWatermark } from './modify.cy.js';
import { restartWatermark } from './restart.cy.js';
import { setupTest } from '../common.js';
import { addproducts } from './product.cy.js';
import { modifyact } from './acttime.cy.js';
import { copyactivity } from './copyact.cy.js';

// 测试套件
describe("1:1水印功能完整流程测试", () => {
  beforeEach(() => {
    setupTest();
  });

  it("1. 创建水印", () => {
    createWatermark();
  });
  
  it.only("2. 修改水印", () => {
    modifyWatermark();
  });
  
  it("3. 结束并重开水印", () => {
    restartWatermark();
  });

  it("4. 添加删除商品", () => {
    addproducts();
  });

  it("5. 修改活动信息", () => {
    modifyact();
  });

  it("6. 复制活动", () => {
    copyactivity();
  });

  it("7. 详情进入编辑水印", () => {
    
  });

  it("8. 其他操作（保存模板/永久删除）", () => {
    modifyact();
  });





});

// 导出测试套件
export default describe;