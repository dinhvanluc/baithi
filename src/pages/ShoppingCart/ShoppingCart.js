import { useEffect, useState } from "react";

import './ShoppingCart.css';
import { Link, useNavigate } from "react-router-dom";

function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  let navigate = useNavigate();

  const getGioHang = () => {
    const valueStr = sessionStorage.getItem("GioHang");
    const valueJson = valueStr ? JSON.parse(valueStr) : [];
    setProducts(valueJson);

    // Tính tổng tiền
    tinhTongGia(valueJson);
  };
  
  const tinhTongGia = (valueJson) => {
    // Tính tổng tiền
    let ttPrice = 0;
    for (let index = 0; index < valueJson.length; index++) {
      const sp = valueJson[index];
      
      if (sp?.quality && sp?.price) {
        ttPrice += (sp?.quality * sp?.price);
      }
    }
    setTotalPrice(ttPrice);
  }

  const handleChangeQuality = (event, id) => {
    const newQuality = event?.target?.value;

    // update lại số lượng sản phẩm trong giỏ hàng
    const newProducts = products.map((sp) => {
      if (sp.id === id) {
        sp.quality = newQuality;
      }
      return sp;
    });
    setProducts(newProducts);
    // update lại giá trị sản phẩm giỏ hàng trong sessionStorage
    sessionStorage.setItem("GioHang", JSON.stringify(newProducts));
    tinhTongGia(newProducts);
  }

  // id: là sản phẩm đang xóa
  const handleRemove = (id) => {
    const spDangXoa = products.filter(sp => sp.id === id);
    const yesOrNo = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm ' + spDangXoa?.[0]?.name +' khỏi giỏ hàng?');
    if (yesOrNo) { // tương đương if (yesOrNo == true || yesOrNo != 0 || yesOrNo != null || yesOrNo !== undefine)
      // filter (lọc) chỉ lấy những sản phẩm có id khác với id đang xóa
      const productItems = products.filter(sp => sp.id !== id);

      // update lại giá trị sản phẩm giỏ hàng trong sessionStorage
      sessionStorage.setItem("GioHang", JSON.stringify(productItems));
      setProducts(productItems);
      tinhTongGia(productItems);
      updateCounterInMenu();
      alert('Sản phẩm đã được xóa thành công khỏi giỏ hàng');
    }
  }

  const handleDatHang = () => {
    alert('Đơn hàng của bạn đã được đặt thành công, Sản phẩm sẽ được giao đến bạn trong thời gian sớm nhất');
    sessionStorage.setItem('GioHang', '[]');

    
    updateCounterInMenu();
    navigate('/home');
  }

  const updateCounterInMenu = () => {
    // bắn sự kiện lên menu để cập nhập lại số lượng ở giở hàng
    var evt = document.createEvent("Event");
    evt.initEvent("ThayDoiGioHang", true, true);
    document.dispatchEvent(evt);
  }
  

  useEffect(() => {
    getGioHang();
  }, []);

  return (
    <div className="App">
      <b>Giỏ hàng</b>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Quality</th>
            <th scope="col">Price</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {products.map((sp, index) => {
            return (
              <tr>
                <th scope="row">{ index + 1}</th>
                <td>
                  <img className="card-img-top" src={sp.image} alt="Card image cap" style={{ with: 200 }} />
                </td>
                <td>
                  <Link to={`../products/${sp.id}`} >
                    {sp?.name}
                  </Link>
                </td>
                <td>
                  <input type="number" class="form-control" value={sp?.quality} onChange={(event) => handleChangeQuality(event, sp.id)} />
                </td>
                <td>{sp?.quality * sp?.price}</td>
                <td>
                  <button type="button" class="btn btn-danger" onClick={() => handleRemove(sp.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
          <tr>
            <th colSpan={4} className="text-left">Total Price</th>
            <td>{totalPrice}</td>
          </tr>
          <tr>
            <td colSpan={5} className="text-right">
              <button type="button" class="btn btn-primary" onClick={handleDatHang}>Đặt Hàng</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ShoppingCart;
