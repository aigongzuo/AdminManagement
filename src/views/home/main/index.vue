<template>
  <el-table :data="patternList" style="width: 100%; height:100%">

    <el-table-column prop="id" label="ID" width="100" />
    <el-table-column prop="patternName" label="Name" width="100" />
    <!-- <el-table-column prop="getPatternLabel(patternType)" label="Type" width="120" /> -->
    <el-table-column label="Type" width="100" v-slot="{ row }">
      {{ getPatternLabel(row.patternType) }}
    </el-table-column>
    <el-table-column prop="patternPrice" label="Price" width="100" />
    <el-table-column prop="patternDesc" label="Desc" width="300" v-slot="{ row }">
      <div class="desc-cell">{{ row.patternDesc }}</div>
    </el-table-column>
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="onClickEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="onAddClick">Add Item</el-button>

  <div class="demo-pagination-block">
    <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="pageSizeList"
      :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="countNumber" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>

  <el-dialog v-model="dialogVisible" title="Shipping address">
    <el-form :model="dialogPattern" style="margin: 0; padding: 0;">
      <!-- 图片区域 -->
      <div style="position: static; display: flex; flex-direction: column;">
        <div style="position: static; display: flex; flex-direction: row;">
          <div>
            <el-upload class="avatar-uploader" :show-file-list="false" :action="UploadURL"
              :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <div v-if="dialogPattern.patternImg" class="avatar">
                <img class="avatar" :src="BaseURL + '/' + dialogPattern.patternImg" style="object-fit: cover; " />

              </div>
              <el-icon v-else class="avatar-uploader-icon">
                <Plus />
              </el-icon>
            </el-upload>
          </div>
        </div>

        <!-- 表单区域 -->
        <div style="display: flex;  margin-top:  20px;">
          <el-form-item label="ID" style="padding: 0;flex: 1; margin: 0; align-items: center;">
            {{ dialogPattern.id == 0 ? "-" : dialogPattern.id }}
          </el-form-item>
          <!-- <div style="width: 10px;"></div>´ -->

        </div>
        <div style="display: flex;  margin-top:  20px;">
          <el-form-item label="Name" style="padding: 0; flex: 1; align-items: center;">
            <el-input v-model="dialogPattern.patternName" autocomplete="off" />
          </el-form-item>
          <div style="width: 10px;"></div>
          <el-form-item label="Type" style="padding: 0; flex:1; align-items: center;">
            <el-select v-model="dialogPattern.patternType" class="m-2" placeholder="Select" style="width: 240px">
              <el-option v-for="item in patternTypes" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <div style="width: 10px;"></div>
          <el-form-item label="Price" style="padding: 0; flex: 1; align-items: center;">
            <el-input v-model.number="dialogPattern.patternPrice" autocomplete="off" type="number" min="0"
              pattern="\d*" />
          </el-form-item>
        </div>
        详情:
        <el-input v-model="dialogPattern.patternDesc" autocomplete="off"
          style="margin-top: 10px; min-height: 150px; margin-top: 10px; " :rows="5" />
      </div>
    </el-form>

    <!-- 底部（确定/取消） -->
    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="(editIndex == -1) ? onHandleAddItem() : onHandleEditItem()">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, Ref } from 'vue'
import { BaseURL, UploadURL } from '@/api/service'
import { UploadProps, ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import * as net from '@/api'
import { PatternBean, patternTypes, getPatternLabel } from "@/bean/pattern-bean";
import * as loading from "@/util/loading"


const dialogVisible = ref(false)
let editIndex: number = -1;
let dialogPattern = ref(getEmptyPattern());
const pageSizeList = [20, 40, 60, 100]
const currentPage = ref(1)
const pageSize = ref(pageSizeList[0])
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const patternList: Ref<PatternBean[]> = ref<PatternBean[]>([]);
const countNumber = ref(0);

// 在页面加载前触发的函数
onMounted(() => {
  loadData();
});

// 加载数据的异步函数
async function loadData() {
  loading.show()
  try {
    const response: any = await net.listPattern(currentPage.value, pageSize.value)
    patternList.value = response.data.mainList as PatternBean[]
    countNumber.value = response.data.count
  } catch (error) {
    ElMessage.error("列表请求失败")
  } finally {
    loading.dismiss()
  }
}
const onClickEdit = (index: number, row: any) => {
  editIndex = index;
  dialogPattern.value = { ...row }; //reactive(cloneDeep(row));
  dialogVisible.value = true
}
const onHandleEditItem = async () => {
  dialogVisible.value = false
  loading.show()
  try {
    const isSuccess = await net.editPattern(dialogPattern.value)
    if (isSuccess) {
      patternList.value[editIndex] = dialogPattern.value
      ElMessage.success("成功")
    } else {
      ElMessage.error("失败")
    }
  } catch (error) {
    ElMessage.error("失败")
  } finally {
    loading.dismiss()
  }
}
const onAddClick = () => {
  dialogPattern.value = getEmptyPattern();
  editIndex = -1
  dialogVisible.value = true
}

const onHandleAddItem = async () => {
  console.log(dialogPattern.value)

  if (dialogPattern.value.patternImg == "") {
    return ElMessage.error("图片为空");
  }
  dialogVisible.value = false
  if (await net.addPattern(dialogPattern.value)) {
    ElMessage.success("添加成功")
    loadData()
  } else {
    ElMessage.error("失败")

  }
}

const handleDelete = async (index: number, row: any) => {
  loading.show()
  try {
    const isSuccess = await net.delPattern(row.id)
    if (isSuccess) {
      patternList.value.splice(index, 1);
      ElMessage.success("成功")
      loadData()
    } else {
      ElMessage.error("失败")
    }
  } catch (error) {
    ElMessage.error("失败")
  } finally {
    loading.dismiss()
  }
}


const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}


//上传成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  _
) => {
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
  dialogPattern.value.patternImg = response.file_url;
}

//上传图片前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isType = rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !='image/webp';
  if (isType) {
    ElMessage.error('不支持这种格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}


function getEmptyPattern(): PatternBean {
  return {
    id: 0,
    patternName: '',
    patternImg: '',
    patternDesc: '',
    patternType: 0,
    patternPrice: 0
  };
}

</script>


<style scoped>
.demo-pagination-block {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>


<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}


.el-upload:hover.avatar-uploader {
  border-color: var(--el-color-primary);
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.desc-cell {
  max-height: 200px;
  /* 设置最大高度，可以根据需要调整 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
