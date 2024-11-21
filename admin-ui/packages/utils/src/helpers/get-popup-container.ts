/**
 * Returns the parent node of the given element or the document body if the element is not provided.it
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

/**
 * VxeTable专用弹窗层
 * 解决问题: https://gitee.com/dapppp/ruoyi-plus-vben5/issues/IB1DM3
 * 单表格用法跟上面getPopupContainer一样
 * 一个页面(body下)有多个表格元素 必须先指定ID & ID参数传入该函数
 * <BasicTable id="xxx" />
 * getVxePopupContainer="(node) => getVxePopupContainer(node, 'xxx')"
 * @param _node 触发的元素
 * @param id 表格唯一id 当页面(该窗口)有>=两个表格 必须提供ID
 * @returns 挂载节点
 */
export function getVxePopupContainer(
  _node?: HTMLElement,
  id?: string,
): HTMLElement {
  let selector = 'div.vxe-table--body-wrapper.body--wrapper';
  if (id) {
    selector = `div#${id} ${selector}`;
  }
  // 挂载到vxe-table的滚动区域
  const vxeTableContainerNode = document.querySelector(selector);
  if (!vxeTableContainerNode) {
    console.warn('无法找到vxe-table元素, 将会挂载到body.');
    return document.body;
  }
  return vxeTableContainerNode as HTMLElement;
}