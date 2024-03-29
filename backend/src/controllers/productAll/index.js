import Product from "../../models/product";

const GetList = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });

    res.json(products);
  } catch (e) {
    next(e);
  }
};

export default {
  GetList,
};
