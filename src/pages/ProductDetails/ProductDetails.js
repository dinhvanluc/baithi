import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { danh_sach_san_pham } from "../../fakeData/products";

const dsProducts = danh_sach_san_pham;

function ProductDetails() {

  const [product, setProduct] = useState({});

  // phía sau dấu hai chấm của router url
  const params = useParams();
  const id = params?.id;

  // phía sau dấu chấm hỏi ? của url
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const sanPhams = dsProducts.filter((sp) => sp.id == id);
    console.log('id', id, sanPhams)
    if (sanPhams?.length) {
      setProduct(sanPhams?.[0])
    }
  }, [id]);

  return (
    <div className="App">
      <div className="row">
        <div className="col-12">
          Chi Tiet San Pham
        </div>
        <div className="col-12">
          {product?.name}
        </div>
        <div>
          <b>Thử show get name: {searchParams.get('name')}</b>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
