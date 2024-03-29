const Redis = require("ioredis");
const redis = new Redis();
// remote redis kullanılacağında host, password, port vs new Redis() parantezi içine obje olarak yazılır.

export default redis;
