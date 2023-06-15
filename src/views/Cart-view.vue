<template>
    <div class="cart">
        <ul v-for="(good, key) in goods" :key="key">
            <li>
                <h2>商家：{{ key }}</h2>
            </li>
            <li class="box" v-for="g in good" :key="g.id">
                <img :src="g.image" alt="商品图片" />
                <div class="container-info">
                    <h4>{{ g.name }}</h4>
                    <span class="price">￥{{ g.price }}</span>
                    <span class="quantity">
                        <el-button type="danger" :icon="Minus" circle @click="subQuantity(g)" />
                        {{ g.quantity }}
                        <el-button type="primary" :icon="Plus" circle @click="addQuantity(g)" />
                    </span>
                </div>
            </li>
        </ul>
        <div class="button">结算￥{{ sumPrice }}</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
    Plus,
    Minus,
} from '@element-plus/icons-vue'
import { addToCart, getAllGoodFromCart, removeFromCart } from "../service/cart";
import { IResult } from "../service/type";
import { Good } from "../types/good";

interface IData {
    [propName: string]: Good[];
}

const goods = ref<IData>();
const sumPrice = ref(0);

onMounted(async () => {
    const data: unknown = await getAllGoodFromCart();
    goods.value = (data as IResult).result;
    for (const key in goods.value) {
        goods.value[key].forEach((d: Good) => {
            sumPrice.value += d.price * d.quantity;
        })
    }
    console.log(goods.value);
})

let timerId: any = null;
let cnt = 0;    // 用于计算当前商品增加或减少多少

const subQuantity = (g: Good) => {
    if (g.quantity === 0) {
        return;
    }
    --g.quantity;
    --cnt;
    sumPrice.value -= g.price;
    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
        console.log(cnt);
        removeFromCart.call(null, g.name, -cnt);
        timerId = null;
        cnt = 0;
    }, 1000);
}

const addQuantity = (g: Good) => {
    ++g.quantity;
    ++cnt;
    sumPrice.value += +g.price; // 隐式转换为数值
    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
        console.log(cnt);
        addToCart.call(null, g.name, cnt);
        timerId = null;
        cnt = 0;
    }, 1000);
}
</script>

<style lang="less" scoped>
.cart {
    ul {
        list-style: none;

        .box {
            display: flex;
            padding: 6px 12px;
            width: 50%;
            align-items: center;
            border: 1px solid #000;
            border-radius: 10px;
            margin: 5px;

            img {
                width: 100px;
                height: 100px;
            }

            .container-info {
                margin-left: 20px;

                .price {
                    color: #333;
                    font-weight: bold;
                }

                .el-button {
                    font-size: 14px;
                    margin: 0 5px;
                }

                .quantity {
                    align-self: flex-end;
                }
            }
        }
    }

    .button {
        position: fixed;
        bottom: 50px;
        right: 50px;
        background: rgb(197, 76, 76);
        color: #fff;
        padding: 6px 12px;
        border-radius: 5px;
    }
}
</style>