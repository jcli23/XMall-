import service from './index'

export default {
    //首页数据
    getHome() {
        return service.req('goods/home')
    },
    //为你推荐
    getRecommend() {
        return service.req('goods/recommend')
    },
    //所有商品
    getGoods({ page, size, sort, priceGt, priceLte }) {
        if (sort && priceGt && priceLte) {
            return service.req(`goods/allGoods?page=${page}&size=${size}&sort=${sort}&priceGt=${priceGt}&priceLte=${priceLte}`)
        } else if (priceGt && priceLte) {
            return service.req(`goods/allGoods?page=${page}&size=${size}&priceGt=${priceGt}&priceLte=${priceLte}`)
        } else if (sort) {
            return service.req(`goods/allGoods?page=${page}&size=${size}&sort=${sort}`)
        } else {
            return service.req(`goods/allGoods?page=${page}&size=${size}`)
        }
    },
    //搜索商品
    getSearch(keyword) {
        return service.req(`goods/allGoods?keyword=${keyword}`)
    },
    //登录
    login({ username, password }) {
        return service.req('users/login', {
            username,
            password
        })
    },
    //注册
    register({ username, password }) {
        return service.req('users/register', {
            username,
            password
        })
    },
    //加入购物车
    addCart({ productId }) {
        return service.req('goods/addCart', { productId })
    },
    //查询购物车
    getCarts() {
        return service.req('goods/getCarts')
    },
    //删除购物车商品
    delCart({ productId }) {
        return service.req('goods/delCart', { productId })
    },
    //修改购物车数量
    editCart({ productId, count }) {
        return service.req('goods/editCart', {
            productId,
            count
        })
    },
    //获取全部地址
    addressList() {
        return service.req('address/list')
    },
    //添加地址
    addAddress({ username, phone, address, isDefault }) {
        return service.req('address/addAddress', {
            username,
            phone,
            address,
            isDefault
        })
    },
    //设置默认地址
    setDefault(addressId) {
        return service.req('address/setDefault', addressId)
    },
    //编辑修改地址
    editAddress({ addressId, username, phone, address, isDefault }) {
        return service.req('address/editAddress', {
            addressId,
            username,
            phone,
            address,
            isDefault
        })
    },
}