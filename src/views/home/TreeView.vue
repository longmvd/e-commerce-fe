<template>
  <a-tree-select
    v-model:value="value"
    tree-data-simple-mode
    style="width: 100%"
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    placeholder="Please select"
    v-bind="{
      virtual: true,
      showSearch: true,
    }"
  />
</template>
<script lang="ts" setup>
import type { TreeSelectProps } from 'ant-design-vue';
import { ref } from 'vue';
const value = ref<string>();
const treeData = ref<TreeSelectProps['treeData']>([
  { id: 1, pId: 0, value: '1', title: 'Expand to load' },
  { id: 2, pId: 0, value: '2', title: 'Expand to load' },
]);

// const genTreeNode = (
//   parentId: number,
//   isLeaf = false
// ): TreeSelectProps["treeData"][number] => {
//   const random = Math.random().toString(36).substring(2, 6);
//   return {
//     id: random,
//     pId: parentId,
//     value: random,
//     title: isLeaf ? "Tree Node" : "Expand to load",
//     isLeaf,
//   };
// };
// const onLoadData = (treeNode: TreeSelectProps["treeData"][]) => {
//   console.log(treeNode);

//   return new Promise((resolve) => {
//     const { id } = treeNode.dataRef;
//     setTimeout(() => {
//       treeData.value = treeData.value?.concat([
//         genTreeNode(id, false),
//         genTreeNode(id, true),
//         genTreeNode(id, true),
//       ]);
//       console.log(treeData.value);
//       resolve(true);
//     }, 300);
//   });
// };
</script>
