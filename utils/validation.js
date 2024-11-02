import * as Yup from "yup";

export const logInSchema = Yup.object().shape({
  user_name: Yup.string()
    .required("Tên tài khoản phải được điền vào")
    .min(3, "Độ dài tên tài khoản từ 3 ký tự"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu đăng nhập")
    .min(6, "Độ dài mật khẩu từ 6 ký tự"),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string().required("Vui lòng nhập họ và tên"),
  email: Yup.string()
    .required("Email phải được điền vào")
    .email("Vui lòng nhập email chính xác"),
  user_name: Yup.string()
    .required("Vui lòng nhập tên tài khoản")
    .min(3, "Độ dài tên tài khoản từ 3 ký tự"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu đăng nhập")
    .min(6, "Độ dài mật khẩu từ 6 ký tự"),
  confirmPassword: Yup.string()
    .required("Vui lòng nhập lại mật khẩu xác nhận")
    .oneOf([Yup.ref("password"), null], "Xác nhận mật khẩu sai"),
});

export const categorySchema = Yup.object().shape({
  name: Yup.string().required("Tên danh mục không thể trống"),
  slug: Yup.string().required("Tên đường dẫn không thể trống"),
  image: Yup.string()
    .required("Nhập đường dẫn hình ảnh")
    .url("Đường dẫn hình ảnh không hợp lệ")
    .matches(
      /\.(gif|jpe?g|png|webp)$/i,
      "Địa chỉ hình ảnh phải là URL hình ảnh hợp lệ"
    ),
});

export const bannerSchema = Yup.object().shape({
  title: Yup.string().required("Tên không thể trống"),
  image: Yup.object().shape({
    url: Yup.string()
      .required("Nhập đường dẫn hình ảnh")
      .url("Địa chỉ không hợp lệ")
      .matches(
        /\.(gif|jpe?g|png|webp)$/i,
        "Địa chỉ hình ảnh phải là URL hình ảnh hợp lệ"
      ),
  }),
});

export const sliderSchema = Yup.object().shape({
  title: Yup.string().required("Tên không thể trống"),
  image: Yup.object().shape({
    url: Yup.string()
      .required("Nhập đường dẫn hình ảnh")
      .url("Địa chỉ không hợp lệ")
      .matches(
        /\.(gif|jpe?g|png|webp)$/i,
        "Địa chỉ hình ảnh phải là URL hình ảnh hợp lệ"
      ),
  }),
});

export const reviewSchema = Yup.object().shape({
  title: Yup.string()
    .required("Tiêu đề đánh giá không thể trống")
    .min(4, "Tiêu đề đánh giá không được nhỏ hơn 4 ký tự"),
  comment: Yup.string()
    .required("Nội dung đánh giá không thể trống")
    .min(4, "Nội dung đánh giá không được nhỏ hơn 4 ký tự"),
});

export const addressSchema = Yup.object().shape({
  province: Yup.object().shape({
    name: Yup.string().required("Vui lòng chọn Tỉnh bạn sống"),
  }),
  city: Yup.object().shape({
    name: Yup.string().required("Vui lòng chọn Thành phố của bạn nơi bạn sống"),
  }),
  area: Yup.object().shape({
    name: Yup.string().required("Vui lòng chọn Quận huyện bạn sống"),
  }),
  street: Yup.string().required("Tên đường phố không thể trống"),
  postalCode: Yup.string().required("Vui lòng nhập mã bưu điện của bạn"),
});

export const nameSchema = Yup.object().shape({
  name: Yup.string()
    .required("Phải được đăng ký")
    .min(3, "Tên phải từ 3 ký tự"),
});

export const mobileSchema = Yup.object().shape({
  mobile: Yup.string()
    .required("Số điện thoại di động phải được đăng ký")
    .min(11, "Số điện thoại di động phải là 11 chữ số")
    .max(11, "Số điện thoại di động phải là 11 chữ số"),
});
