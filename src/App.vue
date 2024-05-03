
<script setup lang="ts">
import { computed, ref } from "vue";
import type { ComponentSize } from "element-plus";

//导入element-plus消息提示框
import { ElMessage } from "element-plus";

//空值骨架显示屏
const isLoad = ref(true);

const input = ref("");
const number_data = ref({
  city: "待查询",
  provice: "待查询",
  sp: "待查询",
  Notes:
    "注意！！！，只能输入3位或者11位进行查询，3位只能查询供应商，11位可以查询完整信息",
});

//开始搜索
import { getPhone } from "./api/start";
const start = () => {
  isLoad.value = false;
  getPhone(input.value).then((res) => {
    const result = res.data;
    console.log(res);
    // console.log(result);

    var response = JSON.parse(result);

    // console.log(response.data);

    if (res.data != null) {
      number_data.value.provice = response.data.province;
      number_data.value.city = response.data.city;
      number_data.value.sp = response.data.sp;
    }
    if (res.code == 0) {
      ElMessage.success(res.message ? res.message : "查询成功");
    } else {
      ElMessage.error(res.message ? res.message : "查询失败");
    }

    number_data.value.Notes = res.message;
    isLoad.value = true;
  });
};

const inputRules = [
  { required: true, message: "请输入手机号" },
  { pattern: /^[0-9]{3}$|^[0-9]{11}$/, message: "请输入3位或者11位数字" },
];
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="12"
            ><div class="grid-content ep-bg-purple" />
            <div class="flex items-center">
              <span class="text-large font-600 mr-3 phone-search"
                ><el-input
                  v-model="input"
                  style="width: 240px"
                  placeholder="输入手机号"
                  :rules="inputRules"
                />
              </span></div
          ></el-col>
          <el-col :span="12"
            ><div class="grid-content ep-bg-purple-light" />
            <div class="flex items-center">
              <el-button @click="start" type="primary" plain>搜索</el-button>
            </div></el-col
          >
        </el-row>
      </el-header>

      <el-main :v-model="number_data">
        <el-descriptions
          title="查询结果"
          direction="vertical"
          :column="4"
          border
        >
          <el-descriptions-item label="省份" prop="provice" v-if="isLoad">{{
            number_data.provice
          }}</el-descriptions-item>

          <el-descriptions-item
            label="城市"
            prop="city"
            :span="2"
            v-if="isLoad"
            >{{ number_data.city }}</el-descriptions-item
          >
          <el-descriptions-item label="供应商" prop="sp" v-if="isLoad">
            <el-tag size="small">{{ number_data.sp }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Notes" v-if="isLoad">
            {{ number_data.Notes }}
          </el-descriptions-item>
        </el-descriptions>
        <el-skeleton v-if="!isLoad" :rows="5" animated />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.phone-search {
  margin-left: 5%; /* 调整为你想要的左边距值 */
}
</style>
