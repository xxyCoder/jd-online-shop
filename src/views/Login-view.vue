<template>
    <div class="login">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name" />
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                <el-button type="primary" @click="toRegistryPage">没有账户？注册</el-button>
                <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { FormInstance, FormRules, ElLoading } from 'element-plus'
import { toLogin } from '../service/user';
import { IResult } from '../service/type';

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
    name: '',
    pass: ""
});
const router = useRouter();

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码！'))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名长度3~10之间', trigger: 'blur' },
    ],
    pass: [{ validator: validatePass, trigger: 'blur' }]
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
        text: "登录中...",
        background: 'rgba(0, 0, 0, 0.7)'
    });
    try {
        const res: unknown = await toLogin(ruleForm.name, ruleForm.pass);
        const token: string = (res as IResult).token as string;
        loadingInstance.close();
        if ((res as IResult).code === 1201) {
            localStorage.setItem('token', token) // 保存token
            router.replace({ path: '/' });  // 登录成功跳转到首页
        } else {
            window.alert((res as IResult).message);
        }
    } catch (err: any) {
        loadingInstance.close();
        window.alert(err.message);
        console.log(err);
    }

}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
const toRegistryPage = () => {
    router.replace({ path: '/registry' });
};
</script>

<style lang="less" scoped>
.login {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;

    .el-form {
        border: 1px solid black;
        border-radius: 10px;
        box-shadow: 0 0 10px 10px #ccc;
        padding: 12px;
        grid-row: 2;
        grid-column: 2 / 4;
    }
}
</style>