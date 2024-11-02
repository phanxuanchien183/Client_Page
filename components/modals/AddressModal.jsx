"use client";

import { useEffect, useState } from "react";

import { useEditUserMutation } from "@/store/services";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { addressSchema } from "utils";

import { useUserInfo } from "hooks";

import {
  TextField,
  DisplayError,
  SubmitModalBtn,
  Combobox,
  Modal,
  HandleResponse,
} from "components";

const getProvinces = () => {
  return [];
};

const getCitysByProvince = (provinceCode) => {
  return [];
};

const getAreasByCity = (cityCode) => {
  return [];
};

const AddressModal = (props) => {
  //? Porps
  const { isShow, onClose, address } = props;

  //? Assets
  let AllProvinces = getProvinces();

  //? Get User Data
  const { userInfo } = useUserInfo();

  //? State
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: address,
  });

  //? Edit User-Info Query
  const [editUser, { data, isSuccess, isLoading, isError, error }] =
    useEditUserMutation();

  //? Re-Renders
  //* Change cities beside on province
  useEffect(() => {
    setValue("area", {});
    getValues("city")?.code
      ? setAreas(getAreasByCity(getValues("city")?.code))
      : "";
    watch("city");
  }, [getValues("city")?.code]);

  useEffect(() => {
    setValue("city", {});
    setCities(getCitysByProvince(getValues("province")?.code));
    watch("province");
  }, [getValues("province")?.code]);

  useEffect(() => {
    if (userInfo?.address) {
      setValue("city", userInfo.address.city);
      setValue("area", userInfo.address.area);
    }
  }, []);

  //? Handlers
  const submitHander = (address) => {
    editUser({
      body: { address },
    });
  };

  //? Render(s)
  return (
    <>
      {/* Handle Edit Address Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={onClose}
        />
      )}

      <Modal isShow={isShow} onClose={onClose} effect="bottom-to-top">
        <Modal.Content
          onClose={onClose}
          className="flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 "
        >
          <Modal.Header onClose={onClose}>Quản lý địa chỉ</Modal.Header>
          <Modal.Body>
            <p>Vui lòng nhập địa chỉ nhận hàng của bạn</p>
            <form
              className="flex flex-col justify-between flex-1 pl-4 overflow-y-auto"
              onSubmit={handleSubmit(submitHander)}
            >
              <div className="space-y-12 md:grid md:grid-cols-3 md:gap-x-12 md:gap-y-5 md:items-baseline ">
                <div className="space-y-2">
                  <Combobox
                    control={control}
                    name="province"
                    list={AllProvinces}
                    placeholder="Vui lòng chọn Tỉnh của bạn"
                  />
                  <DisplayError errors={formErrors.province?.name} />
                </div>

                <div className="space-y-2 ">
                  <Combobox
                    control={control}
                    name="city"
                    list={cities}
                    placeholder="Vui lòng chọn Thành phố của bạn"
                  />
                  <DisplayError errors={formErrors.city?.name} />
                </div>

                <div className="space-y-2 ">
                  <Combobox
                    control={control}
                    name="area"
                    list={areas}
                    placeholder="Vui lòng chọn Quận huyện của bạn"
                  />
                  <DisplayError errors={formErrors.area?.name} />
                </div>

                <TextField
                  label="Thông tin đường phố"
                  control={control}
                  errors={formErrors.street}
                  name="street"
                />

                <TextField
                  label="Mã bưu điện"
                  control={control}
                  errors={formErrors.postalCode}
                  name="postalCode"
                  type="number"
                  direction="ltr"
                  inputMode="numeric"
                />
              </div>

              <div className="py-3 border-t-2 border-gray-200 lg:pb-0 flex">
                <SubmitModalBtn isLoading={isLoading} className="ml-auto">
                  Xác nhận
                </SubmitModalBtn>
              </div>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default AddressModal;
