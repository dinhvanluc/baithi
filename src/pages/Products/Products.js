import { useState } from "react";
import { danh_sach_san_pham } from "../../fakeData/products";

import "./Product.css";
import { Link } from "react-router";
const listProducts = danh_sach_san_pham;

function Products() {
  const [products, setProducts] = useState(listProducts);

  const handleAddToCart = (id) => {
    console.log("id", id);

    // Lấy sản phẩm đã click vào
    // lọc các phần tử của products có id bằng id user click từ UI (giao diện)
    const productItems = listProducts.filter((sp) => sp.id === id);
    // lọc sẽ trả về 1 mảng, mình lấy phần tử đầu của mảng.
    const product = productItems?.[0];

    // mặc định gán số lượng = 1
    product.quality = 1;

    // Lấy cái giá trị sessionStorage có key GioHang hiện tại ra
    // lấy giá trị của sessionStorage có key là GioHang ra. giá trị mặc là string
    const valueStr = sessionStorage.getItem("GioHang");
    // convert string của nó ra mảng json để làm việc
    const valueJson = valueStr ? JSON.parse(valueStr) : [];

    // Kiểm tra xem sản phẩm có trong giỏ hàng chưa, lọc id của sản phẩm xem đã có trong giỏ hàng chưa. nếu có rồi thì báo đã có
    // và bỏ qua các logic phía dưới
    const existProduct = valueJson.filter((sp) => sp.id === id);
    if (existProduct?.length) {
      // tương đương if (existProduct?.length ! 0 || existProduct?.length !== null || existProduct?.length !== undefine)
      alert("Sản phẩm đã có trong giỏ hàng");
      return;
    }

    // Thêm sản phẩm vào biến mảng
    valueJson.push(product);

    // JSON.stringify(valueJson): chuyển đổi json value thành string
    // gán một giá trị mới vào sessionStorage có key là GioHang, và giá trị là sản phẩm được convert ra string
    sessionStorage.setItem("GioHang", JSON.stringify(valueJson));

    // bắn sự kiện lên menu để cập nhập lại số lượng ở giở hàng
    var evt = document.createEvent("Event");
    evt.initEvent("ThayDoiGioHang", true, true);
    document.dispatchEvent(evt);
    alert("Đã thêm vào giỏ hàng thành công");
  };

  return (
    <div className="App">
      <div className="row">
        {products.map((sanPham) => {
          return (
            <div className="col-4">
              <div
                className="card text-center"
                style={{
                  "align-items": "center",
                }}
              >
                <img
                  className="card-img-top"
                  src={sanPham.image}
                  alt="Card image cap"
                  style={{ with: 200 }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`../products/${sanPham.id}`}>{sanPham?.name}</Link>
                    {/* <a href={`../products/${sanPham.id}`}>{sanPham?.name}</a> */}
                  </h5>
                  <p className="card-text">{sanPham?.desc}</p>
                  <a
                    href="#"
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(sanPham.id)}
                  >
                   Thêm Vào Giỏ Hàng
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
