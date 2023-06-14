<template>
    <div class="registry">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
                <el-button type="primary" @click="toLoginPage">已有账户？登录</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance, FormRules, ElLoading } from 'element-plus'
import { toRegistry } from '../service/user';
import { IResult } from '../service/type'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    pass: "",
    checkPass: ""
});
const router = useRouter();

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码！'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入确认密码！'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("两次密码不一致！"))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名长度3~10之间', trigger: 'blur' },
    ],
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
    const loadingInstance = ElLoading.service({
        text: "注册中...",
        background: 'rgba(0, 0, 0, 0.7)'
    });
    try {
        const res: unknown = await toRegistry(ruleForm.name, ruleForm.pass, ruleForm.checkPass);
        window.alert((res as IResult).message);

    } catch (err: any) {
        window.alert(err.message);
        console.log(err);
    }
    loadingInstance.close();
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}

const toLoginPage = () => {
    router.replace({ path: '/login' });
}
</script>

<style lang="less">
.registry {
    display: grid;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    .el-form {
        border-radius: 10px;
        box-shadow: 0 0 5px 1px black;
        border: 1px solid black;
        grid-row: 2;
        grid-column: 2 / 4;
    }
}
</style>